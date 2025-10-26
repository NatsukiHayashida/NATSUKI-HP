# Code Style and Conventions

## TypeScript Configuration
- **Strict mode**: Enabled (`"strict": true`)
- **Path aliases**: `@/*` maps to project root
- **Target**: ES2017
- **Module**: ESNext with bundler resolution

## Naming Conventions
- **Files**: kebab-case for components (`mobile-nav.tsx`, `scroll-to-top.tsx`)
- **Components**: PascalCase (`MobileNav`, `ScrollToTop`)
- **Functions**: camelCase (`getAllPosts`, `getPostBySlug`)
- **Constants**: UPPER_SNAKE_CASE for true constants
- **Types/Interfaces**: PascalCase (`BlogPost`, `Project`)

## Component Patterns

### Server Components (Default)
- All components in `app/` directory are Server Components by default
- No `'use client'` directive needed
- Used for: Static pages, data fetching, SEO optimization

### Client Components (Explicit)
- Require `'use client'` directive at top of file
- Used for: Forms, interactive elements, hooks (useState, useEffect)
- Examples: `contact/page.tsx`, `scroll-to-top.tsx`, `mobile-nav.tsx`

## Styling Conventions

### Tailwind CSS
- **Utility-first approach**: Use Tailwind classes directly
- **Conditional classes**: Use `cn()` from `lib/utils.ts`
- **Mobile-first**: Base classes for mobile, `md:` prefix for desktop

### Design Tokens (tailwind.config.ts)
- **Container widths**:
  - Header: `max-w-5xl`
  - Content: `max-w-4xl` (Blog, About, Projects)
  - Forms: `max-w-2xl` (Contact)
- **Spacing**:
  - Header offset: `pt-20`
  - Mobile padding: `px-4`
- **Brand color**: Indigo palette

### Responsive Typography
- **H1**: `text-2xl md:text-4xl` or `text-2xl md:text-5xl`
- **Body**: `text-sm md:text-base` or `text-sm md:text-lg`
- **Meta**: `text-xs md:text-sm`
- **Line height**: `leading-relaxed` for Japanese content

## Import Organization
```typescript
// 1. React/Next.js imports
import { Metadata } from 'next'
import Image from 'next/image'

// 2. Third-party libraries
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'

// 3. Local components
import { Header } from '@/app/components/header'

// 4. Types
import type { Project } from '@/types/project'

// 5. Utilities
import { getAllPosts } from '@/lib/mdx'
```

## File Structure Conventions
- **Server Components**: `app/[route]/page.tsx`
- **Client Components**: Explicitly marked with `'use client'`
- **Shared UI**: `components/ui/` (shadcn/ui)
- **Page-specific**: `app/components/`
- **Utilities**: `lib/`
- **Types**: `types/`
- **Content**: `content/blog/`, `content/projects/`

## Code Quality Standards
- **Type safety**: All functions have explicit return types
- **Error handling**: Try-catch for async operations, null checks
- **Accessibility**: Semantic HTML, ARIA labels, focus management
- **Performance**: Static generation preferred, minimal client-side JS
