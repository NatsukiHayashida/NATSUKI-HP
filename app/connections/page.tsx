import type { Metadata } from 'next'
import { getAllConnections, getAllConnectionTags } from '@/lib/connections'
import { ConnectionList } from './_components/ConnectionList'
import NetworkBanner from './_components/NetworkBanner'

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
      <NetworkBanner
        title="接続ノート"
        subtitle="異なる領域の知識を意図的に接続する、日々の気づきのアーカイブ。"
        minHeightPx={240}
      />

      <div className="max-w-4xl mx-auto mt-4 md:mt-8">
        <ConnectionList notes={notes} allTags={allTags} />
      </div>
    </main>
  )
}
