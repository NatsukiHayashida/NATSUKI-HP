'use client'

import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { calculateSpamScore, checkRateLimit, sanitizeFormData } from '@/lib/spam-protection'

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
    if (typeof window !== 'undefined') {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)
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
      // EmailJS で送信（public keyは初期化済み）
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: sanitizedData.name,
          from_email: sanitizedData.email,
          message: sanitizedData.message,
          to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL!,
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
    <main className="container mx-auto py-4 pt-20">
      <div className='mx-4 md:mx-16 my-4'>
        <h1 className="text-2xl text-center my-4">Contact Me</h1>
        <div className='flex md:mx-12'>
          <p className='font-light mb-4 md:p-1 leading-6 text-sm md:text-base'>
            For any questions, inquiries, or project and job requests, please feel free to contact me using the form below.
          </p>
        </div>
        
        {/* 日本語での注意書き */}
        <div className='mx-4 md:mx-16 mb-6'>
          <div className='bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4'>
            <p className='text-sm text-blue-800 dark:text-blue-200'>
              📧 <strong>日本語でのお問合せをお願いします</strong><br/>
              スパム対策のため、日本語を含むメッセージのみ受け付けております。
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-lg m-auto my-4">
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

        <div className="mb-6 mx-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white sm:text-sm"
            required
            maxLength={50}
          />
        </div>

        <div className="mb-6 mx-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white sm:text-sm"
            required
            maxLength={100}
          />
        </div>

        <div className="mb-6 mx-4">
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white sm:text-sm"
            required
            minLength={10}
            maxLength={1000}
            placeholder="日本語でメッセージをご記入ください..."
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.message.length}/1000 文字（最低10文字必要）
          </p>
        </div>

        {submitStatus === 'success' && (
          <div className="mb-4 mx-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
            <p className="text-green-800 dark:text-green-200">
              ✅ メッセージが正常に送信されました。ありがとうございます！
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-4 mx-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-red-800 dark:text-red-200">
              ❌ 送信中にエラーが発生しました。しばらく時間をおいて再試行してください。
            </p>
          </div>
        )}

        {submitStatus === 'spam' && (
          <div className="mb-4 mx-4 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-md">
            <p className="text-yellow-800 dark:text-yellow-200">
              ⚠️ スパム対策により送信をブロックしました。日本語を含むメッセージでご記入ください。
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="py-2 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md shadow-sm text-sm font-medium transition-colors"
          >
            {isSubmitting ? '送信中...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </main>
  )
}
