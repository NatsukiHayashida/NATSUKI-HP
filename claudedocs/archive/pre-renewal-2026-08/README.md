# リニューアル前のトップページ（記録）

2026-08 のミニマル・エディトリアルへの全面刷新（`4888c52`）で消える、
**それまでのトップページの見た目**を残したもの。コードは git に残るが、
「どう見えていたか」は残らないので画像で保存する。

## 画像

| ファイル | 条件 | 実寸 |
|---|---|---|
| `old-top-pc-light.webp` | PC・ライト | 1440 × 2172 CSS px |
| `old-top-pc-dark.webp` | PC・ダーク | 1440 × 2172 CSS px |
| `old-top-sp-light.webp` | スマホ・ライト | 390 × 3684 CSS px |

ページ全体を1枚に収めた縦長画像。2倍／3倍で撮ってCSSピクセル相当まで縮小し、
WebP（品質82）にしてある（PNGのままだと1枚3MBあった）。

## 何を撮ったか

**本番の https://www.natsuki163.com/ をそのまま撮影**（2026-08-14）。
撮影時点の本番は `266c7a4`（刷新分をまだ push していない状態）で、
つまり**訪問者が実際に見ていた最後の旧デザイン**そのもの。

### ローカル再現は使わなかった

最初は刷新直前のコミット `2fce507` を worktree で動かして撮ったが、
本番と比べると**本文の段落間隔が広く、ページ全体で6px長かった**
（`2fce507` は Tailwind 4 移行後で、移行が縦のリズムに効いていた）。
記録としては本番の実物のほうが正しいので差し替えた。

`266c7a4`〜`2fce507` の差分は依存更新のみ（消えた Three.js 系はどこからも
import されていない定義だけだった）と読めるが、**見た目は完全には一致しない**。
旧デザインをローカルで再現するときは `266c7a4` を使うこと。

## 何が写っているか

- ヘッダーは中央寄せの横並びナビ（Home / Projects / 接続ノート / About / Contact）＋
  丸いアバターアイコン、右端にテーマ切替
- 「こんにちは、」の大見出しと4段落の自己紹介、青紫のCTAボタン2つ
- AI生成イラスト6枚のモザイクギャラリー
- Projects と接続ノートを**角丸カード＋影**で3枚ずつ並べる
- 掲載していたプロジェクトは SavvyBot 3本（`e2bc4ef` で実プロジェクト3本に差し替え）

刷新後は、カードと背景色ボックスをやめて罫線と番号で構造化し、
アクセントを青紫から朱に変えている（`claudedocs/RENEWAL_PLAN_2026.md`）。

## 撮り直す手順

本番はもう新デザインなので、旧デザインを撮り直すならローカルで動かすしかない。

```bash
git worktree add -d /home/natsuki163/work/_oldsite 266c7a4
cd /home/natsuki163/work/_oldsite && npm ci   # 当時は Next 14 系。node_modules は流用できない
npx next dev -p 3100
```

撮影は CDP のデバイスエミュレーション（`Emulation.setDeviceMetricsOverride`）で行う。
ヘッドレスChromeの `--window-size` だけではレイアウト幅が反映されない。
ダークは `Emulation.setEmulatedMedia` で `prefers-color-scheme: dark` を与える。
撮る前に一度最下部までスクロールして戻すこと（遅延表示のため）。

終わったら `git worktree remove --force /home/natsuki163/work/_oldsite`。
