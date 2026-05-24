import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/content'
import { MDXContent } from '@/components/MDXContent'
import { Tag } from '@/components/Tag'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return { title: `${post.title} — Patrick Bardo`, description: post.summary }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

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
          <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-3">WRITING</div>
          <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4 max-w-2xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-text-muted">{post.date}</span>
            <span className="font-mono text-xs text-text-muted">· {post.readingTime} MIN READ</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map(tag => <Tag key={tag} label={tag} />)}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <MDXContent source={post.content} />
          </div>
        </div>
      </div>
    </main>
  )
}
