"use client";
import dynamic from "next/dynamic";
const MovingLightNetworkCanvas = dynamic(
  () => import("@/app/components/MovingLightNetworkCanvas"),
  { ssr: false }
);

type Props = {
  title?: string;
  subtitle?: string;
  showReference?: boolean;
  minHeightPx?: number;
  beamWidth?: number;
  spawnRate?: number;
  speed?: number;
  trail?: number;
  gridOpacity?: number;
  color?: string;
  curveCount?: number;
  directionBias?: number;
  respectReducedMotion?: boolean;
  debugOverlay?: boolean;
  clipPaddingPx?: number;
  glowOuterScale?: number;
};

export default function BlogLightBannerNetworkCanvas({
  title = "Blog",
  subtitle = "AI、プログラミング、製造業の学びを記録しています。",
  showReference = false,
  minHeightPx = 360,
  beamWidth = 2.0,
  spawnRate = 4,
  speed = 380,
  trail = 0.86,
  gridOpacity = 0.05,
  color = "#0ea5e9",
  curveCount = 4,
  directionBias = -0.2,
  respectReducedMotion = true,
  debugOverlay = false,
  clipPaddingPx = 8,
  glowOuterScale = 4.0,
}: Props) {
  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: `${minHeightPx}px`, height: `${minHeightPx}px` }}>
      <div className="absolute inset-0" style={{ minHeight: `${minHeightPx}px` }}>
        <MovingLightNetworkCanvas
          minHeightPx={minHeightPx}
          beamWidth={beamWidth}
          spawnRate={spawnRate}
          speed={speed}
          trail={trail}
          gridOpacity={gridOpacity}
          color={color}
          curveCount={curveCount}
          directionBias={directionBias}
          respectReducedMotion={respectReducedMotion}
          debugOverlay={debugOverlay}
          clipPaddingPx={clipPaddingPx}
          glowOuterScale={glowOuterScale}
        />
      </div>

      <div
        className="relative z-10 flex items-center justify-center text-center"
        style={{ minHeight: `${minHeightPx}px` }}
      >
        <div className="mx-auto max-w-3xl px-6 py-14">
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
