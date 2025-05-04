# System Patterns

## Data Architecture
```
src/
  _data/
    recipes/
      [recipe-name].yml    # Individual recipe files
```

## YAML Recipe Schema
```yaml
id: unique-identifier
title: Recipe Name
metadata:
  categories: []
  cuisine: String
  tags: []
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
/recipes/[recipe-id]/      # Individual recipe
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