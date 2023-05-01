const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', '1link.st', 'www.google.com'],
  },
  env: {
    API_HOST: 'https://dark-ruby-llama-ring.cyclic.app',
    // API_HOST: 'http://localhost:8080',
  },
  compiler: {
    removeConsole: true,
  },
}

module.exports = nextConfig
