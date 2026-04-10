'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';

type Mode = 'monthly' | 'maxloan';

export default function MortgageCalculator() {
  const [mode, setMode] = useState<Mode>('monthly');

  // Monthly payment mode
  const [loanAmount, setLoanAmount] = useState(2000000);
  const [interest, setInterest] = useState(6.5);
  const [years, setYears] = useState(30);

  // Max loan mode
  const [monthlyIncome, setMonthlyIncome] = useState(30000);
  const [maxInterest, setMaxInterest] = useState(6.5);
  const [maxYears, setMaxYears] = useState(30);

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

  return (
    <section className="bg-zinc-900 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="section-subtitle text-orange-400 mb-2">เครื่องมือคำนวณ</p>
          <h2 className="text-3xl font-bold text-white mb-2">คำนวณสินเชื่อบ้าน</h2>
          <p className="text-gray-400 text-sm">วางแผนการเงินก่อนตัดสินใจซื้อ</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/10 rounded-xl p-1 mb-8">
          <button
            onClick={() => setMode('monthly')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === 'monthly' ? 'bg-[#f4511e] text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Calculator size={14} className="inline mr-1.5 -mt-0.5" />
            คำนวณผ่อนต่อเดือน
          </button>
          <button
            onClick={() => setMode('maxloan')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === 'maxloan' ? 'bg-[#f4511e] text-white shadow' : 'text-gray-400 hover:text-white'
            }`}
          >
            กู้ได้สูงสุดเท่าไหร่?
          </button>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          {mode === 'monthly' ? (
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">วงเงินกู้ (บาท)</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(+e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#f4511e]"
                />
                <input
                  type="range"
                  min={500000}
                  max={10000000}
                  step={100000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(+e.target.value)}
                  className="w-full mt-2 accent-[#f4511e]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>500,000</span><span>10,000,000</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">ดอกเบี้ย (% ต่อปี)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interest}
                    onChange={(e) => setInterest(+e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f4511e]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">ระยะเวลา (ปี)</label>
                  <select
                    value={years}
                    onChange={(e) => setYears(+e.target.value)}
                    className="w-full bg-zinc-900 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f4511e]"
                  >
                    {[10, 15, 20, 25, 30].map((y) => (
                      <option key={y} value={y}>{y} ปี</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-[#f4511e]/20 border border-[#f4511e]/30 rounded-xl p-5 text-center">
                <p className="text-gray-300 text-sm mb-1">ผ่อนต่อเดือน (โดยประมาณ)</p>
                <p className="text-4xl font-bold text-white">
                  {monthly.toLocaleString('th-TH', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-[#f4511e] font-semibold text-lg">บาท/เดือน</p>
                <p className="text-gray-400 text-xs mt-2">
                  ยอดรวมตลอดสัญญา: {(monthly * years * 12).toLocaleString('th-TH', { maximumFractionDigits: 0 })} บาท
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">รายได้ต่อเดือน (บาท)</label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(+e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f4511e]"
                />
                <input
                  type="range"
                  min={10000}
                  max={200000}
                  step={5000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(+e.target.value)}
                  className="w-full mt-2 accent-[#f4511e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">ดอกเบี้ย (% ต่อปี)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={maxInterest}
                    onChange={(e) => setMaxInterest(+e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f4511e]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">ระยะเวลา (ปี)</label>
                  <select
                    value={maxYears}
                    onChange={(e) => setMaxYears(+e.target.value)}
                    className="w-full bg-zinc-900 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f4511e]"
                  >
                    {[10, 15, 20, 25, 30].map((y) => (
                      <option key={y} value={y}>{y} ปี</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-[#f4511e]/20 border border-[#f4511e]/30 rounded-xl p-5 text-center">
                <p className="text-gray-300 text-sm mb-1">วงเงินกู้สูงสุด (โดยประมาณ)</p>
                <p className="text-4xl font-bold text-white">
                  {maxLoan.toLocaleString('th-TH', { maximumFractionDigits: 0 })}
                </p>
                <p className="text-[#f4511e] font-semibold text-lg">บาท</p>
                <p className="text-gray-400 text-xs mt-2">
                  คำนวณจาก 40% ของรายได้ = {(monthlyIncome * 0.4).toLocaleString('th-TH', { maximumFractionDigits: 0 })} บาท/เดือน
                </p>
              </div>
            </div>
          )}

          <p className="text-gray-500 text-xs mt-4 text-center">
            * ผลการคำนวณเป็นเพียงการประมาณการ ขึ้นอยู่กับเงื่อนไขของธนาคาร
          </p>
        </div>
      </div>
    </section>
  );
}
