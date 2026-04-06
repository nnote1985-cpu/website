import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
