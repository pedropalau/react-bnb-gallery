const withMdxEnhanced = require('next-mdx-enhanced');
const withMDX = require('@next/mdx');
const withTM = require('next-transpile-modules');

module.exports = withMdxEnhanced({
  layoutPath: 'layouts',
  extendFrontMatter: {
    phase: 'prebuild|loader|both',
  },
})(withMDX(withTM({
  transpileModules: ['react-bnb-gallery'],
})));
