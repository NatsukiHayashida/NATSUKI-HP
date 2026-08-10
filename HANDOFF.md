# HANDOFF — サイトリニューアル 2026-08

**最終更新**: 2026-08-10 / 前セッションからの引き継ぎ用。まずこのファイルだけ読めば再開できる。

---

## 現在地

2026年8月10日に**フルリニューアルを実施し、Phase 1〜5まで完了**。
ローカルでビルド・リント・表示確認まで通っているが、**まだ push していない**（9コミットが未push）。

```
05eb38c content: 実態とずれていた既存記事を是正
7ed98de design: ヒーローの製図モチーフを組立図に拡張
1022832 design: 余白過多だったトップに視覚要素を追加
e2bc4ef content: SavvyBot関連記事を全削除し、実プロジェクト3本を新規追加
095f56d docs: リニューアル2026の計画書・CLAUDE.mdを実態に合わせて更新
4888c52 renewal: ミニマル・エディトリアルデザインへ全面刷新
2fce507 upgrade: Tailwind CSS 4へ移行
d01f994 upgrade: Next.js 16 / React 19 / ESLint 9へ更新、未使用のThree.js関連コードを撤去
```

詳細な経緯は `claudedocs/RENEWAL_PLAN_2026.md` に記録済み。

---

## 何が変わったか（要約）

### 技術
Next.js 14 → **16.3**、React 18 → **19.2**、Tailwind 3.4 → **4.3**、ESLint 8 → **9**（flat config）。
未使用だった Three.js 関連（MovingLight系・NetworkAnimation 等）と依存5パッケージを撤去。
`next lint` は廃止済みで、`npm run lint` は `eslint .` を実行する。

### デザイン
**ミニマル・エディトリアル**（ユーザー選択）。白/黒基調＋**朱（バーミリオン）**アクセント1色。
罫線でセクションを区切り、カードと背景色ボックスは使わない。
番号・日付・ラベルは `font-mono`（IBM Plex Mono）＋ `tracking-[0.15em]` ＋ `uppercase`。

ヒーローに**金型の組立断面図モチーフ**（`app/components/die-section.tsx`）を置いている。
断面図（ダイ＋パンチ）／端面図／詳細図B／表題欄で構成。
**実在の設計値は使わず、寸法は記号（ø・R・C・H）のみ**。ここは今後も守ること。

### コンテンツ
Projects は5件。SavvyBot 関連7ファイルは**全削除済み**（サイト内に参照ゼロ）。

| # | slug | 内容 | metric |
|---|---|---|---|
| 01 | `gaikan-kensa-ai` | 外観検査AIの内製開発 | 過検出率 44.2% → 5.8% |
| 02 | `fusion-ai-automation` | CAD操作のAI自動化 | 手戻り率 70% → 15% |
| 03 | `work-hub-tools` | 自分用の開発基盤 | メール表示 25s → 0.46s |
| 04 | `hanaseisakusyo-rebuild` | 作らないという判断 | 再集計 9,047件 |
| 05 | `hobby` | 山と、車と、波 | なし |

接続ノートは14本（`hello-world.mdx` を削除）。

---

## 守るべき決定事項

### 1. 伏字ルール（会社業務の公開範囲）
ユーザー決定（2026-08-10）。**必ず伏せる**：

- 会社名・自社名、顧客名、取引先・ベンダー名
- 製品名・部品名・ワーク名・図番・機番
- 社内の人名（図面の承認欄含む）
- **金額全般**（予算、発注額、社内相場、原価、売上実額、返金額）
- 材質・硬度の社内標準、クリアランス等の設計ノウハウ数値
- 社内パス（共有サーバー・NAS）、IPアドレス、メールアドレス、SNSアカウント

**書いてよい**：技術手法、アーキテクチャ、評価設計、精度・性能の推移、失敗と対処、学び。
対象物は「冷間鍛造の小型金属部品」、既存システムは「市販のAI検査プラットフォーム」程度に一般化する。

### 2. 記事の書き方
成功譚ではなく、**失敗と、そこで何を変えたか**を軸にする。既存4記事はすべてこの構成。
数値は必ず記録から取る。**推測で数字を作らない**（該当プロジェクトの記録を読むこと）。

