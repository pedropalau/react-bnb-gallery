const withMdxEnhanced = require('next-mdx-enhanced');
const withMDX = require('@next/mdx');

module.exports = withMdxEnhanced({
  layoutPath: 'layouts',
  extendFrontMatter: {
    phase: 'prebuild|loader|both',
  },
})(withMDX());
