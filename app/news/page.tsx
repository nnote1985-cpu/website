import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import NewsList from '@/components/news/NewsList';
import FloatingCTA from '@/components/FloatingCTA';
import { JsonLd, SITE_URL, breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: 'ข่าวสาร & บทความ | ASAKAN อสังหาริมทรัพย์' },
  alternates: { canonical: '/news' },
  description: 'ข่าวสารล่าสุด บทความวิเคราะห์ตลาดอสังหาริมทรัพย์ เคล็ดลับการซื้อคอนโด และข้อมูลสินเชื่อบ้าน จาก ASAKAN',
};

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
  isPublished: boolean;
}

export default async function NewsPage() {
  const { data } = await supabaseAdmin.from('news').select('*').eq('is_published', true).order('published_at', { ascending: false });
  const published: NewsItem[] = (data || []).map((n) => ({ ...n, isPublished: n.is_published, publishedAt: n.published_at }));
  const categories = [...new Set(published.map((n) => n.category))];
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ข่าวสารและบทความ ASAKAN',
    itemListElement: published.map((news, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/news/${news.slug}`,
      name: news.title,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'หน้าแรก', path: '' },
        { name: 'ข่าวสาร', path: '/news' },
      ])} />
      <JsonLd data={itemListJsonLd} />
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        <PageHero
          eyebrow="Blog"
          title="ข่าวสาร & บทความ"
          subtitle={
            <>
              วิเคราะห์ตลาด เคล็ดลับการลงทุน
              <br className="sm:hidden" /> และอัปเดตโครงการ
            </>
          }
          meta={published.length > 0 ? `${published.length} บทความ` : undefined}
        />

        <section className="pt-4 md:pt-6 pb-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <NewsList items={published} categories={categories} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
