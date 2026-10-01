'use client';

import { useState } from 'react';
import { ArrowRight, Check, CheckCircle, Lock } from 'lucide-react';
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

const labelClass = 'block text-[11px] font-semibold tracking-[0.04em] text-white/65 transition-colors group-focus-within:text-white';
const inputClass = 'w-full h-8 bg-transparent outline-none text-base text-white placeholder:text-white/50';

// One numbered step: the badge lights up in the accent colour on focus and shows a tick once the field is filled.
function Step({ n, filled, last, accent, onAccent, children }: {
  n: number; filled: boolean; last?: boolean; accent: string; onAccent: string; children: React.ReactNode;
}) {
  return (
    <div className="group flex gap-4">
      <div className="flex flex-col items-center">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold tabular-nums transition-all duration-300 ${
            filled ? 'border-transparent scale-100' : 'border-white/20 text-white/50 group-focus-within:border-[var(--accent)] group-focus-within:text-[var(--accent)]'
          }`}
          style={filled ? { backgroundColor: accent, color: onAccent } : undefined}
        >
          {filled ? <Check size={13} strokeWidth={3} /> : String(n).padStart(2, '0')}
        </span>
        {!last && (
          <span className="mt-1 w-px flex-1 transition-colors duration-300" style={{ backgroundColor: filled ? accent : 'rgba(255,255,255,0.1)' }} />
        )}
      </div>
      <div className="mb-[clamp(8px,2vh,20px)] flex-1 border-b border-white/15 pb-0.5 transition-colors group-focus-within:border-[var(--accent)]">
        {children}
      </div>
    </div>
  );
}

// Pick dark or white text for the accent colour so labels on it stay readable (e.g. white on red, dark on gold).
function textOn(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.3 ? '#141418' : '#ffffff';
}

interface Props {
  projectName: string;
  projectSlug?: string;
  accentColor?: string;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function RegisterFormDark({ projectName, projectSlug, accentColor = '#e53935' }: Props) {
  const onAccent = textOn(accentColor);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [consented, setConsented] = useState(false);
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
    if (!name || !phone || !consented) return;

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
          project: projectSlug || projectName,
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
          className="text-xs text-white/50 underline hover:text-white/80 transition-colors"
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
      <form
        onSubmit={handleSubmit}
        className="space-y-0"
        style={{ '--accent': accentColor } as React.CSSProperties}
      >
        <Step n={1} filled={!!name.trim()} accent={accentColor} onAccent={onAccent}>
          <label htmlFor="regd-name" className={labelClass}>ชื่อ-นามสกุล</label>
          <input
            id="regd-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFirstInteraction}
            placeholder="กรุณากรอกชื่อ-นามสกุล"
            className={inputClass}
            required
          />
        </Step>

        <Step n={2} filled={phone.replace(/\D/g, '').length >= 9} accent={accentColor} onAccent={onAccent}>
          <label htmlFor="regd-phone" className={labelClass}>เบอร์โทรศัพท์</label>
          <input
            id="regd-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="08X-XXX-XXXX"
            maxLength={12}
            className={inputClass}
            required
          />
        </Step>

        <Step n={3} filled={!!email.trim()} accent={accentColor} onAccent={onAccent}>
          <label htmlFor="regd-email" className={labelClass}>
            อีเมล <span className="font-normal text-white/40">(ไม่บังคับ)</span>
          </label>
          <input
            id="regd-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className={inputClass}
          />
        </Step>

        <Step n={4} filled={!!appointmentDate} last accent={accentColor} onAccent={onAccent}>
          <label htmlFor="regd-date" className={labelClass}>
            วันที่นัดหมายเข้าชม <span className="font-normal text-white/40">(ไม่บังคับ)</span>
          </label>
          <LuxeDatePicker
            id="regd-date"
            value={appointmentDate}
            min={today}
            onChange={setAppointmentDate}
            className={inputClass}
            accent={accentColor}
            onAccent={onAccent}
            panel="rgba(20,20,24,0.97)"
          />
        </Step>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Consent */}
        <label className="flex items-start gap-3 cursor-pointer pt-[clamp(2px,1vh,12px)] pl-11">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            style={{ accentColor }}
            className="mt-0.5 w-4 h-4 flex-shrink-0 cursor-pointer"
            required
          />
          <span className="text-white/70 text-xs leading-relaxed">
            ยืนยันและยอมรับเงื่อนไขในการลงทะเบียน{' '}
            <a
              href="/policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white hover:text-[var(--accent)] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              ดูนโยบายความเป็นส่วนตัว
            </a>
          </span>
        </label>

        <div className="pt-[clamp(10px,2.4vh,24px)]">
          <button
            type="submit"
            disabled={loading || !consented}
            style={{ backgroundColor: accentColor, color: onAccent, boxShadow: `0 16px 36px -14px ${accentColor}` }}
            className="group flex h-14 w-full items-center justify-between rounded-full pl-7 pr-2 text-base font-bold tracking-[0.02em] transition-all duration-300 hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-75 disabled:!shadow-none"
          >
            <span>{loading ? 'กำลังส่ง...' : 'ลงทะเบียนรับสิทธิพิเศษ'}</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/15 transition-transform duration-300 group-enabled:group-hover:-rotate-45">
              <ArrowRight size={18} />
            </span>
          </button>
          {/* One quiet line for trust + the reCAPTCHA notice (the badge itself is hidden in globals.css). */}
          <p className="mt-2.5 flex flex-wrap items-center justify-center gap-x-1.5 text-[10.5px] leading-snug text-white/50">
            <Lock size={10} />
            <span>ข้อมูลปลอดภัย · ติดต่อกลับภายใน 24 ชม.</span>
            {SITE_KEY && <span>· Protected by reCAPTCHA</span>}
          </p>
        </div>
      </form>
    </>
  );
}
