# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Natsukiの個人ポートフォリオサイト（Next.js 14 App Router）：
- ポートフォリオページ（About、Projects、接続ノート、Contact）
- MDXファイルベースの接続ノート・プロジェクト管理
- EmailJS統合のお問合せフォーム（多層スパム対策、稼働中）
- ダーク/ライトテーマ対応（next-themes）
- Three.jsハートビートアニメーション（@react-three/fiber）
- モバイルファーストレスポンシブデザイン

## 開発コマンド

```bash
npm run dev      # 開発サーバー起動（http://localhost:3000）
npm run build    # 本番ビルド
npm start        # 本番サーバー起動
npm run lint     # リント実行
```

## 技術スタック

- **フレームワーク**: Next.js 14.2.11（App Router、Server Components）
- **React**: 18.2.0
- **言語**: TypeScript 5.x（strict mode）
- **スタイリング**: Tailwind CSS 3.4 + shadcn/ui（Radix UI）
- **3D**: @react-three/fiber 8.15.19 + three 0.160.0 + @react-three/drei 9.105.6
- **コンテンツ管理**: MDXファイルシステム（`content/connections/`, `content/projects/`）
- **フォーム**: EmailJS（スパム対策：ハニーポット、日本語必須、レート制限）
- **テーマ**: next-themes（ダーク/ライトモード、suppressHydrationWarning設定済み）
- **Markdown**: react-markdown + rehype/remark（シンタックスハイライト、KaTeX数式）

> **注意**: Next.js 14 + React 18の組み合わせは@react-three/fiber互換性のため。
> React 19へのアップグレードにはNext.js 15が必要。詳細は`claudedocs/NEXTJS14_DOWNGRADE_FIX.md`を参照。

## ディレクトリ構造

```
app/
├── components/                # ページ固有コンポーネント
│   ├── header.tsx             # ヘッダー（max-w-5xl）
│   ├── nav.tsx                # デスクトップナビゲーション
│   ├── mobile-nav.tsx         # モバイルナビゲーション（Sheet）
│   └── footer.tsx             # フッター
├── page.tsx                   # トップページ
├── about/page.tsx             # Aboutページ
├── connections/page.tsx       # 接続ノート一覧（タグ絞り込み、NetworkBanner）
├── connections/[slug]/page.tsx # 接続ノート詳細（MDX）
├── projects/page.tsx          # プロジェクト一覧
├── projects/[slug]/page.tsx   # プロジェクト詳細（MDX）
├── contact/page.tsx           # お問合せフォーム（EmailJS + スパム対策）
└── layout.tsx                 # ルートレイアウト（テーマプロバイダー）

components/
├── ui/                        # shadcn/ui再利用コンポーネント
└── scroll-to-top.tsx          # トップに戻るボタン（Client Component）

lib/
├── connections.ts             # 接続ノートMDXパース（gray-matter、reading-time）
├── projects.ts                # プロジェクトMDXパース
├── spam-protection.ts         # スパム対策ロジック
├── utils.ts                   # cn()、日付パース等
└── navigation.ts              # ナビゲーション定義

content/
├── connections/               # MDX接続ノート
└── projects/                  # MDXプロジェクト記事

types/
├── connection.ts              # ConnectionNote型定義
└── project.ts                 # Project型定義
```

## アーキテクチャパターン

### コンテンツ管理システム
- `lib/connections.ts`で接続ノートMDXをパース、静的生成
- `lib/projects.ts`でプロジェクトMDXを管理
- `generateStaticParams()`でビルド時プリレンダリング
- `dynamicParams = false`で未定義パスを404に

```typescript
// content/connections/[slug].mdx のフロントマター形式
---
title: "粘りと持続"
date: "2026-02-26"
tags: ["DRM1", "森信三", "材料特性", "修身教授録"]
connections: ["冷間鍛造 × 哲学"]
excerpt: "オプション。長文記事の場合に要約を記載"
---
```

### Server Components vs Client Components
- **デフォルト**: Server Components（`app/`配下）
- **Client Components**: `'use client'`ディレクティブが必要
  - フォーム（`contact/page.tsx`）
  - テーマ切替（`mode-toggle.tsx`）
  - Three.jsコンポーネント（`{ ssr: false }`でdynamic import必須）
  - useState等のReact Hooks使用時

### スタイリング
- **Tailwind CSS**: ユーティリティクラス優先
- **cn()関数**: `lib/utils.ts`でクラスマージ（`clsx` + `tailwind-merge`）
- **shadcn/ui**: `components/ui/`のコンポーネント使用

```typescript
import { cn } from '@/lib/utils'
<div className={cn("base-class", conditionalClass && "extra-class")} />
```

### 型安全なMDXコンテンツ取得
```typescript
// lib/connections.ts
export interface ConnectionNote {
  slug: string
  title: string
  date: string
  tags: string[]
  connections: string[]
  content: string
  excerpt?: string
  readingTime: string
}

export function getAllConnections(): ConnectionNote[]
export function getConnectionBySlug(slug: string): ConnectionNote | null
export function getConnectionSlugs(): string[]
export function getAllConnectionTags(): string[]
```

