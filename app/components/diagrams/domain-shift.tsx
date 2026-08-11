import { Callouts, Overlay, type CalloutItem } from '../schematic'

/**
 * ドメインシフト（H-03）。2026-08-11 に実データを見て描き直した。
 *
 * **描き直した理由**
 * 旧版は「分布の形は記録に残っていない」という前提で、標本ラック・治具・計器を
 * 並べた模式図にしていた。これは誤りで、当時の推論スコアは1枚1行で残っている
 * （`~/work/iidzka-inspection/results/b7_cpu_rebuild/scores_all.csv`、519枚）。
 * 実測を集計したところ、本文より強い事実が出た：
 *
 * - 同じ日に撮った良品   n=241  0.2580 〜 0.3812（本文の「上端 0.38」）
 * - 同じ日に撮った不良品  n=178  0.3413 〜 0.9054
 * - 別の日に撮った良品   n=100  0.5385 〜 0.7899（本文の「下端 0.5385」）
 * - 当時の閾値 0.3413
 *
 * 別の日の良品100枚は、閾値の右へ出ただけではなく、**不良品の分布の中に丸ごと入っている**。
 * 不良品178枚のうち108枚（60.7%）は、別の日の良品の最小値より低いスコアだった。
 * 「実験室では勝てるが現場では負ける」の実体はこれなので、その1点だけを図にする。
 *
 * **構図**：スコア軸を1本だけ引き、その上に3群をレーンで重ねずに並べる（リッジライン）。
 * 閾値の破線が3レーンを縦に貫くので、どのレーンが線のどちら側にいるかだけを見ればよい。
 * 高さは群ごとの相対度数（枚数が違うため、レーン内で正規化している）。
 *
 * 数値は SVG に入れず、HTML の Callouts と Readout 側で出す（規約どおり）。
 */

/** 0.25〜0.95 を 0.025 刻みで集計した実測のヒストグラム（28ビン） */
const LO = 0.25
const HI = 0.95
const NBIN = 28
const STEP = (HI - LO) / NBIN

const GOOD = [28, 88, 64, 48, 11, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const DEFECT = [0, 0, 0, 3, 2, 7, 14, 14, 15, 22, 20, 18, 6, 8, 8, 8, 10, 5, 5, 5, 0, 1, 1, 4, 1, 0, 1, 0]
const HOLDOUT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 5, 13, 23, 19, 19, 11, 2, 2, 2, 0, 0, 0, 0, 0, 0]

const THRESHOLD = 0.3413
const GOOD_TOP = 0.3812
const SHIFT_LOW = 0.5385

/** 階段状の輪郭。ゼロが続く両端は描かない（軸と二重になるため） */
function stepPath(bins: number[], toX: (s: number) => number, base: number, height: number) {
  const peak = Math.max(...bins)
  const first = bins.findIndex((n) => n > 0)
  let last = bins.length - 1
  while (bins[last] === 0) last -= 1

  const x = (i: number) => +toX(LO + i * STEP).toFixed(1)
  const y = (n: number) => +(base - (n / peak) * height).toFixed(1)

  let d = `M${x(first)} ${base}`
  for (let i = first; i <= last; i += 1) d += `V${y(bins[i])}H${x(i + 1)}`
  return `${d}V${base}Z`
}

/** 軸の目盛（0.3〜0.9 を 0.1 刻み）。数字は出さず、刻みだけ置く */
const TICKS = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]

function Patterns({ id }: { id: string }) {
  return (
    <defs>
      <pattern
        id={`${id}-defect`}
        width="7"
        height="7"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeWidth="1" opacity=".26" />
      </pattern>
      <pattern
        id={`${id}-shift`}
        width="6"
        height="6"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="6"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          opacity=".5"
        />
      </pattern>
      <marker
        id={`${id}-arrow`}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        {/* marker は参照元の currentColor を継承しないので、色を直に書く */}
        <path d="M0 1L9 5L0 9Z" fill="currentColor" />
      </marker>
    </defs>
  )
}

/* ────────────────────────── 横組み（デスクトップ） ────────────────────────── */

