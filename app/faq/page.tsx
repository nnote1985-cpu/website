import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown } from 'lucide-react';
import FaqSection from '@/components/home/FaqSection';

export const metadata: Metadata = {
  title: 'คำถามที่พบบ่อย (FAQ) | ASAKAN อสังหาริมทรัพย์',
  description: 'รวมคำถามที่พบบ่อยเกี่ยวกับ ASAKAN คอนโดมิเนียม ราคา ทำเล การขอสินเชื่อ และการลงทุนในอสังหาริมทรัพย์ กรุงเทพฯ',
  keywords: 'FAQ, คำถาม ASAKAN, คอนโดราคา, สินเชื่อคอนโด, ลงทุนคอนโด',
  openGraph: {
    title: 'คำถามที่พบบ่อย | ASAKAN',
    description: 'ทุกคำถามเกี่ยวกับคอนโด ASAKAN ตอบครบที่นี่',
  },
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
