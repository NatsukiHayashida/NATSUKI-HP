# ポートフォリオサイト リニューアル計画

## 📌 プロジェクト概要

### 目的
1. **個人ブランディング & 受注/相談導線の強化**
2. **転職/コラボのポートフォリオとして耐える再現性ある成果記録**

### KPI
- 問い合わせCV（コンバージョン）
- 閲覧時間
- LCP（Largest Contentful Paint）
- INP（Interaction to Next Paint）
- 記事本数
- Search Console の表示回数

### 非機能要件（目標値）
- ✅ LCP < 2.5s（3G相当のthrottling想定）
- ✅ INP < 200ms
- ✅ CLS < 0.1
- ✅ Lighthouse: Performance/SEO/Accessibility > 90

---

## 🎨 デザイン方針

### コンセプト
- **洗練・モダン**をベースに、**ユニークさはタイポと余白・モーションで表現**
- ミニマル（白/黒 + 差し色1）
- ダーク/ライト両対応を維持

### デザインシステム
- shadcn/ui をデザイントークン化
  - 色（colors）
  - 角丸（radius）
  - 影（shadow）
  - 余白スケール（spacing）
- グリッドは可変（Masonry → シンプルな等幅カード）
- 作品サムネは next/image で最適化

---

## 🔧 機能要件

### 追加機能
- ✅ **Project詳細ページ**
  - 成果・担当範囲・使用技術
  - Before/After
  - 学びと成長
- ✅ **検索/タグ機能**（Blog/Project共通のタグファセット）
- ✅ **OGP/構造化データの強化**（schema.org対応）

### 維持機能
- ✅ **AIチャット**（/ai）→ UI改善 & プロンプト整備

### 削除/整理
- ❌ **Newt CMS**の完全撤去（設定ファイル・依存関係もクリア）

---

## 🗺️ 情報設計

### ナビゲーション構成
```
Home / Projects / Blog / About / Contact
```

### ページ構成
- **Home**: 自己紹介 + 最近のProjects/Blogの抜粋
- **Projects**: 一覧（/projects）→ 詳細（/projects/[slug]）
- **Blog**: 記事一覧 → 記事詳細（既存）
- **About**: Work & Education（ナビに追加）
- **Contact**: 問い合わせフォーム（既存）

### SEO強化
- パンくずリスト
- sitemap.xml自動生成
- robots.txt整備
- 構造化データ（Article/Person/Project）

---

## 📝 コンテンツ計画

### Blog
- **目標**: 最低10本まで拡充
- **テーマ**: 実装メモ/設計判断/学び
- **スタイル**: 短文でもOK

### Projects
- **目標**: 3〜5件の代表作を掘り下げ
- **構成**: 課題 → アプローチ → 成果 → 数値/指標

### 画像最適化
- WebP/AVIF優先
- LCP対策（Fold内メディアは慎重に配置）

---

## 🚀 実装計画（Phase別）

### Phase 0: 環境/リファクタ ✅
**目標**: クリーンな土台を構築

#### タスク
- [x] Newt CMS痕跡の撤去
  - [x] `lib/newt.ts` 削除
  - [x] `newt-client-js` 依存削除
  - [x] `.env` から `NEWT_*` 環境変数削除
- [x] デザイントークンの定義
  - [x] `tailwind.config.ts` にトークン追加
    - colors（差し色: Indigo系）
    - radius（xs〜3xl）
    - spacing（18, 88, 128追加）
    - shadow（sm〜2xl統一）
    - animations（fade, slide追加）
    - typography（fontSize, letterSpacing）
  - [x] `app/globals.css` カラーパレット更新
    - ライトモード: Indigo #6366f1
    - ダークモード: Indigo #818cf8（明度調整）
- [x] `next.config.mjs` の最適化
  - [x] 画像最適化設定（AVIF/WebP優先）
  - [x] CSP強化（OpenAI API追加）
  - [x] セキュリティヘッダー追加

**完了日**: 2025-10-06

---

### Phase 1: 情報設計 & ルーティング ✅
**目標**: Projects/Aboutページの追加とSEO基盤整備

#### タスク
- [x] `/projects` ページの新規作成
  - [x] 一覧ページ（`/projects/page.tsx`）
  - [x] 詳細ページ（`/projects/[slug]/page.tsx`）
  - [x] MDXベースのプロジェクトファイル構造（`content/projects/`）
  - [x] Project型定義（`types/project.ts`）
  - [x] プロジェクトユーティリティ（`lib/projects.ts`）
- [x] `/about` ページのナビ追加
  - [x] `lib/navigation.ts` 更新（Projects/About追加）
- [x] SEO基盤整備
  - [x] パンくずコンポーネント作成（`components/breadcrumb.tsx`）
  - [x] `app/sitemap.ts` 作成
  - [x] `app/robots.ts` 作成
  - [x] メタデータの統一化
- [x] サンプルプロジェクト作成
  - [x] 花製作所（hanaseisakusyo.mdx）
  - [x] SavvyBot（savvybot.mdx）

**完了日**: 2025-10-06

---

### Phase 2: UI/UX ⏳
**目標**: モダンで洗練されたUI、軽量化されたUX

#### タスク
- [ ] shadcn/uiコンポーネントの再設計
  - [ ] Card（Projects/Blog用）
  - [ ] Badge（タグ表示用）
  - [ ] Button（統一スタイル）
  - [ ] EmptyState
