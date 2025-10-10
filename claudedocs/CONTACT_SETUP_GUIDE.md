# コンタクトフォーム設定ガイド

## 📋 概要

このガイドでは、EmailJSを使用したお問い合わせフォームのセットアップ手順を説明します。

## 🔧 EmailJSのセットアップ

### 1. EmailJSアカウント作成

1. [EmailJS](https://www.emailjs.com/)にアクセス
2. 「Sign Up」からアカウント作成
3. メールアドレス確認

### 2. Email Serviceの追加

1. ダッシュボードで「Add New Service」をクリック
2. メールプロバイダーを選択（Gmail推奨）
   - **Gmail**: Googleアカウントで認証
   - **Outlook**: Microsoftアカウントで認証
   - **その他**: SMTPサーバー情報を入力
3. Service IDをメモ（例: `service_abc123`）

### 3. Email Templateの作成

1. ダッシュボードで「Email Templates」→「Create New Template」
2. テンプレート設定:

```
Template Name: Contact Form
Subject: 【お問い合わせ】{{from_name}}様よりメッセージが届きました

Body:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
お問い合わせフォームから新しいメッセージが届きました
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【送信者名】
{{from_name}}

【メールアドレス】
{{from_email}}

【メッセージ内容】
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
送信日時: {{reply_to}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

3. Template IDをメモ（例: `template_xyz789`）
4. 「Save」をクリック

### 4. Public Keyの取得

1. ダッシュボードで「Account」→「General」
2. 「Public Key」をコピー（例: `abc123XYZ`）

## 🔐 環境変数の設定

### 1. `.env.local`ファイルを作成

プロジェクトルートに`.env.local`ファイルを作成し、以下を追加：

```bash
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abc123XYZ
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
```

### 2. 各項目の説明

| 環境変数 | 説明 | 例 |
|---------|------|-----|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Email Service ID | `service_abc123` |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Email Template ID | `template_xyz789` |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Public Key | `abc123XYZ` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 受信メールアドレス | `contact@example.com` |

### 3. 開発サーバーの再起動

環境変数を追加したら、開発サーバーを再起動：

```bash
# 現在のサーバーを停止（Ctrl + C）
# 再起動
npm run dev
```

## ✅ 動作確認

### 1. ローカル環境でのテスト

1. http://localhost:3000/contact にアクセス
2. フォームに以下を入力：
   - **Name**: テスト太郎
   - **Email**: test@example.com
   - **Message**: テストメッセージです。日本語を含む内容。

3. 「Send Message」をクリック
4. 成功メッセージが表示されることを確認
5. 受信メールボックスを確認

### 2. スパム対策の確認

#### ✅ 正常ケース（送信成功）
- 日本語を含むメッセージ
- 適切な長さ（10文字以上）
- ハニーポットフィールド未入力

#### ❌ ブロックされるケース
- 英語のみのメッセージ → スパム判定
- URLを含むメッセージ → スパム判定
- ハニーポットフィールド入力 → ボット判定
- 1分以内の連続送信 → レート制限

## 🛡️ スパム対策の仕組み

### 1. 多層防御アーキテクチャ

```typescript
// lib/spam-protection.ts
export function calculateSpamScore(data: {
  name: string
  email: string
  message: string
  honeypot: string
}): SpamCheckResult {
  const reasons: string[] = []

  // 1. ハニーポット検証
  if (data.honeypot) {
    reasons.push('Honeypot field filled')
    return { isSpam: true, score: 100, reasons }
  }

  // 2. 日本語必須チェック
  if (!/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(data.message)) {
    reasons.push('No Japanese characters')
    return { isSpam: true, score: 80, reasons }
  }

  // 3. URL検出
  if (/https?:\/\//.test(data.message)) {
    reasons.push('Contains URL')
    return { isSpam: true, score: 60, reasons }
  }

  // 4. スパムキーワード検出
  const spamKeywords = ['viagra', 'casino', 'lottery', 'prize']
  // ...
}
```

### 2. レート制限

```typescript
// lib/spam-protection.ts
export function checkRateLimit(): boolean {
  const lastSubmitTime = localStorage.getItem('lastContactSubmit')
  const now = Date.now()

  if (lastSubmitTime) {
    const timeDiff = now - parseInt(lastSubmitTime)
    if (timeDiff < 60000) { // 1分以内
      return false
    }
  }

  localStorage.setItem('lastContactSubmit', now.toString())
  return true
}
```

### 3. 入力サニタイゼーション

```typescript
// lib/spam-protection.ts
export function sanitizeFormData(data: FormData): SanitizedFormData {
  return {
    name: data.name.trim().slice(0, 50),
    email: data.email.trim().toLowerCase().slice(0, 100),
    message: data.message.trim().slice(0, 1000)
  }
}
```

## 🚨 トラブルシューティング

### 問題1: メールが届かない

**原因と解決策**:

1. **環境変数の設定ミス**
   ```bash
   # .env.localの内容を確認
   cat .env.local

   # 開発サーバーを再起動
   npm run dev
   ```

2. **EmailJS Service未承認**
   - EmailJSダッシュボードでServiceが「Connected」になっているか確認
   - Gmailの場合、「安全性の低いアプリ」設定を確認

3. **テンプレート設定エラー**
   - Template IDが正しいか確認
   - テンプレート変数（{{from_name}}等）が正しく設定されているか確認

### 問題2: スパム判定される

**原因と解決策**:

1. **日本語が含まれていない**
   ```
   ❌ "Hello, this is a test message"
   ✅ "テストメッセージです。Hello!"
   ```

2. **URLが含まれている**
   ```
   ❌ "Please visit https://example.com"
   ✅ "詳細はメールでお伝えします"
   ```

3. **レート制限**
   - 1分待ってから再送信
   - LocalStorageをクリア（開発者ツール）

### 問題3: 「送信中...」のまま固まる

**原因と解決策**:

1. **ネットワークエラー**
   ```javascript
   // ブラウザコンソールでエラー確認
   // F12 → Console タブ
   ```

2. **CORS問題**
   - EmailJSダッシュボードで許可されたドメインを確認
   - `localhost:3000`が許可されているか確認

3. **Public Key未初期化**
   ```typescript
   // useEffect内で初期化されているか確認
   useEffect(() => {
     if (typeof window !== 'undefined') {
       emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)
     }
   }, [])
   ```

## 📊 モニタリング

### EmailJSダッシュボードで確認できる情報

1. **送信履歴**
   - 成功/失敗ステータス
   - 送信日時
   - エラー詳細

2. **使用状況**
   - 月間送信数（無料プラン: 200通/月）
   - 残り送信可能数

3. **エラーログ**
   - 失敗した送信の詳細
   - エラーメッセージ

## 🚀 本番環境へのデプロイ

### Vercelへのデプロイ手順

1. **環境変数の設定**
   - Vercelダッシュボード → Settings → Environment Variables
   - 以下を追加:
     ```
     NEXT_PUBLIC_EMAILJS_SERVICE_ID
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
     NEXT_PUBLIC_CONTACT_EMAIL
     ```

2. **ドメイン許可**
   - EmailJSダッシュボード → Account → Security
   - 本番ドメインを許可リストに追加

3. **デプロイ**
   ```bash
   git push origin main
   # Vercelが自動デプロイ
   ```

4. **動作確認**
   - 本番環境でフォーム送信テスト
   - メール受信確認

## 📝 セキュリティベストプラクティス

### 1. 環境変数の管理

```bash
# ❌ 絶対にコミットしない
.env.local

# ✅ .gitignoreに追加済み
.env*.local
```

### 2. Public Keyの扱い

- **Public Key**: クライアント側で使用するため公開OK
- **Private Key**: サーバー側のみで使用（EmailJSは不要）

### 3. スパム対策の強化

- ハニーポット: ボット検出
- 日本語必須: ローカライズ攻撃防止
- レート制限: 連続送信防止
- サニタイゼーション: XSS/インジェクション対策

## 🔗 関連ドキュメント

- [EmailJS公式ドキュメント](https://www.emailjs.com/docs/)
- [Next.js環境変数](https://nextjs.org/docs/basic-features/environment-variables)
- [スパム対策実装詳細](./EMAILJS_SETUP_GUIDE.md)

---

**最終更新**: 2025-10-11
**ステータス**: ✅ 動作確認済み
