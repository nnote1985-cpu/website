'use client';

import { useState, useEffect } from 'react';
import { Phone, ChevronLeft, Menu, X } from 'lucide-react';
import Link from 'next/link';
import './project-navbar.css';
import { projectFont, projectThaiFont } from './projectFonts';

const chapters = [
  { id: 'info', label: 'ข้อมูลโครงการ' },
  { id: 'gallery', label: 'แกลเลอรี' },
  { id: 'plans', label: 'แบบแปลน' },
  { id: 'video', label: 'วิดีโอ' },
  { id: 'faq', label: 'คำถามที่พบบ่อย' },
  { id: 'location', label: 'ทำเลที่ตั้ง' },
];

const FbIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

interface ProjectNavbarData {
  name: string;
  phone?: string;
  facebookUrl?: string;
  facebook_url?: string;
}

export default function ProjectNavbar({ project }: { project: ProjectNavbarData }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [visibleChapters, setVisibleChapters] = useState(chapters);

  const phone = project.phone || '0991982940';
  const phoneTel = phone.replace(/-/g, '');
  const facebookUrl = project.facebookUrl || project.facebook_url || '';

  const scrollToRegister = () => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-register-form="true"]'));
    const visibleTarget = targets.find((el) => el.offsetParent !== null || el.getClientRects().length > 0);
    const target = visibleTarget || document.getElementById('register');

    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const available = chapters.filter(item => document.getElementById(item.id));
    setVisibleChapters(available);
    const handleScroll = () => {
      let active = '';
      for (const item of available) {
        const rect = document.getElementById(item.id)?.getBoundingClientRect();
        if (rect && rect.top <= 180 && rect.bottom > 100) active = item.id;
      }
      setActiveSection(active);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [project.name]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMobileMenuOpen]);

  return (
    <nav aria-label="เมนูโครงการ" className={`${projectThaiFont.variable} ${projectFont.className} project-navbar fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300`}>
      <div className="project-navbar-inner mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">

        {/* Mobile left */}
        <div className="flex xl:hidden items-center gap-3 flex-1 min-w-0 pr-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="project-mobile-menu"
            className="p-1 -ml-1 text-[#1a2d6b] hover:bg-slate-100 rounded-lg shrink-0"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="font-semibold text-[#1a2d6b] text-sm uppercase truncate">
            {project.name}
          </span>
        </div>

        {/* Desktop left */}
        <div className="project-navbar-brand hidden xl:flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-1.5 bg-slate-100 hover:bg-[#1a2d6b] text-slate-600 hover:text-white px-4 py-2 rounded-full transition-all duration-300 shadow-sm border border-slate-200 hover:border-[#1a2d6b] hover:-translate-y-[1px]"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-semibold tracking-widest uppercase">Home</span>
          </Link>
          <div className="h-6 w-px bg-slate-300" />
          <span className="font-semibold text-[#1a2d6b] text-lg tracking-tight uppercase truncate">
            {project.name}
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="project-navbar-links hidden xl:flex items-center">
          {visibleChapters.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? 'location' : undefined}
              className="group relative text-[11px] font-medium uppercase tracking-widest transition-all"
            >
              <span className={activeSection === item.id ? 'text-[#e53935]' : 'text-slate-500 group-hover:text-[#e53935]'}>
                <small className="project-chapter-number">{String(index + 1).padStart(2, '0')}</small>{item.label}
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
            aria-label="โทรหาโครงการ"
            className="flex items-center gap-1.5 text-slate-500 hover:text-[#1a2d6b] px-3 py-2 rounded-full text-[10px] font-medium uppercase tracking-widest transition-colors hover:bg-slate-100"
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
              aria-label="Facebook Page"
            >
              <FbIcon />
            </a>
          )}

          {/* Register — เด่นสุด */}
          <button
            type="button"
            onClick={scrollToRegister}
            className="bg-[#e53935] text-white px-5 md:px-7 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-semibold tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 active:scale-95 hover:-translate-y-[1px]"
          >
            REGISTER
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div id="project-mobile-menu" className="project-navbar-menu xl:hidden absolute top-16 md:top-20 left-0 right-0 bg-white border-b border-slate-200 shadow-2xl py-4 px-6 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-600 uppercase hover:text-[#e53935] pb-3 border-b">
            <ChevronLeft size={16} /> Home
          </Link>
          {visibleChapters.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? 'location' : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-600 uppercase hover:text-[#e53935] py-2 border-b"
            >
              <small className="project-chapter-number">{String(index + 1).padStart(2, '0')}</small>{item.label}
            </a>
          ))}
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-[#1877F2] uppercase py-2"
            >
              <FbIcon /> Facebook Page
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
