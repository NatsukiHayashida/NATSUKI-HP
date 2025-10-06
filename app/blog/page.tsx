import React from 'react'
import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import { parseISO8601Date } from '@/lib/utils'

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
          <ul className="space-y-2">
            {posts.map((post) => {
              // 日付文字列をパース
              const date = parseISO8601Date(post.date);
              return (
                <li key={post.slug} className="list-none">
                  <Link
                    href={`articles/${post.slug}`}
                    className="block hover:bg-muted/50 p-3 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="font-medium">{post.title}</span>
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
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </main>
  )
}
