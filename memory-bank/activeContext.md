# Active Context

## Current State
Using Markdown with YAML frontmatter for recipe files. Core collections (recipes, categories, tags) configured. Focus now on completing the layout system and implementing core functionality.

## Next Steps
1. Complete layout system implementation
   - Create base layout template
   - Implement header and footer components
   - Set up navigation structure
2. Complete basic templates
   - Enhance recipe template with all metadata
   - Implement recipe listing with filtering
   - Add category/tag taxonomy pages
3. Set up styling foundation
   - Choose CSS approach (vanilla vs framework)
   - Implement responsive design
   - Add print stylesheets
4. Implement search functionality
   - Choose search implementation method
   - Add search interface
   - Implement filtering by metadata

## Recent Decisions
- Selected Eleventy over other SSGs for flexibility
- Using Markdown with YAML frontmatter for recipes
- Decided on Nunjucks as primary template language
- Will use Puppeteer for PDF generation
- Using collections for recipes, categories, and tags

## Questions/Considerations
1. Should PDF generation happen at build time or on-demand?
2. How to handle recipe images in the current structure?
3. Need to determine search implementation approach
4. Consider adding recipe scaling functionality
5. How to handle recipe variations/adaptations?
6. Should we implement a recipe editor interface?

## Blockers
- Need to finalize complete recipe format
- Determine image handling strategy
- Decide on styling approach (vanilla CSS vs. framework)
- Need to resolve search implementation method
- URL route conflict: `/recipes/id` vs. `/recipe/id` paths behaving differently with frontmatter rendering 