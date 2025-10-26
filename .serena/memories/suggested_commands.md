# Suggested Commands

## Development Commands

### Start Development Server
```bash
npm run dev
# Starts Next.js dev server at http://localhost:3000
```

### Build for Production
```bash
npm run build
# Creates optimized production build
```

### Start Production Server
```bash
npm start
# Runs production server (requires build first)
```

### Linting
```bash
npm run lint
# Runs ESLint with next/core-web-vitals config
```

## Git Commands (Darwin/macOS)
```bash
# Check status
git status
git branch

# Create feature branch
git checkout -b feature/your-feature-name

# Stage and commit
git add .
git commit -m "feat: your detailed commit message

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push changes
git push origin your-branch-name
```

## File Operations (Darwin/macOS)
```bash
# List files
ls -la

# Find files
find . -name "*.tsx" -type f

# Search in files (use Grep tool instead when possible)
grep -r "pattern" ./

# View file content (use Read tool instead)
cat filename
```

## Project-Specific Commands

### Content Management
```bash
# Create new blog post (use BLOG_POSTING_GUIDE.md)
# Create file: content/blog/[slug].mdx
# Required frontmatter: title, date, slug, excerpt

# Create new project
# Create file: content/projects/[slug].mdx
# Required frontmatter: title, date, slug, excerpt, tags
```

### Environment Setup
```bash
# Copy example env file
cp .env.local.example .env.local

# Edit environment variables
# Required for EmailJS: SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, CONTACT_EMAIL
```

## Quality Checks (Run before committing)
```bash
# 1. Lint check
npm run lint

# 2. Type check
npx tsc --noEmit

# 3. Build check
npm run build
```

## Troubleshooting Commands
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check port 3000 availability (if dev server fails)
lsof -i :3000
kill -9 <PID>
```
