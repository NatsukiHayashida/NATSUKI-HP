import { Plate } from '@/app/components/schematic'
import ScrollDraw from '@/app/components/scroll-draw'

/**
 * 開発基盤（work-hub）記事の冒頭イメージ図（GPT作・2026-08-14受領）。
 * 散らばったプロジェクト記録が1台の小型サーバーに集まり、
 * 整理された画面としてスマートフォンに届くまでの場面。
 * 数値・文字は入っていない（イメージ図のため。実測値は本文が持つ）。
 * 原案: claudedocs/received/work-hub-tools.svg
 *
 * 外観検査AI（gaikan-kensa-scene.tsx）・CAD自動化（cad-ai-scene.tsx）と同じ扱い：
 * - 図番の Schematic 枠は使わない（本文の Fig 番号を守る）
 * - SMIL アニメーションは ScrollDraw の pauseAnimations() で reduced-motion に対応
 * - 文字が無いので minWidth を外してスマホでは縮小
 * - 「プロジェクト概要」の本文に右回り込み。md:mt-2 は文字の上端と揃えるための実測値
 */
export function WorkHubScene() {
  return (
    <ScrollDraw className="my-6 md:mt-2 md:mb-4 md:float-right md:w-[45%] md:ml-8">
      <Plate viewBox="0 0 1200 620" aria-labelledby="wh-title wh-desc">
        <style>{`
          .wh-line{fill:none;stroke:currentColor;stroke-width:1.6;vector-effect:non-scaling-stroke}
          .wh-fine{fill:none;stroke:currentColor;stroke-width:1;opacity:.38;vector-effect:non-scaling-stroke}
          .wh-surface{fill:hsl(var(--background));stroke:currentColor;stroke-width:1.6;vector-effect:non-scaling-stroke}
          .wh-ghost{fill:none;stroke:currentColor;stroke-width:1.2;stroke-dasharray:5 7;opacity:.28;vector-effect:non-scaling-stroke}
          .wh-accent{fill:hsl(var(--primary))}
          .wh-accent-line{fill:none;stroke:hsl(var(--primary));stroke-width:2.6;stroke-linecap:round;stroke-dasharray:18 600;vector-effect:non-scaling-stroke;filter:url(#wh-glow)}
        `}</style>
        <title id="wh-title">プロジェクト情報を集約する個人用開発基盤</title>
        <desc id="wh-desc">散在するプロジェクト記録が自動で一つの小型サーバーに集まり、整理されたダッシュボードとしてスマートフォンに届く。</desc>
        <defs>
        <filter id="wh-glow" x="-250%" y="-250%" width="600%" height="600%">
        <feGaussianBlur stdDeviation="4" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <pattern id="wh-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="9" stroke="currentColor" strokeWidth="1" opacity=".18"/>
        </pattern>
        <path id="wh-flow-a" d="M250 165 C350 165 375 245 490 260"/>
        <path id="wh-flow-b" d="M210 310 C340 310 370 300 490 300"/>
        <path id="wh-flow-c" d="M250 455 C350 455 375 365 490 340"/>
        <path id="wh-flow-out" d="M710 300 C805 300 840 300 920 300"/>
        </defs>
        {/*scattered project records */}
        <g id="wh-project-sources">
        <g transform="translate(95 105)">
        <path className="wh-surface" d="M0 26 H62 L76 10 H155 V112 H0 Z"/>
        <path className="wh-fine" d="M20 51 H128 M20 70 H110 M20 89 H135"/>
        <path className="wh-line" d="M115 15 V39 H139"/>
        </g>
        <g transform="translate(55 250)">
        <path className="wh-surface" d="M0 26 H62 L76 10 H155 V112 H0 Z"/>
        <path className="wh-fine" d="M20 51 H128 M20 70 H110 M20 89 H135"/>
        <path className="wh-line" d="M115 15 V39 H139"/>
        </g>
        <g transform="translate(95 395)">
        <path className="wh-surface" d="M0 26 H62 L76 10 H155 V112 H0 Z"/>
        <path className="wh-fine" d="M20 51 H128 M20 70 H110 M20 89 H135"/>
        <path className="wh-line" d="M115 15 V39 H139"/>
        </g>
        <g className="wh-fine">
        <circle cx="285" cy="125" r="4"/><circle cx="305" cy="125" r="4"/><circle cx="325" cy="125" r="4"/>
        <circle cx="245" cy="290" r="4"/><circle cx="265" cy="290" r="4"/><circle cx="285" cy="290" r="4"/>
        <circle cx="285" cy="475" r="4"/><circle cx="305" cy="475" r="4"/><circle cx="325" cy="475" r="4"/>
        </g>
        </g>
        {/*collection paths */}
        <use href="#wh-flow-a" className="wh-ghost"/><use href="#wh-flow-b" className="wh-ghost"/><use href="#wh-flow-c" className="wh-ghost"/>
        {/*dependency-free personal server / hub */}
        <g id="wh-hub">
        <path className="wh-surface" d="M490 205 L650 205 L710 245 V395 L550 395 L490 355 Z"/>
        <path className="wh-surface" d="M490 205 L550 245 H710 L650 205 Z"/>
        <path className="wh-fine" d="M550 245 V395 M515 269 H536 M515 294 H536 M515 319 H536 M515 344 H536"/>
        <circle cx="515" cy="269" r="4" className="wh-accent"/><circle cx="515" cy="294" r="4" fill="currentColor" opacity=".35"/>
        <circle cx="515" cy="319" r="4" fill="currentColor" opacity=".35"/><circle cx="515" cy="344" r="4" fill="currentColor" opacity=".35"/>
        {/*organized dashboard within the hub */}
        <rect x="575" y="270" width="105" height="91" className="wh-surface"/>
        <path className="wh-fine" d="M587 289 H645 M587 308 H665 M587 327 H632 M587 346 H655"/>
        <path className="wh-line" d="M587 289 L600 282 L613 286 L626 273 L639 278 L652 263 L665 269"/>
        <path d="M587 361 V338 L600 332 L613 335 L626 321 L639 325 L652 309 L665 315 V361 Z" fill="url(#wh-hatch)" opacity=".45"/>
        </g>
        {/*protected connection, without a public-cloud symbol */}
        <use href="#wh-flow-out" className="wh-ghost"/>
        <g transform="translate(790 267)">
        <path className="wh-surface" d="M0 25 V10 A23 23 0 0 1 46 10 V25 M-8 25 H54 V72 H-8 Z"/>
        <circle cx="23" cy="45" r="6" fill="currentColor" opacity=".5"/>
        <path className="wh-fine" d="M23 51 V61"/>
        </g>
        {/*phone as the single reading surface */}
        <g id="wh-phone">
        <rect x="920" y="100" width="205" height="420" rx="30" className="wh-surface"/>
        <rect x="940" y="135" width="165" height="335" rx="4" fill="url(#wh-hatch)" stroke="currentColor" strokeWidth="1.2" opacity=".88"/>
        <path className="wh-fine" d="M988 118 H1058 M990 493 H1055"/>
        {/*compact mobile dashboard */}
        <rect x="957" y="158" width="131" height="62" className="wh-surface"/>
        <path className="wh-fine" d="M970 178 H1018 M970 194 H1048"/>
        <path className="wh-line" d="M1040 199 L1050 183 L1060 189 L1073 168"/>
        <rect x="957" y="236" width="131" height="58" className="wh-surface"/>
        <circle cx="975" cy="255" r="6" className="wh-accent"/>
        <path className="wh-fine" d="M992 251 H1073 M992 267 H1053 M970 281 H1076"/>
        <rect x="957" y="309" width="131" height="58" className="wh-surface"/>
        <circle cx="975" cy="328" r="6" fill="none" stroke="currentColor" strokeWidth="1.2"/>
        <path className="wh-fine" d="M992 324 H1073 M992 340 H1053 M970 354 H1076"/>
        <rect x="957" y="382" width="131" height="58" className="wh-surface"/>
        <path className="wh-fine" d="M970 400 H1054 M970 416 H1074 M970 428 H1038"/>
        <path className="wh-line" d="M1057 424 L1065 414 L1073 418 L1080 398"/>
        </g>
        {/*data packets continually converge and reach the phone */}
        <g>
        <circle r="5" className="wh-accent" filter="url(#wh-glow)"><animateMotion dur="4.8s" begin="0s" repeatCount="indefinite"><mpath href="#wh-flow-a"/></animateMotion></circle>
        <circle r="5" className="wh-accent" filter="url(#wh-glow)"><animateMotion dur="4.8s" begin="-1.6s" repeatCount="indefinite"><mpath href="#wh-flow-b"/></animateMotion></circle>
        <circle r="5" className="wh-accent" filter="url(#wh-glow)"><animateMotion dur="4.8s" begin="-3.2s" repeatCount="indefinite"><mpath href="#wh-flow-c"/></animateMotion></circle>
        <use href="#wh-flow-out" className="wh-accent-line"><animate attributeName="stroke-dashoffset" from="18" to="-600" dur="3s" repeatCount="indefinite"/></use>
        </g>
      </Plate>
    </ScrollDraw>
  )
}
