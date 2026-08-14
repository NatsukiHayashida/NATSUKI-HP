#!/usr/bin/env python3
"""iPhoneの連続スクリーンショットを1本の長い画面につなぎ、公開用に伏字を入れる。

project-hub をスマホで開いて上から順に撮った4枚（IMG_2353〜2356）は、
隣り合う画像どうしが重なっている。重なり量を実測して1枚につなぐと、
iPhone枠の中でスクロールさせられる縦長画像になる。

    python3 scripts/build-phone-shot.py \
      --src "/mnt/c/Users/林田夏樹/Downloads/Phone Link" \
      --out public/image/project-hub

生成物（public/image/project-hub/）
  strip.webp   スクロールさせる本体（画面の中身だけ。上下のバーは含まない）
  top.webp     固定で出す上端（ステータスバー＋URLバー）
  bottom.webp  固定で出す下端（アプリのタブバー）
  meta.json    実寸と、コンポーネントが使う座標

## 画面の分解（実測・1179×2556）

    0 ─── 273    Safari のクローム（時刻・電波・URL）      → top
  273 ─── 2283   ページの中身。ここだけがスクロールする    → strip
 2283 ─── 2440   アプリのタブバー                          → bottom
 2440 ─── 2556   Safari の下バー。使わない（緑がにじむ）

IMG_2353 だけ Safari のバーが開いた状態で撮られているため、中身の始まりが
339 と下にずれる。つなぎには使うが、上端バーは 2354 の閉じた状態を採用する。

## 重なりの実測（2026-08-14）

  2353 → 2354  354px（ただし 2353 の下端150pxはタブバーの半透明がかかる）
  2354 → 2355  661px（画素差 0.00）
  2355 → 2356  656px（画素差 0.00）

下端150pxを捨ててから順に重ねる。後の画像で上書きするので、半透明が
かかった帯は必ず新しい方の綺麗な画素に置き換わる。

## 伏字（公開サイトに出すため必須）

  node.taile73628.ts.net  → node.tailnet.ts.net   自分の tailnet 名
  iidzka-inspection       → inspection-ai         社名（飯塚）由来のリポジトリ名
  207-DLE7020174          → XXX-XXXXXXXXXX        図番

座標は下の MASKS が持つ。**元の画像の文字を消して描き直している**ので、
撮り直したら座標を取り直すこと（ズレたら文字が二重になるのですぐ分かる）。
"""

import argparse
import json
import os

from PIL import Image, ImageDraw, ImageFont

W, H = 1179, 2556
CHROME_BOTTOM = 273       # Safari のクロームの下端（バーを閉じた状態）
FADED = 150               # タブバーの半透明がかかる、中身の下端の帯
# タブバーの下は Safari の下バー越しに緑がにじんでいる（実測 y2440 から色が付く）。
# Safari の下バー自体は使わないので、にじむ手前で切る。ホームインジケータは枠側で描く
BOTTOM_END = 2440

# (ファイル名, 中身の始まり, 中身の終わり, 直前の画像との重なり)
# 2353 だけ Safari のバーが開いており、中身の範囲が上下ともずれる
SHOTS = [
    ('IMG_2353.PNG', 339, 2291, None),
    ('IMG_2354.PNG', 273, 2283, 354),
    ('IMG_2355.PNG', 273, 2283, 661),
    ('IMG_2356.PNG', 273, 2283, 656),
]
TABBAR_TOP = SHOTS[1][2]  # 固定で出す下端は 2354 のものを使う

FONT_REG = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'
FONT_BOLD = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'

