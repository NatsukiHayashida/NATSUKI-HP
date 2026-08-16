#!/usr/bin/env python3
"""搬送アーム動画のレポートHTMLを組む。画像はBase64で埋め込む。

**1ファイル完結**（メール添付前提）・**レスポンシブ**の2点は必須。
規約は `html-report` スキルにある。完成後は必ず、ネットワークを遮断した状態と
幅390pxの iframe で表示を確かめること（ヘッドレスChromeは最小500px幅で組むため、
--window-size だけではスマホ幅の検証にならない）。

2026-08-17 に作り直した。初版は「画面に貼りつける」時点の内容だったが、
その後 貼りつけをやめる → 時間送りにする → ダークの版を分ける、と変わったため。

**画像は S（作業ディレクトリ）に置いた実測スクリーンショットを読む。**
`r-<名前>.jpg` の形で、幅1600pxへ縮めて品質82で保存したもの。
セッションを跨ぐと消えるので、作り直すときは撮り直しから必要になる。
撮影は CDP のデバイスエミュレーションで行う（--window-size では実寸にならない）。
"""
import base64
from pathlib import Path

S = Path("/tmp/claude-1000/-home-natsuki163-work-NATSUKI-HP/9aa6c038-b1eb-42ca-a452-b31616beda3e/scratchpad")
OUT = Path.home() / "work/NATSUKI-HP/reports/2026-08-16-搬送アーム動画をスクロール送りにする.html"


def img(name: str) -> str:
    return "data:image/jpeg;base64," + base64.b64encode((S / f"r-{name}.jpg").read_bytes()).decode()


CSS = """
html, body { overflow-x: hidden; }
body {
  font-family: system-ui, -apple-system, "Hiragino Kaku Gothic ProN",
               "Yu Gothic", Meiryo, sans-serif;
  font-size: 1rem; line-height: 1.8; margin: 0;
  color: #1a1a1a; background: #fff;
}
.wrap { max-width: 900px; margin: 0 auto; padding: 1.5rem; }
.pg { display: inline-block; max-width: 100%; }
a, code { overflow-wrap: anywhere; }
img { max-width: 100%; height: auto; display: block; border: 1px solid #e2e2e2; border-radius: 4px; }
.tablewrap { overflow-x: auto; overscroll-behavior-x: contain; margin: 1rem 0; }
table { border-collapse: collapse; width: 100%; font-size: 0.95rem; }
th, td { border: 1px solid #ddd; padding: 0.5rem 0.7rem; text-align: left; vertical-align: top; }
th { background: #f5f5f5; font-weight: 600; }
td.num { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
td.nw, th.nw { white-space: nowrap; }

header { border-bottom: 3px solid #c0392b; padding-bottom: 1rem; margin-bottom: 1.5rem; }
h1 { font-size: 1.5rem; line-height: 1.5; margin: 0 0 0.5rem; }
.meta { color: #666; font-size: 0.9rem; margin: 0; }
h2 {
  font-size: 1.15rem; margin: 2.5rem 0 0.8rem; padding-left: 0.6rem;
  border-left: 4px solid #c0392b;
}
h3 { font-size: 1.02rem; margin: 1.6rem 0 0.5rem; }
p { margin: 0.7rem 0; }
ul { padding-left: 1.3rem; margin: 0.7rem 0; }
li { margin: 0.35rem 0; }
strong { font-weight: 600; }

.lead {
  background: #fbf7f6; border: 1px solid #eddad6; border-radius: 6px;
  padding: 1rem 1.2rem; margin: 1.2rem 0;
}
.lead p:first-child { margin-top: 0; }
.lead p:last-child { margin-bottom: 0; }

figure { margin: 1.4rem 0; }
figcaption { font-size: 0.85rem; color: #666; margin-top: 0.5rem; line-height: 1.6; }

.note {
  border-left: 3px solid #bbb; padding: 0.2rem 0 0.2rem 0.9rem;
  color: #444; margin: 1rem 0; font-size: 0.95rem;
}
.ok { color: #1e7a35; font-weight: 600; }
.warn { color: #b8860b; font-weight: 600; }
footer {
  margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #ddd;
  color: #777; font-size: 0.85rem;
}
@media (max-width: 768px) {
  .wrap { padding: 1rem; }
  body { font-size: 0.95rem; }
  h1 { font-size: 1.25rem; }
  h2 { font-size: 1.05rem; }
  table { font-size: 0.85rem; }
  th, td { padding: 0.4rem 0.5rem; }
}
"""

