'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'
import TypingTextAI from '../components/TypingTextAI'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const PRESET_PROMPTS = [
  { label: 'このサイトについて', prompt: 'このサイトについて教えてください' },
  { label: '技術スタック', prompt: '使用している技術スタックを教えてください' },
  { label: 'プロジェクト', prompt: 'どんなプロジェクトに取り組んでいますか？' },
  { label: '連絡方法', prompt: '連絡を取るにはどうすればいいですか？' },
]

export default function AI() {
  const { messages, input, handleInputChange, handleSubmit, setInput } = useChat()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handlePresetClick = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <main className="flex flex-col w-full max-w-3xl mx-auto pt-20 px-4">
      <Card className="p-6 mb-6 bg-gradient-to-r from-primary/5 to-primary/10">
        <TypingTextAI />
      </Card>

      {messages.length === 0 && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-3">よくある質問：</p>
          <div className="flex flex-wrap gap-2">
            {PRESET_PROMPTS.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handlePresetClick(preset.prompt)}
                className="text-xs"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-4 pb-8 mb-24">
        {messages.map(m => (
          <Card
            key={m.id}
            className={`p-4 ${m.role === 'user' ? 'ml-auto bg-primary/5' : 'mr-auto'}`}
            style={{ maxWidth: '85%' }}
          >
            {m.role === 'user' ? (
              <p className="text-sm leading-relaxed">{m.content}</p>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({ ...props }) => <p className="mb-2 text-sm leading-relaxed" {...props} />,
                  li: ({ ...props }) => <li className="list-disc ml-4 text-sm" {...props} />,
                  code: ({ ...props }) => (
                    <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono" {...props} />
                  ),
                  pre: ({ ...props }) => (
                    <pre className="p-4 bg-muted rounded-md overflow-x-auto my-3 text-sm" {...props} />
                  )
                }}
              >
                {m.content}
              </ReactMarkdown>
            )}
          </Card>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <Card className="fixed bottom-6 w-full max-w-3xl left-1/2 -translate-x-1/2 mx-4 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 px-4 py-2.5 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
            value={input}
            placeholder="メッセージを入力..."
            onChange={handleInputChange}
          />
          <Button type="submit" size="lg">
            送信
          </Button>
        </form>
      </Card>
    </main>
  )
}
