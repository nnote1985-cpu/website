'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface Props {
  projectName: string;
  accentColor?: string;
}

export default function RegisterFormDark({ projectName, accentColor = '#e53935' }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    setError('');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, message: '', project: projectName }),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
    } else {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่');
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white">ลงทะเบียนสำเร็จ!</h3>
        <p className="text-white/60 text-sm">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
        <button
          onClick={() => { setSuccess(false); setName(''); setPhone(''); setEmail(''); }}
          className="text-xs text-white/30 underline hover:text-white/60 transition-colors"
        >
          ลงทะเบียนอีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
      <div className="group relative border-b border-white/20 pb-2 focus-within:border-white/60 transition-all">
        <label className="text-[9px] md:text-[10px] font-black uppercase text-white/30 ml-1 tracking-widest">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="กรุณากรอกชื่อ-นามสกุล"
          className="w-full bg-transparent p-1 outline-none text-white placeholder:text-white/20 text-base md:text-lg font-medium"
          required
        />
      </div>

      <div className="group relative border-b border-white/20 pb-2 focus-within:border-white/60 transition-all">
        <label className="text-[9px] md:text-[10px] font-black uppercase text-white/30 ml-1 tracking-widest">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="08X-XXX-XXXX"
          className="w-full bg-transparent p-1 outline-none text-white placeholder:text-white/20 text-base md:text-lg font-medium"
          required
        />
      </div>

      <div className="group relative border-b border-white/20 pb-2 focus-within:border-white/60 transition-all">
        <label className="text-[9px] md:text-[10px] font-black uppercase text-white/30 ml-1 tracking-widest">Email (Optional)</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="w-full bg-transparent p-1 outline-none text-white placeholder:text-white/20 text-base md:text-lg font-medium"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="pt-2 md:pt-4">
        <button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: accentColor }}
          className="group w-full text-white font-black py-4 md:py-5 rounded-2xl text-lg hover:opacity-90 transition-all duration-500 flex items-center justify-center gap-4 active:scale-95 disabled:opacity-60"
        >
          {loading ? 'กำลังส่ง...' : 'REGISTER NOW'}
          {!loading && <Send size={18} className="group-hover:translate-x-2 transition-transform" />}
        </button>
      </div>
    </form>
  );
}
