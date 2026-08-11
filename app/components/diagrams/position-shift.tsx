import { Plate, Schematic } from '@/app/components/schematic'

/**
 * Fig.02（外観検査AI）— 画素の差を生んでいた主因は欠陥ではなく位置ずれ。
 * 単純な画素比較では届かないので、教師なし異常検知へ切り替えた。
 *
 * 原案: claudedocs/received/h-14-position-shift.svg（横組みのみ。縦組みは未着手）
 * 数値: 良品同士 8.7 / 良品と不良品 13.2〜14.9（平均ピクセル差）
 * scripts/svg-to-diagram.py で生成。手で直すのは描画の不具合だけ。
 */
export function PositionShift() {
  return (
    <Schematic label="Fig.02">
      <Plate minWidth={720} viewBox="0 0 1200 650">
        <style>{`
          .ps-t{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .ps-l{fill:none;stroke:currentColor;stroke-width:2}
          .ps-thin{fill:none;stroke:currentColor;stroke-width:1}
          .ps-a{fill:hsl(var(--primary))}
          .ps-al{fill:none;stroke:hsl(var(--primary));stroke-width:3}
          .ps-h{font-size:29px;font-weight:700}
          .ps-b{font-size:22px}
          .ps-s{font-size:18px}
          .ps-n{font-size:54px;font-weight:750}
        `}</style>
        <defs><g id="ps-ring14"><circle className="ps-l" r="108"/><circle className="ps-l" r="42"/><circle className="ps-thin" cy="-70" r="8"/><circle className="ps-thin" cx="70" r="8"/><circle className="ps-thin" cy="70" r="8"/><circle className="ps-thin" cx="-70" r="8"/></g></defs>
        <text className="ps-t ps-h" x="54" y="58">画素の差を生んでいた主因は、欠陥ではなく位置ずれだった</text><path className="ps-thin" d="M54 80h1092"/>
        <g transform="translate(300 300)"><use href="#ps-ring14"/><g transform="translate(18 10)" opacity=".45"><use href="#ps-ring14"/></g><path className="ps-al" d="M-135 145h270"/><text className="ps-t ps-b" x="0" y="188" textAnchor="middle">良品 ↔ 良品</text><text className="ps-t ps-n" x="0" y="250" textAnchor="middle">8.7</text><text className="ps-t ps-s" x="0" y="282" textAnchor="middle">平均ピクセル差</text></g>
        <g transform="translate(875 300)"><use href="#ps-ring14"/><g transform="translate(18 10)" opacity=".45"><use href="#ps-ring14"/></g><path className="ps-a" d="M73 74c10-14 25-14 34-5-8 6-8 15-3 24-13-4-23 2-28 11-6-10-7-20-3-30z"/><path className="ps-al" d="M-135 145h270"/><text className="ps-t ps-b" x="0" y="188" textAnchor="middle">良品 ↔ 不良品</text><text className="ps-t ps-n" x="0" y="250" textAnchor="middle">13.2〜14.9</text><text className="ps-t ps-s" x="0" y="282" textAnchor="middle">平均ピクセル差</text></g>
        <text className="ps-t ps-b" x="600" y="618" textAnchor="middle">欠陥の信号に位置ずれが重なるため、単純な画素比較では分離できない</text>
      </Plate>
    </Schematic>
  )
}
