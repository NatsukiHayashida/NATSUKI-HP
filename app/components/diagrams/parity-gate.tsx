import { Plate, Schematic } from '@/app/components/schematic'

/**
 * Fig.02（CAD自動化）— 全ゲート合格の図面が加工できなかった。
 * 検査していたのは生成物の内部整合だけで、原本との一致は無検査だった。
 *
 * 原案: claudedocs/received/h-16-parity-gate.svg（横組みのみ。縦組みは未着手）
 * 数値の出どころ: ~/work/pj-claude-fusion/knowledge/verification-ledger.md
 *   原本 A4縦1:1・3面 / 納品 A3横2:1・1面。品番リスト・一般公差・面粗さ・面取りが欠落
 * 伏字: 品番そのもの・会社名・人名は入れない（図にも入っていないこと）
 * scripts/svg-to-diagram.py で生成。手で直すのは描画の不具合だけ。
 */
export function ParityGate() {
  return (
    <Schematic label="Fig.02">
      <Plate minWidth={720} viewBox="0 0 1200 820">
        <style>{`
          .pg-t{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .pg-l{fill:none;stroke:currentColor;stroke-width:2}
          .pg-thin{fill:none;stroke:currentColor;stroke-width:1}
          .pg-a{fill:hsl(var(--primary))}
          .pg-al{fill:none;stroke:hsl(var(--primary));stroke-width:3}
          .pg-h{font-size:29px;font-weight:700}
          .pg-b{font-size:21px}
          .pg-s{font-size:17px}
          .pg-n{font-size:34px;font-weight:750}
        `}</style>
        <text className="pg-t pg-h" x="54" y="58">全部の検査に合格した。しかし、その図面では加工できなかった。</text><path className="pg-thin" d="M54 80h1092"/>
        <g transform="translate(54 122)"><text className="pg-t pg-b" x="220" textAnchor="middle">原本</text><rect className="pg-l" x="90" y="32" width="260" height="370"/><text className="pg-t pg-n" x="220" y="92" textAnchor="middle">A4 縦</text><text className="pg-t pg-n" x="220" y="150" textAnchor="middle">尺度 1:1</text><g className="pg-l" transform="translate(140 190)"><rect width="70" height="55"/><rect x="90" width="70" height="55"/><rect x="45" y="78" width="70" height="55"/></g><text className="pg-t pg-b" x="220" y="350" textAnchor="middle">投影図 3面</text><text className="pg-t pg-s" x="220" y="385" textAnchor="middle">品番リスト・一般公差・面粗さ・面取り あり</text></g>
        <path className="pg-l" d="M480 320h80m-12-10 12 10-12 10"/>
        <g transform="translate(620 122)"><text className="pg-t pg-b" x="260" textAnchor="middle">納品したもの</text><rect className="pg-l" x="40" y="62" width="440" height="310"/><text className="pg-t pg-n" x="260" y="116" textAnchor="middle">A3 横</text><text className="pg-t pg-n" x="260" y="170" textAnchor="middle">尺度 2:1</text><rect className="pg-l" x="190" y="205" width="140" height="90"/><text className="pg-t pg-b" x="260" y="342" textAnchor="middle">投影図 1面</text><text className="pg-t pg-s pg-a" x="260" y="400" textAnchor="middle">品番リスト・一般公差・面粗さ・面取り 欠落</text></g>
        <g transform="translate(100 570)"><rect className="pg-l" width="1000" height="92"/><text className="pg-t pg-b" x="28" y="38">検査していた</text><text className="pg-t pg-s" x="28" y="68">寸法・表題欄・図枠の内部整合</text><text className="pg-t pg-n" x="870" y="58" textAnchor="middle">全ゲート合格</text></g>
        <g transform="translate(100 686)"><path className="pg-al" d="M0 0h1000"/><text className="pg-t pg-b pg-a" x="0" y="40">検査していなかった：原本との一致</text><text className="pg-t pg-s" x="0" y="72">用紙・尺度・投影図・リスト・注記の差は、パリティ照合を入れるまで無検査で通過</text></g>
        <text className="pg-t pg-b" x="600" y="798" textAnchor="middle">門は、門が見ている対象しか守らない</text>
      </Plate>
    </Schematic>
  )
}
