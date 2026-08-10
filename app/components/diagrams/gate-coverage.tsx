import { Callouts, Overlay, type CalloutItem } from '../schematic'

/**
 * 門は、門が見ている対象しか守らない（H-05）。
 * GPTから受け取った草案（claudedocs/received/）を元に実装した。
 *
 * 受領版からの修正：
 * - 走査キャリッジ（08）が図の中央に置かれ、内側の枠（02）を縦に断ち切っていた。
 *   この図の主役は「02が01の内側にあり、その差に抜けが落ちている」という包含関係なので、
 *   キャリッジは02の外側の隙間へ寄せた。移動範囲は破線で全幅に残してある
 * - 追加ゲートが差分を全部覆ったようにも読めるが、**投影図の数だけは今も数えられない**
 *   （記事の「まだ解けていないこと」）。図では表現しきれないので凡例に明記した
 *
 * 設計の要点：
 * - 外枠＝図面として成立するための条件、内枠＝検査が見ていた範囲。
 *   抜けた項目はすべてその差の領域に置く。差の領域に物が落ちていることが結論
 * - モバイルは入れ子を縦長に組み替え、キャリッジを横棒にして上下に動く形にする
 */

/** 横組み（デスクトップ） */
function Nested() {
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
          id="h05-section"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" opacity=".22" />
        </pattern>
        <pattern
          id="h05-scan"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="12" stroke="hsl(var(--primary))" strokeWidth="1" opacity=".38" />
        </pattern>
      </defs>

      <g stroke="currentColor" strokeWidth="1" opacity=".2">
        <path d="M44 40H956M44 420H956" />
        <path d="M56 28V52M944 28V52M56 408V432M944 408V432" />
      </g>

      {/* 01 図面として成立するための条件の全体 */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M72 62H928V398H72Z" />
        <path d="M72 92H928M838 338V398M838 368H928M882 338V398" />
        <path
          d="M84 74H104M94 64V84M896 74H916M906 64V84M84 386H104M94 376V396M896 386H916M906 376V396"
          opacity=".42"
        />
      </g>

      {/* 02 検査ゲートが見ていた範囲 */}
      <g stroke="currentColor" strokeWidth="1.75">
        <path d="M294 152H706V326H294Z" />
        <path d="M316 174H684V304H316Z" fill="url(#h05-section)" />
        <path d="M348 196H652V282H348Z" fill="hsl(var(--background))" />
        <circle cx="330" cy="188" r="5" />
        <circle cx="670" cy="188" r="5" />
        <circle cx="330" cy="290" r="5" />
        <circle cx="670" cy="290" r="5" />
        <path d="M380 218H620V260H380Z" />
        <path d="M404 230H468V248H404ZM532 230H596V248H532Z" />
      </g>

      {/* 03 投影図の数。1面だけが残り、他は抜けた */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M112 126H174V178H112ZM190 126H252V178H190ZM151 194H213V246H151Z" />
        <circle cx="143" cy="152" r="15" />
        <path d="M205 140V164M193 152H217" />
        <path d="M163 220H201M182 207V233" />
        <path d="M190 126H252V178H190ZM151 194H213V246H151Z" strokeDasharray="4 6" opacity=".34" />
      </g>

      {/* 04 一般公差 */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M112 278H254V358H112Z" />
        <path d="M112 304H254M112 330H254M154 278V358M210 278V358" />
        <path d="M124 291H144M166 291H198M220 291H244" opacity=".35" />
      </g>

      {/* 05 面粗さ */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M748 126H896V184H748Z" />
        <path d="M766 168L788 138L810 168L832 138L854 168" />
        <path d="M864 144H886M875 133V155" opacity=".42" />
      </g>

      {/* 06 面取り */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M758 212H894V276H758Z" />
        <path d="M782 252V230H814L836 252H870" />
        <path d="M806 222L844 260" strokeDasharray="3 5" opacity=".42" />
      </g>

      {/* 07 外形線。同じ構造の抜けが2回起きた */}
      <g stroke="currentColor" strokeWidth="2">
        <path d="M750 308H792M826 308H896V360H750V332" />
        <path d="M792 308H826" strokeDasharray="3 7" opacity=".3" />
        <circle cx="780" cy="338" r="12" />
        <circle cx="866" cy="338" r="12" />
      </g>

      {/* 08 後から足した原本比較ゲート。02の外側へ寄せてある */}
      <g stroke="hsl(var(--primary))" strokeWidth="2.5">
        <path d="M58 78V46H942V78M58 382V414H942V382" />
        <path d="M710 46H746V414H710Z" fill="url(#h05-scan)" />
        <path d="M716 64H740V396H716Z" fill="hsl(var(--background))" />
        <circle cx="728" cy="76" r="7" />
        <circle cx="728" cy="384" r="7" />
        <path d="M76 400H698M758 400H924" strokeDasharray="5 6" />
      </g>
    </svg>
  )
}

/** 縦組み（モバイル）。入れ子を縦長にし、キャリッジは横棒にする */
function NestedNarrow() {
  return (
    <svg
      viewBox="0 0 320 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-foreground"
    >
      <defs>
        <pattern
          id="h05m-section"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1" opacity=".22" />
        </pattern>
        <pattern
          id="h05m-scan"
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="9" stroke="hsl(var(--primary))" strokeWidth="1" opacity=".38" />
        </pattern>
      </defs>

      {/* 01 外枠 */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M24 56H296V484H24Z" />
        <path d="M24 78H296M236 452V484M236 466H296" />
      </g>

      {/* 02 内枠 */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M84 214H236V300H84Z" />
        <path d="M94 224H226V290H94Z" fill="url(#h05m-section)" />
        <path d="M108 238H212V276H108Z" fill="hsl(var(--background))" />
        <path d="M120 250H152V264H120ZM168 250H200V264H168Z" />
      </g>

      {/* 03 投影図の数 */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M48 96H88V138H48Z" />
        <circle cx="68" cy="117" r="11" />
        <path d="M96 96H136V138H96Z" strokeDasharray="4 6" opacity=".34" />
        <path d="M110 117H122M116 111V123" opacity=".34" />
      </g>

      {/* 04 一般公差 */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M176 100H274V158H176Z" />
        <path d="M176 120H274M176 140H274M208 100V158M242 100V158" />
      </g>

      {/* 05 面粗さ */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M48 352H142V404H48Z" />
        <path d="M58 394L76 366L94 394L112 366L130 394" />
      </g>

      {/* 06 面取り */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M176 352H274V404H176Z" />
        <path d="M190 396V370H216L234 388H262" />
        <path d="M208 362L242 396" strokeDasharray="3 5" opacity=".42" />
      </g>

      {/* 07 外形線 */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M48 428H108M146 428H274V468H48V444" />
        <path d="M108 428H146" strokeDasharray="3 7" opacity=".3" />
        <circle cx="86" cy="448" r="9" />
        <circle cx="238" cy="448" r="9" />
      </g>

      {/* 08 追加ゲート。02の外側の隙間へ寄せてある */}
      <g stroke="hsl(var(--primary))" strokeWidth="2">
        <path d="M22 40H8V500H22M298 40H312V500H298" />
        <path d="M8 306H312V334H8Z" fill="url(#h05m-scan)" />
        <path d="M12 312H308V328H12Z" fill="hsl(var(--background))" />
        <circle cx="22" cy="320" r="5" />
        <circle cx="298" cy="320" r="5" />
        <path d="M8 62V298M8 342V492" strokeDasharray="5 6" />
      </g>
    </svg>
  )
}

const WIDE: CalloutItem[] = [
  { no: '01', label: '図面として成立する範囲', x: 9.2, y: 10.9, align: 'left' },
  { no: '08', label: '後から足したゲート', x: 72.8, y: 7.8, accent: true },
  { no: '02', label: '検査が見ていた範囲', x: 38, y: 30.4 },
  { no: '03', label: '投影図の数', x: 11.2, y: 23.9, align: 'left' },
  { no: '04', label: '一般公差', x: 11.2, y: 57.4, align: 'left' },
  { no: '05', label: '面粗さ', x: 87.8, y: 24.3, align: 'right' },
  { no: '06', label: '面取り', x: 87.8, y: 43, align: 'right' },
  { no: '07', label: '外形線', x: 87.8, y: 63.9, align: 'right' },
]

const NARROW: CalloutItem[] = [
  { no: '01', label: '成立に必要な範囲', x: 11.25, y: 10.8, align: 'left' },
  { no: '03', label: '投影図の数', x: 16.25, y: 16.9, align: 'left' },
  { no: '04', label: '一般公差', x: 56.25, y: 16.9, align: 'left' },
  { no: '02', label: '検査が見ていた範囲', x: 30, y: 41.2 },
  { no: '08', label: '追加したゲート', x: 50, y: 61.5, accent: true },
  { no: '05', label: '面粗さ', x: 16.25, y: 66.2, align: 'left' },
  { no: '06', label: '面取り', x: 56.25, y: 66.2, align: 'left' },
  { no: '07', label: '外形線', x: 16.25, y: 80.8, align: 'left' },
]

export function GateCoverage() {
  return (
    <div className="not-prose">
      <Overlay ratio="1000 / 460" className="hidden max-w-[900px] sm:block">
        <Nested />
        <Callouts items={WIDE} />
      </Overlay>
      <Overlay ratio="320 / 520" className="max-w-[320px] sm:hidden">
        <NestedNarrow />
        <Callouts items={NARROW} />
      </Overlay>
    </div>
  )
}
