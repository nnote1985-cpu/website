'use client';

import { useState } from 'react';
import NewsCard from '@/components/home/NewsCard';

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
}

const ALL = 'ทั้งหมด';

export default function NewsList({ items, categories }: { items: NewsItem[]; categories: string[] }) {
  const [active, setActive] = useState(ALL);
  const shown = active === ALL ? items : items.filter((n) => n.category === active);
  const tabs = [ALL, ...categories];

  return (
    <>
      {categories.length > 1 ? (
        <div className="relative -mt-7 md:-mt-8 mb-8 md:mb-10">
          <div
            role="tablist"
            aria-label="หมวดหมู่บทความ"
            className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-white rounded-2xl p-1.5 shadow-[0_14px_40px_rgba(15,30,74,0.12)] ring-1 ring-slate-200/70 w-full md:w-max max-w-full"
          >
            {tabs.map((cat) => {
              const on = cat === active;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(cat)}
                  className={`shrink-0 px-4 md:px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    on ? 'bg-[#1a2d6b] text-white shadow-sm' : 'text-slate-500 hover:text-[#1a2d6b] hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="h-12" />
      )}

      {shown.length === 0 ? (
        <div className="text-center py-20 text-gray-400">ยังไม่มีบทความ</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      )}
    </>
  );
}
