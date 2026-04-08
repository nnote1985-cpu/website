import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import Link from 'next/link';
import { Building2, Tag, Newspaper, MessageSquare, ArrowRight, TrendingUp } from 'lucide-react';

interface Contact {
  id: string;
  isRead: boolean;
  createdAt: string;
}

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const [projectsRes, promotionsRes, newsRes, contactsRes] = await Promise.all([
    supabaseAdmin.from('projects').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('promotions').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('news').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('contacts').select('*').order('created_at', { ascending: false }),
  ]);

  const contacts: Contact[] = (contactsRes.data || []).map((c) => ({ ...c, isRead: c.is_read }));
  const unread = contacts.filter((c) => !c.isRead).length;
  const recentContacts = contacts.slice(0, 5);

  const stats = [
    { label: 'โครงการทั้งหมด', value: projectsRes.count || 0, icon: <Building2 size={22} />, href: '/admin/projects', color: 'bg-blue-500' },
    { label: 'โปรโมชั่น', value: promotionsRes.count || 0, icon: <Tag size={22} />, href: '/admin/promotions', color: 'bg-orange-500' },
    { label: 'บทความ', value: newsRes.count || 0, icon: <Newspaper size={22} />, href: '/admin/news', color: 'bg-green-500' },
    { label: 'ข้อความใหม่', value: unread, icon: <MessageSquare size={22} />, href: '/admin/contacts', color: 'bg-purple-500' },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">สวัสดี, {String(session.name || 'Admin')} 👋</h1>
        <p className="text-gray-500 text-sm mt-1">ภาพรวมเว็บไซต์ ASAKAN</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center text-white mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-[#f4511e]" />
            ดำเนินการด่วน
          </h2>
          <div className="space-y-2">
            {[
              { label: 'เพิ่มโครงการใหม่', href: '/admin/projects', sub: 'เพิ่ม/แก้ไขโครงการคอนโด' },
              { label: 'เพิ่มโปรโมชั่น', href: '/admin/promotions', sub: 'จัดการโปรโมชั่นพิเศษ' },
              { label: 'เขียนบทความ', href: '/admin/news', sub: 'เพิ่มข่าวสารและบทความ' },
              { label: 'ตั้งค่า Facebook Pixel', href: '/admin/settings', sub: 'ใส่ Pixel ID สำหรับ tracking' },
              { label: 'แก้ไข Hero Section', href: '/admin/settings', sub: 'ข้อความหน้าแรกของเว็บไซต์' },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between p-3.5 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div>
                  <div className="font-medium text-gray-700 text-sm">{action.label}</div>
                  <div className="text-gray-400 text-xs">{action.sub}</div>
                </div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-[#f4511e] transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <MessageSquare size={18} className="text-[#f4511e]" />
              ข้อความล่าสุด
            </h2>
            <Link href="/admin/contacts" className="text-xs text-[#f4511e] font-semibold hover:underline">
              ดูทั้งหมด
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">ยังไม่มีข้อความ</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((contact: Contact & { name?: string; phone?: string; message?: string }) => (
                <div key={contact.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-[#f4511e] text-xs font-bold flex-shrink-0">
                    {String(contact.name || 'U')[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700 text-sm">{String(contact.name || '')}</span>
                      {!contact.isRead && (
                        <span className="w-1.5 h-1.5 bg-[#f4511e] rounded-full" />
                      )}
                    </div>
                    <div className="text-gray-400 text-xs truncate">{String(contact.phone || '')}</div>
                    <div className="text-gray-500 text-xs truncate mt-0.5">{String(contact.message || '').substring(0, 50)}</div>
                  </div>
                  <div className="text-xs text-gray-400 flex-shrink-0">
                    {new Date(contact.createdAt).toLocaleDateString('th-TH', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
