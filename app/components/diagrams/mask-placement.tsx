import { Plate, Schematic } from '@/app/components/schematic'

/**
 * Fig.03（外観検査AI）— 同じマスクでも、入力画像に掛けると悪化し（72.4%）、
 * 推論後の異常マップに掛けると改善する（20.8%）。入力を削ると失うものがある。
 *
 * 原案: claudedocs/received/h-07-contextual.svg（横組み）/ h-12-mobile-mask.svg（縦組み）
 * 数値: ベースライン44.2% / 入力側72.4% / 出力側20.8%。いずれも見逃しゼロ下の比較
 * scripts/svg-to-diagram.py で生成。手で直すのは描画の不具合だけ。
 */
export function MaskPlacement() {
  return (
    <Schematic label="Fig.03">
      <Plate viewBox="0 0 1200 820" className="hidden lg:block" aria-labelledby="mk-t mk-d">
        <style>{`
          .mk-tx{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .mk-line{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
          .mk-thin{fill:none;stroke:currentColor;stroke-width:1}
          .mk-accent{fill:hsl(var(--primary))}
          .mk-accent-line{fill:none;stroke:hsl(var(--primary));stroke-width:3}
          .mk-bg{fill:hsl(var(--background))}
          .mk-head{font-size:29px;font-weight:700}
          .mk-body{font-size:20px}
          .mk-small{font-size:17px}
          .mk-big{font-size:48px;font-weight:750}
          .mk-muted{opacity:.5}
        `}</style>
        <title id="mk-t">同じマスクでも適用位置で結果が逆になる</title><desc id="mk-d">入力画像へのマスクは端の欠陥を消し過検出を72.4%へ悪化させた。異常マップへのマスクは背景反応だけを除去し20.8%へ改善した。</desc>
        <defs>
        <pattern id="mk-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path className="mk-thin" d="M0 0v9"/></pattern>
        <g id="mk-part"><circle className="mk-line" cx="100" cy="82" r="70"/><circle className="mk-line" cx="100" cy="82" r="28"/><circle className="mk-thin" cx="100" cy="35" r="6"/><circle className="mk-thin" cx="147" cy="82" r="6"/><circle className="mk-thin" cx="100" cy="129" r="6"/><circle className="mk-thin" cx="53" cy="82" r="6"/></g>
        <g id="mk-defect"><path className="mk-accent" d="M132 139c7-10 18-11 25-4-6 4-6 11-2 17-10-3-17 1-21 8-4-7-5-14-2-21z"/></g>
        <g id="mk-arrow"><path className="mk-line" d="M0 0h52m-10-9 10 9-10 9"/></g>
        </defs>
        <text className="mk-tx mk-head" x="54" y="58">同じマスク処理でも、「どこにかけるか」で結果が逆になる</text><path className="mk-thin mk-muted" d="M54 80h1092"/>
        <g transform="translate(54 116)">
        <text className="mk-tx mk-body" x="0" y="0">失敗：入力画像を先に削る</text>
        <g transform="translate(0 36)"><rect className="mk-line" width="200" height="160"/><use href="#mk-part"/><use href="#mk-defect"/></g>
        <use href="#mk-arrow" transform="translate(218 116)"/>
        <g transform="translate(288 36)"><rect className="mk-line" width="200" height="160"/><use href="#mk-part"/><use href="#mk-defect"/><path className="mk-bg" fillRule="evenodd" d="M0 0h200v160H0zM14 14v132h172V14z"/><path fill="url(#mk-hatch)" fillRule="evenodd" d="M0 0h200v160H0zM14 14v132h172V14z"/><rect className="mk-thin" x="14" y="14" width="172" height="132"/></g>
        <use href="#mk-arrow" transform="translate(506 116)"/>
        <g transform="translate(576 36)"><rect className="mk-line" width="200" height="160"/><use href="#mk-part"/><path className="mk-bg" fillRule="evenodd" d="M0 0h200v160H0zM14 14v132h172V14z"/><path fill="url(#mk-hatch)" fillRule="evenodd" d="M0 0h200v160H0zM14 14v132h172V14z"/></g>
        <path className="mk-line" d="M798 116h54m-10-9 10 9-10 9"/>
        <g transform="translate(876 38)"><path className="mk-accent-line" d="M0 0v156"/><text className="mk-tx mk-small" x="24" y="33">欠陥スコアが下がる</text><text className="mk-tx mk-small" x="24" y="69">見逃しゼロのため閾値を下げる</text><text className="mk-tx mk-small" x="24" y="105">良品まで不良側へ落ちる</text><text className="mk-tx mk-big mk-accent" x="24" y="153">72.4%</text><text className="mk-tx mk-small" x="184" y="151">過検出</text></g>
        </g>
        <path className="mk-thin mk-muted" d="M54 386h1092"/>
        <g transform="translate(54 430)">
        <text className="mk-tx mk-body" x="0" y="0">改善：推論結果から背景反応だけを削る</text>
        <g transform="translate(0 36)"><rect className="mk-line" width="200" height="160"/><use href="#mk-part"/><use href="#mk-defect"/></g>
        <use href="#mk-arrow" transform="translate(218 116)"/>
        <g transform="translate(288 36)"><rect className="mk-line" width="200" height="160"/><use href="#mk-part"/><g fill="currentColor"><circle cx="10" cy="10" r="5"/><circle cx="190" cy="10" r="5"/><circle cx="10" cy="150" r="5"/><circle cx="190" cy="150" r="5"/></g><use href="#mk-defect"/></g>
        <use href="#mk-arrow" transform="translate(506 116)"/>
        <g transform="translate(576 36)"><rect className="mk-line" width="200" height="160"/><use href="#mk-part"/><path fill="url(#mk-hatch)" fillRule="evenodd" d="M0 0h200v160H0zM100 82m-77 0a77 77 0 1 0 154 0a77 77 0 1 0-154 0"/><circle className="mk-thin" cx="100" cy="82" r="77"/><use href="#mk-defect"/></g>
        <path className="mk-line" d="M798 116h54m-10-9 10 9-10 9"/>
        <g transform="translate(876 38)"><path className="mk-accent-line" d="M0 0v156"/><text className="mk-tx mk-small" x="24" y="33">元画像と欠陥はそのまま</text><text className="mk-tx mk-small" x="24" y="69">四隅の背景反応だけ除去</text><text className="mk-tx mk-small" x="24" y="105">判定に必要な信号が残る</text><text className="mk-tx mk-big mk-accent" x="24" y="153">20.8%</text><text className="mk-tx mk-small" x="184" y="151">過検出</text></g>
        </g>
        <text className="mk-tx mk-body" x="600" y="790" textAnchor="middle">入力を削ると欠陥まで失う。出力を削れば、不要な背景反応だけを捨てられる。</text>
      </Plate>
      <Plate viewBox="0 0 720 1540" className="lg:hidden">
        <style>{`
          .mkm-t{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .mkm-l{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
          .mkm-thin{fill:none;stroke:currentColor;stroke-width:1}
          .mkm-a{fill:hsl(var(--primary))}
          .mkm-al{fill:none;stroke:hsl(var(--primary));stroke-width:3}
          .mkm-bg{fill:hsl(var(--background))}
          .mkm-h{font-size:29px;font-weight:700}
          .mkm-b{font-size:23px}
          .mkm-s{font-size:19px}
          .mkm-n{font-size:52px;font-weight:750}
        `}</style>
        <defs><pattern id="mkm-p12" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path className="mkm-thin" d="M0 0v9"/></pattern><g id="mkm-w12"><circle className="mkm-l" cx="130" cy="104" r="92"/><circle className="mkm-l" cx="130" cy="104" r="35"/><circle className="mkm-thin" cx="130" cy="43" r="7"/><circle className="mkm-thin" cx="191" cy="104" r="7"/><circle className="mkm-thin" cx="130" cy="165" r="7"/><circle className="mkm-thin" cx="69" cy="104" r="7"/></g><g id="mkm-d12"><path className="mkm-a" d="M170 181c8-11 20-11 28-4-7 5-7 12-2 19-11-3-19 1-24 9-4-8-5-16-2-24z"/></g></defs>
        <text className="mkm-t mkm-h" x="36" y="52">同じマスクでも、かける場所で結果が逆になる</text><path className="mkm-thin" d="M36 76h648"/>
        <g transform="translate(70 118)"><text className="mkm-t mkm-b" y="0">失敗：入力画像を先に削った</text><g transform="translate(0 42)"><rect className="mkm-l" width="260" height="208"/><use href="#mkm-w12"/><use href="#mkm-d12"/></g><path className="mkm-l" d="M282 146h55m-10-9 10 9-10 9"/><g transform="translate(360 42)"><rect className="mkm-l" width="260" height="208"/><use href="#mkm-w12"/><use href="#mkm-d12"/><path className="mkm-bg" fillRule="evenodd" d="M0 0h260v208H0zM16 16v176h228V16z"/><path fill="url(#mkm-p12)" fillRule="evenodd" d="M0 0h260v208H0zM16 16v176h228V16z"/></g><text className="mkm-t mkm-s" x="310" y="300" textAnchor="middle">外周マスクが、端の欠陥まで消した</text><path className="mkm-l" d="M310 320v44m-9-10 9 10 9-10"/><text className="mkm-t mkm-s" x="310" y="404" textAnchor="middle">見逃しゼロを守るため閾値を下げる</text><text className="mkm-t mkm-n mkm-a" x="310" y="470" textAnchor="middle">過検出 72.4%</text></g>
        <path className="mkm-thin" d="M36 640h648"/>
        <g transform="translate(70 694)"><text className="mkm-t mkm-b" y="0">改善：推論後の異常マップから背景だけ削った</text><g transform="translate(0 42)"><rect className="mkm-l" width="260" height="208"/><use href="#mkm-w12"/><g fill="currentColor"><circle cx="12" cy="12" r="7"/><circle cx="248" cy="12" r="7"/><circle cx="12" cy="196" r="7"/><circle cx="248" cy="196" r="7"/></g><use href="#mkm-d12"/></g><path className="mkm-l" d="M282 146h55m-10-9 10 9-10 9"/><g transform="translate(360 42)"><rect className="mkm-l" width="260" height="208"/><use href="#mkm-w12"/><path fill="url(#mkm-p12)" fillRule="evenodd" d="M0 0h260v208H0zM130 104m-103 0a103 103 0 1 0 206 0a103 103 0 1 0-206 0"/><use href="#mkm-d12"/></g><text className="mkm-t mkm-s" x="310" y="300" textAnchor="middle">四隅の背景反応だけ消し、欠陥信号は残した</text><path className="mkm-l" d="M310 320v44m-9-10 9 10 9-10"/><text className="mkm-t mkm-s" x="310" y="404" textAnchor="middle">元画像を傷つけず、判定に必要な信号を保持</text><text className="mkm-t mkm-n mkm-a" x="310" y="470" textAnchor="middle">過検出 20.8%</text></g>
        <text className="mkm-t mkm-s" x="360" y="1260" textAnchor="middle">基準：マスクなし 44.2%　／　すべて見逃しゼロ</text><path className="mkm-al" d="M36 1302h648"/><text className="mkm-t mkm-b" x="360" y="1352" textAnchor="middle">入力を削ると失うものがある。</text><text className="mkm-t mkm-b" x="360" y="1390" textAnchor="middle">出力を削れば、不要な反応だけを捨てられる。</text>
      </Plate>
    </Schematic>
  )
}
