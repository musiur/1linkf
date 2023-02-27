/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', '1link.st'],
  },
  env: {
    API_HOST: "dark-ruby-llama-ring.cyclic.app"
  }
}

module.exports = nextConfig
