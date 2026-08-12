#!/usr/bin/env python3
"""受け取ったSVGを、記事に差し込む図のコンポーネント（TSX）へ変換する。

    python3 scripts/svg-to-diagram.py \
        --name MetricBlindspot --label Fig.01 --prefix mb \
        --pc claudedocs/received/h-09-contextual.svg \
        --sp claudedocs/received/h-11-mobile-metric.svg \
        --out app/components/diagrams/metric-blindspot.tsx

`--pc` だけなら1枚、`--sp` も渡すと lg 未満で縦組みに差し替わる2枚組になる。

**なぜスクリプトにしたか**
SVGの中の `<style>` は文書全体に効く。受け取る図はどれも `.t` `.l` `.h` `.b` `.s` `.n`
のような短いクラス名を、図ごとに違うサイズで持っている。1ページに複数の図が載ると
後勝ちで全部壊れるため、**クラス名とidに図ごとの前置きを付ける**必要がある。
これを手で写すと必ずどこか取りこぼすので機械にやらせる。

やること
  - `.cls` セレクタと `class=` を `PFX-cls` へ。`id` / `url(#..)` / `href="#.."` も同様
  - ハイフン付き属性を JSX のキャメルケースへ（text-anchor → textAnchor 等）
  - `<!-- -->` を `{/* */}` へ
  - `hsl(var(--primary,...))` の予備値を落とす（このサイトでは常に定義済み）
  - 外側の `<svg>` を外し、viewBox を `Plate` に渡す形にする

出力後、先頭のコメントに「何の図か・数値の出どころ」を必ず書き足すこと。
構図・配色・文言はいじらない。直すのは描画の不具合だけ。
"""

import argparse
import os
import re

# SVG属性 → JSXのプロパティ名。ここに無いハイフン属性が出たら警告して止める
CAMEL = {
    'text-anchor': 'textAnchor', 'fill-rule': 'fillRule', 'clip-rule': 'clipRule',
    'clip-path': 'clipPath', 'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin', 'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset', 'stroke-opacity': 'strokeOpacity',
    'stroke-miterlimit': 'strokeMiterlimit', 'fill-opacity': 'fillOpacity',
    'stop-color': 'stopColor', 'stop-opacity': 'stopOpacity', 'font-size': 'fontSize',
    'font-family': 'fontFamily', 'font-weight': 'fontWeight', 'letter-spacing': 'letterSpacing',
    'dominant-baseline': 'dominantBaseline', 'alignment-baseline': 'alignmentBaseline',
    'paint-order': 'paintOrder', 'vector-effect': 'vectorEffect',
    'shape-rendering': 'shapeRendering', 'color-interpolation': 'colorInterpolation',
    'marker-end': 'markerEnd', 'marker-start': 'markerStart', 'marker-mid': 'markerMid',
    'xlink:href': 'href',
}
# 触らない属性（React がそのまま受ける）
KEEP_HYPHEN = re.compile(r'^(aria-|data-)')


def split_svg(src: str) -> tuple[str, str, str]:
    """(viewBox, style中身, 本体) を返す"""
    m = re.search(r'<svg\b([^>]*)>(.*)</svg>', src, re.S)
    if not m:
        raise SystemExit('svg要素が見つからない')
    attrs, body = m.group(1), m.group(2)
    vb = re.search(r'viewBox="([^"]+)"', attrs)
    if not vb:
        raise SystemExit('viewBox が無い。Plate に渡せないので付けてもらうこと')

    style = ''
    sm = re.search(r'<style>(.*?)</style>', body, re.S)
    if sm:
        style = sm.group(1)
        body = body[:sm.start()] + body[sm.end():]
    return vb.group(1), style, body


def prefix_style(style: str, pfx: str) -> str:
    """`.cls{...}` のセレクタへ前置きを付け、1ルール1行に開く"""
    style = re.sub(r'\.([A-Za-z][\w-]*)', lambda m: f'.{pfx}-{m.group(1)}', style)
    # `filter:url(#glow)` のような **style の中からの参照** にも前置きが要る。
    # 本体側の id だけ書き換えると参照先が消え、SVGの仕様上その要素は
    # **描画されなくなる**（H-24 の光が全部消えた・2026-08-12）
    style = re.sub(r'url\(#([^)]+)\)', lambda m: f'url(#{pfx}-{m.group(1)})', style)
    style = re.sub(r'hsl\(var\((--[\w-]+),[^)]*\)\)', r'hsl(var(\1))', style)
    rules = [r.strip() for r in re.findall(r'[^}]+}', style) if r.strip()]
    return '\n'.join('          ' + r for r in rules)


