'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'
import TypingTextAI from '../components/TypingTextAI'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'


export default function AI() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <main className="flex flex-col w-full max-w-xl mx-auto pt-20">
      <div className="my-4 p-4 border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-slate-700 rounded-lg shadow-sm dark:from-slate-800 dark:to-slate-700 dark:border-slate-600 dark:text-slate-200">
        <TypingTextAI />
      </div>
      <div className="flex flex-col space-y-4 pb-8 mb-16">
        {messages.map(m => (
          m.role === 'user' ? (
            <div
              key={m.id}
              className="px-4 py-2 text-sm tracking-tight rounded-lg self-end border bg-muted/50"
              style={{ lineHeight: '1.8', maxWidth: '80%' }}
            >
              {m.content}
            </div>
          ) : (
            <div
              key={m.id}
              className="px-4 py-2 text-sm tracking-tight rounded-lg self-start bg-blue-50 text-slate-800 border border-blue-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600"
              style={{ lineHeight: '1.8', maxWidth: '80%' }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({ ...props }) => <p className="mb-2" {...props} />,
                  li: ({ ...props }) => <li className="list-disc ml-4" {...props} />,
                  code: ({ ...props }) => (
                    <code className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-xs font-mono dark:bg-slate-700 dark:text-blue-300" {...props} />
                  ),
                  pre: ({ ...props }) => (
                    <pre className="p-4 bg-slate-900 text-slate-100 rounded-md overflow-x-auto my-4 border dark:bg-slate-950 dark:border-slate-700" {...props} />
                  )
                }}
              >
                {m.content}
              </ReactMarkdown>
            </div>
          )
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="fixed bottom-10 w-full max-w-xl mx-auto m-4 left-0 right-0 px-4 flex">
        <input
          className="flex-grow p-3 mb-8 border border-blue-200 rounded-lg shadow-sm bg-white dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          className="p-3 mb-8 mx-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </form>
    </main>
  )
}
