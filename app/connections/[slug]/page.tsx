import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
        {/* ヘッダー */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{note.title}</h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
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
        </div>

        {/* タグ */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {note.tags.map((tag) => (
            <Badge key={tag} variant="tag" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* 本文 */}
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* ナビゲーション */}
      <div className="flex items-center justify-center gap-2 mt-8 mb-8">
        {prevNote && (
          <Button asChild variant="outline" size="sm">
            <Link href={`/connections/${prevNote.slug}`}>前のメモ</Link>
          </Button>
        )}
        <Button asChild size="sm">
          <Link href="/connections">一覧に戻る</Link>
        </Button>
        {nextNote && (
          <Button asChild variant="outline" size="sm">
            <Link href={`/connections/${nextNote.slug}`}>次のメモ</Link>
          </Button>
        )}
      </div>
    </main>
  )
}
