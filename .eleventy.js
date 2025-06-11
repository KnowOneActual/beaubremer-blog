module.exports = function(eleventyConfig) {
  // This tells Eleventy to copy the assets folder
  eleventyConfig.addPassthroughCopy("img");

  // This new line ensures the '.well-known' folder is also copied
  eleventyConfig.addPassthroughCopy(".well-known");

  // This creates a collection of all your blog posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md");
  });

  return {
    // This tells Eleventy to use Nunjucks for all Markdown files
    markdownTemplateEngine: "njk",
    
    // This defines the directory structure
    dir: {
      input: ".", 
      output: "_site",
      includes: "_includes"
    }
  };
};