'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, Newspaper, Eye, EyeOff } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  publishedAt: string;
  isPublished: boolean;
  tags: string[];
}

const EMPTY: Omit<NewsItem, 'id'> = {
  slug: '', title: '', excerpt: '', content: '', category: 'Market Analysis',
  image: '', author: 'ASAKAN Team', publishedAt: new Date().toISOString(),
  isPublished: true, tags: [],
};

const CATEGORIES = ['Market Analysis', 'Property Tips', 'Finance', 'Project Update', 'Company News'];

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; item: Partial<NewsItem> | null; isNew: boolean }>({
    open: false, item: null, isNew: false,
  });
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    // Fetch all news including unpublished for admin
    fetch('/api/news/all').then((r) => r.json()).then((d) => { setItems(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  function openNew() { setModal({ open: true, item: { ...EMPTY }, isNew: true }); setTagInput(''); }
  function openEdit(n: NewsItem) { setModal({ open: true, item: { ...n }, isNew: false }); setTagInput(''); }
  function closeModal() { setModal({ open: false, item: null, isNew: false }); }
  function updateField(key: string, value: unknown) {
    setModal((m) => ({ ...m, item: { ...m.item, [key]: value } }));
  }

  function addTag() {
    if (!tagInput.trim()) return;
    const current = modal.item?.tags || [];
    if (!current.includes(tagInput.trim())) {
      updateField('tags', [...current, tagInput.trim()]);
    }
    setTagInput('');
  }

  function removeTag(tag: string) {
    updateField('tags', (modal.item?.tags || []).filter((t: string) => t !== tag));
  }

  async function handleSave() {
    if (!modal.item) return;
    setSaving(true);
    try {
      const { id, ...body } = modal.item as NewsItem;
      if (!body.slug && body.title) {
        body.slug = body.title.toLowerCase().replace(/[^a-z0-9\u0E00-\u0E7F]+/g, '-').replace(/(^-|-$)/g, '');
      }
      const url = modal.isNew ? '/api/news' : `/api/news/${id}`;
      const method = modal.isNew ? 'POST' : 'PUT';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (modal.isNew) setItems([data, ...items]);
      else setItems(items.map((n) => (n.id === id ? data : n)));
      closeModal();
    } finally { setSaving(false); }
  }

  async function togglePublish(item: NewsItem) {
    const res = await fetch(`/api/news/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...item, isPublished: !item.isPublished }),
    });
    const data = await res.json();
    setItems(items.map((n) => (n.id === item.id ? data : n)));
  }

  async function handleDelete(id: string) {
    if (!confirm('ลบบทความนี้?')) return;
    await fetch(`/api/news/${id}`, { method: 'DELETE' });
    setItems(items.filter((n) => n.id !== id));
  }

  const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f4511e]";
  const labelClass = "block text-xs font-medium text-gray-600 mb-1";

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">จัดการข่าวสาร</h1>
          <p className="text-gray-500 text-sm mt-1">{items.filter((i) => i.isPublished).length} บทความที่เผยแพร่</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#f4511e] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#d43e0e] text-sm">
          <Plus size={18} /> เขียนบทความ
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-20">กำลังโหลด...</div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <Newspaper size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400">ยังไม่มีบทความ</p>
          <button onClick={openNew} className="mt-4 text-[#f4511e] font-semibold text-sm hover:underline">+ เขียนบทความแรก</button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">บทความ</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">หมวดหมู่</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">วันที่</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                        <Newspaper size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 text-sm line-clamp-1">{item.title}</div>
                        <div className="text-gray-400 text-xs">{item.author}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{item.category}</span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell text-xs text-gray-400">
                    {formatDate(item.publishedAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => togglePublish(item)}
                        title={item.isPublished ? 'ซ่อนบทความ' : 'เผยแพร่บทความ'}
                        className={`p-2 rounded-lg transition-colors ${item.isPublished ? 'text-green-500 hover:bg-green-50' : 'text-gray-300 hover:bg-gray-50'}`}
                      >
                        {item.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button onClick={() => openEdit(item)} className="p-2 text-gray-400 hover:text-[#f4511e] hover:bg-orange-50 rounded-lg">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
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

      {modal.open && modal.item && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-gray-800">{modal.isNew ? 'เขียนบทความใหม่' : 'แก้ไขบทความ'}</h2>
              <button onClick={closeModal}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={labelClass}>หัวข้อบทความ *</label>
                <input type="text" value={modal.item.title || ''} onChange={(e) => updateField('title', e.target.value)} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>หมวดหมู่</label>
                  <select value={modal.item.category || 'Market Analysis'} onChange={(e) => updateField('category', e.target.value)} className={inputClass}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>ผู้เขียน</label>
                  <input type="text" value={modal.item.author || ''} onChange={(e) => updateField('author', e.target.value)} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>บทคัดย่อ (Excerpt)</label>
                <textarea rows={2} value={modal.item.excerpt || ''} onChange={(e) => updateField('excerpt', e.target.value)} className={inputClass + ' resize-none'} />
              </div>
              <div>
                <label className={labelClass}>เนื้อหา</label>
                <textarea rows={8} value={modal.item.content || ''} onChange={(e) => updateField('content', e.target.value)} className={inputClass + ' resize-none'} placeholder="เนื้อหาบทความ (แบ่งย่อหน้าด้วยการขึ้นบรรทัดใหม่ 2 ครั้ง)" />
              </div>
              <div>
                <label className={labelClass}>URL รูปภาพ</label>
                <input type="text" value={modal.item.image || ''} onChange={(e) => updateField('image', e.target.value)} className={inputClass} placeholder="/images/news.jpg" />
              </div>
              <div>
                <label className={labelClass}>Tags</label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {(modal.item.tags || []).map((tag: string) => (
                    <span key={tag} className="flex items-center gap-1 bg-orange-50 text-[#f4511e] text-xs px-2.5 py-1 rounded-full border border-orange-100">
                      #{tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-red-500 ml-0.5">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                    className={inputClass}
                    placeholder="เพิ่ม tag แล้วกด Enter"
                  />
                  <button onClick={addTag} className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200">
                    เพิ่ม
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isPublished" checked={modal.item.isPublished || false} onChange={(e) => updateField('isPublished', e.target.checked)} className="w-4 h-4 accent-[#f4511e]" />
                <label htmlFor="isPublished" className="text-sm text-gray-700">เผยแพร่บทความ</label>
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
