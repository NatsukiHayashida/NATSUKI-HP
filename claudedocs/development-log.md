# 開発ログ

CLAUDE.mdから退避した開発進捗の記録です。

---

## 2025-10-27: Next.js 14.2.11ダウングレード - @react-three/fiber互換性修正

**問題概要**:
- Next.js 15.5.6とReact 18.2.0の組み合わせで、@react-three/fiberがランタイムエラーを引き起こしていました
- ブラウザコンソールエラー: `Cannot read properties of undefined (reading 'ReactCurrentBatchConfig')`
- Three.jsハートビートアニメーションが動作せず

**実装内容**:
1. **Next.js 14スタックへのダウングレード**
   - Next.js: 15.5.4 → 14.2.11
   - @react-three/fiber: 9.4.0 → 8.15.19
   - @react-three/drei: 9.105.6（新規追加）
   - React: ^18 → 18.2.0（exact version）
   - Three.js: ^0.180.0 → 0.160.0

2. **クリーン再インストール**
   - `node_modules/`, `package-lock.json`, `.next/` 削除
   - `npm install` 実行
   - React単一インスタンス確認（`npm ls react` で全てdeduped）

3. **ビルドとデプロイ成功**
   - ローカルビルド成功（24ページコンパイル）
   - Vercelデプロイ成功
   - Three.jsアニメーション正常動作確認

**技術的知見**:
- Next.js 15とReact 18の組み合わせでは@react-three/fiberが動作しない
- React 19が必要な場合はNext.js 15、React 18の場合はNext.js 14が安定
- Three.jsコンポーネントは必ず`{ ssr: false }`でdynamic import必須
- `npm ls react`でReactインスタンスのdedup確認が重要

**ドキュメント作成**:
- `claudedocs/NEXTJS14_DOWNGRADE_FIX.md` - 詳細な修正記録とトラブルシューティングガイド

**コミット情報**:
- コミットハッシュ: `8b8bee4`
- メッセージ: "fix: Next.js 14.2.11へダウングレード - @react-three/fiber互換性問題を解決"

---

## 2025-10-12: npm依存関係脆弱性分析完了

**実装内容**:
1. **脆弱性詳細分析**
   - 検出: 3件の moderate severity 脆弱性（すべてprismjs関連）
   - 影響範囲: react-syntax-highlighter → refractor → prismjs（間接依存）
   - 脆弱性ID: GHSA-x7hr-w5r2-h6wg（PrismJS DOM Clobbering）

2. **リスク評価**
   - **実際のリスク**: 低（MDX静的コンテンツのためユーザー入力を処理しない）
   - **攻撃面**: 限定的（信頼できるソースのみ）
   - **影響**: 本プロジェクトでは実質的な影響なし

3. **修正プラン策定**
   - **推奨アプローチ**: package.json に overrides を追加してprismjs@1.30.0を固定
   - **非推奨**: `npm audit fix --force`（破壊的ダウングレードが発生）
   - **作業時間**: 約15分（破壊的変更なし）

**ドキュメント作成**:
- `claudedocs/security/README.md` - セキュリティ分析サマリー
- `claudedocs/security/VULNERABILITY_FIX_PLAN.md` - 詳細な脆弱性分析と修正プラン
- `claudedocs/security/FIX_COMMANDS.md` - 実行コマンドとチェックリスト
- `claudedocs/security/package-json-fix.diff` - 具体的な修正差分
- `claudedocs/security/npm-audit-output.txt` - 元の監査結果

**技術的知見**:
- 直接依存 vs 間接依存の切り分けが重要
- overridesによる依存関係固定の有効性
- コンテキストに応じたリスク評価の重要性

---

## 2025-10-12: トップページHeroセクションリニューアル

**実装内容**:
1. **shadcn/uiコンポーネント導入**
   - Badgeで役割表示（製造業、AI開発、Web開発）
   - ButtonでCTA実装（プロジェクト、ブログへのリンク）
   - レスポンシブボタン配置（モバイル縦、デスクトップ横）

2. **デザイン改善**
   - 見出しサイズ拡大: `text-3xl md:text-5xl`
   - コンテナ幅統一: 全セクション `max-w-5xl`
   - セクション間パディング統一: `py-8`（モバイル）、`py-12`（デスクトップ）
   - インデント完全統一（Cardコンポーネント削除）

3. **レイアウト統一ルール確立**
   - トップページ全セクション: `max-w-5xl`
   - 例外: Contactフォーム `max-w-2xl`、記事本文 `max-w-4xl`
   - 左右マージン領域の完全統一

**技術的特徴**:
- Server Component維持（パフォーマンス最適化）
- シンプルなHTML構造（Cardなし）
- モバイルファーストレスポンシブ
- アクセシビリティ準拠

**修正箇所**:
- `app/page.tsx` - Heroセクション全面リニューアル
- `claudedocs/HERO_RENOVATION_WORKFLOW.md` - 実装ワークフロー作成

---

## 2025-10-12: MDX太字表示修正 & リストスタイリング改善

**実装内容**:
1. **CommonMark仕様準拠の太字表示修正**
   - MDXファイル内の `**` マーカー周辺の空白を削除
   - blockquote内の `>` の後に空白を追加
   - 200+箇所の修正をsedコマンドで一括処理
   - 手動で細かい調整を実施

