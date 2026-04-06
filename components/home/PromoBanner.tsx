'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  project: string;
  discount: string;
  validUntil: string;
  ctaText: string;
  ctaUrl: string;
  isActive: boolean;
}

export default function PromoBanner({ promos }: { promos: Promotion[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // ถ้ามีโปรโมชั่นแค่ 1 อัน หรือไม่มีเลย ไม่ต้องให้มันสไลด์
    if (!promos || promos.length <= 1) return;

    // 📍 แก้จุดที่ 1: เพิ่มเวลาเป็น 8 วินาที เพื่อให้อ่านรายละเอียดได้ทัน
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promos.length);
    }, 8000); 

    return () => clearInterval(interval);
  }, [promos]);

  if (!promos || promos.length === 0) return null;

  return (
    <section className="relative z-10 bg-[#1a2d6b] shadow-md border-b border-[#0f1e4a] overflow-hidden">
      {/* 📍 แก้จุดที่ 2: ล็อกความสูง (Fixed Height) เพื่อไม่ให้หน้าเว็บกระตุกเวลาเฟดเปลี่ยนรูป */}
      <div className="relative w-full max-w-7xl mx-auto px-6 h-[160px] sm:h-[130px] md:h-[110px]">
        {promos.map((promo, index) => {
          const isActive = index === currentIndex;
          
          return (
            <div
              key={promo.id}
              // 📍 แก้จุดที่ 3: ใช้ top-1/2 -translate-y-1/2 เพื่อให้อยู่ตรงกลางเสมอ และใช้ duration-[1500ms] ให้ค่อยๆ ละลายซ้อนกัน (ไม่มีการเด้งขึ้นลงแล้ว)
              className={`absolute inset-x-6 top-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center justify-between gap-4 transition-opacity duration-[1500ms] ease-in-out ${
                isActive 
                  ? 'opacity-100 z-10' 
                  : 'opacity-0 z-0 pointer-events-none' 
              }`}
            >
              {/* ข้อความฝั่งซ้าย */}
              <div className="text-center md:text-left text-white flex-1">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  {/* 📍 เปลี่ยนสีแดงจากรูปตัวอย่าง (#e53935) แทนที่สีส้มเดิม */}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e53935]" />
                  {/* 📍 เปลี่ยนสีตัวหนังสือเป็นสีแดงอ่อน (#ffab91) เพื่อให้อ่านง่ายบนพื้นสีน้ำเงิน */}
                  <span className="text-[#ffab91] text-[10px] font-bold uppercase tracking-widest">
                    {promos.length > 1 ? `Special Offer ${index + 1}/${promos.length}` : 'Limited Promotion'}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight truncate">{promo.title}</h2>
                <p className="text-sm text-blue-200 mt-0.5 truncate hidden md:block">{promo.subtitle}</p>
              </div>
              
              {/* ราคาและปุ่มฝั่งขวา */}
              <div className="flex items-center justify-center md:justify-end gap-4 md:gap-6 flex-shrink-0">
                <div className="text-right hidden sm:block border-r border-blue-800/50 pr-6">
                  <span className="text-[10px] font-medium text-blue-300 uppercase tracking-widest block mb-0.5">
                    Starting From
                  </span>
                  <span className="text-xl font-bold text-white">{promo.discount}</span>
                </div>
                {/* 📍 เปลี่ยนสีพื้นหลังปุ่มเป็นสีแดง (#e53935) และ hover เป็นสีแดงเข้ม (#c62828) */}
                <Link
                  href={promo.ctaUrl}
                  className="flex items-center gap-2 bg-[#e53935] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#c62828] transition-colors text-sm whitespace-nowrap shadow-sm"
                >
                  {promo.ctaText} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}