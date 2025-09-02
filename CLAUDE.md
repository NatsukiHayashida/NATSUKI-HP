# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Natsuki's personal portfolio website built with Next.js 14.2.1, featuring:
- Portfolio pages (about, work, education, contact)
- Blog functionality powered by Newt CMS
- AI chat feature using OpenAI GPT-4o
- Dark/light theme support
- Google Analytics integration

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Key Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **CMS**: Newt CMS for blog content
- **AI Integration**: Vercel AI SDK with OpenAI
- **Theme**: next-themes for dark/light mode
- **Markdown**: react-markdown with syntax highlighting and KaTeX math support

### Directory Structure
- `app/` - Next.js App Router pages and components
  - `api/chat/` - AI chat endpoint
  - `components/` - Page-specific components (header, footer, nav, etc.)
  - `articles/[slug]/` - Dynamic blog article pages
- `components/ui/` - Reusable shadcn/ui components
- `lib/` - Utilities and external service clients
- `types/` - TypeScript type definitions

### Key Integrations
- **Newt CMS**: Blog content managed via `lib/newt.ts` with caching
- **OpenAI Chat**: Streaming chat API at `/api/chat/route.ts`
- **Google Analytics**: Configured with tracking ID G-8D9W92XLJY

### Environment Variables Required
- `NEWT_SPACE_UID` - Newt CMS space identifier
- `NEWT_CDN_API_TOKEN` - Newt CMS API token
- `OPENAI_API_KEY` - OpenAI API key for chat feature

## Code Patterns

- Server components are preferred; client components marked with 'use client'
- CMS functions in `lib/newt.ts` use React cache() and 'server-only' (being migrated to MDX)
- UI components follow shadcn/ui patterns with cn() utility for class merging
- Responsive design with mobile navigation component

## Blog System (MDX Migration)

**Migration from Newt CMS to MDX completed**

### MDX Blog Structure
- `content/blog/` - MDX blog post files
- `lib/mdx.ts` - File-based blog functions (getAllPosts, getPostBySlug, getAllSlugs)
- `types/blog.ts` - TypeScript interfaces for blog posts

### Blog Post Format
```markdown
---
title: "Post Title"
date: "2025-01-15"
slug: "post-slug"  
excerpt: "Post summary"
---

# Content in Markdown format
```

### Features
- Reading time calculation
- Syntax highlighting with rehype-highlight
- Math support with KaTeX
- Static generation with Next.js

## Contact Form (EmailJS Migration)

**Migration from Newt Forms to EmailJS with spam protection**

### Email System
- `@emailjs/browser` for form submissions
- `lib/spam-protection.ts` - Comprehensive spam filtering
- Environment variables required for EmailJS configuration

### Spam Protection Features
- **Honeypot field** - Bot detection
- **Japanese language requirement** - Blocks non-Japanese messages
- **URL detection** - Prevents link spam
- **Spam keyword filtering** - Common spam terms
- **Rate limiting** - 1-minute cooldown between submissions
- **Content validation** - Length limits and sanitization

### Environment Variables Required (Additional)
```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
NEXT_PUBLIC_CONTACT_EMAIL=your-email@domain.com
```

## Documentation Files

- `BLOG_POSTING_GUIDE.md` - Instructions for creating MDX blog posts
- `EMAILJS_SETUP_GUIDE.md` - EmailJS configuration and spam protection setup