'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn, parseISO8601Date } from '@/lib/utils'
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
      <div className="flex flex-wrap gap-x-3 gap-y-2 mb-8">
        <button
          onClick={() => setSelectedTag(null)}
          className={cn(
            'text-sm transition-colors',
            selectedTag === null
              ? 'text-foreground font-medium'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          すべて
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={cn(
              'text-sm transition-colors',
              selectedTag === tag
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* メモ一覧 */}
      <div className="divide-y divide-border/40">
        {filteredNotes.map((note) => {
          const date = parseISO8601Date(note.date)
          return (
            <Link
              key={note.slug}
              href={`/connections/${note.slug}`}
              className="block py-5 group"
            >
              <h3 className="text-base md:text-lg font-medium group-hover:text-primary transition-colors">
                {note.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                {date && (
                  <span className="text-xs text-muted-foreground">
                    {date.toLocaleDateString('ja-JP', {
                      timeZone: 'Asia/Tokyo',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                )}
                {note.connections.length > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {note.connections.join(' / ')}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted-foreground/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
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
