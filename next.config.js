console.log('Environment variables in next.config.js:');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('TWITTER_CLIENT_ID exists:', !!process.env.TWITTER_CLIENT_ID);
console.log('TWITTER_CLIENT_SECRET exists:', !!process.env.TWITTER_CLIENT_SECRET);
console.log('NODE_ENV:', process.env.NODE_ENV);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false }
    }
    return config
  },
}

module.exports = nextConfig