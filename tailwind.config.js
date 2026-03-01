module.exports = {
  content: ['./_includes/**/*.njk', './posts/**/*.md', './*.md', './*.html', './index.md'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        gray: {
          950: '#0a0a0c', // Slightly deeper black for more contrast
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')({
      className: 'prose',
    }),
  ],
};
