# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Natsukiの個人ポートフォリオサイト（Next.js 14.2.1 App Router）：
- ポートフォリオページ（About、Projects、Blog、Contact）
- MDXファイルベースのブログ・プロジェクト管理
- EmailJS統合のお問合せフォーム（多層スパム対策）
- ダーク/ライトテーマ対応（next-themes）
- Google Analytics統合

## 開発コマンド

```bash
# 開発サーバー起動（http://localhost:3000）
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# リント実行
npm run lint
```

## アーキテクチャ

### 技術スタック
- **フレームワーク**: Next.js 14.2.1（App Router、React Server Components）
- **言語**: TypeScript（strict mode）
- **スタイリング**: Tailwind CSS + shadcn/uiコンポーネント
- **コンテンツ管理**: MDXファイルシステム（`content/blog/`, `content/projects/`）
- **フォーム**: EmailJS（スパム対策：ハニーポット、日本語必須、レート制限）
- **テーマ**: next-themes（ダーク/ライトモード）
- **Markdown**: react-markdown + rehype/remark（シンタックスハイライト、KaTeX数式）

### 重要なアーキテクチャパターン

#### 1. コンテンツ管理システム
- **ブログ**: `lib/mdx.ts`でMDXファイルをパース、静的生成
- **プロジェクト**: `lib/projects.ts`でプロジェクトMDXを管理
- **静的生成**: `generateStaticParams()`でビルド時プリレンダリング
- **動的パラメータ**: `dynamicParams = false`で未定義パスを404に

```typescript
// content/blog/[slug].mdx のフロントマター形式
---
title: "記事タイトル"
date: "2025-01-15"
slug: "post-slug"
excerpt: "記事の要約"
---
```

#### 2. セキュリティ実装
- **CSP設定**: `next.config.mjs`で厳格なContent Security Policy
- **スパム対策**: `lib/spam-protection.ts`の多層防御
  - ハニーポットフィールド（ボット検出）
  - 日本語必須チェック（ローカライズ防御）
  - URL・スパムキーワード検出
  - レート制限（localStorage、1分クールダウン）
  - 入力サニタイゼーション
- **セキュリティヘッダー**: HSTS, X-Frame-Options, CSP, etc.

#### 3. デザインシステム
- **Design Tokens**: `tailwind.config.ts`でブランドカラー（indigo）定義
- **コンテナ幅**: `max-w-4xl`（Blog、About、Projects）
- **スペーシング**: `pt-20`（ヘッダー下の統一余白）
- **セマンティックHTML**: `<main>`, `<article>`, `<section>`の適切な使用
- **アクセシビリティ**: フォーカスリング、見出し階層、ARIAラベル

#### 4. パフォーマンス最適化
- **静的生成**: ブログ・プロジェクトページは全て静的生成
- **Server Components**: デフォルトでサーバーコンポーネント使用
- **Client Components**: `'use client'`は必要な場合のみ（フォーム、テーマ切替）
- **画像最適化**: `next.config.mjs`でAVIF/WebP形式対応

### ディレクトリ構造と役割

```
app/
├── components/                # ページ固有コンポーネント
│   ├── header.tsx             # ヘッダー（max-w-5xl）
│   ├── nav.tsx                # デスクトップナビゲーション
│   ├── mobile-nav.tsx         # モバイルナビゲーション（Sheet）
│   └── footer.tsx             # フッター
├── page.tsx                   # トップページ
├── about/page.tsx             # Aboutページ（プロポーザルC実装）
├── blog/page.tsx              # ブログ一覧（ja-JP日付、h1/h2階層）
├── articles/[slug]/page.tsx   # ブログ記事詳細（MDX）
├── projects/page.tsx          # プロジェクト一覧
├── projects/[slug]/page.tsx   # プロジェクト詳細（MDX）
├── contact/page.tsx           # お問合せフォーム（EmailJS + スパム対策）
└── layout.tsx                 # ルートレイアウト（テーマプロバイダー）

components/ui/                 # shadcn/ui再利用コンポーネント
├── button.tsx
├── sheet.tsx
└── ...

lib/
├── mdx.ts                     # ブログMDXパース（gray-matter、reading-time）
├── projects.ts                # プロジェクトMDXパース
├── spam-protection.ts         # スパム対策ロジック
├── utils.ts                   # cn()、日付パース等
└── navigation.ts              # ナビゲーション定義

content/
├── blog/                      # MDXブログ記事
│   ├── hello-world.mdx
│   └── next-js-tips.mdx
└── projects/                  # MDXプロジェクト記事
    ├── hanaseisakusyo-rebuild.mdx
    └── savvybot.mdx

types/
└── project.ts                 # Project型定義

claudedocs/                    # プロジェクトドキュメント
├── CODE_ANALYSIS_REPORT.md    # コード品質分析レポート
├── RENEWAL_PLAN.md            # リニューアル計画
└── ABOUT_PAGE_PROPOSAL.md     # Aboutページ提案
```

