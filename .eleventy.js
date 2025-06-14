const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  // Add the RSS plugin
  eleventyConfig.addPlugin(pluginRss);

  // Your other passthrough copies
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy(".well-known");
  eleventyConfig.addPassthroughCopy("robots.txt");

  // Your blog post collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md");
  });

  return {
    // Your other settings
    markdownTemplateEngine: "njk",
    dir: {
      input: ".", 
      output: "_site",
      includes: "_includes"
    }
  };
};