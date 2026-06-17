import { getAllExperience, getAllProjects, getAllPosts } from '@/lib/content'
import { Timeline } from '@/components/Timeline'
import { MDXContent } from '@/components/MDXContent'

export default function Home() {
  const experience = getAllExperience()
  const projects = getAllProjects()
  const posts = getAllPosts()

  const currentRole = experience.find(e => !e.endDate)

  const renderedContent: Record<string, React.ReactNode> = {}
  experience.forEach(e => {
    renderedContent[e.slug] = <MDXContent source={e.content} />
  })
  projects.forEach(p => {
    renderedContent[`project:${p.slug}`] = <MDXContent source={p.content} />
  })
  posts.forEach(p => {
    renderedContent[`post:${p.slug}`] = <MDXContent source={p.content} />
  })

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted mb-6">
              CURRICULUM VITAE — LIVING DOCUMENT
            </div>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-text-primary leading-[0.95] mb-6">
              PATRICK
              <br />
              <span className="text-accent">BARDO</span>
            </h1>
            {currentRole && (
              <p className="font-mono text-sm text-text-muted mb-2">
                {currentRole.title} <span className="text-accent">@{currentRole.company}</span>
              </p>
            )}
            <p className="font-sans text-base text-text-muted max-w-lg mt-4 leading-relaxed">
              I engineer platforms and automated systems that let developers focus purely on their code. By translating unarticulated user needs into simple, highly extensible infrastructure, I ensure our teams can move fast without breaking a sweat.
            </p>
            <p className="font-mono text-xs text-text-muted mt-2 tracking-wide">
              Gothenburg, Sweden
            </p>
            <div className="flex items-center gap-6 mt-8">
              <a
                href="#timeline"
                className="font-mono text-[11px] uppercase tracking-widest border border-border px-4 py-2 text-text-muted hover:border-accent hover:text-accent transition-all duration-100 group"
              >
                ↓ SEE WORK
              </a>
              <a
                href="https://github.com/pattybardo"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-widest text-text-muted hover:text-text-primary transition-colors duration-100"
              >
                GITHUB →
              </a>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-border">
            <div>
              <div className="font-mono text-2xl font-semibold text-accent">{experience.length}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mt-0.5">Roles</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-semibold text-accent">{projects.length}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mt-0.5">Projects</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-semibold text-accent">{posts.length}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mt-0.5">Posts</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-semibold text-accent">
                {currentRole
                  ? `${new Date().getFullYear() - parseInt(experience[experience.length - 1]?.startDate?.split('-')[0] ?? '2016')}+`
                  : '—'}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mt-0.5">Years</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted sticky top-20">
              TIMELINE
            </div>
          </div>
          <div className="col-span-12 md:col-span-10">
            <div className="pl-16 relative">
              <Timeline experience={experience} projects={projects} posts={posts} renderedContent={renderedContent} />
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted sticky top-20">
                EDUCATION
              </div>
            </div>
            <div className="col-span-12 md:col-span-10 space-y-3">
              <div className="border border-border p-5 hover:border-accent transition-all duration-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-sans text-base font-semibold text-text-primary">University of Waterloo</h3>
                    <p className="font-sans text-sm text-text-muted mt-0.5">Bachelor of Engineering, Nanotechnology Engineering</p>
                  </div>
                  <span className="font-mono text-xs text-text-muted whitespace-nowrap shrink-0">2014–2019</span>
                </div>
              </div>
              <div className="border border-border p-5 hover:border-accent transition-all duration-100">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-sans text-base font-semibold text-text-primary">Technische Universiteit Delft</h3>
                    <p className="font-sans text-sm text-text-muted mt-0.5">International Exchange — Chemical Engineering</p>
                  </div>
                  <span className="font-mono text-xs text-text-muted whitespace-nowrap shrink-0">2017–2018</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            PATRICK BARDO — LAST UPDATED {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }).toUpperCase()}
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/pattybardo" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-100">
              GITHUB
            </a>
            <a href="mailto:patryk.bardo@gmail.com" className="font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-100">
              EMAIL
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
