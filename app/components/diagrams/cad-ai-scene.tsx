import { Plate } from '@/app/components/schematic'
import ScrollDraw from '@/app/components/scroll-draw'

/**
 * CAD自動化記事の冒頭イメージ図（GPT作・2026-08-13受領）。
 * モニターの中で部品図（外形・断面・中心線・寸法線）がカーソル操作で描かれていく場面。
 * 数値・文字は入っていない（イメージ図のため。実測値は本文と Fig.01〜02 が持つ）。
 * 原案: claudedocs/received/cad-ai-automation-monitor-drafting.svg
 *
 * 外観検査AIの冒頭図（gaikan-kensa-scene.tsx）と同じ扱い：
 * - 図番の Schematic 枠は使わない（本文の Fig 番号を守る）
 * - SMIL アニメーションは ScrollDraw の pauseAnimations() で reduced-motion に対応
 * - 文字が無いので minWidth を外してスマホでは縮小
 * - 「プロジェクト概要」の本文に右回り込み。md:mt-2 は文字の上端と揃えるための実測値
 */
export function CadAiScene() {
  return (
    <ScrollDraw className="my-6 md:mt-2 md:mb-4 md:float-right md:w-[45%] md:ml-8">
      <Plate viewBox="0 0 1200 650" aria-labelledby="ca-title ca-desc">
        <style>{`
          .ca-line{fill:none;stroke:currentColor;stroke-width:1.7;vector-effect:non-scaling-stroke}
          .ca-fine{fill:none;stroke:currentColor;stroke-width:1;opacity:.4;vector-effect:non-scaling-stroke}
          .ca-ghost{fill:none;stroke:currentColor;stroke-width:1.2;stroke-dasharray:8 5 2 5;opacity:.34;vector-effect:non-scaling-stroke}
          .ca-screen{fill:hsl(var(--background));stroke:currentColor;stroke-width:2;vector-effect:non-scaling-stroke}
          .ca-draw{fill:none;stroke:hsl(var(--primary));stroke-width:2.8;stroke-linecap:square;stroke-linejoin:miter;vector-effect:non-scaling-stroke;filter:url(#ca-glow)}
        `}</style>
        <title id="ca-title">モニター内で進むCAD製図</title>
        <desc id="ca-desc">CAD画面の中で、部品図の外形、断面、中心線、寸法線がカーソル操作によって自動的に描かれていく。</desc>
        <defs>
        <clipPath id="ca-screen-clip"><rect x="155" y="72" width="890" height="470" rx="4"/></clipPath>
        <pattern id="ca-grid" width="22" height="22" patternUnits="userSpaceOnUse">
        <path d="M22 0H0V22" fill="none" stroke="currentColor" strokeWidth=".7" opacity=".08"/>
        </pattern>
        <pattern id="ca-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="9" stroke="currentColor" strokeWidth="1" opacity=".28"/>
        </pattern>
        <filter id="ca-glow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur stdDeviation="4" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/*Each route is also the final drawing geometry. */}
        <path id="ca-outer-profile" d="M375 416 V220 H438 V185 H570 V220 H633 V416 H570 V350 H438 V416 Z"/>
        <path id="ca-inner-profile" d="M438 220 V350 H570 V220"/>
        <path id="ca-top-view" d="M764 200 A112 70 0 1 1 763.9 200 M793 270 A29 18 0 1 1 792.9 270"/>
        <path id="ca-dimension-route" d="M350 442 H658 M350 432 V452 M658 432 V452 M334 205 V416 M324 205 H344 M324 416 H344"/>
        </defs>
        {/*physical monitor */}
        <rect x="125" y="42" width="950" height="530" rx="18" className="ca-screen"/>
        <rect x="155" y="72" width="890" height="470" rx="4" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="600" cy="557" r="5" fill="currentColor" opacity=".45"/>
        <path className="ca-line" d="M540 572 V600 H660 V572 M487 613 H713"/>
        <g clipPath="url(#ca-screen-clip)">
        <rect x="155" y="72" width="890" height="470" fill="url(#ca-grid)"/>
        {/*CAD chrome without text */}
        <path className="ca-line" d="M155 118 H1045 M220 118 V542"/>
        <g className="ca-fine">
        <circle cx="178" cy="94" r="7"/><circle cx="200" cy="94" r="7"/>
        <path d="M240 94 H280 M293 94 H333 M346 94 H386 M399 94 H439"/>
        <circle cx="188" cy="150" r="13"/><path d="M178 160 L198 140"/>
        <rect x="176" y="192" width="25" height="21"/><circle cx="188.5" cy="202.5" r="5"/>
        <path d="M175 260 H202 M188.5 246 V274"/>
        <path d="M176 327 L189 314 L202 327 L189 340 Z"/>
        <path d="M175 394 C184 378 193 410 202 394"/>
        <path d="M175 457 H202 M175 468 H195"/>
        </g>
        {/*drawing sheet and fixed construction geometry */}
        <rect x="264" y="144" width="715" height="350" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1" opacity=".88"/>
        <path className="ca-ghost" d="M504 164 V468 M292 318 H678 M793 171 V371 M681 270 H905"/>
        {/*section fill appears softly after the outline */}
        <path d="M375 416 V220 H438 V350 H570 V220 H633 V416 H570 V350 H438 V416 Z" fill="url(#ca-hatch)" opacity="0">
        <animate attributeName="opacity" values="0;0;.65;.65;0" keyTimes="0;.28;.36;.94;1" dur="8s" repeatCount="indefinite"/>
        </path>
        {/*finished geometry remains as restrained black linework */}
        <use href="#ca-outer-profile" className="ca-line" opacity=".34"/>
        <use href="#ca-inner-profile" className="ca-line" opacity=".34"/>
        <use href="#ca-top-view" className="ca-line" opacity=".34"/>
        <use href="#ca-dimension-route" className="ca-fine" opacity=".45"/>
        <path className="ca-fine" d="M365 436 L349 442 L365 448 M643 436 L659 442 L643 448 M328 220 L334 204 L340 220 M328 401 L334 417 L340 401"/>
        <path className="ca-fine" d="M700 400 H936 M700 416 H936 M700 432 H865 M700 448 H900"/>
        {/*active CAD strokes draw one operation after another */}
        <use href="#ca-outer-profile" className="ca-draw" strokeDasharray="1040" strokeDashoffset="1040">
        <animate attributeName="stroke-dashoffset" values="1040;0;0;1040" keyTimes="0;.25;.94;1" dur="8s" repeatCount="indefinite"/>
        </use>
        <use href="#ca-inner-profile" className="ca-draw" strokeDasharray="420" strokeDashoffset="420">
        <animate attributeName="stroke-dashoffset" values="420;420;0;0;420" keyTimes="0;.24;.38;.94;1" dur="8s" repeatCount="indefinite"/>
        </use>
        <use href="#ca-top-view" className="ca-draw" strokeDasharray="900" strokeDashoffset="900">
        <animate attributeName="stroke-dashoffset" values="900;900;0;0;900" keyTimes="0;.38;.62;.94;1" dur="8s" repeatCount="indefinite"/>
        </use>
        <use href="#ca-dimension-route" className="ca-draw" strokeDasharray="720" strokeDashoffset="720">
        <animate attributeName="stroke-dashoffset" values="720;720;0;0;720" keyTimes="0;.62;.82;.94;1" dur="8s" repeatCount="indefinite"/>
        </use>
        {/*cursor follows the current drafting action */}
        <g>
        <path d="M0 0 V29 L8 21 L15 37 L23 33 L16 18 H29 Z" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.7"/>
        <circle cx="0" cy="0" r="4" fill="hsl(var(--primary))" filter="url(#ca-glow)"/>
        <animateMotion dur="8s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1;0;1;0;1;0;1" keyTimes="0;.25;.26;.38;.39;.62;.63;1">
        <mpath href="#ca-outer-profile"/>
        </animateMotion>
        </g>
        </g>
      </Plate>
    </ScrollDraw>
  )
}
