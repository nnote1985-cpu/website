'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-full flex items-center justify-between py-3 border-b border-slate-200"
      >
        <span className="font-bold text-sm text-[#1a2d6b]">{title}</span>
        <span className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${open ? 'border-[#1a2d6b] text-[#1a2d6b]' : 'border-[#e53935] text-[#e53935]'}`}>
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>
      <h3 className="hidden md:block font-bold text-base mb-4 text-[#1a2d6b]">{title}</h3>
      <div className={`${open ? 'block' : 'hidden'} md:block pt-3 md:pt-0`}>
        {children}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white text-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10">
        {/* Brand — ไม่ collapsible */}
        <div className="pb-4 border-b border-slate-200 md:border-none md:pb-0">
          <div className="flex items-center gap-3 mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="ASAKAN" width={40} height={40} className="h-10 w-auto" />
            <div>
              <div className="font-bold text-xl leading-none text-[#1a2d6b]">ASAKAN</div>
              <div className="text-xs text-slate-500 leading-none">อัสสกาญจน์</div>
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            ผู้พัฒนาอสังหาริมทรัพย์คุณภาพ กว่า 21 ปี <br />
            <em className="text-[#e53935]">&quot;Your happiness is our hope&quot;</em>
          </p>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/Asakandevelopment" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700" aria-label="Facebook">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://line.me/ti/p/~@asakan" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600" aria-label="LINE">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
              </svg>
            </a>
            <a href="mailto:info@asakan.co.th"
              className="w-9 h-9 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center hover:bg-[#e53935] hover:text-white transition-colors" aria-label="Email">
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <FooterSection title="ลิงก์ด่วน">
          <ul className="space-y-2 text-sm text-slate-500">
            {[
              { label: 'หน้าแรก', href: '/' },
              { label: 'เกี่ยวกับเรา', href: '/about' },
              { label: 'โครงการทั้งหมด', href: '/projects' },
              { label: 'โปรโมชั่น', href: '/promotion' },
              { label: 'สมาชิก ASAKAN', href: '/member' },
              { label: 'AssetCare+', href: '/assetcare' },
              { label: 'ข่าวสาร', href: '/news' },
              { label: 'FAQ', href: '/faq' },
              { label: 'ติดต่อเรา', href: '/contact' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#e53935] transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </FooterSection>

        {/* Projects */}
        <FooterSection title="โครงการของเรา">
          <ul className="space-y-2 text-sm text-slate-500">
            {[
              { label: 'Asakan Elysium Phahol-59', href: '/elysium59' },
              { label: 'Asakan Elysium Ram Interchange', href: '/projects/elysium-ram-interchange' },
              { label: 'The Celine Bang Chan Station', href: '/theceline' },
              { label: 'Wela Ramkhamhaeng', href: '/projects/wela-ramkhamhaeng' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#e53935] transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </FooterSection>

        {/* Contact */}
        <FooterSection title="ติดต่อเรา">
          <ul className="space-y-3 text-sm text-slate-500">
            <li className="flex gap-2">
              <MapPin size={16} className="text-[#e53935] flex-shrink-0 mt-0.5" />
              <span>191 ถนนรามคำแหง แขวงสะพานสูง เขตสะพานสูง กรุงเทพฯ 10240</span>
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="text-[#e53935] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <a href="tel:0825265566" className="block hover:text-[#e53935]">082-526-5566</a>
                <a href="tel:020599655" className="block hover:text-[#e53935]">02-059-9655</a>
                <a href="tel:0991982940" className="block hover:text-[#e53935]">099-198-2940</a>
              </div>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="text-[#e53935] flex-shrink-0 mt-0.5" />
              <a href="mailto:info@asakan.co.th" className="hover:text-[#e53935]">info@asakan.co.th</a>
            </li>
          </ul>
        </FooterSection>
      </div>

      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-2">
          <p>© 2024 บริษัท อัสสกาญจน์ จำกัด (ASAKAN CO., LTD). All rights reserved.</p>
          <p>Developed with Next.js | SEO Optimized</p>
        </div>
      </div>
    </footer>
  );
}
