'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 1. เพิ่มการ Import usePathname
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Asakan Member', href: '/member' },
  { label: 'AssetCare+', href: '/assetcare' },
  { label: 'Promotion', href: '/promotion' },
  {
    label: 'Projects',
    href: '/projects',
    children: [
      { label: 'Asakan Elysium Phahol-59', href: '/projects/elysium-phahol-59' },
      { label: 'Asakan Elysium Ram Interchange', href: '/projects/elysium-ram-interchange' },
      { label: 'The Celine Bang Chan Station', href: '/projects/the-celine-bang-chan' },
      { label: 'Wela Ramkhamhaeng', href: '/projects/wela-ramkhamhaeng' },
    ],
  },
  { label: 'News', href: '/news' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname(); // 2. สร้างตัวแปร pathname
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false); // เพิ่ม mounted เพื่อป้องกัน Hydration error

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 3. เงื่อนไขการซ่อน Navbar เมื่ออยู่หน้า Admin
  // ต้องเช็ค mounted ด้วยเพื่อให้ค่า pathname ฝั่ง Client เสถียร
  if (!mounted || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      {/* 1. Top bar - ใช้พื้นหลังสีเทาอ่อนสุดๆ เพื่อตัดกับเมนูหลัก */}
      <div 
        className={`transition-all duration-500 bg-slate-50 border-b border-slate-200/50 text-[11px] font-bold tracking-widest hidden md:block ${
          scrolled ? 'h-0 overflow-hidden opacity-0 border-transparent' : 'py-2.5 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          <span className="flex items-center gap-3">
            {/* 📍 Ping Indicator Effect - เปลี่ยนเป็นสีแดง */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e53935] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e53935]" />
            </span>
            <span className="uppercase text-slate-500 font-medium">ผู้พัฒนาอสังหาริมทรัพย์คุณภาพ กว่า 21 ปี</span>
          </span>

          <div className="flex items-center gap-6 text-slate-500">
            <a href="tel:0825265566" className="flex items-center gap-1.5 hover:text-[#e53935] transition-colors">
              <Phone size={12} className="text-[#e53935]" /> 082-526-5566
            </a>
            <span className="text-slate-300">|</span>
            <a href="tel:020599655" className="flex items-center gap-1.5 hover:text-[#e53935] transition-colors">
              <Phone size={12} className="text-[#e53935]" /> 02-059-9655
            </a>
          </div>

        </div>
      </div>

      {/* 2. Main Header */}
      <div 
        className={`transition-all duration-500 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3' 
            : 'bg-white border-b border-slate-100 py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
              {/* 📍 เปลี่ยนโลโก้บล็อกเป็นสี Slate-900 หรูๆ Hover แล้วเป็นสีแดง */}
              <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center group-hover:bg-[#e53935] transition-colors duration-500 shadow-sm">
                <span className="font-black text-xl leading-none">A</span>
              </div>
              <div className="flex flex-col justify-center">
                <div className="font-black text-xl text-slate-900 leading-none tracking-tight">ASAKAN</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Co.Ltd</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div
                    key={link.href}
                    className="relative py-2"
                    onMouseEnter={() => setDropdownOpen(link.href)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    <Link
                      href={link.href}
                      // 📍 Hover สีแดง
                      className="group flex items-center gap-1 text-[13px] font-bold text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-wider"
                    >
                      {link.label}
                      <ChevronDown size={12} className={`transition-transform duration-300 ${dropdownOpen === link.href ? 'rotate-180 text-[#e53935]' : ''}`} />
                    </Link>
                    
                    {/* Dropdown 📍 เพิ่มความละมุนให้เงาและการเลื่อนปรากฏ */}
                    <div 
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-5 transition-all duration-300 ${
                        dropdownOpen === link.href ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                      }`}
                    >
                      <div className="w-72 bg-white/95 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] rounded-2xl border border-slate-100 p-2.5 overflow-hidden">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group/item relative block px-4 py-3 rounded-xl hover:bg-slate-50 transition-all duration-300"
                          >
                            {/* 📍 เพิ่มขีดสีแดงเล็กๆ ดึงดูดสายตาตอน Hover */}
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#e53935] rounded-r-full transition-all duration-300 group-hover/item:h-1/2 opacity-0 group-hover/item:opacity-100" />
                            <span className="text-[13px] font-semibold text-slate-600 group-hover/item:text-[#e53935] group-hover/item:pl-1 transition-all duration-300 block">
                              {child.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-[13px] font-bold text-slate-600 hover:text-slate-900 transition-colors uppercase tracking-wider group py-2"
                  >
                    {link.label}
                    {/* 📍 เส้นใต้ตอน Hover เป็นสีแดง */}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#e53935] transition-all duration-300 group-hover:w-full" />
                  </Link>
                )
              )}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              {/* 📍 ปรับปุ่ม LINE ให้คลีนขึ้น (Outline -> Solid Green on Hover) */}
              <a
                href="https://line.me/ti/p/~@asakan"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 border border-slate-200 text-slate-700 text-[13px] font-bold px-6 py-2.5 rounded-full hover:bg-[#00c300] hover:border-[#00c300] hover:text-white transition-all duration-300 hover:shadow-[0_4px_15px_rgba(0,195,0,0.3)]"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
                </svg>
                คุยกับฝ่ายขาย
              </a>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-900 hover:bg-slate-100 hover:text-[#e53935] transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Mobile menu */}
      <div 
        className={`lg:hidden fixed inset-x-0 bg-white/95 backdrop-blur-2xl border-t border-slate-100 shadow-2xl transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-1 h-[calc(100vh-80px)] overflow-y-auto pb-24">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="border-b border-slate-100/50 last:border-0 pb-2 mb-2">
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-[14px] font-bold text-slate-800 hover:text-[#e53935] transition-colors uppercase tracking-wider"
              >
                {link.label}
              </Link>
              {link.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 pl-4 py-3 text-[13px] font-medium text-slate-500 hover:text-[#e53935] transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e53935] opacity-50" />
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          
          <div className="pt-6">
            <a
              href="https://line.me/ti/p/~@asakan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#00c300] text-white text-[14px] font-bold px-6 py-4 rounded-xl shadow-lg shadow-[#00c300]/20 active:scale-95 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
              </svg>
              คุยกับฝ่ายขายผ่าน LINE
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}