# Container Width Guidelines

## Unified Container Width Rule

**Standard container width**: `max-w-5xl` for all sections

### Usage
All sections on the homepage and throughout the site should use:
```tsx
<div className="container max-w-5xl">
  {/* content */}
</div>
```

### Rationale
- **Design consistency**: Uniform left/right margins across all sections
- **Visual coherence**: Prevents jarring width changes between sections
- **Predictable layout**: Users experience consistent content width
- **Simplified maintenance**: Single width standard to remember

### Exceptions
- **Contact form**: `max-w-2xl` for focused input experience
- **Article content**: `max-w-4xl` for optimal reading line length

### Implementation Checklist
- [x] Hero section: `max-w-5xl`
- [x] Image gallery: `max-w-5xl`
- [x] Projects section: `max-w-5xl`
- [x] Blog section: `max-w-5xl`
- [ ] About page: `max-w-4xl` (reading content exception)
- [ ] Contact page: `max-w-2xl` (form exception)

### Migration Notes
- Previous Hero section used `max-w-4xl` - updated to `max-w-5xl` for consistency (2025-10-12)
- All homepage sections now unified at `max-w-5xl`
