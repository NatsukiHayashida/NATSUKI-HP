'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

/**
 * project-hub / report-hub の主要画面を、順に送りながら見せる。
 *
 * **送りをスクロールから切り離した（2026-08-16・本人の指摘）。**
 * それまでの経緯：
 *   1. 画面に貼りつけて 450vh の助走で送っていた
 *      → 貼りついている間は画面に端末しか出ず「さみしい」
 *   2. 貼りつけをやめて本文の流れの中に置いた
 *      → 図が画面より小さいぶん送りに使えるスクロール量が減り、
 *        **PC 81px・スマホ 56px で1枚進む**。「読むより先に画面下にいく」
 *
 * **コンパクトさと送りの遅さはスクロール連動では両立しない。**
 * 送りに使える距離は「画面の高さ − 図の高さ」しかなく、図を小さくするほど短くなる。
 * 距離を稼ぐには図を高くするしかなく、それは 1. に戻ることを意味する。
 * **だから距離ではなく時間で送る。**
 *
 * - 図が画面に入っている間だけ送る（外に出たら止める）
 * - 下の6つの点はボタン。**押せばその枚へ飛ぶ**ので、読みたい枚で止められる
 * - 動きを減らす設定のときは自動で送らない。点を押して見てもらう
 *
 * **毎フレームの処理は無くなった**ので state で持ってよい（以前は rAF の中で
 * DOM を直接触っていた。スクロール連動をやめた時点でその制約は消えている）。
 *
 * 画像は scripts/build-phone-tour.py が作る。すべて実物のサーバーから撮ったもの。
 * メール画面の差出人と件名だけはぼかしてある（書き換えると嘘になるため）。
 * 説明文は ~/work/project-hub/README.md と実画面から起こした。
 */

const W = 720
const SCREEN_H = 1323

/** 1枚あたりの滞在時間。長くすると読む余裕が増える */
const DWELL = 4500

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
  const [index, setIndex] = useState(0)
  const [running, setRunning] = useState(false)

  // 図が画面に入っている間だけ送る。出たら止める
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), {
      threshold: 0.35,
    })
    io.observe(root)
    return () => io.disconnect()
  }, [])

  // index が変わるたびに張り直すので、点を押した直後は満額の滞在時間が取れる
  useEffect(() => {
    if (!running) return
    const id = setTimeout(() => setIndex((v) => (v + 1) % STEPS.length), DWELL)
    return () => clearTimeout(id)
  }, [running, index])

  /* not-prose は必須。prose が中の img に上下2emを付けて画面が割れる */
  return (
    <figure className="not-prose my-10 md:my-14">
      {/*
        **画面に貼りつけない。** 上下に本文が見えている状態を保つ。
        端末を大きくすると、そのぶん本文が隠れて貼りつけと同じ見え方に近づく。
      */}
      <div ref={rootRef} className="relative">
        <div className="overflow-hidden">
          <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-[340px_1fr] md:gap-10">
            {/*
              端末。下を切って大きく見せる。
              切り口は mask で抜いて、断ち落としに見えないようにする。

              端末の箱は、端末そのものより左右に広く取る。
              マスクは箱にかかるため、ぴったりだと側面ボタン（-3px）と影が
              帯状に切り落とされる（1512pxで実測して発覚）。

              スマホ側は `w-full max-w-[280px]`。固定pxだと幅360pxの機種で本文幅を超える。
            */}
            <div
              data-stage
              className="tour-stage relative mx-auto h-[38svh] w-full max-w-[280px] pt-2 md:mx-0 md:h-[46svh] md:w-[340px] md:max-w-none"
            >
              <div className="tour-device absolute left-1/2 top-2 w-[208px] -translate-x-1/2 md:w-[280px]">
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
                            src={`/image/project-hub/tour/${s.src}.webp`}
                            alt={`${s.title}（${s.label}）`}
                            width={W}
                            height={SCREEN_H}
                            className={`tour-screen absolute inset-0 w-full${i === index ? ' on' : ''}`}
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
                  className={`tour-cap absolute inset-x-0 top-0${i === index ? ' on' : ''}`}
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

              {/*
                点はボタン。押せばその枚へ飛ぶ。
                線そのものは2pxだが、上下に余白を持たせて指で押せる高さにしてある
                （見た目の位置は -my-3 で戻すので、レイアウトは変わらない）。
              */}
              <div className="mt-10 flex max-w-[380px] gap-1.5">
                {STEPS.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`${i + 1}枚目：${s.title}`}
                    aria-current={i === index ? 'true' : undefined}
                    className="-my-3 flex-1 cursor-pointer py-3"
                  >
                    <span className="block h-[2px] w-full overflow-hidden rounded-full bg-foreground/15">
                      <span
                        // index が変わるたびに作り直して、送りの animation を頭から流す
                        key={`${index}-${i}`}
                        className={`block h-full w-full origin-left bg-primary${
                          i === index ? ' tour-fill' : ''
                        }`}
                        style={{
                          transform: i < index ? 'scaleX(1)' : 'scaleX(0)',
                          animationDuration: `${DWELL}ms`,
                          animationPlayState: running ? 'running' : 'paused',
                        }}
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}
