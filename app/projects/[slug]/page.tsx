import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import Footer from '@/components/Footer';
import PixelViewContent from '@/components/PixelViewContent';
import ProjectNavbar from '@/components/projects/ProjectNavbar';
import ProjectContent from '@/components/projects/ProjectContent';
import dynamic from 'next/dynamic';
import RegisterFormDark from '@/components/projects/RegisterFormDark';
import ProjectPixel from '@/components/ProjectPixel';
import ProjectPopup from '@/components/ProjectPopup';

interface Project {
  id?: string;
  slug: string;
  name: string;
  nameEn?: string;
  status: string;
  type: string;           // 📍 ตัวนี้แหละที่ Vercel ฟ้องว่าหายไป!
  floors?: number;
  units?: number;
  priceMin: number;
  priceMax?: number;
  location: string;
  bts: string;
  concept: string;
  conceptArticle?: string; // 📍 รองรับบทความที่เราเพิ่งเพิ่ม
  projectArea?: string;    // 📍 รองรับพื้นที่โครงการ
  parking?: string;        // 📍 รองรับที่จอดรถ
  description: string;
  descriptionEn?: string;
  features: string[];
  image: string;
  heroImage?: string;
  promoBanner?: string;
  promoBannerMobile?: string;
  fbPixelId?: string;
  facebookUrl?: string;
  phone?: string;
  popupImage?: string;
  popupUrl?: string;
  gallery?: string[];
  floorPlans?: string[];
  roomPlans?: { type: string; image: string }[];
  googleMapUrl?: string;
  isFeatured?: boolean;
  isSoldOut?: boolean;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabaseAdmin.from('projects').select('name').eq('slug', slug).single();
  if (!data) return { title: 'Not Found' };
  return { title: `${data.name} | ASAKAN` };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data } = await supabaseAdmin.from('projects').select('*').eq('slug', slug).single();
  if (!data) notFound();
  const project: Project = {
    ...data,
    nameEn: data.name_en,
    priceMin: data.price_min,
    priceMax: data.price_max,
    conceptArticle: data.concept_article,
    projectArea: data.project_area,
    descriptionEn: data.description_en,
    heroImage: data.hero_image,
    promoBanner: data.promo_banner,
    promoBannerMobile: data.promo_banner_mobile,
    fbPixelId: data.fb_pixel_id || '',
    facebookUrl: data.facebook_url || '',
    phone: data.phone || '',
    popupImage: data.popup_image || '',
    popupUrl: data.popup_url || '',
    floorPlans: data.floor_plans,
    roomPlans: data.room_plans,
    googleMapUrl: data.google_map_url,
    isFeatured: true,
    isSoldOut: data.status === 'sold-out',
  };

  // --- 📍 เลือกว่าจะใช้ Custom Hero ตัวไหน ---
  let HeroSection = null;

  if (slug.includes('elysium')) {
    const ElysiumCustom = dynamic(() => import('@/components/projects/custom/ElysiumCustom'));
    HeroSection = <ElysiumCustom project={project} />;
  } 
  else if (slug === 'the-celine-bang-chan') {
    const CelineCustom = dynamic(() => import('@/components/projects/custom/CelineCustom'));
    HeroSection = <CelineCustom project={project} />;
  }
  else if (slug.includes('wela')) {
    const WelaCustom = dynamic(() => import('@/components/projects/custom/WelaCustom'));
    HeroSection = <WelaCustom project={project} />;
  }

  return (
    <>
      <PixelViewContent name={project.name} value={project.priceMin} />
      {project.fbPixelId && (
        <ProjectPixel pixelId={project.fbPixelId} projectName={project.name} priceMin={project.priceMin} />
      )}
      {project.popupImage && (
        <ProjectPopup image={project.popupImage} url={project.popupUrl} projectSlug={project.slug} />
      )}
      <ProjectNavbar project={project} />

      <main className="bg-white pt-16 md:pt-20">
        
        {/* 📍 แสดงผล Hero ตรงๆ เลย (ให้ตัว Custom จัดการรูปโปรโมชั่นของมันเอง) */}
        {HeroSection ? (
          HeroSection
        ) : (
          <section className="relative min-h-[90vh] flex flex-col lg:flex-row bg-[#1a2d6b]">
            
            {/* ฝั่งซ้าย: โชว์แบนเนอร์โปร หรือ โชว์ภาพปกติสำหรับโครงการอื่นๆ */}
            {project.promoBanner ? (
              <div className="relative w-full lg:w-2/3 h-[50vh] lg:h-auto bg-[#0d1838] flex items-center justify-center p-4">
                <img 
                  src={project.promoBanner} 
                  className="w-full h-full object-contain md:object-cover rounded-xl shadow-2xl" 
                  alt={`Promotion for ${project.name}`} 
                />
              </div>
            ) : (
              <div className="relative w-full lg:w-2/3 h-[50vh] lg:h-auto overflow-hidden bg-black">
                <img src={project.heroImage || project.image} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" alt={project.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2d6b] via-transparent to-transparent" />
                <div className="absolute bottom-10 left-8 md:left-12 text-white z-10 max-w-xl">
                  <p className="text-[#e53935] font-black tracking-widest text-sm mb-2 uppercase">{project.type}</p>
                  <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight mb-2">{project.name}</h1>
                  <p className="text-lg md:text-xl font-light text-white/80">{project.concept}</p>
                </div>
              </div>
            )}

            {/* ฝั่งขวา: ฟอร์มลงทะเบียน (คงอยู่เสมอ ไม่โดนทับอีกต่อไป!) */}
            <div id="register" className="w-full lg:w-1/3 bg-[#1a2d6b] p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white border-l border-white/10">
              <div className="mb-8">
                <h3 className="text-3xl font-black italic uppercase mb-2">Register Now</h3>
                <p className="text-white/60 text-xs tracking-widest uppercase">ลงทะเบียนรับสิทธิพิเศษ {project.name}</p>
              </div>
              <RegisterFormDark projectName={project.name} />
            </div>
          </section>
        )}

        <ProjectContent project={project} />

      </main>
      <Footer />
    </>
  );
}