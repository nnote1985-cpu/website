import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return process.env.SITE_URL ? { rules: { userAgent: '*', allow: '/' }, sitemap: `${process.env.SITE_URL}/sitemap.xml` } : { rules: { userAgent: '*', disallow: '/' } };
}
