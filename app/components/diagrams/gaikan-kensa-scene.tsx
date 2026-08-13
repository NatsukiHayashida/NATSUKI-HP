import { Plate } from '@/app/components/schematic'
import ScrollDraw from '@/app/components/scroll-draw'

/**
 * 外観検査AI記事の冒頭イメージ図（GPT作・2026-08-13受領）。
 * コンベアを流れる丸物部品を、上方の撮像装置が走査している製図風の場面。
 * 数値・文字は入っていない（イメージ図のため。過検出率などの実測値は本文とFig.01〜04が持つ）。
 * 原案: claudedocs/received/gaikan-kensa-conveyor-gear-camera.svg
 *
 * - 図番の Schematic 枠は使わない（説明図ではないので Fig 番号を振らない。
 *   本文の Fig.01〜04 の番号を守るため）
 * - 部品の流れと走査線は SVG 自身の SMIL アニメーション。
 *   SMIL は prefers-reduced-motion を見ないため、ScrollDraw の pauseAnimations() に任せる
 *   （この図には -lines グループが無いので、線が引かれる演出は掛からずポーズ処理だけ効く）
 * - 文字が無いので minWidth は外してスマホでは縮小させる
 * - 「プロジェクト概要」の本文に右回り込みで置く（本人指定・2026-08-13）。
 *   PC は右フロート45%で文章が回り込む。スマホは全幅のまま
 */
