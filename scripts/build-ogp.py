"""OGP画像（app/opengraph-image.png / twitter-image.png）を組み直すためのスクリプト。

トップページから製図モチーフ（DieSection）のSVGをそのまま取り込むので、
モチーフを変更したらこれを流し直せばOGPも追従する。

使い方（dev サーバーを起動した状態で）:

    python3 scripts/build-ogp.py
    google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \\
      --virtual-time-budget=8000 --window-size=1200,630 \\
      --screenshot=app/opengraph-image.png "file://$PWD/scripts/ogp.html"
    cp app/opengraph-image.png app/twitter-image.png

フォントは Google Fonts から取得するため、実行時にネットワークが必要。
"""
import os
import re
import urllib.request

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ogp.html")

html = urllib.request.urlopen("http://localhost:3000/").read().decode("utf-8")

start = html.index('<svg viewBox="0 0 480 560"')
depth = 0
i = start
while True:
    m = re.compile(r"<svg\b|</svg>").search(html, i)
    if m.group(0) == "<svg":
        depth += 1
    else:
        depth -= 1
        if depth == 0:
            end = m.end()
            break
    i = m.end()

svg = html[start:end]
# React 由来の属性をそのまま流用するため、サイズ指定だけ差し替える
svg = svg.replace('viewBox="0 0 480 560"', 'viewBox="0 0 480 560" width="392" height="458"', 1)

page = """<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  /* 断面図の中で hsl(var(--primary)) を使っているため、ここでも定義しておく。
     無いと矢印・記号 A/B・詳細図の円が朱ではなく黒で焼かれる（2026-08-12 に一度これで焼いた）。
     値は app/globals.css のライト側と同じ。 */
  :root { --primary: 17 78% 46%; }
  html, body { width: 1200px; height: 630px; }
  body {
    background: #ffffff;
    color: #141414;
    font-family: 'Noto Sans JP', sans-serif;
    position: relative;
    overflow: hidden;
  }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, #e1e1e1 1px, transparent 1px),
      linear-gradient(to bottom, #e1e1e1 1px, transparent 1px);
    background-size: 42px 42px;
    -webkit-mask-image: radial-gradient(ellipse 78% 82% at 70% 48%, #000 28%, transparent 82%);
  }
  .frame { position: absolute; inset: 26px; border: 1px solid #e0e0e0; }
  .inner {
    position: relative; height: 100%;
    padding: 74px 80px;
    display: flex; align-items: center; gap: 40px;
  }
  .left { width: 610px; flex: none; }
  .over {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 17px; letter-spacing: 0.22em; text-transform: uppercase;
    color: #d14e1a;
  }
  h1 {
    margin-top: 26px;
    font-size: 84px; font-weight: 700; line-height: 1.04; letter-spacing: -0.02em;
  }
  .rule { margin: 30px 0 24px; border-top: 1px solid #141414; width: 100%; }
  .lead { font-size: 22px; line-height: 1.7; color: #3d3d3d; }
  .pillars {
    margin-top: 26px; display: flex; gap: 26px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 15px; letter-spacing: 0.1em; color: #666;
  }
  .pillars b { color: #d14e1a; font-weight: 500; margin-right: 7px; }
  .right { flex: 1; display: flex; justify-content: flex-end; color: #141414; opacity: 0.88; }
  .ds-draw, .ds-fade { animation: none !important; stroke-dashoffset: 0 !important; opacity: 1 !important; }
  .font-mono { font-family: 'IBM Plex Mono', monospace; }
</style>
<div class="grid"></div>
<div class="frame"></div>
<div class="inner">
  <div class="left">
    <div class="over">Portfolio &amp; Notes</div>
    <h1>Natsuki<br>Hayashida</h1>
    <div class="rule"></div>
    <div class="lead">冷間鍛造の金型設計を本業に、<br>AIとWebアプリケーションを開発しています。</div>
    <div class="pillars">
      <span><b>01</b>金型設計</span>
      <span><b>02</b>AI開発</span>
      <span><b>03</b>Web開発</span>
    </div>
  </div>
  <div class="right">__SVG__</div>
</div>
""".replace("__SVG__", svg)

with open(OUT, "w", encoding="utf-8") as f:
    f.write(page)

print("wrote:", OUT)
