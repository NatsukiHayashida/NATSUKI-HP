# Tech Stack

## Core Framework
- **Next.js**: 15.5.4 (App Router, React 19, Server Components)
- **React**: 18 (with React 19 support)
- **TypeScript**: 5.x (strict mode enabled)

## Styling & UI
- **Tailwind CSS**: 3.4.1 (utility-first CSS framework)
- **shadcn/ui**: Radix UI v1.2+ components (React 19 compatible)
- **next-themes**: Dark/Light mode theming
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant management

## Content Management
- **MDX**: Blog and project content files
- **gray-matter**: Frontmatter parsing
- **react-markdown**: Markdown rendering with plugins
- **reading-time**: Reading time estimation

## Markdown Processing
- **remark-gfm**: GitHub Flavored Markdown
- **remark-math**: Math expressions support
- **rehype-highlight**: Syntax highlighting
- **rehype-katex**: LaTeX math rendering
- **rehype-raw**: Raw HTML support
- **react-syntax-highlighter**: Code syntax highlighting

## Form & Email
- **EmailJS**: Contact form email integration (@emailjs/browser 4.4.1)
- **DOMPurify**: Input sanitization for security

## Development Tools
- **ESLint**: next/core-web-vitals config
- **PostCSS**: CSS processing
- **TypeScript**: Static type checking

## Security & Validation
- Custom spam protection system (lib/spam-protection.ts)
- Content Security Policy (CSP) in next.config.mjs
- Security headers (HSTS, X-Frame-Options, etc.)
