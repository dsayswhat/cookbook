# Technical Context

## Technology Stack
- **Static Site Generator**: Eleventy (11ty)
- **Data Format**: Markdown with YAML frontmatter
- **Template Language**: Nunjucks (primary), Liquid (alternative)
- **Styling**: Tailwind CSS v4 with custom theme variables
- **JavaScript**: Minimal, vanilla JS for progressive enhancement
- **Build Tools**: Node.js, npm
- **PDF Generation**: Puppeteer (for automated PDF creation)
- **Deployment**: GitHub Pages with GitHub Actions automation

## Development Environment
```bash
# Prerequisites
- Node.js 14+ 
- npm or yarn
- Git for version control

# Key Dependencies
- @11ty/eleventy
- tailwindcss (v4)
- @tailwindcss/postcss
- puppeteer (for PDF generation)
- markdown-it (for parsing notes/instructions)
```

## Technical Constraints
- Must work without JavaScript (progressive enhancement)
- Should generate static HTML for performance
- PDF generation happens at build time
- All recipes stored in Markdown files with YAML frontmatter
- No database required
- GitHub Pages deployment requires path prefixing for subdirectory hosting
- `.nojekyll` file required to prevent GitHub's Jekyll processor from ignoring underscore folders

## Architecture Decisions
1. **Markdown for recipes**: Human-readable format with YAML metadata
2. **File-based storage**: Each recipe is a separate markdown file
3. **Collections in Eleventy**: Recipes organized by category/tag
4. **Static generation**: All pages pre-built for speed
5. **Puppeteer for PDFs**: Automated generation using print stylesheets
6. **Tailwind CSS v4**: Utility-first styling with custom theme variables 
7. **GitHub Pages**: Deployment to GitHub Pages using GitHub Actions
8. **Path Prefixing**: Configure Eleventy to handle subdirectory path on GitHub Pages
9. **`.nojekyll` file**: Prevents GitHub from processing the site with Jekyll 

## GitHub Pages URL Handling

The website is deployed to GitHub Pages under a subdirectory (pathPrefix: '/cookbook'). This requires special attention when constructing URLs in templates:

1. The Eleventy configuration includes a custom URL filter that adds the GitHub Pages path prefix:
   ```js
   eleventyConfig.addFilter("url", function(urlPath) {
     const isGitHubPages = process.env.GITHUB_ACTIONS === "true" || process.env.ELEVENTY_ENV === "github";
     const pathPrefix = isGitHubPages ? "/cookbook" : "";
     
     // Other URL processing logic...
     
     return pathPrefix + urlPath;
   });
   ```

2. When applying this filter in Nunjucks templates, always use parentheses around the entire path:
   ```njk
   CORRECT: <a href="{{ ('/recipes/' + recipe.data.id + '/') | url }}">Link Text</a>
   INCORRECT: <a href="{{ '/recipes/' + recipe.data.id + '/' | url }}">Link Text</a>
   ```

3. Proper URL construction ensures links work correctly when deployed:
   - Local development: `/recipes/recipe-id/`
   - GitHub Pages: `/cookbook/recipes/recipe-id/`
   
4. Without parentheses, the filter applies only to the last part of the path, causing broken URLs:
   - Incorrect: `/recipes/recipe-id/cookbook`