module.exports = function(eleventyConfig) {
  // This creates a collection of all your blog posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md");
  });

  // This new line ensures the 'img' folder and its contents are copied
  eleventyConfig.addPassthroughCopy("img");

  return {
    // This tells Eleventy to use Nunjucks for all Markdown files
    markdownTemplateEngine: "njk",
    
    // This defines the directory structure
    dir: {
      input: ".", // Use the root as the input directory
      output: "_site",
      includes: "_includes"
    }
  };
};