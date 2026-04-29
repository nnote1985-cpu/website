'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Building2, Layers, ArrowRight, Home, Users } from 'lucide-react';
import { getStatusLabel } from '@/lib/utils';
import { projectUrl } from '@/lib/projectUrl';

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
}

export default function ProjectCard({ project }: { project: Project }) {
  const statusLabel = getStatusLabel(project.status);
  const locationText = project.bts || project.location;

  return (
    <article className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-500 border border-slate-100">

      {/* --- 1. Image & Top Section (ลดความสูงลง) --- */}
      <Link href={projectUrl(project.slug)} className="relative h-32 sm:h-44 lg:h-52 w-full bg-slate-100 overflow-hidden block">
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
      </Link>

      {/* --- 2. Content Section (กระชับพื้นที่) --- */}
      <div className="flex flex-col flex-1 p-3 sm:p-5">
        
        {/* Project Name */}
        <div className="mb-2 sm:mb-3">
          <Link href={projectUrl(project.slug)}>
            <h3 className="font-black text-slate-900 text-sm sm:text-lg leading-tight group-hover:text-[#e53935] transition-colors line-clamp-2 min-h-[2.5rem] sm:min-h-0">
              {project.name}
            </h3>
          </Link>
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
            <span className="block text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Starting Price
            </span>
            <div className="flex items-baseline gap-1 text-[#e53935]">
              <span className="font-black text-base sm:text-xl leading-none">
                {Number(project.priceMin).toLocaleString('th-TH')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold">
                บาท*
              </span>
            </div>
          </div>
          
          {/* Elegant Arrow CTA (ย่อขนาดลงนิดนึง) */}
          <Link
            href={projectUrl(project.slug)}
            className="flex shrink-0 items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-200 text-slate-400 group-hover:bg-[#e53935] group-hover:border-[#e53935] group-hover:text-white transition-all duration-300"
            aria-label={`ดูรายละเอียดโครงการ ${project.name}`}
          >
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      
    </article>
  );
}
