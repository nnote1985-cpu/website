'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gift, Shield, Percent, Users } from 'lucide-react';

const tabs = [
  { label: 'Birthday', icon: <Gift size={18} />, href: '/member/birthday' },
  { label: 'Insurance', icon: <Shield size={18} />, href: '/member/insurance' },
  { label: 'Discount', icon: <Percent size={18} />, href: '/member/discount' },
  { label: 'FGF', icon: <Users size={18} />, href: '/member/fgf' },
];

export default function MemberSubNav({ active }: { active: string }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop — top sticky (ใต้ header) */}
      <div className="hidden md:block sticky top-16 md:top-20 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar">
            {tabs.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${
                  active === t.label
                    ? 'border-[#e53935] text-[#e53935]'
                    : 'border-transparent text-slate-500 hover:text-[#1a2d6b]'
                }`}
              >
                {t.icon} {t.label}
              </Link>
            ))}
            <Link
              href="/member"
              className="ml-auto flex items-center px-5 py-4 text-xs text-slate-400 hover:text-slate-600 whitespace-nowrap"
            >
              ← กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile — bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-stretch">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[10px] font-bold transition-all ${
                active === t.label
                  ? 'text-[#e53935] bg-red-50'
                  : 'text-slate-400 hover:text-[#1a2d6b]'
              }`}
            >
              {t.icon}
              {t.label}
            </Link>
          ))}
          <Link
            href="/member"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-[10px] font-bold text-slate-400 hover:text-slate-600"
          >
            <span className="text-lg leading-none">←</span>
            หลัก
          </Link>
        </div>
      </div>

      {/* Mobile spacer กันไม่ให้ content โดน bottom bar บัง */}
      <div className="md:hidden h-16" />
    </>
  );
}
