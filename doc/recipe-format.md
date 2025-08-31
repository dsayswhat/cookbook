# Recipe Format Documentation

This document describes the standardized format used for recipes in the cookbook.

## File Structure

Each recipe is a markdown file located in `src/recipes/` with the naming convention `recipe-name.md` where the filename matches the recipe `id` field.

## YAML Frontmatter

Every recipe file begins with YAML frontmatter containing metadata:

```yaml
---
layout: layouts/recipe.njk
id: recipe-id
title: Recipe Display Title
metadata:
  categories: [Category1, Category2]
  cuisine: Cuisine Type
  tags: [tag1, tag2, tag3]
  difficulty: Easy/Medium/Hard
source_url: Optional URL or empty
---
```

### Required Fields

- `layout`: Always `layouts/recipe.njk`
- `id`: Unique identifier matching the filename (kebab-case)
- `title`: Human-readable recipe title
- `metadata.categories`: Array of category strings (e.g., "Main Course", "Dessert", "Side Dish")
- `metadata.cuisine`: String describing cuisine type (e.g., "American", "Italian", "French")
- `metadata.tags`: Array of descriptive tags for searching and filtering
- `metadata.difficulty`: One of "Easy", "Medium", or "Hard"

### Optional Fields

- `source_url`: URL to original recipe source (can be empty string)

## Content Structure

After the frontmatter, recipes follow this markdown structure:

### Ingredients Section
```markdown
## Ingredients

### Subsection Name (optional)
- Ingredient with quantity
- Another ingredient
```

Common ingredient subsections include:
- Main Ingredients
- Wet Ingredients  
- Dry Ingredients
- Filling
- Topping
- Other Ingredients

### Instructions Section
```markdown
## Instructions

1. Numbered step instructions
2. Each step on its own line
3. Clear, actionable directions
```

### Notes Section (Optional)
```markdown
## Notes

- Additional tips and variations
- Storage instructions
- Serving suggestions
- Historical or contextual information
```

### Time Information Section (Optional)
```markdown
## Time Information

- PREP TIME: X minutes
- COOK TIME: X minutes  
- BAKE TIME: X minutes
- TOTAL TIME: X minutes
- YIELD: Makes X servings
```

### Nutrition Information Section (Optional)
```markdown
## Nutrition Information

- Calories: X cal
- Total Fat: X g (Saturated Fat: X g)
- Cholesterol: X mg
- Sodium: X mg
- Carbohydrates: X g
- Fiber: X g
- Protein: X g
- Daily Values: percentages for vitamins/minerals
```

## Examples from Codebase

### Minimal Recipe (Candied Pecans)
Shows the basic required structure with simple ingredients and instructions.

### Detailed Recipe (Apple Crisp)  
Demonstrates full structure including time and nutrition information, ingredient subsections, and comprehensive notes.

### Recipe with Source (Buttermilk Biscuits)
Shows proper source attribution and detailed step-by-step instructions with variations.

### International Recipe (Carrots with Garlic)
Example of non-American cuisine with cultural context in notes.

### Family Recipe (Chicken Parmesan)
Simple family-style recipe with personal attribution in notes.

## Best Practices

1. **Consistent Naming**: Use kebab-case for IDs and filenames
2. **Clear Categories**: Use consistent category names across recipes
3. **Descriptive Tags**: Include searchable tags for ingredients and cooking methods
4. **Accurate Difficulty**: Be consistent with difficulty ratings
5. **Optional Sections**: Include time/nutrition info when available, but don't fabricate data
6. **Source Attribution**: Always include source_url when recipe is adapted from elsewhere
7. **Ingredient Organization**: Group related ingredients into logical subsections
8. **Step Clarity**: Write clear, sequential instructions that can be followed easily