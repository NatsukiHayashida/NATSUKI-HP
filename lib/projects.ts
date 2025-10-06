import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Project } from '@/types/project'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export function getAllProjects(): Project[] {
  // content/projects ディレクトリが存在しない場合は空配列を返す
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)
  const allProjects = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(projectsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        content,
        category: data.category || 'general',
        tags: data.tags || [],
        coverImage: data.coverImage,
        demoUrl: data.demoUrl,
        githubUrl: data.githubUrl,
        technologies: data.technologies || [],
        role: data.role || '',
        duration: data.duration || '',
        outcomes: data.outcomes,
        challenges: data.challenges,
        learnings: data.learnings,
      } as Project
    })

  // 日付の降順でソート
  return allProjects.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      excerpt: data.excerpt || '',
      content,
      category: data.category || 'general',
      tags: data.tags || [],
      coverImage: data.coverImage,
      demoUrl: data.demoUrl,
      githubUrl: data.githubUrl,
      technologies: data.technologies || [],
      role: data.role || '',
      duration: data.duration || '',
      outcomes: data.outcomes,
      challenges: data.challenges,
      learnings: data.learnings,
    } as Project
  } catch (error) {
    return null
  }
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(projectsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}
