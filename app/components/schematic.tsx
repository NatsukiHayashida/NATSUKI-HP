/**
 * 記事本文に差し込む模式図の共通枠。
 * カードや背景色は使わず、罫線・番号・モノスペースのラベルだけで構造を示す。
 * 図そのもの（SVG）には文字を入れず、名称と説明は Legend 側で持つ。
 * SVG内の文字はモバイルで潰れるため、この分離を崩さないこと。
 */

export type LegendItem = { no: string; title: string; body: string }

/** 図中の番号バルーンに対応する凡例。製図の部品表にあたる */
export function Legend({ items }: { items: LegendItem[] }) {
  return (
    <ol className="grid gap-x-8 gap-y-3.5 border-t pt-5 sm:grid-cols-2 md:gap-y-4">
      {items.map((item) => (
        <li key={item.no} className="flex gap-3">
          <span className="mt-0.5 font-mono text-[11px] tracking-[0.15em] text-primary md:text-xs">
            {item.no}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium leading-snug md:text-base">{item.title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground md:text-[13px]">
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function Schematic({
  label,
  title,
  note,
  children,
}: {
  label: string
  title: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <figure className="not-prose my-8 border-y py-6 md:my-12 md:py-8">
      <figcaption className="mb-5 md:mb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary md:text-xs">
          {label}
        </span>
        <span className="mt-1 block text-sm font-medium md:text-base">{title}</span>
      </figcaption>
      <div className="space-y-6 md:space-y-8">{children}</div>
      {note && (
        <p className="mt-5 border-t pt-3 text-xs leading-relaxed text-muted-foreground md:mt-6 md:text-[13px]">
          {note}
        </p>
      )}
    </figure>
  )
}
