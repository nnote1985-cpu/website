'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface Props {
  projectName: string;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function RegisterForm({ projectName }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    setError('');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, message: '', project: projectName, appointmentDate: appointmentDate || undefined }),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
    } else {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">ลงทะเบียนสำเร็จ!</h3>
        <p className="text-slate-500 text-sm">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
        <button
          onClick={() => { setSuccess(false); setName(''); setPhone(''); setEmail(''); setAppointmentDate(''); }}
          className="text-xs text-slate-400 underline hover:text-slate-600 transition-colors"
        >
          ลงทะเบียนอีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest pl-1">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="กรุณากรอกชื่อ-นามสกุล"
          className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl outline-none text-slate-800 placeholder:text-slate-400 focus:border-[#e53935] focus:bg-white focus:ring-4 focus:ring-[#e53935]/10 transition-all text-sm font-medium shadow-inner"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest pl-1">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          placeholder="08X-XXX-XXXX"
          maxLength={12}
          className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl outline-none text-slate-800 placeholder:text-slate-400 focus:border-[#e53935] focus:bg-white focus:ring-4 focus:ring-[#e53935]/10 transition-all text-sm font-medium shadow-inner"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest pl-1">Email Address (Optional)</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl outline-none text-slate-800 placeholder:text-slate-400 focus:border-[#e53935] focus:bg-white focus:ring-4 focus:ring-[#e53935]/10 transition-all text-sm font-medium shadow-inner"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-bold uppercase text-slate-500 tracking-widest pl-1">
          วันที่นัดหมายเข้าชม <span className="normal-case font-normal text-slate-400">(Optional)</span>
        </label>
        <input
          type="date"
          value={appointmentDate}
          min={today}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl outline-none text-slate-800 focus:border-[#e53935] focus:bg-white focus:ring-4 focus:ring-[#e53935]/10 transition-all text-sm font-medium shadow-inner"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="group w-full bg-[#e53935] text-white font-black py-4 rounded-xl text-lg transition-all duration-300 hover:bg-[#b71c1c] shadow-[0_10px_20px_rgba(211,47,47,0.2)] flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? 'กำลังส่ง...' : 'REGISTER NOW'}
          {!loading && <Send size={18} className="group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform" />}
        </button>
      </div>
    </form>
  );
}
