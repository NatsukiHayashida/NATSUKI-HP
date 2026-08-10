import { Callouts, Overlay, type CalloutItem } from '../schematic'

/**
 * 19.6時間の内訳（H-04）。GPTから受け取った草案（claudedocs/received/）を元に実装した。
 *
 * 設計の要点：
 * - 帯の分割位置は実数から取る。13.8/19.6 = 70.4% → 横組みの分割線 x=593（100〜800の帯）
 * - 計測欠損25%は面積ではなく「帯の厚みの25%」を貫くハッチングで表す。
 *   全区間にかかっていることを示すため（一部の区間だけ欠損したのではない）
 * - モバイルは帯を縦に倒す。横組みのまま縮めると番号バルーンが5px以下になって読めない。
 *   縦組みでは厚み方向が横になるので、ハッチングは右25%へ回る（意味は同じ）
 * - **名前はHTMLでSVGに重ねる**（Callouts）。番号だけだと図と凡例を往復することになり、
 *   図を読むのに一手間かかる。Legend は補足の説明に徹する
 */

/** 横組み（デスクトップ）。時間軸は左→右 */
function Horizontal() {
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
          id="h04-missing"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="12" stroke="currentColor" strokeWidth="1" opacity=".42" />
        </pattern>
        <pattern id="h04-record" width="9" height="9" patternUnits="userSpaceOnUse">
          <line x1="0" y1="4.5" x2="9" y2="4.5" stroke="currentColor" strokeWidth=".8" opacity=".32" />
        </pattern>
        <marker
          id="h04-loop-arrow"
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

      {/* 基準線 */}
      <g stroke="currentColor" strokeWidth="1" opacity=".28">
        <path d="M86 58H914M86 356H914M100 46V70M800 46V70" />
      </g>

      {/* 05 全体の寸法線 */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M100 88H800M100 78V98M800 78V98" />
        <path d="M100 88L116 83V93ZM800 88L784 83V93Z" fill="currentColor" />
      </g>

      {/* 帯本体。分割線 x=593 が 70.4% にあたる */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M100 126H800V286H100Z" />
        <path d="M593 126V286" />
        <circle cx="116" cy="142" r="4" />
        <circle cx="577" cy="142" r="4" />
        <circle cx="609" cy="142" r="4" />
        <circle cx="784" cy="142" r="4" />
        <circle cx="116" cy="270" r="4" />
        <circle cx="577" cy="270" r="4" />
        <circle cx="609" cy="270" r="4" />
        <circle cx="784" cy="270" r="4" />
      </g>

      {/* 01 手戻りのループ */}
      <g className="text-primary" stroke="currentColor" strokeWidth="2.5">
        <path
          d="M164 176C164 150 188 146 212 146H486C522 146 546 164 546 192V218C546 246 522 264 486 264H212C176 264 152 246 152 218V194"
          markerEnd="url(#h04-loop-arrow)"
        />
        <circle cx="246" cy="205" r="34" fill="hsl(var(--background))" />
        <circle cx="350" cy="205" r="34" fill="hsl(var(--background))" />
        <circle cx="454" cy="205" r="34" fill="hsl(var(--background))" />
        <circle cx="246" cy="205" r="8" />
        <circle cx="350" cy="205" r="8" />
        <circle cx="454" cy="205" r="8" />
        <path d="M280 205H316M384 205H420" />
      </g>

      {/* 02 正味の作業 */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M624 205H766" />
        <path d="M624 205L640 197V213Z" fill="hsl(var(--background))" />
        <path d="M766 205L750 197V213Z" fill="currentColor" />
        <path d="M640 176H750V234H640ZM658 188V222M732 188V222" />
      </g>

      {/* 03 計測欠損。帯の厚みの25%を全区間に通す */}
      <path d="M100 246H800V286H100Z" fill="url(#h04-missing)" stroke="currentColor" strokeWidth="1" />

      {/* 04 発端になった穴あけ1つ */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M826 112H934V224H826ZM826 136H934" />
        <path d="M844 154H896V202H844Z" />
        <circle cx="870" cy="178" r="13" />
        <circle cx="870" cy="178" r="4" />
        <path d="M870 151C891 151 902 162 902 178S891 205 870 205" strokeDasharray="3 5" />
        <path d="M910 148H948V162H916V176H948V190H916V204H948V218H910Z" fill="url(#h04-record)" />
        <path d="M838 178H902M870 146V210" opacity=".35" />
      </g>

      {/* 目盛 */}
      <g stroke="currentColor" strokeWidth="1" opacity=".28">
        <path d="M100 318H800M100 310V326M198 313V323M296 313V323M394 313V323M492 313V323M593 310V326M696 313V323M800 310V326" />
      </g>
    </svg>
  )
}

/** 縦組み（モバイル）。時間軸は上→下。厚み方向が横になるのでハッチングは右へ回る */
function Vertical() {
  return (
    <svg
      viewBox="0 0 320 470"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-foreground"
    >
      <defs>
        <pattern
          id="h04m-missing"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" opacity=".42" />
        </pattern>
        <marker
          id="h04m-loop-arrow"
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

      <g stroke="currentColor" strokeWidth="1" opacity=".28">
        <path d="M36 26H300M36 40H50M36 360H50" />
      </g>

      {/* 05 全体の寸法線 */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M62 40V360M52 40H72M52 360H72" />
        <path d="M62 40L57 56H67ZM62 360L57 344H67Z" fill="currentColor" />
      </g>

      {/* 帯本体。分割線 y=265 が 70.4% にあたる */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M90 40H230V360H90Z" />
        <path d="M90 265H230" />
        <circle cx="102" cy="52" r="3.5" />
        <circle cx="218" cy="52" r="3.5" />
        <circle cx="102" cy="253" r="3.5" />
        <circle cx="218" cy="253" r="3.5" />
        <circle cx="102" cy="277" r="3.5" />
        <circle cx="218" cy="277" r="3.5" />
        <circle cx="102" cy="348" r="3.5" />
        <circle cx="218" cy="348" r="3.5" />
      </g>

      {/* 01 手戻りのループ */}
      <g className="text-primary" stroke="currentColor" strokeWidth="2.5">
        <path
          d="M145 82C172 82 184 98 184 122V196C184 222 170 238 145 238H135C110 238 100 222 100 196V124C100 102 111 84 130 82"
          markerEnd="url(#h04m-loop-arrow)"
        />
        <circle cx="143" cy="112" r="17" fill="hsl(var(--background))" />
        <circle cx="143" cy="158" r="17" fill="hsl(var(--background))" />
        <circle cx="143" cy="204" r="17" fill="hsl(var(--background))" />
        <circle cx="143" cy="112" r="4.5" />
        <circle cx="143" cy="158" r="4.5" />
        <circle cx="143" cy="204" r="4.5" />
        <path d="M143 129V141M143 175V187" />
      </g>

      {/* 02 正味の作業 */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M143 292V344" />
        <path d="M143 292L135 308H151Z" fill="hsl(var(--background))" />
        <path d="M143 344L135 328H151Z" fill="currentColor" />
        <path d="M118 302H168V334H118ZM118 312H168M118 324H168" opacity=".9" />
      </g>

      {/* 03 計測欠損。厚みの25%を全区間に通す */}
      <path d="M195 40H230V360H195Z" fill="url(#h04m-missing)" stroke="currentColor" strokeWidth="1" />

      {/* 04 発端になった穴あけ1つ */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M95 392H175V452H95ZM95 406H175" />
        <circle cx="132" cy="428" r="13" />
        <circle cx="132" cy="428" r="4" />
        <path d="M112 428H152M132 408V448" opacity=".35" />
      </g>
    </svg>
  )
}

/** 図に重ねる名前。長い説明は Legend 側 */
const WIDE: CalloutItem[] = [
  { no: '05', label: '合計 19.6時間', x: 45, y: 19 },
  { no: '01', label: '手戻り・是正・復旧 13.8h', x: 34.6, y: 78, accent: true },
  { no: '02', label: '正味の作業 5.8h', x: 69.6, y: 78 },
  { no: '03', label: '計測の欠損 25%', x: 81.6, y: 57.8, align: 'left' },
  { no: '04', label: '発端の作業', x: 88, y: 20 },
]

const NARROW: CalloutItem[] = [
  { no: '05', label: '合計 19.6h', x: 50, y: 3 },
  { no: '01', label: '手戻り 13.8h', x: 73, y: 20, align: 'left', accent: true },
  { no: '03', label: '欠損 25%', x: 73, y: 45, align: 'left' },
  { no: '02', label: '正味 5.8h', x: 73, y: 68, align: 'left' },
  { no: '04', label: '発端', x: 60, y: 89, align: 'left' },
]

export function ReworkBreakdown() {
  return (
    <div className="not-prose">
      <Overlay ratio="1000 / 460" className="hidden max-w-[880px] sm:block">
        <Horizontal />
        <Callouts items={WIDE} />
      </Overlay>
      <Overlay ratio="320 / 470" className="max-w-[320px] sm:hidden">
        <Vertical />
        <Callouts items={NARROW} />
      </Overlay>
    </div>
  )
}
