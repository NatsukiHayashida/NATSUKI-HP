# MDX Content Guidelines

## File Naming and Placement

### Blog Posts
- **Location**: `content/blog/[slug].mdx`
- **Naming**: Slug should match filename (e.g., `hello-world.mdx` → slug: "hello-world")
- **URL**: Appears at `/articles/[slug]`

### Projects
- **Location**: `content/projects/[slug].mdx`
- **Naming**: Slug should match filename
- **URL**: Appears at `/projects/[slug]`

## Frontmatter Requirements

### Blog Post Frontmatter
```yaml
---
title: "記事タイトル"
date: "2025-01-15"  # ISO 8601 format (YYYY-MM-DD)
slug: "post-slug"   # Must match filename
excerpt: "記事の要約文。一覧ページに表示されます。"
---
```

### Project Frontmatter
```yaml
---
title: "プロジェクトタイトル"
date: "2025-01-15"
slug: "project-slug"
excerpt: "プロジェクトの要約"
tags: ["Next.js", "TypeScript", "Supabase"]
---
```

## Heading Structure

### Never Use H1 in MDX
- H1 is automatically generated from frontmatter title
- Start content with H2 (##) and below
- Maintain proper heading hierarchy: H2 → H3 → H4

### Subtitle Pattern
Use `―` (em dash) to create automatic subtitle styling:
```markdown
## メインタイトル ― サブタイトル
```
Renders as:
- Main: Large, bold
- Subtitle: Smaller, lighter, muted color

## Text Emphasis (CommonMark Compliance)

### Bold Text Rules
✅ **Correct**:
```markdown
これは**太字テキスト**です
**Important note**がここにあります
```

❌ **Wrong** (spaces break emphasis):
```markdown
これは** 太字テキスト **です
** Important note **がここにあります
```

### Blockquote with Bold
✅ **Correct** (space after >):
```markdown
> **重要**: この点に注意してください
```

❌ **Wrong** (no space after >):
```markdown
>**重要**: この点に注意してください
```

### Multi-line Emphasis
❌ **Wrong** (no line breaks inside emphasis):
```markdown
**これは長い
テキストです**
```

✅ **Correct**:
```markdown
**これは長いテキストです**
```

## Lists

### Unordered Lists
- Use `-` or `*` for list items
- Current styling: No bullets (list-none)
- Proper spacing applied automatically

```markdown
- 項目1
- 項目2
- 項目3
```

### Ordered Lists
```markdown
1. 最初のステップ
2. 次のステップ
3. 最後のステップ
```

## Images

### Image Syntax
```markdown
![Alt text](/images/filename.jpg)
```

### Automatic Processing
- Converted to Next.js Image component
- Width: 1200px, Height: 900px (aspect ratio preserved)
- Responsive: 100% width on all devices
- Auto format: AVIF/WebP when supported

### Image Placement
- Store in `public/images/`
- Reference as `/images/filename.jpg`
- Always provide descriptive alt text

## Code Blocks

### Inline Code
```markdown
Use `backticks` for inline code
```

### Code Blocks with Syntax Highlighting
````markdown
```typescript
function example() {
  return "syntax highlighted"
}
```
````

Supported languages: JavaScript, TypeScript, Python, Bash, etc.

## Links

### Internal Links
```markdown
[About Page](/about)
[Blog](/blog)
[Project Detail](/projects/my-project)
```

### External Links
```markdown
[Next.js Documentation](https://nextjs.org)
```

## Japanese Content Best Practices

### Avoid English Acronyms in Japanese Context
❌ Avoid: "TL;DR"
✅ Use: "プロジェクト概要" or "要約"

### Date Display
- Input: `YYYY-MM-DD` in frontmatter
- Output: Automatically formatted to `ja-JP` (e.g., "2025年1月15日")
- Timezone: Asia/Tokyo

### Typography
- Use proper Japanese punctuation: 。、「」『』
- Line breaks: Natural Japanese sentence breaks
- Emphasis: Use **bold** sparingly, as Japanese text is already dense

## Math Expressions (KaTeX)

### Inline Math
```markdown
Inline equation: $E = mc^2$
```

### Block Math
```markdown
$$
\int_{a}^{b} f(x) dx
$$
```

## Common Pitfalls to Avoid

### 1. Zero-Width Spaces
- Invisible `\u200b` characters break emphasis
- Often caused by copy-paste from editors
- Solution: Type markdown manually or use plain text editor

### 2. Full-Width Spaces
- Full-width spaces (　) can interfere with markdown parsing
- Use half-width spaces in markdown syntax

### 3. Mixed Emphasis Markers
❌ Don't mix: `**bold*` or `*italic**`
✅ Consistent: `**bold**` or `*italic*`

### 4. Heading Levels
❌ Don't skip levels: H2 → H4
✅ Proper hierarchy: H2 → H3 → H4

### 5. Slug Consistency
- Frontmatter slug MUST match filename
- Example: `my-post.mdx` → slug: "my-post"

## Testing Your MDX Content

### Before Committing
1. Run dev server: `npm run dev`
2. Navigate to your article/project page
3. Check:
   - Title renders correctly
   - Subtitles are styled properly
   - Bold text appears bold
   - Lists display without bullets
   - Images load and are responsive
   - Code blocks have syntax highlighting
   - Links work correctly

### Build Test
```bash
npm run build
```
- Ensures MDX parses correctly at build time
- Catches frontmatter errors
- Validates all slugs and routes
