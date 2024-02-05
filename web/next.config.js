/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.api.cryptorank.io', 'img.cryptorank.io'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
