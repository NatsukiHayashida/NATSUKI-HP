# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Natsukiの個人ポートフォリオサイト（Next.js 16 App Router）：
- ポートフォリオページ（About、Projects、接続ノート、Contact）
- MDXファイルベースの接続ノート・プロジェクト管理
- EmailJS統合のお問合せフォーム（多層スパム対策、稼働中）
- ダーク/ライトテーマ対応（next-themes）
- モバイルファーストレスポンシブデザイン
- デザイン: ミニマル・エディトリアル（2026-08リニューアル。白/黒基調＋朱アクセント、罫線と番号で構造化。`claudedocs/RENEWAL_PLAN_2026.md`参照）

## 開発コマンド

```bash
npm run dev      # 開発サーバー起動（http://localhost:3000）
npm run build    # 本番ビルド
npm start        # 本番サーバー起動
npm run lint     # リント実行
```

## 技術スタック

- **フレームワーク**: Next.js 16.x（App Router、Server Components、Turbopack）
- **React**: 19.x
- **言語**: TypeScript 5.x（strict mode）
- **スタイリング**: Tailwind CSS 4.x（`@config`で`tailwind.config.ts`を継続利用）+ shadcn/ui（Radix UI）
- **フォント**: Noto Sans JP（本文）+ IBM Plex Mono（番号・ラベル・メタ情報）
- **コンテンツ管理**: MDXファイルシステム（`content/connections/`, `content/projects/`）
- **フォーム**: EmailJS（スパム対策：ハニーポット、日本語必須、レート制限）
- **テーマ**: next-themes（ダーク/ライトモード、suppressHydrationWarning設定済み）
- **Markdown**: react-markdown + rehype/remark（シンタックスハイライト、KaTeX数式）
- **Lint**: ESLint 9（flat config `eslint.config.mjs`、`next lint`は廃止済み）

> **注意**: Three.js関連（@react-three/fiber等）は2026-08のリニューアルで撤去済み。
> `content/projects/`内の`backup`を含むファイル名は一覧から除外される（`lib/projects.ts`）。

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
- `figure`: `data-diagram`属性を持つものを模式図に差し替え（下記）

### 記事本文への模式図の差し込み

> **現在、図はサイトに1枚もない（2026-08-11に全撤去）。** 仕組みだけ残してある。
> 撤去の経緯と、次に作るときの受け入れ基準は
> `claudedocs/DIAGRAM_REVIEW_RESPONSE_2026-08.md` を読むこと。

MDXに次のように書くと、`articleDiagrams` に登録された図が本文中に描画される。

```html
<figure data-diagram="work-hub-collect"></figure>
```

- 登録表: `app/components/article-diagrams.tsx`（キー→コンポーネント。**現在は空**）
- 共通枠: `app/components/schematic.tsx`（`Schematic` / `Callouts` / `Overlay` / `Legend` / `Readout`）
- 図の実体: 1図1ファイルで `app/components/diagrams/` に置く（**現在このディレクトリは無い**）
- 差し替え処理: `app/projects/[slug]/page.tsx` の `figure` レンダラ。
  未登録のキーは素の `<figure>` にフォールバックする

**図を作る前に通す基準（これを満たせないなら図にしない）**

**名称をすべて隠した状態で、次の4つが判別できること。** 文字を消すと意味がなくなる図は、
模式図ではなくフローチャート。形・位置・範囲・重なり・欠損で結論を伝える。

1. 何と何を比較しているか
2. どこが問題か
3. 何が変化したか
4. 結論はどこか

**図の作り方（守ること）**
- **一つの図で伝える結論は一つだけ**。図の直前の見出しで結論を言い切り、直後は一文で止める
- **矢印と文字を並べただけの図は作らない**。形のあるものを描く（スマホ・封筒・
  フォルダ・サーバーなど）。線画・単色で、`currentColor` と `hsl(var(--background))` を使う
- **SVGの中に文字を入れない**。viewBoxの縮尺で潰れるため。
  ただし**番号だけ打って名称を凡例へ回すのは禁止**（図と凡例を往復させることになり、
  「図を読むのに一手間かかる」状態になる）。**名前はHTMLでSVGの上に重ねる**
  （`Callouts` / `Overlay`。位置は％指定、`bg-background` で線を切る）。
  `Legend` は補足の説明に徹し、**図が語れないことだけ**を書く
- **数値が結論なら `Readout` で図の直近に大きく出す**。凡例の中に埋めない
- 朱（`text-primary`）は**1図につき1つの意味**に固定する。複数の意味に使わない
- カード・背景色は使わず、罫線と細線で構成する
- 塗り（`fill` + `opacity`）はダークテーマで想定より強く出る。範囲を示すときは塗りより線
- 断面のハッチングなど、トップページの製図モチーフ（`die-section.tsx`）の作法に合わせる
- **モバイル専用の縦組みを必ず別に作る**（`sm:` で出し分け）。横組みを縮めない
- **図に書く内容は本文で述べた範囲に限る**。伏字ルール（社名・製品名・社内パス・
  金額など）は図の中でも同じく適用する

