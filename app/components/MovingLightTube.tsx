type Props = {
  /** バナーの最小高さ(px) */
  minHeightPx?: number;
  /** チューブの高さ(px)：細い管の太さ */
  tubeHeightPx?: number;   // 例: 6〜10
  /** 発光のにじみ(px)：強すぎると管からはみ出して見える */
  glowPx?: number;         // 例: 12〜20
  /** 光の幅(%)：長すぎると帯に見える、短いと点に近い */
  beamWidthPct?: number;   // 例: 12〜20
  /** 移動速度(秒) */
  speedSec?: number;       // 例: 8
  /** 色（開始→終了） */
  colorFrom?: string;      // 例: #22d3ee (cyan-400)
  colorTo?: string;        // 例: #7c3aed (violet-600)
  /** 背景の暗さ(0~1)。文字の可読性確保のため薄く敷く */
  backdropOpacity?: number;// 例: 0.95
  /** デバッグ枠表示 */
  debug?: boolean;
  className?: string;
};

export default function MovingLightTube({
  minHeightPx = 320,
  tubeHeightPx = 8,
  glowPx = 16,
  beamWidthPct = 16,
  speedSec = 8,
  colorFrom = "#22d3ee",
  colorTo = "#7c3aed",
  backdropOpacity = 0.95,
  debug = false,
  className = "",
}: Props) {
  const svgHeight = tubeHeightPx + glowPx * 2; // ぼかし分を含む描画高さ
  const tubeRadius = tubeHeightPx / 2;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-neutral-950`}
      style={{ minHeight: `${minHeightPx}px`, backgroundColor: `rgb(10 10 10 / ${backdropOpacity})` }}
    >
      {/* 文字や任意の子要素を乗せたい場合は親側でラップしてください */}
      {/* チューブは中央に配置 */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2"
        style={{ height: svgHeight }}
      >
        <svg
          viewBox={`0 0 1000 ${svgHeight}`}
          width="100%"
          height={svgHeight}
          preserveAspectRatio="none"
          className={debug ? "outline outline-1 outline-fuchsia-500/50" : undefined}
          style={{ "--tube-speed": `${speedSec}s` } as React.CSSProperties}
        >
          <defs>
            {/* チューブ形状（角丸の細い長方形）にクリップ */}
            <clipPath id="tube-clip">
              <rect x="0" y={glowPx} width="1000" height={tubeHeightPx} rx={tubeRadius} ry={tubeRadius} />
            </clipPath>

            {/* 横方向のグラデーション（左→右） */}
            <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"  stopColor={colorFrom} />
              <stop offset="100%" stopColor={colorTo} />
            </linearGradient>

            {/* 発光用のぼかしフィルタ（強すぎると管の外に漏れやすい） */}
            <filter id="beam-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation={glowPx / 2} />
            </filter>
          </defs>

          {/* チューブの背景（ほんのり見える程度） */}
          <g clipPath="url(#tube-clip)">
            <rect
              x="0" y={glowPx} width="1000" height={tubeHeightPx} rx={tubeRadius} ry={tubeRadius}
              fill="rgba(255,255,255,0.05)"
            />
            {/* 流れる光（等速一方向） */}
            <g className="n163-tube-animate" clipPath="url(#tube-clip)">
              {/* ビームはビューボックス比率で幅可変 */}
              <rect
                x="0" y={glowPx}
                width={(1000 * beamWidthPct) / 100}
                height={tubeHeightPx}
                fill="url(#beam-grad)"
                filter="url(#beam-blur)"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* デバッグ用のラベル */}
      {debug && (
        <div className="absolute left-2 bottom-2 text-xs text-fuchsia-200 bg-fuchsia-500/20 rounded px-2 py-1">
          tube:{tubeHeightPx}px glow:{glowPx}px width:{beamWidthPct}% speed:{speedSec}s
        </div>
      )}

      {/* 上に重ねるためのスロット。ここでは空。BlogLightBanner側でテキストを重ねます */}
      <div className={`relative z-10 ${className}`} />
    </div>
  );
}
