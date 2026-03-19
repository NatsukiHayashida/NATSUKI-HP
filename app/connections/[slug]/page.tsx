import {
  getConnectionBySlug,
  getAllConnections,
  getConnectionSlugs,
} from '@/lib/connections'
import { parseISO8601Date } from '@/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getConnectionSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const note = getConnectionBySlug(slug)

  return {
    title: note ? `${note.title} | 接続ノート` : '接続ノート',
    description: note
      ? `${note.connections.join(' / ')} — ${note.title}`
      : '接続ノート',
  }
}

export default async function ConnectionPage({ params }: Props) {
  const { slug } = await params
  const note = getConnectionBySlug(slug)
  const allNotes = getAllConnections()

  if (!note) return null

  const currentIndex = allNotes.findIndex((n) => n.slug === slug)
  const prevNote = currentIndex > 0 ? allNotes[currentIndex - 1] : null
  const nextNote =
    currentIndex < allNotes.length - 1 ? allNotes[currentIndex + 1] : null
  const date = parseISO8601Date(note.date)

  return (
    <main className="container px-4 py-8 pt-8 mx-auto md:py-12 md:pt-12">
      <article className="max-w-4xl mx-auto">
        {/* パンくずリスト */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link
            href="/connections"
            className="hover:text-foreground transition-colors"
          >
            接続ノート
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{note.title}</span>
        </nav>

        {/* ヘッダー */}
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{note.title}</h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
          {date && (
            <span className="text-sm text-muted-foreground">
              {date.toLocaleDateString('ja-JP', {
                timeZone: 'Asia/Tokyo',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
          {note.connections.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {note.connections.join(' / ')}
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {note.readingTime}
          </span>
        </div>

        {/* タグ */}
        <div className="flex flex-wrap gap-x-2 gap-y-1 mb-10">
          {note.tags.map((tag) => (
            <span key={tag} className="text-xs text-muted-foreground/60">
              #{tag}
            </span>
          ))}
        </div>

        {/* 本文 */}
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
            components={{
              h1: ({ ...props }) => (
                <h1 className="text-2xl font-bold mb-4" {...props} />
              ),
              h2: ({ ...props }) => (
                <h2
                  className="text-xl font-semibold mt-10 mb-4"
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3 className="text-lg font-medium mt-8 mb-3" {...props} />
              ),
              p: ({ ...props }) => (
                <p className="mb-5 leading-[1.9]" {...props} />
              ),
              ul: ({ ...props }) => (
                <ul className="list-disc pl-6 mb-4" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol className="list-decimal pl-6 mb-4" {...props} />
              ),
              li: ({ ...props }) => (
                <li className="mb-1 leading-[1.8]" {...props} />
              ),
              code: ({ ...props }) => (
                <code
                  className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm"
                  {...props}
                />
              ),
              pre: ({ ...props }) => (
                <pre
                  className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"
                  {...props}
                />
              ),
            }}
          >
            {note.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* ナビゲーション */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mt-16 pt-8 border-t border-border/40">
        {prevNote ? (
          <Link
            href={`/connections/${prevNote.slug}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← 前のメモ
          </Link>
        ) : (
          <div />
        )}
        <Link
          href="/connections"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          一覧に戻る
        </Link>
        {nextNote ? (
          <Link
            href={`/connections/${nextNote.slug}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            次のメモ →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </main>
  )
}
