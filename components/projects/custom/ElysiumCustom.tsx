'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, MapPin, TrainFront, Building2, Home } from 'lucide-react';
import { Montserrat } from 'next/font/google';
import RegisterForm from '@/components/projects/RegisterForm';

const mont = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700', '800'], display: 'swap' });

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
  const phone = project.phone || '0825265566';
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
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.12),_0_8px_32px_rgba(0,0,0,0.5),_0_32px_80px_rgba(0,0,0,0.4),_0_0_60px_rgba(255,255,255,0.04)]">
      <div className="h-[4px] w-full bg-gradient-to-r from-[#b71c1c] via-[#e53935] to-[#b71c1c]" />

      <div className="p-6 md:p-7">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e53935] animate-pulse" />
            <p className={`${mont.className} text-[#e53935] text-[9px] font-semibold uppercase tracking-[0.4em]`}>
              Private Appointment
            </p>
          </div>
          <h3 className={`${mont.className} text-2xl md:text-3xl font-bold text-[#1a2d6b] leading-tight`}>
            Register Now
          </h3>
          <div className="w-10 h-0.5 bg-[#e53935] mt-2 mb-3" />
          <p className="text-slate-400 text-sm leading-relaxed">
            ลงทะเบียนรับข้อมูล ราคา และโปรโมชันล่าสุดของ {project.name}
          </p>
        </div>

        <RegisterForm projectName={project.name} projectSlug={project.slug} />

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#e53935]/10 border border-[#e53935]/20 flex items-center justify-center shrink-0">
            <Phone size={17} className="text-[#e53935]" />
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.16em] mb-0.5">Sales Gallery</p>
            <a href={`tel:${phoneTel}`} className="text-lg md:text-xl font-black text-slate-900 hover:text-[#e53935] transition-colors">
              {phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ===== MOBILE: promo บน + ฟอร์มล่าง ===== */}
      {showPromo && (
        <div className="xl:hidden flex flex-col bg-[#faf8f5]">
          <div className="w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mobilePromoUrl || heroImageUrl || '/logo.png'} alt="โปรโมชั่น" width={1080} height={1600} className="w-full h-auto block" fetchPriority="high" />
          </div>

          <div id="register-mobile" data-register-form="true" className="scroll-mt-24 px-6 py-10 bg-[#faf8f5]">
            <div className="mb-1">
              <div className="w-8 h-[2px] bg-[#e53935] mb-3" />
              <p className={`${mont.className} text-[#e53935] text-[9px] font-semibold uppercase tracking-[0.3em] mb-2`}>
                Private Appointment
              </p>
              <h3 className={`${mont.className} text-2xl font-bold text-slate-900 uppercase tracking-tight`}>
                Register Now
              </h3>
            </div>
            <p className="text-slate-400 text-[11px] mb-6 mt-1">ลงทะเบียนรับสิทธิพิเศษ {project.name}</p>
            <RegisterForm projectName={project.name} projectSlug={project.slug} />
            <div className="mt-8 pt-6 border-t border-[#e53935]/20 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#e53935]/10 border border-[#e53935]/25 flex items-center justify-center">
                <Phone size={17} className="text-[#e53935]" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.1em] mb-0.5">Sales Gallery</p>
                <a href={`tel:${phoneTel}`} className="text-lg font-black text-slate-900 hover:text-[#e53935] transition-colors">
                  {phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== DESKTOP: background เต็มจอ + ฟอร์ม float ขวา ===== */}
      <section className={`relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#06112f] font-sans ${showPromo ? 'hidden xl:flex' : 'flex'} items-stretch`}>
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

        <div className="relative z-10 grid w-full grid-cols-1 xl:grid-cols-[minmax(0,1fr)_430px] gap-8 px-6 py-8 md:px-10 lg:px-14 xl:py-10 items-center">
          {/* Left: text content */}
          <div className="flex min-h-[44vh] flex-col justify-end xl:min-h-[calc(100vh-160px)]">
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