2. **ReactMarkdownカスタマイズ強化**（`app/projects/[slug]/page.tsx`）
   - `strong`コンポーネント: 太字の明示的スタイリング
   - `ul`/`li`コンポーネント: リスト箇条書き記号を非表示化（`list-none`）
   - `h2`コンポーネント: サブタイトル自動スタイリング（「―」分割）
   - `img`コンポーネント: Next.js Imageコンポーネントの使用

**技術的知見**:
- CommonMark仕様では `**` の直前・直後の空白が強調を無効化する
- ReactMarkdownの`components`プロップで柔軟なMarkdownレンダリングカスタマイズが可能
- `list-none`でリストマーカーを削除し、クリーンな見た目を実現

**修正箇所**:
- `content/projects/hanaseisakusyo-rebuild.mdx` - 太字マークアップ修正
- `app/projects/[slug]/page.tsx` - ReactMarkdownコンポーネントカスタマイズ

---

## 2025-10-11（続）: トップページ日本語化 & サブタイトルスタイリング

**実装内容**:
1. **トップページの日本語ローカライズ**（`app/page.tsx`）
   - ヒーローセクションを英語から日本語に全面変更
   - 自動車保安部品・冷間鍛造の本業とAI/Web開発の副業を紹介
   - 日本語タイポグラフィ最適化: `text-base md:text-lg`、`leading-relaxed`
   - 見出しサイズ縮小: H1 `text-2xl md:text-3xl`、H2 `text-xl md:text-2xl`

2. **サブタイトル自動スタイリング機能**（`app/projects/[slug]/page.tsx`）
   - プロジェクトタイトルで「―」区切りを検出、自動分割表示
   - メインタイトル: 通常サイズ・太字
   - サブタイトル: 小さめ（`text-lg md:text-2xl`）・細字・ミュート色
   - MDX見出し（H2）でも同様の自動スタイリング実装
   - ReactMarkdownの`components`プロップで実現

3. **太字表示の明示的適用**
   - Prose container に`[&_strong]:font-bold [&_strong]:text-foreground`追加
   - MDXの`**テキスト**`が確実に太字表示されるよう保証

**技術的特徴**:
- 条件付きレンダリングでサブタイトルを自動検出・スタイリング
- Tailwindの任意バリアント（arbitrary variants）活用
- 日本語コンテンツの視認性向上

**例**:
```typescript
// タイトル: "EC-CUBEからNext.js + Supabaseへ ― AIと進める、わが家のECリニューアル記"
// 自動分割:
// メイン: "EC-CUBEからNext.js + Supabaseへ"（大きく・太字）
// サブ: "AIと進める、わが家のECリニューアル記"（小さく・細字・ミュート）
```

---

## 2025-10-11: お問合せページ実装完了 & モバイル最適化

**実装内容**:
1. **EmailJS統合完了**（`app/contact/page.tsx`）
   - サービスID、テンプレートID、公開鍵の設定完了
   - ibron1975@gmail.com宛にメール送信確認済み
   - 環境変数チェックとエラーハンドリング強化

2. **React 19対応**
   - Radix UIパッケージを最新版に更新（全コンポーネント）
   - `suppressHydrationWarning`追加（`app/layout.tsx`）
   - ハイドレーションエラー解消

3. **モバイルUX最適化**
   - プロジェクト一覧ページ（`app/projects/page.tsx`）
     - H1サイズ調整: `text-2xl md:text-4xl`
     - 全体的なフォントサイズ縮小（モバイル）
     - カード内の余白とギャップ最適化
   - プロジェクト詳細ページ（`app/projects/[slug]/page.tsx`）
     - リストインデント削減: `pl-2 md:pl-4`
     - 全セクションのレスポンシブ対応
     - `flex-shrink-0`でアイコン崩れ防止
   - コンタクトページ（`app/contact/page.tsx`）
     - 日本語注意書きボックスの幅統一（`max-w-2xl`）

4. **MDX記事修正**
   - 花製作所記事の見出し修正（H1 → H2）
   - 「TL;DR」→「プロジェクト概要」に変更

**ドキュメント作成**:
- `claudedocs/CONTACT_PAGE_IMPLEMENTATION.md` - 実装の詳細記録（371行）
- EmailJSセットアップ、スパム対策、React 19対応の全手順を記載

**技術的知見**:
- モバイルファーストレスポンシブの実装パターン確立
- React 19とRadix UIの互換性対応
- EmailJS統合のベストプラクティス

---

## 2025-10-11（以前）: 花製作所記事完成 & 脆弱性修正

**実装内容**:
- 花製作所プロジェクト記事完成（`content/projects/hanaseisakusyo-rebuild.mdx`）
- トップに戻るボタン実装（`components/scroll-to-top.tsx`）
- Next.js 15.5.4へのアップグレード & 脆弱性修正（12件中9件解決）

**花製作所記事の特徴**:
- EC-CUBE（Xserverサービス）からNext.js + Supabaseへの移行
- 会員2,658名、商品4,306点の実データ規模
- AI協働開発手法の詳述
- 段階的ロック、リアルタイム在庫同期の技術詳細
- バランスの取れた共感的トーン
