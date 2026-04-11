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
import FloatingProjectCTA from '@/components/projects/FloatingProjectCTA';
import type { Metadata } from 'next';

export async function getProjectMetadata(slug: string): Promise<Metadata> {
  const { data } = await supabaseAdmin
    .from('projects')
    .select('name, description, price_min, location, meta_title, meta_description, meta_keywords, image')
    .eq('slug', slug)
    .single();
  if (!data) return { title: 'Not Found' };

  const title = data.meta_title || `${data.name} | คอนโดมิเนียม ASAKAN`;
  const description =
    data.meta_description ||
    (data.description
      ? data.description.slice(0, 160)
      : `${data.name} คอนโดมิเนียมคุณภาพจาก ASAKAN ย่าน${data.location || ''} ราคาเริ่มต้น ${data.price_min ? (data.price_min / 1000000).toFixed(2) + ' ล้านบาท' : ''}`);
  const keywords =
    data.meta_keywords || `${data.name}, ASAKAN, คอนโด, คอนโดมิเนียม, ${data.location || ''}, อสังหาริมทรัพย์`;

  return {
    title,
    description,
    keywords,
    openGraph: { title, description, images: data.image ? [{ url: data.image }] : [], type: 'website' },
    twitter: { card: 'summary_large_image', title, description, images: data.image ? [data.image] : [] },
  };
}

export async function renderProjectPage(slug: string) {
  const { data } = await supabaseAdmin.from('projects').select('*').eq('slug', slug).single();
  if (!data) notFound();

  const project = {
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
    lineUrl: data.line_url || '',
    phone: data.phone || '',
    popupImage: data.popup_image || '',
    popupUrl: data.popup_url || '',
    videoUrl: data.video_url || '',
    floorPlans: data.floor_plans,
    roomPlans: data.room_plans,
    googleMapUrl: data.google_map_url,
    isFeatured: true,
    isSoldOut: data.status === 'sold-out',
  };

  let HeroSection = null;
  if (slug.includes('elysium')) {
    const ElysiumCustom = dynamic(() => import('@/components/projects/custom/ElysiumCustom'));
    HeroSection = <ElysiumCustom project={project} />;
  } else if (slug === 'the-celine-bang-chan') {
    const CelineCustom = dynamic(() => import('@/components/projects/custom/CelineCustom'));
    HeroSection = <CelineCustom project={project} />;
  } else if (slug.includes('wela')) {
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
      <FloatingProjectCTA phone={project.phone} lineUrl={project.lineUrl} facebookUrl={project.facebookUrl} />

      <main className="bg-white pt-16 md:pt-20">
        {HeroSection ? (
          HeroSection
        ) : (
          <section className="relative min-h-[90vh] flex flex-col lg:flex-row bg-[#1a2d6b]">
            {project.promoBanner ? (
              <div className="relative w-full lg:w-2/3 h-[50vh] lg:h-auto bg-[#0d1838] flex items-center justify-center p-4">
                <img src={project.promoBanner} className="w-full h-full object-contain md:object-cover rounded-xl shadow-2xl" alt={`Promotion for ${project.name}`} />
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
