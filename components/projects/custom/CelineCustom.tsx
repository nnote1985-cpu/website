'use client';

import { Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import RegisterFormDark from '@/components/projects/RegisterFormDark';

export default function CelineCustom({ project }: { project: any }) {
  // แยกคำเพื่อทำไฮไลท์สีทองที่คำสุดท้าย
  const nameWords = project.name ? project.name.split(' ') : [];
  const lastWord = nameWords.pop();
  const firstPart = nameWords.join(' ');

  return (
    <section className="relative flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-[#2b2a28] overflow-hidden">
      
      {/* 📍 Background: โทนหรูหรา นุ่มนวล */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-normal"
        style={{ backgroundImage: `url('${project.heroImage || project.image}')` }} 
      />
      <div className="absolute inset-0 bg-[#2b2a28]/70" />
      
      {/* --- 📍 ฝั่งซ้าย: BRANDING & CONCEPT --- */}
      <div className="w-full lg:w-2/3 p-8 md:p-12 lg:p-20 flex flex-col justify-center relative z-10 border-r border-white/5">
        <div className="max-w-2xl space-y-6 md:space-y-8">
          
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-[#cca464]/30 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#cca464] animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#cca464]">
              {project.type || 'Private Residence'}
            </span>
          </div>
          
          <div className="space-y-2 md:space-y-4">
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] drop-shadow-xl font-serif font-bold">
              {firstPart} <br />
              <span className="text-[#cca464]">{lastWord}</span>
            </h2>
            <p className="text-lg md:text-2xl lg:text-3xl font-light text-white/50 uppercase tracking-[0.2em]">
              {project.concept}
            </p>
          </div>

          <div className="h-px w-20 bg-[#cca464]" />

          <p className="text-base md:text-xl leading-relaxed text-white/80 drop-shadow-md font-normal max-w-xl">
            "{project.description}"
          </p>

          <div className="flex flex-wrap gap-4 md:gap-6 pt-2 md:pt-6">
            {project.features?.slice(0, 3).map((feature: string, i: number) => (
              <div key={i} className="flex items-center gap-2 text-xs md:text-sm font-bold text-white/90 uppercase">
                <CheckCircle2 size={18} className="text-[#cca464]" /> {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 📍 ฝั่งขวา: FORM โทนสีทอง-ดำ --- */}
      <div id="register" className="w-full lg:w-1/3 bg-[#1c1b1a]/80 backdrop-blur-xl p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10 border-l border-white/5 shadow-2xl">
        <div className="mb-8 md:mb-10 text-center lg:text-left">
          <h3 className="text-3xl md:text-4xl text-white tracking-tight font-serif font-bold">
            Register Now
          </h3>
          <p className="text-white/40 text-[10px] md:text-xs font-medium uppercase tracking-widest mt-2">
            รับข้อเสนอพิเศษโครงการ {project.name}
          </p>
        </div>

        <RegisterFormDark projectName={project.name} accentColor="#cca464" />

        <div className="mt-8 md:mt-12 flex items-center justify-center lg:justify-start gap-4 pt-6 md:pt-8 border-t border-white/5">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center">
            <Phone size={18} className="text-[#cca464]" />
          </div>
          <div>
            <p className="text-[9px] md:text-[10px] font-bold text-white/30 uppercase tracking-widest">Sales Gallery</p>
            <a href="tel:0825265566" className="text-base md:text-lg font-black text-white hover:text-[#cca464] transition-colors">082-526-5566</a>
          </div>
        </div>
      </div>
    </section>
  );
}