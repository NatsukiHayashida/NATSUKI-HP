/**
 * 金型断面のモチーフ。実在の設計値は使わず、寸法記号のみを置いた装飾用の作図。
 */
export default function DieSection({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 450"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="ds-hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="0.6" opacity="0.28" />
        </pattern>
        <marker id="ds-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="currentColor" />
        </marker>
        <marker id="ds-arrow-start" markerWidth="7" markerHeight="7" refX="1" refY="3.5" orient="auto">
          <path d="M7,0 L0,3.5 L7,7 z" fill="currentColor" />
        </marker>
      </defs>

      {/* 断面のハッチング（材料部） */}
      <g className="ds-fade" style={{ animationDelay: '900ms' }}>
        <path d="M90,70 L180,70 L180,220 L162,268 L162,390 L90,390 Z" fill="url(#ds-hatch)" />
        <path d="M330,70 L240,70 L240,220 L258,268 L258,390 L330,390 Z" fill="url(#ds-hatch)" />
      </g>

      {/* 外形と穴のプロファイル */}
      <g stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" className="ds-draw">
        <path d="M90,70 L180,70 L180,220 L162,268 L162,390 L90,390 Z" />
        <path d="M330,70 L240,70 L240,220 L258,268 L258,390 L330,390 Z" />
      </g>

      {/* 中心線（一点鎖線） */}
      <line
        x1="210" y1="34" x2="210" y2="424"
        stroke="currentColor" strokeWidth="0.8" strokeDasharray="18 4 3 4"
        opacity="0.55" className="ds-draw" style={{ animationDelay: '500ms' }}
      />

      {/* 上部の寸法線 */}
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.65" className="ds-fade" style={{ animationDelay: '1100ms' }}>
        <line x1="180" y1="46" x2="240" y2="46" markerStart="url(#ds-arrow-start)" markerEnd="url(#ds-arrow)" />
        <line x1="180" y1="70" x2="180" y2="40" strokeDasharray="2 3" />
        <line x1="240" y1="70" x2="240" y2="40" strokeDasharray="2 3" />
      </g>

      {/* 側面の寸法線 */}
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.65" className="ds-fade" style={{ animationDelay: '1250ms' }}>
        <line x1="362" y1="70" x2="362" y2="390" markerStart="url(#ds-arrow-start)" markerEnd="url(#ds-arrow)" />
        <line x1="330" y1="70" x2="368" y2="70" strokeDasharray="2 3" />
        <line x1="330" y1="390" x2="368" y2="390" strokeDasharray="2 3" />
      </g>

      {/* テーパー部の引き出し線 */}
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.65" className="ds-fade" style={{ animationDelay: '1400ms' }}>
        <path d="M258,244 L306,214 L330,214" />
      </g>

      {/* 文字（製図風の注記） */}
      <g fill="currentColor" className="ds-fade" style={{ animationDelay: '1550ms' }}>
        <text x="210" y="38" textAnchor="middle" fontSize="12" opacity="0.75" className="font-mono">ø</text>
        <text x="376" y="234" fontSize="12" opacity="0.75" className="font-mono">t</text>
        <text x="336" y="210" fontSize="11" opacity="0.6" className="font-mono">TAPER</text>
        <text x="90" y="424" fontSize="11" opacity="0.5" className="font-mono" letterSpacing="1.5">SECTION A–A</text>
      </g>

      {/* 基準マーク */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.4" className="ds-fade" style={{ animationDelay: '1700ms' }}>
        <circle cx="210" cy="220" r="4" />
        <line x1="200" y1="220" x2="220" y2="220" />
        <line x1="210" y1="210" x2="210" y2="230" />
      </g>
    </svg>
  )
}
