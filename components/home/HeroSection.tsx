import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroSlideshow from './HeroSlideshow';
import HeroVideo from './HeroVideo';

interface HeroProps {
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  images?: string[];
  videoSrc?: string;
  posterSrc?: string;
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

export default function HeroSection({ title, description, ctaText, ctaUrl, images, videoSrc, posterSrc }: HeroProps) {
  const displayImages = images && images.length > 0 ? images : FALLBACK_IMAGES;
  const firstImage = displayImages[0];
  const fallbackImage = posterSrc || firstImage;

  const words = title ? title.trim().split(' ') : [];
  const lastWord = words.pop();
  const firstPart = words.join(' ');

  return (
    <section className="relative min-h-[85dvh] w-full overflow-hidden bg-[#050B14] md:h-[95dvh]">

      {/* First image — server-rendered for fast LCP */}
      <div className="absolute inset-0 z-0 bg-[#050B14]">
        {videoSrc ? (
          <>
            <Image
              src={firstImage}
              alt="ASAKAN residence landscape"
              fill
              sizes="100vw"
              priority
              className="absolute inset-0 h-full w-full object-cover object-center md:hidden"
            />
            <Image
              src={fallbackImage}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              priority
              className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
            />
          </>
        ) : (
          <Image
            src={firstImage}
            alt="ASAKAN residence landscape"
            fill
            sizes="100vw"
            priority
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
      </div>

      {/* Desktop video; the server-rendered image remains the loading and failure fallback. */}
      {videoSrc && <HeroVideo src={videoSrc} poster={fallbackImage} />}

      {/* Gradients keep the architecture visible while reserving contrast for live HTML text. */}
      <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-b from-[#050B14]/65 via-[#050B14]/10 to-[#050B14]/85" />
      <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-r from-[#050B14]/70 via-[#050B14]/10 to-transparent" />

      {/* The original project-image slideshow is preserved for phones. */}
      <HeroSlideshow images={displayImages} mobileOnly={Boolean(videoSrc)} />

      <div className="relative z-30 mx-auto flex min-h-[85dvh] w-full max-w-[1600px] flex-col px-6 pb-8 pt-32 sm:px-10 sm:pt-36 md:min-h-[95dvh] md:px-12 md:pb-10 md:pt-40 lg:px-20">
        {/* Centered editorial headline, inspired by the selected reference layout. */}
        <div className="mx-auto max-w-5xl text-center text-white">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-white/70 sm:text-xs">
            ASAKAN RESIDENCES · BANGKOK
          </p>

          <h1 className="text-5xl font-bold leading-[0.9] tracking-[-0.05em] drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-[5.6rem] xl:text-[6.5rem]">
            {firstPart}{firstPart && ' '}<span className="text-[#e53935]">{lastWord}</span>
          </h1>
        </div>

        {/* Bottom-left action block preserves the original content in the new composition. */}
        <div className="mt-auto max-w-xl text-white">
          <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.26em] text-white/70 sm:text-xs">
            <span className="h-px w-9 bg-[#e53935]" />
            <span>Live Beyond the Expected</span>
          </div>

          <p className="mb-6 max-w-lg text-sm font-light leading-relaxed text-white/85 sm:text-base md:mb-8 md:text-lg">
            {description}
          </p>

          <div className="mb-7 flex flex-col items-start gap-4 sm:mb-9 sm:flex-row sm:items-center sm:gap-7">
            <Link
              href={ctaUrl}
              className="group relative flex min-h-12 items-center gap-4 overflow-hidden rounded-sm bg-white px-8 py-3.5 font-bold text-slate-900 shadow-[0_16px_40px_rgba(0,0,0,0.26)] transition-all duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#050B14]"
            >
              <span className="relative z-10 uppercase tracking-widest text-sm">{ctaText}</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 h-full w-full bg-[#e53935] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
            </Link>

            <Link
              href="/contact"
              className="group flex min-h-12 items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#050B14]"
            >
              <span className="w-8 h-[2px] bg-white/30 group-hover:w-12 group-hover:bg-[#e53935] transition-all duration-300" />
              Explore Gallery
            </Link>
          </div>

          <div className="grid max-w-xl grid-cols-3 gap-3 sm:gap-6">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={`${i > 0 ? 'border-l border-white/15 pl-3 sm:pl-6' : ''} min-w-0`}>
                <div className="text-2xl font-black leading-none text-white md:text-3xl">{stat.value}</div>
                <div className="mt-1 text-[9px] uppercase leading-tight tracking-wider text-white/55 sm:text-[10px] sm:tracking-widest">{stat.label}</div>
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
      <div className="pointer-events-none absolute bottom-8 right-8 z-30 hidden flex-col items-center gap-3 opacity-70 sm:flex md:bottom-10 md:right-12">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white font-bold">Scroll</span>
        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#e53935] animate-[bounce_2s_infinite]" />
        </div>
      </div>

    </section>
  );
}
