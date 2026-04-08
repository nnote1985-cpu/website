import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatDate } from '@/lib/utils';
import FloatingCTA from '@/components/FloatingCTA';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  publishedAt: string;
  isPublished: boolean;
  tags: string[];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: item } = await supabaseAdmin.from('news').select('*').eq('slug', slug).single();
  if (!item) return { title: 'Not Found' };

  return {
    title: `${item.title} | ASAKAN`,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: item.image ? [{ url: item.image }] : [],
      type: 'article',
      publishedTime: item.publishedAt,
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await supabaseAdmin.from('news').select('*').eq('slug', slug).eq('is_published', true).single();
  if (!data) notFound();
  const item: NewsItem = { ...data, isPublished: data.is_published, publishedAt: data.published_at };

  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        {/* Header - ปรับใหม่ให้รูปแสดงผลชัดเจน */}
        <div className="bg-[#0f1e4a] text-white pt-28 pb-16 md:pt-36 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            
            {/* ฝั่งข้อความ */}
            <div className="text-center md:text-left order-2 md:order-1">
              <span className="inline-block bg-[#f4511e] text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 shadow-md">
                {item.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight text-white">
                {item.title}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-5 text-gray-300 text-sm border-t border-white/10 pt-5">
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#f4511e]" />
                  {formatDate(item.publishedAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Tag size={16} className="text-[#f4511e]" />
                  {item.author}
                </span>
              </div>
            </div>

            {/* ฝั่งรูปภาพ (ถ้ามีรูปจะโชว์ตรงนี้แบบเต็มๆ) */}
            {item.image && (
              <div className="order-1 md:order-2">
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 py-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[#f4511e] font-semibold text-sm mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={16} />
            กลับไปยังข่าวสาร
          </Link>

          <article className="prose-content">
            <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-[#f4511e] pl-4 mb-8 italic">
              {item.excerpt}
            </p>
            {item.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </article>

          {item.tags?.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-orange-50 text-[#f4511e] text-xs font-medium px-3 py-1 rounded-full border border-orange-100"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-[#1a2d6b] to-[#f4511e] rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-2">สนใจโครงการ ASAKAN?</h3>
            <p className="text-white/80 text-sm mb-6">รับคำปรึกษาฟรี จากทีมงานผู้เชี่ยวชาญ</p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#f4511e] font-bold px-8 py-3 rounded-xl hover:bg-orange-50"
            >
              ติดต่อเรา
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
