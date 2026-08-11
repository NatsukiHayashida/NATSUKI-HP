import { Plate, Schematic } from '@/app/components/schematic'

/**
 * Fig.01（CAD自動化）— 19.6時間のうち13.8時間（70%）が手戻り・是正・復旧だった。
 * 帯の分割位置は実時間どおり（732.24 / 1040 = 70.4%）。
 *
 * 原案: claudedocs/received/h-15-rework-breakdown.svg（横組みのみ。縦組みは未着手）
 * 数値: 5日間38件19.6h / 手戻り13.8h / 正味5.8h / 記録の25%は概算 / 手戻り率70%→15%
 * scripts/svg-to-diagram.py で生成。手で直すのは描画の不具合だけ。
 *
 * 直した1点: 朱の帯の上の白抜き文字が効いていなかった。原案は fill 属性で指定していたが、
 * SVGでは class のほうが presentation attribute に勝つため .rw-t の currentColor に負ける。
 * ダークだと明るい朱の上に明るい文字が乗って読めない。クラス（.rw-ko）に移して効かせた。
 */
export function ReworkBreakdown() {
  return (
    <Schematic label="Fig.01">
      <Plate minWidth={720} viewBox="0 0 1200 700">
        <style>{`
          .rw-t{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .rw-l{fill:none;stroke:currentColor;stroke-width:2}
          .rw-thin{fill:none;stroke:currentColor;stroke-width:1}
          .rw-a{fill:hsl(var(--primary))}
          .rw-h{font-size:29px;font-weight:700}
          .rw-b{font-size:22px}
          .rw-s{font-size:18px}
          .rw-n{font-size:58px;font-weight:750}
          /* 朱の帯の上に置く白抜き。SVGのclassはfill属性に勝つので、属性ではなくクラスで当てる */
          .rw-ko{fill:hsl(var(--background))}
        `}</style>
        <defs><pattern id="rw-p15" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path className="rw-thin" d="M0 0v10"/></pattern></defs>
        <text className="rw-t rw-h" x="54" y="58">19.6時間のうち、7割は「前へ進む作業」ではなかった</text><path className="rw-thin" d="M54 80h1092"/>
        <text className="rw-t rw-s" x="80" y="154">5日間・38件</text><rect className="rw-l" x="80" y="184" width="1040" height="150"/><rect className="rw-a" x="80" y="184" width="732.24" height="150"/><line className="rw-l" x1="812.24" y1="184" x2="812.24" y2="334"/>
        <text className="rw-t rw-n rw-ko" x="446" y="250" textAnchor="middle">13.8時間</text><text className="rw-t rw-b rw-ko" x="446" y="292" textAnchor="middle">手戻り・是正・復旧　70%</text><text className="rw-t rw-n" x="966" y="250" textAnchor="middle">5.8時間</text><text className="rw-t rw-b" x="966" y="292" textAnchor="middle">正味の新しい作業</text>
        <g transform="translate(80 410)"><text className="rw-t rw-b" y="0">記録の信頼性にも欠損があった</text><rect className="rw-l" y="32" width="420" height="110"/><rect x="315" y="32" width="105" height="110" fill="url(#rw-p15)"/><path className="rw-l" d="M105 32v110M210 32v110M315 32v110"/><text className="rw-t rw-s" x="210" y="178" textAnchor="middle">記録の25%は、クラッシュや再起動で計測を失い概算</text></g>
        <g transform="translate(710 426)"><text className="rw-t rw-b" y="0">改善後</text><text className="rw-t rw-n rw-a" x="0" y="78">70% → 15%</text><text className="rw-t rw-s" x="0" y="114">手戻り率</text></g><path className="rw-thin" d="M54 630h1092"/><text className="rw-t rw-b" x="600" y="670" textAnchor="middle">速くする前に、手戻りが生まれる構造を直した</text>
      </Plate>
    </Schematic>
  )
}
