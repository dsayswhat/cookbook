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

- `/recipes/` - Main recipe listing page
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
   - Home (`/`)
   - All Recipes (`/recipes/`)
   - Categories (`/categories/`)
   - Tags (`/tags/`)
   - Cuisines (`/cuisines/`) 

2. **Contextual Navigation**
   - On category pages: links to other categories
   - On recipe pages: links to related recipes by category/tag
   - On listing pages: filtering controls

3. **Utility Navigation**
   - Search
   - Filters for difficulty/time
   - Sort options

## Component Patterns
- Recipe cards for list views
- Ingredient lists with grouping
- Step-by-step instructions
- Metadata display (timing, yield, difficulty)
- Print-optimized layouts 

## Styling Patterns
The project uses Tailwind CSS v4 with a custom design system:

1. **Theme Variables**
   - Custom colors through `--color-primary-*` variables
   - Typography settings with `--font-*` variables
   - Custom container sizes with `--container-*` variables

2. **Custom Utilities**
   - `container-recipe` for content container with appropriate reading width
   - Typography utilities leveraging the font variables

3. **Responsive Patterns**
   - Mobile-first design
   - Grid layouts that adapt from single column to multi-column
   - Stacked metadata on mobile, grid on larger screens
   - Responsive typography with `md:text-*` utilities

4. **Component Design**
   - Card-based UI for recipe listings
   - Clean, readable layout for recipe details
   - Consistent header and footer patterns
   - Metadata displayed in a structured format

5. **Interactive Elements**
   - Hover states for links and buttons
   - Group hover for card elements
   - Transition effects for smooth interactions

6. **Color System**
   - Primary color for main branding elements
   - Gray scale for neutral backgrounds and text
   - High contrast for readability
   - Consistent use of colors for specific UI purposes

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