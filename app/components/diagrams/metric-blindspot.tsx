import { Callouts, Overlay, type CalloutItem } from '../schematic'

/**
 * 評価指標の欠陥（H-01）。GPTから受け取った第2版（claudedocs/received/）を元に実装した。
 *
 * 受領版からの修正（重要）：
 * 草案は「旧指標が見ていた範囲」を左列（01・03）としていたが、これは誤り。
 * 検出率 = 01 /（01 + 02）なので、旧指標が見ていたのは実際に不良だった側の行、
 * つまり上段（01・02）になる。良品側の行（03・04）が計算に入らないからこそ、
 * 全品を不良と判定すると03が膨らんでも数字に出ない、というのが記事の主旨。
 * ハッチングと05のブラケットを上段へ移し、凡例も本文に合わせて書き直している。
 * 06（全品を不良と判定）が左列＝不良と判定した側を満たすのは草案のままで正しい。
 * その結果、06が塗る範囲と05が見ている範囲が食い違う——それがこの図の要点になる。
 *
 * 設計の要点：
 * - 名前はHTMLでSVGに重ねる（Callouts）。番号だけだと図と凡例の往復が要る
 * - モバイルは盤面を縦に積み替える。横組みのまま縮めると番号が読めなくなる
 */

/** 横組み（デスクトップ） */
function Wide() {
  return (
    <svg
      viewBox="0 0 1000 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-foreground"
    >
      <defs>
        <pattern
          id="h01-hatch"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" opacity=".34" />
        </pattern>
        <marker
          id="h01-arrow"
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

      {/* 06 全品を不良側へ送る極端な判定。不良と判定した側＝左列を満たす */}
      <g className="text-primary" stroke="currentColor" strokeWidth="2.25">
        <path d="M62 146H176V314H62Z" />
        <path d="M82 174H156V222H82ZM82 238H156V286H82Z" />
        <path d="M176 198H236V210H278" markerEnd="url(#h01-arrow)" />
        <path d="M176 262H218V270H278" markerEnd="url(#h01-arrow)" />
        <circle cx="74" cy="158" r="3" />
        <circle cx="164" cy="158" r="3" />
        <circle cx="74" cy="302" r="3" />
        <circle cx="164" cy="302" r="3" />
      </g>

      {/* 2×2の盤面。上段＝実際に不良だった側、左列＝不良と判定した側 */}
      <g stroke="currentColor" strokeWidth="1.5">
        <rect x="300" y="90" width="360" height="280" />
        <line x1="480" y1="90" x2="480" y2="370" />
        <line x1="300" y1="230" x2="660" y2="230" />
        <circle cx="312" cy="102" r="3" />
        <circle cx="648" cy="102" r="3" />
        <circle cx="312" cy="358" r="3" />
        <circle cx="648" cy="358" r="3" />
        {/* 旧指標が計算に使っていた上段だけをハッチングする */}
        <path d="M322 116H458V204H322Z" fill="url(#h01-hatch)" />
        <path d="M502 116H638V204H502Z" fill="url(#h01-hatch)" />
        {/* 計算に入らなかった下段は無印のまま */}
        <path d="M322 256H458V344H322Z" />
        <path d="M502 256H638V344H502Z" />
      </g>

      {/* 05 旧指標の作用範囲。上段だけを囲う */}
      <g className="text-primary" stroke="currentColor" strokeWidth="3">
        <path d="M668 96H684V224H668" />
      </g>

      {/* 01〜04 象限番号 */}

      {/* 盤面から新しい指標群への接続 */}
      <g stroke="currentColor" strokeWidth="1.25" opacity=".62">
        <path d="M660 300H710" />
        <circle cx="660" cy="300" r="4" fill="hsl(var(--background))" />
        <circle cx="710" cy="300" r="4" fill="hsl(var(--background))" />
        <path d="M710 130V330" />
      </g>

      {/* 07 F1。3象限を使う */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M710 130H748" />
        <rect x="748" y="82" width="176" height="96" />
        <rect x="772" y="102" width="64" height="56" />
        <line x1="804" y1="102" x2="804" y2="158" />
        <line x1="772" y1="130" x2="836" y2="130" />
        <path d="M774 104H802V128H774ZM806 104H834V128H806ZM774 132H802V156H774Z" fill="url(#h01-hatch)" />
      </g>

      {/* 08 ROC。4象限すべてを使う */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M710 230H748" />
        <rect x="748" y="182" width="176" height="96" />
        <rect x="772" y="202" width="64" height="56" />
        <line x1="804" y1="202" x2="804" y2="258" />
        <line x1="772" y1="230" x2="836" y2="230" />
        <path
          d="M774 204H802V228H774ZM806 204H834V228H806ZM774 232H802V256H774ZM806 232H834V256H806Z"
          fill="url(#h01-hatch)"
        />
      </g>

      {/* 09 AUC */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M710 330H748" />
        <rect x="748" y="282" width="176" height="96" />
        <rect x="772" y="302" width="64" height="56" />
        <line x1="804" y1="302" x2="804" y2="358" />
        <line x1="772" y1="330" x2="836" y2="330" />
        <path
          d="M774 304H802V328H774ZM806 304H834V328H806ZM774 332H802V356H774ZM806 332H834V356H806Z"
          fill="url(#h01-hatch)"
        />
      </g>
    </svg>
  )
}

/** 縦組み（モバイル）。盤面を主役に残し、指標群を下へ回す */
function Narrow() {
  return (
    <svg
      /* 描画は y=159〜491 に収まる。0起点だと図の上に3割の空白が出る */
      viewBox="0 150 320 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-foreground"
    >
      <defs>
        <pattern
          id="h01m-hatch"
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="9" stroke="currentColor" strokeWidth="1" opacity=".34" />
        </pattern>
        <marker
          id="h01m-arrow"
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

      {/* 06 */}
      <g className="text-primary" stroke="currentColor" strokeWidth="2">
        <path d="M14 190H86V300H14Z" />
        <path d="M24 202H76V238H24ZM24 252H76V288H24Z" />
        <path d="M86 214H106V206H128" markerEnd="url(#h01m-arrow)" />
        <path d="M86 276H106V284H128" markerEnd="url(#h01m-arrow)" />
      </g>

      {/* 盤面 */}
      <g stroke="currentColor" strokeWidth="1.5">
        <rect x="130" y="170" width="150" height="150" />
        <line x1="205" y1="170" x2="205" y2="320" />
        <line x1="130" y1="245" x2="280" y2="245" />
        <circle cx="139" cy="179" r="2.5" />
        <circle cx="271" cy="179" r="2.5" />
        <circle cx="139" cy="311" r="2.5" />
        <circle cx="271" cy="311" r="2.5" />
        <path d="M140 180H195V235H140Z" fill="url(#h01m-hatch)" />
        <path d="M215 180H270V235H215Z" fill="url(#h01m-hatch)" />
        <path d="M140 255H195V310H140Z" />
        <path d="M215 255H270V310H215Z" />
      </g>

      {/* 05 上段だけを囲う */}
      <g className="text-primary" stroke="currentColor" strokeWidth="2.5">
        <path d="M288 174H300V241H288" />
      </g>

      {/* 01〜04 */}

      {/* 指標群へ */}
      <g stroke="currentColor" strokeWidth="1.25" opacity=".62">
        <path d="M205 320V360M60 360H260M60 360V400M160 360V400M260 360V400" />
        <circle cx="205" cy="320" r="3.5" fill="hsl(var(--background))" />
      </g>

      {/* 07 / 08 / 09 */}
      <g stroke="currentColor" strokeWidth="1.25">
        <rect x="20" y="400" width="80" height="60" />
        <rect x="34" y="412" width="52" height="40" />
        <line x1="60" y1="412" x2="60" y2="452" />
        <line x1="34" y1="432" x2="86" y2="432" />
        <path d="M34 412H60V432H34ZM60 412H86V432H60ZM34 432H60V452H34Z" fill="url(#h01m-hatch)" />

        <rect x="120" y="400" width="80" height="60" />
        <rect x="134" y="412" width="52" height="40" />
        <line x1="160" y1="412" x2="160" y2="452" />
        <line x1="134" y1="432" x2="186" y2="432" />
        <path
          d="M134 412H160V432H134ZM160 412H186V432H160ZM134 432H160V452H134ZM160 432H186V452H160Z"
          fill="url(#h01m-hatch)"
        />

        <rect x="220" y="400" width="80" height="60" />
        <rect x="234" y="412" width="52" height="40" />
        <line x1="260" y1="412" x2="260" y2="452" />
        <line x1="234" y1="432" x2="286" y2="432" />
        <path
          d="M234 412H260V432H234ZM260 412H286V432H260ZM234 432H260V452H234ZM260 432H286V452H260Z"
          fill="url(#h01m-hatch)"
        />
      </g>
    </svg>
  )
}

const WIDE: CalloutItem[] = [
  { no: '05', label: '旧指標が見ていた範囲', x: 57, y: 13, accent: true },
  { no: '06', label: '全品を不良と判定すると', x: 6.2, y: 22, align: 'left', accent: true },
  { no: '01', label: '不良を検出', x: 39, y: 34.8 },
  { no: '02', label: '見逃し', x: 57, y: 34.8 },
  { no: '03', label: '過検出', x: 39, y: 65.2 },
  { no: '04', label: '良品を通過', x: 57, y: 65.2 },
  { no: '07', label: 'F1', x: 85, y: 28.3, align: 'left' },
  { no: '08', label: 'ROC', x: 85, y: 50, align: 'left' },
  { no: '09', label: 'AUC', x: 85, y: 71.7, align: 'left' },
]

const NARROW: CalloutItem[] = [
  { no: '06', label: '全品を不良と判定', x: 2, y: 6.3, align: 'left', accent: true },
  { no: '05', label: '旧指標が見た範囲', x: 98, y: 6.3, align: 'right', accent: true },
  { no: '01', label: '検出', x: 52, y: 15 },
  { no: '02', label: '見逃し', x: 75.6, y: 15 },
  { no: '03', label: '過検出', x: 52, y: 36 },
  { no: '04', label: '通過', x: 75.6, y: 36 },
  { no: '07', label: 'F1', x: 18.75, y: 93.7 },
  { no: '08', label: 'ROC', x: 50, y: 93.7 },
  { no: '09', label: 'AUC', x: 81.25, y: 93.7 },
]

export function MetricBlindspot() {
  return (
    <div className="not-prose">
      <Overlay ratio="1000 / 460" className="hidden max-w-[900px] sm:block">
        <Wide />
        <Callouts items={WIDE} />
      </Overlay>
      <Overlay ratio="320 / 350" className="max-w-[320px] sm:hidden">
        <Narrow />
        <Callouts items={NARROW} />
      </Overlay>
    </div>
  )
}
