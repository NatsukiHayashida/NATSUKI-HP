import { Plate, Schematic } from '@/app/components/schematic'

/**
 * Fig.04（外観検査AI）— 撮った日が変わっただけで、良品100枚が全数、閾値の右へ出た。
 *
 * 原案: claudedocs/received/h-10-contextual.svg（横組み）/ h-13-mobile-domain.svg（縦組み）
 * 軸の位置は実測値から計算されたもので、デザインの都合ではない。動かすなら
 * claudedocs/DIAGRAM_BRIEF_2026-08-11.md と ~/work/iidzka-inspection/ の記録に当たり直すこと。
 *   同じ日の良品241枚 0.243〜0.364 / 同じ日の不良品178枚 0.323〜0.865（中央値0.491）
 *   別の日の良品100枚 0.515〜0.736（中央値0.623） / 閾値0.323 / 平均輝度140→167
 * 「不良178枚中107枚より右側」は縦組みにだけ入っている（横組みは差し替えで落ちた）。
 * scripts/svg-to-diagram.py で生成。手で直すのは描画の不具合だけ。
 *
 * 縦組みで直した1点: 3本のレーン名が y=126 の1行に並びきらず、隣と重なったうえ
 * 右端（別の日の良品 100枚）が canvas から切れていた。文言は変えず、名前と枚数を
 * 2行に分けて各レーンの真上へ中央揃えにした。
 */
