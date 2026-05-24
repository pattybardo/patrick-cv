'use client'

import { Tag } from './Tag'
import type { Experience, Project, Post } from '@/lib/types'

interface ExperienceNodeProps {
  item: Experience
  onOpen: (slug: string) => void
  isActive: boolean
}

export function ExperienceNode({ item, onOpen, isActive }: ExperienceNodeProps) {
  const endLabel = item.endDate
    ? item.endDate.split('-')[0]
    : 'PRESENT'
  const startLabel = item.startDate.split('-')[0]
  const dateRange = startLabel === endLabel ? startLabel : `${startLabel}–${endLabel}`

  return (
    <div
      className={`group relative ml-8 border transition-all duration-100 cursor-pointer ${
        isActive
          ? 'border-accent bg-surface-raised'
          : 'border-border hover:border-accent hover:translate-x-0.5'
      }`}
      onClick={() => onOpen(item.slug)}
    >
      <div className="absolute -left-[41px] top-5 w-3 h-3 border-2 bg-surface transition-colors duration-100 border-border group-hover:border-accent group-hover:bg-accent" style={{ transform: 'translate(-50%, -50%)', left: '-41px' }} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="font-sans text-base font-semibold text-text-primary leading-tight">{item.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="font-mono text-xs text-accent hover:underline underline-offset-2"
                >
                  {item.company}
                </a>
              ) : (
                <span className="font-mono text-xs text-accent">{item.company}</span>
              )}
              <span className="text-border">·</span>
              <span className="font-mono text-xs text-text-muted">{item.location}</span>
            </div>
          </div>
          <span className="font-mono text-xs text-text-muted whitespace-nowrap shrink-0">{dateRange}</span>
        </div>
        <p className="font-sans text-sm text-text-muted mb-3 leading-relaxed">{item.summary}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 5).map(tag => <Tag key={tag} label={tag} />)}
          </div>
          <button className="font-mono text-[10px] uppercase tracking-widest text-text-muted group-hover:text-accent transition-colors duration-100 whitespace-nowrap ml-4">
            READ MORE →
          </button>
        </div>
      </div>
    </div>
  )
}

interface ProjectNodeProps {
  item: Project
  onOpen: (slug: string) => void
  isActive: boolean
}

export function ProjectNode({ item, onOpen, isActive }: ProjectNodeProps) {
  return (
    <div
      className={`group relative ml-8 border transition-all duration-100 cursor-pointer ${
        isActive
          ? 'border-accent bg-surface-raised'
          : 'border-border hover:border-accent hover:translate-x-0.5'
      }`}
      onClick={() => onOpen(`project:${item.slug}`)}
    >
      <div className="absolute -left-[41px] top-4 w-2 h-2 border border-border bg-surface transition-colors duration-100 group-hover:border-accent" style={{ left: '-41px', transform: 'translate(-50%, -50%) rotate(45deg)' }} />
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">PROJECT</span>
            <Tag label={item.status} variant="status" />
          </div>
          <h4 className="font-sans text-sm font-medium text-text-primary">{item.title}</h4>
          <p className="font-sans text-xs text-text-muted mt-0.5 truncate">{item.summary}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex flex-wrap gap-1 justify-end">
            {item.tags.slice(0, 3).map(tag => <Tag key={tag} label={tag} />)}
          </div>
          <button className="font-mono text-[10px] uppercase tracking-widest text-text-muted group-hover:text-accent transition-colors duration-100">
            →
          </button>
        </div>
      </div>
    </div>
  )
}

interface PostNodeProps {
  item: Post
  onOpen: (slug: string) => void
  isActive: boolean
}

export function PostNode({ item, onOpen, isActive }: PostNodeProps) {
  return (
    <div
      className={`group relative ml-8 border transition-all duration-100 cursor-pointer ${
        isActive
          ? 'border-accent bg-surface-raised'
          : 'border-border hover:border-accent hover:translate-x-0.5'
      }`}
      onClick={() => onOpen(`post:${item.slug}`)}
    >
      <div className="absolute top-4 w-1.5 h-1.5 bg-text-muted transition-colors duration-100 group-hover:bg-accent" style={{ left: '-41px', transform: 'translate(-50%, -50%)' }} />
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">WRITING</span>
            <span className="font-mono text-[9px] text-text-muted">{item.readingTime} MIN READ</span>
          </div>
          <h4 className="font-sans text-sm font-medium text-text-primary">{item.title}</h4>
        </div>
        <button className="font-mono text-[10px] uppercase tracking-widest text-text-muted group-hover:text-accent transition-colors duration-100 shrink-0">
          READ →
        </button>
      </div>
    </div>
  )
}
