import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, MessageCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { supabaseAdmin } from '@/lib/supabase';
import { getProjectDetailAccess } from '@/lib/projectAccess';
import { projectUrl } from '@/lib/projectUrl';
import { getContactSettings, lineUrl, telHref } from '@/lib/getContactSettings';

export const metadata: Metadata = {
  title: { absolute: 'เร็วๆ นี้ | ASAKAN' },
  description: 'โครงการนี้กำลังเตรียมเปิดตัว ลงทะเบียนเพื่อรับข่าวสารก่อนใคร',
  robots: { index: false, follow: true },
};

// หน้าปลายทางของโครงการที่แอดมินปิดหน้ารายละเอียดไว้ (proxy.ts ส่งมาพร้อม ?project=slug)
export default async function ComingSoonPage({ searchParams }: { searchParams: Promise<{ project?: string | string[] }> }) {
  const { project: projectParam } = await searchParams;
  const slug = typeof projectParam === 'string' ? projectParam : undefined;

  let projectName: string | null = null;
  if (slug) {
    const { data } = await supabaseAdmin.from('projects').select('id, name').eq('slug', slug).maybeSingle();
    if (data) {
      // โครงการเปิดแสดงแล้ว (ลิงก์เก่าค้างอยู่) → พากลับไปหน้าโครงการเลย
      if ((await getProjectDetailAccess())[data.id] !== false) redirect(projectUrl(slug));
      projectName = data.name as string;
    }
  }

  const contact = await getContactSettings();

  return (
    <>
      <Header />
      <main className="pt-20">
        <PageHero
          eyebrow="Coming Soon"
          title={projectName ?? 'เร็วๆ นี้'}
          subtitle={
            projectName
              ? 'โครงการนี้กำลังเตรียมเปิดตัว ลงทะเบียนไว้ แล้วเราจะแจ้งรายละเอียดและสิทธิพิเศษให้คุณก่อนใคร'
              : 'หน้านี้กำลังเตรียมเปิดตัว ลงทะเบียนไว้ แล้วเราจะแจ้งข่าวให้คุณก่อนใคร'
          }
        >
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#register"
              className="inline-flex items-center justify-center bg-[#e53935] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#c62828] transition-colors"
            >
              ลงทะเบียนรับข่าวสาร
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white hover:text-[#1a2d6b] transition-colors"
            >
              <ArrowLeft size={18} />
              ดูโครงการอื่น
            </Link>
          </div>
        </PageHero>

        <section id="register" className="py-16 bg-gray-50 scroll-mt-24">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#1a2d6b] mb-3">รับข่าวสารก่อนใคร</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {projectName ? `ฝากชื่อไว้ ทีมงานจะติดต่อกลับเมื่อ ${projectName} พร้อมเปิดให้ชม` : 'ฝากชื่อไว้ ทีมงานจะติดต่อกลับโดยเร็ว'}
              </p>
              <div className="space-y-3">
                <a
                  href={telHref(contact.phone[0])}
                  className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-[#f4511e]">
                    <Phone size={18} />
                  </span>
                  <span className="font-semibold text-[#1a2d6b]">{contact.phone[0]}</span>
                </a>
                <a
                  href={lineUrl(contact.line)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-[#f4511e]">
                    <MessageCircle size={18} />
                  </span>
                  <span className="font-semibold text-[#1a2d6b]">LINE {contact.line}</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <ContactForm initialMessage={projectName ? `สนใจโครงการ ${projectName} ขอรับข่าวสารเมื่อเปิดตัว` : ''} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
