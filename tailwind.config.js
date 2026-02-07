module.exports = {
  content: ['./_includes/**/*.njk', './posts/**/*.md', './*.md', './*.html'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
