import React from 'react'
import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { parseISO8601Date } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { FileText } from 'lucide-react'
import BlogNetworkBanner from './_components/BlogNetworkBanner'

export default async function Blog() {
  const posts = getAllPosts()
  return (
    <main className='container py-8 pt-8 md:py-12 md:pt-12'>
      {/* Three.js Network Animation Banner */}
      <BlogNetworkBanner
        title="Blog"
        subtitle="AI、プログラミング、製造業の日々の学びと試行錯誤を共有します"
      />

      <div className='max-w-4xl mx-auto mt-8'>
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
            <div className="space-y-8">
              {posts.map((post) => {
                const date = parseISO8601Date(post.date);
                return (
                  <Link key={post.slug} href={`articles/${post.slug}`} className="block">
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
