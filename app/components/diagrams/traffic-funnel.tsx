import { Plate, Schematic } from '@/app/components/schematic'

/**
 * Fig.01（花製作所）— 落ちていたのはサイトの中ではなく入口。
 * 転換率（2.2% → 44% → 2.9%）はどれも悪くない。掛け算の一番左が細っている。
 *
 * 原案: claudedocs/received/h-17-funnel.svg（横組みのみ。縦組みは未着手）
 * 数値の出どころ: ~/work/hana/reports/2026-07-04_売上分解レポート.md
 *   閲覧86,000 → プロフ1,865 → タップ816（前期間比-28.5%）→ 注文24件/月。必要なタップ2,400/月
 * 伏字: 店名・商品名・売上実額は出さない
 * scripts/svg-to-diagram.py で生成。手で直すのは描画の不具合だけ。
 *
 * **直した1点（暫定）**: 原案では「サイト内」の枠（x810〜1140）がファネル最終段の
 * 「EC注文 24」（x1030付近）に重なっていた。ファネルの幅970と枠の幅330は canvas 1200 に
 * 並ばないので、横に置く限り必ず重なる。**枠を下の空き帯へ落として重なりだけ外した**
 * （枠 y105→310、下のブロックと締めの行も同じだけ下げ、高さ760→910）。
 * 左右の対比という構図は崩れているので、作り直しを H-19 として依頼に出してある。
 */
export function TrafficFunnel() {
  return (
    <Schematic label="Fig.01">
      <Plate minWidth={720} viewBox="0 0 1200 910">
        <style>{`
          .fn-t{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .fn-l{fill:none;stroke:currentColor;stroke-width:2}
          .fn-thin{fill:none;stroke:currentColor;stroke-width:1}
          .fn-a{fill:hsl(var(--primary))}
          .fn-al{fill:none;stroke:hsl(var(--primary));stroke-width:4}
          .fn-h{font-size:29px;font-weight:700}
          .fn-b{font-size:22px}
          .fn-s{font-size:18px}
          .fn-n{font-size:42px;font-weight:750}
        `}</style>
        <text className="fn-t fn-h" x="54" y="58">直すべきは、サイトの中ではなく「サイトへ来る前」だった</text><path className="fn-thin" d="M54 80h1092"/>
        <g transform="translate(60 170)"><text className="fn-t fn-s" x="100" y="-42" textAnchor="middle">SNS閲覧</text><text className="fn-t fn-n" x="100" y="0" textAnchor="middle">86,000</text><path className="fn-l" d="M210-8h90m-12-9 12 9-12 9"/><text className="fn-t fn-s" x="255" y="-28" textAnchor="middle">2.2%</text><text className="fn-t fn-s" x="390" y="-42" textAnchor="middle">プロフィール</text><text className="fn-t fn-n" x="390" textAnchor="middle">1,865</text><path className="fn-l" d="M500-8h90m-12-9 12 9-12 9"/><text className="fn-t fn-s" x="545" y="-28" textAnchor="middle">44%</text><text className="fn-t fn-s" x="680" y="-42" textAnchor="middle">外部リンク</text><text className="fn-t fn-n fn-a" x="680" textAnchor="middle">816</text><path className="fn-l" d="M790-8h90m-12-9 12 9-12 9"/><text className="fn-t fn-s" x="835" y="-28" textAnchor="middle">約2.9%</text><text className="fn-t fn-s" x="970" y="-42" textAnchor="middle">EC注文</text><text className="fn-t fn-n" x="970" textAnchor="middle">24</text></g>
        <path className="fn-al" d="M60 232h680"/><text className="fn-t fn-b fn-a" x="400" y="274" textAnchor="middle">入口側：外部リンクのタップが前期間比 28.5%減</text>
        <rect className="fn-l" x="810" y="310" width="330" height="210"/><text className="fn-t fn-b" x="975" y="351" textAnchor="middle">サイト内</text><text className="fn-t fn-s" x="975" y="389" textAnchor="middle">注文9,047件を分析</text><text className="fn-t fn-s" x="975" y="423" textAnchor="middle">購入者2,174人</text><text className="fn-t fn-s" x="975" y="457" textAnchor="middle">売上の約半分がリピート</text><text className="fn-t fn-s" x="975" y="491" textAnchor="middle">カゴ落ち率は改善</text>
        <g transform="translate(100 560)"><text className="fn-t fn-b" y="0">同じ購入効率で以前の水準を出すには</text><path className="fn-thin" d="M0 34h1000"/><text className="fn-t fn-s" y="82">現在のタップ</text><rect className="fn-l" x="170" y="54" width="272" height="52"/><text className="fn-t fn-n fn-a" x="306" y="94" textAnchor="middle">816</text><text className="fn-t fn-s" y="164">必要なタップ</text><rect className="fn-l" x="170" y="136" width="800" height="52"/><text className="fn-t fn-n" x="570" y="176" textAnchor="middle">2,400 / 月</text></g>
        <path className="fn-thin" d="M54 830h1092"/><text className="fn-t fn-b" x="600" y="876" textAnchor="middle">サイトを作り直しても、細っている入口は増えない。だから「作らない」と決めた。</text>
      </Plate>
    </Schematic>
  )
}
