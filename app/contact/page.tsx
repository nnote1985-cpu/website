import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import FloatingCTA from '@/components/FloatingCTA';
import { Phone, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ติดต่อเรา | ASAKAN สอบถามโครงการคอนโด',
  description: 'ติดต่อ ASAKAN สอบถามโครงการคอนโดมิเนียม โทร 082-526-5566 หรือส่งข้อความ ทีมงานพร้อมให้คำปรึกษาฟรี ไม่มีค่าใช้จ่าย',
  openGraph: {
    title: 'ติดต่อ ASAKAN | คำปรึกษาฟรี',
    description: 'ทีมงานพร้อมให้คำปรึกษา โทร 082-526-5566 หรือส่งข้อความได้เลย',
  },
};

const CONTACT_INFO = [
  {
    icon: <Phone size={22} />,
    title: 'โทรศัพท์',
    lines: ['082-526-5566', '02-059-9655', '099-198-2940'],
    href: 'tel:0825265566',
  },
  {
    icon: <Mail size={22} />,
    title: 'อีเมล',
    lines: ['info@asakan.co.th'],
    href: 'mailto:info@asakan.co.th',
  },
  {
    icon: <MapPin size={22} />,
    title: 'ที่ตั้ง',
    lines: ['191 ถนนรามคำแหง แขวงสะพานสูง', 'เขตสะพานสูง กรุงเทพฯ 10240'],
    href: 'https://maps.google.com/?q=ASAKAN+Ramkhamhaeng+Bangkok',
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        {/* Hero */}
        <section
          className="py-20 text-white"
          style={{ background: 'linear-gradient(135deg, #0f1e4a 0%, #1a2d6b 60%, #2a3d8b 100%)' }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">ติดต่อเรา</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">พูดคุยกับเรา</h1>
            <p className="text-gray-300 text-lg">ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาฟรี ไม่มีค่าใช้จ่าย</p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a2d6b] mb-8">ข้อมูลติดต่อ</h2>
              <div className="space-y-4">
                {CONTACT_INFO.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-[#f4511e] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1a2d6b] mb-1">{item.title}</div>
                      {item.lines.map((line) => (
                        <div key={line} className="text-gray-600 text-sm">{line}</div>
                      ))}
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-bold text-[#1a2d6b] mb-4">ช่องทางโซเชียล</h3>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="https://www.facebook.com/Asakandevelopment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-blue-700"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                  <a
                    href="https://line.me/ti/p/~@asakan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#00c300] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#00a300]"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
                    </svg>
                    LINE: @asakan
                  </a>
                </div>
              </div>

              {/* Office hours */}
              <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-5">
                <h3 className="font-bold text-[#1a2d6b] mb-3 text-sm">เวลาทำการ</h3>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>จันทร์ – ศุกร์</span>
                    <span className="font-medium">08:30 – 17:30 น.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>เสาร์ – อาทิตย์</span>
                    <span className="font-medium">09:00 – 17:00 น.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a2d6b] mb-8">ส่งข้อความหาเรา</h2>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="h-80 bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.611!2d100.6826!3d13.7563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d613d887a7b57%3A0x7cc3b5d965ededea!2z4Liq4Lin4Lix4Liq4Li54Lil4Li04Lin4Liw4LiB!5e0!3m2!1sth!2sth!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="ASAKAN Office Location"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
