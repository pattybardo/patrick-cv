import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ExperienceSchema, ProjectSchema, PostSchema, ReadingSchema } from './types'
import type { Experience, Project, Post, Reading } from './types'

const contentDir = path.join(process.cwd(), 'content')

function readMDXFiles(dir: string): { slug: string; content: string; data: Record<string, unknown> }[] {
  const fullDir = path.join(contentDir, dir)
  if (!fs.existsSync(fullDir)) return []
  return fs.readdirSync(fullDir)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(fullDir, filename), 'utf-8')
      const { content, data } = matter(raw)
      return { slug, content, data }
    })
}

export function getAllExperience(): Experience[] {
  return readMDXFiles('experience')
    .map(({ slug, content, data }) => ({
      ...ExperienceSchema.parse(data),
      slug,
      content,
    }))
    .sort((a, b) => b.startDate.localeCompare(a.startDate))
}

export function getExperienceBySlug(slug: string): Experience | null {
  const all = getAllExperience()
  return all.find(e => e.slug === slug) ?? null
}

export function getAllProjects(): Project[] {
  return readMDXFiles('projects')
    .map(({ slug, content, data }) => ({
      ...ProjectSchema.parse(data),
      slug,
      content,
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getProjectBySlug(slug: string): Project | null {
  const all = getAllProjects()
  return all.find(p => p.slug === slug) ?? null
}

export function getAllPosts(): Post[] {
  return readMDXFiles('posts')
    .map(({ slug, content, data }) => ({
      ...PostSchema.parse(data),
      slug,
      content,
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(slug: string): Post | null {
  const all = getAllPosts()
  return all.find(p => p.slug === slug) ?? null
}

export function getAllReading(): Reading[] {
  return readMDXFiles('reading')
    .map(({ slug, content, data }) => ({
      ...ReadingSchema.parse(data),
      slug,
      content,
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getYearFromDate(date: string): number {
  return parseInt(date.split('-')[0], 10)
}
