#!/usr/bin/env python3
"""GPT / Gemini への図案依頼ページを生成する。

    python3 scripts/build-handoff.py

`claudedocs/DIAGRAM_BRIEF_2026-08-11.md` の「共通の前提」と各図（H-0x）の節を読み、
1図につき1枚のコピー用HTMLを `_handoff/` に書き出す（＋一覧ページ index.html）。

出力先の `_handoff/` は git 管理外。report-hub（~/work を走査）が自動で拾うため、
スマホから `https://node.taile73628.ts.net:8443/NATSUKI-HP/_handoff/index.html` で開ける。

ページの作りは html-report 規約に従う（レスポンシブ・1ファイル完結・外部参照ゼロ）。
依頼文の中身を直すときは、このスクリプトではなく指示書のmdを直して流し直すこと。
"""

import html
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRIEF = os.path.join(ROOT, 'claudedocs', 'DIAGRAM_BRIEF_2026-08-11.md')
OUTDIR = os.path.join(ROOT, '_handoff')

# md の装飾を、貼り付け先（ChatGPT / Gemini の入力欄）で読みやすい素のテキストへ均す
DECORATIONS = [
    (re.compile(r'\*\*(.+?)\*\*'), r'\1'),   # 太字
    (re.compile(r'^### '), '■ '),            # 小見出し
    (re.compile(r'^`|`$'), ''),              # 行頭・行末のコード記号
]


def plain(line: str) -> str:
    line = line.replace('`', '')
    for pat, rep in DECORATIONS:
        line = pat.sub(rep, line)
    return line.rstrip()


def parse_sections(md: str) -> tuple[str, list[dict]]:
    """(共通の前提, [{'id','title','body'}, ...]) を返す"""
    common, figures = '', []
    # "## " 見出しで章に割る
    chunks = re.split(r'^## ', md, flags=re.M)[1:]
    for chunk in chunks:
        head, _, body = chunk.partition('\n')
        # 区切り線の行だけ落とす。表の罫線（|---|---|）は残す
        # （`replace('---', '')` で一括に潰すと表が崩れる。2026-08-11 修正）
        body = '\n'.join(plain(l) for l in body.split('\n') if l.strip() != '---').strip()
        if head.startswith('共通の前提'):
            common = body
            continue
        m = re.match(r'(H-\d+R?)\.\s*(.+)', head)
        if m:
            figures.append({'id': m.group(1), 'title': m.group(2).strip(), 'body': body})
    return common, figures


PAGE = """<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title_esc}</title>
<style>
{css}
</style>
</head>
<body>
<div class="wrap">
<p class="back"><a href="index.html">&larr; 依頼一覧へ</a></p>
<h1>{heading}</h1>

<div class="steps">
<ol>
<li>下の「全文コピー」を押す</li>
<li>ChatGPT または Gemini に貼り付けて送る</li>
<li>返答<span class="pg">（構図の説明＋SVG＋凡例）</span>をファイルに保存する
<br><code>C:\\Users\\林田夏樹\\Downloads\\gpt</code>
<br>CCが自動で拾って実装に入る</li>
</ol>
</div>

<button class="copy" id="btn" onclick="copyAll()">全文コピー</button>

<pre id="brief">{brief_esc}</pre>

<textarea id="ta" readonly></textarea>

<script>
{js}
</script>
</div>
</body>
</html>
"""

INDEX = """<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GPT図案依頼 一覧</title>
<style>
{css}
ul.list {{ list-style: none; padding: 0; margin: 1.2rem 0 0; }}
ul.list li {{ border-bottom: 1px solid #e2e2e0; }}
ul.list a {{
  display: block; padding: 1rem .2rem; min-height: 48px;
  color: #1a1a1a; text-decoration: none;
}}
ul.list .id {{ font-weight: 700; color: #d43d2a; margin-right: .5rem; }}
ul.list .art {{ display: block; font-size: .8rem; color: #666; margin-top: .2rem; }}
</style>
</head>
<body>
<div class="wrap">
<h1>GPT図案依頼 一覧</h1>
<p>依頼したい図を開き、「全文コピー」でChatGPT / Geminiへ。
返答は <code>Downloads\\gpt</code> に保存すればCCが自動で拾う。</p>
<ul class="list">
{items}
</ul>
<p class="note">着手順は上から。まとめて依頼してよい。
<br>横組み<span class="pg">（PC）</span>と縦組み<span class="pg">（スマホ）</span>の
2本もらえると、そのままサイトに入る。</p>
</div>
</body>
</html>
"""

