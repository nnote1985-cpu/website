import Link from 'next/link';
import { Gift, Shield, Percent, Users } from 'lucide-react';

const tabs = [
  { label: 'Birthday', icon: <Gift size={15} />, href: '/member/birthday' },
  { label: 'Insurance', icon: <Shield size={15} />, href: '/member/insurance' },
  { label: 'Discount', icon: <Percent size={15} />, href: '/member/discount' },
  { label: 'FGF', icon: <Users size={15} />, href: '/member/fgf' },
];

export default function MemberSubNav({ active }: { active: string }) {
  return (
    <div className="sticky top-16 md:top-20 z-40 bg-white border-b border-slate-100 shadow-sm">
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
  );
}
