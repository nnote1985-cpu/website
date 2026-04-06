'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  images?: string[]; 
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1681951093228-47c246e9d016?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000",
];

export default function HeroSection({ title, subtitle, description, ctaText, ctaUrl, images }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const displayImages = images && images.length > 0 ? images : FALLBACK_IMAGES;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [displayImages.length]);

  return (
    <section className="relative h-[85vh] md:h-[95vh] w-full flex items-center overflow-hidden bg-[#050B14]">
      
      {/* 1. Cinematic Background with Crossfade & Slow Zoom */}
      <div className="absolute inset-0 z-0 bg-[#050B14]">
        {displayImages.map((src, index) => (
          <img 
            key={src}
            src={src} 
            alt={`Asakan Residence View ${index + 1}`}
            // 📍 ปรับ Animation ให้ซูมเข้าช้าๆ (scale-110) ตลอด 6 วินาที โดยไม่ต้องพึ่ง config ภายนอก
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[6000ms] ease-out ${
              index === currentImageIndex ? 'opacity-100 scale-110 z-10' : 'opacity-0 scale-100 z-0'
            }`} 
          />
        ))}
        
        {/* Multi-layered Gradient for Depth (ปรับให้สว่างขึ้นนิดนึงเพื่อให้เห็นรายละเอียดรูป) */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#050B14]/90 via-[#050B14]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050B14] via-transparent to-transparent opacity-80 pointer-events-none" />
      </div>

      <div className="relative z-30 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl text-white">
          
          {/* Subtitle */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#e53935]" />
            <p className="text-[#e53935] font-semibold tracking-[0.4em] uppercase text-xs md:text-sm">
              {subtitle}
            </p>
          </div>
          
          {/* Main Title (ปรับความหนาลงนิดนึงให้ดู Elegant) */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
            {title}
          </h1>
          
          {/* Description (เปลี่ยนเส้นกั้นซ้ายเป็นสีแดงให้เข้าธีม) */}
          <p className="text-lg md:text-xl text-slate-300 mb-12 font-light leading-relaxed max-w-xl border-l-2 border-[#e53935]/60 pl-6 py-2">
            {description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <Link href={ctaUrl} className="group relative flex items-center gap-4 bg-white text-slate-900 font-bold px-10 py-4 hover:text-white transition-all duration-500 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-sm">
              <span className="relative z-10 uppercase tracking-widest text-sm">{ctaText}</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              {/* 📍 เอฟเฟกต์สีสไลด์ทับ เปลี่ยนเป็นสีแดง */}
              <div className="absolute inset-0 h-full w-full bg-[#e53935] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
            </Link>
            
            <Link href="/contact" className="group flex items-center gap-3 text-white/80 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">
              {/* 📍 ขีดเส้นใต้ตอน Hover ขยายยาวขึ้นและเป็นสีแดง */}
              <span className="w-8 h-[2px] bg-white/30 group-hover:w-12 group-hover:bg-[#e53935] transition-all duration-300" />
              Explore Gallery
            </Link>
          </div>

        </div>
      </div>

      {/* Image Pagination Indicators */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-20 z-30 flex items-center gap-3">
          {displayImages.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                idx === currentImageIndex ? 'w-10 bg-[#e53935]' : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Decorative Elements (Vertical Text) */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-8 text-white/30 z-30 pointer-events-none">
        <span className="[writing-mode:vertical-lr] text-[10px] font-bold tracking-[0.5em] uppercase">
          ASAKAN RESIDENCES
        </span>
        <div className="w-[1px] h-32 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-70 z-30 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white font-bold">Scroll</span>
        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
           {/* 📍 เส้นวิ่งชี้ลงด้านล่าง เปลี่ยนเป็นสีแดง */}
           <div className="absolute top-0 left-0 w-full h-1/2 bg-[#e53935] animate-[bounce_2s_infinite]" />
        </div>
      </div>

    </section>
  );
}