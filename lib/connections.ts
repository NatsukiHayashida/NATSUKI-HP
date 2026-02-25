import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ConnectionNote } from '@/types/connection'

const connectionsDirectory = path.join(process.cwd(), 'content/connections')

export function getAllConnections(): ConnectionNote[] {
  if (!fs.existsSync(connectionsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(connectionsDirectory)
  const allNotes = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(connectionsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        tags: data.tags || [],
        connections: data.connections || [],
        content,
      } as ConnectionNote
    })

  return allNotes.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getConnectionBySlug(slug: string): ConnectionNote | null {
  try {
    const fullPath = path.join(connectionsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      tags: data.tags || [],
      connections: data.connections || [],
      content,
    } as ConnectionNote
  } catch {
    return null
  }
}

export function getConnectionSlugs(): string[] {
  if (!fs.existsSync(connectionsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(connectionsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}

export function getAllConnectionTags(): string[] {
  const notes = getAllConnections()
  const tagSet = new Set<string>()
  notes.forEach((note) => {
    note.tags.forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}
