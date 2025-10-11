'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { calculateSpamScore, checkRateLimit, sanitizeFormData } from '@/lib/spam-protection'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Mail, Send, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'spam'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // ボット検出用隠しフィールド
  })

  // EmailJS初期化
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Rate limiting チェック
    if (!checkRateLimit()) {
      setSubmitStatus('error')
      alert('送信間隔が短すぎます。1分後に再試行してください。')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    // フォームデータをサニタイズ
    const sanitizedData = sanitizeFormData(formData)
    
    // スパムチェック
    const spamCheck = calculateSpamScore({
      ...sanitizedData,
      honeypot: formData.honeypot
    })

    if (spamCheck.isSpam) {
      console.log('Spam detected:', spamCheck.reasons)
      setSubmitStatus('spam')
      setIsSubmitting(false)
      return
    }

    try {
      // EmailJS環境変数チェック
      if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
          !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
          !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
          !process.env.NEXT_PUBLIC_CONTACT_EMAIL) {
        console.error('EmailJS configuration is missing. Please check your environment variables.')
        setSubmitStatus('error')
        setIsSubmitting(false)
        return
      }

      // EmailJS で送信
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: sanitizedData.name,
          from_email: sanitizedData.email,
          message: sanitizedData.message,
          to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
        }
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '', honeypot: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <ScrollToTop />
      <main className="container mx-auto py-8 pt-20 md:py-12 md:pt-24">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              For any questions, inquiries, or project and job requests, please feel free to contact me using the form below.
            </p>
          </div>

        </div>

        {/* 日本語での注意書き */}
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

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4">
          {/* Honeypot field (hidden) */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleInputChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2">
                お名前 <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                required
                maxLength={50}
                placeholder="山田太郎"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                メールアドレス <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                required
                maxLength={100}
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                メッセージ <span className="text-destructive">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={8}
                className="w-full px-4 py-3 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none"
                required
                minLength={10}
                maxLength={1000}
                placeholder="お問い合わせ内容を日本語でご記入ください..."
              />
              <p className="text-xs text-muted-foreground mt-2">
                {formData.message.length}/1000 文字（最低10文字必要）
              </p>
            </div>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
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
          )}

          {submitStatus === 'error' && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
                    送信エラー
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    送信中にエラーが発生しました。しばらく時間をおいて再試行してください。
                  </p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'spam' && (
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-800 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                    スパム検出
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    スパム対策により送信をブロックしました。日本語を含むメッセージでご記入ください。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
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
          </div>
        </form>
      </main>
    </>
  )
}
