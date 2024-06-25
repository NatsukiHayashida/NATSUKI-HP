
import { openai } from '@ai-sdk/openai'
import { StreamingTextResponse, streamText } from 'ai'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid request body', { status: 400 })
    }

    const result = await streamText({
      model: openai('gpt-4o'),
      messages
    })

    return new StreamingTextResponse(result.toAIStream())
  } catch (error) {
    console.error('Error processing request:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}