import { Callouts, Overlay, type CalloutItem } from '../schematic'

/**
 * 評価指標の欠陥（H-01）。2026-08-11 に情報量を落として作り直した。
 *
 * **作り直した理由**
 * 旧版は1枚に、盤面・旧指標の作用範囲・全品不良判定の装置・F1・ROC・AUC まで詰めていた。
 * 番号は9個あり、凡例を往復しないと読めない。しかも F1 / ROC / AUC は本文では
 * 次の節（評価フレームワークを自作した話）の題材で、この図の主題ではない。
 *
 * この図の結論は一つだけにする ―― **旧指標は4象限のうち上段2つしか見ていない**。
 * 証明は、同じ盤面をもう1枚置いて「全品を不良と判定した場合」を並べること。
 * 上段だけを見ていると、その盤面が満点になってしまう。
 *
 * 盤面の向き（旧版から不変。取り違えると意味が反転するので必ず確認すること）：
 * - 行＝実際（上段が不良、下段が良品）
 * - 列＝判定（左が不良と判定、右が良品と判定）
 * - 検出率 = 左上 /（左上 + 右上）なので、旧指標の計算範囲は **上段** になる
 *
 * 軸の見出しは置いていない。4つの象限名（不良を検出／見逃し／過検出／良品を通過）が
 * 行と列の意味を一意に決めるため、見出しを足すと文字が増えるだけになる。
 */

const HATCH_OPACITY = '.34'

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <pattern
        id={`${id}-hatch`}
        width="10"
        height="10"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)"
      >
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="10"
          stroke="currentColor"
          strokeWidth="1"
          opacity={HATCH_OPACITY}
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
        {/* markerの中身は参照元のcurrentColorを継承しない。朱を直に指定する */}
        <path d="M0 1L9 5L0 9Z" fill="hsl(var(--primary))" />
      </marker>
    </defs>
  )
}

type Board = { x: number; y: number; w: number; h: number }

/** 盤面1枚。上段（旧指標の計算範囲）だけハッチングし、行の境目を朱で強調する */
function Grid({ b, id, inset }: { b: Board; id: string; inset: number }) {
  const mx = b.x + b.w / 2
  const my = b.y + b.h / 2
  return (
    <>
      <g stroke="currentColor" strokeWidth="1.5">
        <rect x={b.x} y={b.y} width={b.w} height={b.h} />
        <line x1={mx} y1={b.y} x2={mx} y2={b.y + b.h} />
        {/* 見当。製図の枠に合わせる */}
        <circle cx={b.x + inset} cy={b.y + inset} r="3" />
        <circle cx={b.x + b.w - inset} cy={b.y + inset} r="3" />
        <circle cx={b.x + inset} cy={b.y + b.h - inset} r="3" />
        <circle cx={b.x + b.w - inset} cy={b.y + b.h - inset} r="3" />
        {/* 旧指標が計算に使う上段だけを塗る */}
        <path
          d={`M${b.x} ${b.y}H${mx}V${my}H${b.x}Z`}
          fill={`url(#${id}-hatch)`}
          strokeWidth="0"
        />
        <path
          d={`M${mx} ${b.y}H${b.x + b.w}V${my}H${mx}Z`}
          fill={`url(#${id}-hatch)`}
          strokeWidth="0"
        />
      </g>
      {/* 行の境目。ここから上だけが数字になる */}
      <g stroke="hsl(var(--primary))" strokeWidth="2.5">
        <path d={`M${b.x - 14} ${my}H${b.x + b.w + 14}`} />
        <path d={`M${b.x - 14} ${my - 7}V${my + 7}M${b.x + b.w + 14} ${my - 7}V${my + 7}`} />
      </g>
    </>
  )
}

/** 全品を不良と判定した状態。左列（不良と判定した側）へ全部寄せる */
function SweptLeft({ b, id }: { b: Board; id: string }) {
  const mx = b.x + b.w / 2
  const my = b.y + b.h / 2
  const arrow = (y: number) => `M${b.x + b.w - 24} ${y}H${mx + 26}`
  return (
    <>
      <rect
        x={b.x}
        y={b.y}
        width={b.w / 2}
        height={b.h}
        fill="hsl(var(--primary))"
        opacity=".15"
      />
      <g stroke="hsl(var(--primary))" strokeWidth="2" markerEnd={`url(#${id}-arrow)`}>
        <path d={arrow(b.y + b.h / 4)} />
        <path d={arrow(my + b.h / 4)} />
      </g>
    </>
  )
}

/* ────────────────────────── 横組み（デスクトップ） ────────────────────────── */

const A: Board = { x: 120, y: 86, w: 340, h: 260 }
const B: Board = { x: 620, y: 86, w: 340, h: 260 }

function Wide() {
  return (
    <svg
      viewBox="0 0 1000 430"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-foreground"
    >
      <Defs id="h01" />
      <Grid b={A} id="h01" inset={12} />
      <Grid b={B} id="h01" inset={12} />
      <SweptLeft b={B} id="h01" />
      {/* 2枚の盤面は同じもの。違いは中身だけ、と分かるように間を細線でつなぐ */}
      <g stroke="currentColor" strokeWidth="1" opacity=".3">
        <path d="M492 216H588" strokeDasharray="5 6" />
      </g>
    </svg>
  )
}

const WIDE: CalloutItem[] = [
  { no: '01', label: '旧指標が計算に使うのは、この線から上だけ', x: 12, y: 10, align: 'left' },
  { label: '不良を検出', x: 20.5, y: 33.7 },
  { label: '見逃し', x: 37.5, y: 33.7 },
  { label: '過検出', x: 20.5, y: 64 },
  { label: '良品を通過', x: 37.5, y: 64 },
  { no: '02', label: '全品を不良と判定すると', x: 62, y: 10, align: 'left', accent: true },
]

/* ────────────────────────── 縦組み（モバイル） ────────────────────────── */

const AN: Board = { x: 48, y: 62, w: 224, h: 176 }
const BN: Board = { x: 48, y: 350, w: 224, h: 176 }

function Narrow() {
  return (
    <svg
      viewBox="0 0 320 545"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-foreground"
    >
      <Defs id="h01m" />
      <Grid b={AN} id="h01m" inset={9} />
      <Grid b={BN} id="h01m" inset={9} />
      <SweptLeft b={BN} id="h01m" />
      <g stroke="currentColor" strokeWidth="1" opacity=".3">
        <path d="M160 252V300" strokeDasharray="5 6" />
      </g>
    </svg>
  )
}

const NARROW: CalloutItem[] = [
  { no: '01', label: 'この線から上だけが数字になる', x: 1.5, y: 6.5, align: 'left' },
  { label: '不良を検出', x: 32.5, y: 19.3 },
  { label: '見逃し', x: 67.5, y: 19.3 },
  { label: '過検出', x: 32.5, y: 35.4 },
  { label: '良品を通過', x: 67.5, y: 35.4 },
  { no: '02', label: '全品を不良と判定すると', x: 1.5, y: 59.4, align: 'left', accent: true },
]

export function MetricBlindspot() {
  return (
    <div className="not-prose">
      <Overlay ratio="1000 / 430" className="hidden max-w-[900px] sm:block">
        <Wide />
        <Callouts items={WIDE} />
      </Overlay>
      <Overlay ratio="320 / 545" className="max-w-[320px] sm:hidden">
        <Narrow />
        <Callouts items={NARROW} />
      </Overlay>
    </div>
  )
}
