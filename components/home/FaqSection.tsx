'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'ASAKAN คือใคร มีประสบการณ์กี่ปี?',
    a: 'ASAKAN (อัสสกาญจน์) เป็นผู้พัฒนาอสังหาริมทรัพย์ที่ก่อตั้งมากกว่า 25 ปี เชี่ยวชาญด้านคอนโดมิเนียมคุณภาพสูงในกรุงเทพฯ ด้วยโครงการที่เสร็จส่งมอบแล้วหลายโครงการ และมีลูกค้าเชื่อมั่นกว่า 1,000 ครอบครัว',
  },
  {
    q: 'คอนโด ASAKAN ราคาเริ่มต้นเท่าไหร่?',
    a: 'คอนโดมิเนียมของ ASAKAN มีราคาเริ่มต้นตั้งแต่ 1.21 ล้านบาท เหมาะกับทั้งคนอยู่อาศัยเองและนักลงทุน โดยแต่ละโครงการมีขนาดและราคาที่หลากหลายตามทำเล',
  },
  {
    q: 'โครงการ ASAKAN อยู่ย่านไหนบ้าง?',
    a: 'ปัจจุบัน ASAKAN มีโครงการในทำเลศักยภาพหลายแห่ง ได้แก่ รามคำแหง พหลโยธิน และบางเขน กรุงเทพฯ ทุกโครงการอยู่ใกล้แนวรถไฟฟ้า BTS/MRT เพื่อความสะดวกในการเดินทาง',
  },
  {
    q: 'สามารถขอสินเชื่อซื้อคอนโด ASAKAN ได้ไหม?',
    a: 'ได้เลย ทีม ASAKAN มีบริการให้คำปรึกษาสินเชื่อธนาคาร ช่วยเตรียมเอกสาร และประสานงานกับธนาคารชั้นนำให้ฟรี รวมถึงมีโปรแกรมผ่อนดาวน์พิเศษสำหรับลูกค้าที่ลงทะเบียนจองล่วงหน้า',
  },
  {
    q: 'ซื้อคอนโด ASAKAN เพื่อการลงทุนคุ้มไหม?',
    a: 'คอนโด ASAKAN ทุกโครงการตั้งอยู่ในทำเลที่มีอัตราการเช่าสูง ใกล้สถานีรถไฟฟ้าและสิ่งอำนวยความสะดวก ทำให้มีศักยภาพในการปล่อยเช่าที่ดี อัตราผลตอบแทนเฉลี่ย (Rental Yield) อยู่ที่ประมาณ 5-7% ต่อปี',
  },
  {
    q: 'จะเริ่มต้นอย่างไรถ้าสนใจโครงการ?',
    a: 'สามารถลงทะเบียนรับข้อมูลผ่านเว็บไซต์ หรือทักมาสอบถามทาง LINE, โทรศัพท์ได้เลย ทีมงานจะติดต่อกลับเพื่อนัดชมโครงการและรับสิทธิ์โปรโมชั่นพิเศษสำหรับลูกค้าที่ลงทะเบียนก่อน',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#f8f9fa] py-20 md:py-28 border-t border-slate-100">
      {/* JSON-LD สำหรับ Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#e53935] text-xs font-black uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1a2d6b] mb-4">คำถามที่พบบ่อย</h2>
          <div className="w-16 h-1 bg-[#e53935] mx-auto rounded-full" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-shadow hover:shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span className="font-bold text-[#1a2d6b] text-sm md:text-base leading-snug">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-slate-400 transition-transform duration-300 ${open === i ? 'rotate-180 text-[#e53935]' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm md:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
