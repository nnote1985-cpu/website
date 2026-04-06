'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MessageSquare, Calendar, CheckCheck, Trash2 } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  useEffect(() => {
    fetch('/api/contact')
      .then((r) => r.json())
      .then((data) => { setContacts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function markRead(contact: Contact) {
    if (contact.isRead) return;
    const res = await fetch(`/api/contact/${contact.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead: true }),
    });
    if (res.ok) {
      const updated = await res.json();
      setContacts((prev) => prev.map((c) => (c.id === contact.id ? updated : c)));
      setSelected(updated);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('ลบข้อความนี้?')) return;
    const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  }

  function handleSelect(contact: Contact) {
    setSelected(contact);
    markRead(contact);
  }

  const unread = contacts.filter((c) => !c.isRead).length;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">ข้อความติดต่อ</h1>
          <p className="text-gray-500 text-sm mt-1">
            {unread > 0 ? (
              <span className="text-[#f4511e] font-semibold">{unread} ข้อความใหม่</span>
            ) : (
              <span>ไม่มีข้อความใหม่</span>
            )}
            {' '}· รวม {contacts.length} ข้อความ
          </p>
        </div>
        {unread > 0 && (
          <button
            onClick={async () => {
              const unreadContacts = contacts.filter((c) => !c.isRead);
              await Promise.all(
                unreadContacts.map((c) =>
                  fetch(`/api/contact/${c.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isRead: true }),
                  })
                )
              );
              setContacts((prev) => prev.map((c) => ({ ...c, isRead: true })));
            }}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#f4511e] border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[#f4511e] transition-colors"
          >
            <CheckCheck size={14} />
            อ่านทั้งหมด
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48 text-gray-400">กำลังโหลด...</div>
      ) : contacts.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <MessageSquare size={48} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400">ยังไม่มีข้อความ</p>
          <p className="text-gray-300 text-sm mt-1">เมื่อมีคนส่งข้อความจากเว็บไซต์ จะแสดงที่นี่</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* List */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">กล่องข้อความ</span>
            </div>
            <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => handleSelect(contact)}
                  className={`w-full text-left p-4 hover:bg-gray-50/80 transition-colors ${
                    selected?.id === contact.id ? 'bg-orange-50 border-r-2 border-[#f4511e]' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      contact.isRead ? 'bg-gray-100 text-gray-500' : 'bg-orange-100 text-[#f4511e]'
                    }`}>
                      {contact.name[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${contact.isRead ? 'font-medium text-gray-700' : 'font-bold text-gray-900'}`}>
                          {contact.name}
                        </span>
                        {!contact.isRead && (
                          <span className="w-2 h-2 bg-[#f4511e] rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-gray-400">{contact.phone}</div>
                      {contact.message && (
                        <div className="text-xs text-gray-500 truncate mt-0.5">{contact.message}</div>
                      )}
                    </div>
                    <div className="text-xs text-gray-300 flex-shrink-0 whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString('th-TH', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-5 pb-5 border-b border-gray-100">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selected.name}</h2>
                    <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
                      <Calendar size={12} />
                      {new Date(selected.createdAt).toLocaleString('th-TH')}
                      {selected.isRead && (
                        <span className="flex items-center gap-1 text-green-500">
                          <CheckCheck size={12} /> อ่านแล้ว
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="ลบข้อความ"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-400 text-xs mb-1.5">
                        <Phone size={12} /> โทรศัพท์
                      </div>
                      <a href={`tel:${selected.phone}`} className="font-bold text-[#f4511e] hover:underline text-lg">
                        {selected.phone}
                      </a>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-400 text-xs mb-1.5">
                        <Mail size={12} /> อีเมล
                      </div>
                      {selected.email ? (
                        <a href={`mailto:${selected.email}`} className="font-medium text-blue-600 hover:underline text-sm break-all">
                          {selected.email}
                        </a>
                      ) : (
                        <span className="text-gray-300 text-sm">ไม่ระบุ</span>
                      )}
                    </div>
                  </div>

                  {selected.message && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                        <MessageSquare size={12} /> ข้อความ
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={`tel:${selected.phone}`}
                      className="flex items-center gap-2 bg-[#f4511e] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#d43e0e] text-sm"
                    >
                      <Phone size={16} /> โทรกลับ
                    </a>
                    <a
                      href={`https://line.me/ti/p/~${selected.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#00c300] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#00a300] text-sm"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
                      </svg>
                      LINE
                    </a>
                    {selected.email && (
                      <a
                        href={`mailto:${selected.email}`}
                        className="flex items-center gap-2 border border-gray-300 text-gray-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 text-sm"
                      >
                        <Mail size={16} /> อีเมล
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm h-full flex items-center justify-center min-h-48">
                <div>
                  <MessageSquare size={40} className="text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">เลือกข้อความเพื่อดูรายละเอียด</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
