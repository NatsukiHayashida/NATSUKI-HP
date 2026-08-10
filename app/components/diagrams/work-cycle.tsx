/**
 * このポートフォリオの中心概念。「現場 → 技術 → 現場」を回し続けているという図。
 *
 * 設計の要点：
 * - 「3つの技術を持っている」という並列の見せ方を避ける。だからカラムではなく閉じた輪で描く
 * - 循環そのものは誰でも言える。差分は「AIを軸に、現場にまだ届いていない技術まで自分で
 *   取りに行き、一人で輪を閉じる」こと。だから 02 に朱を置き、中心の一文で一人・翻訳レスを言う
 * - 技術ノードの中身は入れ替わる前提。いまのスタックは「いまの軸＋周辺」として従属させる
 * - デスクトップは楕円のリング、モバイルは縦のレール＋戻りの円環矢印に組み替わる
 * - 線はSVG、文言はHTML。図の中に文章を置かないので、どの幅でも文字が潰れない
 */

import { cn } from '@/lib/utils'

type Station = {
  no: string
  title: string
  body: string
  axis?: string
  means?: string[]
  accent?: boolean
}

const STATIONS: Station[] = [
  {
    no: '01',
    title: '現場で見つける',
    body: '課題は現場にしか落ちていない。何に困っているのかを、手を動かしている場所で掴む。',
  },
  {
    no: '02',
    title: '技術で形にする',
    body: '打ち手を、手元にある道具に限らない。AIを軸に、現場にまだ届いていない技術まで取りに行く。',
    axis: 'AI · LLM',
    means: ['CAD', 'Web', 'データ分析', '自動化'],
    accent: true,
  },
  {
    no: '03',
    title: '現場で確かめる',
    body: '実験室の数字は現場の数字ではない。使われる条件で試して、初めて成果と呼べる。',
  },
]

const CENTER_LINE =
  'この輪は、ふつう現場の人と技術の人の二人で回る。ここでは一人で閉じる。仕様書も翻訳も挟まない。'
const RETURN_LABEL = '新しい課題が出る'

/** ステーション1つ分の文言。デスクトップ・モバイルで共用する */
function StationBody({ station, align }: { station: Station; align: 'center' | 'left' }) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <p
        className={cn(
          'font-mono text-[11px] tracking-[0.18em] transition-colors group-hover:text-primary',
          station.accent ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        {station.no}
      </p>
      <p className="mt-1 text-sm font-semibold leading-snug md:text-base">{station.title}</p>
      <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground md:text-xs">
        {station.body}
      </p>
      {station.means && (
        <p className="mt-2.5 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-muted-foreground/80 md:text-[11px]">
          {station.axis && (
            <>
              <span className="text-primary">いまの軸 / {station.axis}</span>
              <span className="mx-1.5 text-muted-foreground/50">＋</span>
            </>
          )}
          {station.means.join(' · ')}
        </p>
      )}
    </div>
  )
}

/** 戻りを示す円環矢印（モバイル用） */
function LoopArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5 shrink-0 text-primary">
      <path d="M19,12 A7,7 0 1 1 12,5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12,1.8 L16.6,5 L12,8.2 Z" fill="currentColor" />
    </svg>
  )
}

export function WorkCycle() {
  return (
    <div className="not-prose">
      {/* ── デスクトップ：閉じた輪 ── */}
      <div
        className="relative mx-auto hidden w-full max-w-[880px] md:block"
        style={{ aspectRatio: '1000 / 460' }}
      >
        <svg
          viewBox="0 0 1000 460"
          fill="none"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full text-foreground"
        >
          <ellipse
            cx="500"
            cy="225"
            rx="340"
            ry="150"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.45"
            className="ds-draw-loop"
          />
          {/* 進行方向。弧の中点3箇所に置く */}
          <g fill="currentColor" className="ds-fade text-primary" style={{ animationDelay: '900ms' }}>
            <path d="M-7,-6 L8,0 L-7,6 Z" transform="translate(794.4 150) rotate(37.4)" />
            <path d="M-7,-6 L8,0 L-7,6 Z" transform="translate(500 375) rotate(180)" />
            <path d="M-7,-6 L8,0 L-7,6 Z" transform="translate(205.6 150) rotate(-37.4)" />
          </g>
        </svg>

        {/* 中心の一文 */}
        <p
          className="ds-fade absolute left-1/2 top-1/2 w-[26%] -translate-x-1/2 -translate-y-1/2 text-center text-[11px] leading-relaxed text-muted-foreground"
          style={{ animationDelay: '1100ms' }}
        >
          {CENTER_LINE}
        </p>

        {/* 戻りの弧のラベル */}
        <p
          className="ds-fade absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[11px] tracking-[0.14em] text-primary"
          style={{ left: '13%', top: '27%', animationDelay: '1000ms' }}
        >
          {RETURN_LABEL}
        </p>

        {/* ステーション。背景色で罫線を切るので、輪の上に置いてよい */}
        {[
          { left: '50%', top: '16.3%', delay: '200ms' },
          { left: '79.44%', top: '65.2%', delay: '400ms' },
          { left: '20.56%', top: '65.2%', delay: '600ms' },
        ].map((pos, i) => (
          <div
            key={STATIONS[i].no}
            className="ds-fade group absolute w-[27%] -translate-x-1/2 -translate-y-1/2 bg-background px-3"
            style={{ left: pos.left, top: pos.top, animationDelay: pos.delay }}
          >
            <div
              className={cn(
                'border-t pt-3 transition-colors group-hover:border-primary',
                STATIONS[i].accent ? 'border-primary/60' : 'border-foreground/50'
              )}
            >
              <StationBody station={STATIONS[i]} align="center" />
            </div>
          </div>
        ))}
      </div>

      {/* ── モバイル：縦のレール ── */}
      <ol className="md:hidden">
        {STATIONS.map((station, i) => (
          <li key={station.no} className="group relative pb-7 pl-9">
            {/* レール。最後のステーションからは戻り行まで伸ばす */}
            <span
              className="absolute left-[13px] top-7 bottom-0 w-px bg-border"
              aria-hidden="true"
            />
            <span
              className={cn(
                'absolute left-0 top-0 flex h-[27px] w-[27px] items-center justify-center rounded-full border bg-background font-mono text-[10px] transition-colors group-hover:border-primary group-hover:text-primary',
                station.accent
                  ? 'border-primary/70 text-primary'
                  : 'border-foreground/50 text-muted-foreground'
              )}
              aria-hidden="true"
            >
              {station.no}
            </span>
            <div className="pt-0.5">
              <p className="text-sm font-semibold leading-snug">{station.title}</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                {station.body}
              </p>
              {station.means && (
                <p className="mt-2.5 font-mono text-[10px] leading-relaxed tracking-[0.08em] text-muted-foreground/80">
                  {station.axis && (
                    <>
                      <span className="text-primary">いまの軸 / {station.axis}</span>
                      <span className="mx-1.5 text-muted-foreground/50">＋</span>
                    </>
                  )}
                  {station.means.join(' · ')}
                </p>
              )}
            </div>
          </li>
        ))}
        {/* 戻り。ここで輪が閉じる */}
        <li className="flex items-start gap-2.5">
          <LoopArrow />
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="text-primary">{RETURN_LABEL}</span>。01に戻って、また同じ順で回す。
          </p>
        </li>
        <li className="mt-6 border-t pt-4">
          <p className="text-xs leading-relaxed text-muted-foreground">{CENTER_LINE}</p>
        </li>
      </ol>
    </div>
  )
}
