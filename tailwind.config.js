module.exports = {
  content: [
    './_includes/**/*.njk',
    './posts/**/*.md',
    './*.md',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}