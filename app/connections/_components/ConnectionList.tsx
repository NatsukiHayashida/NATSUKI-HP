'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { parseISO8601Date } from '@/lib/utils'
import type { ConnectionNote } from '@/types/connection'

interface ConnectionListProps {
  notes: ConnectionNote[]
  allTags: string[]
}

export function ConnectionList({ notes, allTags }: ConnectionListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredNotes = selectedTag
    ? notes.filter((note) => note.tags.includes(selectedTag))
    : notes

  return (
    <>
      {/* タグフィルター */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedTag(null)}
          className="focus:outline-none"
        >
          <Badge variant={selectedTag === null ? 'default' : 'outline'}>
            すべて
          </Badge>
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className="focus:outline-none"
          >
            <Badge variant={selectedTag === tag ? 'default' : 'interactive'}>
              {tag}
            </Badge>
          </button>
        ))}
      </div>

      {/* メモ一覧 */}
      <div className="space-y-6">
        {filteredNotes.map((note) => {
          const date = parseISO8601Date(note.date)
          return (
            <Link
              key={note.slug}
              href={`/connections/${note.slug}`}
              className="block"
            >
              <Card variant="interactive" className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <h3 className="font-semibold text-lg">{note.title}</h3>
                  {date && (
                    <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                      {date.toLocaleDateString('ja-JP', {
                        timeZone: 'Asia/Tokyo',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>

                {/* 接続軸・読了時間 */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                  {note.connections.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {note.connections.join(' / ')}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {note.readingTime}
                  </span>
                </div>

                {/* excerpt */}
                {note.excerpt && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {note.excerpt}
                  </p>
                )}

                {/* タグ */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="tag" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {filteredNotes.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          該当するメモがありません
        </p>
      )}
    </>
  )
}
