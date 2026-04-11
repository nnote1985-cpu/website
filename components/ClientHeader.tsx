'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header'; // ตรวจสอบ path ของคอมโพเนนต์ Header คุณด้วยนะครับ

export default function ClientHeader() {
  const pathname = usePathname();
  
  // เช็คว่าเป็นหน้าโปรเจกต์ (รวม short URLs)
  const PROJECT_PATHS = ['/projects/', '/elysium59', '/theceline'];
  const isProjectPage = PROJECT_PATHS.some(p => pathname?.startsWith(p));

  // ถ้าเป็นหน้าโปรเจกต์ (Slug) ให้ส่งค่าว่างกลับไป (เท่ากับซ่อน Navbar หลัก)
  if (isProjectPage) {
    return null; 
  }

  // ถ้าเป็นหน้าอื่นๆ (Home, About, etc.) ให้แสดง Navbar ตามปกติ
  return <Header />;
}