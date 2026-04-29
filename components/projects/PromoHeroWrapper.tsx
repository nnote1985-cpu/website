'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import RegisterFormDark from '@/components/projects/RegisterFormDark';

export default function PromoHeroWrapper({
  promoBanner,
  promoBannerMobile,
  fallbackHero,
  projectName,
  projectSlug,
  phone,
  accentColor = '#e53935',
}: {
  promoBanner?: string;
  promoBannerMobile?: string;
  fallbackHero: React.ReactNode;
  projectName: string;
  projectSlug?: string;
  phone?: string;
  accentColor?: string;
}) {
  const [hasError, setHasError] = useState(false);
  const displayPhone = phone || '082-526-5566';
  const phoneTel = displayPhone.replace(/-/g, '');
  const mobileImage = promoBannerMobile || promoBanner;

  if (!promoBanner || hasError) {
    return <>{fallbackHero}</>;
  }

  const FormPanel = (
    <div className="w-full max-w-[430px] rounded-2xl border border-white/10 bg-[#101010]/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-8">
      <div className="mb-8">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-white/35">
          Private Appointment
        </p>
        <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
          Register Now
        </h2>
        <div className="mt-3 h-0.5 w-10" style={{ backgroundColor: accentColor }} />
        <p className="mt-4 text-sm leading-relaxed text-white/45">
          ลงทะเบียนรับข้อมูล ราคา และโปรโมชันล่าสุดของ {projectName}
        </p>
      </div>

      <RegisterFormDark projectName={projectName} projectSlug={projectSlug} accentColor={accentColor} />

      <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <Phone size={17} style={{ color: accentColor }} />
        </div>
        <div>
          <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-white/30">
            Sales Gallery
          </p>
          <a href={`tel:${phoneTel}`} className="text-lg font-black text-white transition-colors hover:opacity-80">
            {displayPhone}
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="relative hidden h-[calc(100vh-80px)] overflow-hidden bg-[#101010] xl:block">
        <div className="absolute inset-0 bg-black">
          <Image
            src={promoBanner}
            alt={`Promotion for ${projectName}`}
            fill
            priority
            sizes="100vw"
            onError={() => setHasError(true)}
            className="object-cover"
          />
        </div>
        <div id="register" data-register-form="true" className="absolute bottom-0 right-0 top-0 z-10 flex w-[430px] items-center justify-center overflow-y-auto bg-[#171513]/95 px-6 py-10 shadow-[-24px_0_60px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          {FormPanel}
        </div>
      </section>

      <section className="bg-[#faf8f5] xl:hidden">
        <div className="w-full bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mobileImage}
            alt={`Promotion for ${projectName}`}
            onError={() => setHasError(true)}
            className="block h-auto w-full"
          />
        </div>
        <div id="register-mobile" data-register-form="true" className="px-5 py-8">
          <div className="mx-auto max-w-[430px]">
            {FormPanel}
          </div>
        </div>
      </section>
    </>
  );
}
