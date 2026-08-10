import Link from 'next/link'
import { getAllConnections } from '@/lib/connections'
import { getAllProjects } from '@/lib/projects'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const recentNotes = getAllConnections().slice(0, 5)
  const recentProjects = getAllProjects().slice(0, 4)

  return (
    <main>
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container max-w-5xl">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-6">
            Portfolio &amp; Notes
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-8">
            Natsuki
            <br />
            Hayashida
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mb-10">
            冷間鍛造の金型設計を本業に、AIとWebアプリケーションの開発に取り組んでいます。
            現場で見つけた課題を、自分の手でプロダクトに変えていく過程を記録しているサイトです。
          </p>
          <div className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
            金型設計 / AI開発 / Web開発
          </div>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="border-t">
        <div className="container max-w-5xl py-14 md:py-20">
          <div className="flex items-baseline justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Projects</h2>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="divide-y border-t border-b">
            {recentProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] items-baseline gap-x-5 md:gap-x-8 py-6 md:py-8"
              >
                <span className="font-mono text-sm md:text-base text-primary tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg md:text-2xl font-semibold leading-snug group-hover:text-primary transition-colors">
                    {project.title.split('―')[0].trim()}
                  </h3>
                  <p className="mt-1.5 text-xs md:text-sm text-muted-foreground line-clamp-2 max-w-2xl">
                    {project.excerpt}
                  </p>
                </div>
                <span className="hidden md:block font-mono text-xs tracking-wider uppercase text-muted-foreground whitespace-nowrap">
                  {project.category} · {project.date ? project.date.slice(0, 4) : ''}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="border-t">
        <div className="container max-w-5xl py-14 md:py-20">
          <div className="flex items-baseline justify-between mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Notes
              <span className="ml-3 text-sm md:text-base font-normal text-muted-foreground">
                接続ノート
              </span>
            </h2>
            <Link
              href="/connections"
              className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="divide-y border-t border-b">
            {recentNotes.map((note) => (
              <Link
                key={note.slug}
                href={`/connections/${note.slug}`}
                className="group flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 py-5"
              >
                <time className="font-mono text-xs text-muted-foreground tabular-nums shrink-0">
                  {new Date(note.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    timeZone: 'Asia/Tokyo',
                  })}
                </time>
                <h3 className="text-sm md:text-base font-medium group-hover:text-primary transition-colors">
                  {note.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t">
        <div className="container max-w-5xl py-16 md:py-24">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4">Contact</p>
          <p className="text-xl md:text-2xl font-semibold tracking-tight mb-6">
            お仕事のご相談・技術の話、お気軽にどうぞ。
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 border px-5 py-2.5 font-mono text-xs tracking-[0.15em] uppercase hover:border-primary hover:text-primary transition-colors"
          >
            Get in touch
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
