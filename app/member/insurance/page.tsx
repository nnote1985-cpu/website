import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import MemberSubNav from '@/components/member/MemberSubNav';
import { CheckCircle, Phone } from 'lucide-react';

export const metadata: Metadata = pageMetadata({
  title: 'Insurance Privilege | สมาชิก ASAKAN',
  description: 'ประกันอุบัติเหตุสูงสุด 500,000 บาทต่อปี สิทธิพิเศษสำหรับสมาชิก ASAKAN Privilege',
  path: '/member/insurance',
});

const coverages = [
  { label: 'เสียชีวิตจากอุบัติเหตุ', amount: '500,000 บาท' },
  { label: 'ทุพพลภาพถาวรสิ้นเชิง', amount: '500,000 บาท' },
  { label: 'ทุพพลภาพถาวรบางส่วน', amount: 'ตามตาราง' },
  { label: 'ค่ารักษาพยาบาลต่อครั้ง', amount: 'สูงสุด 10,000 บาท' },
];

export default function InsurancePage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#f8f9fa]">
        <MemberSubNav active="Insurance" />

        <PageHero
          eyebrow="Insurance Privilege"
          title={<>ประกันอุบัติเหตุ<br /><span className="text-[#f4511e]">500,000 บาท</span></>}
          subtitle="สมาชิก ASAKAN Privilege ได้รับความคุ้มครองอุบัติเหตุสูงสุด 500,000 บาทต่อปี โดยบริษัทชั้นนำที่ได้รับการรับรอง"
        />

        <section className="py-12 max-w-5xl mx-auto px-4">
          {/* Coverage table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-slate-100 bg-[#1a2d6b]">
              <h2 className="text-lg font-black text-white">ความคุ้มครองที่ได้รับ</h2>
            </div>
            <div className="divide-y divide-slate-50">
              {coverages.map((c) => (
                <div key={c.label} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-green-500 shrink-0" />
                    <span className="text-slate-700 font-medium text-sm md:text-base">{c.label}</span>
                  </div>
                  <span className="font-black text-[#1a2d6b] text-sm md:text-base">{c.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to claim */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-black text-[#1a2d6b] mb-6">วิธีใช้สิทธิ์ประกัน</h2>
            <ol className="space-y-4">
              {[
                'แจ้งบริษัท ASAKAN ภายใน 30 วัน นับจากวันที่เกิดอุบัติเหตุ',
                'เตรียมเอกสาร: บัตรสมาชิก ASAKAN Privilege, บัตรประชาชน, ใบรับรองแพทย์',
                'ส่งเอกสารมาที่บริษัทหรือทาง LINE @asakan',
                'รอการพิจารณาภายใน 15 วันทำการ',
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-[#1a2d6b] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-slate-600 text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Contact */}
          <div className="bg-[#1a2d6b] rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-black text-lg mb-1">มีคำถามเกี่ยวกับประกัน?</div>
              <div className="text-white/70 text-sm">ทีมงานพร้อมให้คำปรึกษาทุกวัน 9:00 - 18:00 น.</div>
            </div>
            <a href="tel:0991982940" className="flex items-center gap-2 bg-white text-[#1a2d6b] font-black px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors shrink-0">
              <Phone size={18} /> 099-198-2940
            </a>
          </div>

          {/* Terms */}
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">เงื่อนไขและข้อกำหนด</h3>
            <ul className="space-y-2 text-sm text-slate-500 list-disc list-inside">
              <li>ความคุ้มครองเริ่มต้นเมื่อได้รับบัตรสมาชิก ASAKAN Privilege แล้ว</li>
              <li>ครอบคลุมอุบัติเหตุที่เกิดขึ้นภายในประเทศไทยเท่านั้น</li>
              <li>ไม่ครอบคลุมการเจ็บป่วยจากโรค หรืออุบัติเหตุจากการประกอบอาชีพที่มีความเสี่ยงสูง</li>
              <li>บัตรสมาชิกมีอายุถึงวันที่ 31 ธันวาคม 2570</li>
              <li>บริษัทขอสงวนสิทธิ์ปรับเปลี่ยนเงื่อนไขโดยแจ้งล่วงหน้า 30 วัน</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
