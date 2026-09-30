import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/manrope';
import '@fontsource-variable/noto-sans-thai';
import '@fontsource/cormorant-garamond/400-italic.css';
import './globals.css';
import './experience.css';
import './gallery.css';
import './residences.css';

const site = process.env.SITE_URL || 'https://www.asakan.co.th';
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: 'ASAKAN — พื้นที่ให้ชีวิตเป็นคุณ | คอนโดมิเนียมกรุงเทพฯ',
  description: 'ค้นพบคอนโดมิเนียม ASAKAN ในทำเลพหลโยธิน บางชัน และรามคำแหง พื้นที่สำหรับการอยู่อาศัยในแบบของคุณ พร้อมบริการดูแลตลอดการอยู่อาศัย',
  alternates: { canonical: '/' },
  robots: { index: Boolean(process.env.SITE_URL), follow: true },
  openGraph: { title: 'ASAKAN — Space for your life.', description: 'พื้นที่ให้ชีวิตเป็นคุณ ค้นพบที่อยู่อาศัยจากอัสสกาญจน์', type: 'website', locale: 'th_TH', url: '/', images: [{ url: '/media/social.jpg', width: 1200, height: 630, alt: 'ASAKAN Elysium Phahol 59' }] },
  twitter: { card: 'summary_large_image', title: 'ASAKAN — Space for your life.', images: ['/media/social.jpg'] },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f5f4ef' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body><a className="skip-link" href="#main">ข้ามไปเนื้อหาหลัก</a>{children}</body></html>;
}
