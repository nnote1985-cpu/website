'use client';

import { Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import RegisterForm from '@/components/projects/RegisterForm';

export default function WelaCustom({ project }: { project: any }) {
  // แยกคำเพื่อทำไฮไลท์สีแดงที่คำสุดท้าย
  const nameWords = project.name ? project.name.split(' ') : [];
  const lastWord = nameWords.pop();
  const firstPart = nameWords.join(' ');

  return (
    <section className="relative flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-[#1a2d6b] overflow-hidden">
      
      {/* 🟦 60% โซนสีน้ำเงิน (ฝั่งซ้าย) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: `url('${project.heroImage || project.image}')` }} 
      />
      <div className="absolute inset-0 bg-[#1a2d6b]/80 lg:w-2/3" />
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-white/5 skew-x-12 -translate-x-20 hidden lg:block pointer-events-none" />
      
      {/* --- 📍 ฝั่งซ้าย: BRANDING & CONCEPT (น้ำเงิน-ขาว) --- */}
      <div className="w-full lg:w-2/3 p-8 md:p-12 lg:p-20 flex flex-col justify-center relative z-10">
        <div className="max-w-2xl space-y-6 md:space-y-8">
          
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 w-fit">
            {/* 🟥 10% สีแดง (Accent) */}
            <span className="w-2 h-2 rounded-full bg-[#e53935] animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white">
              {project.type || 'Modern Living'}
            </span>
          </div>
          
          <div className="space-y-2 md:space-y-4">
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] drop-shadow-xl font-bold tracking-tight uppercase">
              {firstPart} <br />
              {/* 🟥 10% สีแดง (Accent) */}
              <span className="text-[#e53935]">{lastWord}</span>
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xl font-light text-white/70 uppercase tracking-[0.2em]">
              {project.concept}
            </p>
          </div>

          {/* 🟥 10% สีแดง (Accent) */}
          <div className="h-1 w-16 md:w-20 bg-[#e53935]" />

          <p className="text-base md:text-xl leading-relaxed text-white/90 drop-shadow-md font-light">
            "{project.description}"
          </p>

          <div className="flex flex-wrap gap-4 md:gap-6 pt-2 md:pt-6">
            {project.features?.slice(0, 3).map((feature: string, i: number) => (
              <div key={i} className="flex items-center gap-2 text-xs md:text-sm font-bold text-white/90 uppercase">
                {/* 🟥 10% สีแดง (Accent) */}
                <CheckCircle2 size={18} className="text-[#e53935]" /> {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 📍 ฝั่งขวา: FORM โทนสีขาว-น้ำเงิน (⬜ 30% โซนสีขาว) --- */}
      <div id="register" className="w-full lg:w-1/3 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 shadow-2xl border-l border-slate-200">
        <div className="mb-8 md:mb-10 text-center lg:text-left">
          <h3 className="text-3xl md:text-4xl text-[#1a2d6b] tracking-tight font-black uppercase italic">
            Register Now
          </h3>
          <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">
            รับข้อเสนอพิเศษโครงการ {project.name}
          </p>
        </div>

        <RegisterForm projectName={project.name} />

        <div className="mt-8 md:mt-12 flex items-center justify-center lg:justify-start gap-4 pt-6 md:pt-8 border-t border-slate-100">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#e53935]/10 flex items-center justify-center">
            <Phone size={18} className="text-[#e53935]" />
          </div>
          <div>
            <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sales Gallery</p>
            <a href="tel:0825265566" className="text-base md:text-lg font-black text-[#1a2d6b] hover:text-[#e53935] transition-colors">082-526-5566</a>
          </div>
        </div>
      </div>
    </section>
  );
}