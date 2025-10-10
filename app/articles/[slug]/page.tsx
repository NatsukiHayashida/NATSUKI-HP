import { Button } from '@/components/ui/button'
import { getPostBySlug, getAllPosts, getAllSlugs } from '@/lib/mdx'
import { parseISO8601Date } from '@/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import { ScrollToTop } from '@/components/scroll-to-top'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const post = getPostBySlug(slug)

  return {
    title: post?.title,
    description: post?.excerpt || '投稿詳細ページです',
  }
}

export default async function Article({ params }: Props) {
  const { slug } = params
  const post = getPostBySlug(slug)
  const posts = getAllPosts()

  if (!post) return null

  const currentIndex = posts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  const date = parseISO8601Date(post.date);
  
  return (
    <>
      <ScrollToTop />
      <main className="container px-4 py-8 pt-8 mx-auto md:py-12 md:pt-12">
      <article className="prose dark:prose-invert mx-auto">
        <h2 className="text-start mx-8 text-md md:text-2xl my-4">{post.title}</h2>
        {date && (
          <div className="text-right mx-4">
            <span className="text-muted-foreground mx-4 ">
              {date.toLocaleDateString('en-US', {
                timeZone: 'Asia/Tokyo',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="text-xs text-muted-foreground ml-4">
              {post.readingTime}
            </span>
          </div>
        )}
        <div className="mx-8 font-sans article-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeHighlight]}
            components={{
              h1: ({ ...props }) => <h1 className="text-2xl font-bold mb-4" {...props} />,
              h2: ({ ...props }) => <h2 className="text-xl font-semibold mb-3" {...props} />,
              h3: ({ ...props }) => <h3 className="text-lg font-medium mb-2" {...props} />,
              p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
              ul: ({ ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
              ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
              li: ({ ...props }) => <li className="mb-1" {...props} />,
              code: ({ ...props }) => (
                <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props} />
              ),
              pre: ({ ...props }) => (
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
      <div className='flex mb-8 items-center justify-center gap-2 mt-4'>
        {prevPost && (
          <Button asChild>
            <Link className='mx-2' href={`/articles/${prevPost.slug}`}>Previous</Link>
          </Button>
        )}
        <Button asChild>
          <Link className='mx-2' href="/blog">Blog Post</Link>
        </Button>
        {nextPost && (
          <Button asChild>
            <Link className='mx-2' href={`/articles/${nextPost.slug}`}>Next</Link>
          </Button>
        )}
      </div>
    </main>
    </>
  )
}