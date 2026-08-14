'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * project-hub をスマホで開いた画面を、iPhone の枠の中で動かして見せる。
 * 見せ方は Apple の製品ページに寄せている（中央に端末を置き、細い引き出し線で
 * 外側に短い説明を出し、動きは一巡だけ）。
 *
 * 画像は scripts/build-phone-shot.py が作る。4層。
 *
 *   top.webp     720×167   ステータスバー＋URLバー   固定
 *   strip.webp   720×3854  ページの中身              ← 縦に流れる
 *   bottom.webp  720×96    アプリのタブバー          固定
 *   drawer.webp  550×1324  メニュー                  ← 左から出入りする
 *
 * strip / top / bottom は実機の連続スクショを重なり分だけ畳んだもの。
 * drawer だけは実機ではなく、**動いている project-hub 本体**を Chrome の端末
 * エミュレーション（393×722・3倍）で開いて撮った（`.navtoggle` を checked に
 * すると開く CSS トグルのため）。実機のスクショにメニューを開いた画面が無かった。
 *
 * ホームインジケータは実機のスクショに写っていないので枠の側で描いている。
 *
 * 公開にあたり、接続先・社名由来のリポジトリ名・図番は画像の側で伏せてある
 * （どこを伏せたかは build-phone-shot.py の MASKS に書いてある）。
 *
 * 説明文は推測ではなく ~/work/project-hub/README.md から起こしている。
 *
 * 動きは globals.css の @keyframes phone-scroll / phone-drawer / phone-scrim。
 * 画面に入っている間だけ動かし、prefers-reduced-motion では止める。
 */

const W = 720
const STRIP_H = 3854
const TOP_H = 167
const BOTTOM_H = 96
const VIEWPORT_H = 1227
const DRAWER = { w: 550, h: 1324 }

/**
 * 引き出し線の行き先は「スクロールしても動かない場所」だけにする。
 * 中身は流れるので、特定のカードを指すと数秒で別のものを指してしまう。
 * top は端末の高さに対する割合。
 */
const CALLOUTS = [
  {
    side: 'left' as const,
    top: '7%',
    title: 'ブラウザで開くだけ',
    body: 'アプリではない。閉域ネットワーク内からURLで届く',
  },
  {
    side: 'right' as const,
    top: '26%',
    title: '進捗の手入力はゼロ',
    body: '29プロジェクトのファイル更新とgitを走査して、活動量を自動で出す',
  },
  {
    side: 'left' as const,
    top: '48%',
    title: 'メニューはCSSだけ',
    body: 'JavaScriptを使わず開閉する。各プロジェクトへ直接飛べる',
  },
  {
    side: 'right' as const,
    top: '66%',
    title: '次にやることを自動抽出',
    body: '各プロジェクトのPROGRESS.mdの見出しから拾って、カードに載せる',
  },
  {
    side: 'left' as const,
    top: '92%',
    title: '片手で届く位置に固定',
    body: '進捗・対話・履歴・メール・使用量。文字入力はさせない',
  },
]

