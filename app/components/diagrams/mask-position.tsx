/**
 * マスクをかける場所で結果が逆転する（H-02）。
 * GPTから受け取った草案（claudedocs/received/）をほぼそのまま採用している。
 *
 * 設計の要点：
 * - 上下2本のレーンで、装置の並びは同じ。違うのは朱のマスクをどこに挿すかだけ。
 *   打ち手の良し悪しではなく「打ち手を置く場所」の話だと見せるための構図
 * - 上段は前処理の盤面から欠陥の線が消え、異常マップの山も消える。
 *   下段は欠陥の線が残り、異常マップに山が立つ。ここが結果の差につながる
 * - モバイルは同じ工程を縦2列に組み替える。横組みのまま縮めると番号が読めない。
 *   2列は朱の帯の高さだけが違う＝「同じ流れ、挿す場所だけが違う」がそのまま出る
 */

const MONO = 'ui-monospace,monospace'

/** 横組み（デスクトップ）。工程は左→右、レーンは上下 */
function Lanes() {
  return (
    <svg
      viewBox="0 0 1000 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="hidden w-full text-foreground sm:block"
    >
      <defs>
        <pattern
          id="h02-mask"
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="9" stroke="hsl(var(--primary))" strokeWidth="1" opacity=".48" />
        </pattern>
        <pattern
          id="h02-neutral"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" opacity=".24" />
        </pattern>
        <marker
          id="h02-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 1L9 5L0 9Z" fill="currentColor" />
        </marker>
      </defs>

      <g stroke="currentColor" strokeWidth="1" opacity=".22">
        <path d="M42 54H958M42 226H958M42 406H958" />
        <path d="M54 42V66M54 214V238M54 394V418" />
      </g>

      {/* ── 上段：入力側にマスクを挿す ── */}
      <g stroke="currentColor" strokeWidth="1.5">
        <rect x="62" y="82" width="118" height="112" />
        <circle cx="121" cy="138" r="37" />
        <circle cx="121" cy="138" r="12" />
        <path d="M151 113L163 105M157 119L169 111" />
        <circle cx="74" cy="94" r="3" />
        <circle cx="168" cy="94" r="3" />
        <circle cx="74" cy="182" r="3" />
        <circle cx="168" cy="182" r="3" />
      </g>
      <circle cx="78" cy="72" r="17" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.25" />
      <text x="78" y="72" fill="currentColor" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        01
      </text>

      {/* 02 入力側マスク。欠陥の位置まで覆ってしまう */}
      <g stroke="hsl(var(--primary))" strokeWidth="2">
        <path d="M204 88H258V188H204Z" fill="url(#h02-mask)" />
        <path d="M214 100H248V176H214Z" fill="hsl(var(--background))" />
        <path d="M239 100H248V126H239Z" fill="url(#h02-mask)" />
        <path d="M180 138H204M258 138H294" />
      </g>
      <circle cx="231" cy="72" r="17" stroke="hsl(var(--primary))" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text x="231" y="72" fill="hsl(var(--primary))" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        02
      </text>

      {/* 03 前処理の結果。欠陥の線が消えている */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M294 98H388V178H294Z" />
        <circle cx="341" cy="138" r="28" />
        <circle cx="341" cy="138" r="9" />
        <path d="M364 117L377 107V129Z" fill="url(#h02-neutral)" />
      </g>
      <circle cx="308" cy="88" r="17" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.25" />
      <text x="308" y="88" fill="currentColor" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        03
      </text>

      {/* 04 モデル。上下で同じもの */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M428 92H512V184H428Z" />
        <path d="M440 108H500V122H440ZM440 132H500V146H440ZM440 156H500V170H440Z" />
        <path d="M388 138H428M512 138H550" markerEnd="url(#h02-arrow)" />
      </g>
      <circle cx="442" cy="82" r="17" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.25" />
      <text x="442" y="82" fill="currentColor" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        04
      </text>

      {/* 05 異常マップ。山が立たない */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M550 94H650V182H550Z" />
        <path d="M566 166C580 150 592 152 603 158C614 164 626 160 638 148" />
        <path d="M566 166H638" opacity=".28" />
      </g>
      <circle cx="568" cy="84" r="17" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.25" />
      <text x="568" y="84" fill="currentColor" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        05
      </text>

      {/* 06 上段の結果 */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M650 138H694" markerEnd="url(#h02-arrow)" />
        <path d="M700 96H790V180H700Z" />
        <circle cx="745" cy="138" r="27" />
        <path d="M745 138L766 119" />
        <circle cx="745" cy="138" r="4" />
        <path d="M790 138H836" />
        <path d="M836 106H930V170H836Z" />
        <path d="M850 122H916V154H850Z" fill="url(#h02-neutral)" />
      </g>
      <circle cx="854" cy="96" r="17" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.25" />
      <text x="854" y="96" fill="currentColor" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        06
      </text>

      {/* ── 下段：推論後の異常マップにマスクを挿す ── */}
      <g stroke="currentColor" strokeWidth="1.5">
        <rect x="62" y="262" width="118" height="112" />
        <circle cx="121" cy="318" r="37" />
        <circle cx="121" cy="318" r="12" />
        <path d="M151 293L163 285M157 299L169 291" />
        <circle cx="74" cy="274" r="3" />
        <circle cx="168" cy="274" r="3" />
        <circle cx="74" cy="362" r="3" />
        <circle cx="168" cy="362" r="3" />
      </g>

      {/* 07 前処理の結果。欠陥の線が残っている */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M220 278H328V358H220Z" />
        <circle cx="274" cy="318" r="28" />
        <circle cx="274" cy="318" r="9" />
        <path d="M297 297L309 289M303 303L315 295" />
        <path d="M180 318H220M328 318H370" markerEnd="url(#h02-arrow)" />
      </g>
      <circle cx="238" cy="268" r="17" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.25" />
      <text x="238" y="268" fill="currentColor" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        07
      </text>

      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M370 272H454V364H370Z" />
        <path d="M382 288H442V302H382ZM382 312H442V326H382ZM382 336H442V350H382Z" />
        <path d="M454 318H492" markerEnd="url(#h02-arrow)" />
      </g>

      {/* 異常マップ。山が立つ */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M492 274H592V362H492Z" />
        <path d="M508 346C522 338 528 326 536 300C544 326 551 338 566 346C574 350 582 344 586 336" />
        <circle cx="536" cy="300" r="6" stroke="hsl(var(--primary))" />
      </g>

      {/* 08 推論後マスク。対象外の領域だけを判定から外す */}
      <g stroke="hsl(var(--primary))" strokeWidth="2">
        <path d="M616 268H670V368H616Z" fill="url(#h02-mask)" />
        <path d="M626 280H660V356H626Z" fill="hsl(var(--background))" />
        <circle cx="643" cy="318" r="9" fill="hsl(var(--background))" />
        <path d="M592 318H616M670 318H704" />
      </g>
      <circle cx="643" cy="258" r="17" stroke="hsl(var(--primary))" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text x="643" y="258" fill="hsl(var(--primary))" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        08
      </text>

      {/* 09 下段の結果 */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M704 276H790V360H704Z" />
        <circle cx="747" cy="318" r="27" />
        <path d="M747 318L759 294" />
        <circle cx="747" cy="318" r="4" />
        <path d="M790 318H836" />
        <path d="M836 286H930V350H836Z" />
        <path d="M850 302H916V334H850Z" />
      </g>
      <circle cx="854" cy="276" r="17" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.25" />
      <text x="854" y="276" fill="currentColor" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        09
      </text>
    </svg>
  )
}

/** 工程1つ分の枠。モバイルの2列で共用する */
function Stage({ x, y }: { x: number; y: number }) {
  return <rect x={x} y={y} width="120" height="46" stroke="currentColor" strokeWidth="1.25" />
}

/** 縦組み（モバイル）。工程は上→下、2列を並べて挿す高さの違いを見せる */
function Columns() {
  const A = 20
  const B = 180
  const ax = A + 60
  const bx = B + 60
  const Y = [40, 114, 188, 262, 336]

  return (
    <svg
      viewBox="0 0 320 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mx-auto w-full max-w-[320px] text-foreground sm:hidden"
    >
      <defs>
        <pattern
          id="h02m-mask"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="hsl(var(--primary))" strokeWidth="1" opacity=".48" />
        </pattern>
        <pattern
          id="h02m-neutral"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1" opacity=".24" />
        </pattern>
        <marker
          id="h02m-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0 1L9 5L0 9Z" fill="currentColor" />
        </marker>
      </defs>

      {/* 工程の枠と、間をつなぐ線 */}
      {Y.map((y) => (
        <g key={y}>
          <Stage x={A} y={y} />
          <Stage x={B} y={y} />
        </g>
      ))}
      <g stroke="currentColor" strokeWidth="1.25">
        {Y.slice(0, 4).map((y) => (
          <g key={y}>
            <path d={`M${ax} ${y + 46}V${y + 72}`} markerEnd="url(#h02m-arrow)" />
            <path d={`M${bx} ${y + 46}V${y + 72}`} markerEnd="url(#h02m-arrow)" />
          </g>
        ))}
      </g>

      {/* 01 入力画像（両列で同じもの） */}
      <g stroke="currentColor" strokeWidth="1.25">
        <circle cx={ax} cy="63" r="14" />
        <circle cx={ax} cy="63" r="5" />
        <path d={`M${ax + 11} 55L${ax + 17} 49M${ax + 14} 59L${ax + 20} 53`} />
        <circle cx={bx} cy="63" r="14" />
        <circle cx={bx} cy="63" r="5" />
        <path d={`M${bx + 11} 55L${bx + 17} 49M${bx + 14} 59L${bx + 20} 53`} />
      </g>

      {/* 02 入力側マスク */}
      <g stroke="hsl(var(--primary))" strokeWidth="1.75">
        <path d={`M${A} 90H${A + 120}V110H${A}Z`} fill="url(#h02m-mask)" />
      </g>

      {/* 03 欠陥の線が消えた前処理 ／ 07 残った前処理 */}
      <g stroke="currentColor" strokeWidth="1.25">
        <circle cx={ax} cy="137" r="14" />
        <circle cx={ax} cy="137" r="5" />
        <path d={`M${ax + 12} 128L${ax + 22} 122V134Z`} fill="url(#h02m-neutral)" />
        <circle cx={bx} cy="137" r="14" />
        <circle cx={bx} cy="137" r="5" />
        <path d={`M${bx + 11} 129L${bx + 17} 123M${bx + 14} 133L${bx + 20} 127`} />
      </g>

      {/* 04 モデル（両列で同じもの） */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d={`M${ax - 30} 195H${ax + 30}V203H${ax - 30}ZM${ax - 30} 207H${ax + 30}V215H${ax - 30}ZM${ax - 30} 219H${ax + 30}V227H${ax - 30}Z`} />
        <path d={`M${bx - 30} 195H${bx + 30}V203H${bx - 30}ZM${bx - 30} 207H${bx + 30}V215H${bx - 30}ZM${bx - 30} 219H${bx + 30}V227H${bx - 30}Z`} />
      </g>

      {/* 05 山の立たない異常マップ ／ 山の立つ異常マップ */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d={`M${ax - 30} 296C${ax - 20} 288 ${ax - 10} 292 ${ax} 290C${ax + 10} 288 ${ax + 20} 294 ${ax + 30} 288`} />
        <path d={`M${bx - 30} 300C${bx - 18} 296 ${bx - 10} 288 ${bx} 272C${bx + 10} 288 ${bx + 18} 296 ${bx + 30} 300`} />
        <circle cx={bx} cy="272" r="4" stroke="hsl(var(--primary))" />
      </g>

      {/* 08 推論後マスク */}
      <g stroke="hsl(var(--primary))" strokeWidth="1.75">
        <path d={`M${B} 312H${B + 120}V332H${B}Z`} fill="url(#h02m-mask)" />
      </g>

      {/* 06 / 09 結果 */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d={`M${ax - 32} 348H${ax + 32}V370H${ax - 32}Z`} fill="url(#h02m-neutral)" />
        <path d={`M${bx - 32} 348H${bx + 32}V370H${bx - 32}Z`} />
      </g>

      {/* 番号バルーン。左列は左端、右列は右端に寄せる */}
      <g stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.25">
        <circle cx="14" cy="63" r="12" />
        <circle cx="14" cy="137" r="12" />
        <circle cx="14" cy="211" r="12" />
        <circle cx="14" cy="285" r="12" />
        <circle cx="14" cy="359" r="12" />
        <circle cx="306" cy="137" r="12" />
        <circle cx="306" cy="359" r="12" />
      </g>
      <g fill="currentColor" fontSize="10.5" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        <text x="14" y="63">01</text>
        <text x="14" y="137">03</text>
        <text x="14" y="211">04</text>
        <text x="14" y="285">05</text>
        <text x="14" y="359">06</text>
        <text x="306" y="137">07</text>
        <text x="306" y="359">09</text>
      </g>
      <g stroke="hsl(var(--primary))" fill="hsl(var(--background))" strokeWidth="1.5">
        <circle cx="14" cy="100" r="12" />
        <circle cx="306" cy="322" r="12" />
      </g>
      <g
        fill="hsl(var(--primary))"
        fontSize="10.5"
        fontFamily={MONO}
        textAnchor="middle"
        dominantBaseline="central"
      >
        <text x="14" y="100">02</text>
        <text x="306" y="322">08</text>
      </g>
    </svg>
  )
}

export function MaskPosition() {
  return (
    <div className="not-prose">
      <Lanes />
      <Columns />
    </div>
  )
}
