import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroSlideshow from './HeroSlideshow';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  images?: string[];
}

const FALLBACK_IMAGES = [
  '/images/fallback.webp',
  '/images/fallback1.webp',
];

const STATS = [
  { value: '25+', label: 'ปีประสบการณ์' },
  { value: '2,500+', label: 'ยูนิตที่ส่งมอบ' },
  { value: '6', label: 'ทำเลกรุงเทพฯ' },
];

export default function HeroSection({ title, subtitle, description, ctaText, ctaUrl, images }: HeroProps) {
  const displayImages = images && images.length > 0 ? images : FALLBACK_IMAGES;
  const firstImage = displayImages[0];

  const words = title ? title.trim().split(' ') : [];
  const lastWord = words.pop();
  const firstPart = words.join(' ');

  return (
    <section className="relative h-[60vw] min-h-[480px] max-h-[85vh] md:h-[95vh] md:max-h-none w-full flex items-center overflow-hidden bg-[#050B14]">

      {/* First image — server-rendered for fast LCP */}
      <div className="absolute inset-0 z-0 bg-[#050B14]">
        <Image
          src={firstImage}
          alt="Asakan Residence View 1"
          fill
          sizes="100vw"
          priority
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
      </div>

      {/* Gradients — always visible above both server image and slideshow */}
      <div className="absolute inset-0 z-[15] bg-gradient-to-r from-[#050B14]/90 via-[#050B14]/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[15] bg-gradient-to-t from-[#050B14] via-transparent to-transparent opacity-80 pointer-events-none" />

      {/* Client slideshow — loads after JS, fades in over server image */}
      <HeroSlideshow images={displayImages} />

      {/* Content */}
      <div className="relative z-30 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl text-white pb-16 md:pb-0">

          {/* Subtitle badge */}
          <div className="inline-flex items-center gap-3 mb-6 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="w-6 h-[1.5px] bg-[#e53935]" />
            <p className="text-[#e53935] font-semibold tracking-[0.35em] uppercase text-[10px]">
              {subtitle}
            </p>
          </div>

          {/* Title — last word red */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-8 leading-[1.05] tracking-tight drop-shadow-2xl">
            {firstPart}{firstPart && ' '}<span className="text-[#e53935]">{lastWord}</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-300 mb-10 font-light leading-relaxed max-w-xl border-l-2 border-[#e53935]/60 pl-6 py-2">
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-12">
            <Link
              href={ctaUrl}
              className="group relative flex items-center gap-4 bg-white text-slate-900 font-bold px-10 py-4 hover:text-white transition-all duration-500 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-sm"
            >
              <span className="relative z-10 uppercase tracking-widest text-sm">{ctaText}</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 h-full w-full bg-[#e53935] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
            </Link>

            <Link
              href="/contact"
              className="group flex items-center gap-3 text-white/80 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors"
            >
              <span className="w-8 h-[2px] bg-white/30 group-hover:w-12 group-hover:bg-[#e53935] transition-all duration-300" />
              Explore Gallery
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-6 md:gap-10">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6 md:gap-10">
                <div>
                  <div className="text-2xl md:text-3xl font-black text-white leading-none">{stat.value}</div>
                  <div className="text-[10px] text-white/45 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
                {i < STATS.length - 1 && <div className="w-px h-8 bg-white/15" />}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Vertical text */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-8 text-white/30 z-30 pointer-events-none">
        <span className="[writing-mode:vertical-lr] text-[10px] font-bold tracking-[0.5em] uppercase">
          ASAKAN RESIDENCES
        </span>
        <div className="w-[1px] h-32 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-70 z-30 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white font-bold">Scroll</span>
        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#e53935] animate-[bounce_2s_infinite]" />
        </div>
      </div>

    </section>
  );
}
