import { cn } from '@/lib/utils'

/**
 * 記事本文に差し込む模式図の共通枠。
 * カードや背景色は使わず、罫線・番号・モノスペースのラベルだけで構造を示す。
 *
 * **文字の持たせ方（2026-08-11 改訂）**
 * SVGの中に文字を書くと、viewBoxの縮尺で潰れるため使えない。
 * かといって番号バルーンだけにすると、読者が図と凡例を往復することになり
 * 「図を読むのに一手間かかる」状態になる（本人からの指摘）。
 * そこで **名前はHTMLでSVGの上に重ねる**（`Callouts`）。位置は％指定、
 * `bg-background` で線を切る。図だけで意味が取れるようにし、Legend は補足の説明に徹する。
 *
 * **2026-08-11：図はすべて撤去した。ここに残っているのは枠だけ。**
 * 作り直しを重ねても「名称を隠すと何の比較か分からない」水準を越えられなかったため。
 * 次に作るときの基準は CLAUDE.md「記事本文への模式図の差し込み」を読むこと。
 */

export type LegendItem = { no: string; title: string; body: string }

export type CalloutItem = {
  /** 凡例と対応させる番号。名前そのものを出すだけの引き出しでは省く */
  no?: string
  /** 図の中に出す短い名前。長い説明は Legend 側へ */
  label: string
  /** SVG上の位置を％で。left は align の基準点になる */
  x: number
  y: number
  align?: 'left' | 'center' | 'right'
  accent?: boolean
  /** ％指定の幅。与えると折り返しを許す（左余白に置く群の名前など） */
  w?: number
}

/** SVGの上に重ねる名前つきの引き出し。図だけで意味が取れるようにするための部品 */
export function Callouts({ items }: { items: CalloutItem[] }) {
  return (
    <>
      {items.map((item) => (
        <span
          key={item.no ?? item.label}
          className={cn(
            'absolute -translate-y-1/2 bg-background px-1 text-[11px] leading-tight md:text-[13px]',
            item.w ? 'block' : 'whitespace-nowrap',
            item.align === 'right' && '-translate-x-full',
            (item.align === 'center' || !item.align) && '-translate-x-1/2'
          )}
          style={{ left: `${item.x}%`, top: `${item.y}%`, width: item.w ? `${item.w}%` : undefined }}
        >
          {item.no && (
            <span
              className={cn(
                'mr-1 font-mono text-[10px] md:text-[11px]',
                item.accent ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {item.no}
            </span>
          )}
          {item.label}
        </span>
      ))}
    </>
  )
}

/**
 * 図の結論そのものが数値のときに、図の直近へ大きく置く。
 * 凡例の中に数字を埋めると読み落とされるため、図とセットで先に目に入る位置に出す。
 */
export function Readout({
  items,
}: {
  items: { value: string; label: string; accent?: boolean }[]
}) {
  return (
    <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label}>
          <dt
            className={cn(
              'font-mono text-2xl leading-none tracking-tight md:text-[26px]',
              item.accent && 'text-primary'
            )}
          >
            {item.value}
          </dt>
          <dd className="mt-2 text-[13px] leading-relaxed text-muted-foreground md:text-sm">
            {item.label}
          </dd>
        </div>
      ))}
    </dl>
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
    <ol className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2 md:gap-y-4">
      {items.map((item) => (
        <li key={item.no} className="flex gap-3">
          <span className="mt-0.5 font-mono text-[11px] tracking-[0.15em] text-primary md:text-xs">
            {item.no}
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-medium leading-snug md:text-[15px]">{item.title}</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground md:text-sm">
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/**
 * SVG1枚を記事の本文幅に収める枠。`className` は外側の箱に付く（出し分け用）。
 *
 * **縦組みがある図**：`hidden lg:block` の横組みと `lg:hidden` の縦組みを2枚並べる。
 * lg で切るのは、本文幅が864pxになるのが lg 以上だから。それ未満で1200幅の横組みを
 * 出すと文字が12px を割って読めない。
 *
 * **縦組みがまだ無い図**：`minWidth` を渡すと、その幅を確保して足りない分を
 * 枠内の横スクロールへ逃がす。ページ本体は横に流れない。あくまで繋ぎ。
 */
export function Plate({
  viewBox,
  minWidth,
  className,
  children,
  ...rest
}: {
  viewBox: string
  minWidth?: number
  className?: string
  children: React.ReactNode
} & Omit<React.SVGProps<SVGSVGElement>, 'className'>) {
  const svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      role="img"
      className="block h-auto w-full"
      style={minWidth ? { minWidth } : undefined}
      {...rest}
    >
      {children}
    </svg>
  )

  if (!minWidth) return <div className={className}>{svg}</div>

  return (
    <div className={className}>
      <div className="overflow-x-auto">{svg}</div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground lg:hidden">
        → 横にスクロール
      </p>
    </div>
  )
}

export function Schematic({
  label,
  title,
  note,
  children,
}: {
  label: string
  /** SVGの中に見出しを持つ図では省く（同じ言葉を二度出さない） */
  title?: string
  note?: string
  children: React.ReactNode
}) {
  return (
    <figure className="not-prose my-4 border-y py-4">
      <figcaption className="mb-3.5 md:mb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary md:text-xs">
          {label}
        </span>
        {title && (
          <span className="mt-1 block text-[15px] font-medium md:text-[15px]">{title}</span>
        )}
      </figcaption>
      <div className="space-y-4 md:space-y-5">{children}</div>
      {note && (
        <p className="mt-4 border-t pt-3 text-[13px] leading-relaxed text-muted-foreground md:mt-5 md:text-sm">
          {note}
        </p>
      )}
    </figure>
  )
}
