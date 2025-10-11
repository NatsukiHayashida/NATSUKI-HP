# コンタクトページ実装記録

## 📋 概要

2025-10-11に実施したお問い合わせフォーム（`app/contact/page.tsx`）の完全実装とEmailJS統合の記録。

## 🎯 実装内容

### 1. EmailJS統合セットアップ

**環境変数設定** (`.env.local`):
```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_6ec91oj
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_kb4uukp
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=SXcxMqMy3-ygnYudH
NEXT_PUBLIC_CONTACT_EMAIL=ibron1975@gmail.com
```

**EmailJSテンプレート**:
- Template Name: `Contact Us`
- Template ID: `template_kb4uukp`
- Service ID: `service_6ec91oj`

### 2. UI/UX改善

#### ヘッダーセクション
```typescript
<div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
  <Mail className="w-8 h-8 text-primary" />
</div>
<h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
```

#### 日本語注意書き
- **位置**: フォームと同じ`max-w-2xl`コンテナに配置
- **デザイン**: 青色のインフォメーションボックス
- **メッセージ**: スパム対策のための日本語必須ルール説明

```typescript
<div className="max-w-2xl mx-auto px-4 mb-8">
  <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
    <div className="flex items-start gap-3">
      <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
      <div>
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">
          日本語でのお問合せをお願いします
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          スパム対策のため、日本語を含むメッセージのみ受け付けております。
        </p>
      </div>
    </div>
  </div>
</div>
```

#### フォームスタイリング
- **入力フィールド**: `rounded-lg`, `border-input`, focus状態での`ring-2`
- **ラベル**: 日本語表記（「お名前」「メールアドレス」「メッセージ」）
- **プレースホルダー**: 日本語の具体例
- **文字数カウンター**: リアルタイム表示（`{formData.message.length}/1000 文字`）

#### ステータスメッセージ
**成功メッセージ** (緑):
```typescript
<div className="mt-6 p-4 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-xl">
  <div className="flex items-start gap-3">
    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
    <div>
      <h3 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-1">
        送信完了
      </h3>
      <p className="text-sm text-green-700 dark:text-green-300">
        メッセージが正常に送信されました。ご連絡ありがとうございます！
      </p>
    </div>
  </div>
</div>
```

**エラーメッセージ** (赤):
- サーバーエラー時
- 環境変数未設定時

**スパム検出メッセージ** (黄):
- 日本語なしメッセージ
- URL含有メッセージ
- ハニーポット検出

#### 送信ボタン
```typescript
<Button
  type="submit"
  disabled={isSubmitting}
  className="px-8 py-6 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isSubmitting ? (
    <>
      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      送信中...
    </>
  ) : (
    <>
      <Send className="mr-2 h-4 w-4" />
      Send Message
    </>
  )}
</Button>
```

### 3. スパム対策実装

#### 多層防御システム (`lib/spam-protection.ts`)

**レベル1: ハニーポット**
```typescript
<input
  type="text"
  name="honeypot"
  value={formData.honeypot}
  onChange={handleInputChange}
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>
```

**レベル2: 日本語必須チェック**
```typescript
if (!/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(data.message)) {
  reasons.push('No Japanese characters')
  return { isSpam: true, score: 80, reasons }
}
```

**レベル3: URL検出**
```typescript
if (/https?:\/\//.test(data.message)) {
  reasons.push('Contains URL')
  return { isSpam: true, score: 60, reasons }
}
```

**レベル4: レート制限**
```typescript
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

**レベル5: 入力サニタイゼーション**
```typescript
export function sanitizeFormData(data: FormData): SanitizedFormData {
  return {
    name: data.name.trim().slice(0, 50),
    email: data.email.trim().toLowerCase().slice(0, 100),
    message: data.message.trim().slice(0, 1000)
  }
}
```

### 4. エラーハンドリング強化

#### 環境変数チェック
```typescript
useEffect(() => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
  }
}, [])

