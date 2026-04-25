'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Phone, MapPin, TrainFront, Building2, Home, Sparkles } from 'lucide-react';
import RegisterForm from '@/components/projects/RegisterForm';

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
    { icon: <Home size={16} />, label: 'ราคาเริ่มต้น', value: startingPrice },
    { icon: <MapPin size={16} />, label: 'ทำเล', value: project.location || 'กรุงเทพฯ' },
    { icon: <TrainFront size={16} />, label: 'ใกล้รถไฟฟ้า', value: project.bts || 'ทำเลศักยภาพ' },
    { icon: <Building2 size={16} />, label: 'โครงการ', value: project.units ? `${project.units} ยูนิต` : project.floors ? `${project.floors} ชั้น` : project.type || 'Condominium' },
  ];

  const FormCard = (
    <div className="bg-white/92 backdrop-blur-2xl p-6 md:p-7 rounded-2xl border border-white/70 shadow-[0_24px_70px_rgba(0,0,0,0.22)] relative overflow-hidden">
      <div className="mb-8 relative z-10">
        <p className="text-[#e53935] text-[10px] font-black uppercase tracking-[0.24em] mb-2">Private Appointment</p>
        <h3 className="text-2xl md:text-3xl font-black mb-2 text-[#1a2d6b] tracking-tight">Register Now</h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          ลงทะเบียนรับข้อมูล ราคา และโปรโมชันล่าสุดของ {project.name}
        </p>
      </div>
      <RegisterForm projectName={project.name} projectSlug={project.slug} />
      <div className="mt-7 pt-5 border-t border-slate-200 flex items-center gap-4 relative z-10">
        <div className="w-11 h-11 rounded-xl bg-[#e53935]/10 border border-[#e53935]/20 flex items-center justify-center">
          <Phone size={18} className="text-[#e53935]" />
        </div>
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.16em] mb-0.5">Sales Gallery</p>
          <a href={`tel:${phoneTel}`} className="text-lg md:text-xl font-black text-slate-950 hover:text-[#e53935] transition-colors">{phone}</a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ===== MOBILE: promo บน + ฟอร์มล่าง (< 1024px และมีโปรโมชั่น) ===== */}
      {showPromo && (
        <div className="xl:hidden flex flex-col bg-white">
          <div className="relative w-full aspect-[4/5] bg-slate-100">
            <Image src={mobilePromoUrl || heroImageUrl || '/logo.png'} alt="โปรโมชั่น" fill sizes="100vw" className="object-cover" priority />
          </div>
          <div id="register-mobile" data-register-form="true" className="scroll-mt-24 px-6 py-10 bg-white">
            <h3 className="text-2xl font-black italic mb-1 text-slate-950 uppercase tracking-tight">Register Now</h3>
            <p className="text-[#e53935] text-[11px] font-bold uppercase tracking-[0.15em] mb-6">
              ลงทะเบียนรับสิทธิพิเศษ {project.name}
            </p>
            <RegisterForm projectName={project.name} projectSlug={project.slug} />
            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#e53935]/10 border border-[#e53935]/20 flex items-center justify-center">
                <Phone size={17} className="text-[#e53935]" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.1em] mb-0.5">Sales Gallery</p>
                <a href={`tel:${phoneTel}`} className="text-lg font-black text-slate-950 hover:text-[#e53935] transition-colors">{phone}</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== DESKTOP: background เต็มจอ + ฟอร์ม float ขวา (≥ 1024px หรือ mobile ไม่มีโปรโมชั่น) ===== */}
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#06112f]/92 via-[#06112f]/50 to-[#06112f]/12" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06112f]/88 via-transparent to-transparent" />
          </>
        )}

        <div className="relative z-10 grid w-full grid-cols-1 xl:grid-cols-[minmax(0,1fr)_430px] gap-8 px-6 py-8 md:px-10 lg:px-14 xl:py-10 items-center">
          <div className="flex min-h-[44vh] flex-col justify-end xl:min-h-[calc(100vh-160px)]">
            {!showPromo && (
              <div className="max-w-4xl text-white">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <Sparkles size={14} className="text-[#ff6b57]" />
                  <span className="text-[10px] md:text-xs font-black tracking-[0.25em] uppercase">
                    {project.type || 'Exclusive Project'}
                  </span>
                </div>
                <div className="mt-6 space-y-4">
                  <h1 className="text-4xl md:text-6xl xl:text-7xl font-black leading-[0.98] tracking-tight uppercase">
                    {firstPart} <br />
                    <span className="text-[#ff6b57]">{lastWord}</span>
                  </h1>
                  {project.concept && (
                    <p className="text-lg md:text-2xl font-medium text-white/78 uppercase tracking-[0.16em]">
                      {project.concept}
                    </p>
                  )}
                  {project.description && (
                    <p className="max-w-2xl text-sm md:text-base leading-relaxed text-white/72">
                      {project.description}
                    </p>
                  )}
                </div>

                <div className="mt-7 grid grid-cols-2 gap-2 md:grid-cols-4">
                  {facts.map((fact) => (
                    <div key={fact.label} className="rounded-xl border border-white/12 bg-white/10 px-4 py-3 backdrop-blur-md">
                      <div className="mb-1 flex items-center gap-1.5 text-white/50">
                        {fact.icon}
                        <span className="text-[9px] font-black uppercase tracking-[0.16em]">{fact.label}</span>
                      </div>
                      <div className="text-sm font-bold text-white line-clamp-1">{fact.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div id="register" data-register-form="true" className="scroll-mt-24 flex items-center justify-center xl:justify-end">
            <div className="w-full max-w-[430px] animate-in slide-in-from-bottom-12 fade-in duration-700 fill-mode-both">
              {FormCard}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
