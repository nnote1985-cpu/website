import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

const BASE = 'https://asakan.co.th';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    // หน้าหลัก — สำคัญที่สุด
    { url: BASE,                         lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },

    // หน้าหลักลำดับสอง
    { url: `${BASE}/projects`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/promotion`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/about`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/news`,               lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },

    // Member
    { url: `${BASE}/member`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/member/birthday`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/member/insurance`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/member/discount`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/member/fgf`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },

    // หน้าอื่น
    { url: `${BASE}/assetcare`,          lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/faq`,                lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`,            lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.5 },
  ];

  // หน้าโครงการ — ดึง slug จาก Supabase
  const { data: projects } = await supabaseAdmin
    .from('projects')
    .select('slug, created_at')
    .eq('is_active', true);

  const projectPages: MetadataRoute.Sitemap = (projects ?? []).map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: p.created_at ? new Date(p.created_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // หน้าข่าว — ดึง slug จาก Supabase
  const { data: news } = await supabaseAdmin
    .from('news')
    .select('slug, published_at, updated_at')
    .eq('is_published', true);

  const newsPages: MetadataRoute.Sitemap = (news ?? []).map((n) => ({
    url: `${BASE}/news/${n.slug}`,
    lastModified: n.updated_at ? new Date(n.updated_at) : new Date(n.published_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...projectPages, ...newsPages];
}
