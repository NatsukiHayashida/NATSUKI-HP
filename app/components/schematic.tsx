import { cn } from '@/lib/utils'

/**
 * 記事本文に差し込む模式図の共通枠。
 * カードや背景色は使わず、罫線・番号・モノスペースのラベルだけで構造を示す。
 *
 * **文字の持たせ方（2026-08-11 改訂）**
 * SVGの中に文字を書くと、viewBoxの縮尺で潰れるため使えない。
 * かといって番号バルーンだけにすると、読者が図と凡例を往復することになり
 * 「図を読むのに一手間かかる」状態になる（本人からの指摘）。
 * そこで **名前はHTMLでSVGの上に重ねる**（`Callouts`）。トップの循環図
 * `diagrams/work-cycle.tsx` と同じ作法で、位置は％指定、`bg-background` で線を切る。
 * 図だけで意味が取れるようにし、Legend は補足の説明に徹する。
 */

export type LegendItem = { no: string; title: string; body: string }

export type CalloutItem = {
  no: string
  /** 図の中に出す短い名前。長い説明は Legend 側へ */
  label: string
  /** SVG上の位置を％で。left は align の基準点になる */
  x: number
  y: number
  align?: 'left' | 'center' | 'right'
  accent?: boolean
}

/** SVGの上に重ねる名前つきの引き出し。図だけで意味が取れるようにするための部品 */
export function Callouts({ items }: { items: CalloutItem[] }) {
  return (
    <>
      {items.map((item) => (
        <span
          key={item.no}
          className={cn(
            'absolute -translate-y-1/2 whitespace-nowrap bg-background px-1 text-[11px] leading-tight md:text-[13px]',
            item.align === 'right' && '-translate-x-full',
            (item.align === 'center' || !item.align) && '-translate-x-1/2'
          )}
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
        >
          <span
            className={cn(
              'mr-1 font-mono text-[10px] md:text-[11px]',
              item.accent ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {item.no}
          </span>
          {item.label}
        </span>
      ))}
    </>
  )
}

/** SVGと引き出しを重ねる枠。aspect は viewBox と同じ比にする */
export function Overlay({
  ratio,
  className,
  children,
}: {
  ratio: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('relative mx-auto w-full', className)} style={{ aspectRatio: ratio }}>
      {children}
    </div>
  )
}

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
            <p className="text-[15px] font-medium leading-snug md:text-base">{item.title}</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground md:text-sm">
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
        <span className="mt-1 block text-[15px] font-medium md:text-base">{title}</span>
      </figcaption>
      <div className="space-y-6 md:space-y-8">{children}</div>
      {note && (
        <p className="mt-5 border-t pt-3 text-[13px] leading-relaxed text-muted-foreground md:mt-6 md:text-sm">
          {note}
        </p>
      )}
    </figure>
  )
}
