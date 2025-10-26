# Task Completion Checklist

## Before Committing Changes

### 1. Code Quality Checks
```bash
# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit

# Ensure no TypeScript errors
```

### 2. Build Verification
```bash
# Test production build
npm run build

# Verify build succeeds without errors
```

### 3. Visual Testing
- Test in development mode: `npm run dev`
- Check mobile responsiveness (375px, 768px, 1024px)
- Verify dark/light theme switching
- Test all modified pages/components

### 4. Content Validation (if MDX files changed)
- Verify frontmatter format (title, date, slug, excerpt)
- Check date format: YYYY-MM-DD (ISO 8601)
- Ensure H2+ headings only (H1 auto-generated)
- Validate CommonMark syntax:
  - No spaces around `**bold**` markers
  - Space after `>` in blockquotes
  - No zero-width spaces

### 5. Security Checks (if applicable)
- Review spam protection logic changes
- Verify CSP headers not weakened
- Check input sanitization remains intact
- Confirm no secrets in committed code

## Git Workflow

### 1. Check Status
```bash
git status
git branch  # Ensure on correct branch
```

### 2. Stage Changes
```bash
git add .
# Or selectively: git add <files>
```

### 3. Commit with Standard Format
```bash
git commit -m "type: 詳細な変更内容の説明

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Commit Types**:
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント変更
- `style`: スタイリング変更
- `refactor`: リファクタリング
- `perf`: パフォーマンス改善
- `test`: テスト追加・修正
- `chore`: 雑務（依存関係更新など）

### 4. Push Changes
```bash
git push origin <branch-name>
```

## Documentation Updates

### When to Update CLAUDE.md
- New architectural patterns introduced
- Major feature additions
- Breaking changes in code structure
- New conventions or guidelines

### When to Create claudedocs/ Files
- Complex feature implementation records
- Setup/configuration guides
- Interview/research documentation
- Update logs for major content changes

## Post-Deployment Checks (if applicable)
- Verify production site loads correctly
- Test contact form (EmailJS integration)
- Check analytics integration
- Validate SEO metadata

## Rollback Plan
```bash
# If issues found after commit
git log  # Find commit hash
git revert <commit-hash>

# If not pushed yet
git reset --soft HEAD~1  # Undo commit, keep changes
git reset --hard HEAD~1  # Undo commit and changes
```
