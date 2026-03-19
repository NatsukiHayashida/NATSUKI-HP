import type { Metadata } from 'next'
import { getAllConnections, getAllConnectionTags } from '@/lib/connections'
import { ConnectionList } from './_components/ConnectionList'

export const metadata: Metadata = {
  title: '接続ノート | Natsuki',
  description:
    '異なる領域の知識を意図的に接続する、日々の気づきのアーカイブ。',
}

export default function ConnectionsPage() {
  const notes = getAllConnections()
  const allTags = getAllConnectionTags()

  return (
    <main className="container py-8 pt-8 md:py-12 md:pt-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          接続ノート
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          異なる領域の知識を意図的に接続する、日々の気づきのアーカイブ。
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-8 md:mt-12">
        <ConnectionList notes={notes} allTags={allTags} />
      </div>
    </main>
  )
}
