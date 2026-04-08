'use client';

import { useState, useEffect } from 'react';
import { Phone, ChevronLeft, Menu, X } from 'lucide-react';

const FbIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

export default function ProjectNavbar({ project }: { project: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const phone = project.phone || '0825265566';
  const phoneTel = phone.replace(/-/g, '');
  const facebookUrl = project.facebookUrl || project.facebook_url || '';

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

        {/* Mobile left */}
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

        {/* Desktop left */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="/"
            className="group flex items-center gap-1.5 bg-slate-100 hover:bg-[#1a2d6b] text-slate-600 hover:text-white px-4 py-2 rounded-full transition-all duration-300 shadow-sm border border-slate-200 hover:border-[#1a2d6b] hover:-translate-y-[1px]"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black tracking-widest uppercase">Home</span>
          </a>
          <div className="h-6 w-px bg-slate-300" />
          <span className="font-black text-[#1a2d6b] text-lg tracking-tight uppercase truncate">
            {project.name}
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { id: 'gallery', label: 'Gallery' },
            { id: 'plans', label: 'Plans' },
            { id: 'location', label: 'Location' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative text-[11px] font-bold uppercase tracking-widest transition-all"
            >
              <span className={activeSection === item.id ? 'text-[#e53935]' : 'text-slate-500 group-hover:text-[#e53935]'}>
                {item.label}
              </span>
              <span className={`absolute left-0 -bottom-1 h-[2px] bg-[#e53935] transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">

          {/* Tel — icon + "TEL" label, subdued style */}
          <a
            href={`tel:${phoneTel}`}
            className="flex items-center gap-1.5 text-slate-500 hover:text-[#1a2d6b] px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-slate-100"
          >
            <Phone size={13} />
            <span className="hidden md:inline">Tel</span>
          </a>

          {/* Facebook — icon only, subdued */}
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 text-slate-400 hover:text-[#1877F2] hover:bg-blue-50 rounded-full transition-colors"
              title="Facebook"
            >
              <FbIcon />
            </a>
          )}

          {/* Register — เด่นสุด */}
          <a
            href="#register"
            className="bg-[#e53935] text-white px-5 md:px-7 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 active:scale-95 hover:-translate-y-[1px]"
          >
            REGISTER
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-2xl py-4 px-6 flex flex-col gap-4">
          <a href="/" className="flex items-center gap-2 text-sm font-black text-slate-600 uppercase hover:text-[#e53935] pb-3 border-b">
            <ChevronLeft size={16} /> Home
          </a>
          {[
            { id: 'gallery', label: 'Gallery' },
            { id: 'plans', label: 'Plans' },
            { id: 'location', label: 'Location' },
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
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-black text-[#1877F2] uppercase py-2"
            >
              <FbIcon /> Facebook Page
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
