import { Plate, Schematic } from '@/app/components/schematic'

/**
 * Fig.01（work-hub）— 遅かったのは処理ではなく、要らないものまで取っていたこと。
 *
 * 原案: claudedocs/received/h-18-mail-speed.svg（横組みのみ。縦組みは未着手）
 * 数値: メール表示 25秒 → 0.46秒 / 個別表示は1通だけ取得＋10分キャッシュ
 * scripts/svg-to-diagram.py で生成。手で直すのは描画の不具合だけ。
 */
export function MailSpeed() {
  return (
    <Schematic label="Fig.01">
      <Plate minWidth={720} viewBox="0 0 1200 650">
        <style>{`
          .ms-t{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .ms-l{fill:none;stroke:currentColor;stroke-width:2;stroke-linejoin:round}
          .ms-thin{fill:none;stroke:currentColor;stroke-width:1}
          .ms-a{fill:hsl(var(--primary))}
          .ms-h{font-size:29px;font-weight:700}
          .ms-b{font-size:22px}
          .ms-s{font-size:18px}
          .ms-n{font-size:62px;font-weight:750}
        `}</style>
        <defs><g id="ms-mail18"><rect className="ms-l" width="120" height="78" rx="3"/><path className="ms-l" d="M2 4l58 43 58-43"/></g></defs>
        <text className="ms-t ms-h" x="54" y="58">遅かったのは処理ではなく、「要らないものまで取っていた」こと</text><path className="ms-thin" d="M54 80h1092"/>
        <g transform="translate(80 142)"><text className="ms-t ms-b" x="210" textAnchor="middle">変更前：一覧で全件取得</text><g transform="translate(40 58)"><use href="#ms-mail18"/><use href="#ms-mail18" transform="translate(32 28)"/><use href="#ms-mail18" transform="translate(64 56)"/><path className="ms-l" d="M210 50h60m-10-9 10 9-10 9"/><rect className="ms-l" x="292" y="6" width="120" height="178"/><path className="ms-thin" d="M312 38h80M312 68h80M312 98h80M312 128h80M312 158h80"/></g><text className="ms-t ms-n ms-a" x="210" y="350" textAnchor="middle">25秒</text></g>
        <path className="ms-l" d="M540 316h90m-12-10 12 10-12 10"/>
        <g transform="translate(670 142)"><text className="ms-t ms-b" x="210" textAnchor="middle">変更後：必要な分だけ取得</text><g transform="translate(40 58)"><use href="#ms-mail18"/><path className="ms-l" d="M145 40h55m-10-9 10 9-10 9"/><rect className="ms-l" x="220" y="0" width="150" height="110"/><path className="ms-thin" d="M244 30h102M244 57h102M244 84h70"/><path className="ms-l" d="M295 130v45m-9-10 9 10 9-10"/><circle className="ms-l" cx="295" cy="214" r="32"/><path className="ms-l" d="M295 190v24l17 12"/></g><text className="ms-t ms-s" x="210" y="340" textAnchor="middle">個別表示は1通だけ取得＋10分キャッシュ</text><text className="ms-t ms-n ms-a" x="210" y="410" textAnchor="middle">0.46秒</text></g>
        <path className="ms-thin" d="M54 590h1092"/><text className="ms-t ms-b" x="600" y="630" textAnchor="middle">速い処理へ変えたのではなく、処理しないものを決めた</text>
      </Plate>
    </Schematic>
  )
}
