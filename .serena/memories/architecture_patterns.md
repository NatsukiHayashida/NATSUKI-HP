# Architecture Patterns and Key Implementations

## Content Management System Pattern

### MDX-Based Static Generation
- **Philosophy**: File-based CMS for blog and projects
- **Build-time processing**: All MDX parsed during `npm run build`
- **Type safety**: BlogPost and Project interfaces ensure consistency

### Frontmatter Schema
```typescript
// Blog posts (content/blog/*.mdx)
{
  title: string
  date: string (YYYY-MM-DD)
  slug: string
  excerpt: string
}

// Projects (content/projects/*.mdx)
{
  title: string
  date: string (YYYY-MM-DD)
  slug: string
  excerpt: string
  tags: string[]
}
```

### Static Params Generation
```typescript
// Pattern used in app/articles/[slug]/page.tsx
export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const dynamicParams = false // 404 for undefined routes
```

## Next.js 15 Async Params Pattern

### Important Breaking Change
```typescript
// ❌ Old (Next.js 14)
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
}

// ✅ New (Next.js 15)
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
}

// Also in generateMetadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // ...
}
```

## Security Architecture

### Multi-Layer Spam Protection
1. **Honeypot Field**: Hidden field to catch bots
2. **Japanese Text Requirement**: Ensures localized users
3. **URL Detection**: Blocks messages with URLs
4. **Keyword Filtering**: Detects common spam patterns
5. **Rate Limiting**: localStorage-based cooldown (1 min)
6. **Input Sanitization**: DOMPurify for XSS prevention

### Content Security Policy (CSP)
- Defined in `next.config.mjs`
- Strict directives for scripts, styles, images
- EmailJS and external resources whitelisted
- Inline scripts allowed with 'unsafe-inline' (Next.js requirement)

### Security Headers
- HSTS (Strict-Transport-Security)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin

## Design System Implementation

### Mobile-First Responsive Strategy
```css
/* Base: Mobile (default) */
text-2xl px-4 py-2

/* Tablet/Desktop: md: breakpoint (768px+) */
md:text-4xl md:px-6 md:py-4
```

### Container Width Hierarchy
- **max-w-5xl**: Header/navigation (widest)
- **max-w-4xl**: Main content (blog, about, projects)
- **max-w-2xl**: Forms and focused content (contact)

### Typography Scale (Japanese Optimized)
```
H1: text-2xl md:text-4xl (or md:text-5xl)
H2: text-xl md:text-2xl (or md:text-3xl)
Body: text-sm md:text-base (or md:text-lg)
Meta: text-xs md:text-sm
```

### Semantic HTML Structure
```html
<body>
  <Header /> <!-- Navigation -->
  <main className="pt-20"> <!-- Header offset -->
    <article> <!-- Blog/Project content -->
      <h1> <!-- Page title -->
      <section> <!-- Content sections -->
    </article>
  </main>
  <Footer />
</body>
```

## ReactMarkdown Customization Pattern

### Custom Component Rendering
```typescript
// app/projects/[slug]/page.tsx
<ReactMarkdown
  components={{
    // Subtitle auto-styling with ― separator
    h2: ({ children }) => {
      if (children.toString().includes('―')) {
        const [main, sub] = children.toString().split('―')
        return (
          <h2>
            <span>{main}</span>
            <br />
            <span className="text-base md:text-lg font-normal text-muted-foreground">
              {sub}
            </span>
          </h2>
        )
      }
      return <h2>{children}</h2>
    },
    
    // Bold emphasis
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    
    // Clean lists (no markers)
    ul: ({ children }) => (
      <ul className="list-none space-y-2">{children}</ul>
    ),
    
    // Next.js Image optimization
    img: ({ src, alt }) => (
      <Image src={src} alt={alt} width={1200} height={900} />
    )
  }}
/>
```

## Theme Implementation

### next-themes Pattern
```typescript
// app/layout.tsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>

// Hydration warning suppression
<html suppressHydrationWarning>
```

### Theme Toggle Component
- Client component (`'use client'`)
- useTheme() hook from next-themes
- Dropdown menu with theme options
- Icon changes based on current theme

## Email Integration Pattern

### EmailJS Configuration
```typescript
// Environment variables
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
NEXT_PUBLIC_CONTACT_EMAIL

// Usage in contact/page.tsx
import emailjs from '@emailjs/browser'

const result = await emailjs.send(
  serviceId,
  templateId,
  templateParams,
  publicKey
)
```

## Performance Optimization Patterns

### Server Components (Default)
- All data fetching on server
- Zero client-side JavaScript for static pages
- Automatic code splitting

### Client Components (Selective)
- Only when needed: forms, interactive UI, hooks
- Marked with `'use client'` directive
- Examples: contact form, theme toggle, scroll-to-top

### Static Generation Strategy
- All blog posts generated at build time
- All project pages pre-rendered
- No runtime overhead for content pages
- ISR (Incremental Static Regeneration) not needed

### Image Optimization
- next.config.mjs: AVIF and WebP formats
- Automatic responsive images
- Lazy loading by default
- Priority loading for above-fold images
