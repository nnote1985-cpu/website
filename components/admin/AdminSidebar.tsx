'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Building2, Tag, Newspaper,
  MessageSquare, Settings, LogOut, Home, Menu, X, Images, ImageIcon
} from 'lucide-react';
import { useState } from 'react';

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> },
  { label: 'โครงการ', href: '/admin/projects', icon: <Building2 size={18} /> },
  { label: 'โปรโมชั่น', href: '/admin/promotions', icon: <Tag size={18} /> },
  { label: 'ข่าวสาร', href: '/admin/news', icon: <Newspaper size={18} /> },
  { label: 'ข้อความติดต่อ', href: '/admin/contacts', icon: <MessageSquare size={18} /> },
    { label: 'รูปภาพหน้าแรก', href: '/admin/hero-images', icon: <Images size={18} /> },
  { label: 'Hero แต่ละโครงการ', href: '/admin/project-heroes', icon: <ImageIcon size={18} /> },
  { label: 'ตั้งค่าเว็บไซต์', href: '/admin/settings', icon: <Settings size={18} /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#f4511e] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm">ASAKAN</div>
            <div className="text-gray-400 text-xs">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-[#f4511e] text-white shadow-md shadow-orange-900/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all"
        >
          <Home size={18} />
          ดูเว็บไซต์
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut size={18} />
          ออกจากระบบ
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#1a2d6b] text-white p-2 rounded-lg shadow-lg"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-[#0f1e4a] z-50 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
