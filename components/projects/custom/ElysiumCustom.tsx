'use client';

import { useState, useEffect } from 'react';
import { Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import RegisterForm from '@/components/projects/RegisterForm';

export default function ElysiumCustom({ project }: { project: any }) {
  // เช็คเบื้องต้นก่อนว่าใน JSON มีการกรอก Path รูปมาหรือไม่
  const hasPromoPath = Boolean(project.promoBanner && project.promoBanner.trim() !== '');
  
  // State จำว่ารูปพังหรือไม่ (ค่าเริ่มต้นคือ ไม่พัง)
  const [isImageBroken, setIsImageBroken] = useState(false);

  // 📍 ระบบสแกนรูปภาพล่วงหน้า (ทำงานชัวร์ 100%)
  useEffect(() => {
    setIsImageBroken(false); // รีเซ็ตค่าทุกครั้งที่โหลด
    
    if (hasPromoPath) {
      const img = new window.Image();
      img.src = project.promoBanner;
      img.onerror = () => {
        setIsImageBroken(true); // ถ้ารูปไม่มีอยู่จริง สั่งให้พังทันที!
      };
    }
  }, [project.promoBanner, hasPromoPath]);

  // เงื่อนไขชี้ชะตา: จะโชว์โปรโมชั่นก็ต่อเมื่อ มี Path และ รูปไม่พัง
  const showPromo = hasPromoPath && !isImageBroken;

  const nameWords = project.name ? project.name.split(' ') : [];
  const lastWord = nameWords.pop();
  const firstPart = nameWords.join(' ');

  const heroImageUrl = showPromo ? project.promoBanner : (project.heroImage || project.image);

  return (
    <section className="relative flex flex-col justify-center min-h-[calc(100vh-80px)] bg-[#f8f9fa] overflow-hidden font-sans">
      
      {/* --- 📍 Background Image --- */}
      <div 
        key={heroImageUrl} 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${!showPromo ? 'opacity-70 mix-blend-multiply transform scale-105' : 'opacity-100'}`}
        style={{ backgroundImage: `url('${heroImageUrl}')` }} 
      />
      
      {/* 📍 Gradient Overlays (ปรับให้ขาวนวลทั่วทั้งรูปมากขึ้น) */}
{!showPromo && (
  <>
    {/* ชั้นที่ 1: ไล่จากซ้ายมาขวาแบบหนาแน่นขึ้น เพื่อให้ตัวหนังสืออ่านง่ายสุดๆ */}
    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40" />
    
    {/* ชั้นที่ 2: ไล่จากล่างขึ้นบน เพื่อให้ฐานรูปดูละมุนเชื่อมกับ Section ถัดไป */}
    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-80" />
    
    {/* ชั้นที่ 3: (เพิ่มเติม) เพิ่มแผ่นสีขาวจางๆ ทับทั้งรูปเพื่อคุมโทนให้สว่างเท่ากัน */}
    <div className="absolute inset-0 bg-white/30 backdrop-overlay" />
  </>
)}

      {/* --- 📍 Content Area --- */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-80px)]">
        
        {/* ฝั่งซ้าย: BRANDING & CONCEPT (หลบให้ถ้ารูปโปรโมชั่นโชว์อยู่) */}
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
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d32f2f] to-[#ff5252] pr-2">
                    {lastWord}
                  </span>
                </h2>
                <p className="text-xl md:text-2xl font-medium text-slate-500 uppercase tracking-[0.2em]">
                  {project.concept}
                </p>
              </div>

              <div className="h-1.5 w-24 bg-gradient-to-r from-[#d32f2f] to-transparent rounded-full" />

              <p className="text-base md:text-xl font-normal leading-relaxed text-slate-600 max-w-xl">
                "{project.description}"
              </p>

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

        {/* ฝั่งขวา: REGISTER FORM (โชว์เสมอ) */}
        <div id="register" className="lg:col-span-4 p-0 lg:p-10 flex flex-col justify-center">
          <div className="bg-white/90 backdrop-blur-2xl p-8 rounded-[2rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-300 fill-mode-both">
            
            <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />

            <div className="mb-8 relative z-10">
              <h3 className="text-3xl font-black italic mb-2 text-slate-950 uppercase tracking-tight">
                Register Now
              </h3>
              <p className="text-[#e53935] text-[11px] font-bold uppercase tracking-[0.15em]">
                ลงทะเบียนรับสิทธิพิเศษ {project.name}
              </p>
            </div>

            <RegisterForm projectName={project.name} />

            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-4 relative z-10 hover:border-[#e53935] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#e53935]/10 border border-[#e53935]/20 flex items-center justify-center shadow-inner">
                <Phone size={18} className="text-[#e53935]" />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.1em] mb-0.5">Sales Gallery</p>
                <a href="tel:0825265566" className="text-lg md:text-xl font-black text-slate-950 hover:text-[#e53935] transition-colors">
                  082-526-5566
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}