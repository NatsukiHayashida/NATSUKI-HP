# ポートフォリオサイト リニューアル計画 2026

_作成日: 2026-08-10_

## 方針（決定事項）

| 項目 | 決定 |
|---|---|
| 範囲 | 段階的フルリニューアル（技術 → デザイン → 構成） |
| サイトの軸 | **ポートフォリオ中心**（転職・コラボ向けに実績を前面に） |
| デザイン | **ミニマル・エディトリアル**（白/黒基調＋差し色1色、タイポと余白主導、罫線と番号で構造化） |
| 接続ノート | 継続。ただし主役はProjects |

## Phase 1: 技術スタック更新

| 対象 | 現在 | 更新後 |
|---|---|---|
| Next.js | 14.2.35 | 16.x |
| React | 18.2.0 | 19.x |
| Tailwind CSS | 3.4 | 4.x（CSS-first設定へ移行） |
| ESLint | 8（next lint） | 9（flat config、`eslint .`） |

### Three.js関連の撤去
`MovingLight*` / `NetworkAnimation` / `NetworkBanner` / `TypingText` は**全て未使用のデッドコード**であることを確認済み（2026-08-10 grep調査）。
以下を削除する：

- `app/components/MovingLightNetwork.tsx` ほかMovingLight系4ファイル
- `app/components/NetworkAnimation.tsx`
- `app/connections/_components/NetworkBanner.tsx`
- `app/components/TypingText.tsx`
- 依存: `three` / `@react-three/fiber` / `@react-three/drei` / `@types/three` / `react-type-animation`

これによりReact 19互換性問題（@react-three/fiber 8がReact 18固定）が消滅し、
バンドルも軽量化される。

### Next.js 16の主な破壊的変更への対応
- `next lint` 廃止 → codemod `next-lint-to-eslint-cli` でESLint CLI化
- Turbopackがデフォルト → webpackカスタム設定なしのため影響なし
- `params` のPromise化 → **既に対応済み**（`await params` 形式）
- Node.js 20+ 必須 → 環境はNode 22でOK

## Phase 2: デザイン刷新（ミニマル・エディトリアル）

### デザイントークン
- ベース: 白（`#fafafa`系）/ 黒（`#111`系）のニュートラル。ダークモード維持
- 差し色1色: 既存Indigoから変更を検討（エディトリアルに合う1色に絞る）
- 罫線（`border-t`）でセクションを区切る、角丸は最小限
- 数字・ラベルは等幅フォント（tabular-nums / mono）でアクセント

### ページ構成
- **Home**: 大タイポHero（名前＋肩書き）→ 番号付き代表作リスト（01/02/03…大きく）→ 接続ノート最新3件 → CTA
  - 現在のAI生成画像グリッド（タコ・カエル等）は撤去（ポートフォリオの信頼感を優先）
- **Projects一覧**: 罫線区切りのリスト形式（カードから変更）。番号＋タイトル＋カテゴリ＋年
- **Projects詳細**: 余白を広げ、メタ情報を整理。既存のOutcomes/Challenges/Learnings構造は維持
- **接続ノート**: 現行の35D BLOGテイストを罫線ベースに揃える（大改修はしない）
- **About**: ポートフォリオ向けに経歴を整理（金型設計×AI×Webの3本柱）
- **Contact**: フォーム機能は無変更、見た目のみ統一

## Phase 3: 構成・メタデータ

- ナビ順: Home / Projects / About / Notes / Contact（ポートフォリオ導線優先）
- `layout.tsx`: `lang="ja"` に修正、metadata（title/description/OGP）を日本語で刷新
- CLAUDE.md の技術スタック記述を更新

## 進捗記録

- 2026-08-10: 計画確定（ユーザー承認済み: 範囲=全部 / 軸=ポートフォリオ / デザイン=ミニマル・エディトリアル）
- 2026-08-10: **Phase 1完了** — Next.js 16.3 / React 19.2 / Tailwind 4.3 / ESLint 9へ更新。
  Three.js関連デッドコード・依存を撤去。lucide-reactのGithubアイコン廃止対応。
