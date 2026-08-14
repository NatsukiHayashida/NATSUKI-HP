'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * project-hub をスマホで開いた画面を、iPhone の枠の中でスクロールさせる。
 *
 * 画像は scripts/build-phone-shot.py が作る（実機の連続スクショ4枚を、重なりを
 * 実測して1本につないだもの）。3層に分けてあるのは、実機と同じく上のバーと
 * タブバーが固定で、中身だけが動くようにするため。
 *
 *   top.webp     167  ステータスバー＋URLバー   固定
 *   strip.webp  3854  ページの中身              ← ここだけ動く
 *   bottom.webp   96  アプリのタブバー          固定
 *
 * ホームインジケータは実機のスクショに写っていない（Safari の下バーに隠れていて、
 * その帯は緑がにじむので切り落とした）ため、枠の側で描いている。
 *
 * 数値はすべて実測（1179×2556 の実機スクショを幅720へ縮めたもの）。
 * 画像を作り直したら public/image/project-hub/meta.json の値と突き合わせること。
 *
 * 公開にあたり、接続先・社名由来のリポジトリ名・図番は画像の側で伏せてある
 * （どこを伏せたかは build-phone-shot.py の MASKS に書いてある）。
 *
 * 動きは globals.css の @keyframes phone-scroll。画面に入っている間だけ動かし、
 * prefers-reduced-motion では止める（CSS側で animation:none にしている）。
 */

const W = 720
const STRIP_H = 3854
const TOP_H = 167
const BOTTOM_H = 96
const VIEWPORT_H = 1227

export function WorkHubPhone() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // 画面の外にある間は動かさない（ずっと再描画させ続けない）
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle('phone-in', entry.isIntersecting),
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    /*
      not-prose は必須。記事本文の prose が中の img に上下 2em を付けるため、
      付けないと上バー・中身・タブバーの間に32pxずつ隙間が空いて画面が割れる。
    */
    <figure className="not-prose my-8 flex flex-col items-center gap-4 md:my-10">
      <div ref={ref} className="relative w-[232px] md:w-[268px]">
        {/* 側面のボタン。枠から少しはみ出させる */}
        <span className="absolute -left-[3px] top-[16%] h-[4%] w-[3px] rounded-l-sm bg-foreground/30" />
        <span className="absolute -left-[3px] top-[24%] h-[7%] w-[3px] rounded-l-sm bg-foreground/30" />
        <span className="absolute -left-[3px] top-[33%] h-[7%] w-[3px] rounded-l-sm bg-foreground/30" />
        <span className="absolute -right-[3px] top-[26%] h-[10%] w-[3px] rounded-r-sm bg-foreground/30" />

        {/* 筐体 */}
        <div className="rounded-[14%/6.4%] bg-foreground/15 p-[2.2%] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.55)] ring-1 ring-foreground/25">
          <div className="relative overflow-hidden rounded-[12.4%/5.7%] bg-[#0a0d12]">
            <Image
              src="/image/project-hub/top.webp"
              alt=""
              width={W}
              height={TOP_H}
              className="block w-full"
            />

            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: `${W} / ${VIEWPORT_H}` }}
            >
              <Image
                src="/image/project-hub/strip.webp"
                alt="project-hub のスマホ画面。全プロジェクトの進捗、アクティビティ、各プロジェクトのカードが縦に並ぶ"
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

            {/* ホームインジケータの帯（実機のスクショには写っていないので描く） */}
            <div
              className="flex items-center justify-center"
              style={{ aspectRatio: `${W} / 64` }}
            >
              <span className="h-[3px] w-[36%] rounded-full bg-white/45" />
            </div>

            {/* Dynamic Island */}
            <span className="absolute left-1/2 top-[2%] h-[4.5%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>
      </div>

      {/* max-w は文字数で切る。px だと 390px のとき行末で単語が割れた */}
      <figcaption className="max-w-[30ch] text-center font-mono text-[11px] leading-relaxed tracking-[0.08em] text-muted-foreground md:text-xs">
        実機の画面。上下のバーは固定で、中身だけが動く。接続先・リポジトリ名・図番は伏せている。
      </figcaption>
    </figure>
  )
}
