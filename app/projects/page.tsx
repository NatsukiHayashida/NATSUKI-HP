import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects | Natsuki Portfolio',
  description: 'Explore my development projects, from web applications to AI integrations. Each project showcases my skills, learnings, and technical growth.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-muted-foreground mb-12">
          A collection of projects I&apos;ve built, showcasing my skills in web development, AI integration, and problem-solving.
        </p>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block"
              >
                <article className="border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium">
                          {project.category}
                        </span>
                        <span>{project.duration}</span>
                        <span>{project.date}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2 py-1 text-muted-foreground text-xs">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
