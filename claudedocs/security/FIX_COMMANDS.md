# 脆弱性修正コマンド実行ガイド

## 🎯 推奨アプローチ: overridesによる依存関係固定

### ステップ1: package.jsonの修正

以下のdiffを適用してください（`claudedocs/security/package-json-fix.diff`参照）:

```bash
# package.jsonの末尾に追加
# "devDependencies" の閉じ括弧の後に:
  },
  "overrides": {
    "prismjs": "1.30.0"
  }
}
```

または、以下のコマンドで自動適用:

```bash
# 現在のpackage.jsonをバックアップ
cp package.json package.json.backup

# overridesセクションを追加（手動編集も可）
# エディタでpackage.jsonを開き、上記のoverridesセクションを追加
```

### ステップ2: 依存関係の再インストール

```bash
npm install
```

### ステップ3: 脆弱性チェック

```bash
npm audit
```

**期待される結果**:
- 脆弱性が残る場合もありますが、prismjsは最新版（1.30.0）に固定されます
- 間接依存の警告は表示されますが、実際の影響は限定的です

### ステップ4: 動作確認

```bash
# 開発サーバー起動
npm run dev

# ブラウザで確認
# http://localhost:3000/blog → シンタックスハイライトが正常に動作すること
# http://localhost:3000/projects → コードブロックが正常に表示されること
```

### ステップ5: ビルドテスト

```bash
npm run build
npm start
```

**期待される結果**:
- ビルドエラーなし
- 静的生成ページが正常に生成されること
- 本番サーバーで全ページが正常に表示されること

---

## 🚨 実行してはいけないコマンド

```bash
# ❌ これは実行しないでください
npm audit fix --force
```

**理由**: react-syntax-highlighterが15.6.6 → 5.8.0にダウングレードされ、破壊的変更が発生します。

---

## 📋 検証チェックリスト

- [ ] package.jsonにoverridesセクションを追加
- [ ] `npm install`を実行
- [ ] `npm audit`で状況を確認
- [ ] 開発サーバーで動作確認（ブログページ）
- [ ] 開発サーバーで動作確認（プロジェクトページ）
- [ ] `npm run build`でビルド成功を確認
- [ ] `npm start`で本番サーバー起動を確認
- [ ] 全ページが正常に表示されることを確認

---

## 🔄 ロールバック手順（問題が発生した場合）

```bash
# バックアップから復元
cp package.json.backup package.json

# 元の依存関係を再インストール
npm install
```

---

## 📊 影響範囲サマリー

| 項目 | 影響 | 対応 |
|-----|------|------|
| 既存コード | 変更なし | そのまま動作 |
| シンタックスハイライト | 変更なし | 正常に動作 |
| ビルドプロセス | 変更なし | 正常にビルド |
| 依存関係 | prismjs固定 | 間接依存が固定される |
| 脆弱性警告 | 残る可能性 | 実際の影響は低い |

---

## ⏱️ 作業時間見積もり

- **package.json修正**: 2分
- **npm install**: 1分
- **動作確認**: 5分
- **ビルドテスト**: 5分
- **合計**: 約15分
