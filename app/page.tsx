import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import MarqueeBanner from '@/components/home/MarqueeBanner';
import ProjectCard from '@/components/home/ProjectCard';
import NewsCard from '@/components/home/NewsCard';
import MortgageCalculator from '@/components/home/MortgageCalculator';
import { ArrowRight, Shield, Star, Home, TrendingUp } from 'lucide-react';
import FloatingCTA from '@/components/FloatingCTA';
import SearchSection from '@/components/home/SearchSection';
import PromoBanner from '@/components/home/PromoBanner';
import CollapsibleSection from '@/components/home/CollapsibleSection';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'ASAKAN | คอนโดมิเนียมคุณภาพ ราคาเข้าถึงได้ กรุงเทพฯ',
  description: 'ASAKAN ผู้พัฒนาอสังหาริมทรัพย์ชั้นนำ กว่า 25 ปี คอนโดมิเนียมคุณภาพสูง ราคาเริ่มต้น 0.9 ล้านบาท ย่านรามคำแหง พหลโยธิน กรุงเทพฯ',
  keywords: 'ASAKAN, คอนโด, คอนโดมิเนียม, รามคำแหง, พหลโยธิน, กรุงเทพ, อสังหาริมทรัพย์, ราคาถูก',
};

// --- Interfaces ---
interface Settings {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroCTA: string;
  heroCTAUrl: string;
  heroImages?: string[];
}

interface Project {
  id: string;
  slug: string;
  name: string;
  status: string;
  type: string;
  floors: number;
  units: number;
  priceMin: number;
  priceMax: number;
  location: string;
  bts: string;
  concept: string;
  description: string;
  image: string;
  isFeatured: boolean;
}

interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  project: string;
  discount: string;
  validUntil: string;
  ctaText: string;
  ctaUrl: string;
  isActive: boolean;
}

interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  publishedAt: string;
  isPublished: boolean;
}

