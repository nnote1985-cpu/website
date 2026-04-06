import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readData } from '@/lib/db';
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
  const news = readData<NewsItem[]>('news.json');
  const item = news.find((n) => n.slug === slug);
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
  const news = readData<NewsItem[]>('news.json');
  const item = news.find((n) => n.slug === slug && n.isPublished);

  if (!item) notFound();

  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        {/* Header */}
        <div
          className="relative py-20 text-white"
          style={{ background: 'linear-gradient(135deg, #0f1e4a 0%, #1a2d6b 60%, #2a3d8b 100%)' }}
        >
          {item.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
          )}
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <span className="inline-block bg-[#f4511e] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {item.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{item.title}</h1>
            <div className="flex items-center justify-center gap-4 text-gray-300 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(item.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag size={14} />
                {item.author}
              </span>
            </div>
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
