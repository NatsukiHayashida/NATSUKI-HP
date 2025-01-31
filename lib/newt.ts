import 'server-only'
// クライアントコンポーネントがこのモジュールをインポートしようとすると、ビルドエラーが発生します。
// この機能は、機密コードや内部ビジネスロジックをクライアントに誤って漏洩させないようにするのに役立ちます。 
import { cache } from 'react'
import { createClient } from 'newt-client-js'
import type { Article } from '@/types/article'

const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + '',
  token: process.env.NEWT_CDN_API_TOKEN + '',
  apiType: 'cdn',
})

export const getArticles = cache(async () => {
  const { items } = await client.getContents<Article>({
    appUid: 'blog',
    modelUid: 'article',
    query: {
      select: ['_id', 'title', 'slug', 'body','date'],
    },
  })
  return items
})

export const getArticleBySlug = cache(async (slug: string) => {
  const article = await client.getFirstContent<Article>({
    appUid: 'blog',
    modelUid: 'article',
    query: {
      slug,
      select: ['_id', 'title', 'slug', 'body','date'],
    },
  })
  return article
})