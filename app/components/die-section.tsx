/**
 * 金型の組立断面をモチーフにした装飾用の作図。
 * 断面図（ダイ＋パンチ）／端面図／詳細図／表題欄で構成する。
 * 実在の設計値は使わず、寸法は記号（ø・R）のみを置いている。
 */
export default function DieSection({ className }: { className?: string }) {
  const holes = [
    { cx: 421.8, cy: 138.2 },
    { cx: 358.2, cy: 138.2 },
    { cx: 358.2, cy: 201.8 },
    { cx: 421.8, cy: 201.8 },
  ]

  return (
    <svg
      viewBox="0 0 480 560"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="ds-hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
        </pattern>
        {/* 隣接する部品はハッチングの向きを変える（製図の作法） */}
        <pattern id="ds-hatch-b" width="8" height="8" patternTransform="rotate(-45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="0.6" opacity="0.42" />
        </pattern>
        <marker id="ds-a" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="currentColor" />
        </marker>
        <marker id="ds-a0" markerWidth="7" markerHeight="7" refX="1" refY="3.5" orient="auto">
          <path d="M7,0 L0,3.5 L7,7 z" fill="currentColor" />
        </marker>
        <clipPath id="ds-detail-clip">
          <circle cx="390" cy="390" r="55" />
        </clipPath>
      </defs>

      {/* ── 断面のハッチング ── */}
      <g className="ds-fade" style={{ animationDelay: '900ms' }}>
        <path d="M80,380 L80,250 L95,250 L95,102 L107,90 L140,90 L140,150 L148,165 L148,250 L136,285 L136,380 Z" fill="url(#ds-hatch)" />
        <path d="M260,380 L260,250 L245,250 L245,102 L233,90 L200,90 L200,150 L192,165 L192,250 L204,285 L204,380 Z" fill="url(#ds-hatch)" />
        <path d="M150,28 L157,18 L164,32 L171,18 L178,32 L185,18 L190,26 L190,202 L185,210 L155,210 L150,202 Z" fill="url(#ds-hatch-b)" />
      </g>

      {/* ── ダイの断面外形（段付き穴・逃がしテーパー付き） ── */}
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className="ds-draw">
        <path d="M80,380 L80,250 L95,250 L95,102 L107,90 L140,90 L140,150 L148,165 L148,250 L136,285 L136,380 Z" />
        <path d="M260,380 L260,250 L245,250 L245,102 L233,90 L200,90 L200,150 L192,165 L192,250 L204,285 L204,380 Z" />
      </g>

      {/* ── パンチ（別部品） ── */}
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className="ds-draw" style={{ animationDelay: '300ms' }}>
        <path d="M150,28 L157,18 L164,32 L171,18 L178,32 L185,18 L190,26 L190,202 L185,210 L155,210 L150,202 Z" />
      </g>

      {/* ── 中心線 ── */}
      <line
        x1="170" y1="8" x2="170" y2="432"
        stroke="currentColor" strokeWidth="0.8" strokeDasharray="18 4 3 4"
        opacity="0.55" className="ds-draw" style={{ animationDelay: '450ms' }}
      />

      {/* ── 端面図 ── */}
      <g className="ds-draw" style={{ animationDelay: '600ms' }} stroke="currentColor">
        <circle cx="390" cy="170" r="62" strokeWidth="1.4" />
        <circle cx="390" cy="170" r="22" strokeWidth="1.2" />
        <circle cx="390" cy="170" r="34" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.5" />
        <circle cx="390" cy="170" r="45" strokeWidth="0.7" strokeDasharray="14 3 2 3" opacity="0.45" />
        {holes.map((h) => (
          <circle key={`${h.cx}-${h.cy}`} cx={h.cx} cy={h.cy} r="7" strokeWidth="1.1" />
        ))}
      </g>

      {/* 端面図の中心線と穴の十字 */}
      <g stroke="currentColor" strokeWidth="0.7" opacity="0.45" className="ds-fade" style={{ animationDelay: '1000ms' }}>
        <line x1="316" y1="170" x2="464" y2="170" strokeDasharray="16 3 2 3" />
        <line x1="390" y1="96" x2="390" y2="244" strokeDasharray="16 3 2 3" />
        {holes.map((h) => (
          <g key={`c-${h.cx}-${h.cy}`}>
            <line x1={h.cx - 11} y1={h.cy} x2={h.cx + 11} y2={h.cy} />
            <line x1={h.cx} y1={h.cy - 11} x2={h.cx} y2={h.cy + 11} />
          </g>
        ))}
      </g>

      {/* 切断線 A–A */}
      <g stroke="currentColor" className="ds-fade" style={{ animationDelay: '1150ms' }}>
        <line x1="390" y1="90" x2="390" y2="106" strokeWidth="2.4" />
        <line x1="390" y1="234" x2="390" y2="250" strokeWidth="2.4" />
        <line x1="390" y1="97" x2="366" y2="97" strokeWidth="0.9" markerEnd="url(#ds-a)" />
        <line x1="390" y1="243" x2="366" y2="243" strokeWidth="0.9" markerEnd="url(#ds-a)" />
      </g>

      {/* ── 寸法線 ── */}
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.7" className="ds-fade" style={{ animationDelay: '1250ms' }}>
        {/* 全高 */}
        <line x1="107" y1="90" x2="54" y2="90" strokeDasharray="2 3" />
        <line x1="80" y1="380" x2="54" y2="380" strokeDasharray="2 3" />
        <line x1="62" y1="90" x2="62" y2="380" markerStart="url(#ds-a0)" markerEnd="url(#ds-a)" />
        {/* 面取りの引き出し */}
        <path d="M101,96 L74,62 L52,62" />
        {/* 逃がし径 */}
        <line x1="136" y1="380" x2="136" y2="414" strokeDasharray="2 3" />
        <line x1="204" y1="380" x2="204" y2="414" strokeDasharray="2 3" />
        <line x1="136" y1="408" x2="204" y2="408" markerStart="url(#ds-a0)" markerEnd="url(#ds-a)" />
        {/* R の引き出し */}
        <path d="M196,157 L262,132 L288,132" />
        {/* 穴の引き出し */}
        <path d="M353,133 L322,108 L300,108" />
      </g>

      {/* ── 詳細図 B ── */}
      <g className="ds-fade" style={{ animationDelay: '1450ms' }}>
        <g clipPath="url(#ds-detail-clip)">
          <path d="M378,330 L378,376 L400,418 L400,452 L446,452 L446,330 Z" fill="url(#ds-hatch)" />
          <path
            d="M378,330 L378,374 Q378,383 383,391 L396,412 Q400,418 400,425 L400,452"
            stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
          />
        </g>
        <circle cx="390" cy="390" r="55" stroke="currentColor" strokeWidth="0.9" opacity="0.5" />
        {/* 断面図側の詳細範囲と引き出し */}
        <circle cx="198" cy="268" r="26" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        <path d="M218,285 L330,350" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      </g>

      {/* ── 文字（製図風の注記） ── */}
      <g fill="currentColor" className="font-mono ds-fade" style={{ animationDelay: '1600ms' }}>
        <text x="170" y="428" textAnchor="middle" fontSize="13" opacity="0.75">ø</text>
        <text x="46" y="235" fontSize="13" opacity="0.75" transform="rotate(-90 46 235)" textAnchor="middle">H</text>
        <text x="48" y="58" fontSize="13" opacity="0.75">C</text>
        <text x="292" y="136" fontSize="13" opacity="0.75">R</text>
        <text x="296" y="112" fontSize="12" opacity="0.7" textAnchor="end">4×ø</text>
        <text x="398" y="88" fontSize="13" opacity="0.7">A</text>
        <text x="398" y="262" fontSize="13" opacity="0.7">A</text>
        <text x="232" y="252" fontSize="12" opacity="0.6">B</text>
        <text x="390" y="464" textAnchor="middle" fontSize="11" opacity="0.55" letterSpacing="1">DETAIL B</text>
        <text x="390" y="480" textAnchor="middle" fontSize="10" opacity="0.4" letterSpacing="1">SCALE 2:1</text>
      </g>

      {/* ── 表題欄 ── */}
      <g className="ds-fade" style={{ animationDelay: '1750ms' }}>
        <g stroke="currentColor" strokeWidth="0.8" opacity="0.35">
          <rect x="40" y="500" width="400" height="40" />
          <line x1="200" y1="500" x2="200" y2="540" />
          <line x1="330" y1="500" x2="330" y2="540" />
        </g>
        <g fill="currentColor" className="font-mono" opacity="0.5">
          <text x="50" y="525" fontSize="11" letterSpacing="0.5">SECTION A–A</text>
          <text x="210" y="525" fontSize="11" letterSpacing="0.5">SCALE 1:2</text>
          <text x="340" y="525" fontSize="11" letterSpacing="0.5">DIE / PUNCH</text>
        </g>
      </g>
    </svg>
  )
}
