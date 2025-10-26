import MovingLightNetwork from "@/app/components/MovingLightNetwork";

type Props = {
  title?: string;
  subtitle?: string;
  showReference?: boolean;

  // 見た目調整（そのまま MovingLightNetwork に渡ります）
  minHeightPx?: number;
  particlesPerPath?: number;
  particleRadius?: number;
  tubeWidthPx?: number;
  glowPx?: number;
  speedRangeSec?: [number, number];
  colorFrom?: string;
  colorTo?: string;
  debug?: boolean;
};

export default function BlogLightBannerNetwork({
  title = "Blog",
  subtitle = "AI、プログラミング、製造業の学びと試行錯誤を共有します",
  showReference = false,

  minHeightPx = 360,
  particlesPerPath = 3,
  particleRadius = 5,
  tubeWidthPx = 8,
  glowPx = 14,
  speedRangeSec = [2.8, 4.2],       // 速め
  colorFrom = "#0ea5e9",
  colorTo = "#1e3a8a",              // 濃い青のみ。単色にしたい場合は同じ色を指定
  debug = false,
}: Props) {
  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* 背景：ネットワークに光が同時に流れる */}
      <MovingLightNetwork
        minHeightPx={minHeightPx}
        particlesPerPath={particlesPerPath}
        particleRadius={particleRadius}
        tubeWidthPx={tubeWidthPx}
        glowPx={glowPx}
        speedRangeSec={speedRangeSec}
        colorFrom={colorFrom}
        colorTo={colorTo}
        debug={debug}
      />

      {/* テキスト層 */}
      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center"
        style={{ minHeight: `${minHeightPx}px` }}
      >
        <div className="pointer-events-auto mx-auto max-w-3xl px-6 py-14">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-3 text-sm md:text-base text-neutral-300">
            {subtitle}
          </p>
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