- 2026-08-10: **Phase 2完了** — デザイントークン刷新（朱アクセント＋ニュートラル基調）、
  IBM Plex Mono追加、全ページをエディトリアル構成に再設計。
  副産物: backup用mdxがプロジェクト一覧に公開されていたバグを修正。
- 2026-08-10: **Phase 3完了** — lang=ja化、メタデータ日本語刷新、ナビ順序変更
  （Projects/About/Notes/Contact）、CLAUDE.md更新。

- 2026-08-10: **Phase 4完了（コンテンツ刷新）** — SavvyBot関連7記事を全削除。
  代わりに実プロジェクトから3記事を新規作成（外観検査AI / CAD操作のAI自動化 / 自作の開発基盤）。
  公開方針は**伏字**（下記）。Projects計5件（新規3＋花製作所＋Hobby）。

- 2026-08-10: **Phase 5完了（コンテンツ鮮度の是正）** —
  花製作所の記事が「2025年内にNext.jsへ移行予定」のまま1年半停止していた問題を修正。
  調査の結果、移行は未着手（コードなし）・本番はEC-CUBE継続・方針は「サイト改修への深入りをしない」に変更済みだったため、
  **「作らない判断」の記事として全面書き換え**（売上分解による意思決定の記録）。日付も実態に合わせ2026-07-04へ。
  Hobby記事を新しい文体に書き直し（絵文字見出しと「Coming Soon」プレースホルダを撤去）。
  接続ノート `hello-world.mdx`（サイト内部のお知らせ）を削除し14本に。

## コンテンツの公開方針（伏字ルール）

会社業務のプロジェクトは記事化してよいが、以下は**必ず伏せる**（2026-08-10 ユーザー決定）:

- 会社名・自社名、顧客名、取引先・ベンダー名
- 製品名・部品名・ワーク名・図番・機番
- 社内の人名（承認欄の氏名を含む）
- 金額全般（予算、発注額、社内相場、原価内訳）
- 材質・硬度の社内標準、クリアランス等の設計ノウハウ数値
- 社内パス（共有サーバー、NAS、IPアドレス）、メールアドレス、ネットワーク名

**書いてよいもの**: 技術手法、アーキテクチャ、評価設計、精度・性能の推移、失敗と対処、学び。
対象物は「冷間鍛造の小型金属部品」、既存システムは「市販のAI検査プラットフォーム」程度に一般化する。

## 残タスク（次セッション以降）

- [ ] Vercelデプロイ後の実機確認（モバイル表示・ダークモード・LCP計測）
- [ ] OGP画像の刷新（旧デザインのopengraph-image.pngのまま）
- [ ] 未使用画像の棚卸し（`public/image/`のAI生成画像はトップから撤去済み。hobby.mdx等での参照を確認してから削除）
- [ ] Projects記事に`featured`フロントマターを導入し、トップの掲載作品を手動選定できるように
- [ ] `claudedocs/`内の旧SavvyBot記述（RENEWAL_PLAN.md、ABOUT_PAGE_PROPOSAL.md、HANASEISAKUSYO_UPDATE_LOG.md）と
      `.serena/memories/savvybot_*.md` は履歴として残置。参照する際は「記事は削除済み」である点に注意
- [ ] 花製作所の記事に載せた事業指標（客単価+26% / カゴ落ち65%→49% / 新規購入者ピーク比-68% /
      購入者2,174人・リピート617人）は、妻の事業の内情にあたる。金額は全て伏せているが、
      公開範囲として問題ないか本人確認をとる
- [ ] `public/image/` の未使用画像を棚卸し（SavvyBot.svg、Rotti.svg、Midjourney製イラスト群など約15MB。
      現在参照しているのは `c_car1.JPG` / `c_car2.jpg` のみ）
