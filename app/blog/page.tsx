// /Users/hayashidanatsuki/MyProject/163/natsuki-hp/app/blog/page.tsx
import React from 'react'
import Link from 'next/link'
import { getArticles } from '@/lib/newt'

// ISO 8601形式の日付文字列をDateオブジェクトに変換する関数
function parseISO8601Date(dateString: string): Date | null {
  const timestamp = Date.parse(dateString);
  if (isNaN(timestamp)) {
    return null;
  }
  return new Date(timestamp);
}

export default async function Blog() {
  const articles = await getArticles()
  return (
    <div className='container my-4 '>
      <p className='font-light leading-relaxed '>{`This blog is where I share the knowledge of AI and programming that I've gained through daily learning and trial and error. `}</p>
      <p className='font-light leading-relaxed'>{`Including the times when things don't go as planned, I hope we can enjoy the journey of technology and grow step by step together`}</p>

      <section className='my-8 mx-2'>
        <p className="text-lg  ">Writing</p>
        <div className='m-2'>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            {articles.map((article) => {
              // 日付文字列をパース
              const date = parseISO8601Date(article.date);
              return (
                <li key={article._id}>
                  <Link href={`articles/${article.slug}`}>
                    {article.title}
                    {date && (
                        <span className='text-sm text-muted-foreground ml-4'>
                         {date.toLocaleDateString()}
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