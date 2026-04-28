import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
  },
];

if (supabaseUrl) {
  const { hostname } = new URL(supabaseUrl);
  remotePatterns.push({
    protocol: 'https',
    hostname,
    pathname: '/storage/v1/object/public/**',
  });
}

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
    remotePatterns,
  },
  // Optimize for SEO - generate static pages where possible
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
