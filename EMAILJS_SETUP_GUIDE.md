# EmailJS セットアップガイド

このガイドでは、お問合せフォームでEmailJSを使用するための設定手順を説明します。

## 📧 EmailJS アカウント作成

### 1. EmailJS サインアップ
1. [EmailJS](https://www.emailjs.com/) にアクセス
2. 「Sign Up」をクリック
3. アカウントを作成（Googleアカウント連携可能）

### 2. サービス追加
1. ダッシュボードで「Services」をクリック
2. 「Add New Service」を選択
3. **Gmail** を選択（推奨）
4. 連携したいGmailアカウントで認証
5. Service ID を記録（例：`service_abc123`）

### 3. メールテンプレート作成
1. ダッシュボードで「Email Templates」をクリック
2. 「Create New Template」を選択
3. 以下のテンプレートを作成：

**Subject（件名）:**
```
【お問合せ】{{from_name}}様からのメッセージ
```

**Content（本文）:**
```
お問合せフォームからメッセージが届きました。

■ 送信者情報
名前：{{from_name}}
メール：{{from_email}}

■ メッセージ内容
{{message}}

---
このメールは自動送信されています。
```

4. Template ID を記録（例：`template_xyz789`）

### 4. Public Key 取得
1. ダッシュボードで「Account」をクリック
2. 「API Keys」セクションから「Public Key」をコピー
3. Public Key を記録（例：`abcdefghijklmnop`）

## ⚙️ 環境変数設定

`.env.local` ファイルに以下を追加：

```bash
# EmailJS 設定
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abcdefghijklmnop
NEXT_PUBLIC_CONTACT_EMAIL=your-email@gmail.com
```

### 環境変数の説明
| 変数名 | 説明 | 例 |
|--------|------|-----|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJSサービスID | `service_abc123` |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | メールテンプレートID | `template_xyz789` |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS公開キー | `abcdefghijklmnop` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | メール送信先アドレス | `you@example.com` |

## 🔧 テスト方法

### 1. 開発サーバー起動
```bash
npm run dev
```

### 2. フォームテスト
1. http://localhost:3000/contact にアクセス
2. 全項目を入力（**日本語必須**）
3. 「Send Message」をクリック
4. 「✅ メッセージが正常に送信されました」が表示されることを確認
5. 設定したメールアドレスにメールが届くことを確認

### 3. スパム対策テスト

**日本語なしテスト:**
- 英語のみのメッセージで送信
- 「⚠️ スパム対策により送信をブロック」が表示されることを確認

**URL含有テスト:**
- メッセージに「https://example.com」を含めて送信
- スパム判定されることを確認

**連続送信テスト:**
- 1分以内に2回送信を試行
- 「送信間隔が短すぎます」と表示されることを確認

## 📊 EmailJS 使用制限

### 無料プラン
- **200通/月** まで無料
- メール送信履歴の確認可能
- 基本的なテンプレート機能

### 有料プラン
- 月額 $15〜 で50,000通/月まで拡張可能
- 高度な分析機能
- 優先サポート

## 🚨 トラブルシューティング

### よくある問題と解決策

**1. メールが届かない**
- Gmail側で「すべてのメール」「迷惑メール」を確認
- EmailJSダッシュボードで送信履歴を確認
- 環境変数が正しく設定されているか確認

**2. 「EmailJS error」が表示される**
- ブラウザの開発者ツールでエラー詳細を確認
- Service ID、Template ID、Public Key が正しいか確認
- EmailJSサービスが有効になっているか確認

**3. スパム対策が厳しすぎる**
- `lib/spam-protection.ts`のスコア調整
- 日本語チェックの条件緩和

### デバッグ方法
```javascript
// ブラウザのコンソールで確認
console.log('環境変数チェック:')
console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID)
console.log('Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID)
console.log('Public Key:', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
```

## 🔒 セキュリティ対策

### 実装済みのスパム対策
- ✅ **Honeypot**: ボット検出用隠しフィールド
- ✅ **日本語必須**: ひらがな・カタカナ・漢字チェック
- ✅ **URL検出**: メッセージ内URL制限
- ✅ **スパムキーワード**: 一般的なスパム語句ブロック
- ✅ **Rate Limiting**: 1分間のクールダウン期間
- ✅ **文字数制限**: 最小10文字〜最大1000文字
- ✅ **入力サニタイズ**: XSS攻撃対策

### 追加可能な対策
- Google reCAPTCHA v3 導入
- IPベースのブロック機能
- より詳細なログ記録

---

## 📝 次のステップ

1. EmailJSアカウント作成
2. 環境変数設定
3. テスト実行
4. 本番環境でのテスト
5. Vercel等にデプロイ時は環境変数も設定

何か不明な点があれば、EmailJSの公式ドキュメントも参照してください：
https://www.emailjs.com/docs/