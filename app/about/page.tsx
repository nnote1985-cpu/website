import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Header from '@/components/Header';
import FloatingCTA from '@/components/FloatingCTA';
import Footer from '@/components/Footer';
import BeyondStory from '@/components/about/BeyondStory';

export const metadata: Metadata = pageMetadata({
  title: 'เกี่ยวกับเรา | ASAKAN บริษัท อัสสกาญจน์',
  description: 'ASAKAN บริษัท อัสสกาญจน์ จำกัด ผู้พัฒนาอสังหาริมทรัพย์ชั้นนำในกรุงเทพฯ กว่า 25 ปี ด้วยปรัชญา Beyond Expectation',
  path: '/about',
});

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
