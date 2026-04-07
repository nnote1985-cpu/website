'use client';

import { useState } from 'react';

export default function PromoHeroWrapper({ 
  promoBanner, 
  fallbackHero 
}: { 
  promoBanner?: string; 
  fallbackHero: React.ReactNode; 
}) {
  // State คอยจำว่ารูปโปรโมชั่นโหลดพังหรือไม่
  const [hasError, setHasError] = useState(false);

  // ถ้าไม่มีการใส่ path มาเลย หรือ โหลดรูปแล้วพัง (ไม่มีไฟล์จริง) -> โชว์หน้า Hero ปกติ
  if (!promoBanner || hasError) {
    return <>{fallbackHero}</>;
  }

  return (
    <section className="relative w-full h-[calc(100vh-80px)] md:h-[80vh] bg-[#0d1838] overflow-hidden group cursor-pointer flex items-center justify-center p-4">
      <a href="#register" className="absolute inset-0 z-10 flex items-center justify-center">
        <img 
          src={promoBanner} 
          alt="Promotion Banner" 
          onError={() => setHasError(true)} // 📍 ถ้ารูปไม่มีอยู่จริง สั่งให้ state เป็น true ทันที
          className="w-full h-full max-h-full object-contain rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-105 animate-in fade-in duration-500" 
        />
      </a>
    </section>
  );
}