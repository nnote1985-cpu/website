import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MemberSubNav from '@/components/member/MemberSubNav';
import { Gift, CalendarDays, Clock, Ban, Star, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Birthday Privilege | สมาชิก ASAKAN',
  description: 'รับของขวัญพิเศษจาก ASAKAN ในเดือนเกิดของคุณ สิทธิพิเศษเฉพาะสมาชิก ASAKAN Privilege',
};

const highlights = [
  {
    icon: <CalendarDays size={22} />,
    title: 'ช่วงเวลารับของขวัญ',
    desc: '30 วันก่อนวันเกิด ถึง 30 วันหลังวันเกิด',
  },
  {
    icon: <Clock size={22} />,
    title: 'ลงทะเบียนล่วงหน้า',
    desc: 'ต้องลงทะเบียนอย่างน้อย 15 วัน ก่อนวันที่ต้องการรับ',
  },
  {
    icon: <Star size={22} />,
    title: 'ปีละ 1 ครั้ง',
    desc: 'รับสิทธิ์ได้ 1 ครั้งต่อปีปฏิทินตลอดอายุบัตร',
  },
  {
    icon: <Ban size={22} />,
    title: 'ไม่สามารถแลกเงินสดได้',
    desc: 'ของขวัญไม่สามารถโอนสิทธิ์หรือแลกเปลี่ยนเป็นเงินสดได้',
  },
];

const terms = [
  'สิทธิ์สำหรับผู้ถือบัตร ASAKAN Privilege Member Card ที่ยังไม่หมดอายุเท่านั้น',
  'สามารถรับของขวัญพรีเมียม (Premium Gift) ในช่วง 30 วันก่อนวันเกิด จนถึง 30 วันหลังวันเกิด',
  'ต้องลงทะเบียนล่วงหน้าอย่างน้อย 15 วัน ก่อนวันที่ต้องการรับของขวัญ',
  'รับสิทธิ์ได้ 1 ครั้ง ต่อ 1 ปีปฏิทิน ตามอายุการต่ออายุสมาชิก',
  'ของขวัญ 1 ชิ้น ต่อ 1 ห้องที่ถือครอง (กรณีถือครองหลายห้องได้รับสิทธิ์ตามจำนวนห้อง)',
  'สิทธิประโยชน์ไม่สามารถแลกเปลี่ยนเป็นเงินสดได้ และไม่สามารถโอนสิทธิ์ให้ผู้อื่นได้',
  'บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงของขวัญหรือเงื่อนไขโดยไม่ต้องแจ้งล่วงหน้า',
  'บัตรสมาชิกมีอายุถึงวันที่ 31 ธันวาคม 2570 (2027)',
];

export default function BirthdayPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-[#f8f9fa]">
        <MemberSubNav active="Birthday" />

        {/* Hero */}
        <section
          className="relative overflow-hidden py-20 md:py-28"
          style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b6b 50%, #1a0a2e 100%)' }}
        >
          {/* Decorative circles */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full border border-white/5" />
          <div className="absolute -right-24 top-0 w-96 h-96 rounded-full bg-purple-600 opacity-20 blur-3xl" />
          <div className="absolute -left-24 bottom-0 w-96 h-96 rounded-full bg-pink-600 opacity-20 blur-3xl" />

          <div className="relative max-w-3xl mx-auto px-4 text-center text-white">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6 mx-auto">
              <Gift size={36} className="text-yellow-300" />
            </div>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              ASAKAN Privilege · Birthday
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight">
              เพราะ<span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #f9a8d4, #c084fc)' }}>วันเกิด</span>ของคุณ<br />
              คือช่วงเวลาพิเศษ
            </h1>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              สมาชิก ASAKAN Privilege รับของขวัญพรีเมียมพิเศษจากเราทุกปี<br className="hidden md:block" />
              เพียงลงทะเบียนผ่านแบบฟอร์มด้านล่าง
            </p>
          </div>
        </section>

        {/* Highlight cards */}
        <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center flex flex-col items-center gap-2"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  {h.icon}
                </div>
                <div className="font-black text-[#1a2d6b] text-sm leading-tight">{h.title}</div>
                <div className="text-[11px] text-slate-400 leading-relaxed">{h.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Form section */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Form header */}
            <div
              className="px-8 py-6 flex items-center gap-4"
              style={{ background: 'linear-gradient(135deg, #2d1b6b 0%, #1a0a2e 100%)' }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                <Gift size={22} className="text-yellow-300" />
              </div>
              <div>
                <h2 className="text-white font-black text-lg">ลงทะเบียนรับของขวัญวันเกิด</h2>
                <p className="text-white/50 text-xs mt-0.5">กรอกข้อมูลให้ครบ ทีมงานจะติดต่อยืนยันสิทธิ์ภายใน 3 วันทำการ</p>
              </div>
            </div>

            {/* iFrame */}
            <div className="p-4 md:p-6 bg-slate-50">
              <iframe
                src="https://asakancrm.pages.dev/embed/birthday-form"
                style={{ width: '100%', height: '750px', border: 'none', background: 'transparent' }}
                scrolling="no"
              />
            </div>
          </div>
        </section>

        {/* Terms */}
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
              <AlertCircle size={18} className="text-amber-500" />
              <h3 className="font-black text-[#1a2d6b]">เงื่อนไขและข้อกำหนด</h3>
            </div>
            <ul className="divide-y divide-slate-50">
              {terms.map((t, i) => (
                <li key={i} className="flex gap-4 px-6 py-4">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-600 leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