### ReactMarkdownカスタマイズ
プロジェクト詳細ページ（`app/projects/[slug]/page.tsx`）でのカスタマイズ：
- `h2`: サブタイトル自動スタイリング（「―」で分割）
- `strong`: 太字の明示的スタイリング
- `ul`/`li`: リスト記号の非表示化（`list-none`）
- `img`: Next.js Imageコンポーネント使用

### セキュリティ
- **CSP設定**: `next.config.mjs`で厳格なContent Security Policy
- **スパム対策**: `lib/spam-protection.ts`の多層防御
  - ハニーポットフィールド（ボット検出）
  - 日本語必須チェック（ローカライズ防御）
  - URL・スパムキーワード検出
  - レート制限（localStorage、1分クールダウン）
  - 入力サニタイゼーション
- **セキュリティヘッダー**: HSTS, X-Frame-Options, CSP, etc.

## 重要な制約と規約

### 日付フォーマット
- **ロケール**: `ja-JP`（日本語表示）
- **タイムゾーン**: `Asia/Tokyo`
- **フォーマット**: `year: 'numeric', month: 'short', day: 'numeric'`

### レイアウト統一
- **ヘッダー幅**: `max-w-5xl`
- **トップページコンテナ幅**: `max-w-5xl`（全セクション統一）
- **コンテンツ幅**: `max-w-4xl`（接続ノート、About、Projects詳細ページ）
- **フォーム幅**: `max-w-2xl`（Contact）
- **セクションパディング**: `py-8`（モバイル）、一部 `md:py-12`（デスクトップ）
- **ヘッダー下余白**: `pt-20`（全ページ共通）
- **モバイル左右余白**: `px-4`（必須）
- **セマンティックHTML**: `<main>`要素必須

### モバイル最適化ガイドライン
- 見出し（H1）: `text-2xl md:text-4xl`または`text-2xl md:text-5xl`
- 本文: `text-sm md:text-base`または`text-sm md:text-lg`
- メタ情報: `text-xs md:text-sm`
- パディング: `p-4 md:p-6`
- ギャップ: `gap-1.5 md:gap-2`（小）、`gap-4 md:gap-8`（大）
- リストインデント: `pl-2 md:pl-4`（左余白を節約）

### MDX記事作成規則
- **ファイル名**: `[slug].mdx`（slugとファイル名を一致）
- **接続ノート必須フロントマター**: `title`, `date`, `tags`, `connections`
- **接続ノート任意フロントマター**: `excerpt`（長文記事の場合）
- **プロジェクト必須フロントマター**: `title`, `date`, `slug`, `excerpt`
- **日付形式**: `YYYY-MM-DD`（ISO 8601）
- **配置場所**: `content/connections/`（接続ノート）、`content/projects/`（プロジェクト）
- **見出しレベル**: H2（##）以降を使用（H1は自動生成）
- **英語略語**: 日本語コンテキストでは避ける（例：TL;DR → プロジェクト概要）
- **サブタイトル記法**: 「―」でメインとサブを分離（例：`## はじめに ― 安心して使えるECへ`）
- **強調記法**: `**テキスト**`で太字強調（自動的に`<strong>`タグに変換）

**CommonMark仕様の注意点**:
- `**` の直前・直後に空白を入れない
- 強調記号の内側で改行しない
- blockquote記号 `>` の後には空白が必要
- 全角スペースやゼロ幅スペースは強調を壊す原因になる

### Git Workflow
- **ブランチ**: `main`ブランチで開発
- **コミットメッセージ**: 日本語、詳細な変更内容記載
- **コミット署名**: `Co-Authored-By: Claude <noreply@anthropic.com>`

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

## ドキュメント参照

プロジェクト固有のドキュメント（`claudedocs/`ディレクトリ）：
- `CODE_ANALYSIS_REPORT.md` - コード品質分析レポート
- `RENEWAL_PLAN.md` - サイトリニューアル計画
- `ABOUT_PAGE_PROPOSAL.md` - Aboutページ設計提案
- `CONTACT_PAGE_IMPLEMENTATION.md` - お問合せページ実装記録
- `CONTACT_SETUP_GUIDE.md` - EmailJS設定とスパム対策セットアップ
- `HANASEISAKUSYO_INTERVIEW.md` - 花製作所プロジェクトインタビュー記録
- `HANASEISAKUSYO_UPDATE_LOG.md` - 花製作所記事更新履歴
- `HERO_RENOVATION_WORKFLOW.md` - Heroセクションリニューアルワークフロー
- `NEXTJS14_DOWNGRADE_FIX.md` - Next.js 14ダウングレード修正記録
- `security/` - セキュリティ関連ドキュメント（脆弱性分析・修正プラン）
- `development-log.md` - 詳細な開発ログ（2025-10-11〜10-27の作業記録）
