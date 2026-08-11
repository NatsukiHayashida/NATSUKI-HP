import { Plate, Schematic } from '@/app/components/schematic'

/**
 * Fig.01（外観検査AI）— 旧指標「検出率100%」では、全品を不良と判定するだけの機械と
 * 実際のモデルを区別できない。違いは評価していなかった良品側にしかない。
 *
 * 原案: claudedocs/received/h-09-contextual.svg（横組み）/ h-11-mobile-metric.svg（縦組み）
 * 数値: claudedocs/DIAGRAM_BRIEF_2026-08-11.md（良品283 / 不良178、FP125 / TN158 / 見逃し0）
 * scripts/svg-to-diagram.py で生成。手で直すのは描画の不具合だけ。
 */
export function MetricBlindspot() {
  return (
    <Schematic label="Fig.01">
      <Plate viewBox="0 0 1200 720" className="hidden lg:block" aria-labelledby="mb-t mb-d">
        <style>{`
          .mb-tx{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .mb-line{fill:none;stroke:currentColor;stroke-width:2}
          .mb-thin{fill:none;stroke:currentColor;stroke-width:1}
          .mb-accent{fill:hsl(var(--primary))}
          .mb-accent-line{fill:none;stroke:hsl(var(--primary));stroke-width:3}
          .mb-muted{opacity:.52}
          .mb-small{font-size:18px}
          .mb-body{font-size:21px}
          .mb-head{font-size:29px;font-weight:700}
          .mb-big{font-size:52px;font-weight:750}
          .mb-num{font-size:26px;font-weight:700}
        `}</style>
        <title id="mb-t">検出率100%だけではモデルの良し悪しを区別できない</title><desc id="mb-d">全品不良判定と実際のモデルを、良品283枚と不良品178枚の判定内訳で比較する。</desc>
        <defs><pattern id="mb-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path className="mb-thin" d="M0 0v10"/></pattern></defs>
        <text className="mb-tx mb-head" x="54" y="62">同じ「検出率100%」でも、実態はまったく違う</text>
        <path className="mb-thin mb-muted" d="M54 84h1092"/>
        <g transform="translate(54 124)">
        <text className="mb-tx mb-body" x="250" y="0" textAnchor="middle">全品を「不良」と判定するだけ</text>
        <rect className="mb-line" x="0" y="42" width="500" height="320"/>
        <path className="mb-line" d="M0 202h500"/>
        <rect x="0" y="42" width="500" height="160" fill="url(#mb-hatch)"/>
        <rect x="0" y="202" width="500" height="160" fill="url(#mb-hatch)"/>
        <text className="mb-tx mb-small" x="18" y="76">実際は良品 283枚</text>
        <text className="mb-tx mb-big" x="250" y="146" textAnchor="middle">283</text>
        <text className="mb-tx mb-small" x="250" y="177" textAnchor="middle">全て不良判定 → 良品を全廃棄</text>
        <text className="mb-tx mb-small" x="18" y="237">実際は不良 178枚</text>
        <text className="mb-tx mb-big" x="250" y="307" textAnchor="middle">178</text>
        <text className="mb-tx mb-small" x="250" y="338" textAnchor="middle">全て停止 → 見逃し 0</text>
        <text className="mb-tx mb-big mb-accent" x="250" y="436" textAnchor="middle">検出率 100%</text>
        </g>
        <g transform="translate(646 124)">
        <text className="mb-tx mb-body" x="250" y="0" textAnchor="middle">実際に動かしたモデル</text>
        <rect className="mb-line" x="0" y="42" width="500" height="320"/>
        <path className="mb-line" d="M0 202h500M221 42v160"/>
        <rect x="0" y="42" width="221" height="160" fill="url(#mb-hatch)"/>
        <rect x="0" y="202" width="500" height="160" fill="url(#mb-hatch)"/>
        <text className="mb-tx mb-small" x="18" y="76">実際は良品 283枚</text>
        <text className="mb-tx mb-num" x="110" y="139" textAnchor="middle">125枚</text>
        <text className="mb-tx mb-small" x="110" y="169" textAnchor="middle">誤って廃棄</text>
        <text className="mb-tx mb-num" x="360" y="139" textAnchor="middle">158枚</text>
        <text className="mb-tx mb-small" x="360" y="169" textAnchor="middle">正しく通過</text>
        <text className="mb-tx mb-small" x="18" y="237">実際は不良 178枚</text>
        <text className="mb-tx mb-big" x="250" y="307" textAnchor="middle">178</text>
        <text className="mb-tx mb-small" x="250" y="338" textAnchor="middle">全て停止 → 見逃し 0</text>
        <text className="mb-tx mb-big mb-accent" x="250" y="436" textAnchor="middle">検出率 100%</text>
        </g>
        <path className="mb-accent-line" d="M54 652h1092"/>
        <text className="mb-tx mb-body" x="600" y="690" textAnchor="middle">不良品だけを見れば同点。違いは、評価していなかった「良品側」にある。</text>
      </Plate>
      <Plate viewBox="0 0 720 1280" className="lg:hidden">
        <style>{`
          .mbm-t{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .mbm-l{fill:none;stroke:currentColor;stroke-width:2}
          .mbm-a{fill:hsl(var(--primary))}
          .mbm-al{fill:none;stroke:hsl(var(--primary));stroke-width:3}
          .mbm-h{font-size:29px;font-weight:700}
          .mbm-b{font-size:23px}
          .mbm-s{font-size:19px}
          .mbm-n{font-size:48px;font-weight:750}
        `}</style>
        <defs><pattern id="mbm-p11" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path className="mbm-l" strokeWidth="1" d="M0 0v10"/></pattern></defs>
        <text className="mbm-t mbm-h" x="36" y="54">検出率100%だけでは、モデルを評価できない</text><path className="mbm-l" d="M36 76h648" opacity=".4"/>
        <g transform="translate(60 128)"><text className="mbm-t mbm-b" x="300" textAnchor="middle">全品を「不良」と判定</text><rect className="mbm-l" y="34" width="600" height="360"/><path className="mbm-l" d="M0 214h600"/><rect y="34" width="600" height="180" fill="url(#mbm-p11)"/><rect y="214" width="600" height="180" fill="url(#mbm-p11)"/><text className="mbm-t mbm-s" x="22" y="72">実際は良品 283枚</text><text className="mbm-t mbm-n" x="300" y="146" textAnchor="middle">283枚を廃棄</text><text className="mbm-t mbm-s" x="22" y="252">実際は不良 178枚</text><text className="mbm-t mbm-n" x="300" y="328" textAnchor="middle">178枚を停止</text><text className="mbm-t mbm-n mbm-a" x="300" y="462" textAnchor="middle">検出率 100%</text></g>
        <path className="mbm-l" d="M36 638h648" opacity=".4"/>
        <g transform="translate(60 694)"><text className="mbm-t mbm-b" x="300" textAnchor="middle">実際に動かしたモデル</text><rect className="mbm-l" y="34" width="600" height="360"/><path className="mbm-l" d="M0 214h600M265 34v180"/><rect y="34" width="265" height="180" fill="url(#mbm-p11)"/><rect y="214" width="600" height="180" fill="url(#mbm-p11)"/><text className="mbm-t mbm-s" x="22" y="72">実際は良品 283枚</text><text className="mbm-t mbm-b" x="132" y="142" textAnchor="middle">125枚を廃棄</text><text className="mbm-t mbm-b" x="432" y="142" textAnchor="middle">158枚を通過</text><text className="mbm-t mbm-s" x="22" y="252">実際は不良 178枚</text><text className="mbm-t mbm-n" x="300" y="328" textAnchor="middle">178枚を停止</text><text className="mbm-t mbm-n mbm-a" x="300" y="462" textAnchor="middle">検出率 100%</text></g>
        <path className="mbm-al" d="M36 1212h648"/><text className="mbm-t mbm-b" x="360" y="1252" textAnchor="middle">違いは、旧指標が見ていなかった「良品側」にある</text>
      </Plate>
    </Schematic>
  )
}
