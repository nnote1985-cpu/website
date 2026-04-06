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
  images?: string[]; // รับค่ารูปภาพจาก Admin Panel เป็น Array ของ URL
}

// รูปสำรอง (Fallback) กรณีที่ใน Admin Panel ยังไม่มีการใส่รูป
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000",
];

export default function HeroSection({ title, subtitle, description, ctaText, ctaUrl, images }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // เช็คว่ามีรูปจาก Admin ไหม ถ้าไม่มีให้ใช้รูป Fallback แทน
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
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              index === currentImageIndex ? 'opacity-100 animate-slow-zoom z-10' : 'opacity-0 z-0'
            }`} 
          />
        ))}
        
        {/* Multi-layered Gradient for Depth */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#050B14]/95 via-[#050B14]/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050B14] via-transparent to-transparent opacity-90 pointer-events-none" />
      </div>

      <div className="relative z-30 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl text-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-[#f4511e]" />
            <p className="text-[#f4511e] font-bold tracking-[0.4em] uppercase text-xs md:text-sm">
              {subtitle}
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black mb-8 leading-[1.05] tracking-tight drop-shadow-2xl">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-12 font-light leading-relaxed max-w-xl border-l-2 border-white/20 pl-6 py-2">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <Link href={ctaUrl} className="group relative flex items-center gap-4 bg-white text-slate-900 font-black px-10 py-5 hover:bg-[#f4511e] hover:text-white transition-all duration-500 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-sm">
              <span className="relative z-10 uppercase tracking-widest text-sm">{ctaText}</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 h-full w-full bg-[#f4511e] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
            </Link>
            <Link href="/contact" className="group flex items-center gap-3 text-white/70 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">
              <span className="w-8 h-[1px] bg-white/30 group-hover:w-12 group-hover:bg-[#f4511e] transition-all duration-300" />
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
              className={`h-1 transition-all duration-500 rounded-full ${
                idx === currentImageIndex ? 'w-8 bg-[#f4511e]' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-8 text-white/20 z-30 pointer-events-none">
        <span className="[writing-mode:vertical-lr] text-[10px] font-black tracking-[0.5em] uppercase">
          ASAKAN RESIDENCES
        </span>
        <div className="w-[1px] h-32 bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 z-30 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white font-bold">Scroll</span>
        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1/2 bg-[#f4511e] animate-bounce" />
        </div>
      </div>
    </section>
  );
}