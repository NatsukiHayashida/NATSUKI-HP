import { Plate, Schematic } from '@/app/components/schematic'

/**
 * Fig.01（花製作所）— 落ちていたのはサイトの中ではなく入口。
 * 転換率（2.2% → 44% → 2.9%）はどれも悪くない。掛け算の一番左が細っている。
 *
 * 原案: claudedocs/received/h-19-funnel-pc.svg（横組み）/ h-19-funnel-mobile.svg（縦組み）
 * **初版（h-17-funnel.svg）は「サイト内」の枠がファネル最終段に重なっていた。**
 * canvas を 1200×760 → 1280×900 に広げ、サイト内を4分割の帯として下段へ回した作り直し版。
 * こちらの暫定修正（枠を下へ落とす）は捨てて、届いた版に差し替えてある。
 *
 * 数値の出どころ: ~/work/hana/reports/2026-07-04_売上分解レポート.md
 *   閲覧86,000 → プロフ1,865 → タップ816（前期間比-28.5%）→ 注文24件/月。必要なタップ2,400/月
 *   注文9,047件 / 購入者2,174人（2回以上617 / 5回以上118）
 * 伏字: 店名・商品名・売上実額は出さない
 * scripts/svg-to-diagram.py で生成。手で直すのは描画の不具合だけ。
 *
 * 直した1点（横組み）: 先頭の「86,000」だけ text-anchor が抜けていて左寄せになり、
 * 最初の矢印に接触していた。他の4段には付いているので単純な抜け。middle を足した。
 */
