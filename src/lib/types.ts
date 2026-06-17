import { z } from 'zod'

export const ExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  companyUrl: z.string().url().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  location: z.string(),
  tags: z.array(z.string()),
  summary: z.string(),
})

export const ProjectSchema = z.object({
  title: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  summary: z.string(),
  status: z.enum(['open-source', 'shipped', 'archived']),
  link: z.string().url().optional(),
})

export const PostSchema = z.object({
  title: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  summary: z.string(),
  readingTime: z.number(),
})

export const ReadingSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  author: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  summary: z.string(),
})

export type Experience = z.infer<typeof ExperienceSchema> & { slug: string; content: string }
export type Project = z.infer<typeof ProjectSchema> & { slug: string; content: string }
export type Post = z.infer<typeof PostSchema> & { slug: string; content: string }
export type Reading = z.infer<typeof ReadingSchema> & { slug: string; content: string }

export type TimelineItem =
  | { type: 'experience'; data: Experience }
  | { type: 'project'; data: Project }
  | { type: 'post'; data: Post }
