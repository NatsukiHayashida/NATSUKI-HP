'use client'

import { useEffect, useRef } from 'react'

/**
 * 搬送アームとダイセットが連動して動くところを見せる動画。
 * 記事「CAD操作をAIに任せる」の「動画を1コマンドで生成する仕組み」の段落の直後に置く。
 *
 * **出どころ**
 * ~/work/transfer-conveyance で生成した掲載用の別版
 * （`images/20260814/TRF搬送アーム_連動動作_web_20260814.mp4`）。依頼文は同リポジトリの
 * `docs/依頼_Web掲載用動画_20260814.md`。実機の駆動仕様（MASTER_MOTION）は変えていない。
 * 掲載用として次の4点だけ変えてある：アングルは iso 1つ／第1ステージのフィンガーを表示／
 * 製品は非表示／HUD（SPM・クランク・動作リスト）なし。
 *
 * **公開にあたって**
 * 製品を消してあるので画面に文字は一つも出ていない（伏字の処理は不要だった）。
 * 製品名がそのまま写るため消した、という経緯でもある。
 *
 * **こちらでやった加工**
 * 元は 1280×720 だが、中身は 676×525（面積の35%）しか使っておらず周りが白の余白だった。
 * 全243フレームの和集合で外形を測り、792×594 に切り出してから H.264 CRF27 で焼き直した
 * （831KB）。**中身は拡大も縮小もしていない**。余白を戻すなら crop を外して流し直すだけ。
 *
 * **文字は一切置かない（2026-08-14・本人判断）。** 最初は6つの動作名を並べた説明文と
 * 「生成した動作確認」というラベルを付けていたが、二段階で両方とも外した。
 * 前の段落が「動画を1コマンドで生成する」と言っているので、動くものが出れば用は足りる。
 * **足し直さないこと。** 罫線の囲みも、中に文字が無いと枠だけが残るのでやめた
 * （work-hub-phone と同じ、上下の余白だけの形）。
 * 動作の順番は目に見えない読者のために aria-label 側にだけ残してある。
 *
 * 3周（81フレーム×3・40.5fps・6.0秒）入っていて、末尾から先頭への繋ぎは
 * 通常の1コマ分と同じ差しかない（実測 3.01 に対し隣接コマが 2.4〜2.8）。継ぎ目は見えない。
 */

export function ArmMotion() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // 動きを減らす設定のときは自動再生させず、本人が押して見られるようにする
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.autoplay = false
      el.controls = true
      el.pause()
      return
    }

    // 画面の外にある間は止める（ずっとデコードさせ続けない）
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /*
    not-prose は必須。記事本文の prose が中のメディアに上下2emを付けるため、
    付けると枠と動画の間が32px空いて別ブロックに見える。
  */
  return (
    <figure className="not-prose my-12 md:my-16">
      <video
        ref={ref}
        src="/video/arm-motion.mp4"
        poster="/video/arm-motion-poster.webp"
        width={792}
        height={594}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="搬送アームとダイセットが連動して動く1サイクル分の動き。アームが持ち上げ、掴み、送り、下ろし、離し、戻る"
        className="mx-auto block h-auto w-full max-w-[640px] dark:brightness-90"
      />
    </figure>
  )
}
