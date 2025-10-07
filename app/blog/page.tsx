import React from 'react'
import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { parseISO8601Date } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { FileText } from 'lucide-react'

export default async function Blog() {
  const posts = getAllPosts()
  return (
    <main className='container py-12 pt-20'>
      <div className='max-w-4xl mx-auto'>
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <article className="prose dark:prose-invert mb-12">
          <p className='font-light text-lg leading-relaxed mb-2'>{`This blog is where I share the knowledge of AI and programming that I've gained through daily learning and trial and error. `}</p>
          <p className='font-light text-lg leading-relaxed'>{`Including the times when things don't go as planned, I hope we can enjoy the journey of technology and grow step by step together`}</p>
        </article>
        <section>
          <h2 className="text-2xl font-semibold mb-6">Writing</h2>
          {posts.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No articles yet"
              description="Blog posts are coming soon. Stay tuned for insights on AI, programming, and development!"
              action={{
                label: "View Projects",
                href: "/projects"
              }}
            />
          ) : (
            <div className="space-y-4">
              {posts.map((post) => {
                const date = parseISO8601Date(post.date);
                return (
                  <Link key={post.slug} href={`articles/${post.slug}`}>
                    <Card variant="interactive" className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                        {date && (
                          <span className='text-sm text-muted-foreground whitespace-nowrap'>
                            {date.toLocaleDateString('ja-JP', {
                              timeZone: 'Asia/Tokyo',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
                      </div>
                      {post.excerpt && (
                        <p className="text-muted-foreground mt-2 text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
