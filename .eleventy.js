const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  // Add markdown support
  const md = new markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });
  eleventyConfig.setLibrary("md", md);

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch for changes in these directories
  eleventyConfig.addWatchTarget("src/_includes");
  eleventyConfig.addWatchTarget("src/recipes");

  // Create a collection for all recipes
  eleventyConfig.addCollection("allRecipes", function(collection) {
    return collection.getFilteredByGlob("src/recipes/*.md");
  });

  // Collections for categories and tags
  eleventyConfig.addCollection("categories", function(collection) {
    const categories = new Set();
    
    const recipes = collection.getFilteredByGlob("src/recipes/*.md");
    recipes.forEach(recipe => {
      if (recipe.data?.metadata?.categories) {
        recipe.data.metadata.categories.forEach(category => {
          categories.add(category);
        });
      }
    });
    
    return Array.from(categories).sort();
  });

  eleventyConfig.addCollection("tags", function(collection) {
    const tags = new Set();
    
    const recipes = collection.getFilteredByGlob("src/recipes/*.md");
    recipes.forEach(recipe => {
      if (recipe.data?.metadata?.tags) {
        recipe.data.metadata.tags.forEach(tag => {
          tags.add(tag);
        });
      }
    });
    
    return Array.from(tags).sort();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
