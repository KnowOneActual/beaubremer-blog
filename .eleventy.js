module.exports = function(eleventyConfig) {
  // This creates a collection of all your blog posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md");
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: ".", // Use the root as the input directory
      output: "_site",
      includes: "_includes"
    }
  };
};