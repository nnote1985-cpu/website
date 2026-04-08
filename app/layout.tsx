import type { Metadata } from 'next';
import { Prompt } from 'next/font/google'; // 📍 1. เปลี่ยน Import เป็น Prompt
import './globals.css';
import { supabaseAdmin } from '@/lib/supabase';
import FacebookPixel from '@/components/FacebookPixel';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ClientHeader from '@/components/ClientHeader'; //

// 📍 2. ตั้งค่าฟอนต์ Prompt
const promptFont = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-prompt',
  display: 'swap',
});

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteDescriptionEn: string;
  metaKeywords: string;
  ogImage: string;
  facebookPixelId: string;
  googleAnalyticsId: string;
}

const defaultSettings: SiteSettings = {
  siteName: 'ASAKAN',
  siteDescription: 'ASAKAN - ผู้พัฒนาอสังหาริมทรัพย์ชั้นนำ',
  siteDescriptionEn: 'ASAKAN - Leading real estate developer in Bangkok',
  metaKeywords: 'คอนโด, ASAKAN, กรุงเทพ',
  ogImage: '/images/og-image.jpg',
  facebookPixelId: '',
  googleAnalyticsId: '',
};

async function getSettings(): Promise<SiteSettings> {
  try {
    const { data } = await supabaseAdmin.from('settings').select('data').eq('id', 1).single();
    return (data?.data as SiteSettings) || defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    metadataBase: new URL('https://www.asakan.co.th'),
    title: {
      default: `${settings.siteName} | คอนโดมิเนียมคุณภาพ ราคาเข้าถึงได้`,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.siteDescription,
    keywords: settings.metaKeywords,
    authors: [{ name: settings.siteName }],
    creator: settings.siteName,
    publisher: settings.siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'th_TH',
      alternateLocale: 'en_US',
      url: 'https://www.asakan.co.th',
      siteName: settings.siteName,
      title: `${settings.siteName} | คอนโดมิเนียมคุณภาพ ราคาเข้าถึงได้`,
      description: settings.siteDescription,
      images: [{ url: settings.ogImage, width: 1200, height: 630, alt: `${settings.siteName}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${settings.siteName} | คอนโดมิเนียมคุณภาพ`,
      description: settings.siteDescription,
      images: [settings.ogImage],
    },
    alternates: { canonical: 'https://www.asakan.co.th' },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  const pixelId = settings.facebookPixelId || '';
  const gaId = settings.googleAnalyticsId || '';

  return (
    // 📍 3. เปลี่ยนตัวแปรฟอนต์ที่ html และ body
    <html lang="th" className={promptFont.variable}>
      <head>
        <meta name="theme-color" content="#f4511e" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'ASAKAN',
              alternateName: 'อัสสกาญจน์',
              url: 'https://www.asakan.co.th',
              logo: 'https://www.asakan.co.th/logo.svg',
              description: 'ผู้พัฒนาอสังหาริมทรัพย์ คอนโดมิเนียมคุณภาพในกรุงเทพฯ',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '191 ถนนรามคำแหง',
                addressLocality: 'สะพานสูง',
                addressRegion: 'กรุงเทพมหานคร',
                postalCode: '10240',
                addressCountry: 'TH',
              },
              telephone: ['+66-82-526-5566', '+66-2-059-9655'],
              email: 'info@asakan.co.th',
              sameAs: ['https://www.facebook.com/Asakandevelopment'],
              foundingDate: '2003',
              numberOfEmployees: { '@type': 'QuantitativeValue', value: 50 },
              areaServed: { '@type': 'City', name: 'Bangkok' },
              priceRange: '฿฿',
            }),
          }}
        />
      </head>
      <body className={`${promptFont.className} antialiased`}>
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {pixelId && <FacebookPixel pixelId={pixelId} />}

{/* 📍 [เพิ่มใหม่] วาง Navbar หลักตรงนี้ มันจะเช็คและซ่อนตัวเองในหน้าโปรเจกต์ */}
        <ClientHeader />
        {children}
      </body>
    </html>
  );
}