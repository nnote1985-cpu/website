'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { MapPin, Building2, Layers, ArrowRight, Home, Users, RotateCcw, Plus } from 'lucide-react';
import BrandPattern from '@/components/BrandPattern';
import { getStatusLabel } from '@/lib/utils';
import { projectUrl } from '@/lib/projectUrl';

interface Project {
  details_enabled?: boolean;
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
}

function DetailLink({ project, children, ...props }: { project: Project; children: ReactNode; className?: string; 'aria-label'?: string }) {
    return project.details_enabled === false
      ? <div {...props} aria-disabled="true">{children}</div>
      : <Link href={projectUrl(project.slug)} {...props}>{children}</Link>;
  }

function FrontFace({ project }: { project: Project }) {
  const statusLabel = getStatusLabel(project.status);
  const locationText = project.bts || project.location;

  return (
    <article className="group flex h-full flex-col bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-500 border border-slate-100">

      {/* --- 1. Image & Top Section (ลดความสูงลง) --- */}
      <DetailLink project={project} className="relative h-32 sm:h-44 lg:h-52 w-full bg-slate-100 overflow-hidden block">
        {/* Placeholder Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
          <Building2 size={28} strokeWidth={1} />
        </div>
        
        {/* Actual Image */}
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          />
        )}
        
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-80" />

        {/* Status Badge */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          <span className="inline-flex items-center px-2 py-1 sm:px-2.5 rounded-sm text-[8px] sm:text-[9px] font-bold uppercase tracking-widest bg-white/95 backdrop-blur-sm shadow-sm text-slate-800">
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              project.status === 'active' ? 'bg-green-500 animate-pulse' :
              project.status === 'coming-soon' ? 'bg-[#e53935] animate-pulse' :
              'bg-slate-400'
            }`} />
            {statusLabel}
          </span>
        </div>

        {/* Concept Label */}
        <div className="absolute bottom-2 left-3 right-3 sm:bottom-3 sm:left-4 sm:right-4">
          <p className="text-white/90 text-[8px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium border-l-[1.5px] border-[#e53935] pl-2 line-clamp-1">
            {project.concept || 'ASAKAN RESIDENCES'}
          </p>
        </div>
      </DetailLink>

      {/* --- 2. Content Section (กระชับพื้นที่) --- */}
      <div className="flex flex-col flex-1 p-3 sm:p-5">
        
        {/* Project Name */}
        <div className="mb-2 sm:mb-3">
          <DetailLink project={project}>
            <h3 className="font-black text-slate-900 text-sm sm:text-lg leading-tight group-hover:text-[#e53935] transition-colors line-clamp-2 min-h-[2.5rem] sm:min-h-0">
              {project.name}
            </h3>
          </DetailLink>
        </div>

        {/* Location */}
        <div className="mb-3 flex gap-1.5 text-[11px] sm:text-[12px] text-slate-500 font-medium leading-snug">
          <MapPin size={14} className="mt-0.5 shrink-0 text-[#e53935]" />
          <span className="line-clamp-2" title={locationText}>
            {locationText}
          </span>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-4 pb-4 border-b border-slate-100 text-[10px] sm:text-[12px] text-slate-500 font-semibold">
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1.5">
            <Home size={13} className="shrink-0 text-[#e53935]" />
            <span className="truncate">{project.type || 'Condo'}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1.5">
            <Layers size={13} className="shrink-0 text-[#e53935]" />
            <span>{project.floors} ชั้น</span>
          </div>
          <div className="col-span-2 flex items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1.5">
            <Users size={13} className="shrink-0 text-[#e53935]" />
            <span>{Number(project.units).toLocaleString('th-TH')} ยูนิต</span>
          </div>
        </div>

        {/* --- 3. Footer Section (Price & CTA) --- */}
        <div className="flex items-end justify-between gap-2 mt-auto">
          <div className="min-w-0">
            <span className="block text-[8px] sm:text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-0.5">
              Starting Price
            </span>
            <div className="flex flex-wrap items-baseline gap-x-1 text-[#e53935]">
              <span className="font-black text-base sm:text-xl leading-none">
                {Number(project.priceMin).toLocaleString('th-TH')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold">
                บาท*
              </span>
            </div>
          </div>
          
          {/* Elegant Arrow CTA (ย่อขนาดลงนิดนึง) */}
          <DetailLink project={project}
            className="flex shrink-0 items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-200 text-slate-400 group-hover:bg-[#e53935] group-hover:border-[#e53935] group-hover:text-white transition-all duration-300"
            aria-label={`ดูรายละเอียดโครงการ ${project.name}`}
          >
            <ArrowRight aria-hidden="true" size={15} className="group-hover:translate-x-1 transition-transform" />
          </DetailLink>
        </div>
      </div>
      
    </article>
  );
}

function formatPrice(n: number) {
  return Number(n).toLocaleString('th-TH');
}

function BackFace({ project, onClose, closeRef }: { project: Project; onClose: () => void; closeRef: React.RefObject<HTMLButtonElement | null> }) {
  const hasRange = Number(project.priceMax) > Number(project.priceMin);
  const specs = [
    { icon: Home, label: 'ประเภท', value: project.type },
    { icon: Layers, label: 'ความสูง', value: project.floors ? `${project.floors} ชั้น` : '' },
    { icon: Users, label: 'จำนวน', value: project.units ? `${formatPrice(project.units)} ยูนิต` : '' },
    { icon: MapPin, label: 'ทำเล', value: project.location },
  ].filter((s) => s.value);
  const enabled = project.details_enabled !== false;

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-[#13224f] text-white shadow-[0_18px_40px_-12px_rgba(19,34,79,0.55)]">
      <BrandPattern className="!opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a2d6b]/40 via-transparent to-[#0d1838]/90" />
      {/* แสงวาบตอนพลิก */}
      <div aria-hidden className="pfc-sheen pointer-events-none absolute inset-0" />

      <div className="relative flex h-full flex-col p-3 sm:p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <p className="border-l-[1.5px] border-[#f4511e] pl-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-[10px] line-clamp-1">
            {project.concept || 'ASAKAN RESIDENCES'}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="กลับด้านหน้าการ์ด"
            className="relative z-20 -mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4511e] sm:h-8 sm:w-8"
          >
            <RotateCcw size={13} aria-hidden="true" />
          </button>
        </div>

        <h3 className="mb-2 text-sm font-black leading-tight sm:text-lg line-clamp-2">{project.name}</h3>

        {project.description && (
          <p className="mb-3 hidden text-[12px] leading-relaxed text-white/65 sm:block sm:line-clamp-3">
            {project.description}
          </p>
        )}

        <dl className="mb-3 space-y-1.5 text-[10px] sm:space-y-2 sm:text-[12px]">
          {specs.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2 border-b border-white/10 pb-1.5 sm:pb-2">
              <Icon size={13} aria-hidden="true" className="shrink-0 text-[#f4511e]" />
              <dt className="sr-only shrink-0 text-white/55 sm:not-sr-only">{label}</dt>
              <dd className="min-w-0 truncate font-semibold sm:ml-auto sm:text-right" title={value}>{value}</dd>
            </div>
          ))}
        </dl>

        {project.bts && (
          <p className="mb-3 flex gap-1.5 text-[10px] leading-snug text-white/70 sm:text-[11px]">
            <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#f4511e]" aria-hidden="true" />
            <span className="line-clamp-3 sm:line-clamp-2">{project.bts}</span>
          </p>
        )}

        <div className="mt-auto">
          <span className="mb-0.5 block text-[8px] font-bold uppercase tracking-widest text-white/55 sm:text-[9px]">
            {hasRange ? 'Price Range' : 'Starting Price'}
          </span>
          <p className="mb-3 flex flex-wrap items-baseline gap-x-1 leading-none">
            <span className="text-base font-black text-white sm:text-xl">{formatPrice(project.priceMin)}</span>
            {hasRange && <span className="text-[11px] font-bold text-white/70 sm:text-sm">– {formatPrice(project.priceMax)}</span>}
            <span className="text-[10px] font-bold text-[#ff7a59] sm:text-xs">บาท*</span>
          </p>

          {enabled ? (
            <Link
              href={projectUrl(project.slug)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#e53935] px-3 py-2 text-[11px] font-bold text-white transition-colors after:absolute after:inset-0 after:content-[''] hover:bg-[#f4511e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:py-2.5 sm:text-[13px]"
            >
              <span className="sm:hidden">ดูโครงการ</span><span className="hidden sm:inline">ดูรายละเอียดโครงการ</span> <ArrowRight size={14} aria-hidden="true" />
            </Link>
          ) : (
            <div aria-disabled="true" className="w-full rounded-lg border border-white/20 px-3 py-2 text-center text-[11px] font-bold text-white/60 sm:py-2.5 sm:text-[13px]">
              {project.status === 'sold-out' ? 'ขายหมดแล้ว' : 'เร็วๆ นี้'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * การ์ดโครงการ ถ้าเปิด flip จะพลิก 3 มิติไปด้านหลังที่มีรายละเอียดเพิ่ม
 * เมาส์: ชี้แล้วพลิก, จอสัมผัส: แตะแล้วพลิก (แตะปุ่มด้านหลังเพื่อไปหน้าโครงการ), คีย์บอร์ด: ปุ่มพลิกที่มุมขวาบน
 * ผู้ที่ตั้ง reduced motion จะเห็นการจางสลับแทนการหมุน
 */
export default function ProjectCard({ project, flip = false }: { project: Project; flip?: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerType = useRef<string>('mouse');
  const moveFocus = useRef(false);

  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    (flipped ? closeRef : openRef).current?.focus({ preventScroll: true });
  }, [flipped]);

  // แตะนอกการ์ดบนจอสัมผัสให้พลิกกลับ
  useEffect(() => {
    if (!flipped) return;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && !rootRef.current?.contains(e.target as Node)) setFlipped(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && rootRef.current?.contains(document.activeElement)) {
        moveFocus.current = true;
        setFlipped(false);
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [flipped]);

  if (!flip) return <FrontFace project={project} />;

  const toggle = (next: boolean, fromKeyboard: boolean) => {
    moveFocus.current = fromKeyboard;
    setFlipped(next);
  };

  return (
    <div
      ref={rootRef}
      className="pfc relative h-full [perspective:1400px]"
      data-flipped={flipped || undefined}
      onPointerDown={(e) => { pointerType.current = e.pointerType; }}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setFlipped(true); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setFlipped(false); }}
    >
      <div className="pfc-inner relative h-full">
        <div
          className="pfc-face pfc-front relative h-full"
          inert={flipped}
          onClickCapture={(e) => {
            // จอสัมผัส: แตะครั้งแรกให้พลิกดูรายละเอียดก่อน แทนการเปิดหน้าโครงการทันที
            if (e.detail !== 0 && pointerType.current !== 'mouse') {
              e.preventDefault();
              e.stopPropagation();
              setFlipped(true);
            }
          }}
        >
          <FrontFace project={project} />
          <button
            ref={openRef}
            type="button"
            onClick={(e) => { e.stopPropagation(); toggle(true, e.detail === 0); }}
            aria-label={`ดูข้อมูลเพิ่มเติมของ ${project.name}`}
            className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#1a2d6b] shadow-sm backdrop-blur-sm transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e53935] sm:right-3 sm:top-3 sm:h-8 sm:w-8"
          >
            <Plus size={15} aria-hidden="true" />
          </button>
        </div>
        <div className="pfc-face pfc-back absolute inset-0" inert={!flipped} aria-hidden={!flipped}>
          <BackFace project={project} onClose={() => toggle(false, true)} closeRef={closeRef} />
        </div>
      </div>
    </div>
  );
}
