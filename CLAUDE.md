# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Natsukiの個人ポートフォリオサイト（Next.js 14.2.1）：
- ポートフォリオページ（About、Work、Education、Contact）
- MDXファイルベースのブログ機能
- OpenAI GPT-4oを使用したAIチャット機能
- ダーク/ライトテーマ対応
- Google Analytics統合

## 開発コマンド

```bash
# 開発サーバー起動
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
- **フレームワーク**: Next.js 14（App Router）
- **スタイリング**: Tailwind CSS + shadcn/uiコンポーネント
- **ブログ**: `content/blog/`内のMDXファイルシステム
- **AI統合**: Vercel AI SDK + OpenAI
- **メール**: EmailJS（スパム対策機能付き）
- **テーマ**: next-themesによるダーク/ライトモード
- **Markdown**: react-markdown（シンタックスハイライト、KaTeX数式対応）

### ディレクトリ構造
- `app/` - Next.js App Routerのページとコンポーネント
  - `api/chat/` - AIチャットエンドポイント
  - `components/` - ページ固有のコンポーネント（header、footer、nav等）
  - `articles/[slug]/` - 動的ブログ記事ページ
- `components/ui/` - 再利用可能なshadcn/uiコンポーネント
- `lib/` - ユーティリティと外部サービスクライアント
  - `mdx.ts` - ブログ記事のパースとユーティリティ
  - `spam-protection.ts` - お問合せフォームのスパムフィルタリング
- `types/` - TypeScript型定義
- `content/blog/` - MDXブログ記事ファイル

### 必要な環境変数
```bash
# OpenAI APIキー（チャット機能用）
OPENAI_API_KEY=sk-proj-...

# EmailJS設定（お問合せフォーム用）
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
NEXT_PUBLIC_CONTACT_EMAIL=your-email@domain.com

# レガシーNewt CMS（使用されていないため削除可能）
NEWT_SPACE_UID=natsuki-hp
NEWT_CDN_API_TOKEN=...
```

## コードパターン

- サーバーコンポーネントを優先、クライアントコンポーネントは'use client'で明示
- UIコンポーネントはshadcn/uiパターンに従い、cn()ユーティリティでクラス結合
- ブログ記事はフロントマター付きMDX（title、date、slug、excerpt）
- 包括的スパム対策：日本語必須、ハニーポット、レート制限
- Next.jsによるブログコンテンツの静的生成
- next.config.mjsでContent Security Policy設定

## ブログシステム

### MDXブログ記事フォーマット
`content/blog/[slug].mdx`に新規記事を作成：

```markdown
---
title: "記事タイトル"
date: "2025-01-15"
slug: "post-slug"
excerpt: "記事の要約"
---

# Markdown形式のコンテンツ
```

機能：読了時間計算、シンタックスハイライト、KaTeX数式サポート

## お問合せフォーム

EmailJS統合と多層スパム対策：
- ボット検出用ハニーポットフィールド
- 日本語必須（ひらがな/カタカナ/漢字）
- URL検出とスパムキーワードフィルタリング
- レート制限（1分間のクールダウン）
- コンテンツ検証とサニタイゼーション

## ドキュメント参照

- `BLOG_POSTING_GUIDE.md` - MDXブログ記事作成手順
- `EMAILJS_SETUP_GUIDE.md` - EmailJS設定とスパム対策セットアップ