import type { NextConfig } from 'next';

const legacy = new URL(process.env.LEGACY_SITE_URL || 'https://website-delta-blush-73.vercel.app');
if (!['https:', 'http:'].includes(legacy.protocol)) throw new Error('LEGACY_SITE_URL must be an HTTP(S) URL');
if (process.env.SITE_URL && new URL(process.env.SITE_URL).origin === legacy.origin) {
  throw new Error('LEGACY_SITE_URL must use a separate legacy deployment to prevent redirect loops.');
}
const destinations = [
  '/elysium59', '/theceline', '/projects', '/projects/:slug',
  '/about', '/assetcare', '/member', '/member/:slug', '/promotion',
  '/news', '/news/:slug', '/faq', '/contact', '/policy',
];

const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/projects/elysium-phahol-59', destination: '/elysium59', permanent: true },
      { source: '/projects/the-celine-bang-chan', destination: '/theceline', permanent: true },
      ...destinations.map((path) => ({ source: path, destination: `${legacy.origin}${path}`, permanent: false })),
    ];
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ] }];
  },
};
export default config;
