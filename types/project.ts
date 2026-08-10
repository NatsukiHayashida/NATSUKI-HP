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
  /** 一覧で大きく見せる代表値。before/after の2値、または単値 */
  metric?: { label: string; from?: string; to: string }
}
