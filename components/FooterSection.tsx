'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export default function FooterSection({ title, children }: { title: string; children: React.ReactNode }) {
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
