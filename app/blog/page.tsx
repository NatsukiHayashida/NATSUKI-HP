import React from 'react'
import Link from 'next/link'
import { getArticles } from '@/lib/newt'
import { parseISO8601Date } from '@/lib/utils'

export default async function Blog() {
  const articles = await getArticles()
  return (
    <div className='container my-8 '>
      <article className="prose  dark:prose-invert  mx-8">
        <p className=' font-light text-lg leading-relaxed  mb-2 '>{`This blog is where I share the knowledge of AI and programming that I've gained through daily learning and trial and error. `}</p>
        <p className='font-light text-lg leading-relaxed '>{`Including the times when things don't go as planned, I hope we can enjoy the journey of technology and grow step by step together`}</p>
      </article>
      <section className='my-8 mx-4'>
        <h3 className="text-lg mx-4 ">Writing</h3>
        <div className='m-4'>
          <ul className="my-6 ml-12 text-lg list-disc [&>li]:mt-2">
            {articles.map((article) => {
              // 日付文字列をパース
              const date = parseISO8601Date(article.date);
              return (
                <li key={article._id}>
                  <Link href={`articles/${article.slug}`}>
                    {article.title}
                    {date && (
                      <span className='text-base text-muted-foreground ml-8'>
                         {date.toLocaleDateString('en-US', {
                           timeZone: 'Asia/Tokyo',
                           month: 'short',
                           day: 'numeric',
                           year: 'numeric',
                         })}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}