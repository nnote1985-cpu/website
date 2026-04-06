import type { Metadata } from 'next';
import Header from '@/components/Header';
import FloatingCTA from '@/components/FloatingCTA';
import Footer from '@/components/Footer';
import { Target, Eye, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | ASAKAN บริษัท อัสสกาญจน์',
  description: 'ASAKAN บริษัท อัสสกาญจน์ จำกัด ผู้พัฒนาอสังหาริมทรัพย์ชั้นนำในกรุงเทพฯ กว่า 21 ปี ด้วยปรัชญา Freedom of Life',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        {/* Hero */}
        <section
          className="py-24 text-white relative"
          style={{ background: 'linear-gradient(135deg, #0f1e4a 0%, #1a2d6b 60%, #2a3d8b 100%)' }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">เกี่ยวกับเรา</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              บริษัท อัสสกาญจน์ จำกัด
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              ผู้พัฒนาอสังหาริมทรัพย์ที่มีความมุ่งมั่นพัฒนาโครงการคุณภาพ ในราคาเข้าถึงได้ เพื่อยกระดับคุณภาพชีวิตของชุมชน
            </p>
          </div>
        </section>

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
              <h2 className="section-title">21 ปีแห่งความไว้วางใจ</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="bg-gradient-to-br from-[#1a2d6b] to-[#f4511e] rounded-2xl aspect-video flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl font-bold mb-2">21+</div>
                  <div className="text-xl">ปีประสบการณ์</div>
                </div>
              </div>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  บริษัท อัสสกาญจน์ จำกัด ก่อตั้งขึ้นด้วยความมุ่งมั่นในการพัฒนาที่อยู่อาศัยคุณภาพสูงในราคาที่เข้าถึงได้ สำหรับคนกรุงเทพฯ ทุกระดับ
                </p>
                <p>
                  ตลอดระยะเวลากว่า 21 ปี เราได้พัฒนาโครงการคอนโดมิเนียมมากกว่า 10 โครงการ ส่งมอบห้องพักกว่า 2,500 ยูนิต ให้กับผู้ซื้อที่ไว้วางใจเรา
                </p>
                <p>
                  ASAKAN เชื่อว่าทุกคนมีสิทธิ์มีที่อยู่อาศัยที่ดี นั่นคือเหตุผลที่เราพัฒนาโครงการในทำเลศักยภาพ ใกล้รถไฟฟ้า ด้วยราคาที่ยุติธรรม
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    { value: '10+', label: 'โครงการ' },
                    { value: '2,500+', label: 'ยูนิต' },
                    { value: '21+', label: 'ปีประสบการณ์' },
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
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#1a2d6b] mb-6 text-center">ข้อมูลบริษัท</h2>
            <div className="bg-gray-50 rounded-2xl p-8 space-y-4">
              {[
                { label: 'ชื่อบริษัท', value: 'บริษัท อัสสกาญจน์ จำกัด (ASAKAN CO., LTD)' },
                { label: 'ที่ตั้ง', value: '191 ถนนรามคำแหง แขวงสะพานสูง เขตสะพานสูง กรุงเทพมหานคร 10240' },
                { label: 'โทรศัพท์', value: '082-526-5566 / 02-059-9655 / 099-198-2940' },
                { label: 'อีเมล', value: 'info@asakan.co.th' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:gap-4 pb-4 border-b border-gray-200 last:border-0">
                  <span className="text-sm font-semibold text-[#1a2d6b] sm:w-32 flex-shrink-0">{item.label}</span>
                  <span className="text-sm text-gray-600">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
