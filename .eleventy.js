module.exports = function(eleventyConfig) {
  // This tells Eleventy to copy the img folder
  eleventyConfig.addPassthroughCopy("img");

  // This copies your .well-known folder
  eleventyConfig.addPassthroughCopy(".well-known");

  // This new line copies your robots.txt file
  eleventyConfig.addPassthroughCopy("robots.txt");

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