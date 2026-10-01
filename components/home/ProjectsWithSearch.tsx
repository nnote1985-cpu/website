'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

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

const STATUS_OPTIONS = [
  { value: 'active', label: 'เปิดขายแล้ว' },
  { value: 'coming-soon', label: 'เร็วๆ นี้' },
  { value: 'sold-out', label: 'ขายหมดแล้ว' },
];

const PRICE_OPTIONS = [
  { value: '0-2000000', label: 'ต่ำกว่า 2 ล้าน' },
  { value: '2000000-4000000', label: '2 – 4 ล้าน' },
  { value: '4000000-99999999', label: 'มากกว่า 4 ล้าน' },
];

export default function ProjectsWithSearch({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');

  const locations = useMemo(
    () => [...new Set(projects.map((p) => p.location).filter(Boolean))],
    [projects]
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      // Default to active-only when no status filter selected
      const effectiveStatus = status || 'active';
      if (p.status !== effectiveStatus) return false;
      if (location && p.location !== location) return false;
      if (price) {
        const [min, max] = price.split('-').map(Number);
        if (p.priceMin < min || p.priceMin > max) return false;
      }
      if (query) {
        const q = query.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.location.toLowerCase().includes(q) &&
          !p.bts?.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [projects, query, status, location, price]);

  const isFiltering = !!(query || status || location || price);

  const clearAll = () => {
    setQuery('');
    setStatus('');
    setLocation('');
    setPrice('');
  };

  return (
    <div>
      {/* Search bar */}
      <section className="relative bg-slate-50 py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#e53935] rounded-full" />
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">ค้นหาโครงการที่ใช่</h2>
            <span className="text-sm text-slate-500 ml-1 hidden sm:block">
              ค้นหาคอนโดและบ้านในทำเลศักยภาพ
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-2 md:p-3 flex flex-col md:flex-row gap-2">
            {/* ช่องค้นหา */}
            <div className="flex-[1.2] relative flex items-center bg-slate-50 rounded-xl px-4 h-[52px] transition-colors hover:bg-slate-100 focus-within:bg-slate-100">
              <Search className="text-[#e53935] shrink-0" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="พิมพ์ชื่อโครงการ หรือทำเลที่คุณสนใจ..."
                className="w-full bg-transparent outline-none text-slate-700 text-[15px] pl-3 h-full placeholder:text-slate-400"
              />
            </div>

            {/* Dropdowns */}
            <div className="flex-[1.5] grid grid-cols-3 gap-2">
              <div className="relative h-[52px] bg-slate-50 rounded-xl hover:bg-slate-100 group transition-colors">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  aria-label="กรองตามสถานะโครงการ"
                  className="w-full h-full bg-transparent pl-3 pr-7 text-[13px] md:text-[14px] font-medium text-slate-700 outline-none appearance-none cursor-pointer relative z-10"
                >
                  <option value="">สถานะ</option>
                  {STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#e53935] transition-colors pointer-events-none z-0" size={14} />
              </div>

              <div className="relative h-[52px] bg-slate-50 rounded-xl hover:bg-slate-100 group transition-colors">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-label="กรองตามทำเล"
                  className="w-full h-full bg-transparent pl-3 pr-7 text-[13px] md:text-[14px] font-medium text-slate-700 outline-none appearance-none cursor-pointer relative z-10"
                >
                  <option value="">ทำเล</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#e53935] transition-colors pointer-events-none z-0" size={14} />
              </div>

              <div className="relative h-[52px] bg-slate-50 rounded-xl hover:bg-slate-100 group transition-colors">
                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  aria-label="กรองตามช่วงราคา"
                  className="w-full h-full bg-transparent pl-3 pr-7 text-[13px] md:text-[14px] font-medium text-slate-700 outline-none appearance-none cursor-pointer relative z-10"
                >
                  <option value="">ช่วงราคา</option>
                  {PRICE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#e53935] transition-colors pointer-events-none z-0" size={14} />
              </div>
            </div>

            {/* ล้างตัวกรอง — แสดงเฉพาะเมื่อมี filter */}
            {isFiltering && (
              <button
                onClick={clearAll}
                className="bg-slate-100 text-slate-600 font-bold px-6 rounded-xl hover:bg-slate-200 transition-colors text-[14px] whitespace-nowrap h-[52px]"
              >
                ล้างตัวกรอง
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Project grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-center md:text-left gap-6">
            <div>
              <p className="text-[#e53935] font-bold tracking-widest text-xs uppercase mb-2">Our Projects</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">โครงการคอนโดมิเนียม</h2>
              {isFiltering ? (
                <p className="text-slate-500 mt-3 text-sm">
                  พบ <span className="font-bold text-slate-700">{filtered.length}</span> โครงการ
                </p>
              ) : (
                <p className="text-slate-500 mt-3 max-w-xl text-sm">
                  เลือกที่อยู่อาศัยที่ตรงใจ ใกล้รถไฟฟ้า ราคาเข้าถึงได้ พร้อมสิ่งอำนวยความสะดวกครบครัน
                </p>
              )}
            </div>
            <Link
              href="/projects"
              className="hidden md:flex items-center gap-2 text-slate-900 font-bold hover:text-[#e53935] transition-colors"
            >
              ดูโครงการทั้งหมด <ArrowRight size={20} />
            </Link>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-8">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500">
              <p className="text-lg font-medium mb-3">ไม่พบโครงการที่ตรงกับตัวเลือก</p>
              <button
                onClick={clearAll}
                className="text-[#e53935] font-bold underline underline-offset-4 text-sm"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          )}

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
    </div>
  );
}
