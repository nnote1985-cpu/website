'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowRight, Calculator, Minus, Phone, Plus } from 'lucide-react';
import { projectUrl } from '@/lib/projectUrl';
import styles from './MortgageCalculator.module.css';
import YearPicker from '@/components/YearPicker';

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
  const [maxInterest, setMaxInterest] = useState(4.5);
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

  const inputCls = styles.input;
  const labelCls = styles.label;

  function sliderStyle(pct: number) {
    return getSliderStyle(pct);
  }

  return (
    <section className={styles.section} aria-labelledby="mortgage-title">
      <div className={styles.container}>
        <div className={styles.heading}>
          <div>
            <h2 id="mortgage-title">วางแผนวันนี้<br />ให้บ้านที่ใช่ใกล้ขึ้น</h2>
          </div>
          <p>คำนวณสินเชื่อบ้านเบื้องต้น<br />ลองปรับวงเงินและระยะเวลา เพื่อหายอดผ่อนที่เหมาะกับคุณ</p>
        </div>

        <div className={styles.calculator}>
        <div className={styles.modes} role="group" aria-label="รูปแบบการคำนวณ">
          <button
            type="button"
            aria-pressed={mode === 'monthly'}
            onClick={() => {
              setMode('monthly');
              setShowRecommendations(false);
            }}
            className={styles.mode}
          >
            <Calculator size={14} className="inline mr-1.5 -mt-0.5" />
            คำนวณผ่อนต่อเดือน
          </button>
          <button
            type="button"
            aria-pressed={mode === 'maxloan'}
            onClick={() => {
              setMode('maxloan');
              setShowRecommendations(false);
            }}
            className={styles.mode}
          >
            กู้ได้สูงสุดเท่าไหร่?
          </button>
        </div>

        <div className={styles.grid}>
          {mode === 'monthly' ? (
            <>
              <div>
                <label htmlFor="mortgage-amount" className={labelCls}>วงเงินกู้ (บาท)</label>
                <StepperNumberInput
                  id="mortgage-amount"
                  value={loanAmount}
                  min={500000}
                  max={10000000}
                  step={100000}
                  inputClassName={inputCls}
                  onChange={(value) => {
                    setLoanAmount(value);
                    setShowRecommendations(false);
                  }}
                />
                <input
                  aria-label="ปรับวงเงินกู้"
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
                  className={styles.slider}
                  style={sliderStyle(loanPct)}
                />
                <div className={styles.rangeLabels}>
                  <span>500,000</span><span>10,000,000</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mortgage-interest" className={labelCls}>ดอกเบี้ย (% ต่อปี)</label>
                  <StepperNumberInput
                    id="mortgage-interest"
                    value={interest}
                    min={0}
                    max={15}
                    step={0.1}
                    inputClassName={inputCls}
                    onChange={setInterest}
                  />
                </div>
                <div>
                  <label htmlFor="mortgage-years" className={labelCls}>ระยะเวลา (ปี)</label>
                  <YearPicker id="mortgage-years" value={years} onChange={setYears} className={`${inputCls} ${styles.yearTrigger}`} />
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
                <label htmlFor="mortgage-income" className={labelCls}>รายได้ต่อเดือน (บาท)</label>
                <StepperNumberInput
                  id="mortgage-income"
                  value={monthlyIncome}
                  min={10000}
                  max={200000}
                  step={5000}
                  inputClassName={inputCls}
                  onChange={(value) => {
                    setMonthlyIncome(value);
                    setShowRecommendations(false);
                  }}
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
                <div className={styles.rangeLabels}><span>10,000</span><span>200,000</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mortgage-max-interest" className={labelCls}>ดอกเบี้ย (% ต่อปี)</label>
                  <StepperNumberInput
                    id="mortgage-max-interest"
                    value={maxInterest}
                    min={1}
                    max={15}
                    step={0.1}
                    inputClassName={inputCls}
                    onChange={setMaxInterest}
                  />
                </div>
                <div>
                  <label htmlFor="mortgage-max-years" className={labelCls}>ระยะเวลา (ปี)</label>
                  <YearPicker id="mortgage-max-years" value={maxYears} onChange={setMaxYears} className={`${inputCls} ${styles.yearTrigger}`} />
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

          <p className={styles.disclaimer}>
            * ผลการคำนวณเป็นเพียงการประมาณการ ขึ้นอยู่กับเงื่อนไขของธนาคาร
          </p>
        </div>
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
    <div className={styles.result}>
      <p className={styles.resultLabel}>{label}</p>
      <p className={styles.resultValue} aria-live="polite" aria-atomic="true">
        {formatBaht(value)}
        <span>{unit}</span>
      </p>
      <p className={styles.resultDetail}>{detail}</p>

      <div className={styles.resultActions}>
        <Link
          href="/contact"
          className={styles.primaryAction}
        >
          <Phone size={16} />
          ติดต่อฝ่ายขาย
        </Link>
        <button
          type="button"
          onClick={onShowProjects}
          className={styles.secondaryAction}
        >
          ดูโครงการตามงบ
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

type StepperNumberInputProps = {
  id: string;
  value: number;
  min?: number;
  max?: number;
  step: number;
  inputClassName: string;
  onChange: (value: number) => void;
};

function clampValue(value: number, min?: number, max?: number) {
  if (typeof min === 'number' && value < min) return min;
  if (typeof max === 'number' && value > max) return max;
  return value;
}

function StepperNumberInput({ id, value, min, max, step, inputClassName, onChange }: StepperNumberInputProps) {
  function update(nextValue: number) {
    const precision = step.toString().split('.')[1]?.length || 0;
    const rounded = Number(nextValue.toFixed(precision));
    onChange(clampValue(rounded, min, max));
  }

  return (
    <div className="relative">
      <input
        id={id}
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => {
          const nextValue = Number(e.target.value);
          if (!Number.isNaN(nextValue)) onChange(clampValue(nextValue, min, max));
        }}
        className={`${inputClassName} number-field-input`}
      />
      <div className={styles.stepper}>
        <button
          type="button"
          onClick={() => update(value - step)}
          disabled={min !== undefined && value <= min}
          aria-label="ลดค่า"
        >
          <Minus size={13} strokeWidth={2.4} />
        </button>
        <button
          type="button"
          onClick={() => update(value + step)}
          disabled={max !== undefined && value >= max}
          aria-label="เพิ่มค่า"
        >
          <Plus size={13} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}

function RecommendedProjects({ projects, targetBudget }: { projects: CalculatorProject[]; targetBudget: number }) {
  if (projects.length === 0) {
    return (
      <div className={styles.recommendations}>
        <p className="text-sm font-bold text-[#1a2d6b]">ยังไม่มีโครงการที่ตรงกับงบนี้</p>
        <p className="mt-1 text-xs text-slate-600">ฝ่ายขายช่วยแนะนำตัวเลือกที่เหมาะกับคุณได้</p>
      </div>
    );
  }

  return (
    <div className={styles.recommendations}>
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>

          <h3 className="text-lg font-bold text-[#1a2d6b]">โครงการแนะนำตามงบ {formatBaht(targetBudget)} บาท</h3>
        </div>
        <Link href="/projects" className="text-xs font-bold text-[#1a2d6b] underline underline-offset-4">
          ดูทั้งหมด
        </Link>
      </div>

      <div className="grid gap-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={projectUrl(project.slug)}
            className={styles.projectLink}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#1a2d6b] group-hover:text-[#e53935] transition-colors">
                {project.name}
              </p>
              <p className="mt-1 truncate text-xs text-slate-600">
                {project.bts || project.location || 'ASAKAN Residence'}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-slate-600">เริ่มต้น</p>
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
      aria-label="ปรับรายได้ต่อเดือน"
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onInput={(e) => onChange(+(e.target as HTMLInputElement).value)}
      onChange={(e) => onChange(+e.target.value)}
      className={styles.slider}
      style={getSliderStyle(pct)}
    />
  );
}
