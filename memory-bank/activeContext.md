# Active Context

## Current State
Setting up initial Eleventy project with YAML-based recipe management system. Focus on establishing data structure and basic site generation.

## Next Steps
1. Create Eleventy configuration file
2. Set up YAML data parsing
3. Create basic recipe template
4. Implement recipe listing page
5. Add taxonomy pages (categories, tags)
6. Set up PDF generation pipeline

## Recent Decisions
- Selected Eleventy over other SSGs for flexibility
- Chose YAML over JSON for better readability
- Decided on Nunjucks as primary template language
- Will use Puppeteer for PDF generation

## Questions/Considerations
1. Should PDF generation happen at build time or on-demand?
2. How to handle recipe images in YAML structure?
3. Need to determine search implementation approach
4. Consider adding recipe scaling functionality
5. How to handle recipe variations/adaptations?

## Blockers
- Need to finalize complete YAML schema
- Determine image handling strategy
- Decide on styling approach (vanilla CSS vs. framework) 