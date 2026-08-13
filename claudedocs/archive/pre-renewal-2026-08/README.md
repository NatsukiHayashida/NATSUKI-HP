# リニューアル前のトップページ（記録）

2026-08 のミニマル・エディトリアルへの全面刷新（`4888c52`）で消えた、
**それまでのトップページの見た目**を残したもの。コードは git に残るが、
「どう見えていたか」は残らないので画像で保存する。

## 画像

| ファイル | 条件 | 実寸 |
|---|---|---|
| `old-top-pc-light.webp` | PC・ライト | 1440 × 2166 CSS px |
| `old-top-pc-dark.webp` | PC・ダーク | 1440 × 2166 CSS px |
| `old-top-sp-light.webp` | スマホ・ライト | 390 × 3648 CSS px |

ページ全体を1枚に収めた縦長画像。2倍／3倍で撮ってCSSピクセル相当まで縮小し、
WebP（品質82）にしてある（PNGのままだと1枚3MBあった）。

## どの時点か

`2fce507`（upgrade: Tailwind CSS 4へ移行）— **刷新の直前のコミット**。

刷新前の最後の公開状態は `266c7a4` だが、そこから `2fce507` までの3コミットは
依存の更新であって見た目は変わっていない。確認したのは次の2点。

- `d01f994` が消した Three.js 系（MovingLight・NetworkAnimation・NetworkBanner・
  TypingText）は、どこからも import されていない定義だけの状態だった
- 残る差分は `app/globals.css` の Tailwind 4 互換指定と、
  `app/page.tsx` の alt 文字列1箇所（`outline` → `outline-solid`、codemod の巻き込み）のみ

つまり **この画像は刷新前の見た目そのもの**として扱ってよい。

## 何が写っているか

- ヘッダーは中央寄せの横並びナビ（Home / Projects / 接続ノート / About / Contact）＋
  丸いアバターアイコン、右端にテーマ切替
- 「こんにちは、」の大見出しと4段落の自己紹介、青紫のCTAボタン2つ
- AI生成イラスト6枚のモザイクギャラリー
- Projects と接続ノートを**角丸カード＋影**で3枚ずつ並べる

刷新後は、カードと背景色ボックスをやめて罫線と番号で構造化し、
アクセントを青紫から朱に変えている（`claudedocs/RENEWAL_PLAN_2026.md`）。

## 撮り直す手順

```bash
git worktree add -d /home/natsuki163/work/_oldsite-2fce507 2fce507
cp -al node_modules /home/natsuki163/work/_oldsite-2fce507/node_modules   # 同一FSならハードリンクで一瞬
cd /home/natsuki163/work/_oldsite-2fce507 && npx next dev -p 3100
```

撮影は CDP のデバイスエミュレーション（`Emulation.setDeviceMetricsOverride`）で行う。
ヘッドレスChromeの `--window-size` だけではレイアウト幅が反映されない。
ダークは `Emulation.setEmulatedMedia` で `prefers-color-scheme: dark` を与える。
撮る前に一度最下部までスクロールして戻すこと（遅延表示のため）。

終わったら `git worktree remove --force /home/natsuki163/work/_oldsite-2fce507`。
