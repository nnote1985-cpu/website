'use client';

import Link from 'next/link';
import { MapPin, Building2, Layers, ArrowRight } from 'lucide-react';
import { getStatusLabel, getStatusColor } from '@/lib/utils';
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

  return (
    <article className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-500 border border-slate-100">
      
      {/* --- 1. Image & Top Section (ลดความสูงลง) --- */}
      <div className="relative h-48 md:h-52 w-full bg-slate-100 overflow-hidden">
        {/* Placeholder Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
          <Building2 size={28} strokeWidth={1} />
        </div>
        
        {/* Actual Image */}
        {project.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
        
        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-80" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-[9px] font-bold uppercase tracking-widest bg-white/95 backdrop-blur-sm shadow-sm ${
             project.status === 'presale' ? 'text-orange-600' : 'text-slate-800'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${project.status === 'presale' ? 'bg-orange-500 animate-pulse' : 'bg-slate-400'}`} />
            {statusLabel}
          </span>
        </div>

        {/* Concept Label */}
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-white/90 text-[10px] uppercase tracking-[0.2em] font-medium border-l-[1.5px] border-[#f4511e] pl-2 line-clamp-1">
            {project.concept || 'ASAKAN RESIDENCES'}
          </p>
        </div>
      </div>

      {/* --- 2. Content Section (กระชับพื้นที่) --- */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Project Name */}
        <div className="mb-3">
          <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-[#f4511e] transition-colors line-clamp-1">
            {project.name}
          </h3>
        </div>

        {/* Key Stats (ทำเป็นแถวเดียวเพื่อให้เตี้ยลง) */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 pb-4 border-b border-slate-100 text-[12px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-[#f4511e]" />
            <span className="truncate max-w-[140px]" title={project.bts}>{project.bts}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers size={14} className="text-[#f4511e]" />
            <span>{project.floors} ชั้น</span>
          </div>
        </div>

        {/* --- 3. Footer Section (Price & CTA) --- */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
              Starting Price
            </span>
            <div className="flex items-baseline gap-1 text-[#f4511e]">
              <span className="font-black text-xl leading-none">
                 {project.priceMin}
              </span>
              <span className="text-xs font-bold">
                 ล้านบาท*
              </span>
            </div>
          </div>
          
          {/* Elegant Arrow CTA (ย่อขนาดลงนิดนึง) */}
          <Link
            href={projectUrl(project.slug)}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 text-slate-400 group-hover:bg-[#f4511e] group-hover:border-[#f4511e] group-hover:text-white transition-all duration-300"
            aria-label={`ดูรายละเอียดโครงการ ${project.name}`}
          >
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      
    </article>
  );
}