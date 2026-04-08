'use client';

import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, ImageIcon, Loader2, CheckCircle2, Building2, Smartphone, Link as LinkIcon } from 'lucide-react';

interface Project {
  id: string;
  slug: string;
  name: string;
  status: string;
  image: string;
  hero_image?: string;
  promo_banner?: string;
  promo_banner_mobile?: string;
  popup_image?: string;
  popup_url?: string;
}

interface ProjectState {
  heroImage: string;
  promoBanner: string;
  promoBannerMobile: string;
  popupImage: string;
  popupUrl: string;
  saving: boolean;
  uploadingHero: boolean;
  uploadingPromo: boolean;
  uploadingPromoMobile: boolean;
  uploadingPopup: boolean;
  saved: boolean;
}

type ImageField = 'heroImage' | 'promoBanner' | 'promoBannerMobile' | 'popupImage';

const DB_KEY: Record<ImageField, string> = {
  heroImage: 'hero_image',
  promoBanner: 'promo_banner',
  promoBannerMobile: 'promo_banner_mobile',
  popupImage: 'popup_image',
};

const LOADING_KEY: Record<ImageField, keyof ProjectState> = {
  heroImage: 'uploadingHero',
  promoBanner: 'uploadingPromo',
  promoBannerMobile: 'uploadingPromoMobile',
  popupImage: 'uploadingPopup',
};

