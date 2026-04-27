'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowRight, Calculator, Phone } from 'lucide-react';
import { projectUrl } from '@/lib/projectUrl';

type Mode = 'monthly' | 'maxloan';

type CalculatorProject = {
  id: string;
  slug: string;
  name: string;
  status: string;
  priceMin: number;
  priceMax?: number;
  location?: string;
  bts?: string;
};

type MortgageCalculatorProps = {
  projects?: CalculatorProject[];
};

function getSliderStyle(pct: number): CSSProperties {
  const clampedPct = Math.min(100, Math.max(0, pct));

  return {
    '--range-progress': `${clampedPct}%`,
  } as CSSProperties;
}

function formatBaht(value: number) {
  return value.toLocaleString('th-TH', { maximumFractionDigits: 0 });
}

export default function MortgageCalculator({ projects = [] }: MortgageCalculatorProps) {
  const [mode, setMode] = useState<Mode>('monthly');
  const [showRecommendations, setShowRecommendations] = useState(false);

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
  const targetBudget = mode === 'monthly' ? loanAmount : maxLoan;

  const recommendedProjects = useMemo(() => {
    const availableProjects = projects.filter((project) => (
      project.status !== 'sold-out' && Number(project.priceMin) > 0
    ));

    const inBudget = availableProjects
      .filter((project) => Number(project.priceMin) <= targetBudget)
      .sort((a, b) => (targetBudget - Number(a.priceMin)) - (targetBudget - Number(b.priceMin)));

    const fallback = availableProjects
      .filter((project) => Number(project.priceMin) > targetBudget)
      .sort((a, b) => Number(a.priceMin) - Number(b.priceMin));

    return [...inBudget, ...fallback].slice(0, 3);
  }, [projects, targetBudget]);

  const loanPct = ((loanAmount - 500000) / 9500000) * 100;
  const incomePct = ((monthlyIncome - 10000) / 190000) * 100;

  const inputCls = "w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:border-[#e53935]/60 focus:bg-white/12 transition-all placeholder-white/30";
  const selectCls = "w-full bg-zinc-800 border border-white/12 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:border-[#e53935]/60 transition-all appearance-none cursor-pointer";
  const labelCls = "block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2";

  function sliderStyle(pct: number) {
    return getSliderStyle(pct);
  }

  return (
    <section className="bg-zinc-900 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-[#e53935] text-xs font-bold uppercase tracking-[0.3em] mb-2">เครื่องมือคำนวณ</p>
          <h2 className="text-3xl font-bold text-white mb-2">คำนวณสินเชื่อบ้าน</h2>
          <p className="text-white/40 text-sm">วางแผนการเงินก่อนตัดสินใจซื้อ</p>
        </div>

        <div className="flex bg-white/6 rounded-2xl p-1 mb-8 border border-white/8">
          <button
            onClick={() => {
              setMode('monthly');
              setShowRecommendations(false);
            }}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              mode === 'monthly' ? 'bg-[#e53935] text-white shadow-lg' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Calculator size={14} className="inline mr-1.5 -mt-0.5" />
            คำนวณผ่อนต่อเดือน
          </button>
          <button
            onClick={() => {
              setMode('maxloan');
              setShowRecommendations(false);
            }}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              mode === 'maxloan' ? 'bg-[#e53935] text-white shadow-lg' : 'text-white/40 hover:text-white/70'
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
                  type="number"
                  value={loanAmount}
                  onChange={(e) => {
                    setLoanAmount(+e.target.value);
                    setShowRecommendations(false);
                  }}
                  className={inputCls}
                />
                <input
                  type="range"
                  min={500000}
                  max={10000000}
                  step={100000}
                  value={loanAmount}
                  onInput={(e) => {
                    setLoanAmount(+(e.target as HTMLInputElement).value);
                    setShowRecommendations(false);
                  }}
                  onChange={(e) => {
                    setLoanAmount(+e.target.value);
                    setShowRecommendations(false);
                  }}
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

              <ResultSummary
                label="ผ่อนต่อเดือน (โดยประมาณ)"
                value={monthly}
                unit="บาท/เดือน"
                detail={`ยอดรวมตลอดสัญญา: ${formatBaht(monthly * years * 12)} บาท`}
                onShowProjects={() => setShowRecommendations(true)}
              />
            </>
          ) : (
            <>
              <div>
                <label className={labelCls}>รายได้ต่อเดือน (บาท)</label>
                <input type="number" value={monthlyIncome}
                  onChange={(e) => {
                    setMonthlyIncome(+e.target.value);
                    setShowRecommendations(false);
                  }}
                  className={inputCls}
                />
                <CustomSlider
                  value={monthlyIncome}
                  min={10000}
                  max={200000}
                  step={5000}
                  pct={incomePct}
                  onChange={(value) => {
                    setMonthlyIncome(value);
                    setShowRecommendations(false);
                  }}
                />
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

              <ResultSummary
                label="วงเงินกู้สูงสุด (โดยประมาณ)"
                value={maxLoan}
                unit="บาท"
                detail={`คำนวณจาก 40% ของรายได้ = ${formatBaht(monthlyIncome * 0.4)} บาท/เดือน`}
                onShowProjects={() => setShowRecommendations(true)}
              />
            </>
          )}

          {showRecommendations && (
            <RecommendedProjects projects={recommendedProjects} targetBudget={targetBudget} />
          )}

          <p className="text-white/25 text-xs text-center pt-1">
            * ผลการคำนวณเป็นเพียงการประมาณการ ขึ้นอยู่กับเงื่อนไขของธนาคาร
          </p>
        </div>
      </div>
    </section>
  );
}

