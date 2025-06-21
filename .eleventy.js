const pluginRss = require("@11ty/eleventy-plugin-rss");
const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginRss);

  // Passthrough Copies
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy(".well-known");
  eleventyConfig.addPassthroughCopy("robots.txt");
  
  // Custom Shortcodes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  eleventyConfig.addShortcode("youtube", function(videoId) {
    return `<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.youtube.com/embed/${videoId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" allowfullscreen></iframe></div>`;
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt, sizes = "100vw") {
    if (!alt) {
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }
    let metadata = await Image(src, {
      widths: [600, 900, 1500],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/img/",
      urlPath: "/img/",
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      }
    });
    let lowsrc = metadata.jpeg[0];
    return `<picture>
      ${Object.values(metadata).map(imageFormat => {
        return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
      }).join("\n")}
      <img
        src="${lowsrc.url}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
  });

  // Custom Collections & Filters
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("LLLL dd, yyyy");
  });

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md");
  });
  
  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tagSet = new Set();
    collectionApi.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    });
    return [...tagSet].sort((a, b) => a.localeCompare(b));
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