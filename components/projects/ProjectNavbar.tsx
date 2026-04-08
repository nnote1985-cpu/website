'use client';

import { useState, useEffect } from 'react';
import { Phone, ChevronLeft, Menu, X } from 'lucide-react';

export default function ProjectNavbar({ project }: { project: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // 🔥 Detect section (Gallery / Plans / Location)
  useEffect(() => {
    const sections = ['gallery', 'plans', 'location'];

    const handleScroll = () => {
      const scrollY = window.scrollY + 140;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">

        {/* 📍 Mobile */}
        <div className="flex md:hidden items-center gap-3 flex-1 min-w-0 pr-2">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1 -ml-1 text-[#1a2d6b] hover:bg-slate-100 rounded-lg shrink-0"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <span className="font-black text-[#1a2d6b] text-sm uppercase truncate">
            {project.name}
          </span>
        </div>

        {/* 📍 Desktop Left */}
        <div className="hidden md:flex items-center gap-5">
          <a 
            href="/" 
            className="group flex items-center gap-1.5 bg-slate-100 hover:bg-[#1a2d6b] text-slate-600 hover:text-white px-4 py-2 rounded-full transition-all duration-300 shadow-sm border border-slate-200 hover:border-[#1a2d6b] hover:-translate-y-[1px]"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black tracking-widest uppercase">Home</span>
          </a>

          <div className="h-6 w-px bg-slate-300"></div>

          <span className="font-black text-[#1a2d6b] text-lg tracking-tight uppercase truncate">
            {project.name}
          </span>
        </div>

        {/* 📍 Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { id: 'gallery', label: 'Gallery' },
            { id: 'plans', label: 'Plans' },
            { id: 'location', label: 'Location' }, // ✅ แก้แล้ว
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative text-[11px] font-bold uppercase tracking-widest transition-all"
            >
              <span className={`
                ${activeSection === item.id ? 'text-[#e53935]' : 'text-slate-500 group-hover:text-[#e53935]'}
              `}>
                {item.label}
              </span>

              {/* underline animation */}
              <span className={`
                absolute left-0 -bottom-1 h-[2px] bg-[#e53935] transition-all duration-300
                ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}
              `}></span>
            </a>
          ))}
        </div>

        {/* 📍 Right Actions */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          
          <a 
            href="tel:0825265566" 
            className="md:hidden flex items-center justify-center w-9 h-9 bg-white text-[#1a2d6b] border-2 border-[#1a2d6b] rounded-full hover:bg-[#1a2d6b] hover:text-white transition-colors shadow-sm"
          >
            <Phone size={14} />
          </a>

          <a 
            href="tel:0825265566" 
            className="hidden md:flex items-center gap-2 bg-white text-[#1a2d6b] border-2 border-[#1a2d6b] px-4 py-2 rounded-full text-xs font-black hover:bg-[#1a2d6b] hover:text-white transition-all hover:-translate-y-[1px]"
          >
            <Phone size={14} /> <span className="uppercase tracking-widest">Call Now</span>
          </a>

          <a 
            href="#register" 
            className="bg-[#e53935] text-white px-4 md:px-7 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 active:scale-95 hover:-translate-y-[1px]"
          >
            REGISTER
          </a>
        </div>
      </div>

      {/* 📍 Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-2xl py-4 px-6 flex flex-col gap-4">
          <a href="/" className="flex items-center gap-2 text-sm font-black text-slate-600 uppercase hover:text-[#e53935] pb-3 border-b">
            <ChevronLeft size={16} /> Home
          </a>

          {[
            { id: 'gallery', label: 'Gallery' },
            { id: 'plans', label: 'Plans' },
            { id: 'location', label: 'Location' }, // ✅ แก้แล้ว
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-black text-slate-600 uppercase hover:text-[#e53935] py-2 border-b"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}