// 送信時のチェック
if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
    !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
    !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
    !process.env.NEXT_PUBLIC_CONTACT_EMAIL) {
  console.error('EmailJS configuration is missing. Please check your environment variables.')
  setSubmitStatus('error')
  setIsSubmitting(false)
  return
}
```

### 5. React 19対応修正

#### ハイドレーションエラー解消
```typescript
// app/layout.tsx
<html lang="en" suppressHydrationWarning>
```

#### Radix UIライブラリ更新
- `@radix-ui/react-accordion`: 1.1.2 → 1.2.12
- `@radix-ui/react-dialog`: 1.0.5 → 1.1.15
- `@radix-ui/react-dropdown-menu`: 2.0.6 → 2.1.16
- `@radix-ui/react-icons`: 1.3.0 → 1.3.2
- `@radix-ui/react-popover`: 1.0.7 → 1.1.15

### 6. ScrollToTopボタン追加

```typescript
// components/scroll-to-top.tsx
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="ページトップへ戻る"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  )
}
```

## 🎨 デザインシステム統一

### カラーパレット
- **Primary**: Indigo（ブランドカラー）
- **Success**: Green（送信成功）
- **Error**: Red（エラー）
- **Warning**: Yellow（スパム検出）
- **Info**: Blue（注意書き）

### レスポンシブデザイン
- **ヘッダー幅**: `max-w-4xl`
- **フォーム幅**: `max-w-2xl`
- **注意書き幅**: `max-w-2xl`（フォームと統一）
- **モバイル対応**: `px-4`でモバイル余白確保

### アクセシビリティ
- ラベルと入力フィールドの関連付け（`htmlFor`）
- 必須項目マーカー（`<span className="text-destructive">*</span>`）
- フォーカスリング（`focus:ring-2 focus:ring-ring`）
- ARIAラベル（ScrollToTopボタン）
- セマンティックHTML（`<form>`, `<label>`, `<button>`）

## 📊 テスト結果

### 機能テスト
- ✅ 日本語を含むメッセージ送信成功
- ✅ 英語のみメッセージはスパム検出
- ✅ URL含有メッセージはスパム検出
- ✅ レート制限（1分間隔）動作確認
- ✅ ハニーポット検出動作確認
- ✅ 環境変数未設定時のエラーハンドリング確認

### UI/UXテスト
- ✅ フォームと注意書きの余白統一
- ✅ ダークモード対応確認
- ✅ レスポンシブデザイン確認（モバイル、タブレット、デスクトップ）
- ✅ ローディングスピナー表示確認
- ✅ ステータスメッセージ表示確認
- ✅ ScrollToTopボタン動作確認

### パフォーマンステスト
- ✅ EmailJS初期化（環境変数読み込み）
- ✅ メール送信レスポンス時間（~2秒）
- ✅ スパムチェック処理時間（<100ms）

## 📝 ドキュメント作成

1. **CONTACT_SETUP_GUIDE.md** - EmailJS設定の完全ガイド（337行）
   - アカウント作成手順
   - 環境変数設定方法
   - スパム対策アーキテクチャ説明
   - トラブルシューティング
   - 本番環境デプロイ手順

2. **.env.local.example** - 環境変数テンプレート
   - EmailJS設定項目
   - コメント付き説明

## 🔧 トラブルシューティング記録

### 問題1: ハイドレーションエラー
**エラー**: `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties`
**原因**: next-themesのテーマ切替でサーバーとクライアントのHTML不一致
**解決**: `<html suppressHydrationWarning>`追加

### 問題2: EmailJS初期化エラー
**エラー**: `The public key is required`
**原因**: 環境変数未設定時に初期化を試行
**解決**: 環境変数の存在チェック追加

### 問題3: Radix UIのref警告
**エラー**: `Accessing element.ref was removed in React 19`
**原因**: Radix UIライブラリがReact 19非対応
**解決**: 全Radix UIパッケージを最新版に更新

### 問題4: 注意書きとフォームの余白不一致
**要望**: 日本語注意書きの左右余白をフォームに合わせる
**原因**: 注意書きが`max-w-4xl`、フォームが`max-w-2xl`
**解決**: 注意書きを独立した`max-w-2xl`コンテナに移動

## 🚀 今後の改善案

### 短期（1週間以内）
- [ ] メール送信成功時のアニメーション追加
- [ ] フォーム送信履歴のローカル保存（デバッグ用）

### 中期（1ヶ月以内）
- [ ] reCAPTCHA統合（オプション）
- [ ] メール送信通知（ブラウザ通知API）
- [ ] フォーム入力の自動保存（localStorage）

### 長期（3ヶ月以内）
- [ ] 問い合わせカテゴリ選択機能
- [ ] ファイル添付機能
- [ ] 多言語対応（英語、日本語）

## 📚 関連ドキュメント

- `claudedocs/CONTACT_SETUP_GUIDE.md` - EmailJS設定ガイド
- `.env.local.example` - 環境変数テンプレート
- `lib/spam-protection.ts` - スパム対策実装
- `app/contact/page.tsx` - コンタクトページ実装

---

**実装日**: 2025-10-11
**ステータス**: ✅ 完了・動作確認済み
**実装者**: Natsuki Hayashida & Claude Code
