const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', '1link.st', 'www.google.com'],
  },
  env: {
<<<<<<< HEAD
    API_HOST: 'https://dark-ruby-llama-ring.cyclic.app',
    // API_HOST: 'http://localhost:8080',
=======
    // API_HOST: "https://dark-ruby-llama-ring.cyclic.app"
    API_HOST: 'http://localhost:8080',
>>>>>>> 0afa90b692ab0f0e0ebfe14f2d3269b8d2e0a854
  },
  compiler: {
    removeConsole: true,
  },
}

module.exports = nextConfig
