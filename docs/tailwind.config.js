const tailwindui = require('@tailwindcss/ui');
const typography = require('@tailwindcss/typography');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './layouts/**/*.js',
    './components/**/*.js',
    './pages/**/*.js',
    './pages/**/*.mdx',
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
  variants: {},
  plugins: [
    tailwindui,
    typography,
  ],
};
