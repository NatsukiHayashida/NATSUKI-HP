'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * project-hub / report-hub の主要画面を、iPhone の枠の中で順に見せる。
 * 「進捗 → メール → 要約 → 使用量 → レポート一覧 → レポート本体」の6枚を
 * 4.5秒ずつ切り替える（一巡27秒）。見せ方は Apple の機能紹介に寄せている。
 *
 * 画像は scripts/build-phone-tour.py が作る。すべて実物のサーバーから撮ったもので、
 * 720×1323 ＝ 枠の「上バーの下〜タブバーの下端」にちょうど収まる寸法。
 *
 * メール画面だけは会社のものなので、差出人と件名を**ぼかしてある**。
 * 件名を作り変えると嘘になるため、書き換えずに読めなくしている。
 * 説明文は推測ではなく ~/work/project-hub/README.md と実画面から起こした。
 *
 * 動きは globals.css の @keyframes tour-screen / tour-caption / tour-bar。
 * 3つとも同じ 27s の上に乗せ、切り替えは animation-delay だけでずらす。
 */

const W = 720
const SCREEN_H = 1323
const STEP_SEC = 4.5

const STEPS = [
  {
    src: 'project',
    label: '進捗',
    title: '1つのプロジェクトを開く',
    body: '最終活動、7日と30日の更新ファイル数、gitのコミットまでが1画面に出る',
  },
  {
    src: 'mail',
    label: 'メール',
    title: '会社のメールを読む',
    body: '最新40件を取りに行く。開いても既読にはしない（差出人と件名は伏せた）',
  },
  {
    src: 'today',
    label: '要約',
    title: 'その日の活動を集計する',
    body: '触ったプロジェクトとコミットを横断で数える。ここまではAIを使わない',
  },
  {
    src: 'usage',
    label: '使用量',
    title: '残りの枠を確かめる',
    body: '5時間枠と週の枠、それぞれの消費率と次にリセットされる時刻',
  },
  {
    src: 'reporthub',
    label: 'report-hub',
    title: 'レポート閲覧へ移る',
    body: '進捗とは別系統のサーバー。~/work のHTMLレポートを集めて一覧にする',
  },
  {
    src: 'report',
    label: 'レポート',
    title: 'レポートを開く',
    body: '1ファイル完結。外部への読み込みがゼロなので、そのまま人にも渡せる',
  },
]

const CYCLE = STEPS.length * STEP_SEC

export function WorkHubTour() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle('tour-in', entry.isIntersecting),
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* not-prose は必須。prose が中の img に上下2emを付けて画面が割れる */
  return (
    <figure className="not-prose my-12 md:my-20">
      <div ref={ref} className="relative mx-auto max-w-[560px]">
        <div className="relative mx-auto w-[232px] md:w-[268px]">
          <span className="absolute -left-[3px] top-[16%] h-[4%] w-[3px] rounded-l-sm bg-foreground/30" />
          <span className="absolute -left-[3px] top-[24%] h-[7%] w-[3px] rounded-l-sm bg-foreground/30" />
          <span className="absolute -left-[3px] top-[33%] h-[7%] w-[3px] rounded-l-sm bg-foreground/30" />
          <span className="absolute -right-[3px] top-[26%] h-[10%] w-[3px] rounded-r-sm bg-foreground/30" />

          <div className="rounded-[14%/6.4%] bg-foreground/15 p-[2.2%] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] ring-1 ring-foreground/25">
            <div className="relative overflow-hidden rounded-[12.4%/5.7%] bg-[#0a0d12]">
              <Image
                src="/image/project-hub/top.webp"
                alt=""
                width={W}
                height={167}
                className="relative z-20 block w-full"
              />

              {/* 6枚を重ねて、順に入れ替える */}
              <div className="relative" style={{ aspectRatio: `${W} / ${SCREEN_H}` }}>
                {STEPS.map((s, i) => (
                  <Image
                    key={s.src}
                    src={`/image/project-hub/tour/${s.src}.webp`}
                    alt={`${s.title}（${s.label}）`}
                    width={W}
                    height={SCREEN_H}
                    className="tour-screen absolute inset-0 w-full"
                    style={{ animationDelay: `${i * STEP_SEC}s` }}
                  />
                ))}
              </div>

              <div
                className="relative z-20 flex items-center justify-center"
                style={{ aspectRatio: `${W} / 64` }}
              >
                <span className="h-[3px] w-[36%] rounded-full bg-white/45" />
              </div>

              <span className="absolute left-1/2 top-[2%] z-30 h-[4.5%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
            </div>
          </div>
        </div>

        {/* 進み具合。Apple の章立てインジケータに当たる */}
        <div className="mx-auto mt-8 flex max-w-[300px] gap-1.5">
          {STEPS.map((s, i) => (
            <span key={s.src} className="h-[2px] flex-1 overflow-hidden rounded-full bg-foreground/15">
              <span
                className="tour-bar block h-full w-full origin-left bg-primary"
                style={{ animationDelay: `${i * STEP_SEC}s` }}
              />
            </span>
          ))}
        </div>

        {/*
          説明は入れ替わるが、高さが変わると下の本文が動いてしまう。
          重ねて置き、いちばん背の高い1枚で場所を確保する。
        */}
        <div className="relative mt-5 text-center">
          <p aria-hidden className="invisible mx-auto max-w-[38ch] text-[13px] leading-relaxed">
            <span className="block font-semibold">＿</span>
            <span className="block">
              最新40件を取りに行く。開いても既読にはしない（差出人と件名は伏せた）
            </span>
          </p>
          {STEPS.map((s, i) => (
            <div
              key={s.src}
              className="tour-caption absolute inset-x-0 top-0 text-center"
              style={{ animationDelay: `${i * STEP_SEC}s` }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                {s.label}
              </p>
              <p className="mt-1.5 text-[15px] font-semibold leading-snug tracking-tight">
                {s.title}
              </p>
              <p className="mx-auto mt-1 max-w-[38ch] text-[13px] leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <figcaption className="mx-auto mt-10 max-w-[26ch] text-center font-mono text-[11px] leading-relaxed tracking-[0.08em] text-muted-foreground md:max-w-[60ch] md:text-xs">
        すべて実物の画面。会社メールの差出人と件名は伏せている。
      </figcaption>
    </figure>
  )
}

export const TOUR_CYCLE_SEC = CYCLE
