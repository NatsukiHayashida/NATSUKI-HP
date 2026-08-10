/**
 * ドメインシフト（H-03）。GPTから受け取った草案（claudedocs/received/）を元に実装した。
 *
 * 受領版の座標はそのまま使っている。0起点で検算すると位置が値と合わないが、
 * 逆算するとレールは 0.18〜0.82 を映す窓であり、2点は一次スケール上で整合している
 * （レールに原点の表示はないので、0起点である必要はない）。
 * 一度0〜1へ置き直したが、01と03の間隔が詰まって閾値のゲートと帯が収まらなくなったため戻した。
 *
 * 設計の要点：
 * - **分布の形は描かない**。記録にあるのは最小値・最大値・AUCだけで、
 *   山の形は分からない。標本ラックと積層で「群がそこにある」ことだけを示す
 * - 学習時の不良品ラック（右上）と別セッション良品の積層（右下）が
 *   横方向で重なる。この重なりが「閾値をどこに置いても両立しない」の実体
 * - モバイルはレールを縦に倒す。横組みのまま縮めると番号が読めない
 */

const MONO = 'ui-monospace,monospace'

/** レール（x 116〜884）は 0.18〜0.82 のスコア窓。両端に目盛の表示はない */
const RAIL_FROM = 0.182
const RAIL_SPAN = 0.634
const railX = (score: number) => 116 + ((score - RAIL_FROM) / RAIL_SPAN) * 768
const GOOD_MAX = Math.round(railX(0.38)) // 356
const SHIFTED_MIN = Math.round(railX(0.5385)) // 548