# 伏字。strip 内の座標（left, top, right, bottom）と、置き換える文字。
# 重なりを畳んだ後の座標なので、同じ文字列が2枚に写っていても1箇所で済む。
MASKS_STRIP = [
    # iidzka-inspection（カード見出し・白の太字）実測 bbox x92-559 y4390-4436
    dict(box=(86, 4382, 566, 4444), text='inspection-ai', font=FONT_BOLD, size=46,
         color=(255, 255, 255), bg=(20, 23, 32)),
    # 図番 207-DLE7020174 実測 bbox x605-941 y5686-5715
    dict(box=(603, 5678, 960, 5722), text='XXX-XXXXXXXXXX', font=FONT_REG, size=40,
         color=(226, 232, 240), bg=(15, 19, 25)),
]

# Safari の URL。実測 bbox x310-862 y194-225（中央寄せ）
MASKS_TOP = [
    dict(box=(280, 188, 900, 232), text='node.tailnet.ts.net:8444', font=FONT_REG, size=42,
         color=(235, 235, 240), bg=(52, 55, 57), center=True),
]


def apply_masks(img, masks):
    d = ImageDraw.Draw(img)
    for m in masks:
        l, t, r, b = m['box']
        d.rectangle(m['box'], fill=m['bg'])
        f = ImageFont.truetype(m['font'], m['size'])
        tw = d.textlength(m['text'], font=f)
        x = l + (r - l - tw) / 2 if m.get('center') else l
        d.text((x, t + (b - t - m['size']) / 2 - 2), m['text'], font=f, fill=m['color'])
    return img


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--src', required=True, help='スクリーンショットの置き場')
    p.add_argument('--out', required=True, help='出力先ディレクトリ')
    p.add_argument('--width', type=int, default=720, help='書き出す横幅')
    args = p.parse_args()

    os.makedirs(args.out, exist_ok=True)
    imgs = [Image.open(os.path.join(args.src, s[0])).convert('RGB') for s in SHOTS]
    for im in imgs:
        assert im.size == (W, H), f'想定と違う実寸: {im.size}'

    # 各画像の中身を、ページ全体の座標へ置く
    offsets, cur = [], 0
    for i, (_, top, bot, ov) in enumerate(SHOTS):
        if i:
            prev = SHOTS[i - 1]
            cur = offsets[-1] + (prev[2] - prev[1]) - ov
        offsets.append(cur)
    total = offsets[-1] + (SHOTS[-1][2] - SHOTS[-1][1])

    # 後の画像で上書きするので、半透明のかかった帯は綺麗な画素に置き換わる
    strip = Image.new('RGB', (W, total), (9, 11, 15))
    for i, (im, (_, top, bot, _)) in enumerate(zip(imgs, SHOTS)):
        bottom = bot - (FADED if i < len(SHOTS) - 1 else 0)
        strip.paste(im.crop((0, top, W, bottom)), (0, offsets[i]))
    apply_masks(strip, MASKS_STRIP)

    top_img = apply_masks(imgs[1].crop((0, 0, W, CHROME_BOTTOM)), MASKS_TOP)
    bottom_img = imgs[1].crop((0, TABBAR_TOP, W, BOTTOM_END))

    scale = args.width / W
    out = {}
    for name, im in [('strip', strip), ('top', top_img), ('bottom', bottom_img)]:
        r = im.resize((args.width, round(im.height * scale)), Image.LANCZOS)
        path = os.path.join(args.out, f'{name}.webp')
        r.save(path, 'WEBP', quality=80, method=6)
        out[name] = dict(width=r.width, height=r.height,
                         kb=round(os.path.getsize(path) / 1024))
        print(f'{path}  {r.width}×{r.height}  {out[name]["kb"]}KB')

    meta = dict(
        screen=dict(width=args.width, height=round(BOTTOM_END * scale)),
        viewport=dict(top=round(CHROME_BOTTOM * scale),
                      height=round((TABBAR_TOP - CHROME_BOTTOM) * scale)),
        images=out,
        scrollRange=out['strip']['height'] - round((TABBAR_TOP - CHROME_BOTTOM) * scale),
    )
    with open(os.path.join(args.out, 'meta.json'), 'w') as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)
    print(json.dumps(meta, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
