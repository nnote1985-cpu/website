// Map project slug → canonical URL
// 2 โครงการนี้มี short URL พิเศษ ที่เหลือใช้ /projects/:slug
const SHORT_URLS: Record<string, string> = {
  'elysium-phahol-59': '/elysium59',
  'the-celine-bang-chan': '/theceline',
};

export function projectUrl(slug: string): string {
  return SHORT_URLS[slug] ?? `/projects/${slug}`;
}
