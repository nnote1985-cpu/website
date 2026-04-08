import type { Metadata } from 'next';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import ProjectCard from '@/components/home/ProjectCard';
import NewsCard from '@/components/home/NewsCard';
import MortgageCalculator from '@/components/home/MortgageCalculator';
import { ArrowRight, Shield, Star, Home, TrendingUp } from 'lucide-react';
import FloatingCTA from '@/components/FloatingCTA';
import SearchSection from '@/components/home/SearchSection';
import PromoBanner from '@/components/home/PromoBanner';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'ASAKAN | คอนโดมิเนียมคุณภาพ ราคาเข้าถึงได้ กรุงเทพฯ',
  description: 'ASAKAN ผู้พัฒนาอสังหาริมทรัพย์ชั้นนำ กว่า 21 ปี คอนโดมิเนียมคุณภาพสูง ราคาเริ่มต้น 1.21 ล้านบาท ย่านรามคำแหง พหลโยธิน กรุงเทพฯ',
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
  const activePromo = promotions.find((p) => p.isActive);

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

        {/* 2. PROMOTION BANNER - แถบโปรโมชั่น */}
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            <div className="text-center mt-12 md:hidden">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-white border-2 border-slate-900 text-slate-900 font-bold px-10 py-4 rounded-xl"
              >
                ดูโครงการทั้งหมด <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. TRUST SECTION - Redesign ให้ดูแพงและมีลูกเล่น */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* ฝั่งซ้าย: หัวข้อและคำโปรย (Sticky on scroll) */}
              <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                {/* 📍 เปลี่ยนขีดตกแต่งและไฮไลต์เป็นสีแดง */}
                <div className="w-12 h-1 bg-[#e53935] mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1] mb-6">
                  Why <br />
                  <span className="text-[#e53935]">ASAKAN?</span>
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  กว่า 21 ปีที่เราสร้างสรรค์ที่อยู่อาศัยบนมาตรฐานความคุ้มค่าและความมั่นคง 
                  เพื่อส่งมอบคุณภาพชีวิตที่ดีที่สุดให้กับคุณ
                </p>
                <div className="hidden lg:block w-full h-[1px] bg-slate-100" />
              </div>

              {/* ฝั่งขวา: รายการจุดเด่นในรูปแบบ Modern Grid */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {[
                  { icon: <Home size={32} strokeWidth={1.5} />, title: '2,500+ Units Delivered', desc: 'ความไว้วางใจจากครอบครัวอาซากันที่ส่งมอบแล้วทั่วกรุงเทพฯ' },
                  { icon: <Star size={32} strokeWidth={1.5} />, title: 'Premium Quality', desc: 'คัดสรรวัสดุมาตรฐานสากล พร้อมทีมงานตรวจรับมอบมืออาชีพ' },
                  { icon: <Shield size={32} strokeWidth={1.5} />, title: '21 Years Heritage', desc: 'รากฐานที่แข็งแกร่งและประสบการณ์ที่สั่งสมมายาวนานอย่างยั่งยืน' },
                  { icon: <TrendingUp size={32} strokeWidth={1.5} />, title: 'Prime Location', desc: 'เน้นทำเลศักยภาพใกล้รถไฟฟ้า เพื่อการอยู่อาศัยและการลงทุน' },
                ].map((item, index) => (
                  <div key={item.title} className="group relative p-8 rounded-3xl transition-all duration-500 hover:bg-slate-50 border border-transparent hover:border-slate-100 hover:shadow-xl hover:shadow-slate-200/50">
                    {/* Index Number จางๆ ด้านหลัง 📍 เปลี่ยน Hover เป็นสีแดง */}
                    <span className="absolute top-6 right-8 text-5xl font-bold text-slate-100/50 group-hover:text-[#e53935]/10 transition-colors duration-500">
                      0{index + 1}
                    </span>
                    
                    {/* Icon Box 📍 เปลี่ยน Hover เป็นสีแดง */}
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#e53935] group-hover:shadow-md transition-all duration-500 mb-6">
                      {item.icon}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#e53935] transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-500 text-sm leading-relaxed pr-4">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* 6. SERVICES - บริการเสริม */}
        <section className="py-24 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              {/* 📍 เปลี่ยนเป็นสีแดง */}
              <p className="text-[#e53935] font-bold text-xs uppercase tracking-[0.3em] mb-3">Service & Care</p>
              <h2 className="text-4xl font-bold text-white">ครบจบในที่เดียว</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'ซื้อคอนโดมิเนียม', desc: 'โครงการคุณภาพในทำเลศักยภาพ ราคาเริ่มต้น 1.21 ล้านบาท พร้อมส่วนกลางครบครัน', href: '/projects', cta: 'ดูโครงการ' },
                { title: 'ASAKAN AssetCare+', desc: 'บริการบริหารการปล่อยเช่าแบบครบวงจร ให้คุณมีรายได้ Passive Income โดยไม่ต้องกังวล', href: '/assetcare', cta: 'เรียนรู้เพิ่มเติม' },
                { title: 'สมาชิก ASAKAN', desc: 'สิทธิพิเศษสำหรับเจ้าของห้อง ประกันอุบัติเหตุ ส่วนลดซื้อห้องถัดไป และรางวัลแนะนำเพื่อน', href: '/member', cta: 'สมัครสมาชิก' },
              ].map((service) => (
                <div key={service.title} className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all group">
                  <h3 className="font-bold text-white text-2xl mb-4">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">{service.desc}</p>
                  <Link
                    href={service.href}
                    // 📍 เปลี่ยนเป็นสีแดง
                    className="inline-flex items-center gap-2 text-[#e53935] font-bold text-sm group-hover:gap-4 transition-all uppercase tracking-widest"
                  >
                    {service.cta} <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. OTHER TOOLS */}
        <div className="bg-slate-50 py-12">
          <MortgageCalculator />
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {latestNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 9. FINAL CTA - เน้นสีน้ำเงินและปุ่มแดง (10%) */}
        <section className="py-24 relative overflow-hidden bg-[#1a2d6b]">
          {/* Flare Effects (คงไว้ครบ) */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10">
            <span className="text-white/40 uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
              Start Your Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Find Your Dream Home?</h2>
            <p className="text-white/60 text-lg mb-12 font-light max-w-2xl mx-auto">
              ปรึกษาเรื่องกู้ ซื้อ หรือลงทุนคอนโดกับผู้เชี่ยวชาญจาก ASAKAN ได้ฟรี ไม่มีค่าใช้จ่าย พร้อมรับข้อเสนอสุดพิเศษวันนี้
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link 
                href="/contact" 
                className="w-full sm:w-auto bg-[#e53935] text-white font-bold px-10 py-4 rounded-full hover:bg-white hover:text-[#e53935] transition-all duration-300 shadow-xl text-[15px] tracking-wide"
              >
                ติดต่อโครงการ
              </Link>
              
              <a 
                href="https://line.me/ti/p/~@asakan" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full sm:w-auto border border-white/20 text-white font-bold px-10 py-4 rounded-full hover:bg-white/10 transition-all text-[15px] flex items-center justify-center gap-3 tracking-wide"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" /></svg>
                ทัก LINE ปรึกษาฟรี
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}