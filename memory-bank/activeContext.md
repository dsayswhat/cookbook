# Active Context

## Current State
Using Markdown with YAML frontmatter for recipe files. Core collections (recipes, categories, tags) configured. Layout system implemented with Tailwind CSS v4 for styling. URL structure has been standardized to use consistently pluralized paths. Fixed permalink conflicts by setting `permalink: false` in recipe markdown files. Implemented clean build process to prevent stale files between builds.

## Next Steps
1. ✓ Complete layout system implementation
   - ✓ Create base layout template
   - ✓ Implement header and footer components
   - ✓ Set up navigation structure
   - ✓ Apply Tailwind CSS styling
2. ✓ Complete basic templates
   - ✓ Enhance recipe template with all metadata
   - ✓ Implement recipe listing with filtering
   - ✓ Add category/tag taxonomy pages
3. Update URL structure in templates
   - ✓ Update permalinks in recipe.njk to use `/recipes/[recipe-slug]/`
   - ✓ Fix permalink conflicts by setting `permalink: false` on recipe md files
   - Create templates for category, tag, and cuisine pages with proper permalinks
4. ✓ Implement navigation system
   - ✓ Create primary navigation component
     - Home, All Recipes, Categories, Tags, Cuisines
   - Implement contextual navigation on recipe pages
     - Links to related recipes by category/tag
   - Add utility navigation
     - Search, filters, sorting options
5. Add taxonomy page templates
   - Create category listing page
   - Create tag listing page
   - Create cuisine listing page
   - Create filtered views for each taxonomy
6. Enhance styling and UI
   - ✓ Implement responsive design with Tailwind CSS
   - Add print-specific styles for PDF generation
   - Refine typography and spacing for better readability
   - Optimize UI for mobile devices
7. Deploy to GitHub Pages
   - Configure Eleventy for GitHub Pages path prefix
   - Create GitHub Actions workflow for automated deployment
   - Update build scripts to support deployment
   - Test deployment to ensure all links and assets function correctly

## Blockers
- None at this time

## Recent Decisions
- URL structure will use consistently pluralized paths (`/recipes/`, `/categories/`, `/tags/`, etc.)
- Individual recipe files will use `permalink: false` to avoid conflicts with the paginated template
- Implemented clean build process using rimraf to prevent stale files between builds
  - Added `clean` script to remove output directory
  - Added pre-build hooks to ensure clean builds
  - Updated development workflow to clean before serving
- Selected Tailwind CSS v4 as the styling framework
  - Configured custom theme variables for colors, typography, and spacing
  - Created custom utility for recipe container sizing
  - Implemented responsive layouts for all pages
- GitHub Pages will be used for deployment
  - Will use project pages approach with a `gh-pages` branch
  - Will implement GitHub Actions workflow for automated deployment
  - Will configure path prefixing to handle subdirectory hosting

## Questions/Considerations
1. Should PDF generation happen at build time or on-demand?
2. How to handle recipe images in the current structure?
3. Need to determine search implementation approach
4. Consider adding recipe scaling functionality
5. How to handle recipe variations/adaptations?
6. Should we implement a recipe editor interface?
7. What type of navigation would be most user-friendly for the recipe categories/tags/cuisines?
8. Should we implement a "related recipes" feature based on shared categories/tags?
9. Do we need to add more complex Tailwind components for specific UI elements?
10. How should we organize and optimize styling for print output? 
11. Should we set up a custom domain for the GitHub Pages site?
12. How to handle environment-specific configuration between local development and GitHub Pages? 