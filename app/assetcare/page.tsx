import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { Search, FileText, CheckSquare, Wrench, BarChart3, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ASAKAN AssetCare+ | บริการบริหารการปล่อยเช่าครบวงจร',
  description: 'ASAKAN AssetCare+ บริการบริหารการปล่อยเช่าคอนโดแบบครบวงจร ตั้งแต่หาผู้เช่า ทำสัญญา ดูแลห้อง จนถึงรายงานรายเดือน',
};

const services = [
  {
    icon: <Search size={28} />,
    title: 'วิเคราะห์ราคาตลาด',
    desc: 'วิเคราะห์ราคาเช่าที่เหมาะสมตามทำเลและตลาด เพื่อให้ได้รายได้สูงสุด',
  },
  {
    icon: <Search size={28} />,
    title: 'หาผู้เช่าคุณภาพ',
    desc: 'คัดสรรผู้เช่าที่น่าเชื่อถือ พร้อมตรวจสอบประวัติและความสามารถในการชำระค่าเช่า',
  },
  {
    icon: <FileText size={28} />,
    title: 'จัดการสัญญาเช่า',
    desc: 'ดำเนินการเอกสารสัญญาเช่าอย่างครบถ้วน ถูกต้องตามกฎหมาย',
  },
  {
    icon: <CheckSquare size={28} />,
    title: 'ตรวจสอบสภาพห้อง',
    desc: 'ตรวจสอบสภาพห้องก่อนและหลังการเช่า พร้อมบันทึกหลักฐาน',
  },
  {
    icon: <Wrench size={28} />,
    title: 'ดูแลซ่อมบำรุง',
    desc: 'ประสานงานซ่อมบำรุงและดูแลรักษาห้องพักตลอดช่วงสัญญาเช่า',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'รายงานรายเดือน',
    desc: 'รายงานสรุปรายรับรายจ่าย และสถานะการเช่าให้เจ้าของห้องทุกเดือน',
  },
];

export default function AssetCarePage() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        <section
          className="py-24 text-white"
          style={{ background: 'linear-gradient(135deg, #0f1e4a 0%, #1a2d6b 60%, #2a3d8b 100%)' }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-[#f4511e]/20 border border-[#f4511e]/30 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-[#f4511e]">
              NEW SERVICE
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ASAKAN <span className="text-[#f4511e]">AssetCare+</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              บริการบริหารการปล่อยเช่าคอนโดแบบ One-Stop Service ให้คุณมีรายได้ Passive Income โดยไม่ต้องยุ่งยาก
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#f4511e] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#d43e0e]"
            >
              สอบถามบริการ <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* What is AssetCare+ */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle mb-2">เกี่ยวกับบริการ</p>
              <h2 className="section-title mb-6">AssetCare+ คืออะไร?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                AssetCare+ คือบริการบริหารจัดการการปล่อยเช่าอสังหาริมทรัพย์แบบครบวงจรจาก ASAKAN เหมาะสำหรับเจ้าของห้องที่ต้องการสร้างรายได้ Passive Income แต่ไม่มีเวลาดูแลจัดการด้วยตัวเอง
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                เราจัดการทุกอย่างตั้งแต่ต้นจนจบ ตั้งแต่การหาผู้เช่า การทำสัญญา ไปจนถึงการดูแลซ่อมบำรุงและรายงานรายเดือน
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '100%', label: 'One-Stop Service' },
                  { value: '24/7', label: 'ดูแลตลอดเวลา' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-orange-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-[#f4511e]">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a2d6b] to-[#f4511e] rounded-3xl p-10 text-white text-center">
              <div className="text-5xl font-bold mb-4">AssetCare+</div>
              <div className="text-lg font-semibold opacity-90 mb-2">บริหารเช่าครบวงจร</div>
              <div className="text-sm opacity-70 leading-relaxed">
                ไม่ต้องยุ่ง ไม่ต้องกังวล<br />เราดูแลทุกอย่างให้คุณ
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="section-subtitle mb-2">บริการของเรา</p>
              <h2 className="section-title">ครอบคลุมทุกขั้นตอน</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <div key={s.title} className="bg-white rounded-2xl p-7 card-hover border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#f4511e]">
                      {s.icon}
                    </div>
                    <span className="text-gray-300 text-3xl font-bold">0{i + 1}</span>
                  </div>
                  <h3 className="font-bold text-[#1a2d6b] text-lg mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#1a2d6b]">
          <div className="max-w-3xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">สนใจบริการ AssetCare+?</h2>
            <p className="text-gray-300 mb-8">ติดต่อทีมงานของเราเพื่อรับข้อมูลและเงื่อนไขบริการ</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-[#f4511e] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#d43e0e]"
              >
                ติดต่อเรา
              </Link>
              <a
                href="tel:0825265566"
                className="bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20"
              >
                โทร 082-526-5566
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
