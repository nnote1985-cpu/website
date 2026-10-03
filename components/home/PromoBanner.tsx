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
  const [paused, setPaused] = useState(false);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => { setEnhanced(true); }, []);

  useEffect(() => {
    if (!promos || promos.length <= 1 || paused) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const interval = setInterval(() => {
      if (document.hidden || reduced.matches) return;
      setCurrentIndex((prev) => (prev + 1) % promos.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [promos, paused]);

  if (!promos || promos.length === 0) return null;

  return (
    <section className="promo-banner relative z-10 overflow-hidden bg-white border-b border-slate-200" aria-label="โปรโมชันและข้อเสนอพิเศษ" onFocusCapture={() => setPaused(true)}>
      <noscript><style>{`.promo-banner .promo-slide{grid-area:auto!important;opacity:1!important;visibility:visible!important;pointer-events:auto!important}.promo-banner .promo-navigation{display:none!important}`}</style></noscript>
      {/* Diagonal shine stripe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -bottom-4 w-20 bg-[#e53935]/[0.04] rotate-[20deg]" style={{ left: '38%' }} />
        <div className="absolute -top-4 -bottom-4 w-8 bg-[#1a2d6b]/[0.035] rotate-[20deg]" style={{ left: '42%' }} />
        <div className="absolute inset-y-0 left-0 w-1 bg-[#e53935]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6">
        {/* Promo slides */}
        <div className="relative grid">
          {promos.map((promo, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={promo.id}
                aria-hidden={enhanced && !isActive ? true : undefined}
                style={{ gridArea: '1 / 1' }}
                className={`promo-slide flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6 py-5 transition-opacity duration-[1500ms] motion-reduce:transition-none ease-in-out ${
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
                  <h2 className="text-lg md:text-xl font-bold tracking-tight">{promo.title}</h2>
                  <p className="text-slate-500 text-xs mt-0.5">{promo.subtitle}</p>
                  {(promo.description || promo.validUntil) && <details className="mt-2 text-xs text-slate-600" onToggle={event => { if (event.currentTarget.open) setPaused(true); }}>
                    <summary className="cursor-pointer underline underline-offset-4" tabIndex={!enhanced || isActive ? 0 : -1}>รายละเอียดและเงื่อนไข</summary>
                    {promo.description && <p className="mt-2 whitespace-pre-line leading-relaxed">{promo.description}</p>}
                    {promo.validUntil && <p className="mt-1">ระยะเวลาโปรโมชัน: {promo.validUntil}</p>}
                  </details>}
                </div>

                {/* Right: price + CTA */}
                <div className="flex items-center gap-4 md:gap-6 shrink-0">
                  <div className="text-right border-r border-slate-200 pr-5 md:pr-6">
                    <span className="text-[9px] font-semibold text-slate-600 uppercase tracking-[0.2em] block mb-0.5">
                      Starting From
                    </span>
                    <span className="text-xl md:text-2xl font-black text-[#1a2d6b]">{promo.discount}</span>
                  </div>
                  <Link
                    href={promo.ctaUrl}
                    tabIndex={!enhanced || isActive ? 0 : -1}
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
          <div className="promo-navigation flex items-center justify-center gap-1.5 pb-2.5">
            {promos.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentIndex(i); setPaused(true); }}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex ? 'w-5 bg-[#e53935]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`โปรโมชั่น ${i + 1}`}
                aria-pressed={i === currentIndex}
              />
            ))}
            <button type="button" onClick={() => setPaused(!paused)} className="ml-3 px-2 py-2 text-xs text-slate-600 underline underline-offset-4">{paused ? 'เล่นอัตโนมัติ' : 'หยุดสไลด์'}</button>
          </div>
        )}
      </div>
    </section>
  );
}