export function WorkHubPhone() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // 画面の外にある間は動かさない（ずっと再描画させ続けない）
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle('phone-in', entry.isIntersecting),
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /*
    not-prose は必須。記事本文の prose が中の img に上下 2em を付けるため、
    付けないと上バー・中身・タブバーの間に32pxずつ隙間が空いて画面が割れる。
  */
  return (
    <figure className="not-prose my-12 md:my-20">
      <div ref={ref} className="phone-stage relative mx-auto max-w-[248px] md:max-w-[820px]">
        {/* 端末の後ろに敷く、ごく淡い面。Apple の製品写真の下地に当たる */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[92%] w-[560px] max-w-[130vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.045] blur-3xl"
        />

        <div className="relative mx-auto w-[232px] md:w-[268px]">
          {/* 側面のボタン。枠から少しはみ出させる */}
          <span className="absolute -left-[3px] top-[16%] h-[4%] w-[3px] rounded-l-sm bg-foreground/30" />
          <span className="absolute -left-[3px] top-[24%] h-[7%] w-[3px] rounded-l-sm bg-foreground/30" />
          <span className="absolute -left-[3px] top-[33%] h-[7%] w-[3px] rounded-l-sm bg-foreground/30" />
          <span className="absolute -right-[3px] top-[26%] h-[10%] w-[3px] rounded-r-sm bg-foreground/30" />

          {/* 筐体 */}
          <div className="rounded-[14%/6.4%] bg-foreground/15 p-[2.2%] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] ring-1 ring-foreground/25">
            <div className="relative overflow-hidden rounded-[12.4%/5.7%] bg-[#0a0d12]">
              <Image
                src="/image/project-hub/top.webp"
                alt=""
                width={W}
                height={TOP_H}
                className="relative z-20 block w-full"
              />

              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: `${W} / ${VIEWPORT_H}` }}
              >
                <Image
                  src="/image/project-hub/strip.webp"
                  alt="project-hub のスマホ画面。全プロジェクトの進捗、26週のアクティビティ、各プロジェクトのカードが縦に並ぶ"
                  width={W}
                  height={STRIP_H}
                  className="phone-strip absolute inset-x-0 top-0 w-full"
                />
              </div>

              <Image
                src="/image/project-hub/bottom.webp"
                alt=""
                width={W}
                height={BOTTOM_H}
                className="block w-full"
              />

              {/*
                メニューと、その下に敷く黒幕。
                上バーより下・タブバーの下端までを覆う（実物の .drawer が
                ブラウザの表示領域いっぱいに出るのと同じ範囲）。
              */}
              <div className="absolute inset-x-0 bottom-[4.3%] top-[11.2%] z-10 overflow-hidden">
                <div className="phone-scrim absolute inset-0 bg-black/55" />
                <Image
                  src="/image/project-hub/drawer.webp"
                  alt="開いたメニュー。進捗ダッシュボード、CC対話、実行履歴、会社メール、今日の要約、あなた待ち、横断検索、アクティビティ、使用量が並ぶ"
                  width={DRAWER.w}
                  height={DRAWER.h}
                  className="phone-drawer absolute inset-y-0 left-0 h-full w-[76.4%] object-cover object-top"
                />
              </div>

              {/* ホームインジケータの帯（実機のスクショには写っていないので描く） */}
              <div
                className="relative z-20 flex items-center justify-center"
                style={{ aspectRatio: `${W} / 64` }}
              >
                <span className="h-[3px] w-[36%] rounded-full bg-white/45" />
              </div>

              {/* Dynamic Island */}
              <span className="absolute left-1/2 top-[2%] z-30 h-[4.5%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
            </div>
          </div>
        </div>

        {/*
          引き出し線つきの注釈。端末の左右の余りに置く。
          幅は calc(50% - 134px) ＝ 端末の半分(134px)を引いた残り全部。
          768px 未満では線を引く余りが無いので、下に箇条書きで出す。
        */}
        <div aria-hidden className="hidden md:block">
          {CALLOUTS.map((c) => (
            <div
              key={c.title}
              className={[
                'phone-callout absolute w-[calc(50%-134px)]',
                c.side === 'left' ? 'left-0 pr-9 text-right' : 'right-0 pl-9 text-left',
              ].join(' ')}
              style={{ top: c.top }}
            >
              <span
                className={[
                  'absolute top-[9px] h-px w-7 bg-foreground/30',
                  c.side === 'left' ? 'right-1' : 'left-1',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute top-[7px] h-[5px] w-[5px] rounded-full bg-primary',
                  c.side === 'left' ? 'right-0' : 'left-0',
                ].join(' ')}
              />
              <p className="text-[13px] font-semibold leading-snug tracking-tight text-foreground">
                {c.title}
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 768px 未満：引き出し線をやめて、同じ内容を下に並べる */}
      <ul className="mx-auto mt-8 max-w-[248px] space-y-3 md:hidden">
        {CALLOUTS.map((c) => (
          <li key={c.title} className="border-t border-border pt-3">
            <p className="text-[13px] font-semibold leading-snug tracking-tight">{c.title}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{c.body}</p>
          </li>
        ))}
      </ul>

      {/* max-w は文字数で切る。px だと行末で単語が割れた */}
      <figcaption className="mx-auto mt-8 max-w-[26ch] text-center font-mono text-[11px] leading-relaxed tracking-[0.08em] text-muted-foreground md:mt-12 md:max-w-[48ch] md:text-xs">
        実機の画面。接続先・リポジトリ名・図番は伏せている。
      </figcaption>
    </figure>
  )
}
