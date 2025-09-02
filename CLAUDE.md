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
- CMS functions in `lib/newt.ts` use React cache() and 'server-only'
- UI components follow shadcn/ui patterns with cn() utility for class merging
- Responsive design with mobile navigation component