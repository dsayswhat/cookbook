# Technical Context

## Technology Stack
- **Static Site Generator**: Eleventy (11ty)
- **Data Format**: Markdown with YAML frontmatter
- **Template Language**: Nunjucks (primary), Liquid (alternative)
- **Styling**: CSS (vanilla, considering utility framework)
- **JavaScript**: Minimal, vanilla JS for progressive enhancement
- **Build Tools**: Node.js, npm
- **PDF Generation**: Puppeteer (for automated PDF creation)

## Development Environment
```bash
# Prerequisites
- Node.js 14+ 
- npm or yarn
- Git for version control

# Key Dependencies
- @11ty/eleventy
- puppeteer (for PDF generation)
- markdown-it (for parsing notes/instructions)
```

## Technical Constraints
- Must work without JavaScript (progressive enhancement)
- Should generate static HTML for performance
- PDF generation happens at build time
- All recipes stored in Markdown files with YAML frontmatter
- No database required

## Architecture Decisions
1. **Markdown for recipes**: Human-readable format with YAML metadata
2. **File-based storage**: Each recipe is a separate markdown file
3. **Collections in Eleventy**: Recipes organized by category/tag
4. **Static generation**: All pages pre-built for speed
5. **Puppeteer for PDFs**: Automated generation using print stylesheets 