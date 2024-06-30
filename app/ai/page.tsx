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
    <div className="flex flex-col w-full max-w-xl mx-auto">
      <div className="my-4 p-2 border bg-slate-900 text-white rounded">
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
              className="px-4 py-2 text-sm tracking-tight rounded-lg self-start bg-gray-300 text-black"
              style={{ lineHeight: '1.8', maxWidth: '80%' }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p: ({ ...props }) => <p className="mb-2" {...props} />,
                  li: ({ ...props }) => <li className="list-disc ml-4" {...props} />,
                  code: ({ ...props }) => (
                    <code className="bg-gray-200 p-1 rounded" {...props} />
                  ),
                  pre: ({ ...props }) => (
                    <pre className="p-4 bg-gray-900 text-white rounded-md overflow-x-auto my-4" {...props} />
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
          className="flex-grow p-2 mb-8 border rounded shadow-sm"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          className="p-2 mb-8 mx-2 border rounded shadow-sm"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </form>
    </div>
  )
}
