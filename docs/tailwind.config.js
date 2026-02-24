const typography = require('@tailwindcss/typography');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './layouts/**/*.js',
    './components/**/*.js',
    './pages/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter var',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [
    typography,
  ],
};
