/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    BASE_URL: process.env.BASE_URL
  },
  images: {
    deviceSizes: [640, 750, 1080, 1200],
    remotePatterns: [
      {
        protocol: 'http',
        // protocol: 'https',
        hostname: `${process.env.SERVER_IMAGE}`,
        pathname: '**'
      }
    ],
    formats: ['image/webp']
  }
};

module.exports = nextConfig;
