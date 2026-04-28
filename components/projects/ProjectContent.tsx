'use client';

import { useState, useEffect, useCallback } from 'react';
import NextImage from 'next/image';
import { MapPin, Maximize2, X, ChevronLeft, ChevronRight, LayoutDashboard, Image as ImageIcon, Building2, Home, Sparkles, PlayCircle, ChevronDown, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Montserrat } from 'next/font/google';
import CollapsibleSection from '@/components/home/CollapsibleSection';

const mont = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700', '800'], display: 'swap' });
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

interface RoomPlan {
  type: string;
  image: string;
}

interface FacilityItem {
  name: string;
  icon?: string;
}

type GalleryTab = 'perspective' | 'facility' | 'room';
type GalleryGroup = {
  label: string;
  images: string[];
};
type GalleryTabData = string[] | GalleryGroup[];
type GalleryData = string[] | Partial<Record<GalleryTab, GalleryTabData>>;

interface ProjectContentData {
  name: string;
  image?: string;
  gallery?: GalleryData;
  bts?: string;
  concept?: string;
  conceptArticle?: string;
  conceptImage?: string;
  description?: string;
  features?: string[];
  facilities?: FacilityItem[];
  floors?: number | string;
  googleMapUrl?: string;
  location?: string;
  parking?: string;
  priceMin?: number;
  projectArea?: string;
  roomPlans?: RoomPlan[];
  floorPlans?: string[];
  type?: string;
  units?: number | string;
  videoUrl?: string;
}

function isGalleryGroupArray(value: GalleryTabData | undefined): value is GalleryGroup[] {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && 'images' in value[0];
}

function buildFaqs(project: ProjectContentData) {
  const faqs: { q: string; a: string }[] = [];
  const name = project.name || 'โครงการนี้';
  const price = project.priceMin ? `${(project.priceMin / 1000000).toFixed(2)} ล้านบาท` : null;

  if (project.bts || project.location) {
    faqs.push({
      q: `${name} ตั้งอยู่ในทำเลที่เดินทางสะดวกและใกล้แหล่งไลฟ์สไตล์หรือไม่?`,
      a: `${name} ตั้งอยู่${project.location ? `ย่าน${project.location}` : ''} ${project.bts ? `ใกล้${project.bts}` : ''} เชื่อมต่อการเดินทางด้วยระบบรถไฟฟ้าได้อย่างสะดวก ใกล้ห้างสรรพสินค้า ร้านอาหาร และสิ่งอำนวยความสะดวกครบครัน`,
    });
  }

  const facilityNames = project.facilities?.map((f: { name: string }) => f.name).filter(Boolean).slice(0, 4).join(', ');
  const featureNames = project.features?.slice(0, 4).join(', ');
  const amenities = facilityNames || featureNames;
  if (amenities) {
    faqs.push({
      q: `สิ่งอำนวยความสะดวกส่วนกลางมีไฮไลต์อะไรบ้างที่แตกต่างจากที่อื่น?`,
      a: `${name} มีสิ่งอำนวยความสะดวกส่วนกลางที่โดดเด่น ได้แก่ ${amenities} และอื่นๆ อีกมากมาย ออกแบบมาเพื่อรองรับทุกไลฟ์สไตล์ของผู้อยู่อาศัย`,
    });
  }

  faqs.push({
    q: `อะไรคือเหตุผลสำคัญที่ควรเลือก ${name} เมื่อเทียบกับคอนโดอื่นๆในย่าน?`,
    a: `${name} โดย ASAKAN ผู้พัฒนาอสังหาริมทรัพย์กว่า 25 ปี มีจุดเด่นทั้งทำเลศักยภาพ คุณภาพการก่อสร้าง ราคาที่เข้าถึงได้ และบริการหลังการขายที่ดูแลระยะยาว`,
  });

  faqs.push({
    q: `ASAKAN มีระบบดูแลหลังการขายและระบบความปลอดภัยให้ลูกบ้านอย่างไร?`,
    a: `ASAKAN มีทีม AssetCare+ ดูแลหลังการโอนกรรมสิทธิ์ครบวงจร พร้อมระบบรักษาความปลอดภัย 24 ชั่วโมง กล้อง CCTV และ Key Card Access ทุกจุด`,
  });

  if (price) {
    faqs.push({
      q: `ศักยภาพการปล่อยเช่าและโอกาสในการเพิ่มมูลค่าของ${name}เป็นอย่างไร?`,
      a: `ด้วยทำเลใกล้รถไฟฟ้าและสิ่งอำนวยความสะดวกครบครัน ${name} มีศักยภาพในการปล่อยเช่าสูง ราคาเริ่มต้น${price} ถือเป็นการลงทุนที่คุ้มค่าในระยะยาว`,
    });
  }

  return faqs;
}

