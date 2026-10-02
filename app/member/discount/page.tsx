import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import MemberSubNav from '@/components/member/MemberSubNav';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'Discount Privilege | สมาชิก ASAKAN' },
  alternates: { canonical: '/member/discount' },
  description: 'ส่วนลดพิเศษ 50,000 บาท เมื่อซื้อห้องโครงการ ASAKAN ครั้งต่อไป สิทธิพิเศษเฉพาะสมาชิก',
};

const projects = [
  { name: 'Asakan Elysium Phahol-59', href: '/elysium59' },
  { name: 'Asakan Elysium Ram Interchange', href: '/projects/elysium-ram-interchange' },
  { name: 'The Celine Bang Chan Station', href: '/theceline' },
  { name: 'Wela Ramkhamhaeng', href: '/projects/wela-ramkhamhaeng' },
];

export default function DiscountPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#f8f9fa]">
        <MemberSubNav active="Discount" />

        <PageHero
          eyebrow="Discount Privilege"
          title={<>ส่วนลดซื้อห้องถัดไป<br /><span className="text-[#f4511e]">50,000 บาท</span></>}
          subtitle="เมื่อซื้อห้องโครงการ ASAKAN ครั้งต่อไป สิทธิพิเศษสำหรับสมาชิก ASAKAN Privilege เท่านั้น"
        />

        <section className="py-12 max-w-5xl mx-auto px-4">
          {/* Highlight */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 mb-8 text-center">
            <div className="text-6xl md:text-8xl font-black text-[#e53935] mb-2">50,000</div>
            <div className="text-xl font-bold text-[#1a2d6b] mb-4">บาท ส่วนลดทันที</div>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              ใช้สิทธิ์ได้เมื่อซื้อห้องโครงการ ASAKAN โครงการใดก็ได้ที่ยังเปิดขายอยู่ โดยนำบัตรสมาชิกมาแสดงวันที่ทำสัญญา
            </p>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-black text-[#1a2d6b] mb-6">วิธีใช้สิทธิ์ส่วนลด</h2>
            <ol className="space-y-4">
              {[
                'เลือกโครงการ ASAKAN ที่คุณสนใจ',
                'แจ้งพนักงานขายว่าเป็นสมาชิก ASAKAN Privilege',
                'แสดงบัตรสมาชิกในวันที่ทำสัญญาจะซื้อจะขาย',
                'รับส่วนลด 50,000 บาท หักจากราคาห้องทันที',
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-[#e53935] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-slate-600 text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Eligible conditions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-black text-[#1a2d6b] mb-4">เงื่อนไขการใช้สิทธิ์</h2>
            <ul className="space-y-3">
              {[
                'บัตรสมาชิก ASAKAN Privilege ต้องยังไม่หมดอายุ',
                'ใช้ได้กับการซื้อห้องใหม่ในโครงการ ASAKAN ทุกโครงการที่เปิดขายอยู่',
                'ใช้ได้ 1 ครั้งต่อ 1 ใบสัญญา',
                'ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้ เว้นแต่บริษัทจะระบุไว้',
              ].map((c) => (
                <li key={c} className="flex gap-3">
                  <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-black text-[#1a2d6b] mb-4">โครงการที่ร่วมรายการ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projects.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-[#e53935] hover:bg-[#fff8f8] transition-all group"
                >
                  <span className="font-semibold text-sm text-slate-700 group-hover:text-[#e53935]">{p.name}</span>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-[#e53935]" />
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#1a2d6b] rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-black text-lg mb-1">พร้อมใช้สิทธิ์แล้ว?</div>
              <div className="text-white/70 text-sm">ติดต่อทีมขายเพื่อนัดชมโครงการและใช้สิทธิ์ส่วนลด</div>
            </div>
            <Link href="/contact" className="bg-[#e53935] text-white font-black px-6 py-3 rounded-xl hover:bg-[#c62828] transition-colors shrink-0">
              ติดต่อทีมขาย
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
