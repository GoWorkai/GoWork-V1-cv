/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['blob.v0.dev', 'v0-image-analysis-one-psi-82.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.v0.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'v0-image-analysis-one-psi-82.vercel.app',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://v0-image-analysis-one-psi-82.vercel.app',
    NEXT_PUBLIC_REDIRECT_URL: 'https://v0-image-analysis-one-psi-82.vercel.app/chat',
  },
}

export default nextConfig