function ResultSummary({
  label,
  value,
  unit,
  detail,
  onShowProjects,
}: {
  label: string;
  value: number;
  unit: string;
  detail: string;
  onShowProjects: () => void;
}) {
  return (
    <div className="bg-[#e53935]/15 border border-[#e53935]/25 rounded-2xl p-5 text-center">
      <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{label}</p>
      <p className="text-5xl font-black text-white tracking-tight">
        {formatBaht(value)}
      </p>
      <p className="text-[#e53935] font-bold text-base mt-1">{unit}</p>
      <p className="text-white/30 text-xs mt-3">{detail}</p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e53935] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#c62828]"
        >
          <Phone size={16} />
          ติดต่อฝ่ายขาย
        </Link>
        <button
          type="button"
          onClick={onShowProjects}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-white/12 cursor-pointer"
        >
          ดูโครงการตามงบ
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function RecommendedProjects({ projects, targetBudget }: { projects: CalculatorProject[]; targetBudget: number }) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
        <p className="text-sm font-bold text-white">ยังไม่มีโครงการที่ตรงกับงบนี้</p>
        <p className="mt-1 text-xs text-white/40">ฝ่ายขายช่วยแนะนำตัวเลือกที่เหมาะกับคุณได้</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#e53935]">Recommended</p>
          <h3 className="text-lg font-bold text-white">โครงการแนะนำตามงบ {formatBaht(targetBudget)} บาท</h3>
        </div>
        <Link href="/projects" className="text-xs font-bold text-white/45 transition-colors hover:text-white">
          ดูทั้งหมด
        </Link>
      </div>

      <div className="grid gap-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={projectUrl(project.slug)}
            className="group flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/6 px-4 py-3 transition-colors hover:border-[#e53935]/40 hover:bg-white/10"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white group-hover:text-[#e53935] transition-colors">
                {project.name}
              </p>
              <p className="mt-1 truncate text-xs text-white/40">
                {project.bts || project.location || 'ASAKAN Residence'}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">เริ่มต้น</p>
              <p className="text-sm font-black text-[#e53935]">{formatBaht(Number(project.priceMin))}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
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
