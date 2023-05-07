const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', '1link.st', 'www.google.com'],
  },
  env: {
<<<<<<< HEAD
    // API_HOST: "https://dark-ruby-llama-ring.cyclic.app"
    API_HOST: 'http://localhost:8080',
=======
    API_HOST: 'https://dark-ruby-llama-ring.cyclic.app',
    // API_HOST: 'http://localhost:8080',
>>>>>>> 158abfa2e4f03e9461dab1b23cc0bfee2d69a356
  },
  compiler: {
    removeConsole: true,
  },
}

module.exports = nextConfig
