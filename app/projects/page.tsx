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
    <main className="container py-12 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-muted-foreground mb-12">
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
          <div className="grid gap-8">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
              >
                <Card variant="interactive">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="tag">{project.category}</Badge>
                      <span className="text-sm text-muted-foreground">{project.duration}</span>
                      <span className="text-sm text-muted-foreground">{project.date}</span>
                    </div>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-muted-foreground text-xs self-center">
                          +{project.technologies.length - 5} more
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
