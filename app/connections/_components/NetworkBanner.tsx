"use client"

import dynamic from "next/dynamic"

const NetworkAnimation = dynamic(
  () => import("@/app/components/NetworkAnimation"),
  { ssr: false }
)

type Props = {
  title?: string
  subtitle?: string
  minHeightPx?: number
}

export default function NetworkBanner({
  title = "接続ノート",
  subtitle = "異なる領域の知識を意図的に接続する、日々の気づきのアーカイブ。",
  minHeightPx = 240,
}: Props) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-card"
      style={{ minHeight: `${minHeightPx}px`, height: `${minHeightPx}px` }}
    >
      <NetworkAnimation />

      <div className="relative z-10 flex items-center justify-center text-center" style={{ minHeight: `${minHeightPx}px` }}>
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground">{title}</h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
