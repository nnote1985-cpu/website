import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-lg mx-auto px-4 text-center py-20">
          <div className="text-8xl font-bold text-[#f4511e] mb-4 leading-none">404</div>
          <h1 className="text-2xl font-bold text-[#1a2d6b] mb-3">ไม่พบหน้าที่ต้องการ</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            หน้าที่คุณกำลังมองหาอาจถูกลบ เปลี่ยนชื่อ หรือไม่มีอยู่ในระบบ
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-[#f4511e] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#d43e0e]"
            >
              <Home size={18} />
              กลับหน้าแรก
            </Link>
            <Link
              href="/projects"
              className="flex items-center justify-center gap-2 border-2 border-[#1a2d6b] text-[#1a2d6b] font-bold px-7 py-3.5 rounded-xl hover:bg-[#1a2d6b] hover:text-white transition-all"
            >
              <Search size={18} />
              ดูโครงการ
            </Link>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-gray-400 text-sm mb-3">หน้าที่มีอยู่</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { label: 'หน้าแรก', href: '/' },
                { label: 'โครงการ', href: '/projects' },
                { label: 'โปรโมชั่น', href: '/promotion' },
                { label: 'ข่าวสาร', href: '/news' },
                { label: 'ติดต่อ', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-[#f4511e] hover:text-[#f4511e] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
