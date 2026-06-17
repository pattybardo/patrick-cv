'use client'

import Link from 'next/link'

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
        <Link href="/" className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted hover:text-accent transition-colors duration-100">
          P.BARDO
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/#timeline"
            className="font-mono text-[11px] uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors duration-100"
          >
            Work
          </Link>
          <Link
            href="/posts"
            className="font-mono text-[11px] uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors duration-100"
          >
            Writing
          </Link>
          <Link
            href="/reading"
            className="font-mono text-[11px] uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors duration-100"
          >
            Reading
          </Link>
          <a
            href="mailto:patryk.bardo@gmail.com"
            className="font-mono text-[11px] uppercase tracking-widest border border-border px-3 py-1 text-text-muted hover:border-accent hover:text-accent transition-all duration-100"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
