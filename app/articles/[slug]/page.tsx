import { Button } from '@/components/ui/button'
import { getArticleBySlug, getArticles } from '@/lib/newt'
import type { Metadata } from 'next'
import Link from 'next/link'



type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const article = await getArticleBySlug(slug)

  return {
    title: article?.title,
    description: '投稿詳細ページです',
  }
}

export default async function Article({ params }: Props) {
  const { slug } = params
  const article = await getArticleBySlug(slug)
  const articles = await getArticles()

  if (!article) return null

  const currentIndex = articles.findIndex(a => a.slug === slug)
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null

  return (
    <div className="container p-2 mx-auto">
      <article className="prose dark:prose-invert mx-auto">
        <h2 className="text-start mx-4 text-md md:text-2xl my-4">{article.title}</h2>
        <div
          className="mx-4 font-sans article-body"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </article>
      <div className='flex my-8 items-center justify-center pt-4'>
        {prevArticle && (
          <Button asChild>
            <Link className='mx-2' href={`/articles/${prevArticle.slug}`}>前へ</Link>
          </Button>
        )}
        <Button asChild>
          <Link className='mx-2' href="/blog">記事一覧へ</Link>
        </Button>
        {nextArticle && (
          <Button asChild>
            <Link className='mx-2' href={`/articles/${nextArticle.slug}`}>次へ</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
