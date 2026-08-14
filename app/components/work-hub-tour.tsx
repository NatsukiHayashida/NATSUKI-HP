'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * project-hub / report-hub の主要画面を、スクロールで送りながら見せる。
 *
 * **見本市v2（_motion-demo/index.html）の技法を使っている。**
 *   05 PIN + SWAP  端末を貼りつけたまま、中の画面だけ入れ替える（主役）
 *   06 PIN + SCRUB スクロール量がそのまま進み具合になる（下の進捗バー）
 *   08 SCALE       進むにつれて端末がわずかに近づく
 *   04 STAGGER     説明の3行が少しずつ遅れて出る
 * 進み具合の出し方（prog）も見本市と同じ式にしてある。
 *
 * **時間で自動送りにしない。** 16インチで見たとき、端末が画面の高さを使い切って
 * 説明が折り返しの下に隠れた。読む速さも人によって違う。スクロールに紐づけると
 * どちらも起きない。
 *
 * **端末は大きく出して下を切る。** 全体を入れると小さくなって画面の中身が読めない。
 * Apple も製品ページでは切り落としている。切り口はぼかしで抜く。
 *
 * 画像は scripts/build-phone-tour.py が作る。すべて実物のサーバーから撮ったもの。
 * メール画面の差出人と件名だけはぼかしてある（書き換えると嘘になるため）。
 * 説明文は ~/work/project-hub/README.md と実画面から起こした。
 */

const W = 720
const SCREEN_H = 1323

const STEPS = [
  {
    src: 'project',
    label: '進捗',
    title: '1つのプロジェクトを開く',
    body: '最終活動、7日と30日の更新ファイル数、gitのコミットまでが1画面に出る。進捗の手入力はどこにもない。',
  },
  {
    src: 'mail',
    label: 'メール',
    title: '会社のメールを読む',
    body: '最新40件を取りに行く。一覧を開いても既読にはしない。',
  },
  {
    src: 'today',
    label: '要約',
    title: 'その日の活動を集計する',
    body: '触ったプロジェクトとコミットを横断で数える。ここまではAIを使わない。要約だけが任意で走る。',
  },
  {
    src: 'usage',
    label: '使用量',
    title: '残りの枠を確かめる',
    body: '5時間枠と週の枠、それぞれの消費率と次にリセットされる時刻。重い作業を投げる前に見る。',
  },
  {
    src: 'reporthub',
    label: 'report-hub',
    title: 'レポート閲覧へ移る',
    body: '進捗とは別系統のサーバー。~/work を走査してHTMLレポートを集める。ここは1プロジェクトで絞った状態。',
  },
  {
    src: 'report',
    label: 'レポート',
    title: 'レポートを開く',
    body: 'グラフも本文も1ファイルに収める。外部への読み込みがゼロなので、そのままメールにも添付できる。',
  },
]

