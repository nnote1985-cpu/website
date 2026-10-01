'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Script from 'next/script';
import LuxeDatePicker from '@/components/projects/LuxeDatePicker';

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

const THEMES = {
  light: {
    label: 'block mb-1.5 text-xs font-medium text-slate-600',
    input: 'w-full h-11 bg-slate-50 border border-slate-200 px-3.5 rounded-lg outline-none text-sm text-[#1a2d6b] placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-[#1a2d6b] focus:ring-2 focus:ring-[#1a2d6b]/15 transition-colors',
    muted: 'text-slate-400',
    consent: 'text-slate-500',
    link: 'text-[#1a2d6b] hover:text-[#e53935]',
    checkbox: 'accent-[#e53935]',
    button: 'bg-[#e53935] text-white hover:bg-[#b71c1c] shadow-[0_10px_24px_rgba(229,57,53,0.28)]',
    title: 'text-slate-900',
    body: 'text-slate-500',
  },
  luxe: {
    label: 'block mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75',
    input: 'w-full h-10 bg-transparent border-0 border-b border-white/20 px-0 rounded-none outline-none text-base text-white placeholder:text-white/50 [color-scheme:dark] hover:border-white/35 focus:border-[#C2A363] transition-colors',
    muted: 'normal-case tracking-normal text-white/55',
    consent: 'text-white/75',
    link: 'text-[#C2A363] hover:text-[#E3CC98]',
    checkbox: 'accent-[#C2A363]',
    button: 'bg-gradient-to-r from-[#A88A4E] via-[#D9BE85] to-[#A88A4E] bg-[length:200%_100%] bg-left hover:bg-right text-[#0b1630] shadow-[0_8px_28px_rgba(194,163,99,0.35)] duration-500 disabled:!opacity-80',
    title: 'text-white',
    body: 'text-white/60',
  },
} as const;


interface Props {
  projectName: string;
  projectSlug?: string;
  variant?: keyof typeof THEMES;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function RegisterForm({ projectName, projectSlug, variant = 'light' }: Props) {
  const t = THEMES[variant];
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [consented, setConsented] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

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
    if (!name || !phone || !consented) return;

    setLoading(true);
    setError('');

    try {
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
          project: projectSlug || projectName,
          appointmentDate: appointmentDate || undefined,
          recaptchaToken,
        }),
      });

      setLoading(false);

      if (res.ok) {
        const resData = await res.json();
        setSuccess(true);
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
        setError(data.error || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    } catch {
      setLoading(false);
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className={`text-xl font-bold ${t.title}`}>ลงทะเบียนสำเร็จ!</h3>
        <p className={`text-sm ${t.body}`}>ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
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
    <>
      {SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
          strategy="lazyOnload"
        />
      )}
      <form onSubmit={handleSubmit} className="relative z-10 grid grid-cols-2 gap-x-3 gap-y-3.5">
        <div className="col-span-2">
          <label htmlFor="reg-name" className={t.label}>ชื่อ-นามสกุล</label>
          <input
            id="reg-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFirstInteraction}
            placeholder="กรุณากรอกชื่อ-นามสกุล"
            className={t.input}
            required
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="reg-phone" className={t.label}>เบอร์โทรศัพท์</label>
          <input
            id="reg-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="08X-XXX-XXXX"
            maxLength={12}
            className={t.input}
            required
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="reg-email" className={t.label}>
            อีเมล <span className={`font-normal ${t.muted}`}>(ไม่บังคับ)</span>
          </label>
          <input
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className={t.input}
          />
        </div>

        <div className="col-span-2">
          <label htmlFor="reg-date" className={t.label}>
            วันที่นัดหมายเข้าชม <span className={`font-normal ${t.muted}`}>(ไม่บังคับ)</span>
          </label>
          {variant === 'luxe' ? (
            <LuxeDatePicker id="reg-date" value={appointmentDate} min={today} onChange={setAppointmentDate} className={t.input} />
          ) : (
            <input
              id="reg-date"
              type="date"
              value={appointmentDate}
              min={today}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className={t.input}
            />
          )}
        </div>

        {error && <p className="col-span-2 text-red-500 text-sm">{error}</p>}

        {/* Consent */}
        <label className="col-span-2 flex items-start gap-2.5 cursor-pointer pt-0.5">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            className={`mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer ${t.checkbox}`}
            required
          />
          <span className={`text-xs leading-relaxed ${t.consent}`}>
            ยืนยันและยอมรับเงื่อนไขในการลงทะเบียน{' '}
            <a
              href="/policy"
              target="_blank"
              rel="noopener noreferrer"
              className={`underline transition-colors ${t.link}`}
              onClick={(e) => e.stopPropagation()}
            >
              ดูนโยบายความเป็นส่วนตัว
            </a>
          </span>
        </label>

        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading || !consented}
            className={`group w-full min-h-[48px] font-bold rounded-lg text-[15px] tracking-[0.08em] uppercase transition-all duration-200 ${t.button} flex items-center justify-center gap-2.5 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none`}
          >
            {loading ? 'กำลังส่ง...' : 'Register Now'}
            {!loading && <Send size={16} className="transition-transform group-enabled:group-hover:translate-x-1" />}
          </button>
          {SITE_KEY && (
            <p className={`text-[10px] text-center mt-2 ${t.muted}`}>Protected by reCAPTCHA</p>
          )}
        </div>
      </form>
    </>
  );
}
