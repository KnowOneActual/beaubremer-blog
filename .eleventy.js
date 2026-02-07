const pluginRss = require('@11ty/eleventy-plugin-rss');
const { DateTime } = require('luxon');
const Image = require('@11ty/eleventy-img');
const path = require('path');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  // === PLUGINS ===
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);
  // === PASSTHROUGH COPIES ===
  // **THE FIX IS HERE:** The destination paths now correctly include the "assets" folder.
  eleventyConfig.addPassthroughCopy({
    'node_modules/lite-youtube-embed/src/lite-yt-embed.css': 'assets/css/lite-yt-embed.css',
  });
  eleventyConfig.addPassthroughCopy({
    'node_modules/lite-youtube-embed/src/lite-yt-embed.js': 'assets/js/lite-yt-embed.js',
  });

  // Your other passthrough copies
  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('.well-known');
  eleventyConfig.addPassthroughCopy('robots.txt');

  // === CUSTOM SHORTCODES ===
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  // Using addNunjucksShortcode to ensure it's available in Markdown files
  eleventyConfig.addNunjucksShortcode('youtube', (videoId, label = 'Play YouTube video') => {
    return `<lite-youtube videoid="${videoId}" playlabel="${label}"></lite-youtube>`;
  });

  eleventyConfig.addNunjucksAsyncShortcode('image', async function (src, alt, sizes = '100vw') {
    if (!alt) {
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }
    let metadata = await Image(src, {
      widths: [600, 900, 1500],
      formats: ['webp', 'jpeg'],
      outputDir: './_site/img/',
      urlPath: '/img/',
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      },
    });
    let lowsrc = metadata.jpeg[0];
    return `<picture>
      ${Object.values(metadata)
        .map((imageFormat) => {
          return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat
            .map((entry) => entry.srcset)
            .join(', ')}" sizes="${sizes}">`;
        })
        .join('\n')}
      <img
        src="${lowsrc.url}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
  });

  // === CUSTOM COLLECTIONS & FILTERS ===
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('LLLL dd, yyyy');
  });

  eleventyConfig.addCollection('posts', function (collectionApi) {
    return collectionApi.getFilteredByGlob('posts/*.md');
  });

  eleventyConfig.addCollection('tagList', function (collectionApi) {
    const tagSet = new Set();
    collectionApi.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    return [...tagSet].sort((a, b) => a.localeCompare(b));
  });

  // === ELEVENTY CONFIGURATION ===
  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: '.',
      output: '_site',
      includes: '_includes',
    },
  };
};