export function TrafficFunnel() {
  return (
    <Schematic label="Fig.01">
      <Plate viewBox="0 0 1280 900" className="hidden lg:block">
        <style>{`
          .fn-t{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .fn-l{fill:none;stroke:currentColor;stroke-width:2}
          .fn-q{fill:none;stroke:currentColor;stroke-width:1}
          .fn-a{fill:hsl(var(--primary))}
          .fn-al{fill:none;stroke:hsl(var(--primary));stroke-width:4}
          .fn-h{font-size:30px;font-weight:700}
          .fn-b{font-size:22px}
          .fn-s{font-size:18px}
          .fn-n{font-size:42px;font-weight:750}
        `}</style>
        <text className="fn-t fn-h" x="60" y="58">直すべきは、サイトではなく「サイトへ来る前」だった</text><path className="fn-q" d="M60 80h1160"/>
        <g transform="translate(80 158)"><text className="fn-t fn-s" x="90" y="-36" textAnchor="middle">SNS閲覧</text><text className="fn-t fn-n" x="90" textAnchor="middle">86,000</text><path className="fn-l" d="M205-8h80m-10-9 10 9-10 9"/><text className="fn-t fn-s" x="245" y="-30" textAnchor="middle">2.2%</text><text className="fn-t fn-s" x="390" y="-36" textAnchor="middle">プロフィール</text><text className="fn-t fn-n" x="390" textAnchor="middle">1,865</text><path className="fn-l" d="M500-8h80m-10-9 10 9-10 9"/><text className="fn-t fn-s" x="540" y="-30" textAnchor="middle">44%</text><text className="fn-t fn-s" x="685" y="-36" textAnchor="middle">外部リンク</text><text className="fn-t fn-n fn-a" x="685" textAnchor="middle">816</text><path className="fn-l" d="M795-8h80m-10-9 10 9-10 9"/><text className="fn-t fn-s" x="835" y="-30" textAnchor="middle">約2.9%</text><text className="fn-t fn-s" x="1000" y="-36" textAnchor="middle">EC注文</text><text className="fn-t fn-n" x="1000" textAnchor="middle">24</text></g>
        <path className="fn-al" d="M80 220h800"/><text className="fn-t fn-b fn-a" x="480" y="258" textAnchor="middle">入口：外部リンクのタップが前期間比 28.5%減</text>
        <g transform="translate(80 324)"><text className="fn-t fn-b" y="0">一方、サイト内は健全だった</text><rect className="fn-l" y="32" width="1120" height="178"/><path className="fn-q" d="M280 32v178M560 32v178M840 32v178"/><text className="fn-t fn-s" x="140" y="72" textAnchor="middle">分析した注文</text><text className="fn-t fn-n" x="140" y="128" textAnchor="middle">9,047件</text><text className="fn-t fn-s" x="420" y="72" textAnchor="middle">購入者</text><text className="fn-t fn-n" x="420" y="128" textAnchor="middle">2,174人</text><text className="fn-t fn-s" x="420" y="168" textAnchor="middle">2回以上617人／5回以上118人</text><text className="fn-t fn-s" x="700" y="72" textAnchor="middle">売上に占めるリピート</text><text className="fn-t fn-n" x="700" y="128" textAnchor="middle">約半分</text><text className="fn-t fn-s" x="980" y="72" textAnchor="middle">カゴ落ち率</text><text className="fn-t fn-n" x="980" y="128" textAnchor="middle">改善</text></g>
        <g transform="translate(80 610)"><text className="fn-t fn-b">以前の水準を、同じ購入効率で出すには</text><text className="fn-t fn-s" y="70">現在</text><rect className="fn-l" x="120" y="38" width="272" height="56"/><text className="fn-t fn-n fn-a" x="256" y="82" textAnchor="middle">816</text><text className="fn-t fn-s" y="150">必要</text><rect className="fn-l" x="120" y="118" width="800" height="56"/><text className="fn-t fn-n" x="520" y="162" textAnchor="middle">2,400タップ／月</text><text className="fn-t fn-b" x="1040" y="156" textAnchor="middle">約3倍</text></g>
        <path className="fn-q" d="M60 836h1160"/><text className="fn-t fn-b" x="640" y="878" textAnchor="middle">サイトを作り直しても入口は増えない。だから、作らないと決めた。</text>
      </Plate>
      <Plate viewBox="0 0 720 1580" className="lg:hidden">
        <style>{`
          .fnm-t{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .fnm-l{fill:none;stroke:currentColor;stroke-width:2}
          .fnm-q{fill:none;stroke:currentColor;stroke-width:1}
          .fnm-a{fill:hsl(var(--primary))}
          .fnm-al{fill:none;stroke:hsl(var(--primary));stroke-width:4}
          .fnm-h{font-size:29px;font-weight:700}
          .fnm-b{font-size:23px}
          .fnm-s{font-size:19px}
          .fnm-n{font-size:48px;font-weight:750}
        `}</style>
        <text className="fnm-t fnm-h" x="36" y="52">直すべきは、サイトへ来る前だった</text><path className="fnm-q" d="M36 76h648"/>
        <g transform="translate(90 126)"><text className="fnm-t fnm-s">SNS閲覧</text><text className="fnm-t fnm-n" x="540" y="8" textAnchor="end">86,000</text><path className="fnm-l" d="M270 34v52m-9-10 9 10 9-10"/><text className="fnm-t fnm-s" x="304" y="70">2.2%</text><text className="fnm-t fnm-s" y="130">プロフィール</text><text className="fnm-t fnm-n" x="540" y="138" textAnchor="end">1,865</text><path className="fnm-l" d="M270 164v52m-9-10 9 10 9-10"/><text className="fnm-t fnm-s" x="304" y="200">44%</text><text className="fnm-t fnm-s" y="260">外部リンク</text><text className="fnm-t fnm-n fnm-a" x="540" y="268" textAnchor="end">816</text><text className="fnm-t fnm-b fnm-a" x="270" y="312" textAnchor="middle">前期間比 28.5%減</text><path className="fnm-l" d="M270 338v52m-9-10 9 10 9-10"/><text className="fnm-t fnm-s" x="304" y="374">約2.9%</text><text className="fnm-t fnm-s" y="434">EC注文</text><text className="fnm-t fnm-n" x="540" y="442" textAnchor="end">24</text></g>
        <path className="fnm-q" d="M36 622h648"/><g transform="translate(60 674)"><text className="fnm-t fnm-b">サイト内は健全だった</text><rect className="fnm-l" y="36" width="600" height="350"/><path className="fnm-q" d="M0 123h600M0 210h600M0 297h600"/><text className="fnm-t fnm-s" x="24" y="88">分析した注文</text><text className="fnm-t fnm-n" x="570" y="94" textAnchor="end">9,047件</text><text className="fnm-t fnm-s" x="24" y="175">購入者</text><text className="fnm-t fnm-n" x="570" y="181" textAnchor="end">2,174人</text><text className="fnm-t fnm-s" x="300" y="203" textAnchor="middle">2回以上617人／5回以上118人</text><text className="fnm-t fnm-s" x="24" y="262">売上のリピート</text><text className="fnm-t fnm-n" x="570" y="268" textAnchor="end">約半分</text><text className="fnm-t fnm-s" x="24" y="349">カゴ落ち率</text><text className="fnm-t fnm-n" x="570" y="355" textAnchor="end">改善</text></g>
        <g transform="translate(60 1130)"><text className="fnm-t fnm-b">以前の水準に必要なタップ</text><text className="fnm-t fnm-s" y="74">現在</text><rect className="fnm-l" x="110" y="42" width="163" height="58"/><text className="fnm-t fnm-n fnm-a" x="191" y="87" textAnchor="middle">816</text><text className="fnm-t fnm-s" y="164">必要</text><rect className="fnm-l" x="110" y="132" width="490" height="58"/><text className="fnm-t fnm-n" x="355" y="177" textAnchor="middle">2,400／月</text><text className="fnm-t fnm-b" x="300" y="240" textAnchor="middle">いまの約3倍</text></g>
        <path className="fnm-q" d="M36 1460h648"/><text className="fnm-t fnm-b" x="360" y="1506" textAnchor="middle">サイトを作り直しても入口は増えない。</text><text className="fnm-t fnm-b" x="360" y="1544" textAnchor="middle">だから、作らないと決めた。</text>
      </Plate>
    </Schematic>
  )
}
