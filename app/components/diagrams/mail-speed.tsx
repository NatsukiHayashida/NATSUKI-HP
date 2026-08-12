import { Plate, Schematic } from '@/app/components/schematic'

/**
 * Fig.01（work-hub）— 遅かったのは処理ではなく、要らないものまで取っていたこと。
 *
 * 原案: claudedocs/received/h-18-mail-speed.svg（横組み）/ h-23-mail-mobile.svg（縦組み）
 * 数値: メール表示 25秒 → 0.46秒 / 個別表示 19秒 → 0.36秒 / 1通だけ取得＋10分キャッシュ
 * scripts/svg-to-diagram.py で生成。手で直すのは描画の不具合だけ。
 *
 * 直した1点（縦組み）: 2つ目の群が canvas 下端を越えて伸びており、締めの罫線と一行に
 * 重なっていた。中身は動かさず、canvas を 1280→1380 に伸ばして footer を下げた。
 */
export function MailSpeed() {
  return (
    <Schematic label="Fig.01">
      <Plate viewBox="0 0 1200 650" className="hidden lg:block">
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
      <Plate viewBox="0 0 720 1380" className="lg:hidden">
        <style>{`
          .msm-t{font-family:system-ui,"Yu Gothic",Meiryo,sans-serif;fill:currentColor}
          .msm-l{fill:none;stroke:currentColor;stroke-width:2;stroke-linejoin:round}
          .msm-q{fill:none;stroke:currentColor;stroke-width:1}
          .msm-a{fill:hsl(var(--primary))}
          .msm-h{font-size:29px;font-weight:700}
          .msm-b{font-size:23px}
          .msm-s{font-size:19px}
          .msm-n{font-size:60px;font-weight:750}
        `}</style>
        <defs><g id="msm-m23"><rect className="msm-l" width="150" height="96" rx="3"/><path className="msm-l" d="M2 4l73 54 73-54"/></g></defs>
        <text className="msm-t msm-h" x="36" y="52">要らないものまで取るのをやめた</text><path className="msm-q" d="M36 76h648"/>
        <g transform="translate(90 132)"><text className="msm-t msm-b" x="270" textAnchor="middle">変更前：一覧で全件取得</text><g transform="translate(80 56)"><use href="#msm-m23"/><use href="#msm-m23" transform="translate(45 38)"/><use href="#msm-m23" transform="translate(90 76)"/><path className="msm-l" d="M275 80h70m-12-10 12 10-12 10"/><rect className="msm-l" x="370" y="16" width="150" height="230"/><path className="msm-q" d="M394 55h102M394 94h102M394 133h102M394 172h102M394 211h102"/></g><text className="msm-t msm-n msm-a" x="270" y="390" textAnchor="middle">25秒</text></g>
        <path className="msm-q" d="M36 580h648"/>
        <g transform="translate(90 642)"><text className="msm-t msm-b" x="270" textAnchor="middle">変更後：必要な分だけ取得</text><g transform="translate(45 58)"><use href="#msm-m23"/><path className="msm-l" d="M185 48h70m-12-10 12 10-12 10"/><rect className="msm-l" x="280" y="0" width="210" height="142"/><path className="msm-q" d="M312 42h146M312 76h146M312 110h100"/><path className="msm-l" d="M385 168v54m-10-12 10 12 10-12"/><circle className="msm-l" cx="385" cy="275" r="42"/><path className="msm-l" d="M385 242v33l22 15"/></g><text className="msm-t msm-s" x="270" y="420" textAnchor="middle">一覧：必要分だけ取得＋起動時に先読み</text><text className="msm-t msm-s" x="270" y="458" textAnchor="middle">個別：1通だけ取得＋10分キャッシュ</text><text className="msm-t msm-n msm-a" x="270" y="540" textAnchor="middle">0.46秒</text><text className="msm-t msm-b" x="270" y="590" textAnchor="middle">個別表示 19秒 → 0.36秒</text></g>
        <path className="msm-q" d="M36 1290h648"/><text className="msm-t msm-b" x="360" y="1340" textAnchor="middle">処理を速くしたのではなく、処理しないものを決めた</text>
      </Plate>
    </Schematic>
  )
}