CSS = """html, body { overflow-x: hidden; }
body {
  font-family: system-ui, -apple-system, "Hiragino Kaku Gothic ProN",
               "Yu Gothic", Meiryo, sans-serif;
  font-size: 1rem; line-height: 1.7; margin: 0;
  background: #fcfcfc; color: #1a1a1a;
}
.wrap { max-width: 900px; margin: 0 auto; padding: 1.5rem; }
.pg { display: inline-block; max-width: 100%; }
a, code { overflow-wrap: anywhere; }
img, svg { max-width: 100%; height: auto; }
h1 { font-size: 1.25rem; border-left: 4px solid #d43d2a; padding-left: .6rem; }
.back { font-size: .85rem; margin: 0 0 .8rem; }
.back a { color: #666; }
.note { font-size: .85rem; color: #666; }
.steps { background: #f4f4f2; border-radius: 8px; padding: 1rem 1.2rem; font-size: .95rem; }
.steps ol { margin: 0; padding-left: 1.4rem; }
code { background: #ececeb; border-radius: 4px; padding: .1rem .3rem; font-size: .85em; }
button.copy {
  display: block; width: 100%; min-height: 48px; margin: 1.2rem 0;
  font-size: 1.05rem; font-weight: 700; color: #fff; background: #d43d2a;
  border: none; border-radius: 8px; cursor: pointer;
}
button.copy:active { opacity: .8; }
pre#brief {
  white-space: pre-wrap; overflow-wrap: anywhere;
  background: #fff; border: 1px solid #ddd; border-radius: 8px;
  padding: 1rem; font-size: .85rem; line-height: 1.6;
  font-family: inherit;
}
textarea#ta { display: none; width: 100%; height: 8rem; }
@media (max-width: 768px) {
  .wrap { padding: 1rem; }
  body { font-size: 0.95rem; }
}"""

# クリップボードAPIは非セキュアな文脈だと存在しないため、選択＋execCommandへ落とす
JS = """function done(msg) {
  var b = document.getElementById('btn');
  b.textContent = msg; setTimeout(function(){ b.textContent = '全文コピー'; }, 2500);
}
function copyAll() {
  var t = document.getElementById('brief').textContent;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(t).then(function(){ done('コピーしました'); },
                                         function(){ fallback(t); });
  } else { fallback(t); }
}
function fallback(t) {
  var ta = document.getElementById('ta');
  ta.value = t; ta.style.display = 'block';
  ta.focus(); ta.select(); ta.setSelectionRange(0, t.length);
  var ok = false;
  try { ok = document.execCommand('copy'); } catch (e) {}
  if (ok) { ta.style.display = 'none'; done('コピーしました'); }
  else { done('下の欄を長押しでコピーしてください'); }
}"""

# 一覧ページに出す「どの記事の図か」。載っていない番号は空欄になるだけで害はない。
# H-01〜H-23 は全部受領・組み込み済み。次に依頼するときは H-24 から振ること
ARTICLE: dict[str, str] = {}


def main() -> None:
    with open(BRIEF, encoding='utf-8') as f:
        common, figures = parse_sections(f.read())
    if not common:
        raise SystemExit('「## 共通の前提」が見つからない。指示書の見出しを確認すること')
    if not figures:
        # 依頼が全部片づくとこの状態になる。異常ではない
        raise SystemExit('出ている依頼が無い（## H-nn. の節がゼロ）。'
                         '新しく依頼するなら指示書に節を足すこと')

    os.makedirs(OUTDIR, exist_ok=True)
    for fig in figures:
        brief = f"{common}\n\n■ 今回依頼する図：{fig['id']}. {fig['title']}\n\n{fig['body']}"
        heading = f"GPT図案依頼 {fig['id']}"
        page = PAGE.format(
            title_esc=html.escape(f"{heading}（{fig['title']}）"),
            heading=html.escape(f"{heading}　{fig['title']}"),
            brief_esc=html.escape(brief),
            css=CSS, js=JS,
        )
        path = os.path.join(OUTDIR, f"gpt-brief-{fig['id'].lower().replace('-', '')}.html")
        with open(path, 'w', encoding='utf-8') as f:
            f.write(page)
        print('wrote', os.path.relpath(path, ROOT))

    items = '\n'.join(
        '<li><a href="gpt-brief-{key}.html"><span class="id">{id}</span>{title}'
        '<span class="art">{art}</span></a></li>'.format(
            key=fig['id'].lower().replace('-', ''), id=html.escape(fig['id']),
            title=html.escape(fig['title']), art=html.escape(ARTICLE.get(fig['id'], '')))
        for fig in figures
    )
    with open(os.path.join(OUTDIR, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(INDEX.format(css=CSS, items=items))
    print('wrote _handoff/index.html')


if __name__ == '__main__':
    main()
