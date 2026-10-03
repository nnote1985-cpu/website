import type { NextConfig } from "next";
import { LEGACY_PATTERN_REDIRECTS, LEGACY_REDIRECTS } from "./lib/legacyRedirects";

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

// Thai paths can arrive percent-encoded in either case (WordPress linked them lowercase-encoded),
// so each source is registered in every form. Next strips the trailing slash before these run.
function legacyRedirects() {
  const seen = new Set<string>();
  const rules: { source: string; destination: string; permanent: true }[] = [];
  for (const [path, destination] of LEGACY_REDIRECTS) {
    const encoded = encodeURI(path);
    for (const base of [path, encoded, encoded.toLowerCase()]) {
      if (seen.has(base)) continue;
      seen.add(base);
      rules.push({ source: base, destination, permanent: true });
    }
  }
  for (const [source, destination] of LEGACY_PATTERN_REDIRECTS) {
    rules.push({ source, destination, permanent: true });
  }
  return rules;
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
      ...legacyRedirects(),
    ];
  },
  images: {
    remotePatterns,
    qualities: [75, 90],
  },
  // Optimize for SEO - generate static pages where possible
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
