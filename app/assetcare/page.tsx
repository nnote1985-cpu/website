import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { ArrowRight, BarChart3, CheckSquare, FileText, Search, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ASAKAN AssetCare+ | บริหารการปล่อยเช่าครบวงจร',
  description: 'ASAKAN AssetCare+ บริการบริหารการปล่อยเช่าคอนโดครบวงจร ตั้งแต่หาผู้เช่า ทำสัญญา ดูแลห้อง จนถึงรายงานรายเดือน',
};

const services = [
  { icon: <Search size={25} />, title: 'วิเคราะห์ราคาตลาด', desc: 'วางราคาเช่าที่เหมาะกับทำเลและสภาวะตลาด เพื่อช่วยให้ทรัพย์สินสร้างรายได้อย่างเต็มศักยภาพ' },
  { icon: <Search size={25} />, title: 'หาผู้เช่าคุณภาพ', desc: 'คัดสรรผู้เช่าที่น่าเชื่อถือ พร้อมตรวจสอบประวัติและความพร้อมในการชำระค่าเช่า' },
  { icon: <FileText size={25} />, title: 'จัดการสัญญาเช่า', desc: 'ดูแลเอกสารสัญญาเช่าอย่างครบถ้วนและเป็นระบบ เพื่อให้ทุกขั้นตอนเป็นไปอย่างมั่นใจ' },
  { icon: <CheckSquare size={25} />, title: 'ตรวจสอบสภาพห้อง', desc: 'ตรวจสภาพห้องก่อนและหลังการเช่า พร้อมบันทึกหลักฐาน เพื่อดูแลทรัพย์สินของคุณอย่างรอบคอบ' },
  { icon: <Wrench size={25} />, title: 'ดูแลซ่อมบำรุง', desc: 'ประสานงานซ่อมบำรุงและติดตามงานตลอดช่วงสัญญา เพื่อให้ห้องพร้อมอยู่เสมอ' },
  { icon: <BarChart3 size={25} />, title: 'รายงานรายเดือน', desc: 'รับรายงานรายรับรายจ่ายและสถานะการเช่าอย่างชัดเจนทุกเดือน' },
];

export default function AssetCarePage() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        <section className="relative overflow-hidden bg-[#0b1a42] py-12 text-white md:py-12">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.045)_100%)]" />
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute right-20 top-20 h-32 w-32 rounded-full border border-[#f4511e]/40" />
          <p aria-hidden="true" className="pointer-events-none absolute right-[9%] top-1/2 hidden -translate-y-1/2 select-none text-[13rem] font-bold leading-none tracking-[-0.14em] text-white/[0.035] lg:block">A+</p>

          <div className="relative mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <div className="max-w-2xl py-4 md:py-7">
              <p className="mb-6 inline-flex border border-[#f4511e]/50 bg-[#f4511e]/10 px-3 py-1.5 text-[11px] font-bold tracking-[0.16em] text-[#ff6b3d]">ASAKAN OWNER SERVICE</p>
              <h1 className="mb-5 max-w-2xl text-4xl font-bold leading-[0.96] tracking-[-0.045em] sm:text-5xl md:text-6xl">
                ASAKAN <span className="text-[#f4511e]">AssetCare+</span>
              </h1>
              <p className="mb-7 max-w-xl text-base leading-relaxed text-white/75">
                บริการบริหารการปล่อยเช่าคอนโดแบบ One-Stop Service ให้คุณมีรายได้ Passive Income โดยไม่ต้องยุ่งยาก
              </p>
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center gap-3 bg-[#f4511e] px-7 py-3.5 font-bold text-white transition-colors hover:bg-[#dd3d0d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b1a42]"
              >
                สอบถามบริการ <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </section>

        <section className="bg-[#f7f5f1] py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:px-10 lg:px-12">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f4511e]">เกี่ยวกับบริการ</p>
              <h2 className="mb-6 max-w-md text-3xl font-bold leading-tight tracking-[-0.03em] text-[#12285c] md:text-4xl">AssetCare+ คืออะไร?</h2>
              <p className="mb-4 leading-relaxed text-slate-600">
                AssetCare+ คือบริการบริหารจัดการการปล่อยเช่าอสังหาริมทรัพย์แบบครบวงจรจาก ASAKAN สำหรับเจ้าของห้องที่ต้องการสร้างรายได้ Passive Income แต่ไม่มีเวลาดูแลจัดการด้วยตัวเอง
              </p>
              <p className="mb-7 leading-relaxed text-slate-600">
                เราดูแลทุกอย่างตั้งแต่ต้นจนจบ ตั้งแต่การหาผู้เช่า การทำสัญญา ไปจนถึงการดูแลซ่อมบำรุงและรายงานรายเดือน
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Stat value="100%" label="One-Stop Service" />
                <Stat value="24/7" label="ดูแลตลอดเวลา" />
              </div>
            </div>

            <div className="relative overflow-hidden border border-[#12285c] bg-[#12285c] p-8 text-white md:p-10">
              <div className="absolute right-0 top-0 h-32 w-32 border-b border-l border-white/15" />
              <div className="relative mb-12 flex items-center justify-between border-b border-white/20 pb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/65"><span>AssetCare+ / 01</span><span className="h-2 w-2 bg-[#f4511e]" /></div>
              <p className="relative mb-4 text-5xl font-bold tracking-[-0.05em]">AssetCare+</p>
              <p className="relative mb-2 text-lg font-semibold opacity-90">บริหารเช่าครบวงจร</p>
              <p className="relative text-sm leading-relaxed text-white/65">ไม่ต้องยุ่ง ไม่ต้องกังวล<br />เราดูแลทุกอย่างให้คุณ</p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <div className="mb-14 flex flex-col justify-between gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f4511e]">บริการของเรา</p>
                <h2 className="text-3xl font-bold tracking-[-0.03em] text-[#12285c] md:text-4xl">ครอบคลุมทุกขั้นตอน</h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-slate-500">ดูแลทรัพย์สินของคุณด้วยกระบวนการที่ชัดเจน ตั้งแต่วันแรกจนถึงรายงานรายเดือน</p>
            </div>
            <div className="grid grid-cols-1 border-l border-t border-slate-200 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <article key={service.title} className="group border-b border-r border-slate-200 p-7 transition-colors duration-300 hover:bg-[#f7f5f1] md:p-8">
                  <div className="mb-7 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center border border-[#f4511e]/25 text-[#f4511e] transition-colors group-hover:bg-[#f4511e] group-hover:text-white">{service.icon}</div>
                    <span className="text-2xl font-bold tracking-[-0.05em] text-slate-200">0{index + 1}</span>
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-[#12285c]">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{service.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0b1a42] py-20">
          <div className="pointer-events-none absolute bottom-0 right-10 h-56 w-56 border border-white/10" />
          <div className="relative mx-auto max-w-3xl px-6 text-center text-white md:px-10">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#ff6b3d]">Let us take care of it</p>
            <h2 className="mb-4 text-3xl font-bold tracking-[-0.03em] md:text-4xl">สนใจบริการ AssetCare+?</h2>
            <p className="mb-8 text-white/65">ติดต่อทีมงานของเราเพื่อรับข้อมูลและเงื่อนไขบริการ</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact" className="bg-[#f4511e] px-8 py-4 font-bold text-white transition-colors hover:bg-[#d43e0e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">ติดต่อเรา</Link>
              <a href="tel:0825265566" className="border border-white/25 px-8 py-4 font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">โทร 082-526-5566</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="border-l-2 border-[#f4511e] bg-white p-4 text-left shadow-sm"><p className="text-2xl font-bold text-[#f4511e]">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></div>;
}
