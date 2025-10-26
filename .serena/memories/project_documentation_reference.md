# Project Documentation Reference

## Primary Documentation Location
All project-specific documentation is stored in the `claudedocs/` directory.

## Available Documentation Files

### 1. CODE_ANALYSIS_REPORT.md
- **Purpose**: Comprehensive code quality analysis report
- **Score**: 85/100 overall
- **Content**: Architecture assessment, code quality metrics, security analysis
- **When to use**: Understanding overall code quality and areas for improvement

### 2. RENEWAL_PLAN.md
- **Purpose**: Complete site renewal and improvement roadmap
- **Phases**: 0-5 (Foundation → Advanced Features)
- **Content**: Strategic planning, feature roadmap, implementation timeline
- **When to use**: Long-term planning and feature prioritization

### 3. ABOUT_PAGE_PROPOSAL.md
- **Purpose**: About page design proposals and implementation options
- **Content**: Multiple design proposals (A, B, C) with pros/cons
- **Implemented**: Proposal C currently in use
- **When to use**: Reference for about page structure and content strategy

### 4. BLOG_POSTING_GUIDE.md
- **Purpose**: Step-by-step guide for creating MDX blog posts
- **Content**: Frontmatter requirements, formatting rules, publishing process
- **When to use**: Creating new blog posts or troubleshooting MDX issues

### 5. CONTACT_PAGE_IMPLEMENTATION.md
- **Purpose**: Complete implementation record of contact form
- **Content**: EmailJS setup, spam protection, React 19 compatibility
- **Lines**: 371 lines of detailed implementation notes
- **When to use**: Troubleshooting contact form or understanding security implementation

### 6. CONTACT_SETUP_GUIDE.md (EMAILJS_SETUP_GUIDE.md)
- **Purpose**: EmailJS configuration and spam protection setup
- **Content**: Service setup, template configuration, environment variables
- **When to use**: Setting up EmailJS or modifying contact form behavior

### 7. HANASEISAKUSYO_INTERVIEW.md
- **Purpose**: Interview record for Hanaseisakusyo (花製作所) project
- **Date**: 2025-10-09
- **Content**: Project background, technical decisions, AI collaboration insights
- **When to use**: Understanding the EC rebuild project context

### 8. HANASEISAKUSYO_UPDATE_LOG.md
- **Purpose**: Update history for Hanaseisakusyo project article
- **Content**: Chronological changes, improvements, modifications
- **When to use**: Tracking project article evolution

## Additional Documentation Files (Root Level)

### BLOG_POSTING_GUIDE.md (Root)
- Duplicate of claudedocs version
- Quick reference at project root

### EMAILJS_SETUP_GUIDE.md (Root)
- Duplicate of claudedocs version
- Quick reference for EmailJS setup

### CLAUDE.md
- **Purpose**: Main guidance file for Claude Code
- **Content**: Project overview, architecture, patterns, constraints
- **Updates**: Regularly updated with latest development progress
- **When to use**: Primary reference for all development work

## Documentation Usage Guidelines

### When to Read Documentation
1. **Starting new feature**: Check RENEWAL_PLAN.md for roadmap alignment
2. **Creating blog post**: Use BLOG_POSTING_GUIDE.md
3. **Modifying contact form**: Refer to CONTACT_PAGE_IMPLEMENTATION.md
4. **Understanding architecture**: Start with CLAUDE.md, then CODE_ANALYSIS_REPORT.md
5. **Troubleshooting**: Check relevant implementation docs

### When to Update Documentation
1. **Major features added**: Update CLAUDE.md with new patterns
2. **Architecture changes**: Update CODE_ANALYSIS_REPORT.md insights
3. **New blog posts**: Consider update log if significant
4. **Security changes**: Update CONTACT_SETUP_GUIDE.md
5. **Roadmap progress**: Update RENEWAL_PLAN.md phases

### Documentation Maintenance
- Keep CLAUDE.md as single source of truth for current state
- Archive old proposals/plans when superseded
- Maintain clear chronological records in update logs
- Cross-reference between related documents

## Key Information Quick Access

### Tech Stack
→ See CLAUDE.md → "技術スタック" section

### Development Commands
→ See CLAUDE.md → "開発コマンド" section
→ See suggested_commands.md memory file

### Security Implementation
→ See CONTACT_PAGE_IMPLEMENTATION.md → Spam protection section
→ See CLAUDE.md → "セキュリティ実装" section

### MDX Content Rules
→ See BLOG_POSTING_GUIDE.md
→ See CLAUDE.md → "MDX記事作成規則" section
→ See mdx_content_guidelines.md memory file

### Architecture Patterns
→ See CODE_ANALYSIS_REPORT.md
→ See CLAUDE.md → "重要なアーキテクチャパターン" section
→ See architecture_patterns.md memory file

### Project History
→ See CLAUDE.md → "📅 最新の開発進捗" section
→ See HANASEISAKUSYO_UPDATE_LOG.md for specific project

## Documentation Best Practices

1. **Always start with CLAUDE.md**: Most comprehensive and up-to-date
2. **Check update dates**: Prioritize recent documentation
3. **Cross-reference**: Use multiple sources for complex topics
4. **Update after changes**: Keep documentation current
5. **Create new docs**: For significant features or complex implementations

## Related Memory Files

After onboarding, these memory files provide complementary information:
- `project_overview.md` - High-level project summary
- `tech_stack.md` - Detailed technology stack
- `suggested_commands.md` - Development commands
- `code_style_and_conventions.md` - Coding standards
- `task_completion_checklist.md` - Quality gates
- `codebase_structure.md` - Directory organization
- `architecture_patterns.md` - Key patterns and implementations
- `mdx_content_guidelines.md` - Content creation rules
- `important_implementation_details.md` - Critical technical details
- `darwin_system_utilities.md` - macOS/Darwin commands