HTML = f"""<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>搬送アームの動画と主要画面の送り — 2026-08-16</title>
<style>{CSS}</style>
</head>
<body>
<div class="wrap">

<header>
  <h1>搬送アームの動画をスクロール送りにし、主要画面の送りを作り直した</h1>
  <p class="meta">NATSUKI-HP ／ CAD自動化・開発基盤の2記事 ／ 2026-08-16 ／ 本番反映済み</p>
</header>

<div class="lead">
  <p><strong>やったこと</strong>：CAD自動化の記事の動画を、<strong>スクロールした量だけ進む</strong>形に変えた。
  あわせて、開発基盤の記事にある<strong>主要画面の送り</strong>を、
  画面に貼りつく形から<strong>本文の中で時間で送る</strong>形に作り直した。</p>
  <p><strong>直したこと</strong>：ダークモードで動画の白地が浮いていた問題を解消し、
  作業中に見つけた不具合を1件直した。</p>
  <p class="meta">本レポートは 08-17 に作り直したもの。初版は「画面に貼りつける」時点の内容で、
  その後の変更が入っていなかった。</p>
</div>

<h2>1. 動画 — スクロールした量だけ進むようにした</h2>

<p>これまでは、記事の途中に6秒の動画が小さく置かれ、勝手に再生されてループしていました。</p>

<figure>
  <img src="{img('pc-light')}" alt="変更前。記事の中に動画が小さく置かれている">
  <figcaption>変更前。本文と同じ幅に収まっていて、動画は自動で再生されていた。</figcaption>
</figure>

<p>これを、<strong>スクロールした量だけ動画が進む</strong>形に変えました。
画面に貼りついたまま、指を動かした分だけ機械が動き、カメラが回り込みます。
止めれば止まり、戻せば戻ります。</p>

<figure>
  <img src="{img('light-fixed')}" alt="スクロールを0%から100%まで送ったときの6コマ">
  <figcaption>スクロールを 0% → 20% → 40% → 60% → 80% → 100% と送ったときの見え方
  <span class="pg">（左上から右へ、次に下段）</span>。
  俯瞰から始まり、全景、反対側への回り込み、ツール部への寄り、1ステーションのアップを経て、
  最後は最初の絵に戻る。<strong>1枚目と6枚目が同じ絵</strong>なので、繰り返しても継ぎ目が出ない。</figcaption>
</figure>

<h3>仕組み — 「再生」ではなく「送り」</h3>

<p>Appleの製品ページを実測したときに分かったことですが、あの手の見せ方は
動画を再生しているのではありません。<strong>スクロール位置をそのまま再生位置として書き込んでいます</strong>。
向こうのページの動画13本は、いずれも自動再生が切ってありました。</p>

<p>今回も同じにしています。<strong>再生はしていない</strong>ので、スクロールを止めれば絵も止まります。</p>

<p>ただし普通の動画ファイルでは追従しません。動画は数コマに1枚しか「完全な絵」を持たず、
残りは<span class="pg">「前の絵との差分」</span>で記録されているためです。
そこで<strong>全部のコマを完全な絵にして焼き直しました</strong>。
重くなるぶんは<strong>コマ数を減らして相殺</strong>しています——
<strong>画質を落として軽くするのは選びません</strong>。
以前それをやって「解像度が粗すぎてぼける」という指摘を受けているためです。</p>

<h3>スマホは貼りつけない</h3>

<p>スマホでも同じ貼りつけにしたところ、<strong>「余白でかすぎ」</strong>という指摘を受けました。
実測すると、画面の高さ844pxに対して動画は211pxしか埋めていません。</p>

<p>これは<strong>横長の動画を縦長の画面に貼る限り、切らなければ消せません</strong>。
画面いっぱいに埋めるには横を7割以上落とすことになり、搬送レールが両端とも切れてしまいます。
そこで<strong>スマホでは貼りつけをやめ、本文の中でそのまま流す</strong>ことにしました。</p>

<figure>
  <img src="{img('sp-final')}" alt="スマホでの表示。動画が本文の中に収まっている" style="max-width:390px;margin:0 auto;">
  <figcaption>スマホ。貼りつけをやめたので、上下に大きな空きが出ない。</figcaption>
</figure>

<div class="note">
  <strong>縦位置で撮り直してもらえれば、スマホでも貼りつけに寄せられます。</strong>次に効きそうな一手。
</div>

<h2>2. ダークモードの白地を消した</h2>

<p>全幅にしたことで、ダークモードでは<strong>黒い画面に白い板が1枚浮く</strong>状態になっていました。
明るさの実測は<strong>動画の地が230、ページの地が20</strong>です。</p>

<p>見た目の側で試せることは以前7案すべて試して外れているため、<strong>素材の側で解きました</strong>。
テーマごとに<strong>背景色の違う版を出し分けます</strong>。</p>

<div class="tablewrap">
<table>
  <tr><th>モード</th><th class="num">素材の地</th><th class="num">ページの地</th><th class="num">差</th><th>結果</th></tr>
  <tr><td>ライト</td><td class="num">255</td><td class="num">252</td><td class="num">3</td><td class="ok nw">同化</td></tr>
  <tr><td>ダーク</td><td class="num">0</td><td class="num">20</td><td class="num">20</td><td class="ok nw">ほぼ同化</td></tr>
</table>
</div>

<figure>
  <img src="{img('dark-fixed')}" alt="ダークモード。動画の地がページに同化している">
  <figcaption>直した後のダークモード。白い板は出ていない。</figcaption>
</figure>

<p><strong>透過<span class="pg">（背景を透明にした動画）</span>は使っていません。</strong>理由は2つあります。</p>

<ul>
  <li>届いた透過版は3本とも<strong>透明の情報が入っていませんでした</strong>。
      書き出しの設定で落ちたものと見られます</li>
  <li>そもそも<strong>透過つきの動画はiPhoneのブラウザが対応していません</strong>。
      正しく作れても、iPhoneでは何も見えなくなります</li>
</ul>

<p><strong>背景色の違う版を2本持つほうが確実で、どの機種でも破綻しません。</strong></p>

<h2>3. 主要画面の送りを作り直した<span class="pg">（開発基盤の記事）</span></h2>

<p>こちらは3段階で作り直しています。指摘をいただくたびに方向が変わりました。</p>

<div class="tablewrap">
<table>
  <tr><th>いただいた指摘</th><th>やったこと</th></tr>
  <tr><td>上下の余白を詰めてほしい</td><td>端末を大きくして空きを埋めた</td></tr>
  <tr><td>画面にスマホしか出ていなくてさみしい。縮めてほしかった</td>
      <td><strong>画面への貼りつけをやめ、本文の流れの中に置いた</strong></td></tr>
  <tr><td>読むより先に画面下にいく</td>
      <td><strong>送りをスクロールから切り離し、時間で送る形にした</strong></td></tr>
</table>
</div>

<h3>なぜスクロール送りでは無理だったか</h3>

<p><strong>コンパクトさと送りの遅さは、スクロール連動では両立しません。</strong>
図を本文の中に置く限り、送りに使える距離は<span class="pg">「画面の高さ − 図の高さ」</span>しかなく、
図を小さくするほど短くなります。実測で<strong>PC 81px・スマホ 56px スクロールするごとに1枚</strong>
進んでいました。距離を稼ぐには図を高くするしかなく、それは画面を図で占領することと同じです。</p>

<p>そこで<strong>距離ではなく時間で送る</strong>形にしました。</p>

<ul>
  <li>図が画面に入っている間だけ、<strong>4.5秒に1枚</strong>送る。画面の外に出たら止まる</li>
  <li>下の<strong>6つの点はボタン</strong>。押せばその枚へ飛ぶので、読みたい枚で止められる</li>
  <li>点は<strong>残り時間を線の伸び</strong>で見せる</li>
  <li>動きを減らす設定のときは自動で送らない</li>
</ul>

<figure>
  <img src="{img('tour-final-pc')}" alt="主要画面の送り。本文の中に端末と説明が並んでいる">
  <figcaption>作り直した後。上下に本文が見えたまま、6枚が入れ替わる。</figcaption>
</figure>

<h2>4. 実測して確かめたこと</h2>

<h3>スクロール位置と再生位置が対応しているか</h3>

<div class="tablewrap">
<table>
  <tr><th>スクロールの送り率</th><th>動画の再生位置</th></tr>
  <tr><td class="num">0%</td><td class="num">0.007秒</td></tr>
  <tr><td class="num">25%</td><td class="num">2.999秒</td></tr>
  <tr><td class="num">50%</td><td class="num">5.999秒</td></tr>
  <tr><td class="num">75%</td><td class="num">8.999秒</td></tr>
  <tr><td class="num">100%</td><td class="num">11.999秒</td></tr>
</table>
</div>

<p>全区間で「再生中ではない」状態を保っています
<span class="pg">（＝勝手に動いていない）</span>。ダークの版でも同じ結果。<span class="ok">合格</span></p>

<h3>横にはみ出していないか</h3>

<p>画面いっぱいに広げるとき、単純な指定<span class="pg">（100vw）</span>を使うと
<strong>スクロールバーの幅ぶんだけ横にはみ出し、縦にスクロールしたとき左右に揺れます</strong>。
この記事では過去に一度これを踏んでいます。今回は実際の表示幅を測って合わせました。</p>

<div class="tablewrap">
<table>
  <tr><th>画面幅</th><th>ページの幅</th><th>表示できる幅</th><th>判定</th></tr>
  <tr><td class="num">1920px</td><td class="num">1905</td><td class="num">1905</td><td class="ok nw">はみ出しなし</td></tr>
  <tr><td class="num">1440px</td><td class="num">1425</td><td class="num">1425</td><td class="ok nw">はみ出しなし</td></tr>
  <tr><td class="num">1024px</td><td class="num">1009</td><td class="num">1009</td><td class="ok nw">はみ出しなし</td></tr>
  <tr><td class="num">768px</td><td class="num">753</td><td class="num">753</td><td class="ok nw">はみ出しなし</td></tr>
  <tr><td class="num">390px</td><td class="num">375</td><td class="num">375</td><td class="ok nw">はみ出しなし</td></tr>
</table>
</div>

<p class="note">スクロールバーを<strong>出したまま</strong>測っています。隠して測るとこの不具合は再現しません。</p>

<h3>大きさと鮮明さの折り合い</h3>

<p>上下の空きを詰めるために画面幅いっぱいまで広げたところ、
<strong>高精細なディスプレイでは引き伸ばしになっていました</strong>。
そこで<strong>表示幅を1280pxで頭打ち</strong>にしています。</p>

<div class="tablewrap">
<table>
  <tr><th>表示幅</th><th class="num">高精細画面で必要な画素</th><th>素材1920pxでは</th></tr>
  <tr><td class="num">1728px<span class="pg">（16インチ）</span></td><td class="num">3456</td><td class="warn nw">1.80倍</td></tr>
  <tr><td class="num">1440px</td><td class="num">2880</td><td class="warn nw">1.50倍</td></tr>
  <tr><td class="num"><strong>1280px</strong><span class="pg">（採用）</span></td><td class="num">2560</td><td class="nw">1.33倍</td></tr>
  <tr><td class="num">960px</td><td class="num">1920</td><td class="ok nw">等倍</td></tr>
</table>
</div>

<p><strong>等倍にしたいなら960pxまで狭めるか、素材を4Kで撮り直してもらうしかありません。</strong>
コマ数と解像度は交換できますが、解像度と素材は交換できません。</p>

<h3>主要画面の送り</h3>

<ul>
  <li>切り替わりの間隔 <strong>4.4秒 / 4.9秒</strong></li>
  <li>画面の外へ出して6秒待っても<strong>進まない</strong></li>
  <li>5枚目の点を押すと<strong>その枚へ飛ぶ</strong></li>
</ul>

<h2>5. 作業中に見つけて直した不具合</h2>

<p>ダークモードの確認中に、画面の隅に開発用の警告バッジが出ているのに気づきました。
中を見ると<strong>サーバー側の出力とブラウザ側の描画が食い違う</strong>不具合でした。</p>

<p>テーマ<span class="pg">（明るい／暗い）</span>はサーバー側では確定していないのに、
ブラウザ側では最初から確定しています。その値をそのまま画像の指定に流していたためです。
<strong>組み上がるまで指定を渡さない</strong>形に直し、警告はゼロになりました。</p>

<h2>6. 次に同じことをするときの注意</h2>

<ul>
  <li><strong>画面を撮って確認する道具が、動画を読み込まないことがある。</strong>
      6コマとも同じ絵になり、一見「カメラが動いていない」ように見えた。
      <strong>撮影と同時に再生位置を数字で測る</strong>ようにして、初めて撮影側の問題と分かった</li>
  <li><strong>編集した直後は失敗することがある。</strong>
      開発サーバーが作り直している最中に読むと動画が入らない。
      <strong>1回の失敗で原因を決めない</strong>——3回とも、やり直したら通った</li>
  <li><strong>幅の検証はスクロールバーを出したまま行う。</strong>隠すと不具合が再現しない</li>
  <li><strong>「余白を詰める」は「中身を大きくする」とは限らない。</strong>
      今回はここを取り違えて一度作り直している。
      画面に貼りつく作りでは、空いて見えるのは余白ではなく<strong>画面の余り</strong></li>
</ul>

<h2>7. 反映状況</h2>

<div class="tablewrap">
<table>
  <tr><th>項目</th><th>状態</th></tr>
  <tr><td>型チェック・書式チェック</td><td class="ok">通過</td></tr>
  <tr><td>本番ビルド</td><td class="ok">通過<span class="pg">（記事は静的生成のまま）</span></td></tr>
  <tr><td>本番反映</td><td class="ok">済み<span class="pg">（5コミット）</span></td></tr>
  <tr><td>未反映の変更</td><td>なし</td></tr>
</table>
</div>

<h3>次に効きそうなこと</h3>

<ul>
  <li><strong>スマホ用に縦位置で撮り直す。</strong>スマホも貼りつけに寄せられる</li>
  <li><strong>4Kで撮り直す。</strong>1280px表示でも1.33倍の引き伸ばしが残っている</li>
</ul>

<p>経緯と判明したことは <code>HANDOFF.md</code> に記録しました。次に触る人はそこを読めば再開できます。</p>

<footer>
  NATSUKI-HP ／ 2026-08-16 作業・2026-08-17 レポート改訂<br>
  対象記事: CAD操作をAIに任せる<span class="pg">（fusion-ai-automation）</span>／
  開発基盤<span class="pg">（work-hub-tools）</span>
</footer>

</div>
</body>
</html>
"""

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(HTML, encoding="utf-8")
print(f"書き出し: {OUT}")
print(f"サイズ: {OUT.stat().st_size / 1024:.0f}KB")
