/**
 * ネットワーク状のパス上を、青い粒が同時に流れるアニメーション。
 * - SVG <animateMotion> を使用（等速・一方向）
 * - パス配列や粒密度、スピード、色、線幅、発光の強さを調整可
 */
type NetworkProps = {
  /** ビュー全体の最小高さ(px) */
  minHeightPx?: number;
  /** 背景の暗さ(0~1) */
  backdropOpacity?: number;

  /** 配線(パス)の配列（SVG path d） */
  paths?: string[];

  /** 各パスに流す粒の個数（密度） */
  particlesPerPath?: number;

  /** 粒の半径(px) */
  particleRadius?: number;

  /** 配線(パス)の線幅(px) */
  tubeWidthPx?: number;

  /** 発光のにじみ(px)。0でにじみなし（実線っぽく） */
  glowPx?: number;

  /** 速度（秒）のランダム範囲。[min, max] */
  speedRangeSec?: [number, number];

  /** 粒の色（開始→終了）。単色にしたければ同じ値でOK */
  colorFrom?: string;
  colorTo?: string;

  /** デバッグ（境界線などを表示） */
  debug?: boolean;

  className?: string;
};

export default function MovingLightNetwork({
  minHeightPx = 360,
  backdropOpacity = 0.95,
  // デフォルトのネットワーク（1200x600座標系に合わせた適当な配線例）
  paths = [
    "M 80 120 L 300 120 L 520 200 L 760 160 L 1040 120",
    "M 200 260 L 420 260 L 620 300 L 860 260 L 1120 260",
    "M 160 420 L 420 360 L 720 420 L 980 380",
    "M 420 120 L 420 260 L 420 360",
    "M 720 160 L 720 300 L 720 420",
    "M 520 200 L 620 300 L 720 420",
    "M 300 120 L 420 260 L 620 300 L 860 260 L 980 380",
  ],
  particlesPerPath = 3,
  particleRadius = 5,
  tubeWidthPx = 8,
  glowPx = 14,
  speedRangeSec = [2.8, 4.2], // 速め
  colorFrom = "#0ea5e9",      // 濃いめの青（cyan-500系）
  colorTo = "#1e3a8a",        // 深い青（indigo-900系）※単色なら同じ色を指定
  debug = false,
  className = "",
}: NetworkProps) {
  // ランダムヘルパー（SSRでもシード不要でOKな軽い用途）
  const rand = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const svgW = 1200;
  const svgH = 600;

  // ビギンのバラつきで粒が連なって見えないようにする
  const beginOffset = (i: number, total: number, dur: number) =>
    `-${((i / total) * dur).toFixed(2)}s`;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        minHeight: `${minHeightPx}px`,
        backgroundColor: `rgb(10 10 10 / ${backdropOpacity})`,
      }}
    >
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width="100%"
        height={Math.max(minHeightPx, 300)}
        preserveAspectRatio="none"
        className={debug ? "outline outline-1 outline-fuchsia-500/40" : undefined}
      >
        <defs>
          {/* 単色〜青系グラデ（両端同色にすれば単色） */}
          <linearGradient id="mln-beam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"  stopColor={colorFrom} />
            <stop offset="100%" stopColor={colorTo} />
          </linearGradient>

          {/* 発光ぼかし（弱すぎる/強すぎるなら glowPx を調整） */}
          <filter id="mln-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={glowPx / 2} />
          </filter>
        </defs>

        {/* 配線（チューブ） */}
        <g>
          {paths.map((d, idx) => (
            <path
              key={`tube-${idx}`}
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.08)"  /* 薄い配線 */
              strokeWidth={tubeWidthPx}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* 流れる粒（各パスに複数） */}
        <g>
          {paths.map((d, pIndex) => {
            const n = particlesPerPath;
            return new Array(n).fill(0).map((_, i) => {
              const dur = rand(speedRangeSec[0], speedRangeSec[1]);
              // 方向を左右混在させたい場合は path を逆にしたバージョンも用意
              return (
                <g key={`particle-${pIndex}-${i}`}>
                  <circle
                    r={particleRadius}
                    fill="url(#mln-beam)"
                    filter={glowPx > 0 ? "url(#mln-blur)" : undefined}
                  >
                    <animateMotion
                      dur={`${dur}s`}
                      repeatCount="indefinite"
                      begin={beginOffset(i, n, dur)}
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="linear"
                      path={d}
                    />
                  </circle>
                </g>
              );
            });
          })}
        </g>
      </svg>
    </div>
  );
}
