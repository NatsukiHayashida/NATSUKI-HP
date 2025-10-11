import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'
import { Metadata } from 'next'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'
import { FolderOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Projects | Natsuki Portfolio',
  description: 'Explore my development projects, from web applications to AI integrations. Each project showcases my skills, learnings, and technical growth.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main className="container py-8 pt-8 md:py-12 md:pt-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Projects</h1>
        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-12">
          A collection of projects I&apos;ve built, showcasing my skills in web development, AI integration, and problem-solving.
        </p>

        {projects.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No projects yet"
            description="Projects are currently being prepared. Check back soon to see my latest work!"
            action={{
              label: "View Blog",
              href: "/blog"
            }}
          />
        ) : (
          <div className="grid gap-4 md:gap-8">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
              >
                <Card variant="interactive" className="overflow-hidden">
                  <CardHeader className="pb-3 md:pb-6">
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                      <Badge variant="tag" className="text-xs">{project.category}</Badge>
                      <span className="text-xs text-muted-foreground">{project.duration}</span>
                      <span className="text-xs text-muted-foreground">{project.date}</span>
                    </div>
                    <CardTitle className="text-lg md:text-2xl mb-1.5 md:mb-2 leading-tight">{project.title}</CardTitle>
                    <CardDescription className="text-xs md:text-base line-clamp-2 md:line-clamp-3 leading-relaxed">
                      {project.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs px-2 py-0.5">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-muted-foreground text-xs self-center">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
