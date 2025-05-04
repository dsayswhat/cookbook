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

1. Step 1
2. Step 2
...

## Notes
Additional notes or variations
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
```
/                          # Homepage
/recipes/                  # All recipes
/recipe/[recipe-id]/       # Individual recipe (preferred but has frontmatter issues)
/recipes/[recipe-id]/      # Individual recipe (currently working better with frontmatter)
/categories/[category]/    # Recipes by category
/tags/[tag]/              # Recipes by tag
/recipes/[recipe-id].pdf  # PDF version
```

## Component Patterns
- Recipe cards for list views
- Ingredient lists with grouping
- Step-by-step instructions
- Metadata display (timing, yield, difficulty)
- Print-optimized layouts 