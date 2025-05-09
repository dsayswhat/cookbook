# System Patterns

## Data Architecture
```
src/
  _data/
    recipes/
      [recipe-name].md    # Individual recipe files with YAML frontmatter
```

## Recipe Format
```markdown
---
id: unique-identifier
title: Recipe Name
metadata:
  categories: [Category1, Category2]
  cuisine: String
  tags: [tag1, tag2]
  difficulty: Easy|Medium|Hard
timing:
  prep: Number (minutes)
  cook: Number (minutes)
  total: Number (minutes)
yield:
  amount: Number
  unit: String
ingredients:
  - group: String (optional)
    items:
      - amount: Number
        unit: String
        item: String
        notes: String (optional)
instructions:
  - step: String
    time: Number (optional)
notes: String (optional)
source_url: String (optional)
---

# Recipe Title

## Ingredients

### Group Name (optional)
- Amount Unit Item, notes

## Instructions
1. First instruction step
2. Second instruction step

## Notes
Additional notes about the recipe.
```

## Collection Structure
- **Primary Collection**: All recipes
- **Taxonomy Collections**: Categories, Cuisines, Tags
- **Special Collections**: Featured, Recent, Seasonal

## Template Hierarchy
1. Base Layout (`_includes/layouts/base.njk`)
2. Recipe Layout (`_includes/layouts/recipe.njk`)
3. List Layout (`_includes/layouts/list.njk`)
4. PDF Layout (`_includes/layouts/recipe-pdf.njk`)

## URL Structure
The cookbook site uses a consistent plural naming convention for all URL paths:

- `/` - Homepage (now displays the recipe listing with filtering)
- `/recipes/{recipe-id}/` - Individual recipe pages
- `/tags/` - Tags listing page
- `/tags/{tag-name}/` - Recipe listing filtered by tag
- `/categories/` - Categories listing page
- `/categories/{category-name}/` - Recipe listing filtered by category
- `/cuisines/` - Cuisines listing page
- `/cuisines/{cuisine-name}/` - Recipe listing filtered by cuisine

This follows the REST convention of plural resource collections and provides a consistent mental model for users.

## Permalink Handling
To avoid URL conflicts, the system uses two complementary approaches:

1. Individual recipe markdown files (`src/recipes/*.md`) have `permalink: false` set via a directory data file `src/recipes/recipes.json`, preventing direct file output
2. The main recipe template (`src/recipe.njk`) uses pagination to iterate through all recipes and generates the actual HTML pages at `/recipes/{recipe-id}/`

This separation ensures no URL conflicts while maintaining a clean content structure.

## Navigation Structure
The main navigation provides access to key content sections:

1. **Primary Navigation**
   - Home (`/`) - Shows all recipes with filtering functionality

2. **Contextual Navigation**
   - On category pages: links to other categories
   - On recipe pages: links to related recipes by category/tag
   - On listing pages: filtering controls

3. **Utility Navigation**
   - Client-side filtering for recipes
   - Future: Sort options, category filters

## Component Patterns
- Recipe tables for list views (replacing earlier card layout)
- Client-side filtering with debounced search
- Recipe detail view with metadata display
- Ingredient lists with grouping
- Step-by-step instructions
- Metadata display (timing, yield, difficulty)
- Print-optimized layouts 

## Styling Patterns
The project uses a hybrid styling approach:

1. **Base Framework**
   - Tailwind CSS v4 for global styles and utility classes
   - Custom theme variables through Tailwind's `@theme` directive
   - PostCSS for processing

2. **Recipe Template Styling**
   - Component-based CSS with BEM-like naming convention
   - Semantic class names (e.g., `recipe-meta`, `recipe-content`)
   - Direct CSS rules for recipe-specific components
   - Responsive design with media queries
   - Print styles for PDF generation

3. **Recipe List Styling**
   - Tabular layout with responsive design
   - Zebra striping for better readability
   - Hover effects for rows
   - Mobile-optimized touch targets
   - Alphabetical sorting of recipes by title

