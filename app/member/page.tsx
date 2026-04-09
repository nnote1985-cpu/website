import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { Gift, Shield, Percent, Users, Star, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'สมาชิก ASAKAN Privilege | สิทธิพิเศษสำหรับเจ้าของห้อง',
  description: 'ASAKAN Privilege Member Card สิทธิพิเศษสำหรับเจ้าของห้อง ประกันอุบัติเหตุ 500,000 บาท ส่วนลดซื้อห้องถัดไป 50,000 บาท รางวัลแนะนำเพื่อน',
};

const benefits = [
  {
    icon: <Gift size={28} />,
    title: 'Birthday Gifts',
    desc: 'รับของขวัญพิเศษจาก ASAKAN ทุกปีในวันเกิดของคุณ',
    href: '/member/birthday',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: <Shield size={28} />,
    title: 'ประกันอุบัติเหตุ',
    desc: 'คุ้มครองอุบัติเหตุสูงสุด 500,000 บาทต่อปี สำหรับสมาชิกและครอบครัว',
    href: '/member/insurance',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: <Percent size={28} />,
    title: 'ส่วนลดซื้อห้องถัดไป',
    desc: 'ส่วนลดพิเศษ 50,000 บาท เมื่อซื้อห้องโครงการ ASAKAN ครั้งต่อไป',
    href: '/member/discount',
    color: 'bg-red-100 text-[#e53935]',
  },
  {
    icon: <Users size={28} />,
    title: 'Friends Get Friends',
    desc: 'รับรางวัลมากกว่า 100,000 บาท เมื่อแนะนำเพื่อนให้ซื้อห้อง ASAKAN',
    href: '/member/fgf',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: <Star size={28} />,
    title: 'สิทธิพิเศษ VIP',
    desc: 'เข้าร่วมกิจกรรมพิเศษ ทริปท่องเที่ยว และอีเวนต์เอ็กซ์คลูซีฟ',
    href: undefined,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: <ArrowRight size={28} />,
    title: 'บริการพิเศษ',
    desc: 'ช่องทางติดต่อ VIP ตอบสนองรวดเร็ว และบริการดูแลหลังการขาย',
    href: undefined,
    color: 'bg-orange-100 text-[#f4511e]',
  },
];

export default function MemberPage() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        <section
          className="py-24 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f1e4a 0%, #1a2d6b 50%, #f4511e 130%)' }}
        >
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Star size={16} className="text-yellow-400" />
              ASAKAN Privilege Member
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              More than Living,<br />
              <span className="text-[#f4511e]">A Lifestyle of Privilege</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              บัตรสมาชิก ASAKAN Privilege เพื่อสิทธิพิเศษเฉพาะคุณ ที่มากกว่าแค่การอยู่อาศัย
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <p className="section-subtitle mb-2">สิทธิประโยชน์</p>
              <h2 className="section-title">สิทธิพิเศษของคุณ</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b) =>
                b.href ? (
                  <Link
                    key={b.title}
                    href={b.href}
                    className="group bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-[#e53935] hover:shadow-md transition-all duration-300"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${b.color}`}>
                      {b.icon}
                    </div>
                    <h3 className="font-bold text-[#1a2d6b] text-lg mb-2 group-hover:text-[#e53935] transition-colors">{b.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{b.desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#e53935] opacity-0 group-hover:opacity-100 transition-opacity">
                      ดูรายละเอียด <ArrowRight size={12} />
                    </span>
                  </Link>
                ) : (
                  <div key={b.title} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${b.color}`}>
                      {b.icon}
                    </div>
                    <h3 className="font-bold text-[#1a2d6b] text-lg mb-2">{b.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Member Card Visual */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="section-title mb-4">บัตรสมาชิก ASAKAN Privilege</h2>
            <p className="text-gray-500 text-sm mb-10">
              บัตรมีอายุถึงวันที่ 31 ธันวาคม 2570 (2027)
            </p>
            <div
              className="max-w-sm mx-auto rounded-3xl p-8 text-white aspect-video flex flex-col justify-between relative overflow-hidden shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #0f1e4a 0%, #1a2d6b 50%, #2a3d8b 100%)' }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#f4511e] rounded-full -translate-y-24 translate-x-24 opacity-30" />
              <div className="relative">
                <div className="text-sm text-gray-400 mb-1">ASAKAN</div>
                <div className="text-xl font-bold">Privilege Member</div>
              </div>
              <div className="relative">
                <div className="text-xs text-gray-400 mb-1">ชื่อสมาชิก</div>
                <div className="font-semibold">ชื่อ-นามสกุล ของท่าน</div>
                <div className="flex items-center gap-2 mt-3">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs text-gray-400 ml-1">Platinum Member</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#f4511e]">
          <div className="max-w-3xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">เป็นเจ้าของห้อง ASAKAN แล้วหรือยัง?</h2>
            <p className="text-white/90 mb-8">ซื้อห้องกับเรา และรับสิทธิ์สมาชิก Privilege ทันที!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projects"
                className="bg-white text-[#f4511e] font-bold px-8 py-4 rounded-xl hover:bg-orange-50"
              >
                ดูโครงการ
              </Link>
              <Link
                href="/contact"
                className="bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/30"
              >
                ติดต่อสอบถาม
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