export default async function HomePage() {
  const [settingsRes, projectsRes, promotionsRes, newsRes] = await Promise.all([
    supabaseAdmin.from('settings').select('data').eq('id', 1).single(),
    supabaseAdmin.from('projects').select('*').eq('is_active', true).order('created_at', { ascending: false }),
    supabaseAdmin.from('promotions').select('*').eq('is_active', true),
    supabaseAdmin.from('news').select('*').eq('is_published', true).order('published_at', { ascending: false }).limit(3),
  ]);

  const settings: Settings = settingsRes.data?.data || {};
  const allProjects: Project[] = (projectsRes.data || []).map((p) => ({ ...p, priceMin: p.price_min, priceMax: p.price_max, isFeatured: true }));
  const promotions: Promotion[] = (promotionsRes.data || []).map((p) => ({ ...p, isActive: p.is_active, validUntil: p.valid_until, ctaText: p.cta_text, ctaUrl: p.cta_url }));
  const latestNews: NewsItem[] = (newsRes.data || []).map((n) => ({ ...n, isPublished: n.is_published, publishedAt: n.published_at }));

  const featuredProjects = allProjects.filter((p) => p.status !== 'sold-out').slice(0, 4);
  return (
    <>
      <Header />
      <FloatingCTA />
      
      <main className="bg-white">
        {/* 1. HERO SECTION - แคมเปญหลัก */}
        <HeroSection
          title={settings.heroTitle}
          subtitle={settings.heroSubtitle}
          description={settings.heroDescription}
          ctaText={settings.heroCTA}
          ctaUrl={settings.heroCTAUrl}
          images={settings.heroImages}
        />

        {/* 2. MARQUEE TICKER */}
        <MarqueeBanner />

        {/* 3. PROMOTION BANNER - แถบโปรโมชั่น */}
        {promotions.filter((p) => p.isActive).length > 0 && (
          <PromoBanner promos={promotions.filter((p) => p.isActive)} />
        )}

        {/* 3. Search Section: วางบนพื้นหลังสีเทาอ่อนบางๆ เพื่อแยกเลเยอร์ */}
        <section className="relative z-20 bg-slate-50 py-10 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <SearchSection projects={allProjects} />
          </div>
        </section>

        {/* 4. FEATURED PROJECTS - รายการโครงการ */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-center md:text-left gap-6">
              <div>
                {/* 📍 เปลี่ยนเป็นสีแดง */}
                <p className="text-[#e53935] font-bold tracking-widest text-xs uppercase mb-2">Our Projects</p>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">โครงการคอนโดมิเนียม</h2>
                <p className="text-slate-500 mt-3 max-w-xl text-sm">
                  เลือกที่อยู่อาศัยที่ตรงใจ ใกล้รถไฟฟ้า ราคาเข้าถึงได้ พร้อมสิ่งอำนวยความสะดวกครบครัน
                </p>
              </div>
              <Link
                href="/projects"
                // 📍 เปลี่ยน Hover เป็นสีแดง
                className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:text-[#e53935] transition-colors"
              >
                ดูโครงการทั้งหมด <ArrowRight size={20} />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            <div className="text-center mt-12 md:hidden">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-white border-2 border-[#1a2d6b] text-[#1a2d6b] font-bold px-10 py-4 rounded-xl hover:bg-[#1a2d6b] hover:text-white transition-all"
              >
                ดูโครงการทั้งหมด <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. TRUST SECTION - Why ASAKAN */}
        <CollapsibleSection label="Why ASAKAN?">
          <section className="py-24 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

                {/* ฝั่งซ้าย: หัวข้อและคำโปรย */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                  <p className="text-[#e53935] font-black text-xs uppercase tracking-[0.3em] mb-4">Brand Proof</p>
                  <h2 className="text-4xl md:text-6xl font-black text-[#1a2d6b] leading-[0.98] tracking-tight mb-6">
                    Why <br />
                    <span className="text-[#e53935]">ASAKAN?</span>
                  </h2>
                  <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8">
                    กว่า 25 ปีที่เราสร้างสรรค์ที่อยู่อาศัยบนมาตรฐานความคุ้มค่าและความมั่นคง
                    เพื่อส่งมอบคุณภาพชีวิตที่ดีที่สุดให้กับคุณ
                  </p>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
                    <p className="text-sm font-semibold text-[#1a2d6b] leading-relaxed">Your happiness is our hope.</p>
                    <p className="mt-1 text-xs text-slate-500">A home should feel confident, worthwhile, and easy to live in.</p>
                  </div>
                </div>

                {/* ฝั่งขวา: รายการจุดเด่น */}
                <div className="lg:col-span-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200">
                  {[
                    { icon: <Home size={32} strokeWidth={1.5} />, title: '2,500+ Units Delivered', desc: 'ความไว้วางใจจากครอบครัวอัสสกาญจน์ที่ส่งมอบแล้วทั่วกรุงเทพฯ' },
                    { icon: <Star size={32} strokeWidth={1.5} />, title: 'Premium Quality', desc: 'คัดสรรวัสดุมาตรฐานสากล พร้อมทีมงานตรวจรับมอบมืออาชีพ' },
                    { icon: <Shield size={32} strokeWidth={1.5} />, title: '25 Years Heritage', desc: 'รากฐานที่แข็งแกร่งและประสบการณ์ที่สั่งสมมายาวนานอย่างยั่งยืน' },
                    { icon: <TrendingUp size={32} strokeWidth={1.5} />, title: 'Prime Location', desc: 'เน้นทำเลศักยภาพใกล้รถไฟฟ้า เพื่อการอยู่อาศัยและการลงทุน' },
                  ].map((item, index) => (
                    <div key={item.title} className="group relative bg-white p-5 md:p-8 transition-colors duration-300 hover:bg-slate-50">
                      <span className="absolute top-5 right-5 text-4xl md:text-5xl font-black text-slate-100 group-hover:text-[#e53935]/10 transition-colors duration-300">
                        0{index + 1}
                      </span>

                      <div className="mb-7 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-slate-200 text-[#e53935]">
                        {item.icon}
                      </div>

                      <h3 className="text-lg md:text-2xl font-black text-[#1a2d6b] mb-3 leading-tight">
                        {item.title}
                      </h3>

                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed md:pr-4">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>
        </CollapsibleSection>

        {/* 6. SERVICES - บริการเสริม */}
        <CollapsibleSection label="Service & Care ครบจบในที่เดียว">
          <section className="py-24 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="max-w-3xl mb-14">
                <p className="text-[#e53935] font-bold text-xs uppercase tracking-[0.3em] mb-3">Service & Care</p>
                <h2 className="text-4xl md:text-5xl font-black text-[#1a2d6b] tracking-tight">ครบจบในที่เดียว</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white">
                {[
                  { title: 'ซื้อคอนโดมิเนียม', desc: 'โครงการคุณภาพในทำเลศักยภาพ ราคาเริ่มต้น 1.21 ล้านบาท พร้อมส่วนกลางครบครัน', href: '/projects', cta: 'ดูโครงการ' },
                  { title: 'ASAKAN AssetCare+', desc: 'บริการบริหารการปล่อยเช่าแบบครบวงจร ให้คุณมีรายได้ Passive Income โดยไม่ต้องกังวล', href: '/assetcare', cta: 'เรียนรู้เพิ่มเติม' },
                  { title: 'สมาชิก ASAKAN', desc: 'สิทธิพิเศษสำหรับเจ้าของห้อง ประกันอุบัติเหตุ ส่วนลดซื้อห้องถัดไป และรางวัลแนะนำเพื่อน', href: '/member', cta: 'สมัครสมาชิก' },
                ].map((service, index) => (
                  <div key={service.title} className="group bg-white p-7 md:p-8 hover:bg-slate-50 transition-colors">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-[0.24em] text-[#e53935]">0{index + 1}</span>
                      <span className="h-px flex-1 bg-slate-200 ml-4" />
                    </div>
                    <h3 className="font-black text-[#1a2d6b] text-2xl mb-4 leading-tight">{service.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[5.25rem]">{service.desc}</p>
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-[#e53935] font-bold text-sm group-hover:gap-4 transition-all uppercase tracking-widest"
                    >
                      {service.cta} <ArrowRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </CollapsibleSection>

        {/* 7. OTHER TOOLS */}
        <div className="bg-slate-50 py-12">
          <MortgageCalculator projects={allProjects} />
        </div>

        {/* 8. NEWS SECTION */}
        {latestNews.length > 0 && (
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-12">
                <div>
                  {/* 📍 เปลี่ยนเป็นสีแดง */}
                  <p className="text-[#e53935] font-bold tracking-widest text-xs uppercase mb-2">Insight</p>
                  <h2 className="text-4xl font-bold text-slate-900">บทความล่าสุด</h2>
                </div>
                {/* 📍 เปลี่ยน Hover เป็นสีแดง */}
                <Link href="/news" className="text-slate-400 font-bold hover:text-[#e53935] transition-colors flex items-center gap-2">
                  View All <ArrowRight size={18} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white">
                {latestNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 9. AEO QUICK ANSWERS */}
        <CollapsibleSection label="คำถามที่ถามบ่อย" alwaysCollapsible>
          <section className="py-12 bg-slate-50 border-t border-slate-100">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    q: 'ASAKAN คือใคร?',
                    a: 'ASAKAN คือผู้พัฒนาอสังหาริมทรัพย์ในกรุงเทพฯ ที่พัฒนาโครงการคอนโดมิเนียมและที่อยู่อาศัยมากกว่า 25 ปี',
                  },
                  {
                    q: 'โครงการ ASAKAN อยู่ที่ไหนบ้าง?',
                    a: 'โครงการของ ASAKAN อยู่ในทำเลรามคำแหง พหลโยธิน บางชัน และทำเลศักยภาพใกล้รถไฟฟ้าในกรุงเทพฯ',
                  },
                  {
                    q: 'คอนโด ASAKAN ราคาเริ่มต้นเท่าไหร่?',
                    a: 'ราคาเริ่มต้นอยู่ประมาณ 9 แสนบาท โดยราคาและขนาดห้องขึ้นอยู่กับแต่ละโครงการและโปรโมชั่นในช่วงเวลานั้น',
                  },
                  {
                    q: 'ติดต่อฝ่ายขาย ASAKAN ได้อย่างไร?',
                    a: 'ติดต่อฝ่ายขายได้ที่เบอร์ 082-526-5566, LINE Official @asakan หรือส่งข้อความผ่านแบบฟอร์มติดต่อบนเว็บไซต์',
                  },
                ].map((item) => (
                  <article key={item.q} className="bg-white border border-slate-200 rounded-lg p-5">
                    <h2 className="text-base font-bold text-[#1a2d6b] mb-2">{item.q}</h2>
                    <p className="text-sm leading-relaxed text-slate-600">{item.a}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </CollapsibleSection>

        {/* 10. FINAL CTA */}
        <section className="py-14 bg-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-6">

            {/* Heading */}
            <div className="text-center mb-10">
              <p className="text-[#e53935] font-bold text-xs uppercase tracking-[0.3em] mb-3">Start Your Journey</p>
              <h2 className="text-3xl md:text-4xl md:text-5xl font-black text-[#1a2d6b] tracking-tight mb-3">Ready to Find Your Dream Home?</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">
                ปรึกษาเรื่องกู้ ซื้อ หรือลงทุนคอนโดกับผู้เชี่ยวชาญจาก ASAKAN ได้ฟรี ไม่มีค่าใช้จ่าย
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* โทรศัพท์ */}
              <a
                href="tel:0825265566"
                className="group flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-4 hover:border-[#1a2d6b] hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#f0f4ff] flex items-center justify-center shrink-0 group-hover:bg-[#1a2d6b] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a2d6b] group-hover:text-white transition-colors"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.89 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.89 1.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">โทรหาเรา</p>
                  <p className="text-[#1a2d6b] font-bold text-sm">082-526-5566</p>
                </div>
              </a>

              {/* LINE */}
              <a
                href="https://line.me/ti/p/~@asakan"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-4 hover:border-[#00c300] hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#f0fff0] flex items-center justify-center shrink-0 group-hover:bg-[#00c300] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="text-[#00c300] group-hover:text-white transition-colors">
                    <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">LINE Official</p>
                  <p className="text-[#1a2d6b] font-bold text-sm">@asakan</p>
                </div>
              </a>

              {/* ติดต่อออนไลน์ */}
              <Link
                href="/contact"
                className="group flex items-center gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-4 hover:border-[#e53935] hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#e53935] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e53935] group-hover:text-white transition-colors"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase tracking-wider mb-0.5">ส่งข้อความ</p>
                  <p className="text-[#1a2d6b] font-bold text-sm">ติดต่อโครงการ</p>
                </div>
              </Link>
            </div>

          </div>
        </section>

        {/* 11. EMOTIONAL BRAND SECTION */}
        <section className="relative overflow-hidden bg-white">
          <div className="relative min-h-[335px] md:min-h-[430px] xl:min-h-[470px] flex items-start justify-center">
            <Image
              src="https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&q=85&w=2200"
              alt="ครอบครัวใช้เวลาร่วมกันในบ้าน"
              fill
              sizes="100vw"
              className="object-cover object-center md:object-[center_42%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/96 via-white/55 to-white/6" />
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white via-white/85 to-white/0" />
            <div className="absolute inset-x-0 top-10 h-52 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.72)_38%,rgba(255,255,255,0)_72%)]" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16 md:pt-24 text-center">
              <p className="text-[#e53935] font-black text-xs uppercase tracking-[0.35em] mb-4 [text-shadow:0_1px_0_rgba(255,255,255,0.9)]">Your Happiness Is Our Hope</p>
              <h2 className="text-4xl md:text-6xl font-black text-[#1a2d6b] tracking-tight mb-4 [text-shadow:0_2px_16px_rgba(255,255,255,0.95)]">
                FREEDOM OF LIFE
              </h2>
              <p className="text-[#1a2d6b] font-medium text-base md:text-xl leading-relaxed max-w-2xl mx-auto [text-shadow:0_1px_12px_rgba(255,255,255,0.95)]">
                อัสสกาญจน์เชื่อว่า บ้านที่ดีไม่ได้เป็นเพียงที่อยู่อาศัย แต่เป็นพื้นที่ให้ทุกคนได้ใช้ชีวิตในแบบของตัวเอง
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
