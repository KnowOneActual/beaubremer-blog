const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
  // Add the RSS plugin
  eleventyConfig.addPlugin(pluginRss);

  // Shortcode for the current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Passthrough copies for static assets
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy(".well-known");
  eleventyConfig.addPassthroughCopy("robots.txt");
  
  // Create a collection of all blog posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md");
  });
  
  // Create a unique, sorted list of all tags
  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tagSet = new Set();
    collectionApi.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });
    return [...tagSet].sort((a, b) => a.localeCompare(b));
  });

  const { DateTime } = require("luxon");

// Inside module.exports = function(eleventyConfig) { ... }
eleventyConfig.addFilter("readableDate", dateObj => {
  return DateTime.fromJSDate(dateObj).toFormat("LLLL dd, yyyy");
});

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: ".", 
      output: "_site",
      includes: "_includes"
    }
  };
};