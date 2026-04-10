'use client';

import { useState } from 'react';
import { Phone, X, Plus, Calculator } from 'lucide-react';

function MiniCalculator() {
  const [loan, setLoan] = useState(2000000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly = r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <Calculator size={15} className="text-[#1a2d6b]" />
        <span className="text-xs font-black uppercase tracking-wider text-[#1a2d6b]">คำนวณสินเชื่อ</span>
      </div>

      <div className="space-y-2.5">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-[11px] text-slate-400">วงเงินกู้</span>
            <span className="text-[11px] font-bold text-[#1a2d6b]">{(loan / 1000000).toFixed(1)}M</span>
          </div>
          <input
            type="range" min={500000} max={10000000} step={100000} value={loan}
            onChange={(e) => setLoan(+e.target.value)}
            className="w-full h-1.5 accent-[#e53935]"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">ดอกเบี้ย (%/ปี)</span>
            <input
              type="number" step="0.1" value={rate}
              onChange={(e) => setRate(+e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm text-center font-bold text-[#1a2d6b] focus:outline-none focus:border-[#e53935]"
            />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block mb-1">ระยะเวลา (ปี)</span>
            <select
              value={years} onChange={(e) => setYears(+e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-bold text-[#1a2d6b] focus:outline-none focus:border-[#e53935]"
            >
              {[10, 15, 20, 25, 30].map((y) => <option key={y} value={y}>{y} ปี</option>)}
            </select>
          </div>
        </div>

        <div className="bg-[#1a2d6b] rounded-xl px-4 py-3 text-center">
          <div className="text-white/60 text-[10px] mb-0.5">ผ่อนต่อเดือน (โดยประมาณ)</div>
          <div className="text-white font-black text-xl">
            {monthly.toLocaleString('th-TH', { maximumFractionDigits: 0 })}
            <span className="text-sm font-normal ml-1">บาท</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FloatingCTA() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Backdrop */}
      {expanded && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Mobile bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">

        {/* Expanded panel */}
        {expanded && (
          <div className="px-4 pb-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
            {/* Calculator */}
            <MiniCalculator />

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <a
                href="tel:0825265566"
                className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-[#1a2d6b] font-bold text-sm py-3.5 rounded-2xl shadow-sm active:scale-95 transition-transform"
              >
                <Phone size={16} className="text-[#e53935]" />
                โทรเลย
              </a>
              <a
                href="https://line.me/ti/p/~@asakan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#00c300] text-white font-bold text-sm py-3.5 rounded-2xl shadow-sm active:scale-95 transition-transform"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
                </svg>
                LINE
              </a>
            </div>
          </div>
        )}

        {/* Bottom bar */}
        <div className="bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-4 pt-3 pb-safe">
          <div className="flex items-center gap-3 pb-3">
            {/* Phone — always visible */}
            <a
              href="tel:0825265566"
              className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-bold text-sm py-3 rounded-2xl active:scale-95 transition-transform"
            >
              <Phone size={16} className="text-[#e53935]" />
              <span className="text-[#1a2d6b]">082-526-5566</span>
            </a>

            {/* + toggle */}
            <button
              onClick={() => setExpanded(!expanded)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-all active:scale-95 shrink-0 ${
                expanded ? 'bg-slate-800 rotate-45' : 'bg-[#e53935]'
              }`}
              aria-label="เพิ่มเติม"
            >
              <Plus size={22} className="text-white" />
            </button>

            {/* LINE — always visible */}
            <a
              href="https://line.me/ti/p/~@asakan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#00c300] text-white font-bold text-sm py-3 rounded-2xl shadow-sm active:scale-95 transition-transform"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
              </svg>
              LINE
            </a>
          </div>
        </div>
      </div>

      {/* Desktop — floating button (เหมือนเดิม) */}
      <div className="hidden md:flex fixed bottom-6 right-4 z-40 flex-col items-end gap-2">
        {expanded && (
          <div className="flex flex-col gap-2">
            <a href="tel:0825265566" className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all whitespace-nowrap">
              <Phone size={15} className="text-[#e53935]" /> 082-526-5566
            </a>
            <a href="https://line.me/ti/p/~@asakan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#00c300] text-white font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:bg-[#00a300] transition-all whitespace-nowrap">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
              </svg>
              LINE: @asakan
            </a>
          </div>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all relative ${expanded ? 'bg-gray-800' : 'bg-[#e53935]'}`}
        >
          {expanded ? <X size={22} className="text-white" /> : <Plus size={22} className="text-white" />}
          {!expanded && <span className="absolute w-14 h-14 rounded-full bg-[#e53935] opacity-40 animate-ping" />}
        </button>
      </div>
    </>
  );
}