function ProjectFAQ({ project }: { project: ProjectContentData }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = buildFaqs(project);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section id="faq" className="bg-[#faf8f5] border-t border-[#e53935]/15">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CollapsibleSection label="คำถามที่พบบ่อย (FAQ)" alwaysCollapsible>
        <div className="py-16 md:py-20 max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* หัวข้อ */}
            <div className="lg:w-1/3 shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle size={20} className="text-[#e53935]" />
                <span className={`${mont.className} text-[10px] font-semibold tracking-[0.3em] uppercase text-[#e53935]`}>FAQ</span>
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold text-[#1a2d6b] leading-tight`}>
                คำถามที่พบบ่อย
              </h2>
              <div className="w-8 h-[2px] bg-[#e53935] mt-4 mb-4" />
              <p className="text-sm text-slate-500 leading-relaxed">
                รวมคำถามที่ลูกค้าถามบ่อยเกี่ยวกับ {project.name}
              </p>
            </div>

            {/* Accordion */}
            <div className="flex-1 space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl border border-[#e53935]/15 bg-white overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer hover:bg-[#faf8f5] transition-colors"
                  >
                    <span className="text-sm md:text-[15px] font-bold text-slate-700 pr-4 leading-snug">
                      <span className="text-[#e53935] mr-2 font-black">Q :</span>{faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180 text-[#e53935]' : 'text-slate-300'}`}
                    />
                  </button>
                  {openIdx === i && (
                    <div className="px-6 pb-5 text-sm text-slate-600 leading-7 border-t border-[#e53935]/15 pt-4">
                      <span className="text-[#1a2d6b] font-bold mr-2">A :</span>{faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </section>
  );
}

export default function ProjectContent({ project }: { project: ProjectContentData }) {
  // ==========================================
  // 📍 STATE สำหรับ GALLERY (เพิ่ม Tab หมวดหมู่)
  // ==========================================
  const [activeGalleryTab, setActiveGalleryTab] = useState<GalleryTab>('perspective');
  const [activeGalleryGroup, setActiveGalleryGroup] = useState(0);
  const [activeImg, setActiveImg] = useState(0);
  const [isGalleryFullscreen, setIsGalleryFullscreen] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [infoTab, setInfoTab] = useState<'concept' | 'factsheet' | 'facilities'>('concept');

  // ==========================================
  // 📍 STATE สำหรับ PLANS
  // ==========================================
  const [activeTab, setActiveTab] = useState<'room' | 'floor'>(
    (project.roomPlans?.length ?? 0) > 0 ? 'room' : 'floor'
  );
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const [isPlanFullscreen, setIsPlanFullscreen] = useState(false);

  // ==========================================
  // 📍 ระบบจัดการรูปพัง
  // ==========================================
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageError = (imgSrc: string) => {
  setTimeout(() => {
    setFailedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(imgSrc);
      return newSet;
    });
  }, 1000);
};

  // 📍 Logic การดึงรูป: แก้ไขให้ดึงจาก Object หมวดหมู่ได้แม่นยำขึ้น
  const getGalleryTabData = useCallback((): GalleryTabData => {
    if (!project.gallery) return [];
    
    // ถ้าข้อมูลเป็น Object แบ่งหมวดหมู่ (perspective, facility, room)
    if (typeof project.gallery === 'object' && !Array.isArray(project.gallery)) {
      return project.gallery[activeGalleryTab] || []; 
    }
    
    // ถ้าข้อมูลเป็น Array ปกติ (Fallback สำหรับโครงการอื่นๆ)
    return Array.isArray(project.gallery) ? project.gallery : [];
  }, [project.gallery, activeGalleryTab]);

  const currentGalleryTabData = getGalleryTabData();
  const currentGalleryGroups = isGalleryGroupArray(currentGalleryTabData) ? currentGalleryTabData : [];
  const safeActiveGalleryGroup = currentGalleryGroups.length > 0 && activeGalleryGroup >= currentGalleryGroups.length ? 0 : activeGalleryGroup;
  const currentRawGallery: string[] = currentGalleryGroups.length > 0
    ? currentGalleryGroups[safeActiveGalleryGroup]?.images || []
    : currentGalleryTabData as string[];
  
  // ปรับ Logic การกรอง: ให้รองรับรูปภาพที่กำลังโหลดได้ดีขึ้น
  const validGallery = currentRawGallery.filter(
  (img: string) => img && typeof img === 'string' && img.trim() !== ''
);
  const hasGallery = validGallery.length > 0;
  const validGalleryLength = validGallery.length;
  const safeActiveImg = activeImg >= validGallery.length ? 0 : activeImg;
  const fallbackImage = project.image || '/logo.png';
  
  // ถ้าไม่มีรูปในหมวดนั้นเลย ให้เอารูปหน้าปก (project.image) มาแสดงแก้ขัด
  const currentImage = hasGallery ? validGallery[safeActiveImg] : fallbackImage;

  const priceLabel = project.priceMin
    ? `เริ่มต้น ${(project.priceMin / 1000000).toFixed(2)} ล้านบาท*`
    : undefined;

  const projectFacts = [
    { label: 'ชื่อโครงการ', value: project.name },
    { label: 'ลักษณะโครงการ', value: [project.type, project.floors ? `${project.floors} ชั้น` : undefined].filter(Boolean).join(' ') },
    { label: 'ทำเลที่ตั้ง', value: project.location },
    { label: 'รถไฟฟ้าใกล้เคียง', value: project.bts },
    { label: 'จำนวนยูนิต', value: project.units ? `${project.units} ยูนิต` : undefined },
    { label: 'พื้นที่โครงการ', value: project.projectArea },
    { label: 'ที่จอดรถ', value: project.parking },
    { label: 'ราคา', value: priceLabel },
  ].filter((item) => item.value && String(item.value).trim() !== '');

  const facilityItems: FacilityItem[] = project.facilities?.length
    ? project.facilities.filter((facility) => facility.name?.trim())
    : (project.features || [])
      .filter((feature) => feature.trim() !== '')
      .map((name) => ({ name }));

  // ==========================================
  // 📍 ฟังก์ชันควบคุม
  // ==========================================
  const handleGalleryNext = useCallback(() => {
    if (validGalleryLength <= 1) return;
    setSlideDirection('right');
    setActiveImg((prev) => (prev + 1) % validGalleryLength);
  }, [validGalleryLength]);

  const handleGalleryPrev = useCallback(() => {
    if (validGalleryLength <= 1) return;
    setSlideDirection('left');
    setActiveImg((prev) => (prev - 1 + validGalleryLength) % validGalleryLength);
  }, [validGalleryLength]);

  const handlePlanNext = useCallback(() => {
    const arr = activeTab === 'room' ? project.roomPlans : project.floorPlans;
    if (!arr || arr.length <= 1) return;
    setActivePlanIndex((prev) => (prev + 1) % arr.length);
  }, [activeTab, project.roomPlans, project.floorPlans]);

  const handlePlanPrev = useCallback(() => {
    const arr = activeTab === 'room' ? project.roomPlans : project.floorPlans;
    if (!arr || arr.length <= 1) return;
    setActivePlanIndex((prev) => (prev - 1 + arr.length) % arr.length);
  }, [activeTab, project.roomPlans, project.floorPlans]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGalleryFullscreen) {
        if (e.key === 'Escape') setIsGalleryFullscreen(false);
        if (e.key === 'ArrowRight') handleGalleryNext();
        if (e.key === 'ArrowLeft') handleGalleryPrev();
      }
      if (isPlanFullscreen) {
        if (e.key === 'Escape') setIsPlanFullscreen(false);
        if (e.key === 'ArrowRight') handlePlanNext();
        if (e.key === 'ArrowLeft') handlePlanPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryFullscreen, isPlanFullscreen, handleGalleryNext, handleGalleryPrev, handlePlanNext, handlePlanPrev]);

  // ระบบ Swipe สำหรับมือถือ
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onGalleryTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleGalleryNext();
    if (distance < -minSwipeDistance) handleGalleryPrev();
  };

  const onPlanTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handlePlanNext();
    if (distance < -minSwipeDistance) handlePlanPrev();
  };

  return (
    <div className="bg-white">
      
      {/* ==========================================
          📍 FULLSCREEN MODAL สำหรับ GALLERY
      ========================================== */}
      {isGalleryFullscreen && (
        <div className="fixed inset-0 z-[70] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-xl animate-in fade-in duration-300">
          <button 
            onClick={() => setIsGalleryFullscreen(false)} 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-[#e53935] p-3 rounded-full z-50"
          >
            <X size={28} />
          </button>
          
          <div className="relative w-full max-w-7xl flex-1 flex items-center justify-center min-h-0 mb-6 group">
            {validGallery.length > 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); handleGalleryPrev(); }}
                className="absolute left-2 md:left-8 z-50 text-white bg-black/50 hover:bg-[#e53935] p-3 md:p-4 rounded-full transition-all backdrop-blur-md opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            <NextImage
  key={`fs-${currentImage}-${safeActiveImg}`}
  src={
    currentImage && !failedImages.has(currentImage)
      ? currentImage
      : fallbackImage
  }
  width={1600}
  height={1000}
  onError={() => handleImageError(currentImage)}
  className={`w-auto max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl select-none animate-in fade-in duration-300 ${
    slideDirection === 'right' ? 'slide-in-from-right-24' : 'slide-in-from-left-24'
  }`}
  alt="Fullscreen Gallery"
  onTouchStart={onTouchStart}
  onTouchMove={onTouchMove}
  onTouchEnd={onGalleryTouchEnd}
/>

            {validGallery.length > 1 && (
              <button 
                onClick={(e) => { e.stopPropagation(); handleGalleryNext(); }}
                className="absolute right-2 md:right-8 z-50 text-white bg-black/50 hover:bg-[#e53935] p-3 md:p-4 rounded-full transition-all backdrop-blur-md opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={32} />
              </button>
            )}
          </div>
          
          {hasGallery && (
            <div className="flex gap-2 md:gap-3 overflow-x-auto max-w-4xl px-4 pb-4 no-scrollbar">
              {validGallery.map((img: string, i: number) => (
  <div 
    key={`${activeGalleryTab}-${safeActiveGalleryGroup}-${img}`}
    onClick={() => setActiveImg(i)} 
    className={`w-16 h-12 md:w-24 md:h-16 shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
      safeActiveImg === i 
        ? 'border-[#e53935] opacity-100 scale-105 shadow-[0_0_15px_rgba(229,57,53,0.5)]' 
        : 'border-transparent opacity-40 hover:opacity-100'
    }`}
  >
    <NextImage
      src={
        img && !failedImages.has(img)
          ? img
          : fallbackImage
      }
      width={160}
      height={96}
      onError={() => handleImageError(img)}
      className="w-full h-full object-cover"
      alt={`Thumb ${i}`}
    />
  </div>
))}
            </div>
          )}
        </div>
      )}

      {/* ==========================================
          📍 FULLSCREEN MODAL สำหรับ แบบแปลน
      ========================================== */}
      {isPlanFullscreen && (
        <div className="fixed inset-0 z-[70] bg-white/95 flex flex-col items-center justify-center p-4 backdrop-blur-xl animate-in fade-in duration-300">
          <button 
            onClick={() => setIsPlanFullscreen(false)} 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-slate-400 hover:text-white transition-colors bg-slate-200 hover:bg-[#e53935] p-3 rounded-full z-50 shadow-sm"
          >
            <X size={28} />
          </button>
          
          <div className="relative w-full max-w-7xl flex-1 flex items-center justify-center min-h-0 mb-6 group">
            {((activeTab === 'room' && (project.roomPlans?.length ?? 0) > 1) || (activeTab === 'floor' && (project.floorPlans?.length ?? 0) > 1)) && (
              <button 
                onClick={(e) => { e.stopPropagation(); handlePlanPrev(); }}
                className="absolute left-2 md:left-8 z-50 text-slate-700 bg-white shadow-lg border border-slate-200 hover:bg-[#e53935] hover:text-white hover:border-[#e53935] p-3 md:p-4 rounded-full transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            <NextImage
              key={`plan-fs-${activeTab}-${activePlanIndex}`}
              src={(activeTab === 'room' ? project.roomPlans?.[activePlanIndex]?.image : project.floorPlans?.[activePlanIndex]) || fallbackImage}
              width={1600}
              height={1000}
              className="w-auto max-w-full max-h-[85vh] object-contain select-none animate-in fade-in zoom-in-95 duration-500" 
              alt="Fullscreen Plan"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onPlanTouchEnd}
            />

            {((activeTab === 'room' && (project.roomPlans?.length ?? 0) > 1) || (activeTab === 'floor' && (project.floorPlans?.length ?? 0) > 1)) && (
              <button 
                onClick={(e) => { e.stopPropagation(); handlePlanNext(); }}
                className="absolute right-2 md:right-8 z-50 text-slate-700 bg-white shadow-lg border border-slate-200 hover:bg-[#e53935] hover:text-white hover:border-[#e53935] p-3 md:p-4 rounded-full transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={32} />
              </button>
            )}
          </div>

          <div className="absolute bottom-6 md:bottom-10 bg-white/80 shadow-lg border border-slate-200 text-slate-800 px-6 py-3 rounded-full font-bold tracking-widest uppercase text-sm backdrop-blur-md">
            {activeTab === 'room' ? project.roomPlans?.[activePlanIndex]?.type : `Floor Plan ${activePlanIndex + 1}`}
          </div>
        </div>
      )}

      {/* =========================================
          PROJECT INFO
      ========================================= */}
      <section id="info" className="py-16 md:py-24 bg-[#faf8f5] border-b border-[#e53935]/15">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10"
          >
            <motion.div variants={fadeUp}>
              <span className={`text-[10px] font-semibold tracking-[0.35em] uppercase text-[#e53935]`}>
                ข้อมูลโครงการ
              </span>
              <div className="w-8 h-[2px] bg-[#e53935] mt-2 mb-3" />
              <h2 className={`${mont.className} text-3xl md:text-5xl font-bold text-[#1a2d6b] tracking-tight`}>
                Project Information
              </h2>
              <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-500 leading-relaxed">
                สรุปภาพรวมโครงการ ทั้ง Concept Information และ Facilities
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="inline-flex bg-white p-1.5 rounded-full shadow-sm border overflow-x-auto max-w-full no-scrollbar">
              {[
                { key: 'concept', label: 'แนวคิดโครงการ' },
                { key: 'factsheet', label: 'Factsheet' },
                { key: 'facilities', label: 'Facilities' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setInfoTab(tab.key as 'concept' | 'factsheet' | 'facilities')}
                  className={`min-w-fit rounded-full px-5 py-3 text-xs md:text-sm font-black transition-all whitespace-nowrap ${
                    infoTab === tab.key
                      ? 'bg-[#1a2d6b] text-white shadow-md'
                      : 'text-slate-500 hover:text-[#1a2d6b]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {infoTab === 'concept' && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="overflow-hidden rounded-2xl bg-[#1a2d6b] text-white shadow-lg"
            >
              <div className="flex flex-col lg:flex-row min-h-0">
                {/* รูป — ซ้าย */}
                <div className="relative w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:min-h-[420px] bg-[#0f1e4a] shrink-0">
                  {project.conceptImage ? (
                    <NextImage
                      src={project.conceptImage}
                      alt={`${project.name} concept`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover opacity-90"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm font-bold tracking-[0.2em] text-white/30">
                      CONCEPT IMAGE
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a2d6b]/20" />
                </div>

                {/* ข้อความ — ขวา */}
                <div className="flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-14 lg:w-1/2">
                  <div className="mb-5 w-10 h-[2px] bg-[#e53935]" />
                  <p className={`${mont.className} text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e53935] mb-3`}>
                    Concept
                  </p>
                  <h3 className={`text-2xl md:text-3xl font-bold leading-tight text-white`}>
                    {project.concept || project.name}
                  </h3>
                  <p className="mt-5 text-sm md:text-base leading-8 text-white/70 whitespace-pre-line">
                    {project.conceptArticle || project.description || 'รายละเอียดแนวคิดโครงการจะถูกแสดงจากข้อมูลที่ตั้งค่าในระบบ Admin'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {infoTab === 'factsheet' && (
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-[#e53935]/15 bg-white shadow-sm">
                <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-[#e53935]/10">
                  {projectFacts.map((item) => (
                    <div key={item.label} className="group p-5 hover:bg-[#faf8f5] transition-colors">
                      <span className={`text-[9px] font-semibold uppercase tracking-[0.2em] text-[#e53935] block mb-2`}>
                        {item.label}
                      </span>
                      <div className="text-base md:text-lg font-black text-[#1a2d6b] leading-snug">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {(project.roomPlans?.length ?? 0) > 0 && (
                <div className="bg-white border border-[#e53935]/15 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Home size={17} className="text-[#e53935]" />
                    <h3 className={`${mont.className} text-base font-semibold text-[#1a2d6b]`}>Room Types</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.roomPlans?.map((plan: RoomPlan, i: number) => (
                      <div key={i} className="flex items-center justify-between bg-[#faf8f5] rounded-xl px-4 py-3 border border-[#e53935]/15">
                        <span className="text-sm font-bold text-slate-700">{plan.type}</span>
                        <span className="text-xs text-[#e53935] font-semibold">→ Plans</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {infoTab === 'facilities' && (
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 bg-[#1a2d6b] text-white rounded-2xl p-7 md:p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#e53935] via-[#e8c98a] to-[#e53935]" />
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#e53935]/15 border border-[#e53935]/25 mb-6">
                  <Building2 size={24} className="text-[#e53935]" />
                </div>
                <h3 className={`${mont.className} text-2xl md:text-3xl font-bold leading-tight`}>Facilities</h3>
                <p className="mt-4 text-sm leading-7 text-white/60">
                  พื้นที่ส่วนกลางและบริการประจำโครงการ ออกแบบให้รองรับการพักผ่อน การดูแลสุขภาพ และชีวิตประจำวันได้ครบในที่เดียว
                </p>
              </div>

              <div className="lg:col-span-8">
                {facilityItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {facilityItems.map((facility, i) => (
                      <div key={`${facility.name}-${i}`} className="flex items-center gap-4 bg-white border border-[#e53935]/15 rounded-2xl p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-[#e53935]/30">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e53935]/10 border border-[#e53935]/20">
                          {facility.icon ? (
                            <NextImage src={facility.icon} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                          ) : (
                            <Sparkles size={18} className="text-[#e53935]" />
                          )}
                        </div>
                        <div className="text-sm font-bold text-slate-700">{facility.name}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-dashed border-[#e53935]/20 rounded-2xl p-10 text-center text-slate-400">
                    กำลังเตรียมข้อมูลสิ่งอำนวยความสะดวกเพิ่มเติม
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* =========================================
          📍 GALLERY SECTION (แยกหมวดหมู่)
      ========================================= */}
      <section id="gallery" className="py-24 bg-white border-b border-[#e53935]/10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-7xl mx-auto px-4 text-center mb-10"
        >
          <p className={`text-[10px] font-semibold tracking-[0.35em] uppercase text-[#e53935] mb-3`}>
            Photo Gallery
          </p>
          <div className="flex items-center justify-center gap-3 mb-4 text-[#1a2d6b]">
            <h2 className={`${mont.className} text-4xl md:text-5xl font-bold uppercase tracking-tight`}>Gallery</h2>
          </div>
          <div className="w-12 h-[2px] bg-[#e53935] mx-auto mb-8" />

          {/* 📍 แถบเลือกหมวดหมู่ Perspective / Facility / Room */}
          {/* แก้ไข Logic การแสดงผล Tab: ตรวจสอบข้อมูล gallery ให้ถูกต้องสำหรับทุกโครงการ */}
          {project.gallery && !Array.isArray(project.gallery) && typeof project.gallery === 'object' && (
            <div className="inline-flex bg-white p-1.5 rounded-full shadow-sm border overflow-x-auto max-w-full no-scrollbar">
              <button
                onClick={() => { setActiveGalleryTab('perspective'); setActiveGalleryGroup(0); setActiveImg(0); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase transition-all whitespace-nowrap ${activeGalleryTab === 'perspective' ? 'bg-[#1a2d6b] text-white shadow-md' : 'text-slate-500 hover:text-[#1a2d6b]'}`}
              >
                <Sparkles size={14} /> Perspective
              </button>
              <button
                onClick={() => { setActiveGalleryTab('facility'); setActiveGalleryGroup(0); setActiveImg(0); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase transition-all whitespace-nowrap ${activeGalleryTab === 'facility' ? 'bg-[#1a2d6b] text-white shadow-md' : 'text-slate-500 hover:text-[#1a2d6b]'}`}
              >
                <Building2 size={14} /> Facility
              </button>
              <button
                onClick={() => { setActiveGalleryTab('room'); setActiveGalleryGroup(0); setActiveImg(0); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase transition-all whitespace-nowrap ${activeGalleryTab === 'room' ? 'bg-[#1a2d6b] text-white shadow-md' : 'text-slate-500 hover:text-[#1a2d6b]'}`}
              >
                <Home size={14} /> Room
              </button>
            </div>
          )}
          {currentGalleryGroups.length > 0 && (
            <div className="mt-5 flex justify-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {currentGalleryGroups.map((group, index) => (
                <button
                  key={group.label}
                  onClick={() => { setActiveGalleryGroup(index); setActiveImg(0); }}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-all ${
                    safeActiveGalleryGroup === index
                      ? 'border-[#e53935] bg-[#e53935] text-white shadow-md shadow-[#e53935]/20'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-[#1a2d6b]/30 hover:text-[#1a2d6b]'
                  }`}
                >
                  {group.label}
                </button>
              ))}
            </div>
          )}
        </motion.div>
        
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 mb-6 shadow-xl border group"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onGalleryTouchEnd}
          >
            {/* Main image — click center to fullscreen */}
            <NextImage
              key={`main-${currentImage}-${safeActiveImg}`}
              src={failedImages.has(currentImage) ? fallbackImage : currentImage}
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              onError={() => handleImageError(currentImage)}
              onClick={() => setIsGalleryFullscreen(true)}
              className={`w-full h-full object-cover cursor-pointer animate-in fade-in duration-300 ${
                slideDirection === 'right' ? 'slide-in-from-right-10' : 'slide-in-from-left-10'
              }`}
              alt="Gallery Main"
            />

            {/* Prev button */}
            {validGallery.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleGalleryPrev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#e53935] text-white p-2.5 md:p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Next button */}
            {validGallery.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleGalleryNext(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#e53935] text-white p-2.5 md:p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* Image counter */}
            {validGallery.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                {safeActiveImg + 1} / {validGallery.length}
              </div>
            )}

            {/* Fullscreen button */}
            <button
              onClick={() => setIsGalleryFullscreen(true)}
              className="absolute top-3 right-3 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all"
            >
              <Maximize2 size={18} />
            </button>
          </div>

          {hasGallery ? (
            <div className="flex justify-center md:justify-start lg:justify-center gap-3 overflow-x-auto pb-4 no-scrollbar snap-x">
              {validGallery.map((img: string, i: number) => (
                <div 
                  // 📍 แก้ไข Key ที่ Thumbnail: บังคับ Re-render เมื่อสลับหมวด
                  key={`${activeGalleryTab}-${safeActiveGalleryGroup}-${img}`}
                  onClick={() => setActiveImg(i)} 
                  className={`relative w-28 md:w-40 aspect-video shrink-0 rounded-xl overflow-hidden cursor-pointer border-[3px] transition-all duration-300 snap-center ${safeActiveImg === i ? 'border-[#e53935] scale-100 opacity-100 shadow-md' : 'border-transparent scale-95 opacity-60 hover:opacity-100 hover:scale-100'}`}
                >
                  <NextImage
  src={failedImages.has(img) ? fallbackImage : img}
  fill
  sizes="160px"
  onError={() => handleImageError(img)}
  className="w-full h-full object-cover" 
  alt={`Thumb ${i}`} 
/>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full py-12 flex flex-col items-center justify-center text-slate-400 italic bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <ImageIcon size={48} className="opacity-20 mb-2" />
                กำลังเตรียมรูปภาพเพิ่มเติมในหมวดนี้...
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          📍 PLANS SECTION
      ========================================= */}
      {((project.floorPlans?.length ?? 0) > 0 || (project.roomPlans?.length ?? 0) > 0) && (
        <section id="plans" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4 text-[#1a2d6b]">
                <LayoutDashboard size={36} />
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tight">แบบแปลน</h2>
              </div>
              <p className="text-slate-500 mb-10 text-lg">สัมผัสการออกแบบพื้นที่ใช้สอยที่ตอบโจทย์ชีวิตคนเมือง</p>
              
              <div className="inline-flex bg-white p-1.5 rounded-full shadow-sm border overflow-x-auto max-w-full hide-scrollbar">
                {(project.roomPlans?.length ?? 0) > 0 && (
                  <button 
                    onClick={() => { setActiveTab('room'); setActivePlanIndex(0); }}
                    className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap ${activeTab === 'room' ? 'bg-[#1a2d6b] text-white shadow-md' : 'text-slate-500 hover:text-[#1a2d6b]'}`}
                  >
                    Room Plans
                  </button>
                )}
                {(project.floorPlans?.length ?? 0) > 0 && (
                  <button 
                    onClick={() => { setActiveTab('floor'); setActivePlanIndex(0); }}
                    className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap ${activeTab === 'floor' ? 'bg-[#1a2d6b] text-white shadow-md' : 'text-slate-500 hover:text-[#1a2d6b]'}`}
                  >
                    Floor & Master 
                  </button>
                )}
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
                {activeTab === 'room' && project.roomPlans?.map((plan: RoomPlan, idx: number) => (
                  <button
                    key={`room-btn-${idx}`}
                    onClick={() => setActivePlanIndex(idx)}
                    className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                      activePlanIndex === idx 
                        ? 'bg-[#e53935] text-white shadow-lg shadow-[#e53935]/30 scale-105' 
                        : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-[#1a2d6b]'
                    }`}
                  >
                    {plan.type}
                  </button>
                ))}

                {activeTab === 'floor' && project.floorPlans?.map((_, idx: number) => (
                  <button
                    key={`floor-btn-${idx}`}
                    onClick={() => setActivePlanIndex(idx)}
                    className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                      activePlanIndex === idx 
                        ? 'bg-[#e53935] text-white shadow-lg shadow-[#e53935]/30 scale-105' 
                        : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-[#1a2d6b]'
                    }`}
                  >
                    Plan {idx + 1}
                  </button>
                ))}
              </div>

              <div 
                className="relative flex justify-center items-center cursor-pointer group min-h-[400px] md:min-h-[60vh] w-full"
                onClick={() => setIsPlanFullscreen(true)}
              >
                {activeTab === 'room' && project.roomPlans?.[activePlanIndex] && (
                  <NextImage
                    key={`room-img-${activePlanIndex}`}
                    src={project.roomPlans[activePlanIndex].image} 
                    alt={project.roomPlans[activePlanIndex].type}
                    width={1400}
                    height={1000}
                    className="w-full h-auto max-h-[80vh] object-contain animate-in fade-in zoom-in-95 duration-500 mix-blend-multiply" 
                  />
                )}

                {activeTab === 'floor' && project.floorPlans?.[activePlanIndex] && (
                  <NextImage
                    key={`floor-img-${activePlanIndex}`}
                    src={project.floorPlans[activePlanIndex]} 
                    alt={`Floor Plan ${activePlanIndex + 1}`}
                    width={1400}
                    height={1000}
                    className="w-full h-auto max-h-[80vh] object-contain animate-in fade-in zoom-in-95 duration-500 mix-blend-multiply" 
                  />
                )}

                <div className="absolute inset-0 bg-[#1a2d6b]/0 group-hover:bg-[#1a2d6b]/5 transition-colors duration-300 flex items-center justify-center rounded-3xl pointer-events-none">
                  <div className="bg-[#1a2d6b] text-white p-4 md:p-5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100 shadow-xl pointer-events-auto shadow-[#1a2d6b]/30">
                    <Maximize2 size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================
          📍 3. VIDEO SECTION
      ========================================= */}
      {project.videoUrl && (
        <section id="video" className="py-16 md:py-24 bg-[#0f1e4a]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4 text-white">
                <PlayCircle size={32} />
                <h2 className={`${mont.className} text-4xl md:text-5xl font-black uppercase tracking-tight`}>Video</h2>
              </div>
              <div className="w-16 h-1 bg-[#e53935] mx-auto rounded-full" />
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
              <iframe
                src={project.videoUrl}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${project.name} Video`}
              />
            </div>
          </div>
        </section>
      )}

      {/* =========================================
          📍 FAQ SECTION
      ========================================= */}
      <ProjectFAQ project={project} />

      {/* =========================================
          📍 4. LOCATION & MAP SECTION
      ========================================= */}
      {project.googleMapUrl && (
        <section id="location" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-[#1a2d6b]">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin size={32} />
                  <h2 className={`${mont.className} text-3xl md:text-4xl font-black uppercase tracking-tight`}>Location</h2>
                </div>
                <p className="text-lg text-slate-500 max-w-2xl">
                  {project.location} {project.bts ? `(${project.bts})` : ''}
                </p>
              </div>
              
              <a 
                href={project.googleMapUrl.replace('/embed', '')}
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#1a2d6b] text-white px-6 py-3 rounded-full font-bold hover:bg-[#e53935] transition-colors whitespace-nowrap shadow-lg shadow-blue-900/20 active:scale-95"
              >
                ดูแผนที่ Google Maps <ChevronRight size={18} />
              </a>
            </div>

            <div className="w-full h-[400px] md:h-[600px] bg-slate-100 rounded-[2rem] overflow-hidden shadow-inner border border-slate-200 relative group">
               {project.googleMapUrl.includes('embed') ? (
                 <iframe 
                    src={project.googleMapUrl} 
                    className="absolute inset-0 w-full h-full border-0" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map Location"
                  />
               ) : (
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-50">
                    <MapPin size={48} className="text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium mb-4">กรุณาใช้ URL แบบ Embed ในไฟล์ JSON เพื่อแสดงแผนที่ตรงนี้</p>
                    <a 
                      href={project.googleMapUrl} 
                      target="_blank" 
                      className="text-[#e53935] font-bold underline"
                    >
                      คลิกเพื่อดูแผนที่บน Google Maps
                    </a>
                 </div>
               )}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
