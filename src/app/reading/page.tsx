import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllReading } from '@/lib/content'
import { Tag } from '@/components/Tag'

export const metadata: Metadata = {
  title: 'Reading — Patrick Bardo',
  description: 'A shortlist of blogs, essays, and ideas worth returning to.',
}

export default function ReadingPage() {
  const reading = getAllReading()

  return (
    <main className="min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-100 inline-flex items-center gap-2 mb-8"
          >
            ← BACK
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted mb-3">READING</div>
          <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4 max-w-2xl">
            A shortlist worth returning to
          </h1>
          <p className="font-sans text-base text-text-muted max-w-lg leading-relaxed">
            Blogs, essays, and ideas that shaped how I think about building software. Kept short on purpose.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted sticky top-20">
              {reading.length} {reading.length === 1 ? 'ENTRY' : 'ENTRIES'}
            </div>
          </div>
          <div className="col-span-12 md:col-span-10 space-y-3">
            {reading.map(item => (
              <a
                key={item.slug}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-border p-5 hover:border-accent transition-all duration-100 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="font-sans text-base font-semibold text-text-primary group-hover:text-accent transition-colors duration-100">
                      {item.title}
                    </h2>
                    <p className="font-mono text-xs text-text-muted mt-1">{item.author}</p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted whitespace-nowrap shrink-0 group-hover:text-accent transition-colors duration-100">
                    {new URL(item.url).hostname.replace(/^www\./, '')} →
                  </span>
                </div>
                <p className="font-sans text-sm text-text-muted mt-3 leading-relaxed">
                  {item.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {item.tags.map(tag => <Tag key={tag} label={tag} />)}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
