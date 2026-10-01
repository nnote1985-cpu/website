import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import NewsList from '@/components/news/NewsList';
import FloatingCTA from '@/components/FloatingCTA';
import { JsonLd, SITE_URL, breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'ข่าวสาร & บทความ | ASAKAN อสังหาริมทรัพย์',
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
        <section className="relative isolate overflow-hidden bg-[#0f1e4a] text-white">
          <Image
            src="/hero/perspective7.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className="-z-10 object-cover object-[70%_center]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{ background: 'linear-gradient(180deg, rgba(10,20,52,0.55) 0%, rgba(10,20,52,0.72) 55%, rgba(10,20,52,0.94) 100%)' }}
          />
          <div className="max-w-7xl mx-auto px-6 md:px-4 pt-16 pb-16 md:pt-32 md:pb-24">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-orange-400" />
              <p className="text-orange-400 font-semibold text-xs uppercase tracking-[0.3em]">Blog</p>
            </div>
            <h1 className="text-[2.6rem] leading-[1.15] md:text-6xl font-bold mb-5 max-w-3xl">ข่าวสาร & บทความ</h1>
            <p className="text-white/75 text-base md:text-lg font-light leading-relaxed max-w-xl">
              วิเคราะห์ตลาด เคล็ดลับการลงทุน
              <br className="sm:hidden" /> และอัปเดตโครงการ
            </p>
            {published.length > 0 && (
              <p className="mt-8 text-xs tracking-widest uppercase text-white/50">
                {published.length} บทความ
              </p>
            )}
          </div>
        </section>

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
