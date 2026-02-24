/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-bnb-gallery'],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