### 必要な環境変数

```bash
# EmailJS設定（お問合せフォーム用）
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
NEXT_PUBLIC_CONTACT_EMAIL=your-email@domain.com

# Google Analytics（オプション）
NEXT_PUBLIC_GA_ID=G-...
```

## コードパターン

### React Server Components vs Client Components
- **デフォルト**: Server Components（`app/`配下）
- **Client Components**: `'use client'`ディレクティブが必要
  - フォーム（`contact/page.tsx`）
  - テーマ切替（`mode-toggle.tsx`）
  - useChat、useState等のReact Hooks使用時

### スタイリングパターン
- **Tailwind CSS**: ユーティリティクラス優先
- **cn()関数**: `lib/utils.ts`でクラスマージ（`clsx` + `tailwind-merge`）
- **shadcn/ui**: `components/ui/`のコンポーネント使用
- **Design Tokens**: `tailwind.config.ts`で定義された変数使用

```typescript
import { cn } from '@/lib/utils'

<div className={cn("base-class", conditionalClass && "extra-class")} />
```

### 型安全なMDXコンテンツ取得
```typescript
// lib/mdx.ts
export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  readingTime: string
}

export function getAllPosts(): BlogPost[]
export function getPostBySlug(slug: string): BlogPost | null
export function getAllSlugs(): string[]
```

### スパム対策の実装パターン
```typescript
// lib/spam-protection.ts
const spamCheck = calculateSpamScore({
  name: formData.name,
  email: formData.email,
  message: formData.message,
  honeypot: formData.honeypot
})

if (spamCheck.isSpam) {
  // スパム検出時の処理
}
```

## 重要な制約と規約

### 日付フォーマット統一
- **ロケール**: `ja-JP`（日本語表示）
- **タイムゾーン**: `Asia/Tokyo`
- **フォーマット**: `year: 'numeric', month: 'short', day: 'numeric'`

### レイアウト統一
- **ヘッダー幅**: `max-w-5xl`
- **コンテンツ幅**: `max-w-4xl`（Blog、About、Projects）
- **ヘッダー下余白**: `pt-20`（全ページ共通）
- **セマンティックHTML**: `<main>`要素必須

### MDX記事作成規則
- **ファイル名**: `[slug].mdx`（slugとファイル名を一致）
- **必須フロントマター**: `title`, `date`, `slug`, `excerpt`
- **日付形式**: `YYYY-MM-DD`（ISO 8601）
- **配置場所**: `content/blog/`（ブログ）、`content/projects/`（プロジェクト）

### Git Workflow
- **ブランチ**: `main`ブランチで開発
- **コミットメッセージ**: 日本語、詳細な変更内容記載
- **コミット署名**: `Co-Authored-By: Claude <noreply@anthropic.com>`

## ドキュメント参照

プロジェクト固有のドキュメント（`claudedocs/`ディレクトリ）：
- `CODE_ANALYSIS_REPORT.md` - コード品質分析レポート（総合評価85/100）
- `RENEWAL_PLAN.md` - サイトリニューアル計画（Phase 0-5）
- `ABOUT_PAGE_PROPOSAL.md` - Aboutページ設計提案
- `BLOG_POSTING_GUIDE.md` - MDXブログ記事作成ガイド
- `EMAILJS_SETUP_GUIDE.md` - EmailJS設定とスパム対策セットアップ
