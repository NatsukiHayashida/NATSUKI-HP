import React from 'react'
import Link from 'next/link'
import { getArticles } from '@/lib/newt'


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
              return (
                <li key={article._id}>
                  <Link href={`articles/${article.slug}`}>{article.title}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}



// export default function About() {
//   return (
//     <div className='m-4'>
//       <Work />
//       <Education />
//     </div>
//   )
// }
