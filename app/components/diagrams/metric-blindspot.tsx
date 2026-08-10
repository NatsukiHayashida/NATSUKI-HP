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
 * - SVGに文字は入れない（番号バルーンのみ）。名称と説明は Legend 側に持たせる
 * - モバイルは盤面を縦に積み替える。横組みのまま縮めると番号が読めなくなる
 */

const MONO = 'ui-monospace,monospace'

/** 横組み（デスクトップ） */
function Wide() {
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
      <circle
        cx="82"
        cy="128"
        r="18"
        className="text-primary"
        stroke="currentColor"
        fill="hsl(var(--background))"
        strokeWidth="1.5"
      />
      <text
        x="82"
        y="128"
        className="text-primary"
        fill="currentColor"
        fontSize="11"
        fontFamily={MONO}
        textAnchor="middle"
        dominantBaseline="central"
      >
        06
      </text>

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
      <circle
        cx="684"
        cy="160"
        r="18"
        className="text-primary"
        stroke="currentColor"
        fill="hsl(var(--background))"
        strokeWidth="1.5"
      />
      <text
        x="684"
        y="160"
        className="text-primary"
        fill="currentColor"
        fontSize="11"
        fontFamily={MONO}
        textAnchor="middle"
        dominantBaseline="central"
      >
        05
      </text>

      {/* 01〜04 象限番号 */}
      <g stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.25">
        <circle cx="340" cy="134" r="17" />
        <circle cx="520" cy="134" r="17" />
        <circle cx="340" cy="274" r="17" />
        <circle cx="520" cy="274" r="17" />
      </g>
      <g
        fill="currentColor"
        fontSize="11"
        fontFamily={MONO}
        textAnchor="middle"
        dominantBaseline="central"
      >
        <text x="340" y="134">01</text>
        <text x="520" y="134">02</text>
        <text x="340" y="274">03</text>
        <text x="520" y="274">04</text>
      </g>

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
      <circle cx="888" cy="130" r="18" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text
        x="888"
        y="130"
        fill="currentColor"
        fontSize="11"
        fontFamily={MONO}
        textAnchor="middle"
        dominantBaseline="central"
      >
        07
      </text>

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
      <circle cx="888" cy="230" r="18" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text
        x="888"
        y="230"
        fill="currentColor"
        fontSize="11"
        fontFamily={MONO}
        textAnchor="middle"
        dominantBaseline="central"
      >
        08
      </text>

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
      <circle cx="888" cy="330" r="18" stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.5" />
      <text
        x="888"
        y="330"
        fill="currentColor"
        fontSize="11"
        fontFamily={MONO}
        textAnchor="middle"
        dominantBaseline="central"
      >
        09
      </text>
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
      className="mx-auto w-full max-w-[320px] text-foreground sm:hidden"
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
      <circle
        cx="28"
        cy="172"
        r="13"
        className="text-primary"
        stroke="currentColor"
        fill="hsl(var(--background))"
        strokeWidth="1.5"
      />
      <text
        x="28"
        y="172"
        className="text-primary"
        fill="currentColor"
        fontSize="11"
        fontFamily={MONO}
        textAnchor="middle"
        dominantBaseline="central"
      >
        06
      </text>

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
      <circle
        cx="300"
        cy="207"
        r="13"
        className="text-primary"
        stroke="currentColor"
        fill="hsl(var(--background))"
        strokeWidth="1.5"
      />
      <text
        x="300"
        y="207"
        className="text-primary"
        fill="currentColor"
        fontSize="11"
        fontFamily={MONO}
        textAnchor="middle"
        dominantBaseline="central"
      >
        05
      </text>

      {/* 01〜04 */}
      <g stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.25">
        <circle cx="154" cy="194" r="12.5" />
        <circle cx="229" cy="194" r="12.5" />
        <circle cx="154" cy="269" r="12.5" />
        <circle cx="229" cy="269" r="12.5" />
      </g>
      <g
        fill="currentColor"
        fontSize="11"
        fontFamily={MONO}
        textAnchor="middle"
        dominantBaseline="central"
      >
        <text x="154" y="194">01</text>
        <text x="229" y="194">02</text>
        <text x="154" y="269">03</text>
        <text x="229" y="269">04</text>
      </g>

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
      <g stroke="currentColor" fill="hsl(var(--background))" strokeWidth="1.5">
        <circle cx="60" cy="478" r="13" />
        <circle cx="160" cy="478" r="13" />
        <circle cx="260" cy="478" r="13" />
      </g>
      <g
        fill="currentColor"
        fontSize="11"
        fontFamily={MONO}
        textAnchor="middle"
        dominantBaseline="central"
      >
        <text x="60" y="478">07</text>
        <text x="160" y="478">08</text>
        <text x="260" y="478">09</text>
      </g>
    </svg>
  )
}

export function MetricBlindspot() {
  return (
    <div className="not-prose">
      <Wide />
      <Narrow />
    </div>
  )
}