export function GaikanKensaScene() {
  return (
    // md:mt-2 は本文1行目の文字の上端と図の描き出し（カメラの吊り具）を揃えるための実測値
    <ScrollDraw className="my-6 md:mt-2 md:mb-4 md:float-right md:w-[45%] md:ml-8">
      <Plate viewBox="0 0 1200 560" aria-labelledby="gk-title gk-desc">
        <style>{`
          .gk-line{fill:none;stroke:currentColor;stroke-width:1.6;vector-effect:non-scaling-stroke}
          .gk-fine{fill:none;stroke:currentColor;stroke-width:1;opacity:.38;vector-effect:non-scaling-stroke}
          .gk-muted{opacity:.42}
          .gk-accent{fill:none;stroke:hsl(var(--primary));stroke-width:3;stroke-linecap:square;vector-effect:non-scaling-stroke}
        `}</style>
        <title id="gk-title">コンベア上の外観検査</title>
        <desc id="gk-desc">等間隔に流れる丸物部品を、上方の撮像装置が一つずつ走査している機械製図風の模式図。</desc>
        <defs>
        <clipPath id="gk-belt-clip">
        <path d="M105 365 L835 145 L1100 285 L370 505 Z"/>
        </clipPath>
        <pattern id="gk-section-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" opacity=".22"/>
        </pattern>
        <filter id="gk-soft-glow" x="-150%" y="-150%" width="400%" height="400%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <path id="gk-gear-outline" d="M0 -82 L13.46 -67.67 L31.38 -75.76 L38.33 -57.37 L57.98 -57.98 L57.37 -38.33 L75.76 -31.38 L67.67 -13.46 L82 0 L67.67 13.46 L75.76 31.38 L57.37 38.33 L57.98 57.98 L38.33 57.37 L31.38 75.76 L13.46 67.67 L0 82 L-13.46 67.67 L-31.38 75.76 L-38.33 57.37 L-57.98 57.98 L-57.37 38.33 L-75.76 31.38 L-67.67 13.46 L-82 0 L-67.67 -13.46 L-75.76 -31.38 L-57.37 -38.33 L-57.98 -57.98 L-38.33 -57.37 L-31.38 -75.76 L-13.46 -67.67 Z"/>
        <g id="gk-part">
        {/*forged gear-like part: toothed body, thickness and centre bore */}
        <g transform="scale(1 .54)">
        <use href="#gk-gear-outline" transform="translate(0 25)" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="2.4"/>
        <path d="M-82 0 V25 M-67.67 13.46 V38.46 M-57.98 57.98 V82.98 M-13.46 67.67 V92.67 M31.38 75.76 V100.76 M57.98 57.98 V82.98 M75.76 31.38 V56.38 M82 0 V25" fill="none" stroke="currentColor" strokeWidth="2" opacity=".72"/>
        <use href="#gk-gear-outline" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="2.8"/>
        <ellipse cx="0" cy="0" rx="27" ry="27" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="2.8"/>
        <ellipse cx="0" cy="5" rx="21" ry="21" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".55"/>
        </g>
        </g>
        <path id="gk-product-route" d="M990 174 L145 429"/>
        </defs>
        {/*conveyor frame */}
        <path className="gk-line" d="M105 365 L835 145 L1100 285 L370 505 Z"/>
        <path className="gk-fine" d="M105 365 L105 403 L370 543 L370 505 M370 543 L1100 323 L1100 285"/>
        <path className="gk-fine" d="M157 393 L887 173 M254 444 L984 224"/>
        <path d="M105 365 L835 145 L1100 285 L370 505 Z" fill="url(#gk-section-hatch)" opacity=".28"/>
        {/*rollers and lower construction lines */}
        <g className="gk-fine">
        <path d="M185 433 L185 491 M315 501 L315 535 M908 337 L908 386 M1033 302 L1033 350"/>
        <path d="M160 491 H337 M884 386 H1057"/>
        <circle cx="185" cy="491" r="10"/><circle cx="315" cy="535" r="10"/>
        <circle cx="908" cy="386" r="10"/><circle cx="1033" cy="350" r="10"/>
        </g>
        {/*generic forged parts physically travel along the conveyor */}
        <g clipPath="url(#gk-belt-clip)">
        <g><g transform="rotate(-17) scale(.68)"><use href="#gk-part"/></g><animateMotion dur="8s" begin="0s" repeatCount="indefinite"><mpath href="#gk-product-route"/></animateMotion></g>
        <g><g transform="rotate(-17) scale(.68)"><use href="#gk-part"/></g><animateMotion dur="8s" begin="-2s" repeatCount="indefinite"><mpath href="#gk-product-route"/></animateMotion></g>
        <g><g transform="rotate(-17) scale(.68)"><use href="#gk-part"/></g><animateMotion dur="8s" begin="-4s" repeatCount="indefinite"><mpath href="#gk-product-route"/></animateMotion></g>
        <g><g transform="rotate(-17) scale(.68)"><use href="#gk-part"/></g><animateMotion dur="8s" begin="-6s" repeatCount="indefinite"><mpath href="#gk-product-route"/></animateMotion></g>
        </g>
        {/*inspection bridge and camera */}
        <g>
        <path className="gk-line" d="M488 130 V382 M779 42 V294 M488 130 L779 42"/>
        <path className="gk-fine" d="M505 125 V371 M762 48 V299 M488 382 L505 371 M762 299 L779 294"/>
        {/*vertical industrial camera, lens and coaxial illumination head */}
        <path className="gk-line" d="M657 42 C657 19 684 19 684 42 C684 54 674 60 674 70"/>
        <ellipse cx="657" cy="49" rx="21" ry="9" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M636 49 V102 Q657 116 678 102 V49" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.6"/>
        <path className="gk-fine" d="M642 61 H672 M642 72 H672 M642 83 H672"/>
        <path d="M645 104 V123 H669 V104" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="657" cy="123" rx="12" ry="5" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="657" cy="124" rx="5" ry="2.5" fill="currentColor" opacity=".78"/>
        {/*square coaxial LED unit below the camera, as in the reference */}
        <path d="M599 127 L682 102 L716 120 L633 145 Z" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M599 127 V169 L633 187 V145 M633 187 L716 162 V120" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.7"/>
        <path className="gk-fine" d="M610 145 L630 155 M689 122 L707 132"/>
        <path d="M626 173 L685 155 L699 163 L640 181 Z" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.4"/>
        <ellipse cx="663" cy="169" rx="20" ry="8" transform="rotate(-17 663 169)" fill="none" stroke="currentColor" strokeWidth="1.4"/>
        {/*illumination field aimed at the inspection position */}
        <path d="M626 181 L580 257 L744 208 L699 163 Z" fill="url(#gk-section-hatch)" stroke="currentColor" strokeWidth="1" opacity=".32"/>
        <path className="gk-fine" strokeDasharray="5 7" d="M636 180 L606 248 M690 165 L721 215"/>
        </g>
        {/*one meaning for accent: the active scan line */}
        <g clipPath="url(#gk-belt-clip)">
        <path className="gk-accent" d="M584 263 L737 217" filter="url(#gk-soft-glow)">
        <animate attributeName="d" values="M570 258 L723 212;M600 271 L753 225;M570 258 L723 212" dur="2.8s" repeatCount="indefinite"/>
        </path>
        </g>
        {/*motion direction is carried by the belt geometry, without arrows or text */}
        <g className="gk-fine">
        <path d="M155 338 L755 157" strokeDasharray="8 18"><animate attributeName="stroke-dashoffset" from="0" to="52" dur="1.2s" repeatCount="indefinite"/></path>
        <path d="M410 481 L1010 300" strokeDasharray="8 18"><animate attributeName="stroke-dashoffset" from="0" to="52" dur="1.2s" repeatCount="indefinite"/></path>
        </g>
      </Plate>
    </ScrollDraw>
  )
}
