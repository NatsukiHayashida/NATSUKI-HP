import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects'
import { Metadata } from 'next'
import { ExternalLink, Github } from 'lucide-react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import { ScrollToTop } from '@/components/scroll-to-top'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github-dark.css'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Projects`,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      type: 'article',
      publishedTime: project.date,
      tags: project.tags,
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <ScrollToTop />
      <main className="container py-8 pt-8 md:py-12 md:pt-12">
        <article className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8 text-xs md:text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          {' / '}
          <Link href="/projects" className="hover:text-foreground">
            Projects
          </Link>
          {' / '}
          <span className="text-foreground">{project.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8 md:mb-12">
          <h1 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
            {project.title.includes('―') ? (
              <>
                <span>{project.title.split('―')[0]}</span>
                <br />
                <span className="text-lg md:text-2xl font-normal text-muted-foreground">
                  {project.title.split('―')[1]}
                </span>
              </>
            ) : (
              project.title
            )}
          </h1>

          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
            <span className="px-2 py-0.5 md:px-3 md:py-1 bg-primary text-primary-foreground rounded-md font-medium text-xs md:text-sm">
              {project.category}
            </span>
            <span className="text-xs md:text-sm">{project.role}</span>
            <span className="text-xs md:text-sm">{project.duration}</span>
            <span className="text-xs md:text-sm">{project.date}</span>
          </div>

          <p className="text-sm md:text-lg text-muted-foreground mb-4 md:mb-6 leading-relaxed">{project.excerpt}</p>

          {/* External Links */}
          {(project.demoUrl || project.githubUrl) && (
            <div className="flex gap-4">
              {project.demoUrl && (
                <Link
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Demo
                </Link>
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </Link>
              )}
            </div>
          )}
        </header>

        {/* Technologies */}
        {project.technologies.length > 0 && (
          <section className="mb-8 md:mb-12 p-4 md:p-6 bg-muted rounded-xl">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 md:px-3 md:py-1 bg-background border border-border rounded-md text-xs md:text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Main Content */}
        <div className="prose prose-sm md:prose-lg dark:prose-invert max-w-none mb-8 md:mb-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex, rehypeHighlight]}
            components={{
              h2: ({ node, children, ...props }) => {
                const text = children?.toString() || ''
                if (text.includes('―')) {
                  const [main, sub] = text.split('―')
                  return (
                    <h2 {...props}>
                      <span>{main}</span>
                      <br />
                      <span className="text-base md:text-lg font-normal text-muted-foreground">
                        {sub}
                      </span>
                    </h2>
                  )
                }
                return <h2 {...props}>{children}</h2>
              },
              img: ({ node, ...props }) => {
                const src = props.src || ''
                const alt = props.alt || ''

                // 画像サイズの推定（4:3アスペクト比）
                const width = 1200
                const height = 900

                return (
                  <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={props.className}
                    style={{ width: '100%', height: 'auto' }}
                  />
                )
              }
            }}
          >
            {project.content}
          </ReactMarkdown>
        </div>

        {/* Outcomes */}
        {project.outcomes && project.outcomes.length > 0 && (
          <section className="mb-8 md:mb-12 p-4 md:p-6 bg-muted rounded-xl">
            <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4">Outcomes & Results</h2>
            <ul className="space-y-2 text-sm md:text-base">
              {project.outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 md:mt-1 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="mb-8 md:mb-12 p-4 md:p-6 bg-muted rounded-xl">
            <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4">Challenges Overcome</h2>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              {project.challenges.map((challenge, index) => (
                <li key={index} className="pl-2 md:pl-4 border-l-2 border-primary leading-relaxed">
                  {challenge}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Learnings */}
        {project.learnings && project.learnings.length > 0 && (
          <section className="mb-8 md:mb-12 p-4 md:p-6 bg-muted rounded-xl">
            <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-4">Key Learnings</h2>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
              {project.learnings.map((learning, index) => (
                <li key={index} className="pl-2 md:pl-4 border-l-2 border-accent leading-relaxed">
                  {learning}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tags */}
        {project.tags.length > 0 && (
          <footer className="pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </footer>
        )}

        {/* Back to Projects */}
        <div className="mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>
      </article>
    </main>
    </>
  )
}
