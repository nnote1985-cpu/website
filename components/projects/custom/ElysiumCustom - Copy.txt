'use client';

import { useState } from 'react'; // 📍 1. เพิ่ม useState
import { Send, CheckCircle2, Phone, Sparkles } from 'lucide-react';

export default function ElysiumCustom({ project }: { project: any }) {
  // 📍 2. สร้าง State คอยจำว่ารูปโปรโมชั่นพังหรือไม่
  const [promoError, setPromoError] = useState(false);

  const nameWords = project.name ? project.name.split(' ') : [];
  const lastWord = nameWords.pop();
  const firstPart = nameWords.join(' ');

  // 📍 3. สร้างเงื่อนไข: จะโชว์โปรโมชั่นก็ต่อเมื่อมี Path และ รูปต้องไม่พัง
  const showPromo = project.promoBanner && project.promoBanner.trim() !== '' && !promoError;

  return (
    <section className="relative flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-[#f8f9fa] overflow-hidden font-sans">
      
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70 transform scale-105 animate-in fade-in duration-1000 mix-blend-multiply"
        style={{ backgroundImage: `url('${project.heroImage || project.image}')` }} 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-60" />

      {/* --- 📍 ฝั่งซ้าย: สลับโชว์ตามเงื่อนไข showPromo --- */}
      {showPromo ? (
        <div className="w-full lg:w-[60%] flex items-center justify-center relative z-10 p-4 md:p-12">
          <img 
            src={project.promoBanner} 
            alt={`Promotion for ${project.name}`} 
            onError={() => setPromoError(true)} // 📍 4. ถ้ารูปไม่มีอยู่จริง สลับกลับไปโชว์ข้อความทันที!
            className="w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-1000 border-4 border-white" 
          />
        </div>
      ) : (
        <div className="w-full lg:w-[60%] p-8 md:p-12 lg:p-24 flex flex-col justify-center relative z-10">
          <div className="max-w-3xl space-y-8 animate-in slide-in-from-left-8 fade-in duration-1000">
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
        </div>
      )}

      {/* --- 📍 ฝั่งขวา: LIGHT GLASS FORM (คงอยู่เสมอ) --- */}
      <div id="register" className="w-full lg:w-[40%] p-6 md:p-12 flex flex-col justify-center relative z-20">
        <div className="bg-white/90 backdrop-blur-2xl p-8 md:p-10 rounded-[2rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative overflow-hidden animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-300 fill-mode-both">
          
          <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />

          <div className="mb-8 relative z-10">
            <h3 className="text-3xl md:text-4xl font-black italic mb-2 text-slate-900 uppercase tracking-tight">
              Register
            </h3>
            <p className="text-[#d32f2f] text-[11px] font-bold uppercase tracking-[0.15em]">
              ลงทะเบียนรับสิทธิพิเศษ {project.name}
            </p>
          </div>

          <form className="space-y-5 relative z-10">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest pl-1">Full Name</label>
              <input type="text" placeholder="ชื่อ-นามสกุล" className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl outline-none text-slate-800 placeholder:text-slate-400 focus:border-[#d32f2f] focus:bg-white focus:ring-4 focus:ring-[#d32f2f]/10 transition-all text-sm md:text-base font-medium shadow-inner" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest pl-1">Phone Number</label>
              <input type="tel" placeholder="08X-XXX-XXXX" className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl outline-none text-slate-800 placeholder:text-slate-400 focus:border-[#d32f2f] focus:bg-white focus:ring-4 focus:ring-[#d32f2f]/10 transition-all text-sm md:text-base font-medium shadow-inner" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest pl-1">Email Address</label>
              <input type="email" placeholder="example@email.com" className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl outline-none text-slate-800 placeholder:text-slate-400 focus:border-[#d32f2f] focus:bg-white focus:ring-4 focus:ring-[#d32f2f]/10 transition-all text-sm md:text-base font-medium shadow-inner" />
            </div>

            <div className="pt-4">
              <button className="group w-full bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] text-white font-black py-4 rounded-xl text-lg transition-all duration-300 hover:from-[#b71c1c] hover:to-[#d32f2f] shadow-[0_10px_20px_rgba(211,47,47,0.3)] hover:shadow-[0_15px_30px_rgba(211,47,47,0.4)] flex items-center justify-center gap-3 active:scale-[0.98]">
                REGISTER NOW 
                <Send size={18} className="group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform" />
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-[#d32f2f]/10 border border-[#d32f2f]/20 flex items-center justify-center">
              <Phone size={18} className="text-[#d32f2f]" />
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.1em] mb-0.5">Sales Gallery</p>
              <a href="tel:0825265566" className="text-lg md:text-xl font-black text-slate-900 hover:text-[#d32f2f] transition-colors">
                082-526-5566
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}