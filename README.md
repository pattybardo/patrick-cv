# CV Website

A modern, brutalist-inspired personal CV website built with Next.js and TypeScript. Features a timeline-based layout showcasing experience, projects, and blog posts.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Content**: MDX with gray-matter
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
patrick-cv/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx      # Home page
│   │   ├── layout.tsx    # Root layout
│   │   ├── posts/        # Blog post routes
│   │   └── projects/     # Project detail routes
│   ├── components/       # React components
│   │   ├── Nav.tsx
│   │   ├── SidePanel.tsx
│   │   ├── Tag.tsx
│   │   ├── Timeline.tsx
│   │   └── MDXContent.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useSidePanel.ts
│   └── lib/             # Utilities and types
│       ├── content.ts   # Content loading functions
│       └── types.ts     # TypeScript types and Zod schemas
└── content/             # MDX content files
    ├── experience/      # Work experience
    ├── projects/        # Personal projects
    └── posts/          # Blog posts
```

## Adding Content

All content is stored as MDX files in the `content/` directory. Each content type requires specific frontmatter fields.

### Experience

Create a new `.mdx` file in `content/experience/`:

```mdx
---
title: "Senior Software Engineer"
company: "Company Name"
companyUrl: "https://company.com"
startDate: "2023-01"
endDate: "2024-05"
location: "Remote"
tags: ["TypeScript", "React", "Node.js"]
summary: "Brief description of the role and key achievements."
---

Detailed description of responsibilities, projects, and accomplishments in MDX format.
```

**Required fields**: `title`, `company`, `startDate`, `location`, `tags`, `summary`
**Optional fields**: `companyUrl`, `endDate` (omit for current position)

### Projects

Create a new `.mdx` file in `content/projects/`:

```mdx
---
title: "Project Name"
date: "2024-03"
tags: ["Next.js", "TypeScript"]
summary: "Brief project description."
status: "shipped"
link: "https://project-url.com"
---

Detailed project description, technical details, and outcomes.
```

**Required fields**: `title`, `date`, `tags`, `summary`, `status`
**Optional fields**: `link`
**Status values**: `"open-source"`, `"shipped"`, `"archived"`

### Blog Posts

Create a new `.mdx` file in `content/posts/`:

```mdx
---
title: "Post Title"
date: "2024-05-24"
tags: ["Programming", "Web Development"]
summary: "Brief post summary for previews."
readingTime: 5
---

Your blog post content in MDX format with full markdown support.
```

**Required fields**: `title`, `date`, `tags`, `summary`, `readingTime` (in minutes)

## Content Guidelines

- **Dates**: Use `YYYY-MM-DD` format for full dates, `YYYY-MM` for month precision
- **Slugs**: File names become URL slugs (e.g., `my-project.mdx` → `/projects/my-project`)
- **Tags**: Use consistent tag names across content types
- **MDX**: Supports all markdown syntax plus React components

## Development Tips

- Content is validated with Zod schemas in `src/lib/types.ts`
- Helper functions in `src/lib/content.ts` load and parse content
- Add custom React components in MDX files by importing them in `src/components/MDXContent.tsx`
- Styles follow a brutalist design philosophy with Tailwind utilities

## License

Private
