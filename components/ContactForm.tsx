'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
        // Fire Facebook Pixel lead event
        if (typeof window !== 'undefined' && typeof (window as Window & { fbq?: (...args: unknown[]) => void }).fbq === 'function') {
          (window as Window & { fbq: (...args: unknown[]) => void }).fbq('track', 'Lead');
        }
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-700 mb-2">ส่งข้อความสำเร็จ!</h3>
        <p className="text-green-600 text-sm mb-2">ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง</p>
        <p className="text-green-500 text-xs">ขอบคุณที่ไว้วางใจ ASAKAN</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-[#f4511e] font-semibold text-sm hover:underline"
        >
          ส่งข้อความอีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            ชื่อ-นามสกุล <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f4511e] focus:border-transparent"
            placeholder="ชื่อของคุณ"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            เบอร์โทรศัพท์ <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f4511e] focus:border-transparent"
            placeholder="08X-XXX-XXXX"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">อีเมล</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f4511e] focus:border-transparent"
          placeholder="email@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          สนใจโครงการ / ข้อความ
        </label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f4511e] focus:border-transparent resize-none"
          placeholder="บอกเราว่าคุณสนใจโครงการไหน หรือมีคำถามอะไร..."
        />
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 bg-[#f4511e] text-white font-bold py-4 rounded-xl hover:bg-[#d43e0e] disabled:opacity-60 text-base transition-colors"
      >
        {status === 'loading' ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            กำลังส่ง...
          </>
        ) : (
          <>
            <Send size={18} />
            ส่งข้อความ
          </>
        )}
      </button>
      <p className="text-xs text-gray-400 text-center">
        ข้อมูลของคุณจะถูกเก็บเป็นความลับ ไม่มีการแชร์ให้บุคคลที่สาม
      </p>
    </form>
  );
}
