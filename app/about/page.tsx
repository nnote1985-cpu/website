import type { Metadata } from 'next';
import Header from '@/components/Header';
import FloatingCTA from '@/components/FloatingCTA';
import Footer from '@/components/Footer';
import BeyondStory from '@/components/about/BeyondStory';

export const metadata: Metadata = {
  title: { absolute: 'เกี่ยวกับเรา | ASAKAN บริษัท อัสสกาญจน์' },
  alternates: { canonical: '/about' },
  description: 'ASAKAN บริษัท อัสสกาญจน์ จำกัด ผู้พัฒนาอสังหาริมทรัพย์ชั้นนำในกรุงเทพฯ กว่า 25 ปี ด้วยปรัชญา Beyond Expectation',
};

export default function AboutPage() {
  return (
    <>
      <Header hero />
      <FloatingCTA />
      <main className="overflow-x-clip">
        <BeyondStory />
      </main>
      <Footer />
    </>
  );
}
