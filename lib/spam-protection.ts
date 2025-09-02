/**
 * スパム対策ユーティリティ関数
 */

// 日本語が含まれているかチェック
export function containsJapanese(text: string): boolean {
  // ひらがな、カタカナ、漢字をチェック
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/
  return japaneseRegex.test(text)
}

// URLが含まれているかチェック
export function containsURL(text: string): boolean {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,})/i
  return urlRegex.test(text)
}

// スパムキーワードをチェック
export function containsSpamKeywords(text: string): boolean {
  const spamKeywords = [
    'viagra', 'casino', 'lottery', 'winner', 'congratulations',
    'urgent', 'immediate', 'click here', 'limited time', 'act now',
    'free money', 'make money', 'work from home', 'investment',
    'loan', 'debt', 'credit', 'mortgage'
  ]
  
  const lowerText = text.toLowerCase()
  return spamKeywords.some(keyword => lowerText.includes(keyword))
}

// 文字数チェック
export function isValidLength(text: string, min: number = 10, max: number = 1000): boolean {
  return text.length >= min && text.length <= max
}

// メールアドレスの形式チェック
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Rate Limiting（ローカルストレージベース）
export function checkRateLimit(): boolean {
  const lastSubmit = localStorage.getItem('lastContactSubmit')
  const now = Date.now()
  const cooldownPeriod = 60 * 1000 // 1分間のクールダウン

  if (lastSubmit && now - parseInt(lastSubmit) < cooldownPeriod) {
    return false // まだクールダウン中
  }

  localStorage.setItem('lastContactSubmit', now.toString())
  return true
}

// 総合スパムスコア計算
export function calculateSpamScore(data: {
  name: string
  email: string
  message: string
  honeypot?: string
}): { isSpam: boolean; reasons: string[] } {
  const reasons: string[] = []
  let spamScore = 0

  // Honeypot チェック
  if (data.honeypot && data.honeypot.trim() !== '') {
    spamScore += 100
    reasons.push('Bot detected (honeypot)')
  }

  // 日本語チェック
  if (!containsJapanese(data.name + data.message)) {
    spamScore += 30
    reasons.push('No Japanese characters')
  }

  // URL チェック
  if (containsURL(data.message)) {
    spamScore += 40
    reasons.push('Contains URLs')
  }

  // スパムキーワードチェック
  if (containsSpamKeywords(data.message)) {
    spamScore += 50
    reasons.push('Contains spam keywords')
  }

  // 文字数チェック
  if (!isValidLength(data.message, 10, 1000)) {
    spamScore += 20
    reasons.push('Invalid message length')
  }

  // メールアドレスチェック
  if (!isValidEmail(data.email)) {
    spamScore += 30
    reasons.push('Invalid email format')
  }

  // 名前の長さチェック（異常に短いか長い）
  if (data.name.length < 2 || data.name.length > 50) {
    spamScore += 15
    reasons.push('Invalid name length')
  }

  // スパム判定（スコア50以上）
  return {
    isSpam: spamScore >= 50,
    reasons: reasons
  }
}

// フォームデータのサニタイズ
export function sanitizeFormData(data: any) {
  return {
    name: data.name?.trim().slice(0, 50) || '',
    email: data.email?.trim().slice(0, 100) || '',
    message: data.message?.trim().slice(0, 1000) || '',
  }
}