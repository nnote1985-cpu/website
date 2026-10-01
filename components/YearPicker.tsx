'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, X } from 'lucide-react';

const YEAR_OPTIONS = [10, 15, 20, 25, 30, 35, 40];

// Styled replacement for <select>: the native picker on Android/iOS can't be themed.
export default function YearPicker({ value, onChange }: { value: number; onChange: (years: number) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="w-full flex items-center justify-between border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold text-[#1a2d6b] focus:outline-none focus-visible:border-[#e53935]"
      >
        {value} ปี
        <ChevronDown size={15} className="text-slate-400" />
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-[200] flex items-end" role="dialog" aria-modal="true" aria-label="เลือกระยะเวลาผ่อน">
          <button type="button" aria-label="ปิด" className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-[fadeIn_.2s_ease-out]" onClick={() => setOpen(false)} />
          <div className="relative w-full bg-white rounded-t-3xl shadow-2xl px-5 pt-3 pb-[calc(20px+env(safe-area-inset-bottom))] animate-[sheetUp_.25s_cubic-bezier(.22,.61,.36,1)]">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200" />
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[15px] font-black text-[#1a2d6b]">ระยะเวลาผ่อน</div>
                <div className="text-[11px] text-slate-400">ยิ่งผ่อนนาน ค่างวดต่อเดือนยิ่งต่ำ</div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="ปิด" className="w-9 h-9 grid place-items-center rounded-full bg-slate-100 text-slate-500 active:bg-slate-200">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {YEAR_OPTIONS.map((y) => {
                const selected = y === value;
                return (
                  <button
                    key={y}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => { onChange(y); setOpen(false); }}
                    className={`relative h-14 rounded-2xl border text-center transition-colors active:scale-95 ${
                      selected ? 'bg-[#1a2d6b] border-[#1a2d6b] text-white shadow-md shadow-[#1a2d6b]/20' : 'bg-slate-50 border-slate-100 text-[#1a2d6b]'
                    }`}
                  >
                    <span className="text-lg font-black leading-none">{y}</span>
                    <span className={`block text-[10px] mt-0.5 ${selected ? 'text-white/70' : 'text-slate-400'}`}>ปี</span>
                    {selected && <Check size={12} strokeWidth={3} className="absolute top-1.5 right-1.5 text-[#e53935]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
