'use client'

import { Suspense, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ExperienceNode, ProjectNode, PostNode } from './TimelineNode'
import { SidePanel } from './SidePanel'
import { useSidePanel } from '@/hooks/useSidePanel'
import type { Experience, Project, Post } from '@/lib/types'

interface TimelineProps {
  experience: Experience[]
  projects: Project[]
  posts: Post[]
}

function TimelineInner({ experience, projects, posts }: TimelineProps) {
  const { openParam, open, close } = useSidePanel()

  const panelData = useMemo(() => {
    if (!openParam) return null

    if (openParam.startsWith('project:')) {
      const slug = openParam.replace('project:', '')
      const item = projects.find(p => p.slug === slug)
      if (item) return { type: 'project' as const, data: item }
    } else if (openParam.startsWith('post:')) {
      const slug = openParam.replace('post:', '')
      const item = posts.find(p => p.slug === slug)
      if (item) return { type: 'post' as const, data: item }
    } else {
      const item = experience.find(e => e.slug === openParam)
      if (item) return { type: 'experience' as const, data: item }
    }
    return null
  }, [openParam, experience, projects, posts])

  type YearGroup = {
    year: number
    items: Array<
      | { kind: 'experience'; data: Experience }
      | { kind: 'project'; data: Project }
      | { kind: 'post'; data: Post }
    >
  }

  const timeline: YearGroup[] = useMemo(() => {
    const map = new Map<number, YearGroup>()

    const getOrCreate = (year: number): YearGroup => {
      if (!map.has(year)) map.set(year, { year, items: [] })
      return map.get(year)!
    }

    experience.forEach(e => {
      const year = parseInt(e.startDate.split('-')[0])
      getOrCreate(year).items.push({ kind: 'experience', data: e })
    })

    projects.forEach(p => {
      const year = parseInt(p.date.split('-')[0])
      getOrCreate(year).items.push({ kind: 'project', data: p })
    })

    posts.forEach(p => {
      const year = parseInt(p.date.split('-')[0])
      getOrCreate(year).items.push({ kind: 'post', data: p })
    })

    return Array.from(map.values()).sort((a, b) => b.year - a.year)
  }, [experience, projects, posts])

  return (
    <>
      <div className="relative" id="timeline">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-[0px]" style={{ left: '0px' }} />

        {timeline.map(group => (
          <div key={group.year} className="relative mb-12">
            <div className="flex items-center mb-6">
              <div className="w-px h-6 bg-border" />
              <div className="absolute -left-16 w-14 text-right">
                <span className="font-mono text-xs text-text-muted tracking-widest">{group.year}</span>
              </div>
              <div className="absolute left-0 w-2 h-px bg-border" />
            </div>

            <div className="space-y-3 pl-0">
              {group.items.map(item => {
                if (item.kind === 'experience') {
                  return (
                    <ExperienceNode
                      key={item.data.slug}
                      item={item.data}
                      onOpen={open}
                      isActive={openParam === item.data.slug}
                    />
                  )
                }
                if (item.kind === 'project') {
                  return (
                    <ProjectNode
                      key={item.data.slug}
                      item={item.data}
                      onOpen={open}
                      isActive={openParam === `project:${item.data.slug}`}
                    />
                  )
                }
                return (
                  <PostNode
                    key={item.data.slug}
                    item={item.data}
                    onOpen={open}
                    isActive={openParam === `post:${item.data.slug}`}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <SidePanel panelData={panelData} onClose={close} />
    </>
  )
}

export function Timeline(props: TimelineProps) {
  return (
    <Suspense fallback={null}>
      <TimelineInner {...props} />
    </Suspense>
  )
}
