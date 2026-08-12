import { Plate, Schematic } from '@/app/components/schematic'

/**
 * Fig.02（外観検査AI）— 画素の差を生んでいた主因は欠陥ではなく位置ずれ。
 * 単純な画素比較では届かないので、教師なし異常検知へ切り替えた。
 *
 * 原案: claudedocs/received/h-14-position-shift.svg（横組み）/ h-20-position-shift-mobile.svg（縦組み）
 * 数値: 良品同士 8.7 / 良品と不良品 13.2〜14.9（平均ピクセル差）
 * scripts/svg-to-diagram.py で生成。手で直すのは描画の不具合だけ。
 */
export function PositionShift() {
  return (
    <Schematic label="Fig.02">
      <Plate viewBox="0 0 1200 650" className="hidden lg:block">
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
      <Plate viewBox="0 0 720 1180" className="lg:hidden">
        <style>{`
          .psm-t{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .psm-l{fill:none;stroke:currentColor;stroke-width:2}
          .psm-q{fill:none;stroke:currentColor;stroke-width:1}
          .psm-a{fill:hsl(var(--primary))}
          .psm-h{font-size:29px;font-weight:700}
          .psm-b{font-size:23px}
          .psm-s{font-size:19px}
          .psm-n{font-size:58px;font-weight:750}
        `}</style>
        <defs><g id="psm-r20"><circle className="psm-l" r="120"/><circle className="psm-l" r="46"/><circle className="psm-q" cy="-78" r="9"/><circle className="psm-q" cx="78" r="9"/><circle className="psm-q" cy="78" r="9"/><circle className="psm-q" cx="-78" r="9"/></g></defs>
        <text className="psm-t psm-h" x="36" y="52">差の大半は、欠陥ではなく位置ずれだった</text><path className="psm-q" d="M36 76h648"/>
        <g transform="translate(360 275)"><use href="#psm-r20"/><g transform="translate(20 12)" opacity=".45"><use href="#psm-r20"/></g></g><text className="psm-t psm-b" x="360" y="440" textAnchor="middle">良品 ↔ 良品</text><text className="psm-t psm-n" x="360" y="510" textAnchor="middle">8.7</text><text className="psm-t psm-s" x="360" y="544" textAnchor="middle">平均ピクセル差</text>
        <path className="psm-q" d="M36 590h648"/>
        <g transform="translate(360 790)"><use href="#psm-r20"/><g transform="translate(20 12)" opacity=".45"><use href="#psm-r20"/></g><path className="psm-a" d="M82 82c11-15 28-15 38-5-9 7-9 17-3 27-15-5-26 2-32 12-6-11-8-23-3-34z"/></g><text className="psm-t psm-b" x="360" y="955" textAnchor="middle">良品 ↔ 不良品</text><text className="psm-t psm-n" x="360" y="1025" textAnchor="middle">13.2〜14.9</text><text className="psm-t psm-s" x="360" y="1059" textAnchor="middle">平均ピクセル差</text><text className="psm-t psm-b" x="360" y="1134" textAnchor="middle">位置ずれが重なるため、単純な画素比較では届かない</text>
      </Plate>
    </Schematic>
  )
}
