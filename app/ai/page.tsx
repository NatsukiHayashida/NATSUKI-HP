'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef } from 'react'

export default function AI() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col w-full max-w-xl py-8 mx-auto mb-4 text-white">
      <div className="flex flex-col space-y-4 pb-24">
        {messages.map(m => (
          m.role === 'user' ? (
            <div
              key={m.id}
              className="px-4 py-2 text-sm tracking-tight rounded-lg self-end bg-gray-800/80 text-white border border-black"
              style={{ lineHeight: '1.8', maxWidth: '80%' }}
            >
              {m.content}
            </div>
          ) : (
            <div
              key={m.id}
              className="px-4 py-2 text-sm tracking-tight rounded-lg self-start bg-gray-300 text-black"
              style={{ lineHeight: '1.8', maxWidth: '80%' }}
              dangerouslySetInnerHTML={{ __html: m.content }}
            />
          )
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="fixed bottom-10 w-full max-w-xl mx-auto mb-4 left-0 right-0 px-4">
        <input
          className="w-full p-2 mb-8 border text-black border-gray-300 rounded shadow-sm"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}