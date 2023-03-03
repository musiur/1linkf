/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', '1link.st', 'www.google.com'],
  },
  env: {
    // API_HOST: "https://dark-ruby-llama-ring.cyclic.app"
    API_HOST: 'http://localhost:8080',
  },
}

module.exports = nextConfig
