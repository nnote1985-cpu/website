'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Script from 'next/script';

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

interface Props {
  projectName: string;
  accentColor?: string;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function RegisterFormDark({ projectName, accentColor = '#e53935' }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  // ยิง ViewContent เมื่อ user interact กับ form (focus)
  const handleFirstInteraction = () => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', {
        content_name: projectName,
        content_type: 'product',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    setError('');

    try {
      // ขอ reCAPTCHA token
      let recaptchaToken = '';
      if (SITE_KEY && typeof window.grecaptcha !== 'undefined') {
        recaptchaToken = await new Promise<string>((resolve) => {
          window.grecaptcha.ready(async () => {
            const token = await window.grecaptcha.execute(SITE_KEY, { action: 'register' });
            resolve(token);
          });
        });
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, phone, email,
          message: '',
          project: projectName,
          appointmentDate: appointmentDate || undefined,
          recaptchaToken,
        }),
      });

      setLoading(false);

      if (res.ok) {
        const resData = await res.json();
        setSuccess(true);
        // ยิง Lead event พร้อม event_id เดียวกับ CAPI เพื่อ dedup
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead', {
            content_name: projectName,
            content_type: 'product',
          }, {
            eventID: resData.eventId,
          });
        }
      } else {
        const data = await res.json();
        setError(data.error || 'เกิดข้อผิดพลาด กรุณาลองใหม่');
      }
    } catch {
      setLoading(false);
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
          onClick={() => { setSuccess(false); setName(''); setPhone(''); setEmail(''); setAppointmentDate(''); }}
          className="text-xs text-white/30 underline hover:text-white/60 transition-colors"
        >
          ลงทะเบียนอีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <>
      {SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
          strategy="lazyOnload"
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        <div className="group relative border-b border-white/20 pb-2 focus-within:border-white/60 transition-all">
          <label className="text-[9px] md:text-[10px] font-black uppercase text-white/30 ml-1 tracking-widest">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFirstInteraction}
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
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="08X-XXX-XXXX"
            maxLength={12}
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

        <div className="group relative border-b border-white/20 pb-2 focus-within:border-white/60 transition-all">
          <label className="text-[9px] md:text-[10px] font-black uppercase text-white/30 ml-1 tracking-widest">
            วันที่นัดหมายเข้าชม (Optional)
          </label>
          <input
            type="date"
            value={appointmentDate}
            min={today}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="w-full bg-transparent p-1 outline-none text-white text-base md:text-lg font-medium [color-scheme:dark]"
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
          {SITE_KEY && (
            <p className="text-white/20 text-[10px] text-center mt-2">
              Protected by reCAPTCHA
            </p>
          )}
        </div>
      </form>
    </>
  );
}
