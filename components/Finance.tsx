'use client';
import { useState } from 'react';
import { monthlyPayment, affordableLoan } from '@/lib/finance.mjs';
import { projects, contact } from '@/lib/content';
import { Arrow } from './Icon';

export default function Finance() {
  const [mode, setMode] = useState<'monthly' | 'budget'>('monthly');
  const [amount, setAmount] = useState(2200000);
  const [income, setIncome] = useState(40000);
  const [years, setYears] = useState(30);
  const [rate, setRate] = useState(4);
  const monthly = monthlyPayment(amount, rate, years);
  const budget = affordableLoan(income, rate, years);
  const format = (n: number) => Math.round(n).toLocaleString('th-TH');
  const matches = projects.filter(p => p.status === 'active' && p.price <= (mode === 'monthly' ? amount : budget));
  return <section className="finance section-pad" id="finance" aria-labelledby="finance-title">
    <div className="finance-intro" data-reveal><span className="index-label">04 / YOUR NEXT CHAPTER</span><h2 id="finance-title">ใกล้คำว่า<br/><em>บ้านของคุณ</em><br/>อีกนิด</h2><p>เริ่มวางแผนจากตัวเลขที่สบายใจ<br/>ลองคำนวณเบื้องต้น แล้วคุยกับเราได้เสมอ</p><a href={contact.lineUrl} target="_blank" rel="noopener noreferrer" className="text-link">ปรึกษาเรื่องการซื้อ <Arrow diagonal /></a></div>
    <div className="finance-panel"><div className="finance-modes" role="group" aria-label="เลือกวิธีคำนวณ"><button aria-pressed={mode === 'monthly'} onClick={() => setMode('monthly')}>คำนวณค่างวด</button><button aria-pressed={mode === 'budget'} onClick={() => setMode('budget')}>ประเมินกำลังซื้อ</button></div>
      <div className="finance-fields">
        <label className="range-label" htmlFor="finance-amount"><span>{mode === 'monthly' ? 'วงเงินกู้ที่ต้องการ' : 'รายได้ต่อเดือน'}</span><strong>{format(mode === 'monthly' ? amount : income)} <small>บาท</small></strong></label>
        <input id="finance-amount" type="range" min={mode === 'monthly' ? 500000 : 10000} max={mode === 'monthly' ? 10000000 : 200000} step={mode === 'monthly' ? 50000 : 1000} value={mode === 'monthly' ? amount : income} onChange={e => mode === 'monthly' ? setAmount(Number(e.target.value)) : setIncome(Number(e.target.value))} aria-valuetext={`${format(mode === 'monthly' ? amount : income)} บาท`}/>
        <div className="range-limits"><span>{mode === 'monthly' ? '500,000' : '10,000'}</span><span>{mode === 'monthly' ? '10,000,000' : '200,000'} บาท</span></div>
        <div className="finance-selects"><label>ระยะเวลากู้<select aria-label="ระยะเวลากู้" value={years} onChange={e => setYears(Number(e.target.value))}>{[10,15,20,25,30,35,40].map(y => <option key={y} value={y}>{y} ปี</option>)}</select></label><label>ดอกเบี้ยต่อปี<select aria-label="ดอกเบี้ยต่อปี" value={rate} onChange={e => setRate(Number(e.target.value))}>{[0,1,2,3,4,5,6,7,8].map(r => <option key={r} value={r}>{r.toFixed(1)} %</option>)}</select></label></div>
      </div>
      <div className="finance-result" aria-live="polite" aria-atomic="true"><span>{mode === 'monthly' ? 'ค่างวดประมาณ' : 'วงเงินกู้ประมาณ'}</span><strong>{format(mode === 'monthly' ? monthly : budget)}<small>{mode === 'monthly' ? 'บาท / เดือน' : 'บาท'}</small></strong></div>
      <div className="finance-matches"><span>โครงการในงบประมาณนี้</span>{matches.length ? matches.map(p => <a key={p.href} href={p.href}>{p.name} {p.title}<Arrow diagonal /></a>) : <p>ปรึกษาทีมงานเพื่อช่วยหาแผนที่เหมาะกับคุณ</p>}</div>
      <p className="finance-note">ผลคำนวณเป็นเพียงการประมาณ ไม่ใช่ข้อเสนอสินเชื่อหรือการรับรองผลอนุมัติ ใช้อัตราดอกเบี้ยคงที่ตลอดระยะเวลาที่เลือก และสัดส่วนผ่อน 35% ของรายได้สำหรับประเมินกำลังซื้อ ยังไม่รวมภาระหนี้เดิม ค่าธรรมเนียม และประกัน</p>
    </div>
  </section>;
}
