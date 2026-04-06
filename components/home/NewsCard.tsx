'use client';

import Link from 'next/link';
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
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover group border border-gray-100">
      <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {news.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
        <span className="absolute top-3 left-3 bg-[#f4511e] text-white text-xs font-semibold px-3 py-1 rounded-full">
          {news.category}
        </span>
      </div>
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
        <h3 className="font-bold text-[#1a2d6b] text-sm leading-snug mb-2 group-hover:text-[#f4511e] transition-colors line-clamp-2">
          {news.title}
        </h3>
        <p className="text-gray-500 text-xs line-clamp-2 mb-3">{news.excerpt}</p>
        <Link
          href={`/news/${news.slug}`}
          className="text-[#f4511e] text-xs font-semibold hover:underline"
        >
          อ่านต่อ →
        </Link>
      </div>
    </article>
  );
}