### 3. レイアウト規約
`CLAUDE.md` の「レイアウト統一」節に反映済み。ページヘッダーは
モノスペースのオーバーライン（`text-primary`）→ 大タイポH1 → リード文 の順。

---

## 保留事項（次にやること）

### 優先度：高
1. **push していない**。9コミットが手元に残っている。push すると Vercel で本番公開されるため、
   ユーザーの明示的な指示を待つこと。
2. **花製作所の記事に載せた事業指標の最終確認**。
   客単価 +26% / カゴ落ち率 65%→49% / リピート由来の売上比 約50% /
   **新規購入者ピーク比 −68%** / 購入者2,174人・リピート617人 / 注文9,047件。
   金額は全て伏せているが、**−68% は妻の事業の弱みが見える数字**。
   公開可否を本人に確認する必要がある。落とす場合は「3分の1以下に落ち込んだ」等へぼかす。

### 優先度：中
3. **OGP画像が旧デザインのまま**（`app/opengraph-image.png` / `twitter-image.png`）。
4. **`public/image/` の未使用画像が約15MB**。現在参照しているのは `c_car1.JPG` / `c_car2.jpg` のみ。
   `SavvyBot.svg`（削除済み記事のロゴ）、`Rotti.svg`（旧ロゴ）、Midjourney製イラスト群が残っている。
   ユーザーが作った画像なので、消す前に確認をとる。
5. **接続ノート14本の見直し**が未着手。新デザインの文体・粒度に合っているかは未確認。

### 優先度：低
6. Projects に `featured` フロントマターを導入し、トップ掲載作品を手動選定できるようにする。
7. `claudedocs/` 内の旧SavvyBot記述と `.serena/memories/savvybot_*.md` は履歴として残置している。
   参照する際は「記事は削除済み」である点に注意。

---

## 作業環境のメモ

### dev サーバー
`npm run dev` で http://localhost:3000 。前セッションでバックグラウンド起動したままの可能性がある。
ポートが埋まっていたら `ss -tlnp | grep :300` で確認して kill する
（古いプロセスが残っていて、変更が反映されていないように見える事故が実際に起きた）。

### スクリーンショットでの表示確認
`google-chrome --headless=new` が使える。ただし**落とし穴が2つある**：

1. **headless Chrome の最小ウィンドウ幅は 500px**。`--window-size=400,900` と指定しても
   viewport は 500px で描画され、スクショだけ400pxで切られる。
   これを「モバイルで横にはみ出している」と誤診しかけた。**400px以下の検証はできない**。
2. **CSS アニメーションが完了しない状態で撮影される**ことがある。
   `--force-prefers-reduced-motion` を付けると最終状態で撮れる。

```bash
google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --force-prefers-reduced-motion --virtual-time-budget=6000 \
  --window-size=1280,1400 --screenshot=out.png http://localhost:3000/
```

高解像度で細部を見たいときは `--force-device-scale-factor=2`（viewport は変わらず画像だけ2倍）。

### 横方向のはみ出し検査
`components/overflow-debug.tsx` という一時的なデバッグコンポーネントを作って使い、**撤去済み**。
再検査が必要なら、`document.documentElement.scrollWidth` と `clientWidth` を比較して、
`getBoundingClientRect().right > viewport` の要素を列挙する同等品を作り直せばよい。
最終確認時点では 500 / 780 / 1024 / 1280px すべてで `scrollWidth == viewport`。

### アニメーションの注意
`app/globals.css` の `.ds-draw` / `.ds-fade` は `animation-fill-mode: both` を使い、
**既定を「描画済み」の状態にしてある**。`forwards` にすると、アニメーションが走らない環境で
図が消える。ここは意図的なので戻さないこと。

---

## 参照すべきファイル

| 用途 | 場所 |
|---|---|
| リニューアルの全経緯・伏字ルール | `claudedocs/RENEWAL_PLAN_2026.md` |
| プロジェクト規約・レイアウト規約 | `CLAUDE.md` |
| 製図モチーフ | `app/components/die-section.tsx` |
| トップページ | `app/page.tsx` |
| 記事の元ネタ（実プロジェクト） | `~/work/iidzka-inspection/`, `~/work/pj-claude-fusion/`, `~/work/project-hub/`, `~/work/hana/` |