export default function AdminProjectHeroesPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState<Record<string, ProjectState>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data: Project[]) => {
        setProjects(data);
        const initial: Record<string, ProjectState> = {};
        data.forEach((p) => {
          initial[p.id] = {
            heroImage: p.hero_image || '',
            promoBanner: p.promo_banner || '',
            promoBannerMobile: p.promo_banner_mobile || '',
            popupImage: p.popup_image || '',
            popupUrl: p.popup_url || '',
            saving: false,
            uploadingHero: false,
            uploadingPromo: false,
            uploadingPromoMobile: false,
            uploadingPopup: false,
            saved: false,
          };
        });
        setStates(initial);
        setLoading(false);
      });
  }, []);

  function updateState(projectId: string, patch: Partial<ProjectState>) {
    setStates((prev) => ({ ...prev, [projectId]: { ...prev[projectId], ...patch } }));
  }

  async function uploadFile(file: File, projectId: string, field: ImageField) {
    if (!file.type.startsWith('image/')) { alert('ไฟล์ต้องเป็นรูปภาพเท่านั้น'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('ไฟล์ใหญ่เกิน 5MB'); return; }

    updateState(projectId, { [LOADING_KEY[field]]: true });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', 'hero-images');

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();

    if (!res.ok) {
      alert(`อัปโหลดไม่สำเร็จ: ${data.error}`);
      updateState(projectId, { [LOADING_KEY[field]]: false });
      return;
    }

    updateState(projectId, { [field]: data.url, [LOADING_KEY[field]]: false });
    await saveProject(projectId, { [DB_KEY[field]]: data.url });
  }

  async function clearImage(projectId: string, field: ImageField) {
    const url = states[projectId]?.[field];
    if (url && url.includes('/storage/v1/object/public/')) {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, bucket: 'hero-images' }),
      });
    }
    updateState(projectId, { [field]: '' });
    await saveProject(projectId, { [DB_KEY[field]]: '' });
  }

  async function savePopupUrl(projectId: string, url: string) {
    await saveProject(projectId, { popup_url: url });
  }

  async function saveProject(projectId: string, patch: Record<string, string>) {
    updateState(projectId, { saving: true, saved: false });
    await fetch(`/api/projects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    updateState(projectId, { saving: false, saved: true });
    setTimeout(() => updateState(projectId, { saved: false }), 2500);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-slate-300" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <ImageIcon className="text-[#f4511e]" size={24} />
          Hero Image แต่ละโครงการ
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          จัดการรูป Hero, Promo Banner และ Popup สำหรับแต่ละโครงการ
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project) => {
          const s = states[project.id];
          if (!s) return null;

          return (
            <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center text-[#f4511e]">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{project.name}</div>
                    <div className="text-gray-400 text-xs">/{project.slug}</div>
                  </div>
                </div>
                {s.saved && (
                  <div className="flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                    <CheckCircle2 size={15} /> บันทึกแล้ว
                  </div>
                )}
                {s.saving && (
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Loader2 size={14} className="animate-spin" /> กำลังบันทึก...
                  </div>
                )}
              </div>

              {/* Hero + Promo slots */}
              <div className={`grid grid-cols-1 gap-6 p-6 pb-4 ${project.status === 'sold-out' ? '' : 'md:grid-cols-3'}`}>
                <div className={project.status === 'sold-out' ? 'max-w-xs' : ''}>
                  <ImageSlot
                    label="Hero Image"
                    description="รูปพื้นหลังหลัก (แสดงพร้อมข้อความ)"
                    url={s.heroImage}
                    uploading={s.uploadingHero}
                    onUpload={(file) => uploadFile(file, project.id, 'heroImage')}
                    onClear={() => clearImage(project.id, 'heroImage')}
                    inputId={`hero-${project.id}`}
                    inputRef={(el) => { inputRefs.current[`hero-${project.id}`] = el; }}
                    aspect="landscape"
                    badgeColor="blue"
                  />
                </div>
                {project.status !== 'sold-out' && (
                  <>
                    <ImageSlot
                      label="Promo Banner"
                      description="แนวนอน — ทับ Hero บน desktop"
                      url={s.promoBanner}
                      uploading={s.uploadingPromo}
                      onUpload={(file) => uploadFile(file, project.id, 'promoBanner')}
                      onClear={() => clearImage(project.id, 'promoBanner')}
                      inputId={`promo-${project.id}`}
                      inputRef={(el) => { inputRefs.current[`promo-${project.id}`] = el; }}
                      aspect="landscape"
                      badgeColor="purple"
                    />
                    <ImageSlot
                      label="Promo มือถือ"
                      description="แนวตั้ง 9:16 — ฟอร์มอยู่ใต้รูป"
                      url={s.promoBannerMobile}
                      uploading={s.uploadingPromoMobile}
                      onUpload={(file) => uploadFile(file, project.id, 'promoBannerMobile')}
                      onClear={() => clearImage(project.id, 'promoBannerMobile')}
                      inputId={`promo-mobile-${project.id}`}
                      inputRef={(el) => { inputRefs.current[`promo-mobile-${project.id}`] = el; }}
                      aspect="portrait"
                      badgeColor="green"
                      icon={<Smartphone size={13} />}
                    />
                  </>
                )}
              </div>

              {/* Popup section — ซ่อนสำหรับโครงการขายหมดแล้ว */}
              {project.status !== 'sold-out' && (
                <div className="mx-6 mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-100 text-orange-700">
                      Popup โปรโมชั่น
                    </span>
                    <span className="text-xs text-gray-400">ถ้าอัปโหลดรูปไว้ จะโชว์ popup อัตโนมัติเมื่อเปิดหน้าโครงการ</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Popup image */}
                    <ImageSlot
                      label="รูป Popup"
                      description="คลิกรูปจะเปิดลิงค์ด้านล่าง (แนะนำสัดส่วน 4:3 หรือ 1:1)"
                      url={s.popupImage}
                      uploading={s.uploadingPopup}
                      onUpload={(file) => uploadFile(file, project.id, 'popupImage')}
                      onClear={() => clearImage(project.id, 'popupImage')}
                      inputId={`popup-${project.id}`}
                      inputRef={(el) => { inputRefs.current[`popup-${project.id}`] = el; }}
                      aspect="landscape"
                      badgeColor="orange"
                    />

                    {/* Popup URL */}
                    <div className="flex flex-col justify-center gap-3">
                      <div>
                        <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 mb-1.5">
                          <LinkIcon size={13} /> ลิงค์เมื่อกดรูป Popup
                        </label>
                        <input
                          type="url"
                          value={s.popupUrl}
                          onChange={(e) => updateState(project.id, { popupUrl: e.target.value })}
                          onBlur={(e) => { if (e.target.value !== (project.popup_url || '')) savePopupUrl(project.id, e.target.value); }}
                          placeholder="https://..."
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f4511e] focus:border-transparent bg-white"
                        />
                        <p className="text-[11px] text-gray-400 mt-1.5">กด Tab หรือคลิกออกนอกช่องเพื่อบันทึก URL</p>
                      </div>
                      {!s.popupImage && (
                        <div className="text-xs text-gray-400 bg-white border border-dashed border-gray-200 rounded-xl p-3 text-center">
                          อัปโหลดรูป Popup ก่อน จึงจะแสดงบนหน้าโครงการ
                        </div>
                      )}
                      {s.popupImage && !s.popupUrl && (
                        <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl p-3">
                          มีรูป Popup แล้ว — ถ้าไม่ใส่ลิงค์ popup จะไม่สามารถกดได้ (แค่ปิดได้อย่างเดียว)
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Promo note */}
              {project.status !== 'sold-out' && (s.promoBanner || s.promoBannerMobile) && (
                <div className="mx-6 mb-4 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 flex items-start gap-2">
                  <span className="font-bold mt-0.5">!</span>
                  <span>
                    Promo Banner ถูกตั้งค่าแล้ว — หน้าโครงการจะแสดงรูปโปรโมชั่นแทน Hero Image
                    {!s.promoBannerMobile && s.promoBanner && ' (มือถือจะใช้ Promo Banner แนวนอนแทน แนะนำให้อัปโหลดรูปแนวตั้งด้วย)'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ImageSlot({
  label, description, url, uploading,
  onUpload, onClear, inputRef, inputId, aspect, badgeColor, icon,
}: {
  label: string;
  description: string;
  url: string;
  uploading: boolean;
  onUpload: (file: File) => void;
  onClear: () => void;
  inputRef: (el: HTMLInputElement | null) => void;
  inputId: string;
  aspect: 'landscape' | 'portrait';
  badgeColor: 'blue' | 'purple' | 'green' | 'orange';
  icon?: React.ReactNode;
}) {
  const badgeClass = {
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    green: 'bg-green-100 text-green-700',
    orange: 'bg-orange-100 text-orange-700',
  }[badgeColor];

  const aspectStyle = { aspectRatio: aspect === 'portrait' ? '9/16' : '16/9' };

  return (
    <div>
      <div className="mb-2">
        <span className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${badgeClass}`}>
          {icon}{label}
        </span>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      </div>

      {url ? (
        <div className="group relative rounded-xl overflow-hidden bg-gray-50 border border-gray-200" style={aspectStyle}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <label htmlFor={inputId} className="cursor-pointer bg-white text-gray-700 text-xs font-bold px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1.5">
              <Upload size={14} /> เปลี่ยนรูป
            </label>
            <button onClick={onClear} className="bg-white text-red-500 text-xs font-bold px-3 py-2 rounded-lg hover:bg-red-50 flex items-center gap-1.5">
              <Trash2 size={14} /> ลบ
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          style={aspectStyle}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-all ${
            uploading ? 'border-gray-200 bg-gray-50 pointer-events-none' : 'border-gray-200 hover:border-[#f4511e] hover:bg-orange-50'
          }`}
        >
          {uploading ? (
            <Loader2 size={24} className="animate-spin text-gray-300" />
          ) : (
            <>
              <Upload size={22} className="text-gray-300 mb-2" />
              <span className="text-xs text-gray-400 font-medium">คลิกเพื่ออัปโหลด</span>
              <span className="text-[10px] text-gray-300 mt-0.5">
                {aspect === 'portrait' ? 'แนะนำ 9:16 (1080×1920)' : 'JPG, PNG, WEBP ≤ 5MB'}
              </span>
            </>
          )}
        </label>
      )}

      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