**表示確認の作法**：実寸確認はCDPのデバイスエミュレーション
（`Emulation.setDeviceMetricsOverride`）で行う。ヘッドレスChromeの `--window-size` だけでは
レイアウト幅が反映されず、偽の横はみ出しが出る（一度これで誤診している）。

### OGP画像の作り直し
`app/opengraph-image.png` / `app/twitter-image.png` は `scripts/build-ogp.py` で生成する。
トップページから製図モチーフのSVGを取り込むため、モチーフを変えたら流し直す。
手順はスクリプト冒頭のdocstringに記載（devサーバー起動＋ネットワークが必要）。

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

### レイアウト統一（2026-08リニューアル後）
- **ヘッダー幅**: `max-w-5xl`（罫線`border-b`付き）
- **トップページ・Projects一覧コンテナ幅**: `max-w-5xl`
- **コンテンツ幅**: `max-w-4xl`（接続ノート、About、Projects詳細ページ）
- **フォーム幅**: `max-w-2xl`（Contact）
- **ページパディング**: `py-14 md:py-20`
- **セクション区切り**: `border-t`（罫線）。カード・背景色ボックスは使わない
- **番号・日付・ラベル・ナビ**: `font-mono`＋`tracking-[0.15em]`〜`[0.2em]`＋`uppercase`
- **ページヘッダー**: モノスペースのオーバーライン（`text-primary`）→ 大タイポH1 → リード文の順
- **モバイル左右余白**: `px-4`（必須）
- **セマンティックHTML**: `<main>`要素必須

### 縦の余白は3段階だけ（2026-08-11）

**まず外観検査AIの記事だけに適用した。他ページへの展開は未了。**

直す前は段落16〜20px・見出し前32〜48pxで、**どの距離もほぼ同じ**だった。そのため
「同じ論旨の段落のかたまり」と「話が変わる境目」が区別できず、一続きの話まで分断して見えていた。
狙いは余白を狭めることではなく、**同じ話は近く／違う話は遠く**を余白だけで判断できる状態にすること。

| 段階 | 用途 | Mobile | Desktop |
|---|---|---|---|
| **まとまりの中** | 連続する段落、見出しと直後の本文、図の内部 | 12〜14px | 14〜16px |
| **小ブロック** | 表・リスト・図の前後、記事冒頭の各ブロック | 22〜28px | 28〜32px |
| **セクションの境目** | H2の前 | 52px | 72px |

- 本文の値は `tailwind.config.ts` の `typography.sm` / `typography.base` が持つ。
  **段落は em、見出しは rem。** 見出しに em を使うと「見出し自身の文字サイズ」が基準になり、
  h2（24px）に `4.5em` と書くと108pxになる（一度これで外した）
- **区切り線と大きな余白を同時に強く使わない。** 罫線がある所（Technologies・図の枠・Readout）は
  罫線を主な区切りにして、余白は小さく取る
- **図は一つのまとまりとして扱う。** FIG番号 → 図タイトル → 図 → Readout → 凡例 を
  `border-y` で囲み、**内部に罫線を追加しない**（別セクションに見えるため）。
  内部の間隔は `space-y-4 md:space-y-5`
- **図の直後で本文と同じ説明を繰り返さない。** 余白だけでなく文章ごと削る
  （mask-placement では note と凡例2件を削除した）
- 見出し側に `mt` を足しても直前要素の `margin-bottom` と相殺されて効かない。
  距離は**どちらか一方**（罫線を持つ側）で決める

### タイプスケール（2026-08-11 に一段小さくした）

PC表示の本文18px・H1 48pxが大きすぎたため、`md:` の指定を**全ページ一律で一段下げた**。
狙いは project-hub と同程度（本文13〜15px）の密度。**新しく書くときもこの表に合わせること。**

| 役割 | クラス | 実寸（モバイル / PC） |
|---|---|---|
| ヒーローH1（トップのみ） | `text-4xl md:text-6xl` | 36 / 60px |
| ページH1（一覧・About） | `text-3xl md:text-4xl` | 30 / 36px |
| 記事H1 | `text-2xl md:text-4xl` | 24 / 36px |
| セクションH2 | `text-2xl md:text-xl`〜`text-xl md:text-2xl` | 20〜24px |
| 本文・リード | `text-sm md:text-[15px]` | 14 / 15px |
| **記事本文（MDX）** | `prose prose-sm md:prose-base` | 14 / 16px |
| メタ情報・ラベル | `text-xs md:text-sm` | 12 / 14px |

- **`md:text-lg` / `md:text-5xl` / `md:prose-lg` は使わない**（下げる前の名残）
- 記事本文のサイズは Tailwind Typography が持っている。`prose-*` を直すこと。
  個別の `text-*` を足して上書きしない
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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
