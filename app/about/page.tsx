import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import FloatingCTA from '@/components/FloatingCTA';
import Footer from '@/components/Footer';
import AboutHeroMotion from '@/components/about/AboutHeroMotion';
import { Target, Eye, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | ASAKAN บริษัท อัสสกาญจน์',
  description: 'ASAKAN บริษัท อัสสกาญจน์ จำกัด ผู้พัฒนาอสังหาริมทรัพย์ชั้นนำในกรุงเทพฯ กว่า 25 ปี ด้วยปรัชญา Beyond Expectation',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        <AboutHeroMotion />

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target size={36} />,
                title: 'พันธกิจ',
                subtitle: 'Mission',
                content: 'พัฒนาโครงการในทำเลที่ดี ด้วยราคาที่เข้าถึงได้ เพื่อยกระดับคุณภาพชีวิตของชุมชน และสร้างความพึงพอใจสูงสุดให้กับลูกค้า',
              },
              {
                icon: <Eye size={36} />,
                title: 'วิสัยทัศน์',
                subtitle: 'Vision',
                content: 'มุ่งสู่การเป็นผู้พัฒนาคอนโดมิเนียมชั้นนำที่มีการเติบโตอย่างยั่งยืน โดยให้ความสำคัญกับความต้องการของลูกค้าเป็นหลัก',
              },
              {
                icon: <Heart size={36} />,
                title: 'ปรัชญา',
                subtitle: 'Philosophy',
                content: '"Freedom of Life" — เชื่อในการคิดอย่างอิสระ แสดงออกในแบบของตัวเอง ASAKAN เชื่อว่าคุณคือลูกค้าที่สำคัญ',
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-2xl p-8 text-center card-hover">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-[#f4511e] mx-auto mb-5">
                  {item.icon}
                </div>
                <div className="text-xs font-semibold text-[#f4511e] uppercase tracking-widest mb-1">{item.subtitle}</div>
                <h2 className="text-xl font-bold text-[#1a2d6b] mb-4">{item.title}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="section-subtitle mb-2">ประวัติของเรา</p>
              <h2 className="section-title">25 ปีแห่งความไว้วางใจ</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="bg-gradient-to-br from-[#1a2d6b] to-[#f4511e] rounded-2xl aspect-video flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl font-bold mb-2">25+</div>
                  <div className="text-xl">ปีประสบการณ์</div>
                </div>
              </div>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  บริษัท อัสสกาญจน์ จำกัด ก่อตั้งขึ้นด้วยความมุ่งมั่นในการพัฒนาที่อยู่อาศัยคุณภาพสูงในราคาที่เข้าถึงได้ สำหรับคนกรุงเทพฯ ทุกระดับ
                </p>
                <p>
                  ตลอดระยะเวลากว่า 25 ปี เราได้พัฒนาโครงการคอนโดมิเนียมมากกว่า 10 โครงการ ส่งมอบห้องพักกว่า 2,500 ยูนิต ให้กับผู้ซื้อที่ไว้วางใจเรา
                </p>
                <p>
                  ASAKAN เชื่อว่าทุกคนมีสิทธิ์มีที่อยู่อาศัยที่ดี นั่นคือเหตุผลที่เราพัฒนาโครงการในทำเลศักยภาพ ใกล้รถไฟฟ้า ด้วยราคาที่ยุติธรรม
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    { value: '10+', label: 'โครงการ' },
                    { value: '2,500+', label: 'ยูนิต' },
                    { value: '25+', label: 'ปีประสบการณ์' },
                    { value: '100%', label: 'ความพึงพอใจ' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <div className="text-2xl font-bold text-[#f4511e]">{stat.value}</div>
                      <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8 text-center">
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#e53935]">Company Profile</p>
              <h2 className="text-2xl font-bold text-[#1a2d6b] md:text-3xl">ข้อมูลบริษัท</h2>
            </div>

            <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,30,74,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[260px] bg-slate-100 md:min-h-[360px]">
                <Image
                  src="/images/aboutinfo.webp"
                  alt="อาคารและโครงการของ ASAKAN"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1e4a]/65 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="inline-flex rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1a2d6b] shadow-sm">
                    ASAKAN CO., LTD
                  </div>
                </div>
              </div>

              <div className="bg-[#f8fafc] p-6 sm:p-8 lg:p-10">
                <div className="mb-6 max-w-xl">
                  <h3 className="text-xl font-bold text-[#081735]">ผู้พัฒนาอสังหาริมทรัพย์คุณภาพในกรุงเทพฯ</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    ข้อมูลติดต่อหลักของบริษัท สำหรับลูกค้าและพาร์ทเนอร์ที่ต้องการติดต่อ ASAKAN โดยตรง
                  </p>
                </div>

                <div className="space-y-0 rounded-2xl bg-white px-5 shadow-sm ring-1 ring-slate-200/80">
                  {[
                    { label: 'ชื่อบริษัท', value: 'บริษัท อัสสกาญจน์ จำกัด (ASAKAN CO., LTD)' },
                    { label: 'ที่ตั้ง', value: '191 อาคาร อัสสกาญจน์ ถนนรามคำแหง แขวงสะพานสูง เขตสะพานสูง กรุงเทพมหานคร 10240' },
                    { label: 'โทรศัพท์', value: '082-526-5566 / 02-059-9655 / 099-198-2940' },
                    { label: 'อีเมล', value: 'asakanmkt@gmail.com' },
                  ].map((item) => (
                    <div key={item.label} className="grid gap-2 border-b border-slate-200 py-5 last:border-0 sm:grid-cols-[120px_1fr] sm:gap-6">
                      <span className="text-sm font-bold text-[#1a2d6b]">{item.label}</span>
                      <span className="text-sm leading-7 text-slate-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
