import type { Metadata } from 'next';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { ArrowRight, Clock, Tag, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'โปรโมชั่น | ASAKAN ข้อเสนอพิเศษ',
  description: 'โปรโมชั่นพิเศษจาก ASAKAN ราคาพิเศษ ส่วนลด และสิทธิพิเศษสำหรับผู้จองคอนโดในช่วงเวลาจำกัด',
};

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

export default async function PromotionPage() {
  const { data } = await supabaseAdmin
    .from('promotions')
    .select('*')
    .order('created_at', { ascending: false });

  const promotions: Promotion[] = (data || []).map((p) => ({ 
    ...p, 
    isActive: p.is_active, 
    validUntil: p.valid_until, 
    ctaText: p.cta_text, 
    ctaUrl: p.cta_url 
  }));
  
  const active = promotions.filter((p) => p.isActive);

  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20 bg-[#f8fafc]">
        {/* Hero Section - ปรับให้เล็กลง กระชับขึ้น */}
        <section
          className="py-16 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #0f1e4a 0%, #1a2d6b 100%)' }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-black mb-3">โปรโมชั่นพิเศษ</h1>
            <p className="text-blue-100/70 text-base font-light">รวมดีลดีที่สุด คัดสรรมาเพื่อคุณโดยเฉพาะ</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            {active.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <p className="text-gray-400">ยังไม่มีโปรโมชั่นใหม่ในขณะนี้</p>
              </div>
            ) : (
              /* 📍 เปลี่ยนเป็น Grid 2 คอลัมน์บนจอใหญ่ */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {active.map((promo) => (
                  <div key={promo.id} className="group relative h-full">
                    {/* ขอบเรืองแสง */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#f4511e] to-[#ff7a45] rounded-[1.8rem] opacity-10 group-hover:opacity-100 transition duration-300"></div>
                    
                    {/* Card Content - ปรับขนาด Padding และ Font ให้เล็กลง */}
                    <div className="relative h-full bg-white rounded-[1.6rem] p-6 shadow-sm group-hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="bg-orange-50 text-[#f4511e] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-orange-100 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#f4511e] rounded-full animate-pulse" />
                            Active
                          </span>
                          {promo.validUntil && (
                            <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                              <Clock size={12} />
                              {new Date(promo.validUntil).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-[#1a2d6b] mb-1 line-clamp-1">{promo.title}</h3>
                        <p className="text-[#f4511e] font-bold text-base mb-3">{promo.subtitle}</p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
                          {promo.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* ส่วนลดแบบกะทัดรัด */}
                        <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl px-4 py-3 flex justify-between items-center">
                          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Privilege</span>
                          <span className="text-[#f4511e] font-black text-xl">{promo.discount}</span>
                        </div>

                        <Link
                          href={promo.ctaUrl || '#'}
                          className="w-full flex items-center justify-center gap-2 bg-[#1a2d6b] text-white font-bold py-3 rounded-xl hover:bg-[#f4511e] transition-all text-sm"
                        >
                          {promo.ctaText || 'ดูรายละเอียด'}
                          <ChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* LINE CTA - ปรับให้เล็กลงพอดีกับ Grid */}
            <div className="mt-16 bg-[#1a2d6b] rounded-[2rem] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-1 text-white">รับข่าวสารโปรลับผ่าน LINE</h3>
                <p className="text-blue-100/60 text-sm font-light">ไม่พลาดทุกดีลพิเศษ คัดมาเพื่อเพื่อนใน LINE เท่านั้น</p>
              </div>
              <a
                href="https://line.me/ti/p/~@asakan"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-[#06C755] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#05b34c] transition-all flex items-center gap-2 text-sm shadow-lg shadow-green-900/20"
              >
                ADD LINE @ASAKAN
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}