"use client"

type Props = {
  className?: string;
  /** ぼかし(px) */
  intensity?: number;      // 例: 24, 32
  /** ビームの太さ(px) */
  heightPx?: number;       // 例: 8, 12, 24
  /** アニメの速度(秒) */
  speedSec?: number;       // 例: 6
  /** ビーム幅(%) */
  widthPct?: number;       // 例: 20
  /** デバッグ表示（枠線など） */
  debug?: boolean;
};

export default function MovingLightSection({
  className = "",
  intensity = 24,   // ←見えやすい初期値
  heightPx = 24,    // ←デバッグで見えるサイズ
  speedSec = 6,
  widthPct = 30,    // ←デバッグで見えるサイズ
  debug = false,
}: Props) {
  return (
    <section
      className={
        "relative overflow-hidden rounded-2xl border-2 " +
        (debug ? "border-red-500 " : "border-white/10 ") +
        "bg-neutral-950 " +
        className
      }
      style={{
        minHeight: "280px",
        // グリッド背景
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* 発光ビーム（中央を左右に往復） */}
      <div className="pointer-events-none absolute inset-0 will-change-transform">
        <div
          className={`n163-animate-beam absolute left-[-40%] right-[-40%] top-1/2 -translate-y-1/2`}
          style={{
            animationDuration: `${speedSec}s`,
            height: `${heightPx}px`,
            outline: debug ? "1px dashed rgba(255, 0, 128, .5)" : undefined, // debug
          }}
          aria-hidden="true"
        >
          <div
            className="rounded-full"
            style={{
              height: "100%",
              width: `${widthPct}%`,
              filter: `blur(${intensity}px)`,
              // 中心を明るく、外縁は急速に透明化。見えない時は stop を詰める
              background:
                "radial-gradient(50% 100% at 50% 50%, rgba(56,189,248,1), rgba(59,130,246,.95) 28%, rgba(147,51,234,.75) 52%, rgba(147,51,234,.28) 68%, rgba(0,0,0,0) 78%)",
              // 少しだけグローを加える（デバッグで視認性UP）
              boxShadow:
                "0 0 24px rgba(56,189,248,.45), 0 0 48px rgba(147,51,234,.25)",
              outline: debug ? "1px solid rgba(0, 255, 255, .4)" : undefined, // debug
            }}
          />
        </div>
      </div>
    </section>
  );
}
