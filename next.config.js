/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pbs.twimg.com', 'avatars.githubusercontent.com', 'abs.twimg.com'],
  },
}

module.exports = nextConfig