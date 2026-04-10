'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface Props {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({ label, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      {/* Toggle bar — มือถือเท่านั้น */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-full flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100"
      >
        <span className="text-xs font-black uppercase tracking-widest text-[#1a2d6b]">{label}</span>
        <span className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors ${open ? 'border-[#1a2d6b] text-[#1a2d6b]' : 'border-[#e53935] text-[#e53935]'}`}>
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      {/* Content: ซ่อนบน mobile ถ้าปิด, แสดงเสมอบน desktop */}
      <div className={`${open ? 'block' : 'hidden'} md:block`}>
        {children}
      </div>
    </div>
  );
}
