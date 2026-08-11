import Link from 'next/link'
import { getAllConnections } from '@/lib/connections'
import { getAllProjects } from '@/lib/projects'
import { ArrowRight } from 'lucide-react'
import DieSection from './components/die-section'

export default function Home() {
  const recentNotes = getAllConnections().slice(0, 5)
  const recentProjects = getAllProjects().slice(0, 4)

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid pointer-events-none" aria-hidden="true" />
        <div className="container max-w-5xl relative py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-6">
                Portfolio &amp; Notes
              </p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-8">
                Natsuki
                <br />
                Hayashida
              </h1>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg mb-8">
                冷間鍛造の金型設計を本業に、AIとWebアプリケーションの開発に取り組んでいます。
                現場で見つけた課題を、自分の手でプロダクトに変えていく過程を記録しているサイトです。
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 border border-primary text-primary px-5 py-2.5 font-mono text-xs tracking-[0.15em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  View work
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border px-5 py-2.5 font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                >
                  About
                </Link>
              </div>
            </div>

            <DieSection className="w-full max-w-[300px] sm:max-w-[340px] md:max-w-[420px] h-auto mx-auto md:mx-0 md:justify-self-end text-foreground/85" />
          </div>
        </div>
      </section>

      {/* Approach ― サイト全体の中心概念 */}
      <section className="border-t">
        <div className="container max-w-5xl py-14 md:py-20">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4">Approach</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-snug max-w-2xl">
            <span className="inline-block">現場で見つけて、</span>
            <span className="inline-block">技術で形にして、</span>
            <span className="inline-block">現場で確かめる</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            持っている技術の一覧ではなく、回し方の話です。課題は現場で見つかり、打ち手はAIを軸に
            現場の外の最新まで取りに行き、確かめる場所もまた現場になります。
          </p>
        </div>
      </section>

      {/* Selected Projects */}
      <section className="border-t">
        <div className="container max-w-5xl py-14 md:py-20">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Projects</h2>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <p className="mb-8 md:mb-12 text-sm md:text-base text-muted-foreground">
            実際に回した記録です。
          </p>
          <div className="divide-y border-t border-b">
            {recentProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group relative grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] items-start gap-x-5 md:gap-x-10 gap-y-3 py-6 md:py-8"
              >
                <span className="absolute left-0 top-0 bottom-0 w-px bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                <span className="font-mono text-sm md:text-base text-primary tabular-nums pt-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg md:text-2xl font-semibold leading-snug group-hover:text-primary transition-colors">
                    {project.title.split('―')[0].trim()}
                  </h3>
                  <p className="mt-1.5 text-xs md:text-sm text-muted-foreground line-clamp-2 max-w-xl leading-relaxed">
                    {project.excerpt}
                  </p>
                  <p className="mt-3 font-mono text-[11px] tracking-wider uppercase text-muted-foreground/70">
                    {project.category} · {project.date ? project.date.slice(0, 4) : ''}
                  </p>
                </div>
                {project.metric && (
                  <div className="col-start-2 md:col-start-3 md:text-right md:pt-1">
                    <p className="font-mono text-lg md:text-2xl tabular-nums whitespace-nowrap">
                      {project.metric.from && (
                        <>
                          <span className="text-muted-foreground/60 line-through decoration-1">
                            {project.metric.from}
                          </span>
                          <span className="text-muted-foreground/40 mx-2">→</span>
                        </>
                      )}
                      <span className="text-primary font-medium">{project.metric.to}</span>
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground/70">
                      {project.metric.label}
                    </p>
                  </div>
                )}
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
                className="group flex flex-col md:flex-row md:items-baseline gap-1.5 md:gap-8 py-5"
              >
                <time className="font-mono text-xs text-muted-foreground tabular-nums shrink-0">
                  {new Date(note.date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    timeZone: 'Asia/Tokyo',
                  })}
                </time>
                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-medium group-hover:text-primary transition-colors">
                    {note.title}
                  </h3>
                  {note.tags.length > 0 && (
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground/60 truncate">
                      {note.tags.slice(0, 4).map((tag) => `#${tag}`).join('  ')}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid pointer-events-none" aria-hidden="true" />
        <div className="container max-w-5xl relative py-16 md:py-24">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4">Contact</p>
          <p className="text-xl md:text-3xl font-semibold tracking-tight mb-6 max-w-xl leading-snug">
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
