'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, Building2 } from 'lucide-react';

interface Project {
  id: string;
  slug: string;
  name: string;
  status: string;
  type: string;
  floors: number;
  units: number;
  priceMin: number;
  priceMax: number;
  location: string;
  bts: string;
  concept: string;
  description: string;
  image: string;
  isFeatured: boolean;
  fbPixelId: string;
  fbCapiToken: string;
  facebookUrl: string;
  phone: string;
  videoUrl: string;
  sheetWebhookUrl: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

const EMPTY: Omit<Project, 'id'> = {
  slug: '', name: '', status: 'active', type: 'Low-Rise Condominium',
  floors: 8, units: 100, priceMin: 1200000, priceMax: 3000000,
  location: '', bts: '', concept: '', description: '', image: '',
  isFeatured: true, fbPixelId: '', fbCapiToken: '', facebookUrl: '', phone: '', videoUrl: '', sheetWebhookUrl: '',
  metaTitle: '', metaDescription: '', metaKeywords: '',
};

const STATUS_OPTIONS = [
  { value: 'active', label: 'เปิดขายแล้ว' },
  { value: 'coming-soon', label: 'เร็วๆ นี้' },
  { value: 'sold-out', label: 'ขายหมดแล้ว' },
];

// แปลง snake_case จาก DB → camelCase สำหรับ form
function mapProject(p: Record<string, unknown>): Project {
  return {
    id: p.id as string,
    slug: p.slug as string,
    name: p.name as string,
    status: (p.status as string) || 'active',
    type: (p.type as string) || '',
    floors: (p.floors as number) || 0,
    units: (p.units as number) || 0,
    priceMin: (p.price_min as number) ?? (p.priceMin as number) ?? 0,
    priceMax: (p.price_max as number) ?? (p.priceMax as number) ?? 0,
    location: (p.location as string) || '',
    bts: (p.bts as string) || '',
    concept: (p.concept as string) || '',
    description: (p.description as string) || '',
    image: (p.image as string) || '',
    isFeatured: (p.is_featured as boolean) ?? true,
    fbPixelId: (p.fb_pixel_id as string) || '',
    fbCapiToken: (p.fb_capi_token as string) || '',
    facebookUrl: (p.facebook_url as string) || '',
    phone: (p.phone as string) || '',
    videoUrl: (p.video_url as string) || '',
    sheetWebhookUrl: (p.sheet_webhook_url as string) || '',
    metaTitle: (p.meta_title as string) || '',
    metaDescription: (p.meta_description as string) || '',
    metaKeywords: (p.meta_keywords as string) || '',
  };
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; project: Partial<Project> | null; isNew: boolean }>({
    open: false, project: null, isNew: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((d: Record<string, unknown>[]) => {
        setProjects(d.map(mapProject));
        setLoading(false);
      });
  }, []);

  function openNew() {
    setModal({ open: true, project: { ...EMPTY }, isNew: true });
  }

  function openEdit(p: Project) {
    setModal({ open: true, project: { ...p }, isNew: false });
  }

  function closeModal() {
    setModal({ open: false, project: null, isNew: false });
  }

  function updateField(key: string, value: unknown) {
    setModal((m) => ({ ...m, project: { ...m.project, [key]: value } }));
  }

  async function reloadProjects() {
    const r = await fetch('/api/projects');
    const d: Record<string, unknown>[] = await r.json();
    setProjects(d.map(mapProject));
  }

  async function handleSave() {
    if (!modal.project) return;
    setSaving(true);
    try {
      const { id, ...body } = modal.project as Project;
      if (!body.slug && body.name) {
        body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      const url = modal.isNew ? '/api/projects' : `/api/projects/${id}`;
      const method = modal.isNew ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(`บันทึกไม่สำเร็จ: ${err.error || res.status}`);
        return;
      }
      await reloadProjects();
      closeModal();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('ลบโครงการนี้?')) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    setProjects(projects.filter((p) => p.id !== id));
  }

