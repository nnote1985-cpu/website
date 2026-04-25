import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/projects/elysium-phahol-59',
        destination: '/elysium59',
        permanent: true,
      },
      {
        source: '/projects/the-celine-bang-chan',
        destination: '/theceline',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimize for SEO - generate static pages where possible
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
