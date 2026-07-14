import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizeCss: true,
  },
  // Matikan ESLint saat build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Matikan TypeScript error saat build
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
