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
        <div className="-mx-4 md:mx-0 mb-8 md:mb-10 border-b border-slate-200">
          <div
            role="tablist"
            aria-label="หมวดหมู่บทความ"
            className="flex gap-6 md:gap-8 overflow-x-auto px-4 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  className={`relative shrink-0 py-4 text-sm whitespace-nowrap transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:transition-colors ${
                    on
                      ? 'font-semibold text-[#1a2d6b] after:bg-[#f4511e]'
                      : 'font-medium text-slate-400 hover:text-[#1a2d6b] after:bg-transparent'
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
