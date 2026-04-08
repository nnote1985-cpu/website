import type { Metadata } from 'next';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { ArrowRight, Clock, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'โปรโมชั่น | ASAKAN ข้อเสนอพิเศษ',
  description: 'โปรโมชั่นพิเศษจาก ASAKAN ราคาพิเศษ ส่วนลด และสิทธิพิเศษสำหรับผู้จองคอนโดในช่วงเวลาจำกัด',
};

interface Promotion {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  description: string;
  project: string;
  discount: string;
  validUntil: string;
  ctaText: string;
  ctaUrl: string;
  isActive: boolean;
  image: string;
}

export default async function PromotionPage() {
  const { data } = await supabaseAdmin.from('promotions').select('*').order('created_at', { ascending: false });
  const promotions: Promotion[] = (data || []).map((p) => ({ 
    ...p, 
    isActive: p.is_active, 
    titleEn: p.title_en, 
    validUntil: p.valid_until, 
    ctaText: p.cta_text, 
    ctaUrl: p.cta_url 
  }));
  const active = promotions.filter((p) => p.isActive);

  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        {/* Hero Section - ปรับเป็น Deep Navy Gradient */}
        <section
          className="py-24 text-white"
          style={{ background: 'linear-gradient(135deg, #0f1e4a 0%, #1a2d6b 100%)' }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-orange-400 font-bold text-sm uppercase tracking-[0.3em] mb-4">Special Offers</p>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">โปรโมชั่นพิเศษ</h1>
            <p className="text-blue-100/80 text-lg md:text-xl font-light">ข้อเสนอสุดพิเศษจาก ASAKAN คัดสรรมาเพื่อคุณโดยเฉพาะ</p>
          </div>
        </section>

        <section className="py-20 bg-[#f8fafc]">
          <div className="max-w-5xl mx-auto px-4">
            {active.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
                <Tag className="mx-auto text-gray-200 mb-4" size={48} />
                <p className="text-gray-400 text-lg">ขณะนี้ยังไม่มีโปรโมชั่นใหม่ กรุณาติดตามเร็วๆ นี้</p>
              </div>
            ) : (
              <div className="space-y-10">
                <h2 className="text-2xl font-bold text-[#1a2d6b] flex items-center gap-3">
                   <span className="w-8 h-1 bg-[#f4511e] rounded-full"></span>
                   โปรโมชั่นที่กำลังดำเนินการ
                </h2>
                
                {active.map((promo) => (
                  <div
                    key={promo.id}
                    className="group bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-blue-900/5 border border-gray-100 hover:border-orange-200 transition-all duration-300"
                  >
                    <div className="bg-gradient-to-r from-[#f4511e] to-[#ff7a45] p-1">
                      <div className="bg-white rounded-[1.8rem] p-8 md:p-10 md:flex items-center gap-10">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="bg-orange-50 text-[#f4511e] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-orange-100">
                              <span className="w-1.5 h-1.5 bg-[#f4511e] rounded-full animate-ping" />
                              Active Now
                            </span>
                          </div>
                          <h3 className="text-2xl md:text-3xl font-black text-[#1a2d6b] mb-3 group-hover:text-[#f4511e] transition-colors">{promo.title}</h3>
                          <p className="text-[#f4511e] font-bold text-xl mb-4">{promo.subtitle}</p>
                          <p className="text-gray-500 text-base leading-relaxed mb-6 font-light">{promo.description}</p>
                          
                          <div className="flex flex-wrap gap-4 items-center">
                            {promo.project && (
                              <div className="bg-slate-50 px-4 py-2 rounded-xl text-slate-600 text-sm font-medium border border-slate-100">
                                <span className="text-slate-400 mr-1 font-normal">โครงการ:</span> {promo.project}
                              </div>
                            )}
                            {promo.validUntil && (
                              <div className="flex items-center gap-2 text-slate-400 text-sm font-light">
                                <Clock size={16} className="text-orange-300" />
                                ถึง {new Date(promo.validUntil).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-center mt-8 md:mt-0 flex-shrink-0 flex flex-col items-center">
                          <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-[#f4511e] rounded-[2rem] px-10 py-6 mb-6 shadow-lg shadow-orange-500/10">
                            <div className="text-slate-400 text-xs uppercase tracking-widest mb-1">Privilege</div>
                            <div className="text-[#f4511e] font-black text-3xl">{promo.discount}</div>
                          </div>
                          <Link
                            href={promo.ctaUrl}
                            className="w-full flex items-center justify-center gap-3 bg-[#1a2d6b] text-white font-bold px-10 py-4 rounded-2xl hover:bg-[#f4511e] hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1"
                          >
                            {promo.ctaText}
                            <ArrowRight size={18} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA - LINE OA */}
            <div className="mt-24 bg-[#1a2d6b] rounded-[3rem] p-12 text-white text-center relative overflow-hidden shadow-2xl shadow-blue-900/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">รับโปรโมชั่นก่อนใคร</h3>
                <p className="text-blue-200/80 mb-8 max-w-md mx-auto font-light leading-relaxed">แอดไลน์เพื่อรับสิทธิ์เลือกห้องตำแหน่งสวยและรับดีลพิเศษเฉพาะสมาชิก ASAKAN</p>
                <a
                  href="https://line.me/ti/p/~@asakan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#06C755] text-white font-bold px-10 py-4 rounded-2xl hover:bg-[#05b34c] transition-all transform hover:scale-105 shadow-xl shadow-green-500/20"
                >
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
                  </svg>
                  Add LINE @asakan
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}