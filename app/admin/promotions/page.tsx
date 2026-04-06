'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, Tag, ToggleLeft, ToggleRight } from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  project: string;
  discount: string;
  validUntil: string;
  ctaText: string;
  ctaUrl: string;
  isActive: boolean;
}

const EMPTY: Omit<Promotion, 'id'> = {
  title: '', subtitle: '', description: '', project: '',
  discount: '', validUntil: '', ctaText: 'จองด่วน ก่อนหมดโปร',
  ctaUrl: '/contact', isActive: true,
};

export default function AdminPromotionsPage() {
  const [items, setItems] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; item: Partial<Promotion> | null; isNew: boolean }>({
    open: false, item: null, isNew: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/promotions').then((r) => r.json()).then((d) => { setItems(d); setLoading(false); });
  }, []);

  function openNew() { setModal({ open: true, item: { ...EMPTY }, isNew: true }); }
  function openEdit(p: Promotion) { setModal({ open: true, item: { ...p }, isNew: false }); }
  function closeModal() { setModal({ open: false, item: null, isNew: false }); }
  function updateField(key: string, value: unknown) {
    setModal((m) => ({ ...m, item: { ...m.item, [key]: value } }));
  }

  async function handleSave() {
    if (!modal.item) return;
    setSaving(true);
    try {
      const { id, ...body } = modal.item as Promotion;
      const url = modal.isNew ? '/api/promotions' : `/api/promotions/${id}`;
      const method = modal.isNew ? 'POST' : 'PUT';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (modal.isNew) setItems([...items, data]);
      else setItems(items.map((p) => (p.id === id ? data : p)));
      closeModal();
    } finally { setSaving(false); }
  }

  async function toggleActive(item: Promotion) {
    const res = await fetch(`/api/promotions/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item, isActive: !item.isActive }),
    });
    const data = await res.json();
    setItems(items.map((p) => (p.id === item.id ? data : p)));
  }

  async function handleDelete(id: string) {
    if (!confirm('ลบโปรโมชั่นนี้?')) return;
    await fetch(`/api/promotions/${id}`, { method: 'DELETE' });
    setItems(items.filter((p) => p.id !== id));
  }

  const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f4511e]";
  const labelClass = "block text-xs font-medium text-gray-600 mb-1";

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">จัดการโปรโมชั่น</h1>
          <p className="text-gray-500 text-sm mt-1">{items.filter((i) => i.isActive).length} โปรโมชั่นที่เปิดใช้งาน</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#f4511e] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#d43e0e] text-sm">
          <Plus size={18} /> เพิ่มโปรโมชั่น
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-20">กำลังโหลด...</div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <Tag size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400">ยังไม่มีโปรโมชั่น</p>
          <button onClick={openNew} className="mt-4 text-[#f4511e] font-semibold text-sm hover:underline">+ เพิ่มโปรโมชั่นแรก</button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${item.isActive ? 'border-green-400' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {item.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                    </span>
                  </div>
                  <p className="text-[#f4511e] font-semibold text-sm">{item.subtitle}</p>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                  {item.discount && (
                    <div className="mt-2 inline-block bg-orange-50 border border-orange-100 rounded-lg px-3 py-1 text-sm font-semibold text-[#f4511e]">
                      {item.discount}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleActive(item)} className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg">
                    {item.isActive ? <ToggleRight size={20} className="text-green-500" /> : <ToggleLeft size={20} />}
                  </button>
                  <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-[#f4511e] hover:bg-orange-50 rounded-lg">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal.open && modal.item && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800">{modal.isNew ? 'เพิ่มโปรโมชั่น' : 'แก้ไขโปรโมชั่น'}</h2>
              <button onClick={closeModal}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={labelClass}>ชื่อโปรโมชั่น *</label>
                <input type="text" value={modal.item.title || ''} onChange={(e) => updateField('title', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>คำโปรย (Subtitle)</label>
                <input type="text" value={modal.item.subtitle || ''} onChange={(e) => updateField('subtitle', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>คำอธิบาย</label>
                <textarea rows={3} value={modal.item.description || ''} onChange={(e) => updateField('description', e.target.value)} className={inputClass + ' resize-none'} />
              </div>
              <div>
                <label className={labelClass}>โครงการที่เกี่ยวข้อง</label>
                <input type="text" value={modal.item.project || ''} onChange={(e) => updateField('project', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>ข้อความส่วนลด (เช่น ราคาพิเศษ เริ่มต้น 1.21 ล้าน)</label>
                <input type="text" value={modal.item.discount || ''} onChange={(e) => updateField('discount', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>วันที่สิ้นสุด</label>
                <input type="date" value={modal.item.validUntil || ''} onChange={(e) => updateField('validUntil', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>ข้อความปุ่ม CTA</label>
                <input type="text" value={modal.item.ctaText || ''} onChange={(e) => updateField('ctaText', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>URL ปุ่ม CTA</label>
                <input type="text" value={modal.item.ctaUrl || ''} onChange={(e) => updateField('ctaUrl', e.target.value)} className={inputClass} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isActive" checked={modal.item.isActive || false} onChange={(e) => updateField('isActive', e.target.checked)} className="w-4 h-4 accent-[#f4511e]" />
                <label htmlFor="isActive" className="text-sm text-gray-700">เปิดใช้งานโปรโมชั่น</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t">
              <button onClick={closeModal} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm hover:bg-gray-50">ยกเลิก</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-[#f4511e] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#d43e0e] disabled:opacity-60 text-sm">
                <Save size={16} />{saving ? 'กำลังบันทึก...' : 'บันทึก'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
