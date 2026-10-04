// Map project slug → canonical URL
// 2 โครงการนี้มี short URL พิเศษ ที่เหลือใช้ /projects/:slug
export const SHORT_URLS: Record<string, string> = {
  'elysium-phahol-59': '/elysium59',
  'the-celine-bang-chan': '/theceline',
};

export function projectUrl(slug: string): string {
  return SHORT_URLS[slug] ?? `/projects/${slug}`;
}

export function absoluteProjectUrl(slug: string): string {
  return `https://www.asakan.co.th${projectUrl(slug)}`;
}

// path ของหน้ารายละเอียดโครงการ → slug (null ถ้าไม่ใช่หน้าโครงการ)
export function slugFromProjectPath(pathname: string): string | null {
  const path = pathname.replace(/\/+$/, '') || '/';
  const short = Object.entries(SHORT_URLS).find(([, url]) => url === path);
  if (short) return short[0];
  const match = path.match(/^\/projects\/([^/]+)$/);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}