  const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f4511e] focus:border-transparent";
  const labelClass = "block text-xs font-medium text-gray-600 mb-1";

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">จัดการโครงการ</h1>
          <p className="text-gray-500 text-sm mt-1">{projects.length} โครงการทั้งหมด</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#f4511e] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#d43e0e] text-sm"
        >
          <Plus size={18} />
          เพิ่มโครงการ
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-20">กำลังโหลด...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">โครงการ</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">สถานะ</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">ราคา</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-[#f4511e]">
                        <Building2 size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 text-sm">{project.name}</div>
                        <div className="text-gray-400 text-xs">{project.type} | {project.floors} ชั้น | {project.units} ยูนิต</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      project.status === 'active' ? 'bg-green-100 text-green-700' :
                      project.status === 'coming-soon' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {STATUS_OPTIONS.find((s) => s.value === project.status)?.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell text-sm text-gray-600">
                    {project.priceMin ? `${(project.priceMin / 1000000).toFixed(2)}M` : '-'} – {project.priceMax ? `${(project.priceMax / 1000000).toFixed(2)}M` : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(project)}
                        className="p-2 text-gray-400 hover:text-[#f4511e] hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal.open && modal.project && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="font-bold text-gray-800">{modal.isNew ? 'เพิ่มโครงการใหม่' : 'แก้ไขโครงการ'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className={labelClass}>ชื่อโครงการ *</label>
                  <input type="text" value={modal.project.name || ''} onChange={(e) => updateField('name', e.target.value)} className={inputClass} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Slug (URL) *</label>
                  <input type="text" value={modal.project.slug || ''} onChange={(e) => updateField('slug', e.target.value)} className={inputClass} placeholder="asakan-elysium-phahol-59" />
                </div>
                <div>
                  <label className={labelClass}>สถานะ</label>
                  <select value={modal.project.status || 'active'} onChange={(e) => updateField('status', e.target.value)} className={inputClass}>
                    {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>ประเภท</label>
                  <input type="text" value={modal.project.type || ''} onChange={(e) => updateField('type', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>จำนวนชั้น</label>
                  <input type="number" value={modal.project.floors ?? ''} onChange={(e) => updateField('floors', +e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>จำนวนยูนิต</label>
                  <input type="number" value={modal.project.units ?? ''} onChange={(e) => updateField('units', +e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>ราคาเริ่มต้น (บาท)</label>
                  <input type="number" value={modal.project.priceMin ?? ''} onChange={(e) => updateField('priceMin', +e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>ราคาสูงสุด (บาท)</label>
                  <input type="number" value={modal.project.priceMax ?? ''} onChange={(e) => updateField('priceMax', +e.target.value)} className={inputClass} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>ทำเลที่ตั้ง</label>
                  <input type="text" value={modal.project.location || ''} onChange={(e) => updateField('location', e.target.value)} className={inputClass} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>ใกล้ BTS/MRT</label>
                  <input type="text" value={modal.project.bts || ''} onChange={(e) => updateField('bts', e.target.value)} className={inputClass} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Concept</label>
                  <input type="text" value={modal.project.concept || ''} onChange={(e) => updateField('concept', e.target.value)} className={inputClass} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>คำอธิบาย</label>
                  <textarea rows={3} value={modal.project.description || ''} onChange={(e) => updateField('description', e.target.value)} className={inputClass + ' resize-none'} />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>URL รูปภาพหลัก</label>
                  <input type="text" value={modal.project.image || ''} onChange={(e) => updateField('image', e.target.value)} className={inputClass} placeholder="/images/project.jpg" />
                </div>

                {/* ── Google Sheet ── */}
                <div className="col-span-2 pt-2 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Google Sheet</p>
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Apps Script Webhook URL</label>
                  <input
                    type="url"
                    value={modal.project.sheetWebhookUrl || ''}
                    onChange={(e) => updateField('sheetWebhookUrl', e.target.value)}
                    className={inputClass}
                    placeholder="https://script.google.com/macros/s/..."
                  />
                  <p className="text-xs text-gray-400 mt-1">ข้อมูลลงทะเบียนจะถูกส่งไป Google Sheet โครงการนี้อัตโนมัติ</p>
                </div>

                {/* ── Video ── */}
                <div className="col-span-2 pt-2 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">วีดีโอโครงการ</p>
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>YouTube / Vimeo Embed URL</label>
                  <input
                    type="url"
                    value={modal.project.videoUrl || ''}
                    onChange={(e) => updateField('videoUrl', e.target.value)}
                    className={inputClass}
                    placeholder="https://www.youtube.com/embed/XXXXXXXXX"
                  />
                  <p className="text-xs text-gray-400 mt-1">ใช้ลิงค์แบบ embed เช่น youtube.com/embed/... ถ้าไม่ใส่จะไม่แสดง section นี้</p>
                </div>

                {/* ── SEO ── */}
                <div className="col-span-2 pt-2 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">SEO Meta Tags</p>
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Meta Title</label>
                  <input
                    type="text"
                    value={modal.project.metaTitle || ''}
                    onChange={(e) => updateField('metaTitle', e.target.value)}
                    className={inputClass}
                    placeholder="เช่น Asakan Elysium Phahol-59 | คอนโดใกล้ BTS สะพานควาย"
                  />
                  <p className="text-xs text-gray-400 mt-1">ถ้าไม่ใส่จะใช้ชื่อโครงการอัตโนมัติ (แนะนำ 50-60 ตัวอักษร)</p>
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Meta Description</label>
                  <textarea
                    rows={3}
                    value={modal.project.metaDescription || ''}
                    onChange={(e) => updateField('metaDescription', e.target.value)}
                    className={inputClass + ' resize-none'}
                    placeholder="คำอธิบายสั้นๆ สำหรับ Google Search ถ้าไม่ใส่จะใช้คำอธิบายโครงการอัตโนมัติ"
                  />
                  <p className="text-xs text-gray-400 mt-1">แนะนำ 120-160 ตัวอักษร</p>
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Meta Keywords</label>
                  <input
                    type="text"
                    value={modal.project.metaKeywords || ''}
                    onChange={(e) => updateField('metaKeywords', e.target.value)}
                    className={inputClass}
                    placeholder="เช่น คอนโด พหลโยธิน, ใกล้ BTS, ASAKAN"
                  />
                  <p className="text-xs text-gray-400 mt-1">คั่นด้วยจุลภาค (,)</p>
                </div>

                {/* ── Social & Tracking ── */}
                <div className="col-span-2 pt-2 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Social & Tracking</p>
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>เบอร์โทรโครงการ</label>
                  <input
                    type="tel"
                    value={modal.project.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={inputClass}
                    placeholder="เช่น 082-526-5566"
                  />
                  <p className="text-xs text-gray-400 mt-1">แสดงใน Call Now และฟอร์มลงทะเบียนของหน้าโครงการนี้</p>
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Facebook Page URL</label>
                  <input
                    type="url"
                    value={modal.project.facebookUrl || ''}
                    onChange={(e) => updateField('facebookUrl', e.target.value)}
                    className={inputClass}
                    placeholder="https://www.facebook.com/..."
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Facebook Pixel ID (เฉพาะโครงการนี้)</label>
                  <input
                    type="text"
                    value={modal.project.fbPixelId || ''}
                    onChange={(e) => updateField('fbPixelId', e.target.value)}
                    className={inputClass}
                    placeholder="เช่น 1234567890123456"
                  />
                  <p className="text-xs text-gray-400 mt-1">ยิง Pixel นี้เพิ่มเติมจาก Global Pixel เมื่อผู้ใช้เปิดหน้าโครงการนี้</p>
                </div>
                <div className="col-span-2">
                  <label className={labelClass}>Facebook CAPI Access Token (เฉพาะโครงการนี้)</label>
                  <input
                    type="password"
                    value={modal.project.fbCapiToken || ''}
                    onChange={(e) => updateField('fbCapiToken', e.target.value)}
                    className={inputClass}
                    placeholder="EAAxxxxx..."
                  />
                  <p className="text-xs text-gray-400 mt-1">ใช้คู่กับ Pixel ID ด้านบน — สร้างได้ที่ Facebook Events Manager → Settings → Conversions API</p>
                </div>

                <div className="flex items-center gap-2 col-span-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={modal.project.isFeatured || false}
                    onChange={(e) => updateField('isFeatured', e.target.checked)}
                    className="w-4 h-4 accent-[#f4511e]"
                  />
                  <label htmlFor="isFeatured" className="text-sm text-gray-700">แสดงในหน้าแรก</label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
              <button onClick={closeModal} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm hover:bg-gray-50">
                ยกเลิก
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#f4511e] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#d43e0e] disabled:opacity-60 text-sm"
              >
                <Save size={16} />
                {saving ? 'กำลังบันทึก...' : 'บันทึก'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
