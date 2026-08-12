import { Plate, Schematic } from '@/app/components/schematic'

/**
 * Fig.01（CAD自動化）— 19.6時間のうち13.8時間（70%）が手戻り・是正・復旧だった。
 * 帯の分割位置は実時間どおり（横組み 732.24/1040＝70.4%、縦組み 350/500＝70%）。
 *
 * 原案: claudedocs/received/h-15-rework-breakdown.svg（横組み）/ h-21-rework-mobile.svg（縦組み）
 * 数値: 5日間38件19.6h / 手戻り13.8h / 正味5.8h / 記録の25%は概算 / 手戻り率70%→15%
 * scripts/svg-to-diagram.py で生成。手で直すのは描画の不具合だけ。
 *
 * 直した1点（横組みのみ）: 朱の帯の上の白抜き文字が効いていなかった。原案は fill 属性で
 * 指定していたが、SVGでは class のほうが presentation attribute に勝つため .rw-t の
 * currentColor に負ける。ダークだと明るい朱の上に明るい文字が乗って読めない。
 * クラス（.rw-ko）に移して効かせた。**縦組みは作り手側が .inv クラスで直してきたので無修正。**
 */
export function ReworkBreakdown() {
  return (
    <Schematic label="Fig.01">
      <Plate viewBox="0 0 1200 700" className="hidden lg:block">
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
      <Plate viewBox="0 0 720 1160" className="lg:hidden">
        <style>{`
          .rwm-t{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .rwm-inv{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:hsl(var(--background))}
          .rwm-l{fill:none;stroke:currentColor;stroke-width:2}
          .rwm-q{fill:none;stroke:currentColor;stroke-width:1}
          .rwm-a{fill:hsl(var(--primary))}
          .rwm-h{font-size:29px;font-weight:700}
          .rwm-b{font-size:23px}
          .rwm-s{font-size:19px}
          .rwm-n{font-size:54px;font-weight:750}
        `}</style>
        <defs><pattern id="rwm-p21" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path className="rwm-q" d="M0 0v10"/></pattern></defs>
        <text className="rwm-t rwm-h" x="36" y="52">19.6時間の7割は、手戻りだった</text><text className="rwm-t rwm-s" x="36" y="90">5日間・38件</text>
        <g transform="translate(70 138)"><rect className="rwm-l" width="580" height="500"/><rect className="rwm-a" width="580" height="350"/><line className="rwm-l" x1="0" y1="350" x2="580" y2="350"/><text className="rwm-inv rwm-n" x="290" y="150" textAnchor="middle">13.8時間</text><text className="rwm-inv rwm-b" x="290" y="198" textAnchor="middle">手戻り・是正・復旧</text><text className="rwm-inv rwm-n" x="290" y="274" textAnchor="middle">70%</text><text className="rwm-t rwm-n" x="290" y="420" textAnchor="middle">5.8時間</text><text className="rwm-t rwm-b" x="290" y="464" textAnchor="middle">正味の新しい作業</text></g>
        <g transform="translate(70 700)"><text className="rwm-t rwm-b">記録の25%は計測を失い、概算</text><rect className="rwm-l" y="38" width="580" height="100"/><rect x="435" y="38" width="145" height="100" fill="url(#rwm-p21)"/><path className="rwm-l" d="M145 38v100M290 38v100M435 38v100"/></g>
        <path className="rwm-q" d="M36 912h648"/><text className="rwm-t rwm-b" x="360" y="970" textAnchor="middle">その後の手戻り率</text><text className="rwm-t rwm-n rwm-a" x="360" y="1044" textAnchor="middle">70% → 15%</text><text className="rwm-t rwm-b" x="360" y="1112" textAnchor="middle">速さより先に、手戻りの構造を直した</text>
      </Plate>
    </Schematic>
  )
}
