'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface Props {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  alwaysCollapsible?: boolean;
}

export default function CollapsibleSection({ label, children, defaultOpen = false, alwaysCollapsible = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      {/* Toggle bar — มือถือเท่านั้น หรือทุกหน้าจอเมื่อกำหนด alwaysCollapsible */}
      <button
        onClick={() => setOpen(!open)}
        className={`${alwaysCollapsible ? 'flex' : 'md:hidden flex'} w-full items-center justify-between px-6 py-4 bg-white border-b border-slate-100`}
      >
        <span className="text-xs font-black uppercase tracking-widest text-[#1a2d6b]">{label}</span>
        <span className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors ${open ? 'border-[#1a2d6b] text-[#1a2d6b]' : 'border-[#e53935] text-[#e53935]'}`}>
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      {/* Content: ซ่อนบน mobile ถ้าปิด, แสดงเสมอบน desktop ยกเว้น alwaysCollapsible */}
      <div className={alwaysCollapsible ? (open ? 'block' : 'hidden') : `${open ? 'block' : 'hidden'} md:block`}>
        {children}
      </div>
    </div>
  );
}
