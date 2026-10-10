'use client';

import { useState } from 'react';
import Image from 'next/image';
import SkeletonImage, { SkeletonImg } from '@/components/SkeletonImage';
import { Tag, Gift, CalendarCheck } from 'lucide-react';
import RegisterFormDark from '@/components/projects/RegisterFormDark';
import PromoProjectHeading from '@/components/projects/PromoProjectHeading';

export default function PromoHeroWrapper({
  promoBanner,
  promoBannerMobile,
  fallbackHero,
  projectName,
  projectSlug,
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
  const mobileImage = promoBannerMobile || promoBanner;

  if (!promoBanner || hasError) {
    return <>{fallbackHero}</>;
  }

  // Full-height dark column: tinted glow in the project colour, heading block, boxed form, contact card.
  const FormPanel = (
    <div
      className="relative isolate flex min-h-full w-full flex-col overflow-hidden bg-[#0C1120]"
      style={{
        // Deep brand-navy gradient with soft glows in the project colour: clean, no muddy tint, strong text contrast.
        backgroundImage: [
          `radial-gradient(60% 30% at 0% 100%, ${accentColor}14, transparent 70%)`,
          'radial-gradient(circle at 70% 0%, rgba(65, 47, 76, 0.25) 0%, transparent 38%)',
          'linear-gradient(180deg, #15172E 0%, #10162A 45%, #0C1120 100%)',
        ].join(', '),
      }}
    >
      <div className="absolute inset-y-0 left-0 w-[3px]" style={{ background: `linear-gradient(180deg, ${accentColor}, transparent 70%)` }} />

      <div className="relative flex flex-1 flex-col gap-[clamp(14px,2.6vh,28px)] px-7 pt-[clamp(18px,3.4vh,32px)] pb-[clamp(14px,2.4vh,24px)] xl:px-9">
        {/* Header: inviting headline, project name, and three things signing up gets you. */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: accentColor }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
            </span>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em]" style={{ color: accentColor }}>
              Private Appointment
            </p>
          </div>
          <h2 className="mt-[clamp(8px,1.6vh,16px)] text-[clamp(24px,3.3vh,30px)] font-bold leading-[1.15] tracking-tight text-white">
            ลงทะเบียน<br />
            <span style={{ color: accentColor }}>รับสิทธิพิเศษ</span>
          </h2>
          <p className="mt-2 text-sm text-white/70">{projectName}</p>
          <ul className="mt-[clamp(8px,1.6vh,16px)] flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/70 [@media(min-width:1280px)_and_(max-height:800px)]:hidden">
            {[
              { icon: Tag, label: 'ราคาและแบบห้อง' },
              { icon: Gift, label: 'โปรโมชันล่าสุด' },
              { icon: CalendarCheck, label: 'นัดชมโครงการ' },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon size={13} strokeWidth={1.75} style={{ color: accentColor }} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <RegisterFormDark projectName={projectName} projectSlug={projectSlug} accentColor={accentColor} />

      </div>
    </div>
  );

  return (
    <>
      <PromoProjectHeading name={projectName} />
      {/* Exactly one screen tall; the banner is shown whole and the register panel sits over its right edge. */}
      <section className="relative hidden h-[calc(100svh-80px)] overflow-hidden bg-[#101010] xl:flex">
        <div className="absolute inset-0 bg-black">
          <Image
            src={promoBanner}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="scale-110 object-cover opacity-70 blur-2xl"
          />
          <SkeletonImage
            tone="dark"
            src={promoBanner}
            alt={`Promotion for ${projectName}`}
            fill
            priority
            sizes="100vw"
            onError={() => setHasError(true)}
            className="object-contain"
          />
        </div>
        <div className="flex-1" />
        <div id="register" data-register-form="true" className="relative z-10 flex w-[clamp(390px,24vw,430px)] shrink-0 overflow-y-auto shadow-[-24px_0_60px_rgba(0,0,0,0.35)]">
          {FormPanel}
        </div>
      </section>

      <section className="bg-[#faf8f5] xl:hidden">
        <div className="w-full bg-white">
          <SkeletonImg
            src={mobileImage}
            alt={`Promotion for ${projectName}`}
            width={1080}
            height={1600}
            onError={() => setHasError(true)}
            className="block h-auto w-full"
          />
        </div>
        <div id="register-mobile" data-register-form="true" className="bg-[#14120f]">
          <div className="mx-auto max-w-[520px]">
            {FormPanel}
          </div>
        </div>
      </section>
    </>
  );
}
