'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import NextImage, { getImageProps } from 'next/image';
import SkeletonImage from '@/components/SkeletonImage';
import { MapPin, Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon, Building2, Home, Sparkles, Play, ChevronDown, Layers, TrainFront, DoorOpen, LandPlot, Car, Tag, ArrowRight } from 'lucide-react';
import { projectFont, projectThaiFont } from './projectFonts';
import './project-editorial.css';
import { ProjectSurroundings, ProjectProgress } from './ProjectSurroundings';

const GALLERY_STAGE_SIZES = '(min-width: 1440px) 1320px, 94vw';



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
  projectSections?: unknown;
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
  floorPlanNames?: string[];
  type?: string;
  units?: number | string;
  videoUrl?: string;
}

type VideoItem = { title: string; url: string };

function parseVideos(raw: string | undefined): VideoItem[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr.filter((v: VideoItem) => v?.url);
  } catch {}
  return [{ title: 'Video', url: raw }];
}


function isGalleryGroupArray(value: GalleryTabData | undefined): value is GalleryGroup[] {
  return Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && 'images' in value[0];
}

function uniqueImages(images: Array<string | undefined>) {
  return Array.from(new Set(images.filter((img): img is string => Boolean(img))));
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
    <section id="faq" data-editorial-section="05" className="bg-[#faf8f5] border-t border-[#e53935]/15">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="pd-faq-content">
        <div className="py-16 md:py-20 max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* หัวข้อ */}
            <div className="lg:w-1/3 shrink-0">
              <span className="pd-faq-eyebrow">FAQ</span>
              <h2 className={`text-3xl md:text-4xl font-semibold text-[#1a2d6b] leading-tight`}>
                คำถามที่พบบ่อย
              </h2>
              <p className="mt-4 text-sm text-slate-500 leading-relaxed">
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
                    aria-expanded={openIdx === i}
                    aria-controls={`project-faq-${i}`}
                    className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer hover:bg-[#faf8f5] transition-colors"
                  >
                    <span className="text-sm md:text-[15px] font-semibold text-slate-700 pr-4 leading-snug">
                      <span className="text-[#e53935] mr-2 font-semibold">Q :</span>{faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition-transform duration-300 ${openIdx === i ? 'rotate-180 text-[#e53935]' : 'text-slate-300'}`}
                    />
                  </button>
                  {/* Always rendered so search engines and AI crawlers can read the answer */}
                  <div id={`project-faq-${i}`} hidden={openIdx !== i} className="px-6 pb-5 text-sm text-slate-600 leading-7 border-t border-[#e53935]/15 pt-4">
                    <span className="text-[#1a2d6b] font-semibold mr-2">A :</span>{faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
  const [roomTypeDropdownOpen, setRoomTypeDropdownOpen] = useState(false);
  const [planDropdownOpen, setPlanDropdownOpen] = useState(false);
  const [loadedGalleryImages, setLoadedGalleryImages] = useState<Set<string>>(new Set());
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [infoTab, setInfoTab] = useState<'concept' | 'factsheet' | 'facilities'>('concept');
  const [activeVideo, setActiveVideo] = useState(0);
  const videos = parseVideos(project.videoUrl);

  // ==========================================
  // 📍 STATE สำหรับ PLANS
  // ==========================================
  const [activeTab, setActiveTab] = useState<'room' | 'floor'>(
    (project.roomPlans?.length ?? 0) > 0 ? 'room' : 'floor'
  );
  const [activeRoomPlanGroupIndex, setActiveRoomPlanGroupIndex] = useState(0);
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const [isPlanFullscreen, setIsPlanFullscreen] = useState(false);
  const [loadedPlanImages, setLoadedPlanImages] = useState<Set<string>>(new Set());
  const roomTypeDropdownRef = useRef<HTMLDivElement | null>(null);
  const planDropdownRef = useRef<HTMLDivElement | null>(null);

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
  const thumbnailRail = useRef<HTMLDivElement>(null);
  const thumbnailDrag = useRef({ startX: 0, scrollLeft: 0, active: false, moved: false });
  useEffect(() => {
    const rail = thumbnailRail.current;
    const item = rail?.children[safeActiveImg] as HTMLElement | undefined;
    if (!rail || !item) return;
    const target = item.offsetLeft - (rail.clientWidth - item.clientWidth) / 2;
    rail.scrollTo({ left: Math.max(0, target), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, [safeActiveImg, activeGalleryTab, safeActiveGalleryGroup]);

  const fallbackImage = project.image || '/logo.png';
  
  // ถ้าไม่มีรูปในหมวดนั้นเลย ให้เอารูปหน้าปก (project.image) มาแสดงแก้ขัด
  const currentImage = hasGallery ? validGallery[safeActiveImg] : fallbackImage;
  const floorPlanName = (idx: number, prefix = 'Plan') =>
    project.floorPlanNames?.[idx] || `${prefix} ${idx + 1}`;
  const currentPlanImage = activeTab === 'room'
    ? project.roomPlans?.[activePlanIndex]?.image
    : project.floorPlans?.[activePlanIndex];
  const galleryImageLoaded = loadedGalleryImages.has(currentImage);
  const planImageLoaded = Boolean(currentPlanImage && loadedPlanImages.has(currentPlanImage));
  const galleryPreloadImages = galleryImageLoaded
    ? uniqueImages(validGallery).filter((img) => img !== currentImage)
    : [];
  const planPreloadImages = uniqueImages(
    planImageLoaded && activeTab === 'room'
      ? project.roomPlans?.map((plan) => plan.image) || []
      : planImageLoaded
        ? project.floorPlans || []
        : []
  ).filter((img) => img !== currentPlanImage);
  const activePlanImages = uniqueImages(
    activeTab === 'room'
      ? project.roomPlans?.map((plan) => plan.image) || []
      : project.floorPlans || []
  );
  const activePlansLoaded = activePlanImages.length > 0 && activePlanImages.every((img) => loadedPlanImages.has(img));
  const nextPlanPreloadImages = activePlansLoaded
    ? uniqueImages(activeTab === 'room' ? project.floorPlans || [] : project.roomPlans?.map((plan) => plan.image) || [])
    : [];
  const galleryPreloadKey = galleryPreloadImages.join('|');
  const planPreloadKey = uniqueImages([...planPreloadImages, ...nextPlanPreloadImages]).join('|');
  const roomPlanGroups = [
    { label: 'Studio', sizes: ['22'] },
    { label: '1 Bed', sizes: ['25', '26', '28', '31'] },
    { label: '1 Bed Plus', sizes: ['34', '34.1', '36', '36.1', '40'] },
    { label: '2 Bed', sizes: ['39', '43', '63'] },
  ].map((group) => ({
    ...group,
    plans: project.roomPlans
      ?.map((plan, index) => ({ plan, index }))
      .filter(({ plan }) => group.sizes.includes(plan.type.replace('sqm', '').trim())) || [],
  })).filter((group) => group.plans.length > 0);
  // Room names that do not follow the size list (e.g. "A - 25 ตร.ม.") would otherwise leave no choices.
  const groupedPlanCount = roomPlanGroups.reduce((total, group) => total + group.plans.length, 0);
  if (groupedPlanCount < (project.roomPlans?.length ?? 0)) {
    roomPlanGroups.splice(0, roomPlanGroups.length, {
      label: 'ทุกแบบห้อง',
      sizes: [],
      plans: project.roomPlans?.map((plan, index) => ({ plan, index })) || [],
    });
  }
  const safeActiveRoomPlanGroupIndex = activeRoomPlanGroupIndex >= roomPlanGroups.length ? 0 : activeRoomPlanGroupIndex;
  const activeRoomPlanGroup = roomPlanGroups[safeActiveRoomPlanGroupIndex];

  const priceLabel = project.priceMin
    ? `เริ่มต้น ${(project.priceMin / 1000000).toFixed(2)} ล้านบาท*`
    : undefined;

  const projectFacts = [
    { label: 'ชื่อโครงการ', value: project.name, icon: Building2 },
    { label: 'ลักษณะโครงการ', value: [project.type, project.floors ? `${project.floors} ชั้น` : undefined].filter(Boolean).join(' '), icon: Layers },
    { label: 'ทำเลที่ตั้ง', value: project.location, icon: MapPin },
    { label: 'รถไฟฟ้าใกล้เคียง', value: project.bts, icon: TrainFront },
    { label: 'จำนวนยูนิต', value: project.units ? `${project.units} ยูนิต` : undefined, icon: DoorOpen },
    { label: 'พื้นที่โครงการ', value: project.projectArea, icon: LandPlot },
    { label: 'ที่จอดรถ', value: project.parking, icon: Car },
    { label: 'ราคา', value: priceLabel, icon: Tag, highlight: true },
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

  const scrollToPlans = () => {
    requestAnimationFrame(() => {
      document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const jumpToRoomPlan = (index: number) => {
    setActiveTab('room');
    setActivePlanIndex(index);
    setRoomTypeDropdownOpen(false);
    setPlanDropdownOpen(false);
    scrollToPlans();
  };

  const selectPlanIndex = (index: number) => {
    setActivePlanIndex(index);
    setPlanDropdownOpen(false);
  };

  useEffect(() => {
    // Warm the exact optimized URLs the visible <NextImage> will request. Preloading the raw src
    // marked slides as loaded while their optimized copy was still downloading, so the skeleton
    // never showed and the stage stayed blank.
    const preload = (
      src: string,
      opts: { fill: true; sizes: string } | { width: number; height: number },
      markLoaded: typeof setLoadedGalleryImages,
    ) => {
      const { props } = getImageProps({ src, alt: '', ...opts });
      const img = new window.Image();
      if (props.sizes) img.sizes = props.sizes;
      if (props.srcSet) img.srcset = props.srcSet;
      img.src = props.src;
      img.onload = () => markLoaded((prev) => {
        if (prev.has(src)) return prev;
        const next = new Set(prev);
        next.add(src);
        return next;
      });
      return img;
    };
    const preloaders = [
      ...uniqueImages(galleryPreloadKey.split('|')).map((src) =>
        preload(src, { fill: true, sizes: GALLERY_STAGE_SIZES }, setLoadedGalleryImages)),
      ...uniqueImages(planPreloadKey.split('|')).map((src) =>
        preload(src, { width: 1400, height: 1000 }, setLoadedPlanImages)),
    ];

    return () => {
      preloaders.forEach((img) => {
        img.onload = null;
      });
    };
  }, [galleryPreloadKey, planPreloadKey]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (roomTypeDropdownOpen && !roomTypeDropdownRef.current?.contains(target)) {
        setRoomTypeDropdownOpen(false);
      }
      if (planDropdownOpen && !planDropdownRef.current?.contains(target)) {
        setPlanDropdownOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [roomTypeDropdownOpen, planDropdownOpen]);

  // Each section's content fades up once when it scrolls into view. Classes are added here,
  // so content stays visible without JavaScript and for reduced-motion users.
  const editorialRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = editorialRef.current;
    if (!root || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(':scope > section > div'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('pd-revealed');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    targets.forEach((target) => {
      target.classList.add('pd-reveal');
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={editorialRef} className={`${projectThaiFont.variable} ${projectFont.className} project-editorial`}>
      


      {/* ==========================================
          📍 FULLSCREEN MODAL สำหรับ GALLERY
      ========================================== */}
      {isGalleryFullscreen && (
        <div className="fixed inset-0 z-[70] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-xl animate-in fade-in duration-300">
          <button 
            aria-label="ปิดภาพเต็มจอ"
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
            aria-label="ปิดแบบแปลนเต็มจอ"
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

          <div className="absolute bottom-6 md:bottom-10 bg-white/80 shadow-lg border border-slate-200 text-slate-800 px-6 py-3 rounded-full font-semibold tracking-widest uppercase text-sm backdrop-blur-md">
            {activeTab === 'room' ? project.roomPlans?.[activePlanIndex]?.type : floorPlanName(activePlanIndex, 'Floor Plan')}
          </div>
        </div>
      )}

      {/* =========================================
          PROJECT INFO
      ========================================= */}
      <section id="info" data-editorial-section="01" className="py-16 md:py-24 bg-[#faf8f5] border-b border-[#e53935]/15">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="pd-info-heading flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <span className={`text-[10px] font-semibold tracking-[0.35em] uppercase text-[#e53935]`}>
                ข้อมูลโครงการ
              </span>
              <div className="w-8 h-[2px] bg-[#e53935] mt-2 mb-3" />
              <h2 className={`text-3xl md:text-5xl font-semibold text-[#1a2d6b] tracking-tight`}>
                Project Information
              </h2>
              <p className="mt-3 max-w-2xl text-sm md:text-base text-slate-500 leading-relaxed">
                สรุปภาพรวมโครงการ ทั้ง Concept Information และ Facilities
              </p>
            </div>

            <div className="pd-info-tabs inline-flex w-fit max-w-full self-center overflow-x-auto rounded-full border bg-white p-1.5 shadow-sm no-scrollbar md:p-2 lg:self-auto">
              {[
                { key: 'concept', label: 'แนวคิดโครงการ' },
                { key: 'factsheet', label: 'Factsheet' },
                { key: 'facilities', label: 'Facilities' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  aria-pressed={infoTab === tab.key}
                  onClick={() => setInfoTab(tab.key as 'concept' | 'factsheet' | 'facilities')}
                  className={`min-w-fit rounded-full px-5 py-3 md:px-7 md:py-3.5 text-xs md:text-base font-semibold transition-all whitespace-nowrap ${
                    infoTab === tab.key
                      ? 'bg-[#1a2d6b] text-white shadow-md'
                      : 'text-slate-500 hover:text-[#1a2d6b]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {infoTab === 'concept' && (
            <div className="pd-concept overflow-hidden rounded-2xl bg-[#1a2d6b] text-white shadow-lg">
              <div className="flex flex-col lg:flex-row min-h-0">
                {/* รูป — ซ้าย */}
                <div className="pd-concept-image relative w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto lg:min-h-[420px] bg-[#0f1e4a] shrink-0">
                  {project.conceptImage ? (
                    <SkeletonImage
                      tone="dark"
                      src={project.conceptImage}
                      alt={`${project.name} concept`}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover opacity-90"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm font-semibold tracking-[0.2em] text-white/30">
                      CONCEPT IMAGE
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a2d6b]/20" />
                </div>

                {/* ข้อความ — ขวา */}
                <div className="pd-concept-copy flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-14 lg:w-1/2">
                  <div className="mb-5 w-10 h-[2px] bg-[#e53935]" />
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e53935] mb-3`}>
                    Concept
                  </p>
                  <h3 className={`text-2xl md:text-3xl font-semibold leading-tight text-white`}>
                    {project.concept || project.name}
                  </h3>
                  <p className="mt-5 text-sm md:text-base leading-8 text-white/70 whitespace-pre-line">
                    {project.conceptArticle || project.description || 'รายละเอียดแนวคิดโครงการจะถูกแสดงจากข้อมูลที่ตั้งค่าในระบบ Admin'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {infoTab === 'factsheet' && (
            <div className="pd-facts space-y-4">
              {/* Facts: one continuous panel with hairline dividers */}
              <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-[#1a2d6b]/[0.08] bg-[#1a2d6b]/[0.07] shadow-[0_1px_2px_rgba(26,45,107,0.04),0_16px_40px_rgba(26,45,107,0.06)]">
                {projectFacts.map(({ label, value, icon: Icon, highlight }) => (
                  <div
                    key={label}
                    className={`group flex flex-col sm:flex-row items-start gap-3 p-5 md:p-6 transition-colors ${
                      highlight ? 'pd-fact-highlight bg-[#1a2d6b] text-white' : 'bg-white hover:bg-[#faf8f5]'
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.75} className={`mt-0.5 shrink-0 ${highlight ? 'text-white/80' : 'text-[#e53935]'}`} />
                    <div className="min-w-0">
                      <dt className={`mb-1 text-xs font-medium ${highlight ? 'text-white/60' : 'text-slate-500'}`}>{label}</dt>
                      <dd className={`break-words text-sm md:text-base font-semibold leading-snug ${highlight ? 'text-white' : 'text-[#1a2d6b]'}`}>{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              {(project.roomPlans?.length ?? 0) > 0 && (
                <div className="bg-white border border-[#1a2d6b]/[0.08] rounded-2xl p-5 md:p-7 shadow-[0_1px_2px_rgba(26,45,107,0.04)]">
                  <div className="flex items-end justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e53935]/[0.08] text-[#e53935]">
                        <Home size={18} strokeWidth={1.75} />
                      </span>
                      <div>
                        <h3 className={`text-lg font-semibold text-[#1a2d6b] leading-tight`}>Room Types</h3>
                        <p className="text-xs text-slate-500">{project.roomPlans?.length} แบบห้อง · กดเพื่อดูแปลน</p>
                      </div>
                    </div>
                  </div>
                  <div className="sm:hidden space-y-3">
                    <div ref={roomTypeDropdownRef} className="relative z-30">
                      <button
                        type="button"
                        onClick={() => setRoomTypeDropdownOpen((open) => !open)}
                        className="flex w-full items-center justify-between rounded-2xl border border-[#e53935]/25 bg-[#faf8f5] px-4 py-4 text-left text-sm font-semibold text-[#1a2d6b] shadow-sm transition-colors focus:border-[#e53935] focus:outline-none focus:ring-4 focus:ring-[#e53935]/10"
                      >
                        {project.roomPlans?.[activePlanIndex]?.type || project.roomPlans?.[0]?.type}
                        <ChevronDown size={18} className={`text-[#e53935] transition-transform ${roomTypeDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {roomTypeDropdownOpen && (
                        <div className="absolute left-0 right-0 top-[calc(100%+8px)] max-h-72 overflow-y-auto rounded-2xl border border-[#e53935]/15 bg-white p-1.5 shadow-2xl shadow-[#1a2d6b]/15">
                          {project.roomPlans?.map((plan: RoomPlan, i: number) => (
                            <button
                              type="button"
                              key={`room-select-${i}`}
                              onClick={() => jumpToRoomPlan(i)}
                              className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition-colors ${
                                activePlanIndex === i
                                  ? 'bg-[#e53935] text-white shadow-sm'
                                  : 'text-[#1a2d6b] hover:bg-[#faf8f5]'
                              }`}
                            >
                              {plan.type}
                              {activePlanIndex === i && <span className="text-xs text-white/80">เลือกอยู่</span>}
                            </button>
                          ))}
                          <div className="sticky bottom-0 -mx-1.5 flex justify-center bg-gradient-to-t from-white via-white/95 to-transparent pb-1.5 pt-8">
                            <span className="pointer-events-none flex h-7 w-7 items-center justify-center rounded-full border border-[#e53935]/15 bg-white text-[#e53935] shadow-md shadow-[#1a2d6b]/10">
                              <ChevronDown size={15} />
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => jumpToRoomPlan(activePlanIndex)}
                      className="w-full rounded-2xl bg-[#e53935] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#e53935]/20"
                    >
                      ดูแปลนห้องนี้
                    </button>
                  </div>
                  <div className="pd-room-grid hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {project.roomPlans?.map((plan: RoomPlan, i: number) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => jumpToRoomPlan(i)}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-[#1a2d6b]/[0.08] bg-[#faf8f5] px-4 py-3.5 text-left transition-all duration-200 hover:border-[#e53935]/30 hover:bg-white hover:shadow-[0_8px_20px_rgba(26,45,107,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a2d6b]"
                      >
                        <span className="text-sm font-semibold text-[#1a2d6b]">{plan.type}</span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-[#e53935]">
                          ดูแปลน
                          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {infoTab === 'facilities' && (
            <div className="pd-facilities grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 bg-[#1a2d6b] text-white rounded-2xl p-7 md:p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#e53935] via-[#e8c98a] to-[#e53935]" />
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#e53935]/15 border border-[#e53935]/25 mb-6">
                  <Building2 size={24} className="text-[#e53935]" />
                </div>
                <h3 className={`text-2xl md:text-3xl font-semibold leading-tight`}>Facilities</h3>
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
                        <div className="text-sm font-semibold text-slate-700">{facility.name}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-dashed border-[#e53935]/20 rounded-2xl p-10 text-center text-slate-400">
                    กำลังเตรียมข้อมูลสิ่งอำนวยความสะดวกเพิ่มเติม
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          📍 GALLERY SECTION (แยกหมวดหมู่)
      ========================================= */}
      <section id="gallery" data-editorial-section="02" className="py-24 bg-white border-b border-[#e53935]/10">
        <div className="pd-gallery-workspace">
        <div className="pd-gallery-toolbar">
        <div className="pd-gallery-heading max-w-7xl mx-auto px-4 text-center mb-10">
          <p className={`text-[10px] font-semibold tracking-[0.35em] uppercase text-[#e53935] mb-3`}>
            Photo Gallery
          </p>
          <div className="flex items-center justify-center gap-3 mb-4 text-[#1a2d6b]">
            <h2 className={`text-4xl md:text-5xl font-semibold uppercase tracking-tight`}>Gallery</h2>
          </div>
          <div className="w-12 h-[2px] bg-[#e53935] mx-auto mb-8" />

        </div>
          <label className="pd-gallery-picker">
            <span>เลือกรูป</span>
            <select aria-label="เลือกรูปในแกลเลอรี" value={safeActiveImg} onChange={event => setActiveImg(Number(event.target.value))}>
              {validGallery.map((_, index) => <option key={index} value={index}>{index + 1} / {validGallery.length}</option>)}
            </select>
          </label>
          {/* 📍 แถบเลือกหมวดหมู่ Perspective / Facility / Room */}
          {/* แก้ไข Logic การแสดงผล Tab: ตรวจสอบข้อมูล gallery ให้ถูกต้องสำหรับทุกโครงการ */}
          {project.gallery && !Array.isArray(project.gallery) && typeof project.gallery === 'object' && (
            <div className="pd-gallery-tabs mx-auto grid w-full max-w-[340px] grid-cols-3 gap-1 rounded-[22px] border bg-white p-1.5 shadow-sm sm:inline-flex sm:w-auto sm:max-w-full sm:gap-1.5 sm:rounded-full sm:p-2 sm:overflow-x-auto sm:no-scrollbar">
              <button
                aria-pressed={activeGalleryTab === 'perspective'}
                onClick={() => { setActiveGalleryTab('perspective'); setActiveGalleryGroup(0); setActiveImg(0); }}
                className={`flex min-w-0 items-center justify-center gap-1 px-2 py-3 rounded-2xl sm:gap-2 sm:px-8 sm:py-3.5 sm:rounded-full text-[10px] sm:text-sm font-semibold uppercase transition-all whitespace-nowrap ${activeGalleryTab === 'perspective' ? 'bg-[#1a2d6b] text-white shadow-md' : 'text-slate-500 hover:text-[#1a2d6b]'}`}
              >
                <Sparkles size={14} /> <span className="hidden sm:inline">Perspective</span><span className="sm:hidden">View</span>
              </button>
              <button
                aria-pressed={activeGalleryTab === 'facility'}
                onClick={() => { setActiveGalleryTab('facility'); setActiveGalleryGroup(0); setActiveImg(0); }}
                className={`flex min-w-0 items-center justify-center gap-1 px-2 py-3 rounded-2xl sm:gap-2 sm:px-8 sm:py-3.5 sm:rounded-full text-[10px] sm:text-sm font-semibold uppercase transition-all whitespace-nowrap ${activeGalleryTab === 'facility' ? 'bg-[#1a2d6b] text-white shadow-md' : 'text-slate-500 hover:text-[#1a2d6b]'}`}
              >
                <Building2 size={14} /> Facility
              </button>
              <button
                aria-pressed={activeGalleryTab === 'room'}
                onClick={() => { setActiveGalleryTab('room'); setActiveGalleryGroup(0); setActiveImg(0); }}
                className={`flex min-w-0 items-center justify-center gap-1 px-2 py-3 rounded-2xl sm:gap-2 sm:px-8 sm:py-3.5 sm:rounded-full text-[10px] sm:text-sm font-semibold uppercase transition-all whitespace-nowrap ${activeGalleryTab === 'room' ? 'bg-[#1a2d6b] text-white shadow-md' : 'text-slate-500 hover:text-[#1a2d6b]'}`}
              >
                <Home size={14} /> Room
              </button>
            </div>
          )}
          {currentGalleryGroups.length > 0 && (
            <div className="pd-room-sizes">
              <p>{activeGalleryTab === 'room' ? 'เลือกขนาดห้อง' : 'เลือกชุดภาพ'}</p>
              {currentGalleryGroups.map((group, index) => (
                <button
                  key={group.label}
                  aria-pressed={safeActiveGalleryGroup === index}
                  onClick={() => { setActiveGalleryGroup(index); setActiveImg(0); }}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
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
        </div>

        <div className="pd-gallery-media max-w-6xl mx-auto px-4">
          <div
            className="pd-gallery-stage relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 mb-6 shadow-xl border group"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onGalleryTouchEnd}
          >
            {/* Main image — click center to fullscreen */}
            {!galleryImageLoaded && (
              <div aria-hidden className="img-shimmer-dark absolute inset-0 z-10" />
            )}
            <NextImage
              key={`main-${currentImage}-${safeActiveImg}`}
              src={failedImages.has(currentImage) ? fallbackImage : currentImage}
              fill
              sizes={GALLERY_STAGE_SIZES}
              onError={() => handleImageError(currentImage)}
              onLoad={() => { setLoadedGalleryImages((prev) => {
                if (prev.has(currentImage)) return prev;
                const next = new Set(prev);
                next.add(currentImage);
                return next;
              }); }}
              onClick={() => setIsGalleryFullscreen(true)}
              className={`w-full h-full object-cover cursor-pointer animate-in fade-in duration-300 ${
                slideDirection === 'right' ? 'slide-in-from-right-10' : 'slide-in-from-left-10'
              }`}
              alt={`${project.name} — ${activeGalleryTab} ${safeActiveImg + 1}`}
            />

            {/* Prev button */}
            {validGallery.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleGalleryPrev(); }}
                aria-label="รูปก่อนหน้า"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#e53935] text-white p-2.5 md:p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Next button */}
            {validGallery.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleGalleryNext(); }}
                aria-label="รูปถัดไป"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-[#e53935] text-white p-2.5 md:p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
              >
                <ChevronRight size={22} />
              </button>
            )}

            {/* Image counter */}
            {validGallery.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                {safeActiveImg + 1} / {validGallery.length}
              </div>
            )}

            {/* Fullscreen button */}
            <button
              onClick={() => setIsGalleryFullscreen(true)}
              aria-label="ดูรูปแบบเต็มจอ"
              className="absolute top-3 right-3 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all"
            >
              <Maximize2 size={18} />
            </button>
          </div>

          {hasGallery ? (
            <div ref={thumbnailRail} className="pd-thumbnail-rail flex gap-3 overflow-x-auto pb-4"
              onPointerDown={event => {
                if (event.pointerType !== 'mouse' || event.button !== 0) return;
                thumbnailDrag.current = { startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft, active: true, moved: false };
              }}
              onPointerMove={event => {
                const drag = thumbnailDrag.current;
                if (!drag.active) return;
                const delta = event.clientX - drag.startX;
                if (Math.abs(delta) > 5) {
                  drag.moved = true;
                  event.currentTarget.setPointerCapture(event.pointerId);
                  event.currentTarget.scrollLeft = drag.scrollLeft - delta;
                }
              }}
              onPointerUp={() => { thumbnailDrag.current.active = false; }}
              onPointerCancel={() => { thumbnailDrag.current.active = false; }}
              onLostPointerCapture={() => { thumbnailDrag.current.active = false; }}
              onPointerLeave={() => { thumbnailDrag.current.active = false; }}
              onDragStart={event => event.preventDefault()}
              onClickCapture={event => {
                if (thumbnailDrag.current.moved) {
                  event.preventDefault(); event.stopPropagation(); thumbnailDrag.current.moved = false;
                }
              }}>

              {validGallery.map((img: string, i: number) => (
                <div 
                  // 📍 แก้ไข Key ที่ Thumbnail: บังคับ Re-render เมื่อสลับหมวด
                  key={`${activeGalleryTab}-${safeActiveGalleryGroup}-${img}`}
                  onClick={() => setActiveImg(i)} 
                  className={`relative w-28 md:w-40 aspect-video shrink-0 rounded-xl overflow-hidden cursor-pointer border-[3px] transition-all duration-300 snap-center ${safeActiveImg === i ? 'border-[#e53935] scale-100 opacity-100 shadow-md' : 'border-transparent scale-95 opacity-60 hover:opacity-100 hover:scale-100'}`}
                >
                  <SkeletonImage
  tone="dark"
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
        </div>
      </section>

      {/* =========================================
          📍 PLANS SECTION
      ========================================= */}
      {((project.floorPlans?.length ?? 0) > 0 || (project.roomPlans?.length ?? 0) > 0) && (
        <section id="plans" data-editorial-section="03" className="py-16 md:py-24 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 md:px-8">
            <div className="pd-plans-heading text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4 text-[#1a2d6b]">
                <div><span className="pd-plans-eyebrow">DESIGNED FOR LIVING</span><h2 className="text-4xl md:text-5xl font-semibold uppercase tracking-tight">Plans</h2></div>
              </div>
              <p className="text-slate-500 mb-10 text-lg">สัมผัสการออกแบบพื้นที่ใช้สอยที่ตอบโจทย์ชีวิตคนเมือง</p>
              
              <div className="inline-flex bg-white p-1.5 rounded-full shadow-sm border overflow-x-auto max-w-full hide-scrollbar">
                {(project.roomPlans?.length ?? 0) > 0 && (
                  <button 
                    onClick={() => { setActiveTab('room'); setActivePlanIndex(0); setPlanDropdownOpen(false); }}
                    className={`px-8 py-3 rounded-full text-xs font-semibold tracking-widest uppercase transition-all whitespace-nowrap ${activeTab === 'room' ? 'bg-[#1a2d6b] text-white shadow-md' : 'text-slate-500 hover:text-[#1a2d6b]'}`}
                  >
                    Room Plans
                  </button>
                )}
                {(project.floorPlans?.length ?? 0) > 0 && (
                  <button 
                    onClick={() => { setActiveTab('floor'); setActivePlanIndex(0); setPlanDropdownOpen(false); }}
                    className={`px-8 py-3 rounded-full text-xs font-semibold tracking-widest uppercase transition-all whitespace-nowrap ${activeTab === 'floor' ? 'bg-[#1a2d6b] text-white shadow-md' : 'text-slate-500 hover:text-[#1a2d6b]'}`}
                  >
                    Floor & Master 
                  </button>
                )}
              </div>
            </div>

            <div className="pd-plan-workspace max-w-6xl mx-auto">
              <div className="md:hidden mb-8">
                <div ref={planDropdownRef} className="relative z-20">
                  <button
                    type="button"
                    onClick={() => setPlanDropdownOpen((open) => !open)}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left text-sm font-semibold text-[#1a2d6b] shadow-sm outline-none transition-colors focus:border-[#e53935] focus:ring-4 focus:ring-[#e53935]/10"
                  >
                    {activeTab === 'room'
                      ? project.roomPlans?.[activePlanIndex]?.type
                      : floorPlanName(activePlanIndex)}
                    <ChevronDown size={18} className={`text-[#e53935] transition-transform ${planDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {planDropdownOpen && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl shadow-[#1a2d6b]/15">
                      {activeTab === 'room' && project.roomPlans?.map((plan: RoomPlan, idx: number) => (
                        <button
                          type="button"
                          key={`mobile-room-plan-${idx}`}
                          onClick={() => selectPlanIndex(idx)}
                          className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition-colors ${
                            activePlanIndex === idx
                              ? 'bg-[#e53935] text-white shadow-sm'
                              : 'text-[#1a2d6b] hover:bg-[#faf8f5]'
                          }`}
                        >
                          {plan.type}
                          {activePlanIndex === idx && <span className="text-xs text-white/80">เลือกอยู่</span>}
                        </button>
                      ))}
                      {activeTab === 'floor' && project.floorPlans?.map((_, idx: number) => (
                        <button
                          type="button"
                          key={`mobile-floor-plan-${idx}`}
                          onClick={() => selectPlanIndex(idx)}
                          className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition-colors ${
                            activePlanIndex === idx
                              ? 'bg-[#e53935] text-white shadow-sm'
                              : 'text-[#1a2d6b] hover:bg-[#faf8f5]'
                          }`}
                        >
                          {floorPlanName(idx)}
                          {activePlanIndex === idx && <span className="text-xs text-white/80">เลือกอยู่</span>}
                        </button>
                      ))}
                      <div className="sticky bottom-0 -mx-1.5 flex justify-center bg-gradient-to-t from-white via-white/95 to-transparent pb-1.5 pt-8">
                        <span className="pointer-events-none flex h-7 w-7 items-center justify-center rounded-full border border-[#e53935]/15 bg-white text-[#e53935] shadow-md shadow-[#1a2d6b]/10">
                          <ChevronDown size={15} />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pd-plan-controls hidden md:flex mb-10 lg:mb-0">
                {activeTab === 'room' && roomPlanGroups.length > 1 && (
                  <div>
                    <p className="pd-plan-label">ประเภทห้อง</p>
                    <div className="pd-plan-groups">
                      {roomPlanGroups.map((group, groupIndex) => (
                        <button
                          type="button"
                          key={group.label}
                          aria-pressed={safeActiveRoomPlanGroupIndex === groupIndex}
                          onClick={() => {
                            setActiveRoomPlanGroupIndex(groupIndex);
                            setActivePlanIndex(group.plans[0]?.index || 0);
                          }}
                        >
                          {group.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'room' && activeRoomPlanGroup && (
                  <div>
                    <p className="pd-plan-label">เลือกแบบห้อง</p>
                    <div className="pd-plan-options">
                      {activeRoomPlanGroup.plans.map(({ plan, index }) => (
                        <button
                          type="button"
                          key={`room-btn-${index}`}
                          aria-pressed={activePlanIndex === index}
                          onClick={() => setActivePlanIndex(index)}
                        >
                          {plan.type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'floor' && (
                  <div>
                    <p className="pd-plan-label">เลือกแปลน</p>
                    <div className="pd-plan-options">
                      {project.floorPlans?.map((_, idx: number) => (
                        <button
                          type="button"
                          key={`floor-btn-${idx}`}
                          aria-pressed={activePlanIndex === idx}
                          onClick={() => setActivePlanIndex(idx)}
                        >
                          {floorPlanName(idx)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div 
                className="pd-plan-image relative flex justify-center items-center cursor-pointer group min-h-[400px] md:min-h-[60vh] w-full"
                onClick={() => setIsPlanFullscreen(true)}
              >
                {currentPlanImage && !planImageLoaded && (
                  <div aria-hidden className="img-shimmer absolute inset-4 md:inset-6 rounded-xl" />
                )}
                {activeTab === 'room' && project.roomPlans?.[activePlanIndex] && (
                  <NextImage
                    key={`room-img-${activePlanIndex}`}
                    src={project.roomPlans[activePlanIndex].image} 
                    alt={project.roomPlans[activePlanIndex].type}
                    width={1400}
                    height={1000}
                    onLoad={() => setLoadedPlanImages((prev) => {
                      if (!currentPlanImage || prev.has(currentPlanImage)) return prev;
                      const next = new Set(prev);
                      next.add(currentPlanImage);
                      return next;
                    })}
                    className={`w-full h-auto max-h-[80vh] object-contain animate-in fade-in zoom-in-95 duration-500 transition-opacity ${planImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                )}

                {activeTab === 'floor' && project.floorPlans?.[activePlanIndex] && (
                  <NextImage
                    key={`floor-img-${activePlanIndex}`}
                    src={project.floorPlans[activePlanIndex]} 
                    alt={floorPlanName(activePlanIndex, 'Floor Plan')}
                    width={1400}
                    height={1000}
                    onLoad={() => setLoadedPlanImages((prev) => {
                      if (!currentPlanImage || prev.has(currentPlanImage)) return prev;
                      const next = new Set(prev);
                      next.add(currentPlanImage);
                      return next;
                    })}
                    className={`w-full h-auto max-h-[80vh] object-contain animate-in fade-in zoom-in-95 duration-500 transition-opacity ${planImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  />
                )}

                <div className="absolute inset-0 bg-[#1a2d6b]/0 group-hover:bg-[#1a2d6b]/5 transition-colors duration-300 flex items-center justify-center pointer-events-none">
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
      <ProjectSurroundings value={project.projectSections} />

      {videos.length > 0 && (
        <section id="video" data-editorial-section="04" className="pd-video-section">
          <div className="max-w-6xl mx-auto px-4">
            <div className="pd-video-body">
            <header className="pd-section-heading pd-video-heading">
              <div><span>PROJECT FILMS</span><h2>Video</h2></div>
              {videos.length > 1 && <p>{videos.length} คลิป · เลือกชมได้ด้านล่าง</p>}
            </header>
            {videos.length > 1 && (
              <div className="pd-video-picker"><div className="pd-video-list" aria-label="เลือกวิดีโอ">
                {videos.map((video, index) => (
                  <button key={index} type="button" aria-pressed={activeVideo === index}
                    onClick={() => setActiveVideo(index)}>
                    <span className="pd-video-number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="pd-video-label"><span>{video.title || `Video ${index + 1}`}</span>
                      <small>{activeVideo === index ? 'เลือกอยู่' : 'เลือกชมวิดีโอ'}</small>
                    </span>
                    <span className="pd-video-play"><Play size={14} /></span>
                  </button>
                ))}
              </div></div>
            )}
            <div className="pd-video-player">
              <iframe
                key={activeVideo}
                src={videos[activeVideo].url.replace('www.youtube.com', 'www.youtube-nocookie.com')}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={videos[activeVideo].title || `${project.name} Video`}
              />
            </div>
            </div>

          </div>
        </section>
      )}

      {/* =========================================
          📍 FAQ SECTION
      ========================================= */}
      <ProjectProgress value={project.projectSections} />
      <ProjectFAQ project={project} />

      {/* =========================================
          📍 4. LOCATION & MAP SECTION
      ========================================= */}
      {project.googleMapUrl && (
        <section id="location" data-editorial-section="06" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="pd-location-copy flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-[#1a2d6b]">
              <div>
                <span className="pd-location-eyebrow">GETTING HERE</span>
                <h2 className="mb-4">Location</h2>
                <p className="text-lg text-slate-500 max-w-2xl">
                  {project.location} {project.bts ? `(${project.bts})` : ''}
                </p>
              </div>
              
              <a 
                href={project.googleMapUrl.replace('/embed', '')}
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#1a2d6b] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#e53935] transition-colors whitespace-nowrap shadow-lg shadow-blue-900/20 active:scale-95"
              >
                ดูแผนที่ Google Maps <ChevronRight size={18} />
              </a>
            </div>

            <div className="pd-location-map w-full h-[400px] md:h-[600px] bg-slate-100 rounded-[2rem] overflow-hidden shadow-inner border border-slate-200 relative group">
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
                      className="text-[#e53935] font-semibold underline"
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