export function DomainShift() {
  return (
    <Schematic label="Fig.04">
      <Plate viewBox="0 0 1200 700" className="hidden lg:block" aria-labelledby="sh-t sh-d">
        <style>{`
          .sh-tx{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .sh-line{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}
          .sh-thin{fill:none;stroke:currentColor;stroke-width:1}
          .sh-dash{fill:none;stroke:currentColor;stroke-width:2;stroke-dasharray:8 7}
          .sh-accent{fill:hsl(var(--primary))}
          .sh-accent-line{fill:none;stroke:hsl(var(--primary));stroke-width:14;stroke-linecap:round}
          .sh-range{fill:none;stroke:currentColor;stroke-width:14;stroke-linecap:round}
          .sh-head{font-size:29px;font-weight:700}
          .sh-body{font-size:20px}
          .sh-small{font-size:17px}
          .sh-num{font-size:24px;font-weight:700}
          .sh-big{font-size:42px;font-weight:750}
          .sh-muted{opacity:.52}
        `}</style>
        <title id="sh-t">撮影日が変わると良品の異常スコアが不良品より高くなる</title><desc id="sh-d">同じ日の良品、不良品、別の日の良品の実測スコア範囲を一本の軸で比較する。</desc>
        <text className="sh-tx sh-head" x="54" y="58">撮影日が変わっただけで、良品が不良品より「不良らしく」なった</text><path className="sh-thin sh-muted" d="M54 80h1092"/>
        {/*axis mapping 0.20..0.95 to x=250..1100 */}
        <path className="sh-line" d="M250 555h850m-10-9 10 9-10 9"/>
        <text className="sh-tx sh-small" x="250" y="588" textAnchor="middle">0.20</text><text className="sh-tx sh-small" x="1100" y="588" textAnchor="middle">0.95</text>
        <text className="sh-tx sh-small" x="675" y="625" textAnchor="middle">異常スコア　← 正常らしい　　　　　　　　　　　　　異常らしい →</text>
        {/*threshold 0.323 => x389.4 */}
        <path className="sh-dash" d="M389.4 112v443"/><text className="sh-tx sh-small" x="389.4" y="102" textAnchor="middle">閾値 0.323</text>
        <text className="sh-tx sh-body" x="54" y="184">同じ日の良品</text><text className="sh-tx sh-small" x="54" y="210">241枚</text>
        <path className="sh-range" d="M298.7 195h137.1"/><circle cx="298.7" cy="195" r="8" fill="currentColor"/><circle cx="435.8" cy="195" r="8" fill="currentColor"/>
        <text className="sh-tx sh-small" x="298.7" y="232" textAnchor="middle">0.243</text><text className="sh-tx sh-small" x="435.8" y="232" textAnchor="middle">0.364</text>
        <text className="sh-tx sh-body" x="54" y="332">同じ日の不良品</text><text className="sh-tx sh-small" x="54" y="358">178枚</text>
        <path className="sh-accent-line" d="M389.4 343h614.3"/><circle className="sh-accent" cx="389.4" cy="343" r="8"/><circle className="sh-accent" cx="1003.7" cy="343" r="8"/>
        <path className="sh-line" d="M579.8 325v36"/><text className="sh-tx sh-small" x="579.8" y="307" textAnchor="middle">中央値</text>
        <text className="sh-tx sh-small" x="389.4" y="380" textAnchor="middle">0.323</text><text className="sh-tx sh-small" x="1003.7" y="380" textAnchor="middle">0.865</text>
        <text className="sh-tx sh-body" x="54" y="480">別の日の良品</text><text className="sh-tx sh-small" x="54" y="506">100枚</text>
        <path className="sh-range" d="M606.7 491h250.5"/><circle cx="606.7" cy="491" r="8" fill="currentColor"/><circle cx="857.2" cy="491" r="8" fill="currentColor"/>
        <path className="sh-line" d="M728.6 473v36"/><text className="sh-tx sh-small" x="728.6" y="455" textAnchor="middle">中央値</text>
        <text className="sh-tx sh-small" x="606.7" y="528" textAnchor="middle">0.515</text><text className="sh-tx sh-small" x="857.2" y="528" textAnchor="middle">0.736</text>
        <path className="sh-thin sh-muted" d="M54 648h1092"/>
        <text className="sh-tx sh-body" x="600" y="682" textAnchor="middle">別の日の良品100枚はすべて閾値を越えた。撮像条件が変わると、固定閾値では分離できない。</text>
      </Plate>
      <Plate viewBox="0 0 720 1180" className="lg:hidden">
        <style>{`
          .shm-t{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .shm-l{fill:none;stroke:currentColor;stroke-width:2}
          .shm-thin{fill:none;stroke:currentColor;stroke-width:1}
          .shm-dash{fill:none;stroke:currentColor;stroke-width:2;stroke-dasharray:8 7}
          .shm-r{fill:none;stroke:currentColor;stroke-width:16;stroke-linecap:round}
          .shm-ar{fill:none;stroke:hsl(var(--primary));stroke-width:16;stroke-linecap:round}
          .shm-a{fill:hsl(var(--primary))}
          .shm-h{font-size:29px;font-weight:700}
          .shm-b{font-size:22px}
          .shm-s{font-size:18px}
          .shm-n{font-size:30px;font-weight:700}
        `}</style>
        <text className="shm-t shm-h" x="36" y="52">撮影日が変わると、良品の並び順が壊れた</text><path className="shm-thin" d="M36 76h648"/>
        {/*vertical axis y=160..940 maps 0.20..0.95 */} <path className="shm-l" d="M116 160v780m-9-11 9 11 9-11"/><text className="shm-t shm-s" x="116" y="152" textAnchor="middle">正常らしい</text><text className="shm-t shm-s" x="116" y="978" textAnchor="middle">異常らしい</text>
        {/*threshold y=287.92 */} <path className="shm-dash" d="M116 287.92h550"/><text className="shm-t shm-s" x="650" y="276" textAnchor="end">閾値 0.323</text>
        <text className="shm-t shm-b" x="210" y="104" textAnchor="middle">同じ日の良品</text><text className="shm-t shm-s" x="210" y="134" textAnchor="middle">241枚</text><path className="shm-r" d="M210 204.72v125.84"/><text className="shm-t shm-s" x="238" y="210">0.243</text><text className="shm-t shm-s" x="238" y="336">0.364</text>
        <text className="shm-t shm-b" x="390" y="104" textAnchor="middle">同じ日の不良品</text><text className="shm-t shm-s" x="390" y="134" textAnchor="middle">178枚</text><path className="shm-ar" d="M390 287.92v563.68"/><path className="shm-l" d="M370 462.64h40"/><text className="shm-t shm-s" x="420" y="469">中央値 0.491</text><text className="shm-t shm-s" x="418" y="294">0.323</text><text className="shm-t shm-s" x="418" y="858">0.865</text>
        <text className="shm-t shm-b" x="570" y="104" textAnchor="middle">別の日の良品</text><text className="shm-t shm-s" x="570" y="134" textAnchor="middle">100枚</text><path className="shm-r" d="M570 487.6v229.84"/><path className="shm-l" d="M550 599.92h40"/><text className="shm-t shm-s" x="600" y="606">中央値 0.623</text><text className="shm-t shm-s" x="598" y="494">0.515</text><text className="shm-t shm-s" x="598" y="724">0.736</text>
        <path className="shm-thin" d="M36 1016h648"/><text className="shm-t shm-n shm-a" x="360" y="1064" textAnchor="middle">別の日の良品100枚は、すべて閾値を越えた</text><text className="shm-t shm-b" x="360" y="1104" textAnchor="middle">同じ日の不良品178枚中107枚よりも「不良らしい」</text><text className="shm-t shm-s" x="360" y="1142" textAnchor="middle">平均輝度 140 → 167　／　同じ日のAUC 0.999</text>
      </Plate>
    </Schematic>
  )
}
