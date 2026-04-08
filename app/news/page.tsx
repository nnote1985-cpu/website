import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/home/NewsCard';
import FloatingCTA from '@/components/FloatingCTA';

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

  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        <section
          className="py-20 text-white"
          style={{ background: 'linear-gradient(135deg, #0f1e4a 0%, #1a2d6b 60%, #2a3d8b 100%)' }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Blog</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">ข่าวสาร & บทความ</h1>
            <p className="text-gray-300 text-lg">วิเคราะห์ตลาด เคล็ดลับการลงทุน และอัปเดตโครงการ</p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            {categories.length > 1 && (
              <div className="flex gap-2 flex-wrap mb-8">
                <span className="text-sm font-medium text-gray-500 self-center">หมวดหมู่:</span>
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#f4511e] hover:text-[#f4511e] cursor-pointer transition-colors"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}

            {published.length === 0 ? (
              <div className="text-center py-20 text-gray-400">ยังไม่มีบทความ</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {published.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
