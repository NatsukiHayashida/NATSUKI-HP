import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'
import { Metadata } from 'next'
import { EmptyState } from '@/components/ui/empty-state'
import { FolderOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    '金型設計・AI・Web開発のプロジェクト記録。課題からアプローチ、成果までの過程を残しています。',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main className="container max-w-5xl py-14 md:py-20">
      <header className="mb-10 md:mb-16">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4">
          Works
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Projects</h1>
        <p className="text-sm md:text-[15px] text-muted-foreground max-w-xl leading-relaxed">
          現場の課題から生まれたプロダクトの記録。課題、アプローチ、成果、学びを残しています。
        </p>
      </header>

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="準備中"
          description="プロジェクト記事を準備しています。"
          action={{
            label: '接続ノートを読む',
            href: '/connections',
          }}
        />
      ) : (
        <div className="divide-y border-t border-b">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] items-start gap-x-5 md:gap-x-10 gap-y-3 py-6 md:py-8"
            >
              <span className="absolute left-0 top-0 bottom-0 w-px bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
              <span className="font-mono text-sm md:text-[15px] text-primary tabular-nums pt-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h2 className="text-lg md:text-xl font-semibold leading-snug group-hover:text-primary transition-colors">
                  {project.title.split('―')[0].trim()}
                </h2>
                {project.title.includes('―') && (
                  <p className="mt-1 text-xs md:text-sm text-muted-foreground">
                    {project.title.split('―')[1].trim()}
                  </p>
                )}
                <p className="mt-2 text-xs md:text-sm text-muted-foreground line-clamp-2 max-w-2xl leading-relaxed">
                  {project.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground/70">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span>+{project.technologies.length - 5}</span>
                  )}
                </div>
              </div>
              <div className="col-start-2 md:col-start-3 md:text-right md:pt-1">
                {project.metric && (
                  <>
                    <p className="font-mono text-lg md:text-xl tabular-nums whitespace-nowrap">
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
                  </>
                )}
                <p className="mt-2 font-mono text-[11px] tracking-wider uppercase text-muted-foreground/70 whitespace-nowrap">
                  {project.category} · {project.date ? project.date.slice(0, 4) : ''}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
