'use client';

import { useState, useEffect } from 'react';
import { Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import RegisterForm from '@/components/projects/RegisterForm';

export default function ElysiumCustom({ project }: { project: any }) {
  const hasPromoPath = Boolean(project.promoBanner && project.promoBanner.trim() !== '');
  const [isImageBroken, setIsImageBroken] = useState(false);

  useEffect(() => {
    setIsImageBroken(false);
    if (hasPromoPath) {
      const img = new window.Image();
      img.src = project.promoBanner;
      img.onerror = () => setIsImageBroken(true);
    }
  }, [project.promoBanner, hasPromoPath]);

  const showPromo = hasPromoPath && !isImageBroken;

  const nameWords = project.name ? project.name.split(' ') : [];
  const lastWord = nameWords.pop();
  const firstPart = nameWords.join(' ');

  const heroImageUrl = showPromo ? project.promoBanner : (project.heroImage || project.image);
  const mobilePromoUrl = project.promoBannerMobile || project.promoBanner;
  const phone = project.phone || '0825265566';
  const phoneTel = phone.replace(/-/g, '');

  const FormCard = (
    <div className="bg-white/90 backdrop-blur-2xl p-8 rounded-[2rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="mb-8 relative z-10">
        <h3 className="text-3xl font-black italic mb-2 text-slate-950 uppercase tracking-tight">Register Now</h3>
        <p className="text-[#e53935] text-[11px] font-bold uppercase tracking-[0.15em]">
          ลงทะเบียนรับสิทธิพิเศษ {project.name}
        </p>
      </div>
      <RegisterForm projectName={project.name} />
      <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-full bg-[#e53935]/10 border border-[#e53935]/20 flex items-center justify-center shadow-inner">
          <Phone size={18} className="text-[#e53935]" />
        </div>
        <div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.1em] mb-0.5">Sales Gallery</p>
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
          <div className="w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mobilePromoUrl} alt="โปรโมชั่น" className="w-full h-auto block" />
          </div>
          <div className="px-6 py-10 bg-white">
            <h3 className="text-2xl font-black italic mb-1 text-slate-950 uppercase tracking-tight">Register Now</h3>
            <p className="text-[#e53935] text-[11px] font-bold uppercase tracking-[0.15em] mb-6">
              ลงทะเบียนรับสิทธิพิเศษ {project.name}
            </p>
            <RegisterForm projectName={project.name} />
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
      <section className={`relative flex flex-col justify-center min-h-[calc(100vh-80px)] bg-[#f8f9fa] overflow-hidden font-sans ${showPromo ? 'hidden xl:flex' : 'flex'}`}>

        {/* Background Image */}
        <div
          key={heroImageUrl}
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url('${heroImageUrl}')`,
            opacity: showPromo ? 1 : 0.7,
            mixBlendMode: showPromo ? 'normal' : 'multiply',
            transform: showPromo ? 'none' : 'scale(1.05)',
          }}
        />

        {/* Gradient overlays — เฉพาะตอนไม่มีโปรโมชั่น */}
        {!showPromo && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-80" />
            <div className="absolute inset-0 bg-white/30" />
          </>
        )}

        {/* Content Grid */}
        <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-80px)]">

          {/* ซ้าย: ข้อความ (ซ่อนเมื่อมีโปรโมชั่น) */}
          <div className="lg:col-span-8 p-0 lg:p-12">
            {!showPromo && (
              <div className="space-y-8 animate-in slide-in-from-left-8 fade-in duration-1000 fill-mode-both">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                  <Sparkles size={14} className="text-[#d32f2f]" />
                  <span className="text-[10px] md:text-xs font-black tracking-[0.25em] uppercase text-slate-800">
                    {project.type || 'Exclusive Project'}
                  </span>
                </div>
                <div className="space-y-4">
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-black italic text-slate-900 leading-[0.95] uppercase">
                    {firstPart} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d32f2f] to-[#ff5252] pr-2">{lastWord}</span>
                  </h2>
                  <p className="text-xl md:text-2xl font-medium text-slate-500 uppercase tracking-[0.2em]">{project.concept}</p>
                </div>
                <div className="h-1.5 w-24 bg-gradient-to-r from-[#d32f2f] to-transparent rounded-full" />
                <p className="text-base md:text-xl font-normal leading-relaxed text-slate-600 max-w-xl">"{project.description}"</p>
                <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
                  {project.features?.slice(0, 3).map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-700 uppercase bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                      <CheckCircle2 size={16} className="text-[#d32f2f]" /> {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ขวา: ฟอร์ม */}
          <div id="register" className="lg:col-span-4 p-0 lg:p-10 flex flex-col justify-center">
            <div className="animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-300 fill-mode-both">
              {FormCard}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
