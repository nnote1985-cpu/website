'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown } from 'lucide-react';

interface Project {
  location: string;
  price_min: number;
  status: string;
}

interface Props {
  projects: Project[];
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

export default function SearchSection({ projects }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');

  const locations = [...new Set(projects.map((p) => p.location).filter(Boolean))];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (status) params.set('status', status);
    if (location) params.set('location', location);
    if (price) params.set('price', price);
    router.push(`/projects${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-1.5 h-6 bg-[#e53935] rounded-full" />
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">ค้นหาโครงการที่ใช่</h2>
        <span className="text-sm text-slate-500 ml-1 hidden sm:block">
          ค้นหาคอนโดและบ้านในทำเลศักยภาพ
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-2 md:p-3 flex flex-col md:flex-row gap-2">

        {/* ช่องพิมพ์ค้นหา */}
        <div className="flex-[1.2] relative flex items-center bg-slate-50 rounded-xl px-4 h-[52px] transition-colors hover:bg-slate-100 focus-within:bg-slate-100">
          <Search className="text-[#e53935] shrink-0" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="พิมพ์ชื่อโครงการ หรือทำเลที่คุณสนใจ..."
            className="w-full bg-transparent outline-none text-slate-700 text-[15px] pl-3 h-full placeholder:text-slate-400"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex-[1.5] grid grid-cols-3 gap-2">
          {/* สถานะ */}
          <div className="relative h-[52px] bg-slate-50 rounded-xl transition-colors hover:bg-slate-100 group">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full h-full bg-transparent pl-4 pr-10 text-[14px] font-medium text-slate-700 outline-none appearance-none cursor-pointer relative z-10"
            >
              <option value="">สถานะทั้งหมด</option>
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#e53935] transition-colors pointer-events-none z-0" size={16} />
          </div>

          {/* ทำเล */}
          <div className="relative h-[52px] bg-slate-50 rounded-xl transition-colors hover:bg-slate-100 group">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-full bg-transparent pl-4 pr-10 text-[14px] font-medium text-slate-700 outline-none appearance-none cursor-pointer relative z-10"
            >
              <option value="">ทำเลทั้งหมด</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#e53935] transition-colors pointer-events-none z-0" size={16} />
          </div>

          {/* ช่วงราคา */}
          <div className="relative h-[52px] bg-slate-50 rounded-xl transition-colors hover:bg-slate-100 group">
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-full bg-transparent pl-4 pr-10 text-[14px] font-medium text-slate-700 outline-none appearance-none cursor-pointer relative z-10"
            >
              <option value="">ช่วงราคาทั้งหมด</option>
              {PRICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#e53935] transition-colors pointer-events-none z-0" size={16} />
          </div>
        </div>

        {/* ปุ่มค้นหา */}
        <button
          onClick={handleSearch}
          className="bg-[#e53935] text-white font-bold px-10 rounded-xl hover:bg-[#c62828] transition-colors text-[15px] whitespace-nowrap h-[52px] shadow-lg shadow-red-500/20 active:scale-95"
        >
          ค้นหาโครงการ
        </button>
      </div>
    </div>
  );
}
