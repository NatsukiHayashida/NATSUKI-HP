import { Callouts, Legend, Overlay, Readout, Schematic } from '@/app/components/schematic'

/**
 * H-07R マスクの適用位置 — 入力側に置くと欠陥まで消える／出力側なら消えない。
 *
 * 幾何は「関係」を記録どおりに守る。ただし模式図なので比率は誇張する。
 *
 * 守るもの（記録から。崩すと事実と食い違う）
 *   部品の下端だけが帯に食い込む（上下左右で対称に浮かせない）
 *   欠陥は部品の下の縁にあり、帯の境界をまたぐ。マスク後は消える
 *   背景の反応が出るのは四隅で、欠陥の反応とは離れている
 *   帯は黒ではなく背景色で塗る（黒領域を新たな異常として学習させないため意図的に避けた手法）
 *
 * 誇張してよいもの（読みやすさを優先する）
 *   帯の太さと欠陥の大きさ。実測の帯は短辺の6.7%しかなく、そのまま描くと
 *   「帯が欠陥を食べる」というこの図の全部が小さすぎて見えない。
 *   最初に実測どおりに描いて、4倍に拡大しないと差が分からない図になった（2026-08-11）。
 *
 * 朱は「欠陥および同じ欠陥に由来する異常信号」の一つの意味に固定する。
 * 数値は Readout に出し、SVGの中には文字を一切入れない。
 */

const PC = { w: 1000, h: 560, fw: 200, fh: 150, band: 18, cx: 96, cy: 80, r: 68, hole: 26, bore: 20, pin: 5, contour: 76 }
const SM = { w: 320, h: 1720, fw: 280, fh: 210, band: 25, cx: 134, cy: 112, r: 95, hole: 36, bore: 28, pin: 7, contour: 106 }

type Geo = typeof PC

