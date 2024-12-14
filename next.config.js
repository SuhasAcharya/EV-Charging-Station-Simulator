/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add Tailwind safelist for dynamic colors
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig 