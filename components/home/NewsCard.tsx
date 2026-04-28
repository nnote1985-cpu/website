'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
}

export default function NewsCard({ news }: { news: NewsItem }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(15,30,74,0.07)] card-hover group ring-1 ring-slate-200/70">
      <Link href={`/news/${news.slug}`} className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden block">
        {news.image && (
          <Image
            src={news.image}
            alt={news.title}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <span className="absolute top-3 left-3 bg-[#e53935] text-white text-xs font-semibold px-3 py-1 rounded-full">
          {news.category}
        </span>
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(news.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Tag size={12} />
            {news.category}
          </span>
        </div>
        <Link href={`/news/${news.slug}`}>
          <h3 className="font-bold text-[#1a2d6b] text-sm leading-snug mb-2 group-hover:text-[#e53935] transition-colors line-clamp-2 cursor-pointer">
            {news.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-xs line-clamp-2 mb-3">{news.excerpt}</p>
        <Link
          href={`/news/${news.slug}`}
          className="text-[#e53935] text-xs font-semibold hover:underline"
        >
          อ่านต่อ →
        </Link>
      </div>
    </article>
  );
}
