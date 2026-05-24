import { MDXRemote } from 'next-mdx-remote/rsc'
import { Tag } from './Tag'

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="font-sans text-3xl font-bold tracking-tight text-text-primary mb-6 mt-10 first:mt-0 pb-3 border-b border-border" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-sans text-xl font-semibold uppercase tracking-widest text-text-primary mb-4 mt-8 first:mt-0" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-sans text-base font-semibold text-text-primary mb-3 mt-6" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="font-sans text-[15px] leading-relaxed text-text-muted mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 space-y-2 list-decimal list-inside" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="font-sans text-[15px] text-text-muted flex gap-2">
      <span className="text-accent mt-1.5 shrink-0 text-xs">▪</span>
      <span {...props} />
    </li>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="font-mono text-[13px] text-accent bg-surface-raised px-1.5 py-0.5 border border-border" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="font-mono text-[13px] bg-surface-raised border border-border p-4 mb-4 overflow-x-auto text-text-primary leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-2 border-accent pl-4 mb-4 text-text-muted italic" {...props} />
  ),
  hr: () => <hr className="border-border my-8" />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-accent underline underline-offset-2 hover:no-underline" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-text-primary font-semibold" {...props} />
  ),
  Tag,
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="mdx-content">
      <MDXRemote source={source} components={components} />
    </div>
  )
}