/** 横組み（デスクトップ）。スコアは左→右 */
function Rail() {
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
          id="h03-shift"
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="9" stroke="hsl(var(--primary))" strokeWidth="1" opacity=".46" />
        </pattern>
        <pattern
          id="h03-band"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="12" stroke="currentColor" strokeWidth="1" opacity=".24" />
        </pattern>
        <marker
          id="h03-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 1L9 5L0 9Z" fill="hsl(var(--primary))" />
        </marker>
      </defs>

      <g stroke="currentColor" strokeWidth="1" opacity=".22">
        <path d="M54 54H946M54 400H946" />
        <path d="M70 42V66M930 42V66M70 388V412M930 388V412" />
      </g>

      {/* スコアのレール */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M92 218H908V258H92Z" />
        <path d="M116 238H884" />
        <path d="M116 228V248M884 228V248" />
        <path
          d="M180 232V244M244 232V244M308 232V244M372 228V248M436 232V244M500 232V244M564 228V248M628 232V244M692 232V244M756 232V244M820 232V244"
          opacity=".42"
        />
        <circle cx="104" cy="230" r="3" />
        <circle cx="896" cy="230" r="3" />
        <circle cx="104" cy="246" r="3" />
        <circle cx="896" cy="246" r="3" />
      </g>

      {/* 学習時の良品ラック。分布ではなく終端の標本だけを置く */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M104 116H330V184H104Z" />
        <path d="M126 132H174V168H126ZM190 132H238V168H190ZM254 132H302V168H254Z" />
        <circle cx="150" cy="150" r="11" />
        <circle cx="214" cy="150" r="11" />
        <circle cx="278" cy="150" r="11" />
        <path d={`M330 150H${GOOD_MAX}`} />
        <path d={`M${GOOD_MAX} 166V290`} />
        <path d={`M${GOOD_MAX - 12} 178H${GOOD_MAX + 12}M${GOOD_MAX - 12} 278H${GOOD_MAX + 12}`} />
      </g>
      <circle cx={GOOD_MAX} cy="146" r="18" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text x={GOOD_MAX} y="146" fill="currentColor" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        01
      </text>

      {/* 学習時の不良品ラック。位置分布は描かない */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M660 116H892V184H660Z" />
        <path d="M684 132H732V168H684ZM748 132H796V168H748ZM812 132H860V168H812Z" fill="url(#h03-band)" />
        <path d="M696 142L720 158M760 142L784 158M824 142L848 158" />
      </g>

      {/* 04 どこへ動かしても両立しない閾値の帯 */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d={`M${GOOD_MAX + 12} 198H${SHIFTED_MIN - 12}V278H${GOOD_MAX + 12}Z`} fill="url(#h03-band)" />
        <path d="M400 206V270M452 206V270M506 206V270" strokeDasharray="4 5" />
        <path d={`M${GOOD_MAX + 26} 190V180H${SHIFTED_MIN - 26}V190`} />
      </g>
      <circle cx="452" cy="296" r="18" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text x="452" y="296" fill="currentColor" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        04
      </text>

      {/* 02 学習時には成立していた閾値のゲート */}
      <g stroke="currentColor" strokeWidth="1.75">
        <path d="M470 188H506V288H470Z" fill="hsl(var(--background))" />
        <path d="M478 202V274M498 202V274" />
        <circle cx="488" cy="238" r="8" />
        <path d="M488 188V170" />
      </g>
      <circle cx="488" cy="152" r="18" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text x="488" y="152" fill="currentColor" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        02
      </text>

      {/* 03 別セッションの良品100枚。最小値が01より右へ出た */}
      <g stroke="hsl(var(--primary))" strokeWidth="2.25">
        <path d={`M${SHIFTED_MIN} 166V290`} />
        <path d={`M${SHIFTED_MIN - 12} 178H${SHIFTED_MIN + 12}M${SHIFTED_MIN - 12} 278H${SHIFTED_MIN + 12}`} />
        <path d="M576 294H874V366H576Z" fill="url(#h03-shift)" />
        <path d="M590 306H846V350H590Z" fill="hsl(var(--background))" />
        <path d="M602 316H834M602 326H834M602 336H834M602 346H834" />
        <path d={`M${SHIFTED_MIN} 330H576`} />
        <path d={`M${GOOD_MAX} 318H${SHIFTED_MIN - 26}`} markerEnd="url(#h03-arrow)" />
      </g>
      <circle
        cx={SHIFTED_MIN}
        cy="310"
        r="18"
        stroke="hsl(var(--primary))"
        fill="hsl(var(--background))"
        strokeWidth="1.5"
      />
      <text x={SHIFTED_MIN} y="310" fill="hsl(var(--primary))" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        03
      </text>

      {/* 05 撮像条件を固定する側へ舵を切る */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M92 304H288V374H92Z" />
        <path d="M112 320H162V358H112ZM218 320H268V358H218Z" />
        <path d="M162 339H218" />
        <circle cx="190" cy="339" r="13" />
        <path d="M128 304V290M252 304V290M118 290H138M242 290H262" />
      </g>
      <circle cx="108" cy="294" r="18" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text x="108" y="294" fill="currentColor" fontSize="11" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        05
      </text>
    </svg>
  )
}

/** 縦組み（モバイル）。スコアは上→下 */
function Column() {
  const y = (score: number) => 70 + score * 360
  const good = y(0.38) // 207
  const shifted = y(0.5385) // 264

  return (
    <svg
      viewBox="0 0 320 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mx-auto w-full max-w-[320px] text-foreground sm:hidden"
    >
      <defs>
        <pattern
          id="h03m-shift"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke="hsl(var(--primary))" strokeWidth="1" opacity=".46" />
        </pattern>
        <pattern
          id="h03m-band"
          width="9"
          height="9"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="9" stroke="currentColor" strokeWidth="1" opacity=".24" />
        </pattern>
        <marker
          id="h03m-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto"
        >
          <path d="M0 1L9 5L0 9Z" fill="hsl(var(--primary))" />
        </marker>
      </defs>

      {/* レール */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M120 70H160V430H120Z" />
        <path d="M140 84V416" />
        <path d="M130 84H150M130 416H150" />
        <path
          d="M132 120H148M132 156H148M132 192H148M132 228H148M132 264H148M132 300H148M132 336H148M132 372H148"
          opacity=".38"
        />
      </g>

      {/* 学習時の良品ラック */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M16 92H104V148H16Z" />
        <path d="M26 102H50V138H26ZM56 102H80V138H56ZM86 102H104V138H86Z" />
        <circle cx="38" cy="120" r="7" />
        <circle cx="68" cy="120" r="7" />
        <path d={`M60 148V${good}H83`} />
        <path d={`M104 ${good}H176`} />
        <path d={`M104 ${good - 9}V${good + 9}M176 ${good - 9}V${good + 9}`} />
      </g>
      <circle cx="96" cy={good} r="13" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text x="96" y={good} fill="currentColor" fontSize="10.5" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        01
      </text>

      {/* 04 両立しない閾値の帯 */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d={`M112 ${good}H168V${shifted}H112Z`} fill="url(#h03m-band)" />
      </g>
      <circle cx="192" cy="222" r="13" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text x="192" y="222" fill="currentColor" fontSize="10.5" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        04
      </text>

      {/* 02 学習時に成立していた閾値のゲート */}
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M124 222H156V250H124Z" fill="hsl(var(--background))" />
        <path d="M131 228V244M149 228V244" />
        <circle cx="140" cy="236" r="5" />
        <path d="M124 236H88" />
      </g>
      <circle cx="75" cy="236" r="13" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text x="75" y="236" fill="currentColor" fontSize="10.5" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        02
      </text>

      {/* 学習時の不良品ラック。別セッション良品と縦方向で重なる */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M16 330H104V386H16Z" />
        <path d="M26 340H50V376H26ZM56 340H80V376H56ZM86 340H104V376H86Z" fill="url(#h03m-band)" />
        <path d="M30 346L46 366M60 346L76 366" />
        <path d="M104 358H120" opacity=".5" />
      </g>

      {/* 03 別セッションの良品100枚 */}
      <g stroke="hsl(var(--primary))" strokeWidth="1.75">
        <path d={`M176 ${shifted}H304V420H176Z`} fill="url(#h03m-shift)" />
        <path d={`M186 ${shifted + 10}H294V410H186Z`} fill="hsl(var(--background))" />
        <path d="M194 288H286M194 302H286M194 316H286M194 330H286" />
        <path d={`M160 ${shifted}H176`} />
        <path d={`M140 ${good + 14}V${shifted - 6}`} markerEnd="url(#h03m-arrow)" />
      </g>
      <circle cx="192" cy={shifted} r="13" stroke="hsl(var(--primary))" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text x="192" y={shifted} fill="hsl(var(--primary))" fontSize="10.5" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        03
      </text>

      {/* 05 撮像条件の固定 */}
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M16 408H108V462H16Z" />
        <path d="M28 420H54V450H28ZM70 420H96V450H70Z" />
        <path d="M54 435H70" />
        <circle cx="62" cy="435" r="9" />
      </g>
      <circle cx="122" cy="450" r="13" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text x="122" y="450" fill="currentColor" fontSize="10.5" fontFamily={MONO} textAnchor="middle" dominantBaseline="central">
        05
      </text>
    </svg>
  )
}

export function DomainShift() {
  return (
    <div className="not-prose">
      <Rail />
      <Column />
    </div>
  )
}
