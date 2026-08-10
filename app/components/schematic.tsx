import { Fragment } from 'react'
import { cn } from '@/lib/utils'

/**
 * 記事本文に差し込む模式図の共通部品。
 * カードや背景色は使わず、罫線・番号・モノスペースのラベルだけで構造を示す。
 * デスクトップは横方向、モバイルは縦方向に自動で組み替わる。
 */

export type SchematicStep = {
  /** 動作している場所（WSL2 / Windows など）。罫線の上に小さく置く */
  zone?: string
  title: string
  lines?: string[]
  /** 経路上の要点。朱で強調する */
  accent?: boolean
}

function Arrow() {
  return (
    <div
      className="flex h-8 shrink-0 items-center justify-center md:h-auto md:w-10 md:items-start md:pt-[36px]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 40 12"
        fill="none"
        className="h-3 w-10 rotate-90 text-primary md:rotate-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="6" x2="31" y2="6" stroke="currentColor" strokeWidth="1" />
        <path d="M31,1.5 L39,6 L31,10.5 Z" fill="currentColor" />
      </svg>
    </div>
  )
}

function Step({ step, index }: { step: SchematicStep; index: number }) {
  return (
    <li className="min-w-0 flex-1">
      <p
        className={cn(
          'font-mono text-[10px] uppercase tracking-[0.18em] md:text-[11px]',
          step.zone ? 'text-muted-foreground' : 'select-none text-transparent'
        )}
      >
        {step.zone || ' '}
      </p>
      <div
        className={cn(
          'mt-1.5 border-t pt-2.5 md:pt-3',
          step.accent ? 'border-primary' : 'border-foreground/50'
        )}
      >
        <p
          className={cn(
            'font-mono text-[10px] tracking-[0.18em] md:text-[11px]',
            step.accent ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {String(index + 1).padStart(2, '0')}
        </p>
        <p className="mt-1 text-sm font-medium leading-snug md:text-base">{step.title}</p>
        {step.lines && step.lines.length > 0 && (
          <ul className="mt-1.5 space-y-1 md:mt-2">
            {step.lines.map((line) => (
              <li
                key={line}
                className="text-xs leading-relaxed text-muted-foreground md:text-[13px]"
              >
                {line}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  )
}

export function Flow({
  steps,
  label,
  result,
}: {
  steps: SchematicStep[]
  /** 系列名（改善前・改善後など）。省略可 */
  label?: string
  /** 系列の結果。見出し行の右端に朱で置く */
  result?: string
}) {
  return (
    <div>
      {(label || result) && (
        <div className="mb-3 flex items-baseline justify-between gap-3 border-b pb-1.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-xs">
            {label}
          </span>
          {result && (
            <span className="font-mono text-sm tabular-nums text-primary md:text-base">
              {result}
            </span>
          )}
        </div>
      )}
      <ol className="flex flex-col md:flex-row md:items-stretch">
        {steps.map((step, i) => (
          <Fragment key={step.title}>
            {i > 0 && <Arrow />}
            <Step step={step} index={i} />
          </Fragment>
        ))}
      </ol>
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
