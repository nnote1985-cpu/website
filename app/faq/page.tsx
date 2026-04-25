import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FaqSection from '@/components/home/FaqSection';
import { faqs } from '@/lib/faqs';
import { JsonLd, breadcrumbJsonLd } from '@/lib/seo';

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
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'หน้าแรก', path: '' },
        { name: 'คำถามที่พบบ่อย', path: '/faq' },
      ])} />
      <JsonLd data={faqJsonLd} />
      <Header />
      <main className="pt-20 min-h-screen">
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
