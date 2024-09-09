/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add this section:
  webpack: (config, { isServer }) => {
    console.log('Building for server:', isServer)
    console.log('NODE_ENV:', process.env.NODE_ENV)
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false }
    }
    return config
  },
}

console.log('NEXTAUTH_URL in next.config.js:', process.env.NEXTAUTH_URL)

module.exports = nextConfig