# Codebase Structure

## Directory Overview

```
natsuki-hp/
├── app/                    # Next.js App Router pages
│   ├── components/         # Page-specific components
│   ├── about/             # About page
│   ├── blog/              # Blog listing page
│   ├── articles/[slug]/   # Blog post detail pages
│   ├── projects/          # Projects listing
│   ├── projects/[slug]/   # Project detail pages
│   ├── contact/           # Contact form page
│   ├── layout.tsx         # Root layout (theme provider)
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
│
├── components/            # Shared UI components
│   ├── ui/               # shadcn/ui components
│   └── scroll-to-top.tsx # Scroll to top button
│
├── lib/                   # Utility functions
│   ├── mdx.ts            # Blog MDX parsing
│   ├── projects.ts       # Project MDX parsing
│   ├── spam-protection.ts # Contact form spam detection
│   ├── utils.ts          # General utilities (cn, date parsing)
│   └── navigation.ts     # Navigation configuration
│
├── content/              # MDX content files
│   ├── blog/            # Blog posts (MDX)
│   └── projects/        # Project articles (MDX)
│
├── types/               # TypeScript type definitions
│   └── project.ts       # Project type interface
│
├── claudedocs/          # Project documentation
│   ├── CODE_ANALYSIS_REPORT.md
│   ├── RENEWAL_PLAN.md
│   ├── ABOUT_PAGE_PROPOSAL.md
│   ├── BLOG_POSTING_GUIDE.md
│   ├── CONTACT_PAGE_IMPLEMENTATION.md
│   ├── CONTACT_SETUP_GUIDE.md
│   ├── HANASEISAKUSYO_INTERVIEW.md
│   └── HANASEISAKUSYO_UPDATE_LOG.md
│
├── public/              # Static assets
│   └── images/         # Image files
│
└── Configuration files:
    ├── next.config.mjs      # Next.js config (CSP, security)
    ├── tailwind.config.ts   # Tailwind config (design tokens)
    ├── tsconfig.json        # TypeScript config
    ├── .eslintrc.json       # ESLint config
    ├── components.json      # shadcn/ui config
    └── CLAUDE.md           # Claude Code guidance
```

## Key Files and Their Purposes

### Core Application Files

**app/layout.tsx**
- Root layout with theme provider (next-themes)
- Metadata configuration
- Font loading (Geist Sans)
- suppressHydrationWarning for theme compatibility

**app/page.tsx**
- Home page with hero section
- Japanese localized content
- Introduces Natsuki's dual career (automotive + AI/Web)

### Content Management

**lib/mdx.ts**
- Blog post parsing with gray-matter
- Reading time calculation
- getAllPosts(), getPostBySlug(), getAllSlugs()
- BlogPost interface definition

**lib/projects.ts**
- Project parsing from MDX files
- Similar structure to blog posts
- getAllProjects(), getProjectBySlug()

### Security & Utilities

**lib/spam-protection.ts**
- Multi-layer spam detection
- Honeypot, Japanese text requirement
- URL/keyword detection, rate limiting
- Input sanitization with DOMPurify

**lib/utils.ts**
- cn() function for className merging
- parseDate() for ja-JP date formatting
- Utility functions for common tasks

### Page Components

**app/blog/page.tsx**
- Blog listing with card layout
- ja-JP date formatting (Asia/Tokyo)
- Reading time display
- Proper h1/h2 hierarchy

**app/articles/[slug]/page.tsx**
- Blog post detail page
- Dynamic route with generateStaticParams()
- ReactMarkdown with syntax highlighting
- Metadata generation

**app/projects/[slug]/page.tsx**
- Project detail page
- Custom ReactMarkdown components:
  - Subtitle auto-styling (― separator)
  - Bold text enhancement
  - List styling (no markers)
  - Next.js Image integration

**app/contact/page.tsx**
- EmailJS integration
- Multi-layer spam protection
- Form validation and error handling
- Success/error state management

### Component Architecture

**app/components/header.tsx**
- Main header (max-w-5xl)
- Desktop and mobile navigation
- Theme toggle button

**app/components/mobile-nav.tsx**
- Mobile menu with Sheet component
- Responsive navigation

**components/scroll-to-top.tsx**
- Client component with scroll detection
- Appears after scrolling 300px
- Smooth scroll to top functionality

## Data Flow

### Blog Posts
1. MDX files in `content/blog/`
2. Parsed by `lib/mdx.ts` (gray-matter + reading-time)
3. Listed in `app/blog/page.tsx`
4. Detailed view in `app/articles/[slug]/page.tsx`

### Projects
1. MDX files in `content/projects/`
2. Parsed by `lib/projects.ts`
3. Listed in `app/projects/page.tsx`
4. Detailed view in `app/projects/[slug]/page.tsx`

### Contact Form
1. Form submission in `app/contact/page.tsx`
2. Spam check via `lib/spam-protection.ts`
3. Email sent via EmailJS
4. Success/error feedback to user

## Static Generation Strategy
- All blog posts: Pre-rendered at build time
- All project pages: Pre-rendered at build time
- dynamicParams = false: 404 for undefined routes
- generateStaticParams(): Build-time path generation
