# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm start` - Start development server with live reload
- `npm run build` - Generate static site for local/production use
- `npm run clean` - Remove build artifacts (_site directory)

### GitHub Pages Deployment
- `npm run build:github` - Build with GitHub Pages path prefix (`/cookbook`)  
- `npm run check-deployment` - Verify deployment configuration
- `npm run deploy` - Manual deployment (usually handled by GitHub Actions)

### PDF Generation
- `npm run pdf` - Generate PDF versions of all recipes

## Architecture

### Static Site Generator
Built with Eleventy (11ty) using Nunjucks templates. The build process:
1. Processes recipe markdown files from `src/recipes/`
2. Applies recipe layout template (`src/_includes/layouts/recipe.njk`)
3. Generates collections for categories and tags
4. Processes CSS through PostCSS with Tailwind CSS
5. Outputs to `_site/` directory

### Recipe Data Structure
Recipes are markdown files with YAML frontmatter. See [`doc/recipe-format.md`](doc/recipe-format.md) for complete format documentation.

```yaml
---
layout: layouts/recipe.njk
id: recipe-id
title: Recipe Name
metadata:
  categories: [Category1, Category2]
  cuisine: Cuisine Type
  tags: [tag1, tag2]
  difficulty: Easy/Medium/Hard
source_url: Optional URL
---
```

### URL Handling for GitHub Pages
Critical pattern for all template URLs - always wrap path concatenation in parentheses before applying `url` filter:
```njk
CORRECT: <a href="{{ ('/recipes/' + recipe.data.id + '/') | url }}">
WRONG:   <a href="{{ '/recipes/' + recipe.data.id + '/' | url }}">
```
The `url` filter adds `/cookbook` prefix for GitHub Pages deployment.

### Collections
- `allRecipes` - All recipe markdown files
- `categories` - Extracted from recipe metadata  
- `tags` - Extracted from recipe metadata

### PostCSS Processing
CSS files are processed through PostCSS with Tailwind CSS and Autoprefixer. Only `styles.css` is processed; other CSS files pass through unchanged.

### GitHub Pages Deployment
- Path prefix `/cookbook` is automatically applied when `ELEVENTY_ENV=github` or `GITHUB_ACTIONS=true`
- `.nojekyll` file prevents Jekyll processing
- GitHub Actions workflow handles automatic deployment from main branch

## File Structure
- `src/recipes/` - Recipe markdown files
- `src/_includes/layouts/` - Template layouts
- `src/css/styles.css` - Main stylesheet (processed with Tailwind)
- `.eleventy.js` - Eleventy configuration
- `scripts/` - Build and deployment utilities
- `doc/` - Documentation files

## Documentation

- [`doc/recipe-format.md`](doc/recipe-format.md) - Detailed documentation of the recipe format and structure