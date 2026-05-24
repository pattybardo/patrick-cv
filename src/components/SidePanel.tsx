'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { MDXContent } from './MDXContent'
import { Tag } from './Tag'
import type { Experience, Project, Post } from '@/lib/types'

type PanelData =
  | { type: 'experience'; data: Experience }
  | { type: 'project'; data: Project }
  | { type: 'post'; data: Post }
  | null

interface SidePanelProps {
  panelData: PanelData
  onClose: () => void
}

function PanelHeader({ panelData, onClose }: { panelData: NonNullable<PanelData>; onClose: () => void }) {
  if (panelData.type === 'experience') {
    const e = panelData.data
    return (
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">EXPERIENCE</div>
            <h2 className="font-sans text-xl font-bold text-text-primary leading-tight">{e.title}</h2>
            <div className="flex items-center gap-2 mt-1.5">
              {e.companyUrl ? (
                <a href={e.companyUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-accent hover:underline">
                  {e.company}
                </a>
              ) : (
                <span className="font-mono text-sm text-accent">{e.company}</span>
              )}
              <span className="text-border">·</span>
              <span className="font-mono text-xs text-text-muted">{e.location}</span>
            </div>
            <div className="font-mono text-xs text-text-muted mt-1">
              {e.startDate} → {e.endDate ?? 'PRESENT'}
            </div>
          </div>
          <CloseButton onClose={onClose} />
        </div>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {e.tags.map(tag => <Tag key={tag} label={tag} />)}
        </div>
      </div>
    )
  }

  if (panelData.type === 'project') {
    const p = panelData.data
    return (
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">PROJECT</div>
            <h2 className="font-sans text-xl font-bold text-text-primary leading-tight">{p.title}</h2>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="font-mono text-xs text-text-muted">{p.date}</span>
              <Tag label={p.status} variant="status" />
            </div>
          </div>
          <CloseButton onClose={onClose} />
        </div>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {p.tags.map(tag => <Tag key={tag} label={tag} />)}
        </div>
        <Link
          href={`/projects/${p.slug}`}
          className="inline-block mt-4 font-mono text-[10px] uppercase tracking-widest border border-border px-3 py-1.5 text-text-muted hover:border-accent hover:text-accent transition-all duration-100"
        >
          FULL PAGE →
        </Link>
      </div>
    )
  }

  const post = panelData.data as Post
  return (
    <div className="p-6 border-b border-border">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">WRITING</div>
          <h2 className="font-sans text-xl font-bold text-text-primary leading-tight">{post.title}</h2>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="font-mono text-xs text-text-muted">{post.date}</span>
            <span className="font-mono text-xs text-text-muted">· {post.readingTime} MIN READ</span>
          </div>
        </div>
        <CloseButton onClose={onClose} />
      </div>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {post.tags.map(tag => <Tag key={tag} label={tag} />)}
      </div>
      <Link
        href={`/posts/${post.slug}`}
        className="inline-block mt-4 font-mono text-[10px] uppercase tracking-widest border border-border px-3 py-1.5 text-text-muted hover:border-accent hover:text-accent transition-all duration-100"
      >
        FULL PAGE →
      </Link>
    </div>
  )
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="font-mono text-text-muted hover:text-accent transition-colors duration-100 text-lg leading-none shrink-0 mt-0.5"
      aria-label="Close panel"
    >
      ✕
    </button>
  )
}

export function SidePanel({ panelData, onClose }: SidePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  return (
    <AnimatePresence>
      {panelData && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-surface/70 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            key="panel"
            ref={panelRef}
            initial={{ x: 480 }}
            animate={{ x: 0 }}
            exit={{ x: 480 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[480px] bg-surface border-l border-border flex flex-col overflow-hidden"
          >
            <PanelHeader panelData={panelData} onClose={onClose} />
            <div className="flex-1 overflow-y-auto p-6">
              <MDXContent source={panelData.data.content} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
