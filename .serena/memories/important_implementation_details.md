# Important Implementation Details

## React 19 and Radix UI Compatibility

### Hydration Warning Fix
- **Issue**: React 19 hydration warnings with next-themes
- **Solution**: Add `suppressHydrationWarning` to html tag in layout.tsx
```typescript
<html lang="ja" suppressHydrationWarning>
```

### Radix UI Version Requirements
- All Radix UI packages updated to v1.2+ for React 19 compatibility
- Key packages:
  - @radix-ui/react-dialog: ^1.0.5
  - @radix-ui/react-dropdown-menu: ^2.0.6
  - @radix-ui/react-slot: ^1.2.3

## EmailJS Integration

### Required Environment Variables
```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxx
NEXT_PUBLIC_CONTACT_EMAIL=your-email@domain.com
```

### Template Variables
EmailJS template should use:
- `{{from_name}}`: User's name
- `{{from_email}}`: User's email
- `{{message}}`: User's message
- `{{to_email}}`: Recipient email (from env)

### Spam Protection Implementation
Located in `lib/spam-protection.ts`:

1. **Honeypot Check**
   - Hidden field `website` (bots auto-fill it)
   - If filled → spam score +100

2. **Japanese Text Requirement**
   - Message must contain Japanese characters
   - Regex: `/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/`
   - If no Japanese → spam score +50

3. **URL Detection**
   - Blocks messages with http:// or https://
   - Common spam pattern
   - If URL found → spam score +30

4. **Spam Keywords**
   - List: "viagra", "casino", "lottery", "prize", etc.
   - If keyword found → spam score +40

5. **Rate Limiting**
   - localStorage tracks last submission time
   - 60-second cooldown between submissions
   - If too soon → spam score +50

6. **Input Sanitization**
   - DOMPurify cleans all inputs
   - Prevents XSS attacks

### Spam Score Threshold
- Score ≥50 → Classified as spam
- User sees error message
- Email not sent

## Scroll-to-Top Button

### Implementation Details
- Client component (`'use client'`)
- Visibility threshold: 300px scroll
- Smooth scroll behavior
- Fixed position: bottom-right
- Mobile responsive: adjusted positioning

```typescript
// Key logic
const [isVisible, setIsVisible] = useState(false)

useEffect(() => {
  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300)
  }
  window.addEventListener('scroll', toggleVisibility)
  return () => window.removeEventListener('scroll', toggleVisibility)
}, [])
```

## Date Formatting

### Consistent ja-JP Format
```typescript
// lib/utils.ts
export function parseDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
```

### Usage
- Blog listing: Reading time and date
- Project cards: Publication date
- Article headers: Last updated date

## Content Security Policy (CSP)

### Critical Domains Whitelisted
```javascript
// next.config.mjs
const cspHeader = `
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.emailjs.com;
  style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
  img-src 'self' blob: data:;
  font-src 'self' data:;
  connect-src 'self' https://api.emailjs.com;
`
```

### Why 'unsafe-inline' and 'unsafe-eval'
- Next.js requires for proper hydration
- EmailJS requires for runtime script execution
- Trade-off: Functionality vs strict security

## Performance Optimizations

### Image Configuration
```javascript
// next.config.mjs
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
}
```

### Static Generation
- All blog posts: Generated at build time
- All projects: Pre-rendered
- No runtime fetching for content
- ISR not used (content stable)

### Code Splitting
- Automatic route-based splitting
- Dynamic imports for heavy components
- Minimal client-side JavaScript

## Tailwind Configuration

### Design Tokens
```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      border: "hsl(var(--border))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: "hsl(var(--primary))",
      // ... CSS variables for theming
    },
    maxWidth: {
      '5xl': '64rem',  // Header
      '4xl': '56rem',  // Main content
      '2xl': '42rem',  // Forms
    }
  }
}
```

### Typography Plugin
- @tailwindcss/typography for prose styling
- Customized for Japanese content
- Applied to MDX content rendering

## Component Architecture Decisions

### Server vs Client Components

**Server Components** (No 'use client'):
- All pages by default
- Data fetching (MDX parsing)
- SEO metadata generation
- Static content rendering

**Client Components** (With 'use client'):
- Forms (contact page)
- Theme toggle
- Scroll-to-top button
- Mobile navigation (Sheet)
- Any useState/useEffect usage

### shadcn/ui Integration
- Components in `components/ui/`
- Customizable via `components.json`
- Styled with Tailwind
- Accessible by default (Radix UI)

## Git Workflow Specifics

### Branch Strategy
- Main branch: `main` (direct development)
- No feature branches currently
- All commits to main
- Consider feature branches for major changes

### Commit Message Format
```
type: 日本語での詳細な変更内容

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Types
- `feat`: 新機能追加
- `fix`: バグ修正
- `docs`: ドキュメント更新
- `style`: スタイリング変更
- `refactor`: リファクタリング
- `perf`: パフォーマンス改善

## Known Issues and Limitations

### Resolved Issues
✅ React 19 hydration warnings (fixed with suppressHydrationWarning)
✅ Radix UI compatibility (updated to v1.2+)
✅ Bold text in MDX (CommonMark compliance)
✅ EmailJS integration (fully functional)

### Current Limitations
- No ISR (content fully static)
- No CMS backend (file-based only)
- No user authentication (portfolio site)
- No analytics (GA optional)

### Future Considerations
- Consider CMS integration for non-technical content editors
- Implement analytics if traffic monitoring needed
- Add RSS feed for blog
- Optimize bundle size (currently acceptable)
