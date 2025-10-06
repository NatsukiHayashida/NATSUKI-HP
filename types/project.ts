export interface Project {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  coverImage?: string
  demoUrl?: string
  githubUrl?: string
  technologies: string[]
  role: string
  duration: string
  outcomes?: string[]
  challenges?: string[]
  learnings?: string[]
}