4. **Filter Interface**
   - Clean, accessible search input
   - Real-time filtering across multiple fields
   - Debounced search for performance
   - Clear button for easy reset
   - "No results" state with reset option
   - Mobile-optimized interface

5. **Design System**
   - Custom colors through `--color-primary-*` and `--color-accent-*` variables
   - Typography settings with `--font-*` variables
   - Custom container sizes with `--container-*` variables
   - Component-specific styling with semantic classes

6. **Responsive Patterns**
   - Mobile-first design principles
   - Grid layouts that adapt from single column to multi-column
   - Media queries for different screen sizes:
     - Mobile (max-width: 640px)
     - Tablet (min-width: 768px)
     - Desktop (min-width: 1024px)
   - Print media query for print and PDF styling

7. **Class Naming Convention**
   - Component-based: `component-element-modifier`
   - Recipe components: `recipe-*`
   - Metadata items: `recipe-meta-item`, `recipe-meta-label`, `recipe-meta-value`
   - Recipe content: `recipe-content`

## Client-Side Filtering
The recipe list includes client-side filtering functionality with the following features:

1. **Filter Input**
   - Text input that filters recipes in real-time
   - Filters across multiple data points (title, categories, tags)
   - Case-insensitive string matching

2. **Performance Optimization**
   - Debounced input handling (300ms delay)
   - Efficient DOM manipulation
   - Clear visual feedback during filtering

3. **User Experience**
   - Clear button to reset filter
   - "No results" message when no matches found
   - Reset option within the no results message
   - Mobile-friendly input with appropriate sizing

4. **Implementation Pattern**
   - Event listeners attached on DOMContentLoaded
   - Filter function that toggles visibility of table rows
   - Counter to track visible results for "no results" state
   - DOM manipulation using classList.add/remove('hidden')

## Build Process
The cookbook site uses a clean build process to prevent stale files from persisting between builds:

1. **Development Workflow**
   - `npm start` - Cleans the output directory and starts the development server
   - Changes to source files trigger incremental rebuilds

2. **Production Build**
   - `npm run build` - Cleans the output directory and builds the production site
   - `npm run clean` - Manually cleans the output directory without rebuilding

3. **PDF Generation**
   - `npm run pdf` - Generates PDF versions of recipes

4. **CSS Processing**
   - PostCSS processes CSS files with Tailwind CSS and Autoprefixer
   - Custom Tailwind theme variables are defined in `src/css/styles.css`
   - Utility classes are generated based on theme configuration

This clean build approach ensures that removed or renamed files don't persist in the output directory, preventing confusion during development and testing.

## Deployment Process
The cookbook site uses GitHub Pages for deployment:

1. **Deployment Workflow**
   - GitHub Actions automates the deployment process
   - Triggered on pushes to the main branch
   - Builds the site with path prefix configuration
   - Deploys to the `gh-pages` branch

2. **Path Configuration**
   - Eleventy's `pathPrefix` setting handles subdirectory hosting
   - All internal links use this prefix for GitHub Pages compatibility
   - Local development remains at root path for convenience
   - Custom URL filter used to apply the path prefix consistently

3. **GitHub Pages Configuration**
   - `.nojekyll` file prevents GitHub's Jekyll processor from running
   - This is crucial as Jekyll ignores folders starting with underscore by default
   - GitHub Pages serves the site as static files without processing
   - Folder structure preserved exactly as built by Eleventy

4. **Deployment Scripts**
   - `npm run build:github` - Builds the site with GitHub Pages path prefix
   - `npm run check-deployment` - Validates deployment configuration
   - GitHub Actions handles the actual deployment to `gh-pages` branch

5. **Build Artifacts**
   - Static HTML, CSS, and JavaScript files in `_site` directory
   - PDF files generated during build process
   - Asset files (images, fonts) copied to output directory
   - `.nojekyll` file copied to output directory

This deployment approach enables automated publishing while maintaining a clean separation between source code and published output. 