export function WorkHubTour() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const screens = Array.from(root.querySelectorAll<HTMLElement>('[data-screen]'))
    const caps = Array.from(root.querySelectorAll<HTMLElement>('[data-cap]'))
    const bars = Array.from(root.querySelectorAll<HTMLElement>('[data-bar]'))
    const stage = root.querySelector<HTMLElement>('[data-stage]')
    let raf = 0
    let last = -1

    // 見本市v2 と同じ式。要素の上端が画面上端を通り過ぎた割合を 0〜1 で返す
    const prog = () => {
      const r = root.getBoundingClientRect()
      const t = root.offsetHeight - window.innerHeight
      return t > 0 ? Math.min(Math.max(-r.top / t, 0), 1) : 0
    }

    const tick = () => {
      raf = 0
      const p = prog()
      const i = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length))

      // 08 SCALE：進むほどわずかに近づく（1.00 → 1.05）
      stage?.style.setProperty('--tour-scale', (1 + p * 0.05).toFixed(4))

      // 06 SCRUB：区間ごとの埋まり具合をそのままバーへ
      bars.forEach((b, k) => {
        const seg = Math.min(Math.max(p * STEPS.length - k, 0), 1)
        b.style.transform = `scaleX(${seg.toFixed(4)})`
      })

      if (i === last) return
      last = i
      // 05 SWAP
      screens.forEach((s, k) => s.classList.toggle('on', k === i))
      caps.forEach((c, k) => c.classList.toggle('on', k === i))
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  /* not-prose は必須。prose が中の img に上下2emを付けて画面が割れる */
  return (
    <figure className="not-prose my-16 md:my-24">
      {/*
        送りに使うスクロール量。1画面あたり約70vh。
        ここを変えると1画面の滞在時間が変わる（長くすると読む余裕が増える）。
      */}
      <div ref={rootRef} className="relative" style={{ height: `${STEPS.length * 70 + 30}vh` }}>
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[360px_1fr] md:gap-10">
            {/*
              端末。下を切って大きく見せる。
              切り口は mask で抜いて、断ち落としに見えないようにする。
            */}
            {/*
              端末の箱は、端末そのものより左右に広く取る。
              マスクは箱にかかるため、ぴったりだと側面ボタン（-3px）と影が
              帯状に切り落とされる（1512pxで実測して発覚）。
            */}
            <div
              data-stage
              className="tour-stage relative mx-auto h-[46svh] w-[284px] pt-2 md:mx-0 md:h-[62svh] md:w-[360px]"
            >
              <div className="tour-device absolute left-1/2 top-2 w-[224px] -translate-x-1/2 md:w-[300px]">
                <div className="relative">
                  <span className="absolute -left-[3px] top-[16%] h-[4%] w-[3px] rounded-l-sm bg-foreground/30" />
                  <span className="absolute -left-[3px] top-[24%] h-[7%] w-[3px] rounded-l-sm bg-foreground/30" />
                  <span className="absolute -left-[3px] top-[33%] h-[7%] w-[3px] rounded-l-sm bg-foreground/30" />
                  <span className="absolute -right-[3px] top-[26%] h-[10%] w-[3px] rounded-r-sm bg-foreground/30" />

                  <div className="rounded-[14%/6.4%] bg-foreground/15 p-[2.2%] shadow-[0_30px_70px_-34px_rgba(0,0,0,0.6)] ring-1 ring-foreground/25">
                    <div className="relative overflow-hidden rounded-[12.4%/5.7%] bg-[#0a0d12]">
                      <Image
                        src="/image/project-hub/top.webp"
                        alt=""
                        width={W}
                        height={167}
                        className="relative z-20 block w-full"
                      />

                      <div className="relative" style={{ aspectRatio: `${W} / ${SCREEN_H}` }}>
                        {STEPS.map((s, i) => (
                          <Image
                            key={s.src}
                            data-screen=""
                            src={`/image/project-hub/tour/${s.src}.webp`}
                            alt={`${s.title}（${s.label}）`}
                            width={W}
                            height={SCREEN_H}
                            className={`tour-screen absolute inset-0 w-full${i === 0 ? ' on' : ''}`}
                          />
                        ))}
                      </div>

                      <span className="absolute left-1/2 top-[2%] z-30 h-[4.5%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 説明。端末の横に置く。高さは一番長い1枚で確保する */}
            <div className="relative min-w-0">
              <p aria-hidden className="invisible max-w-[46ch] text-sm leading-relaxed">
                <span className="block">＿</span>
                <span className="block text-xl font-semibold">＿</span>
                <span className="block">
                  進捗とは別系統のサーバー。~/work のHTMLレポートを集めて一覧にする。ここでは1プロジェクトで絞っている。
                </span>
              </p>

              {STEPS.map((s, i) => (
                <div
                  key={s.src}
                  data-cap=""
                  className={`tour-cap absolute inset-x-0 top-0${i === 0 ? ' on' : ''}`}
                >
                  <p className="tour-cap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                    {String(i + 1).padStart(2, '0')} / {s.label}
                  </p>
                  <p className="tour-cap-2 mt-2 text-xl font-semibold leading-snug tracking-tight md:text-2xl">
                    {s.title}
                  </p>
                  <p className="tour-cap-3 mt-3 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              ))}

              {/* 06 SCRUB：スクロール量がそのまま埋まる */}
              <div className="mt-10 flex max-w-[380px] gap-1.5">
                {STEPS.map((s) => (
                  <span
                    key={s.src}
                    className="h-[2px] flex-1 overflow-hidden rounded-full bg-foreground/15"
                  >
                    <span data-bar="" className="block h-full w-full origin-left bg-primary" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}
