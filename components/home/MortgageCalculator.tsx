'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Calculator } from 'lucide-react';

type Mode = 'monthly' | 'maxloan';

function getSliderStyle(pct: number): CSSProperties {
  const clampedPct = Math.min(100, Math.max(0, pct));

  return {
    '--range-progress': `${clampedPct}%`,
  } as CSSProperties;
}

export default function MortgageCalculator() {
  const [mode, setMode] = useState<Mode>('monthly');

  const [loanAmount, setLoanAmount] = useState(2000000);
  const [interest, setInterest] = useState(3);
  const [years, setYears] = useState(40);

  const [monthlyIncome, setMonthlyIncome] = useState(30000);
  const [maxInterest, setMaxInterest] = useState(3);
  const [maxYears, setMaxYears] = useState(40);

  function calcMonthly(loan: number, rate: number, yr: number) {
    const r = rate / 100 / 12;
    const n = yr * 12;
    if (r === 0) return loan / n;
    return (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  function calcMaxLoan(monthlyPay: number, rate: number, yr: number) {
    const maxPay = monthlyPay * 0.4;
    const r = rate / 100 / 12;
    const n = yr * 12;
    if (r === 0) return maxPay * n;
    return (maxPay * (1 - Math.pow(1 + r, -n))) / r;
  }

  const monthly = calcMonthly(loanAmount, interest, years);
  const maxLoan = calcMaxLoan(monthlyIncome, maxInterest, maxYears);

  const loanPct = ((loanAmount - 500000) / 9500000) * 100;
  const incomePct = ((monthlyIncome - 10000) / 190000) * 100;

  const inputCls = "w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:border-[#f4511e]/60 focus:bg-white/12 transition-all placeholder-white/30";
  const selectCls = "w-full bg-zinc-800 border border-white/12 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:border-[#f4511e]/60 transition-all appearance-none cursor-pointer";
  const labelCls = "block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2";

  function sliderStyle(pct: number) {
    return getSliderStyle(pct);
  }

  return (
    <section className="bg-zinc-900 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-[#f4511e] text-xs font-bold uppercase tracking-[0.3em] mb-2">เครื่องมือคำนวณ</p>
          <h2 className="text-3xl font-bold text-white mb-2">คำนวณสินเชื่อบ้าน</h2>
          <p className="text-white/40 text-sm">วางแผนการเงินก่อนตัดสินใจซื้อ</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/6 rounded-2xl p-1 mb-8 border border-white/8">
          <button
            onClick={() => setMode('monthly')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              mode === 'monthly' ? 'bg-[#f4511e] text-white shadow-lg' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Calculator size={14} className="inline mr-1.5 -mt-0.5" />
            คำนวณผ่อนต่อเดือน
          </button>
          <button
            onClick={() => setMode('maxloan')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              mode === 'maxloan' ? 'bg-[#f4511e] text-white shadow-lg' : 'text-white/40 hover:text-white/70'
            }`}
          >
            กู้ได้สูงสุดเท่าไหร่?
          </button>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/8 space-y-5">
          {mode === 'monthly' ? (
            <>
              <div>
                <label className={labelCls}>วงเงินกู้ (บาท)</label>
                <input
                  type="number" value={loanAmount}
                  onChange={(e) => setLoanAmount(+e.target.value)}
                  className={inputCls}
                />
                <input
                  type="range" min={500000} max={10000000} step={100000} value={loanAmount}
                  onInput={(e) => setLoanAmount(+(e.target as HTMLInputElement).value)}
                  onChange={(e) => setLoanAmount(+e.target.value)}
                  className="range-slider mt-2"
                  style={sliderStyle(loanPct)}
                />
                <div className="flex justify-between text-[10px] text-white/30 mt-1 px-0.5">
                  <span>500,000</span><span>10,000,000</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>ดอกเบี้ย (% ต่อปี)</label>
                  <input type="number" step="0.1" value={interest}
                    onChange={(e) => setInterest(+e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>ระยะเวลา (ปี)</label>
                  <div className="relative">
                    <select value={years} onChange={(e) => setYears(+e.target.value)} className={selectCls}>
                      {[10, 15, 20, 25, 30, 35, 40].map((y) => (
                        <option key={y} value={y}>{y} ปี</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">▾</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f4511e]/15 border border-[#f4511e]/25 rounded-2xl p-5 text-center">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-2">ผ่อนต่อเดือน (โดยประมาณ)</p>
                <p className="text-5xl font-black text-white tracking-tight">
                  {monthly.toLocaleString('th-TH', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-[#f4511e] font-bold text-base mt-1">บาท/เดือน</p>
                <p className="text-white/30 text-xs mt-3">
                  ยอดรวมตลอดสัญญา: {(monthly * years * 12).toLocaleString('th-TH', { maximumFractionDigits: 0 })} บาท
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className={labelCls}>รายได้ต่อเดือน (บาท)</label>
                <input type="number" value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(+e.target.value)}
                  className={inputCls}
                />
                <CustomSlider value={monthlyIncome} min={10000} max={200000} step={5000} pct={incomePct} onChange={setMonthlyIncome} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>ดอกเบี้ย (% ต่อปี)</label>
                  <input type="number" step="0.1" value={maxInterest}
                    onChange={(e) => setMaxInterest(+e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>ระยะเวลา (ปี)</label>
                  <div className="relative">
                    <select value={maxYears} onChange={(e) => setMaxYears(+e.target.value)} className={selectCls}>
                      {[10, 15, 20, 25, 30, 35, 40].map((y) => (
                        <option key={y} value={y}>{y} ปี</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">▾</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f4511e]/15 border border-[#f4511e]/25 rounded-2xl p-5 text-center">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-2">วงเงินกู้สูงสุด (โดยประมาณ)</p>
                <p className="text-5xl font-black text-white tracking-tight">
                  {maxLoan.toLocaleString('th-TH', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-[#f4511e] font-bold text-base mt-1">บาท</p>
                <p className="text-white/30 text-xs mt-3">
                  คำนวณจาก 40% ของรายได้ = {(monthlyIncome * 0.4).toLocaleString('th-TH', { maximumFractionDigits: 0 })} บาท/เดือน
                </p>
              </div>
            </>
          )}

          <p className="text-white/25 text-xs text-center pt-1">
            * ผลการคำนวณเป็นเพียงการประมาณการ ขึ้นอยู่กับเงื่อนไขของธนาคาร
          </p>
        </div>
      </div>
    </section>
  );
}

type CustomSliderProps = {
  value: number;
  min: number;
  max: number;
  step: number;
  pct: number;
  onChange: (value: number) => void;
};

function CustomSlider({ value, min, max, step, pct, onChange }: CustomSliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onInput={(e) => onChange(+(e.target as HTMLInputElement).value)}
      onChange={(e) => onChange(+e.target.value)}
      className="range-slider mt-2"
      style={getSliderStyle(pct)}
    />
  );
}