/** 枠1枚ぶんの共通部品。id は変種ごとに前置きして重複を避ける */
function Defs({ p, g, defect }: { p: string; g: Geo; defect: string }) {
  const fine = { fill: 'none', stroke: 'currentColor', strokeWidth: 0.9, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
  const corner = (
    <g fill="currentColor">
      <circle cx={g.band * 1.2} cy={g.band * 1.2} r={g.band * 0.32} />
      <circle cx={g.band * 2.2} cy={g.band} r={g.band * 0.2} />
      <circle cx={g.band} cy={g.band * 2.3} r={g.band * 0.22} />
      <circle cx={g.band * 2.8} cy={g.band * 2.5} r={g.band * 0.17} />
    </g>
  )
  // 額縁：外周の帯（evenodd で内側を抜く）
  const ring = `M0 0h${g.fw}v${g.fh}H0zM${g.band} ${g.band}v${g.fh - g.band * 2}h${g.fw - g.band * 2}V${g.band}z`
  // 輪郭沿い：枠から部品の輪郭を抜く
  const outside = `M0 0h${g.fw}v${g.fh}H0zM${g.cx} ${g.cy}m-${g.contour} 0a${g.contour} ${g.contour} 0 1 0 ${g.contour * 2} 0a${g.contour} ${g.contour} 0 1 0-${g.contour * 2} 0`

  return (
    <defs>
      <pattern id={`${p}-hatch`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M0 0v8" {...fine} />
      </pattern>
      {/* 枠の外へ線がはみ出さないように、中身は必ずこれで切る */}
      <clipPath id={`${p}-clip`}>
        <rect width={g.fw} height={g.fh} />
      </clipPath>
      <g id={`${p}-part`}>
        <circle cx={g.cx} cy={g.cy} r={g.r} fill="none" stroke="currentColor" strokeWidth={1.5} />
        <circle cx={g.cx} cy={g.cy} r={g.hole} fill="none" stroke="currentColor" strokeWidth={1.5} />
        <circle cx={g.cx} cy={g.cy} r={g.bore} {...fine} />
        <circle cx={g.cx} cy={g.cy - g.r * 0.65} r={g.pin} {...fine} />
        <circle cx={g.cx + g.r * 0.65} cy={g.cy} r={g.pin} {...fine} />
        <circle cx={g.cx} cy={g.cy + g.r * 0.65} r={g.pin} {...fine} />
        <circle cx={g.cx - g.r * 0.65} cy={g.cy} r={g.pin} {...fine} />
      </g>
      <g id={`${p}-defect`}>
        <path d={defect} fill="hsl(var(--primary))" />
      </g>
      <g id={`${p}-band`}>
        {/* 黒で塗らない。背景の平均色で塗りつぶす手法なので、背景色で消してハッチングで範囲を示す */}
        <path d={ring} fillRule="evenodd" fill="hsl(var(--background))" />
        <path d={ring} fillRule="evenodd" fill={`url(#${p}-hatch)`} />
        <rect x={g.band} y={g.band} width={g.fw - g.band * 2} height={g.fh - g.band * 2} {...fine} />
      </g>
      <g id={`${p}-corners`}>
        {corner}
        <g transform={`translate(${g.fw} 0) scale(-1 1)`}>{corner}</g>
        <g transform={`translate(0 ${g.fh}) scale(1 -1)`}>{corner}</g>
        <g transform={`translate(${g.fw} ${g.fh}) scale(-1 -1)`}>{corner}</g>
      </g>
      <g id={`${p}-contour`}>
        <path d={outside} fillRule="evenodd" fill={`url(#${p}-hatch)`} />
        <circle cx={g.cx} cy={g.cy} r={g.contour} {...fine} />
      </g>
    </defs>
  )
}

/** 観察枠1枚。中身はクリップし、枠線はその外に引く（線が半分に痩せないように） */
function Panel({ p, g, x, y, children }: { p: string; g: Geo; x: number; y: number; children: React.ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g clipPath={`url(#${p}-clip)`}>{children}</g>
      <rect width={g.fw} height={g.fh} fill="none" stroke="currentColor" strokeWidth={1.5} />
    </g>
  )
}

const PC_DEFECT = 'M126 120c7-11 18-14 29-8-7 7-7 12-2 19-11-3-19 2-24 9-5-7-7-13-3-20z'
const SM_DEFECT = 'M176 170c9-15 25-19 40-11-9 9-9 16-3 26-15-4-27 3-34 12-6-9-9-18-3-27z'

function DiagramPc() {
  const g = PC
  const p = 'mp-pc'
  const part = <use href={`#${p}-part`} />
  const defect = <use href={`#${p}-defect`} />
  const arrow = (x: number, y: number) => (
    <path d="M0 0h42m-7-6 7 6-7 6" transform={`translate(${x} ${y})`} fill="none" stroke="currentColor" strokeWidth={0.9} strokeLinecap="round" strokeLinejoin="round" />
  )
  return (
    <svg viewBox={`0 46 ${g.w} 496`} className="w-full" role="img" aria-label="入力画像にマスクをかけると端の欠陥まで消えるが、推論後の異常マップにかけると背景の反応だけが消えて欠陥は残る">
      <Defs p={p} g={g} defect={PC_DEFECT} />
      <path d="M24 300h952" fill="none" stroke="currentColor" strokeWidth={0.9} opacity={0.5} />

      {/* 経路1：入力画像に帯をかける → 端の欠陥まで消える */}
      <Panel p={p} g={g} x={170} y={82}>{part}{defect}</Panel>
      {arrow(382, 157)}
      <Panel p={p} g={g} x={436} y={82}>{part}{defect}<use href={`#${p}-band`} /></Panel>
      {arrow(648, 157)}
      <Panel p={p} g={g} x={702} y={82}>{part}<use href={`#${p}-band`} /></Panel>

      {/* 経路2：推論後の異常マップを輪郭で削る → 四隅だけ消えて欠陥は残る */}
      <Panel p={p} g={g} x={170} y={317}>{part}{defect}</Panel>
      {arrow(382, 392)}
      <Panel p={p} g={g} x={436} y={317}>{part}<use href={`#${p}-corners`} />{defect}</Panel>
      {arrow(648, 392)}
      <Panel p={p} g={g} x={702} y={317}>{part}<use href={`#${p}-contour`} />{defect}</Panel>
    </svg>
  )
}

function DiagramSm() {
  const g = SM
  const p = 'mp-sm'
  const part = <use href={`#${p}-part`} />
  const defect = <use href={`#${p}-defect`} />
  const arrow = (y: number) => (
    <path d="M0 0v24m-6-7 6 7 6-7" transform={`translate(160 ${y})`} fill="none" stroke="currentColor" strokeWidth={0.9} strokeLinecap="round" strokeLinejoin="round" />
  )
  return (
    <svg viewBox={`0 50 ${g.w} 1730`} className="w-full" role="img" aria-label="入力画像にマスクをかけると端の欠陥まで消えるが、推論後の異常マップにかけると背景の反応だけが消えて欠陥は残る">
      <Defs p={p} g={g} defect={SM_DEFECT} />

      <Panel p={p} g={g} x={20} y={118}>{part}{defect}</Panel>
      {arrow(338)}
      <Panel p={p} g={g} x={20} y={372}>{part}{defect}<use href={`#${p}-band`} /></Panel>
      {arrow(592)}
      <Panel p={p} g={g} x={20} y={626}>{part}<use href={`#${p}-band`} /></Panel>

      <path d="M20 906h280" fill="none" stroke="currentColor" strokeWidth={0.9} opacity={0.5} />

      <Panel p={p} g={g} x={20} y={976}>{part}{defect}</Panel>
      {arrow(1196)}
      <Panel p={p} g={g} x={20} y={1230}>{part}<use href={`#${p}-corners`} />{defect}</Panel>
      {arrow(1450)}
      <Panel p={p} g={g} x={20} y={1484}>{part}<use href={`#${p}-contour`} />{defect}</Panel>
    </svg>
  )
}

export function MaskPlacement() {
  return (
    <Schematic
      label="Fig. 02"
      title="マスクを入力画像に置くか、推論後の異常マップに置くか"
    >
      {/* PC：上下2段 × 左から右に3枚 */}
      <div className="hidden sm:block">
        <Overlay ratio="1000 / 496">
          <DiagramPc />
          <Callouts
            items={[
              { no: '01', label: '入力画像にマスク', x: 0.5, y: 13.3, align: 'left', w: 16 },
              { label: '欠陥が消えた', x: 77.4, y: 44.8, align: 'left' },
              { no: '02', label: '異常マップにマスク', x: 0.5, y: 60.7, align: 'left', w: 16 },
              { label: '欠陥は残った', x: 77.4, y: 92.1, align: 'left' },
            ]}
          />
        </Overlay>
      </div>

      {/* スマホ：1画面に1枚ずつ、上から下へ。結果の名前は枠の外に置く（絵に重ねない） */}
      <div className="sm:hidden">
        <Overlay ratio="320 / 1730">
          <DiagramSm />
          <Callouts
            items={[
              { no: '01', label: '入力画像にマスク', x: 6.25, y: 2.4, align: 'left' },
              { label: '欠陥が消えた', x: 6.25, y: 47.2, align: 'left' },
              { no: '02', label: '異常マップにマスク', x: 6.25, y: 51.8, align: 'left' },
              { label: '欠陥は残った', x: 6.25, y: 97.1, align: 'left' },
            ]}
          />
        </Overlay>
      </div>

      <Readout
        items={[
          { value: '44.2%', label: 'マスクなし（ベースライン）の過検出率' },
          { value: '72.4%', label: '入力画像にマスクをかけたとき' },
          { value: '20.8%', label: '推論後の異常マップにかけたとき' },
        ]}
      />

      <Legend
        items={[
          {
            no: '01',
            title: '外周の帯',
            body: '入力画像の四辺を、背景の平均色で塗りつぶす固定幅のマスク。黒で塗らないのは、黒い領域そのものを新しい異常パターンとして学習させないため。',
          },
          {
            no: '02',
            title: '輪郭に沿ったマスク',
            body: '推論後の異常マップから、部品の外側に出た反応だけを判定の対象外にする。入力画像には手を触れないので、欠陥の情報は残る。',
          },
        ]}
      />
    </Schematic>
  )
}
