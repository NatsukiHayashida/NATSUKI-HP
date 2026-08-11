import { Callouts, Legend, Overlay, Readout, Schematic } from '@/app/components/schematic'

/**
 * H-09 評価指標の欠陥 — 見ていたのは4象限のうち下の行だけ。
 *
 * 判定は4通りに分かれる。行が「実際にどちらだったか」、列が「機械がどう判定したか」。
 * 旧指標（不良品の検出率）は下の行しか集計していないので、
 * 「全品を不良と判定するだけの装置」と「実際に動いたモデル」が同じ点数になる。
 *
 * 実数は results/eval/patchcore_baseline_v1/eval_summary.json より
 *   テスト461枚（良品283 / 不良178）、TP178 / FP125 / TN158 / FN0
 *   盤面A（全品を不良と判定）  上段 283:0   下段 178:0  → どちらも左100%
 *   盤面B（実際のモデル）      上段 125:158 下段 178:0  → 上段だけ 44.2%
 *
 * 下の行が2つとも同じ絵になることが結論。行ごとに合計100%として分割位置を決めている。
 * 朱は「旧指標が見ていた範囲」の一つの意味に固定する。良否や正誤には使わない。
 */

const SPLIT = 0.442 // 125 / 283。上段の分割位置

function Boards({ p, bw, bh, tick }: { p: string; bw: number; bh: number; tick: number }) {
  const mid = bh / 2
  const x = +(bw * SPLIT).toFixed(3)
  const line = { fill: 'none', stroke: 'currentColor', strokeWidth: bw > 300 ? 2 : 1.8 } as const
  // 下の行だけを囲む。左に飛び出す短い爪がブラケットに見える
  const seen = `M-${tick} ${mid}H0v${mid}h-${tick}M0 ${mid}h${bw}M0 ${bh}h${bw}M${bw} ${mid}v${mid}`
  const accent = {
    fill: 'none',
    stroke: 'hsl(var(--primary))',
    strokeWidth: bw > 300 ? 3 : 2.6,
    strokeLinecap: 'square',
  } as const
  return (
    <>
      <g id={`${p}-a`}>
        <rect width={bw} height={bh} {...line} />
        <path d={`M0 0h${bw}v${mid}H0zM0 ${mid}h${bw}v${mid}H0z`} fill={`url(#${p}-hatch)`} />
        <path d={`M0 ${mid}h${bw}`} {...line} />
        <path d={seen} {...accent} />
      </g>
      <g id={`${p}-b`}>
        <rect width={bw} height={bh} {...line} />
        <path d={`M0 0h${x}v${mid}H0zM0 ${mid}h${bw}v${mid}H0z`} fill={`url(#${p}-hatch)`} />
        <path d={`M${x} 0v${mid}M0 ${mid}h${bw}`} {...line} />
        <path d={seen} {...accent} />
      </g>
    </>
  )
}

function Hatch({ p, size }: { p: string; size: number }) {
  return (
    <pattern id={`${p}-hatch`} width={size} height={size} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <path d={`M0 0v${size}`} fill="none" stroke="currentColor" strokeWidth={1.2} />
    </pattern>
  )
}

const LABEL =
  '同じ検出率100%でも、全品を不良と判定するだけの装置と、実際に働くモデルは、良品側の内訳がまったく違う。旧指標はその違いを集計していなかった'

function DiagramPc() {
  const p = 'mb-pc'
  return (
    <svg viewBox="0 60 1000 350" className="w-full" role="img" aria-label={LABEL}>
      <defs>
        <Hatch p={p} size={10} />
        <Boards p={p} bw={320} bh={220} tick={9} />
      </defs>
      <use href={`#${p}-a`} transform="translate(150 120)" />
      <use href={`#${p}-b`} transform="translate(530 120)" />
    </svg>
  )
}

function DiagramSm() {
  const p = 'mb-sm'
  // 盤面を右へ寄せて、左に行の名前を置く余白（84）を作る。
  // 幅いっぱいに描くと名前がハッチングの上に乗ってしまい、どちらの行か図から読めなくなる
  return (
    <svg viewBox="0 56 320 464" className="w-full" role="img" aria-label={LABEL}>
      <defs>
        <Hatch p={p} size={9} />
        <Boards p={p} bw={216} bh={149} tick={7} />
      </defs>
      <use href={`#${p}-a`} transform="translate(84 100)" />
      <use href={`#${p}-b`} transform="translate(84 320)" />
    </svg>
  )
}

export function MetricBlindspot() {
  return (
    <Schematic
      label="Fig. 01"
      title="旧指標が集計していたのは、4象限のうち下の行だけだった"
    >
      <div className="hidden sm:block">
        <Overlay ratio="1000 / 350">
          <DiagramPc />
          <Callouts
            items={[
              { label: '全品を不良と判定するだけの装置', x: 15, y: 4, align: 'left', w: 34 },
              { label: '実際に動かしたモデル', x: 53, y: 4, align: 'left', w: 34 },
              { no: '01', label: '実際は良品', x: 3, y: 26, align: 'left', w: 11 },
              { no: '02', label: '実際は不良', x: 3, y: 60, align: 'left', w: 11 },
              { label: '旧指標が見ていた範囲', x: 15, y: 92, align: 'left', accent: true },
            ]}
          />
        </Overlay>
      </div>

      <div className="sm:hidden">
        <Overlay ratio="320 / 464">
          <DiagramSm />
          <Callouts
            items={[
              { label: '全品を不良と判定するだけの装置', x: 4, y: 6.9, align: 'left', w: 88 },
              { no: '01', label: '実際は良品', x: 2, y: 17.5, align: 'left', w: 24 },
              { no: '02', label: '実際は不良', x: 2, y: 33.6, align: 'left', w: 24 },
              { label: '実際に動かしたモデル', x: 4, y: 54.3, align: 'left', w: 88 },
              { label: '旧指標が見ていた範囲', x: 4, y: 95, align: 'left' },
            ]}
          />
        </Overlay>
      </div>

      <Readout
        items={[
          { value: '100%', label: 'どちらの盤面も、旧指標では検出率100%・見逃し0枚' },
          { value: '283枚', label: '左の装置が捨てた良品（良品の全数）' },
          { value: '125枚', label: '右のモデルが捨てた良品（44.2%）' },
        ]}
      />

      <Legend
        items={[
          {
            no: '01',
            title: '実際は良品だった283枚',
            body: 'ハッチングが「機械が不良と判定した範囲」。左は全数を捨てており、右は125枚にとどまる。ここが2つの盤面で唯一違う場所だが、旧指標はこの行を見ていない。',
          },
          {
            no: '02',
            title: '実際は不良だった178枚',
            body: '両方とも全数を捕まえている（見逃しゼロ）。旧指標が集計していたのはこの行だけなので、どちらも満点になる。',
          },
        ]}
      />
    </Schematic>
  )
}
