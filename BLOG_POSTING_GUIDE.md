# ブログ投稿ガイド

このガイドでは、MDXベースのブログシステムで新しい記事を投稿する方法を説明します。

## 📝 新しい記事の作成手順

### 1. 記事ファイルの作成
`content/blog/` フォルダに新しい `.mdx` ファイルを作成します。

```bash
content/blog/my-new-post.mdx
```

### 2. フロントマターの設定
ファイルの最初に以下の形式でメタデータを追加：

```markdown
---
title: "記事のタイトル"
date: "2025-01-16"
slug: "my-new-post"
excerpt: "記事の要約文。一覧ページで表示されます。"
---
```

### 3. 記事内容の記述
フロントマターの下に Markdown 形式で記事を書きます：

```markdown
# メインタイトル

記事の本文をここに書きます。

## セクション見出し

- リスト項目1
- リスト項目2

### サブセクション

コードブロックも使えます：

\```javascript
const greeting = () => {
  console.log("Hello World!");
}
\```
```

## 📋 フロントマター項目の説明

| 項目 | 必須 | 説明 | 例 |
|------|------|------|-----|
| `title` | ✅ | 記事タイトル | `"Next.js入門ガイド"` |
| `date` | ✅ | 投稿日（YYYY-MM-DD形式） | `"2025-01-16"` |
| `slug` | ✅ | URL用のスラッグ（英数字・ハイフン） | `"nextjs-guide"` |
| `excerpt` | ✅ | 記事の要約（一覧表示用） | `"Next.jsの基本を学ぼう"` |

## 🎨 Markdown記法のサンプル

### 見出し
```markdown
# H1見出し
## H2見出し
### H3見出し
```

### リスト
```markdown
- 箇条書き
  - ネストしたリスト
1. 番号付きリスト
2. 2番目の項目
```

### コードブロック
```markdown
\```javascript
// JavaScript コード
const example = "Hello";
\```

\```bash
# Bash コマンド
npm install
\```
```

### リンク・画像
```markdown
[リンクテキスト](https://example.com)
![画像の説明](image-url.jpg)
```

### 強調・太字
```markdown
*斜体* または _斜体_
**太字** または __太字__
```

## 📱 記事の確認・公開手順

### 1. ローカル確認
```bash
npm run dev
```
ブラウザで http://localhost:3000/blog にアクセスして確認

### 2. ビルドテスト
```bash
npm run build
```
エラーがないことを確認

### 3. Git commit & push
```bash
git add content/blog/my-new-post.mdx
git commit -m "feat: add new blog post about [記事テーマ]"
git push
```

## 💡 Tips

### ファイル名のルール
- **スラッグ = ファイル名** にする
- 英数字とハイフンのみ使用
- 例：`nextjs-guide.mdx` → slug: `"nextjs-guide"`

### 日付の管理
- 日付順で記事が自動ソートされます
- 未来の日付も設定可能（公開予約のような使い方）

### 記事の下書き
- ファイルを作成しただけで自動的に公開されます
- 下書きの場合は別フォルダ（例：`drafts/`）で管理してください

## 🔧 高度な機能

### 数式表示
```markdown
インライン数式：$E = mc^2$

ブロック数式：
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$
```

### 表組み
```markdown
| 項目 | 値 | 説明 |
|------|----|----- |
| A | 100 | 項目A |
| B | 200 | 項目B |
```

---

何か不明な点があれば、既存の記事ファイル（`content/blog/` 内）を参考にしてください！