import MovingLightTube from "@/app/components/MovingLightTube";

type BlogLightBannerProps = {
  title?: string;
  subtitle?: string;
  showReference?: boolean;
  /** 見出しの最小高さ */
  minHeightPx?: number;
  /** 細い管の太さと光のニュアンス */
  tubeHeightPx?: number;
  glowPx?: number;
  beamWidthPct?: number;
  speedSec?: number;
  debug?: boolean;
};

export default function BlogLightBanner({
  title = "Blog",
  subtitle = "Articles, notes, and updates.",
  showReference = false,
  minHeightPx = 320,
  tubeHeightPx = 8,
  glowPx = 16,
  beamWidthPct = 16,
  speedSec = 8,
  debug = false,
}: BlogLightBannerProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* 背景：細い管の中を光が一方向に流れる */}
      <MovingLightTube
        minHeightPx={minHeightPx}
        tubeHeightPx={tubeHeightPx}
        glowPx={glowPx}
        beamWidthPct={beamWidthPct}
        speedSec={speedSec}
        debug={debug}
      />

      {/* テキスト層 */}
      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center"
        style={{ minHeight: `${minHeightPx}px` }}
      >
        <div className="pointer-events-auto mx-auto max-w-3xl px-6 py-14">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">{title}</h1>
          <p className="mt-3 text-sm md:text-base text-neutral-300">{subtitle}</p>
          {showReference && (
            <p className="mt-4 text-xs text-neutral-400">
              Inspired by{" "}
              <a
                href="https://vercel.com/home"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted underline-offset-2 text-neutral-300 hover:text-white"
              >
                Vercel Home
              </a>{" "}
              "Deploy once, deliver everywhere." section
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
