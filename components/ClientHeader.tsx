'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header'; // ตรวจสอบ path ของคอมโพเนนต์ Header คุณด้วยนะครับ

export default function ClientHeader() {
  const pathname = usePathname();
  
  // 📍 เช็คว่า URL มีคำว่า /projects/ หรือไม่
  const isProjectPage = pathname?.includes('/projects/');

  // ถ้าเป็นหน้าโปรเจกต์ (Slug) ให้ส่งค่าว่างกลับไป (เท่ากับซ่อน Navbar หลัก)
  if (isProjectPage) {
    return null; 
  }

  // ถ้าเป็นหน้าอื่นๆ (Home, About, etc.) ให้แสดง Navbar ตามปกติ
  return <Header />;
}