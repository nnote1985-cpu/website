'use client';

import { useState, useEffect } from 'react';
import { Save, CheckCircle, Lock, Eye, EyeOff } from 'lucide-react';

interface Settings {
  siteName: string;
  siteTagline: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroCTA: string;
  phone: string[];
  email: string;
  address: string;
  facebook: string;
  line: string;
  facebookPixelId: string;
  googleAnalyticsId: string;
  metaKeywords: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'hero' | 'contact' | 'seo' | 'tracking' | 'security'>('hero');

  // Password change state
  const [pw, setPw] = useState({ current: '', new: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/settings').then((r) => r.json()).then(setSettings);
  }, []);

  async function handleSave() {
    if (!settings) return;
    setSaving(true); setError('');
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
      else setError('บันทึกไม่สำเร็จ กรุณาลองใหม่');
    } catch { setError('เกิดข้อผิดพลาด'); }
    finally { setSaving(false); }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);
    if (pw.new !== pw.confirm) { setPwMsg({ type: 'error', text: 'รหัสผ่านใหม่ไม่ตรงกัน' }); return; }
    if (pw.new.length < 6) { setPwMsg({ type: 'error', text: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }); return; }
    setPwSaving(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: pw.current, newPassword: pw.new }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwMsg({ type: 'success', text: 'เปลี่ยนรหัสผ่านสำเร็จ!' });
        setPw({ current: '', new: '', confirm: '' });
      } else {
        setPwMsg({ type: 'error', text: data.error || 'เกิดข้อผิดพลาด' });
      }
    } catch { setPwMsg({ type: 'error', text: 'เกิดข้อผิดพลาด กรุณาลองใหม่' }); }
    finally { setPwSaving(false); }
  }

  function update(key: keyof Settings, value: unknown) {
    setSettings((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  const TABS = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'contact', label: 'ข้อมูลติดต่อ' },
    { id: 'seo', label: 'SEO' },
    { id: 'tracking', label: 'Tracking' },
    { id: 'security', label: 'ความปลอดภัย' },
  ] as const;

  const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f4511e] focus:border-transparent";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#f4511e] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">ตั้งค่าเว็บไซต์</h1>
          <p className="text-gray-500 text-sm mt-1">แก้ไขเนื้อหาและการตั้งค่าทั่วไป</p>
        </div>
        {activeTab !== 'security' && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#f4511e] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#d43e0e] disabled:opacity-60 text-sm"
          >
            {saved ? <CheckCircle size={16} /> : <Save size={16} />}
            {saved ? 'บันทึกแล้ว!' : saving ? 'กำลังบันทึก...' : 'บันทึก'}
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">{error}</div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-max py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id ? 'bg-white shadow text-[#f4511e]' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        {activeTab === 'hero' && (
          <>
            <h2 className="font-bold text-gray-700 border-b pb-3">Hero Section (หน้าแรก)</h2>
            <div>
              <label className={labelClass}>หัวข้อหลัก (Hero Title)</label>
              <input type="text" value={settings.heroTitle} onChange={(e) => update('heroTitle', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>คำบรรยายรอง (Subtitle)</label>
              <input type="text" value={settings.heroSubtitle} onChange={(e) => update('heroSubtitle', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>คำอธิบาย Hero</label>
              <textarea rows={3} value={settings.heroDescription} onChange={(e) => update('heroDescription', e.target.value)} className={inputClass + ' resize-none'} />
            </div>
            <div>
              <label className={labelClass}>ข้อความปุ่ม CTA</label>
              <input type="text" value={settings.heroCTA} onChange={(e) => update('heroCTA', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>ชื่อเว็บไซต์ (Site Name)</label>
              <input type="text" value={settings.siteName} onChange={(e) => update('siteName', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Tagline</label>
              <input type="text" value={settings.siteTagline} onChange={(e) => update('siteTagline', e.target.value)} className={inputClass} />
            </div>
          </>
        )}

        {activeTab === 'contact' && (
          <>
            <h2 className="font-bold text-gray-700 border-b pb-3">ข้อมูลติดต่อ</h2>
            <div>
              <label className={labelClass}>หมายเลขโทรศัพท์ (คั่นด้วย ,)</label>
              <input
                type="text"
                value={Array.isArray(settings.phone) ? settings.phone.join(', ') : settings.phone}
                onChange={(e) => update('phone', e.target.value.split(',').map((s) => s.trim()))}
                className={inputClass}
                placeholder="082-526-5566, 02-059-9655"
              />
            </div>
            <div>
              <label className={labelClass}>อีเมล</label>
              <input type="email" value={settings.email} onChange={(e) => update('email', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>ที่อยู่</label>
              <textarea rows={2} value={settings.address} onChange={(e) => update('address', e.target.value)} className={inputClass + ' resize-none'} />
            </div>
            <div>
              <label className={labelClass}>Facebook URL</label>
              <input type="url" value={settings.facebook} onChange={(e) => update('facebook', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>LINE ID</label>
              <input type="text" value={settings.line} onChange={(e) => update('line', e.target.value)} className={inputClass} placeholder="@asakan" />
            </div>
          </>
        )}

        {activeTab === 'seo' && (
          <>
            <h2 className="font-bold text-gray-700 border-b pb-3">SEO Settings</h2>
            <div>
              <label className={labelClass}>Site Description (Meta Description)</label>
              <textarea rows={3} value={settings.siteDescription} onChange={(e) => update('siteDescription', e.target.value)} className={inputClass + ' resize-none'} />
              <p className="text-xs text-gray-400 mt-1">
                แนะนำ 150–160 ตัวอักษร (ปัจจุบัน: {settings.siteDescription?.length || 0} ตัวอักษร)
                <span className={`ml-2 font-semibold ${(settings.siteDescription?.length || 0) > 160 ? 'text-red-500' : 'text-green-500'}`}>
                  {(settings.siteDescription?.length || 0) > 160 ? '⚠ ยาวเกินไป' : '✓ ดี'}
                </span>
              </p>
            </div>
            <div>
              <label className={labelClass}>Keywords (คั่นด้วย ,)</label>
              <textarea rows={2} value={settings.metaKeywords} onChange={(e) => update('metaKeywords', e.target.value)} className={inputClass + ' resize-none'} />
              <p className="text-xs text-gray-400 mt-1">ตัวอย่าง: คอนโด, ASAKAN, รามคำแหง, กรุงเทพ</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
              <strong>SEO Tips:</strong> ใช้ keywords ที่ลูกค้าค้นหา เช่น "คอนโดราคาถูกกรุงเทพ" หรือ "คอนโดใกล้ BTS พหลโยธิน"
            </div>
          </>
        )}

        {activeTab === 'tracking' && (
          <>
            <h2 className="font-bold text-gray-700 border-b pb-3">Tracking & Analytics</h2>
            <div>
              <label className={labelClass}>
                Facebook Pixel ID
                <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-normal">Active</span>
              </label>
              <input
                type="text"
                value={settings.facebookPixelId || ''}
                onChange={(e) => update('facebookPixelId', e.target.value)}
                className={inputClass}
                placeholder="xxxxxxxxxxxxxxxx"
              />
              <p className="text-xs text-gray-400 mt-1">
                หา Pixel ID ได้จาก{' '}
                <a href="https://business.facebook.com/events_manager" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Facebook Events Manager →
                </a>
              </p>
            </div>
            <div>
              <label className={labelClass}>Google Analytics Measurement ID</label>
              <input
                type="text"
                value={settings.googleAnalyticsId || ''}
                onChange={(e) => update('googleAnalyticsId', e.target.value)}
                className={inputClass}
                placeholder="G-XXXXXXXXXX"
              />
              <p className="text-xs text-gray-400 mt-1">
                หา Measurement ID ได้จาก Google Analytics → Admin → Data Streams
              </p>
            </div>
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-green-700">
              <strong>Events ที่ติดตามอัตโนมัติ:</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside text-green-600">
                <li>PageView — ทุกครั้งที่มีคนเข้าชมหน้า</li>
                <li>Lead — เมื่อมีคนส่งแบบฟอร์มติดต่อ</li>
                <li>ViewContent — เมื่อดูรายละเอียดโครงการ (ตั้งค่าใน project detail page)</li>
              </ul>
            </div>
          </>
        )}

        {activeTab === 'security' && (
          <>
            <h2 className="font-bold text-gray-700 border-b pb-3 flex items-center gap-2">
              <Lock size={18} /> เปลี่ยนรหัสผ่าน Admin
            </h2>
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
              <div>
                <label className={labelClass}>รหัสผ่านปัจจุบัน</label>
                <div className="relative">
                  <input
                    type={showPw ? 'text' : 'password'}
                    required
                    value={pw.current}
                    onChange={(e) => setPw({ ...pw, current: e.target.value })}
                    className={inputClass + ' pr-10'}
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className={labelClass}>รหัสผ่านใหม่</label>
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={pw.new}
                  onChange={(e) => setPw({ ...pw, new: e.target.value })}
                  className={inputClass}
                  placeholder="อย่างน้อย 6 ตัวอักษร"
                />
              </div>
              <div>
                <label className={labelClass}>ยืนยันรหัสผ่านใหม่</label>
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={pw.confirm}
                  onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
                  className={`${inputClass} ${pw.confirm && pw.new !== pw.confirm ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                  placeholder="ยืนยันรหัสผ่าน"
                />
                {pw.confirm && pw.new !== pw.confirm && (
                  <p className="text-red-500 text-xs mt-1">รหัสผ่านไม่ตรงกัน</p>
                )}
              </div>

              {pwMsg && (
                <div className={`px-4 py-3 rounded-xl text-sm border ${
                  pwMsg.type === 'success'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-red-50 text-red-600 border-red-100'
                }`}>
                  {pwMsg.type === 'success' && <CheckCircle size={14} className="inline mr-2" />}
                  {pwMsg.text}
                </div>
              )}

              <button
                type="submit"
                disabled={pwSaving || (!!pw.confirm && pw.new !== pw.confirm)}
                className="flex items-center gap-2 bg-[#1a2d6b] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0f1e4a] disabled:opacity-60 text-sm"
              >
                <Lock size={16} />
                {pwSaving ? 'กำลังบันทึก...' : 'เปลี่ยนรหัสผ่าน'}
              </button>
            </form>
          </>
        )}
      </div>

      {activeTab !== 'security' && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#f4511e] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#d43e0e] disabled:opacity-60"
          >
            {saved ? <CheckCircle size={18} /> : <Save size={18} />}
            {saved ? 'บันทึกแล้ว!' : saving ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
          </button>
        </div>
      )}
    </div>
  );
}
