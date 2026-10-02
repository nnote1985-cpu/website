import type { ReactNode } from 'react';
import BrandPattern from '@/components/BrandPattern';
import ParticleField from '@/components/ParticleField';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** บรรทัดเล็กใต้คำบรรยาย เช่น จำนวนบทความ */
  meta?: ReactNode;
  children?: ReactNode;
}

/** ส่วนหัวหน้ามาตรฐานของเว็บ: พื้นกรมท่า + ลายตัว A + อนุภาคตัวอักษร ใช้ได้ทุกหน้าย่อย */
export default function PageHero({ eyebrow, title, subtitle, meta, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0f1e4a] text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(120% 90% at 85% 10%, #22377f 0%, #14255a 45%, #0c1840 100%)' }}
      />
      <BrandPattern className="-z-10" />
      <ParticleField className="-z-10" />
      <div className="max-w-7xl mx-auto min-h-[400px] md:min-h-[440px] flex flex-col justify-center px-6 md:px-4 py-10 md:py-16">
        {eyebrow && (
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-orange-400" />
            <p
              className={`text-orange-400 font-semibold ${
                /^[\x00-\x7F]*$/.test(eyebrow) ? 'text-xs uppercase tracking-[0.3em]' : 'text-sm tracking-wide'
              }`}
            >
              {eyebrow}
            </p>
          </div>
        )}
        <h1 className="text-[2.6rem] leading-[1.15] md:text-6xl font-bold mb-5 max-w-3xl">{title}</h1>
        {subtitle && <p className="text-white/75 text-base md:text-lg font-light leading-relaxed max-w-xl">{subtitle}</p>}
        {meta && <p className="mt-8 text-xs tracking-widest uppercase text-white/50">{meta}</p>}
        {children}
      </div>
    </section>
  );
}
