'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  project: string;
  discount: string;
  validUntil: string;
  ctaText: string;
  ctaUrl: string;
  isActive: boolean;
}

export default function PromoBanner({ promos }: { promos: Promotion[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!promos || promos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [promos]);

  if (!promos || promos.length === 0) return null;

  return (
    <section className="relative z-10 overflow-hidden bg-white border-b border-slate-200">
      {/* Diagonal shine stripe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -bottom-4 w-20 bg-[#e53935]/[0.04] rotate-[20deg]" style={{ left: '38%' }} />
        <div className="absolute -top-4 -bottom-4 w-8 bg-[#1a2d6b]/[0.035] rotate-[20deg]" style={{ left: '42%' }} />
        <div className="absolute inset-y-0 left-0 w-1 bg-[#e53935]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6">
        {/* Promo slides */}
        <div className="relative h-[140px] sm:h-[110px] md:h-[88px]">
          {promos.map((promo, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={promo.id}
                className={`absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 transition-opacity duration-[1500ms] ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Left: badge + title */}
                <div className="text-center md:text-left text-[#1a2d6b] min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2 mb-1.5 px-2.5 py-1 rounded-full bg-[#e53935]/10 border border-[#e53935]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e53935] animate-pulse shrink-0" />
                    <span className="text-[#b71c1c] text-[9px] font-bold uppercase tracking-[0.25em]">
                      Limited Promotion
                    </span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold tracking-tight truncate">{promo.title}</h2>
                  <p className="text-slate-500 text-xs mt-0.5 truncate hidden md:block">{promo.subtitle}</p>
                </div>

                {/* Right: price + CTA */}
                <div className="flex items-center gap-4 md:gap-6 shrink-0">
                  <div className="hidden sm:block text-right border-r border-slate-200 pr-5 md:pr-6">
                    <span className="text-[9px] font-semibold text-slate-600 uppercase tracking-[0.2em] block mb-0.5">
                      Starting From
                    </span>
                    <span className="text-xl md:text-2xl font-black text-[#1a2d6b]">{promo.discount}</span>
                  </div>
                  <Link
                    href={promo.ctaUrl}
                    className="flex items-center gap-2 bg-[#c62828] hover:bg-[#b71c1c] text-white font-bold px-5 py-2.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 shadow-[0_4px_14px_rgba(229,57,53,0.35)] hover:shadow-[0_4px_20px_rgba(229,57,53,0.5)] group"
                  >
                    {promo.ctaText}
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot navigation */}
        {promos.length > 1 && (
          <div className="flex justify-center gap-1.5 pb-2.5 -mt-1">
            {promos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex ? 'w-5 bg-[#e53935]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`โปรโมชั่น ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