def convert_body(body: str, pfx: str) -> str:
    body = re.sub(r'hsl\(var\((--[\w-]+),[^)]*\)\)', r'hsl(var(\1))', body)
    body = re.sub(r'<!--(.*?)-->', lambda m: '{/*' + m.group(1).strip() + ' */}', body, flags=re.S)

    body = re.sub(r'\bclass="([^"]*)"',
                  lambda m: 'className="' + ' '.join(f'{pfx}-{c}' for c in m.group(1).split()) + '"',
                  body)
    body = re.sub(r'\bid="([^"]+)"', lambda m: f'id="{pfx}-{m.group(1)}"', body)
    body = re.sub(r'url\(#([^)]+)\)', lambda m: f'url(#{pfx}-{m.group(1)})', body)
    body = re.sub(r'(href=")#([^"]+)"', lambda m: f'{m.group(1)}#{pfx}-{m.group(2)}"', body)
    body = re.sub(r'aria-labelledby="([^"]+)"',
                  lambda m: 'aria-labelledby="' + ' '.join(f'{pfx}-{i}' for i in m.group(1).split()) + '"',
                  body)

    def attr(m: re.Match) -> str:
        name = m.group(1)
        if KEEP_HYPHEN.match(name):
            return m.group(0)
        if name not in CAMEL:
            raise SystemExit(f'知らないハイフン属性: {name}（CAMEL に足すこと）')
        return f' {CAMEL[name]}="'
    body = re.sub(r'\s([a-z]+(?:[-:][a-z]+)+)="', attr, body)
    return body


def indent(body: str, pad: str = '        ') -> str:
    out = []
    for line in body.strip().split('\n'):
        line = line.strip()
        if line:
            out.append(pad + line)
    return '\n'.join(out)


def plate(path: str, pfx: str, cls: str | None) -> str:
    with open(path, encoding='utf-8') as f:
        vb, style, body = split_svg(f.read())
    labelled = re.search(r'aria-labelledby="([^"]+)"', open(path, encoding='utf-8').read())
    aria = ''
    if labelled:
        aria = ' aria-labelledby="' + ' '.join(f'{pfx}-{i}' for i in labelled.group(1).split()) + '"'
    cn = f' className="{cls}"' if cls else ''
    style_block = ''
    if style.strip():
        style_block = '        <style>{`\n' + prefix_style(style, pfx) + '\n        `}</style>\n'
    return (f'      <Plate viewBox="{vb}"{cn}{aria}>\n'
            + style_block
            + indent(convert_body(body, pfx)) + '\n      </Plate>')


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument('--name', required=True, help='コンポーネント名（PascalCase）')
    p.add_argument('--label', required=True, help='図番（Fig.01 など）')
    p.add_argument('--prefix', required=True, help='クラス名とidの前置き（図ごとに一意）')
    p.add_argument('--pc', required=True, help='横組みSVG')
    p.add_argument('--sp', help='縦組みSVG（あれば lg 未満で差し替える）')
    p.add_argument('--out', required=True)
    a = p.parse_args()

    if a.sp:
        # lg 未満は縦組みへ。横組みは本文幅864pxで文字14px前後になり、それ以下だと潰れる
        plates = [plate(a.pc, a.prefix, 'hidden lg:block'),
                  plate(a.sp, a.prefix + 'm', 'lg:hidden')]
    else:
        # 縦組みが無い図は、最低幅を確保して枠内スクロールへ逃がす
        plates = [plate(a.pc, a.prefix, None).replace(
            '<Plate viewBox=', '<Plate minWidth={720} viewBox=', 1)]

    src = (
        "import { Plate, Schematic } from '@/app/components/schematic'\n\n"
        '/**\n * TODO: 何の図か、数値の出どころ、原案のファイル名を書く。\n'
        ' * scripts/svg-to-diagram.py で生成。手で直すのは描画の不具合だけ。\n */\n'
        f'export function {a.name}() {{\n'
        '  return (\n'
        f'    <Schematic label="{a.label}">\n'
        + '\n'.join(plates) + '\n'
        '    </Schematic>\n'
        '  )\n'
        '}\n'
    )
    os.makedirs(os.path.dirname(a.out), exist_ok=True)
    with open(a.out, 'w', encoding='utf-8') as f:
        f.write(src)
    print('wrote', a.out)


if __name__ == '__main__':
    main()
