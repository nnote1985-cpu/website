import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MemberSubNav from '@/components/member/MemberSubNav';
import Link from 'next/link';
import { Users, CheckCircle, ArrowRight, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Friends Get Friends (FGF) | สมาชิก ASAKAN',
  description: 'รับรางวัลมากกว่า 100,000 บาท เมื่อแนะนำเพื่อนให้ซื้อห้อง ASAKAN สิทธิพิเศษสมาชิก Privilege',
};

export default function FgfPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#f8f9fa]">
        <MemberSubNav active="FGF" />

        {/* Hero */}
        <section className="py-16 md:py-20 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a2a1a 0%, #0f4a2a 50%, #1a7a40 130%)' }}>
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute -left-20 -bottom-10 w-80 h-80 rounded-full bg-green-400 opacity-10 blur-3xl" />
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Users size={16} className="text-green-300" /> Friends Get Friends
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              แนะนำเพื่อน<br />
              <span className="text-green-300">รับมากกว่า</span>{' '}
              <span className="text-yellow-300 text-5xl md:text-7xl">100,000</span>
              <span className="text-3xl md:text-4xl"> บาท</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              เมื่อเพื่อนที่คุณแนะนำซื้อห้อง ASAKAN สำเร็จ คุณจะได้รับรางวัลทันที
            </p>
          </div>
        </section>

        <section className="py-12 max-w-5xl mx-auto px-4">
          {/* Reward highlight */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 mb-8 text-center">
            <div className="text-6xl md:text-8xl font-black text-green-600 mb-2">100,000+</div>
            <div className="text-xl font-bold text-[#1a2d6b] mb-4">บาท รางวัลแนะนำเพื่อน</div>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              รางวัลจะแตกต่างกันตามมูลค่าโครงการและเงื่อนไขของแต่ละโครงการ สอบถามรายละเอียดได้จากทีมขาย
            </p>
          </div>

          {/* How it works */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-black text-[#1a2d6b] mb-6">วิธีรับรางวัล FGF</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: '1', icon: <Users size={28} />, title: 'แนะนำเพื่อน', desc: 'แนะนำเพื่อนหรือคนรู้จักที่สนใจซื้อห้อง ASAKAN' },
                { step: '2', icon: <ArrowRight size={28} />, title: 'เพื่อนซื้อสำเร็จ', desc: 'เพื่อนทำสัญญาและชำระเงินจองเรียบร้อยแล้ว' },
                { step: '3', icon: <CheckCircle size={28} />, title: 'รับรางวัล', desc: 'รับรางวัลเป็นเงินสดหรือของรางวัลภายใน 30 วัน' },
              ].map((s) => (
                <div key={s.step} className="text-center p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                    {s.icon}
                  </div>
                  <div className="font-black text-[#1a2d6b] mb-1">{s.title}</div>
                  <div className="text-sm text-slate-500">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reward Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-slate-100 bg-[#0f1e4a]">
              <h2 className="text-lg font-black text-white">ตารางรางวัลสำหรับผู้แนะนำ</h2>
              <p className="text-white/50 text-xs mt-1">รางวัล (บาท) แบ่งตามขนาดห้องและจำนวนยูนิตที่แนะนำสะสม</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-5 py-4 text-left font-black text-[#1a2d6b] border-b border-slate-100 whitespace-nowrap">UNIT TYPE</th>
                    <th className="px-5 py-4 text-center font-black text-[#1a2d6b] border-b border-slate-100 whitespace-nowrap">ยูนิตที่ 1–2</th>
                    <th className="px-5 py-4 text-center font-black text-[#1a2d6b] border-b border-slate-100 whitespace-nowrap">ยูนิตที่ 3–5</th>
                    <th className="px-5 py-4 text-center font-black text-[#1a2d6b] border-b border-slate-100 whitespace-nowrap">ยูนิตที่ 6–9</th>
                    <th className="px-5 py-4 text-center font-black text-[#1a2d6b] border-b border-slate-100 whitespace-nowrap">ยูนิตที่ 10 ขึ้นไป</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: '22 – 28 ตร.ม.', vals: ['15,000', '20,000', '30,000', '40,000'] },
                    { size: '30 – 43 ตร.ม.', vals: ['20,000', '30,000', '40,000', '50,000'] },
                    { size: '63 ตร.ม.', vals: ['50,000', '60,000', '75,000', '100,000'], highlight: true },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                      <td className="px-5 py-4 font-bold text-[#1a2d6b]">{row.size}</td>
                      {row.vals.map((v, j) => (
                        <td key={j} className={`px-5 py-4 text-center font-black ${row.highlight ? 'text-green-600 text-base' : 'text-slate-700'}`}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
              <p className="text-xs text-amber-700">* รางวัลเป็นหน่วย บาท / ยูนิต · นับสะสมตลอดอายุบัตรสมาชิก</p>
            </div>
          </div>

          {/* Conditions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
            <h2 className="text-xl font-black text-[#1a2d6b] mb-4">เงื่อนไขการรับรางวัล</h2>
            <ul className="space-y-3">
              {[
                'ผู้แนะนำต้องเป็นสมาชิก ASAKAN Privilege Member Card ที่บัตรยังไม่หมดอายุเท่านั้น',
                'ผู้ถูกแนะนำต้องไม่เคยติดต่อ ลงทะเบียน หรืออยู่ในฐานข้อมูลลูกค้าของ ASAKAN มาก่อน',
                'ต้องระบุชื่อ-นามสกุลผู้แนะนำในวันที่ผู้ถูกแนะนำมาติดต่อหรือลงทะเบียนครั้งแรกเท่านั้น ไม่สามารถแจ้งภายหลังได้',
                'รางวัลคำนวณตามขนาดห้องของผู้ถูกแนะนำ และจำนวนยูนิตที่แนะนำสะสมตลอดอายุบัตร',
                'รางวัลจะโอนให้ผู้แนะนำภายใน 30 วันนับจากวันที่ผู้ถูกแนะนำโอนกรรมสิทธิ์ห้องเรียบร้อยแล้ว',
                'สิทธิประโยชน์นี้ไม่สามารถแลกเปลี่ยนเป็นเงินสดในรูปแบบอื่น หรือโอนให้บุคคลอื่นได้',
                'บริษัทขอสงวนสิทธิ์ในการปรับเปลี่ยนอัตรารางวัลและเงื่อนไขโดยไม่ต้องแจ้งล่วงหน้า',
                'บัตรสมาชิกมีอายุถึงวันที่ 31 ธันวาคม 2570 (2027)',
              ].map((c) => (
                <li key={c} className="flex gap-3">
                  <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1a2d6b] rounded-2xl p-6 text-white flex flex-col justify-between gap-4">
              <div>
                <div className="font-black text-lg mb-1">มีเพื่อนสนใจ?</div>
                <div className="text-white/70 text-sm">ติดต่อทีมขายเพื่อลงทะเบียนแนะนำเพื่อนและรับรางวัล</div>
              </div>
              <a href="tel:0825265566" className="flex items-center gap-2 bg-white text-[#1a2d6b] font-black px-5 py-3 rounded-xl hover:bg-slate-100 transition-colors w-fit">
                <Phone size={16} /> โทรเลย
              </a>
            </div>
            <div className="bg-green-600 rounded-2xl p-6 text-white flex flex-col justify-between gap-4">
              <div>
                <div className="font-black text-lg mb-1">ดูโครงการทั้งหมด</div>
                <div className="text-white/80 text-sm">ส่งลิงค์โครงการให้เพื่อนดูก่อนได้เลย</div>
              </div>
              <Link href="/projects" className="flex items-center gap-2 bg-white text-green-700 font-black px-5 py-3 rounded-xl hover:bg-green-50 transition-colors w-fit">
                <ArrowRight size={16} /> ดูโครงการ
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
