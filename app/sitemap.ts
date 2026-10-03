import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { projectUrl } from '@/lib/projectUrl';
import { getProjectDetailAccess } from '@/lib/projectAccess';

// CMS availability must not decide whether the rest of the site can deploy.
// Generate at request time; real database failures return an error, not a partial sitemap.
export const dynamic = 'force-dynamic';

// Omit dates when the CMS has no reliable content-modification timestamp.
function modified(value: unknown): { lastModified?: Date } {
  if (typeof value !== 'string' || !value.trim()) return {};
  const date = new Date(value);
  return Number.isFinite(date.getTime()) && date.getTime() <= Date.now()
    ? { lastModified: date } : {};
}

const BASE = 'https://www.asakan.co.th';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    // หน้าหลัก — สำคัญที่สุด
    { url: BASE,                         changeFrequency: 'daily',   priority: 1.0 },

    // หน้าหลักลำดับสอง
    { url: `${BASE}/projects`,           changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/promotion`,          changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/about`,              changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/news`,               changeFrequency: 'daily',   priority: 0.8 },

    // Member
    { url: `${BASE}/member`,             changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/member/birthday`,    changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/member/insurance`,   changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/member/discount`,    changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/member/fgf`,         changeFrequency: 'monthly', priority: 0.6 },

    // หน้าอื่น
    { url: `${BASE}/assetcare`,          changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/faq`,                changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/policy`,            changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/contact`,            changeFrequency: 'yearly',  priority: 0.5 },
  ];

  // หน้าโครงการ — ดึง slug จาก Supabase
  let projectResult = await supabaseAdmin
    .from('projects')
    .select('id, slug, updated_at')
    .eq('is_active', true);

  // Older databases do not yet track project edits. Preserve URLs without inventing dates.
  if (projectResult.error?.code === '42703' || projectResult.error?.code === 'PGRST204') {
    const fallback = await supabaseAdmin.from('projects').select('id, slug').eq('is_active', true);
    if (fallback.error) throw new Error('Cannot generate project sitemap');
    projectResult = { ...fallback, data: fallback.data?.map(p => ({ ...p, updated_at: null })) ?? null };
  }
  if (projectResult.error) throw new Error('Cannot generate project sitemap');
  const projects = projectResult.data;

  // Detail pages switched off in admin return 404, so keep them out of the sitemap
  const access = await getProjectDetailAccess();
  const projectPages: MetadataRoute.Sitemap = (projects ?? []).filter((p) => access[p.id] !== false).map((p) => ({
    url: `${BASE}${projectUrl(p.slug)}`,
    ...modified(p.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // หน้าข่าว — ดึง slug จาก Supabase
  let newsResult = await supabaseAdmin
    .from('news')
    .select('slug, published_at, updated_at')
    .eq('is_published', true);

  // Legacy news tables have published_at but no updated_at column.
  if (newsResult.error?.code === '42703' || newsResult.error?.code === 'PGRST204') {
    const fallback = await supabaseAdmin.from('news').select('slug, published_at').eq('is_published', true);
    if (fallback.error) throw new Error(`Cannot generate news sitemap (${fallback.error.code})`);
    newsResult = { ...fallback, data: fallback.data?.map(n => ({ ...n, updated_at: null })) ?? null };
  }
  if (newsResult.error) throw new Error(`Cannot generate news sitemap (${newsResult.error.code})`);
  const news = newsResult.data;
  const newsPages: MetadataRoute.Sitemap = (news ?? []).map((n) => ({
    url: `${BASE}/news/${n.slug}`,
    ...modified(n.updated_at || n.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...newsPages];
}
