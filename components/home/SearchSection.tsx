'use client';
import { Search, ChevronDown } from 'lucide-react';

export default function SearchSection() {
  return (
    <div className="w-full">
      {/* หัวข้อเล็กๆ ด้านบน */}
      <div className="mb-6 flex items-center gap-3">
        {/* 📍 เปลี่ยนขีดตกแต่งหน้าหัวข้อเป็นสีแดง */}
        <div className="w-1.5 h-6 bg-[#e53935] rounded-full" />
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">ค้นหาโครงการที่ใช่</h2>
        <span className="text-sm text-slate-500 ml-1 hidden sm:block">
          ค้นหาคอนโดและบ้านในทำเลศักยภาพ
        </span>
      </div>

      {/* กล่องค้นหาหลัก (ไร้กรอบ ใช้แค่เงาจางๆ) */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-2 md:p-3 flex flex-col md:flex-row gap-2">
        
        {/* ช่องพิมพ์ค้นหา - ไร้กรอบ ใช้ bg-slate-50 */}
        <div className="flex-[1.2] relative flex items-center bg-slate-50 rounded-xl px-4 h-[52px] transition-colors hover:bg-slate-100 focus-within:bg-slate-100">
          {/* 📍 เปลี่ยนสีไอคอนแว่นขยายเป็นสีแดง */}
          <Search className="text-[#e53935] shrink-0" size={20} />
          <input 
            type="text"
            placeholder="พิมพ์ชื่อโครงการ หรือทำเลที่คุณสนใจ..."
            className="w-full bg-transparent outline-none text-slate-700 text-[15px] pl-3 h-full placeholder:text-slate-400"
          />
        </div>

        {/* ตัวเลือก (Dropdowns) - ไร้กรอบ */}
        <div className="flex-[1.5] grid grid-cols-3 gap-2">
          {['ประเภท', 'ทำเล', 'ช่วงราคา'].map((label) => (
            <div key={label} className="relative h-[52px] bg-slate-50 rounded-xl transition-colors hover:bg-slate-100 group">
              <select 
                className="w-full h-full bg-transparent pl-4 pr-10 text-[14px] font-medium text-slate-700 outline-none appearance-none cursor-pointer relative z-10"
              >
                <option value="">{label}ทั้งหมด</option>
                {/* เพิ่ม Option ตรงนี้ในอนาคต */}
              </select>
              {/* 📍 เปลี่ยนสีลูกศรตอน hover เป็นสีแดง */}
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#e53935] transition-colors pointer-events-none z-0" size={16} />
            </div>
          ))}
        </div>

        {/* ปุ่มค้นหา */}
        {/* 📍 เปลี่ยนสีปุ่มเป็นแดง (#e53935), hover แดงเข้ม (#c62828) และเปลี่ยนสี shadow เป็น red-500/20 */}
        <button className="bg-[#e53935] text-white font-bold px-10 rounded-xl hover:bg-[#c62828] transition-colors text-[15px] whitespace-nowrap h-[52px] shadow-lg shadow-red-500/20 active:scale-95">
          ค้นหาโครงการ
        </button>
        
      </div>
    </div>
  );
}