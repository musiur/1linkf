/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', '1link.st'],
  },
  env: {
    API_HOST: "localhost:8080"
  }
}

module.exports = nextConfig
