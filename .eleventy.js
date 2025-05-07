const markdownIt = require("markdown-it");
const postcss = require("postcss");
const tailwindcss = require("@tailwindcss/postcss");
const autoprefixer = require("autoprefixer");
const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
  // Add markdown support
  const md = new markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });
  eleventyConfig.setLibrary("md", md);

  // Process CSS with PostCSS
  eleventyConfig.addTemplateFormats("css");
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function(inputContent, inputPath) {
      if (inputPath.includes('/_site/')) {
        return;
      }
      
      if (!inputPath.endsWith("styles.css")) {
        return () => inputContent;
      }

      return async () => {
        const result = await postcss([
          tailwindcss,
          autoprefixer
        ]).process(inputContent, {
          from: inputPath,
          to: path.join("_site", path.basename(inputPath))
        });
        return result.css;
      };
    }
  });

  // Add a limit filter for limiting collection items
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });

  // Add a date filter for formatting dates
  eleventyConfig.addFilter("date", function(date, format) {
    if (format === "yyyy") {
      return new Date().getFullYear();
    }
    return date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString();
  });

  // Add a filter to prepend the path prefix to URLs
  eleventyConfig.addFilter("url", function(urlPath) {
    // Determine if we're building for GitHub Pages
    const isGitHubPages = process.env.GITHUB_ACTIONS === "true" || process.env.ELEVENTY_ENV === "github";
    const pathPrefix = isGitHubPages ? "/cookbook" : "";
    
    // Handle undefined or non-string values
    if (!urlPath || typeof urlPath !== "string") {
      return urlPath;
    }
    
    // Don't modify external URLs
    if (urlPath.startsWith("http")) {
      return urlPath;
    }
    
    // Ensure URL starts with a slash
    if (!urlPath.startsWith("/")) {
      urlPath = "/" + urlPath;
    }
    
    return `${pathPrefix}${urlPath}`;
  });

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch for changes in these directories
  eleventyConfig.addWatchTarget("src/_includes");
  eleventyConfig.addWatchTarget("src/recipes");
  eleventyConfig.addWatchTarget("src/css");

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

  // Determine if we're building for GitHub Pages
  const isGitHubPages = process.env.GITHUB_ACTIONS === "true" || process.env.ELEVENTY_ENV === "github";
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html", "css"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    // Path prefix for GitHub Pages deployment
    pathPrefix: isGitHubPages ? "/cookbook/" : "/"
  };
};