const W_X0 = 240
const W_SPAN = 722
const wideX = (s: number) => W_X0 + ((s - LO) / (HI - LO)) * W_SPAN
const W_LANES = [140, 285, 430]
const W_H = 96

function Ridgeline() {
  const thr = +wideX(THRESHOLD).toFixed(1)

  return (
    <svg
      viewBox="0 0 1000 470"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-foreground"
    >
      <Patterns id="h03w" />

      {/* 製図の見当。左の余白と作図領域を分ける */}
      <g stroke="currentColor" strokeWidth="1" opacity=".22">
        <path d="M16 20V450M984 20V450" />
        <path d="M16 20H40M960 20H984M16 450H40M960 450H984" />
      </g>

      {/* 3本のレーンの基線 */}
      <g stroke="currentColor" strokeWidth="1.25">
        {W_LANES.map((base) => (
          <path key={base} d={`M${W_X0} ${base}H962`} />
        ))}
      </g>

      {/* 目盛。数字は出さない */}
      <g stroke="currentColor" strokeWidth="1" opacity=".45">
        {TICKS.map((t) => (
          <path
            key={t}
            d={`M${wideX(t).toFixed(1)} ${W_LANES[2]}V${W_LANES[2] + 9}`}
          />
        ))}
        <path d={`M${W_X0} ${W_LANES[2] + 9}V${W_LANES[2]}`} />
      </g>

      {/* 01 当時の閾値。3レーンを貫く */}
      <g stroke="currentColor">
        <path d={`M${thr} 30V446`} strokeWidth="1.5" strokeDasharray="6 5" />
        <path d={`M${thr} 40H${thr + 74}`} strokeWidth="1.25" markerEnd="url(#h03w-arrow)" />
      </g>

      {/* 学習と同じ日に撮った良品。閾値の左に収まっている（右へ出た分が当時の過検出） */}
      <g stroke="currentColor" strokeWidth="1.75">
        <path d={stepPath(GOOD, wideX, W_LANES[0], W_H)} />
      </g>
      <g stroke="currentColor" strokeWidth="1.5">
        <path d={`M${wideX(GOOD_TOP).toFixed(1)} ${W_LANES[0]}V${W_LANES[0] + 16}`} />
      </g>

      {/* 学習と同じ日に撮った不良品。閾値の右へ広がる */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d={stepPath(DEFECT, wideX, W_LANES[1], W_H)} fill="url(#h03w-defect)" />
      </g>

      {/* 別の日に撮った良品100枚。良品なのに、上の不良品の分布の中へ丸ごと入っている */}
      <g stroke="hsl(var(--primary))" strokeWidth="2">
        <path d={stepPath(HOLDOUT, wideX, W_LANES[2], W_H)} fill="url(#h03w-shift)" />
        <path d={`M${wideX(SHIFT_LOW).toFixed(1)} ${W_LANES[2]}V${W_LANES[2] + 16}`} />
        {/* 別の日の良品が占めた範囲。不良品レーンの足元に寸法線として引き、
            そのまま真下の朱の山とつながる。ここが「不良品の山の中」の実体 */}
        <path
          d={`M${wideX(SHIFT_LOW).toFixed(1)} ${W_LANES[1] + 18}H${wideX(0.7899).toFixed(1)}`}
          strokeWidth="1.5"
        />
        <path
          d={`M${wideX(SHIFT_LOW).toFixed(1)} ${W_LANES[1] + 10}V${W_LANES[1] + 26}M${wideX(0.7899).toFixed(1)} ${W_LANES[1] + 10}V${W_LANES[1] + 26}`}
          strokeWidth="1.5"
        />
      </g>
    </svg>
  )
}

const WIDE: CalloutItem[] = [
  { label: '学習と同じ日に撮った良品', x: 1.6, y: 18.1, align: 'left', w: 21 },
  { label: '学習と同じ日に撮った不良品', x: 1.6, y: 48.9, align: 'left', w: 21 },
  { label: '別の日に撮った良品 100枚', x: 1.6, y: 79.8, align: 'left', w: 21, accent: true },
  { no: '01', label: '当時の閾値 ― この右は不良と判定', x: 33.4, y: 4.5, align: 'left' },
  { no: '02', label: '良品の上端 0.38', x: 37.8, y: 33.4, align: 'left' },
  { no: '03', label: '別の日の良品の下端 0.5385', x: 53.8, y: 86.2, align: 'right', accent: true },
]

/* ────────────────────────── 縦組み（モバイル） ────────────────────────── */

const N_X0 = 34
const N_SPAN = 272
const narrowX = (s: number) => N_X0 + ((s - LO) / (HI - LO)) * N_SPAN
const N_LANES = [165, 300, 435]
const N_H = 62

function RidgelineNarrow() {
  const thr = +narrowX(THRESHOLD).toFixed(1)

  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-foreground"
    >
      <Patterns id="h03n" />

      <g stroke="currentColor" strokeWidth="1.25">
        {N_LANES.map((base) => (
          <path key={base} d={`M${N_X0} ${base}H310`} />
        ))}
      </g>

      <g stroke="currentColor" strokeWidth="1" opacity=".45">
        {TICKS.map((t) => (
          <path key={t} d={`M${narrowX(t).toFixed(1)} ${N_LANES[2]}V${N_LANES[2] + 7}`} />
        ))}
      </g>

      {/* 01 当時の閾値 */}
      <g stroke="currentColor">
        <path d={`M${thr} 44V452`} strokeWidth="1.25" strokeDasharray="5 4" />
        <path d={`M${thr} 52H${thr + 44}`} strokeWidth="1" markerEnd="url(#h03n-arrow)" />
      </g>

      <g stroke="currentColor" strokeWidth="1.5">
        <path d={stepPath(GOOD, narrowX, N_LANES[0], N_H)} />
        <path d={`M${narrowX(GOOD_TOP).toFixed(1)} ${N_LANES[0]}V${N_LANES[0] + 11}`} />
      </g>

      <g stroke="currentColor" strokeWidth="1.25">
        <path d={stepPath(DEFECT, narrowX, N_LANES[1], N_H)} fill="url(#h03n-defect)" />
      </g>

      <g stroke="hsl(var(--primary))" strokeWidth="1.75">
        <path d={stepPath(HOLDOUT, narrowX, N_LANES[2], N_H)} fill="url(#h03n-shift)" />
        <path d={`M${narrowX(SHIFT_LOW).toFixed(1)} ${N_LANES[2]}V${N_LANES[2] + 11}`} />
        <path
          d={`M${narrowX(SHIFT_LOW).toFixed(1)} ${N_LANES[1] + 13}H${narrowX(0.7899).toFixed(1)}`}
          strokeWidth="1.25"
        />
        <path
          d={`M${narrowX(SHIFT_LOW).toFixed(1)} ${N_LANES[1] + 7}V${N_LANES[1] + 19}M${narrowX(0.7899).toFixed(1)} ${N_LANES[1] + 7}V${N_LANES[1] + 19}`}
          strokeWidth="1.25"
        />
      </g>
    </svg>
  )
}

const NARROW: CalloutItem[] = [
  { label: '学習と同じ日の良品', x: 1.5, y: 17.1, align: 'left' },
  { label: '学習と同じ日の不良品', x: 1.5, y: 45.2, align: 'left' },
  { label: '別の日に撮った良品 100枚', x: 1.5, y: 73.3, align: 'left', accent: true },
  { no: '01', label: '当時の閾値', x: 21.7, y: 6.3, align: 'left' },
  { no: '02', label: '上端 0.38', x: 26.6, y: 37.7, align: 'left' },
  { no: '03', label: '下端 0.5385', x: 45.6, y: 86.5, align: 'right', accent: true },
]

export function DomainShift() {
  return (
    <div className="not-prose">
      <Overlay ratio="1000 / 470" className="hidden max-w-[900px] sm:block">
        <Ridgeline />
        <Callouts items={WIDE} />
      </Overlay>
      <Overlay ratio="320 / 480" className="max-w-[320px] sm:hidden">
        <RidgelineNarrow />
        <Callouts items={NARROW} />
      </Overlay>
    </div>
  )
}
