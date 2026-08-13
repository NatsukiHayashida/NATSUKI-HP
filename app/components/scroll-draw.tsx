'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * 中のSVGを「線が引かれるように」出す枠。画面に入ってから描き始める。
 *
 * Hero の断面図（die-section.tsx）は読み込み時に走るCSSアニメーションだが、
 * 折り返しより下に置くと見る前に描き終わってしまう。こちらは交差監視で発火する。
 *
 * **図の側は id で線と塗りを分けておくこと**（GPTへの依頼文にもそう書いてある）。
 *   <g id="◯◯-lines">          → 線が引かれる
 *   <g id="◯◯-fills-and-text"> → ふわっと出る
 * 変換スクリプトが図ごとの前置きを付けるため、id の後ろだけで拾っている。
 *
 * stroke-dasharray / stroke-dashoffset は図形ごとに周長が違うので getTotalLength() で
 * 測って入れる。固定値だと短い線は一瞬で描き終わり、長い線は描き切らない。
 * 動き方（transition）は globals.css の .scroll-draw が持つ。
 */
export default function ScrollDraw({
  children,
  className,
  /** 何番目の図形から何ミリ秒ずつ遅らせるか。0 にすると一斉に描かれる */
  stagger = 45,
  /**
   * 発火に必要な交差率。既定 0.2。
   * overflow-hidden で大部分を切り落として置く図は、交差率が「見えている割合」までしか
   * 上がらない（4分の1見せなら最大0.25）ため、既定のままだと永久に発火しないことがある。
   * そういう図はここを下げる。
   */
  threshold = 0.2,
}: {
  children: ReactNode
  className?: string
  stagger?: number
  threshold?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const lines: SVGGeometryElement[] = []

    /*
      時間差は **図ごとに数える**。
      横組みと縦組みを2枚並べて lg で出し分けているため、まとめて数えると
      隠れているほうの本数まで遅延に足されてしまう。実際、スマホで最後の17本が
      4秒経っても描き終わらなかった（2026-08-12）。
    */
    root.querySelectorAll('svg').forEach((svg) => {
      const shapes = Array.from(
        svg.querySelectorAll<SVGGeometryElement>(
          '[id$="-lines"] path, [id$="-lines"] line, [id$="-lines"] circle, [id$="-lines"] ellipse, '+
          '[id$="-lines"] rect, [id$="-lines"] polyline, [id$="-lines"] polygon'
        )
      )

      let drawn = 0
      shapes.forEach((shape) => {
        let len = 0
        try {
          len = Math.ceil(shape.getTotalLength())
        } catch {
          // getTotalLength が使えない図形は演出の対象から外す
        }
        if (!len) return
        shape.dataset.draw = ''
        shape.style.strokeDasharray = String(len)
        shape.style.strokeDashoffset = String(len)
        shape.style.transitionDelay = `${drawn * stagger}ms`
        drawn += 1
        lines.push(shape)
      })

      // 線が引き終わるころに文字が乗るようにする
      svg.querySelectorAll<SVGElement>('[id$="-fills-and-text"]').forEach((el) => {
        el.dataset.fade = ''
        el.style.transitionDelay = `${drawn * stagger + 300}ms`
      })
    })

    const reveal = () => {
      lines.forEach((s) => (s.style.strokeDashoffset = '0'))
      root.classList.add('in')
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveal()
      // SVG 自身が持つ <animate>（SMIL）は prefers-reduced-motion を見ない。
      // CSS では止められないので、ここで明示的に止める
      root.querySelectorAll('svg').forEach((svg) => svg.pauseAnimations())
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        reveal()
        io.disconnect()
      },
      { threshold }
    )
    io.observe(root)
    return () => io.disconnect()
  }, [stagger, threshold])

  return (
    <div ref={ref} className={`scroll-draw ${className ?? ''}`}>
      {children}
    </div>
  )
}
