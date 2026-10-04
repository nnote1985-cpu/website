'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, MapPin, TrainFront, Building2, Home } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import RegisterForm from '@/components/projects/RegisterForm';
import PromoProjectHeading from '@/components/projects/PromoProjectHeading';

const mont = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700', '800'], display: 'swap' });
// Cormorant Garamond is loaded as a plain stylesheet: next/font/google fails to resolve
// its font files in Turbopack builds on Vercel ("queries have exactly one entry").
const SERIF_HREF = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,500&display=swap';

interface CustomProject {
  slug?: string;
  name: string;
  phone?: string;
  promoBanner?: string;
  promoBannerMobile?: string;
  heroImage?: string;
  image?: string;
  type?: string;
  concept?: string;
  description?: string;
  features?: string[];
  priceMin?: number;
  location?: string;
  bts?: string;
  floors?: number;
  units?: number;
}

export default function ElysiumCustom({ project }: { project: CustomProject }) {
  const promoBanner = project.promoBanner?.trim();
  const hasPromoPath = Boolean(promoBanner);
  const [brokenPromoBanner, setBrokenPromoBanner] = useState<string | null>(null);

  useEffect(() => {
    if (promoBanner) {
      const img = new window.Image();
      img.src = promoBanner;
      img.onerror = () => setBrokenPromoBanner(promoBanner);
    }
  }, [promoBanner]);

  const showPromo = hasPromoPath && brokenPromoBanner !== promoBanner;

  const nameWords = project.name ? project.name.split(' ') : [];
  const lastWord = nameWords.pop();
  const firstPart = nameWords.join(' ');

  const heroImageUrl = showPromo ? promoBanner : (project.heroImage || project.image);
  const mobilePromoUrl = project.promoBannerMobile || promoBanner;
  const phone = project.phone || '0991982940';
  const phoneTel = phone.replace(/-/g, '');
  const startingPrice = project.priceMin
    ? `${(project.priceMin / 1000000).toFixed(2)} ล้าน`
    : 'สอบถามราคา';

  const facts = [
    { icon: <Home size={15} />, label: 'ราคาเริ่มต้น', value: startingPrice },
    { icon: <MapPin size={15} />, label: 'ทำเล', value: project.location || 'กรุงเทพฯ' },
    { icon: <TrainFront size={15} />, label: 'ใกล้รถไฟฟ้า', value: project.bts || 'ทำเลศักยภาพ' },
    { icon: <Building2 size={15} />, label: 'โครงการ', value: project.units ? `${project.units} ยูนิต` : project.floors ? `${project.floors} ชั้น` : project.type || 'Condominium' },
  ];

  const FormCard = (
    <div className="relative overflow-hidden rounded-2xl border border-[#C2A363]/[0.18] bg-[#0b1630]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_6px_rgba(0,0,0,0.25),0_18px_40px_rgba(0,0,0,0.35),0_40px_100px_rgba(5,11,20,0.55)] backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D9BE85] to-transparent" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#C2A363]/10 blur-3xl" />

      <div className="relative px-7 pt-7 pb-6 [@media(max-height:800px)]:pt-5 [@media(max-height:800px)]:pb-4">
        <div className="mb-5 text-center [@media(max-height:800px)]:mb-3">
          <p className={`${mont.className} text-[10px] font-semibold uppercase tracking-[0.45em] text-[#C2A363]`}>
            Private Appointment
          </p>
          <link rel="stylesheet" href={SERIF_HREF} precedence="default" />
          <h3 className="mt-2 font-['Cormorant_Garamond',Georgia,serif] text-[40px] font-medium italic leading-none text-white [@media(max-height:800px)]:text-[32px]">
            Register Now
          </h3>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2 [@media(max-height:800px)]:hidden">
            <span className="h-px w-8 bg-[#C2A363]/50" />
            <span className="h-1 w-1 rotate-45 bg-[#C2A363]" />
            <span className="h-px w-8 bg-[#C2A363]/50" />
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-white/75 [@media(max-height:800px)]:mt-2">
            รับข้อมูล ราคา และสิทธิพิเศษของ {project.name}
          </p>
        </div>

        <RegisterForm projectName={project.name} projectSlug={project.slug} variant="luxe" />
      </div>

      <a
        href={`tel:${phoneTel}`}
        className="group relative flex items-center justify-between gap-3 border-t border-[#C2A363]/20 px-7 py-4 [@media(max-height:800px)]:py-3 transition-colors hover:bg-white/[0.03]"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C2A363]/50 text-[#C2A363]">
            <Phone size={14} />
          </span>
          <span className={`${mont.className} text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70`}>Sales Gallery</span>
        </span>
        <span className={`${mont.className} text-base font-semibold tracking-wider text-white tabular-nums group-hover:text-[#D9BE85] transition-colors`}>{phone}</span>
      </a>
    </div>
  );

  return (
    <>
      {showPromo && <PromoProjectHeading name={project.name} />}
      {/* ===== MOBILE: promo บน + ฟอร์มล่าง ===== */}
      {showPromo && (
        <div className="xl:hidden flex flex-col bg-[#faf8f5]">
          <div className="w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mobilePromoUrl || heroImageUrl || '/logo.png'} alt="โปรโมชั่น" width={1080} height={1600} className="w-full h-auto block" fetchPriority="high" />
          </div>

          <div id="register-mobile" data-register-form="true" className="scroll-mt-24 bg-gradient-to-b from-[#faf8f5] to-[#efe9df] px-4 pt-8 pb-10">
            <div className="mx-auto max-w-[430px]">
              {FormCard}
            </div>
          </div>
        </div>
      )}

      {/* ===== DESKTOP: background เต็มจอ + ฟอร์ม float ขวา ===== */}
      <section className={`relative min-h-[calc(100svh-80px)] overflow-hidden bg-[#06112f] font-sans ${showPromo ? 'hidden xl:flex' : 'flex'} items-stretch`}>
        <Image
          src={heroImageUrl || '/logo.png'}
          alt={project.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {!showPromo && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-[#06112f]/90 via-[#06112f]/45 to-[#06112f]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06112f]/80 via-transparent to-transparent" />
          </>
        )}

        <div className="relative z-10 grid w-full grid-cols-1 xl:grid-cols-[minmax(0,1fr)_430px] gap-8 px-6 py-8 md:px-10 lg:px-14 xl:py-10 [@media(max-height:800px)]:xl:py-6 items-center">
          {/* Left: text content */}
          <div className="flex min-h-[44vh] flex-col justify-end xl:min-h-[calc(100svh-160px)]">
            {!showPromo && (
              <div className="max-w-4xl text-white">
                {/* Badge */}
                <div className="inline-flex items-center gap-3 rounded-full border border-[#e53935]/40 bg-[#e53935]/10 px-5 py-2 backdrop-blur-md mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e53935] animate-pulse" />
                  <span className={`${mont.className} text-[10px] font-semibold tracking-[0.3em] uppercase text-[#e53935]`}>
                    {project.type || 'Exclusive Residence'}
                  </span>
                </div>

                {/* Title */}
                <h1 className={`${mont.className} text-4xl md:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight uppercase`}>
                  {firstPart} <br />
                  <span className="text-[#e53935]">{lastWord}</span>
                </h1>

                {/* Concept */}
                {project.concept && (
                  <p className="mt-4 text-base md:text-xl font-light text-white/70 uppercase tracking-[0.2em]">
                    {project.concept}
                  </p>
                )}

                {/* Description */}
                {project.description && (
                  <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-white/60 border-l-2 border-[#e53935]/50 pl-4">
                    {project.description}
                  </p>
                )}

                {/* Facts */}
                <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-xl border border-[#e53935]/25 bg-white/8 px-4 py-3 backdrop-blur-md"
                    >
                      <div className="mb-1.5 flex items-center gap-1.5 text-[#e53935]">
                        {fact.icon}
                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/50">{fact.label}</span>
                      </div>
                      <div className="text-sm font-semibold text-white line-clamp-1">{fact.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: form */}
          <div id="register" data-register-form="true" className="scroll-mt-24 flex items-center justify-center xl:justify-end">
            <div className="w-full max-w-[430px]">
              {FormCard}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
