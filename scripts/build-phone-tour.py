#!/usr/bin/env python3
"""project-hub / report-hub の主要画面を、iPhone枠に入る寸法へ揃えて書き出す。

撮影は実物のサーバーから行う（再現ではない）。撮り方は下記。
書き出しは 720×1323 で、work-hub-phone.tsx の「上バーの下〜タブバーの下端」に収まる。

    # 1) project-hub は常駐しているので、そのまま :8900 を撮る
    # 2) report-hub は止まっていることが多い。読み取り専用で別ポートに上げる
    cd ~/work/report-hub && PORT=8899 HOST=127.0.0.1 python3 serve_reports.py &

    # 3) ヘッドレスChromeを CDP つきで起動し、端末サイズ 393×722・3倍で撮る
    #    （1179×2166 ＝ Safari のクロームを除いた表示領域と同じ実寸になる）
    #    report-hub の絞り込みは #q に input イベントを送ると効く（検索はJS側）

    python3 scripts/build-phone-tour.py --src <撮ったPNGの置き場> --out public/image/project-hub/tour

## 伏字（公開サイトに出すため必須）

メール画面だけは中身が会社のものなので強く伏せる。

  n.hayashida@iidzka.co.jp → 伏字（社名・個人のアドレス）
  差出人と件名の列        → ぼかし（**書き換えない**。実在するメールの件名を
                            作り変えると嘘になるため、読めなくするだけにする）

他の5画面は、撮る前に中身を確認済み。
  進捗   NATSUKI-HP（このサイト自身）を開いているので社外秘なし
  要約   同上の当日コミットのみ
  使用量 サブスク枠の割合とリセット時刻のみ
  一覧   pj-claude-fusion で絞り込み、英語スラッグのレポートだけ出している
  記事   「投影図の数え方の是正」。図番・社名なし。「林田氏」は本人
"""

import argparse
import json
import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1179, 2166          # 撮影実寸（393×722 の3倍）
FONT_REG = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'

# (入力ファイル, 出力名, マスク)
SCREENS = [
    ('s1-project.png', 'project', []),
    ('s2-mail.png', 'mail', [
        # アドレス行。実測 bbox x42-480 y510-548
        dict(kind='text', box=(38, 502, 620, 556), text='****@*****.co.jp',
             font=FONT_REG, size=40, color=(150, 156, 166), bg=(10, 12, 16)),
        # 差出人と件名の列。日付は残す（行の間隔が132pxで6行）
        dict(kind='blur', box=(66, 1046, 945, 1975), radius=9),
    ]),
    ('s3-today.png', 'today', []),
    ('s4-usage.png', 'usage', []),
    ('s5-reporthub.png', 'reporthub', []),
    ('s6-report.png', 'report', []),
]


def apply_masks(img, masks):
    d = ImageDraw.Draw(img)
    for m in masks:
        if m['kind'] == 'blur':
            box = m['box']
            region = img.crop(box).filter(ImageFilter.GaussianBlur(m['radius']))
            img.paste(region, box[:2])
            continue
        l, t, r, b = m['box']
        d.rectangle(m['box'], fill=m['bg'])
        f = ImageFont.truetype(m['font'], m['size'])
        d.text((l + 4, t + (b - t - m['size']) / 2 - 2), m['text'], font=f, fill=m['color'])
    return img


def main():
    p = argparse.ArgumentParser()
    p.add_argument('--src', required=True, help='撮ったPNGの置き場')
    p.add_argument('--out', required=True, help='出力先ディレクトリ')
    p.add_argument('--width', type=int, default=720)
    args = p.parse_args()

    os.makedirs(args.out, exist_ok=True)
    meta = {}
    for src, name, masks in SCREENS:
        im = Image.open(os.path.join(args.src, src)).convert('RGB')
        assert im.size == (W, H), f'{src}: 想定と違う実寸 {im.size}'
        apply_masks(im, masks)
        h = round(args.width * H / W)
        r = im.resize((args.width, h), Image.LANCZOS)
        path = os.path.join(args.out, f'{name}.webp')
        r.save(path, 'WEBP', quality=80, method=6)
        kb = round(os.path.getsize(path) / 1024)
        meta[name] = dict(width=r.width, height=r.height, kb=kb)
        print(f'{path}  {r.width}×{r.height}  {kb}KB')

    with open(os.path.join(args.out, 'meta.json'), 'w') as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)
    print('合計', sum(v['kb'] for v in meta.values()), 'KB')


if __name__ == '__main__':
    main()