- [ ] Homeページのヒーロー軽量化
  - [ ] グリッドギャラリーの最適化
  - [ ] 直近Projects/Blogの抜粋ブロック追加
- [ ] AIチャットページ（/ai）のUI改善
  - [ ] 入出力の読みやすさ向上
  - [ ] プリセットプロンプト機能

**完了日**:

---

### Phase 3: コンテンツ ⏳
**目標**: Blog記事とProjectsの拡充

#### タスク
- [ ] Blog記事 +8本
  - [ ] 記事1: （テーマ未定）
  - [ ] 記事2: （テーマ未定）
  - [ ] 記事3: （テーマ未定）
  - [ ] 記事4: （テーマ未定）
  - [ ] 記事5: （テーマ未定）
  - [ ] 記事6: （テーマ未定）
  - [ ] 記事7: （テーマ未定）
  - [ ] 記事8: （テーマ未定）
- [ ] Projects 3〜5件の詳細化
  - [ ] Project1: 花製作所（詳細化）
  - [ ] Project2: SavvyBot（詳細化）
  - [ ] Project3: （新規）
  - [ ] Project4: （新規・任意）
  - [ ] Project5: （新規・任意）

**完了日**:

---

### Phase 4: パフォーマンス/SEO/A11y ⏳
**目標**: Lighthouse 90+達成、完全なアクセシビリティ対応

#### タスク
- [ ] 画像の一括最適化
  - [ ] WebP/AVIF変換
  - [ ] `priority` プロパティの見直し
  - [ ] 遅延読み込みの最適化
- [ ] フォント最適化
  - [ ] `next/font` でフォント読み込み
  - [ ] font-display設定
- [ ] 構造化データの実装
  - [ ] Article（Blog用）
  - [ ] Person（About用）
  - [ ] Project/CreativeWork
- [ ] アクセシビリティ点検
  - [ ] aria-* 属性の追加
  - [ ] 見出し階層の整理
  - [ ] キーボードナビゲーション確認
  - [ ] スクリーンリーダー対応

**完了日**:

---

### Phase 5: E2E/運用 ⏳
**目標**: 品質保証とKPIモニタリング体制の確立

#### タスク
- [ ] Playwright E2Eテスト
  - [ ] Home → Projects → Contact導線
  - [ ] Blog閲覧フロー
  - [ ] AIチャット動作確認
- [ ] Vercel Preview設定
  - [ ] PRごとの差分確認フロー
- [ ] KPIモニタリング
  - [ ] Google Analytics設定確認
  - [ ] Google Search Console連携
  - [ ] Core Web Vitals ダッシュボード

**完了日**:

---

## 📊 進捗記録

### 2025-10-06
- [x] プロジェクトキックオフ
- [x] リニューアル計画書作成（本ドキュメント）
- [x] Phase 0完了（環境/リファクタ）
  - Newt CMS完全撤去
  - デザイントークン定義（Indigo差し色）
  - next.config.mjs最適化
- [x] Phase 1完了（情報設計 & ルーティング）
  - Projectsページ実装（一覧・詳細）
  - ナビゲーション更新（Projects/About追加）
  - SEO基盤整備（sitemap/robots/パンくず）
  - サンプルプロジェクト2件作成
- [x] トップページ改善（ユーザーフィードバック対応）
  - 左右マージン拡大（max-w-5xlコンテナ追加）
  - 画像表示領域調整（タコ人物の顔表示修正）
  - タイピングアニメーション削除
- [x] Projectsコンテンツ方向性変更
  - 花製作所：ECcube → Next.js移行ログ形式に変更
  - SavvyBot：進化・改善ログ形式に変更
- [x] Aboutページ内容提案書作成
  - パーソナルストーリー重視型（提案A）
  - スキル・実績重視型（提案B）
  - ハイブリッド型（提案C・推奨）
- [x] Aboutページ実装完了（提案C採用）
  - ヒーロー部分（パーソナル + スキル概要）
  - ストーリー（なぜ開発をするのか）
  - 技術スタック（詳細なスキルリスト）
  - 提供価値（できること）
  - 開発哲学（アプローチ）
  - 現在の興味（最新の学び）
  - コンタクト（CTA）
- [ ] Phase 2開始予定（UI/UX改善）

---

## 📚 参考リンク

- [Next.js App Router Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Schema.org](https://schema.org/)
- [Tailwind CSS Design Tokens](https://tailwindcss.com/docs/theme)

---

## ✅ チェックリスト（最終確認用）

### デザイン
- [ ] ダーク/ライトモード対応
- [ ] デザイントークン統一
- [ ] レスポンシブ対応（モバイル/タブレット/デスクトップ）
- [ ] タイポグラフィの一貫性

### 機能
- [ ] Projects詳細ページ
- [ ] 検索/タグ機能
- [ ] OGP/構造化データ
- [ ] AIチャット改善

### パフォーマンス
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Lighthouse > 90

### SEO
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] 構造化データ
- [ ] メタデータ最適化

### アクセシビリティ
- [ ] aria-* 属性
- [ ] 見出し階層
- [ ] キーボードナビゲーション
- [ ] スクリーンリーダー対応

---

_最終更新: 2025-10-06_
