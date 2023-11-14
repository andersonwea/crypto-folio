/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.api.cryptorank.io'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
