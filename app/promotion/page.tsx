import type { Metadata } from 'next';
import Link from 'next/link';
import { readData } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { ArrowRight, Clock } from 'lucide-react';

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

export default function PromotionPage() {
  const promotions = readData<Promotion[]>('promotions.json');
  const active = promotions.filter((p) => p.isActive);
  const expired = promotions.filter((p) => !p.isActive);

  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        <section
          className="py-20 text-white"
          style={{ background: 'linear-gradient(135deg, #f4511e 0%, #d43e0e 100%)' }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-white/80 font-semibold text-sm uppercase tracking-widest mb-3">Special Offers</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">โปรโมชั่นพิเศษ</h1>
            <p className="text-white/90 text-lg">ข้อเสนอสุดพิเศษจาก ASAKAN มีจำนวนจำกัด รีบจองก่อนหมด!</p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            {active.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">ขณะนี้ยังไม่มีโปรโมชั่น กรุณาติดตามเร็วๆ นี้</p>
              </div>
            ) : (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-[#1a2d6b]">โปรโมชั่นที่กำลังดำเนินการ</h2>
                {active.map((promo) => (
                  <div
                    key={promo.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md border border-orange-100"
                  >
                    <div className="bg-gradient-to-r from-[#f4511e] to-[#ff7a45] p-1">
                      <div className="bg-white rounded-xl p-8 md:flex items-center gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                              กำลังดำเนินการ
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-[#1a2d6b] mb-2">{promo.title}</h3>
                          <p className="text-[#f4511e] font-semibold text-lg mb-3">{promo.subtitle}</p>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">{promo.description}</p>
                          {promo.project && (
                            <p className="text-gray-500 text-sm">
                              <span className="font-medium">โครงการ:</span> {promo.project}
                            </p>
                          )}
                          {promo.validUntil && (
                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                              <Clock size={14} />
                              ถึง {new Date(promo.validUntil).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                          )}
                        </div>
                        <div className="text-center mt-6 md:mt-0 flex-shrink-0">
                          <div className="bg-orange-50 border-2 border-[#f4511e] rounded-2xl px-8 py-5 mb-4">
                            <div className="text-[#f4511e] font-bold text-xl">{promo.discount}</div>
                          </div>
                          <Link
                            href={promo.ctaUrl}
                            className="flex items-center justify-center gap-2 bg-[#f4511e] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#d43e0e]"
                          >
                            {promo.ctaText}
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-16 bg-[#1a2d6b] rounded-2xl p-10 text-white text-center">
              <h3 className="text-2xl font-bold mb-3">อยากรู้ข่าวโปรโมชั่นก่อนใคร?</h3>
              <p className="text-gray-300 mb-6">ติดต่อเราผ่าน LINE เพื่อรับข่าวสารโปรโมชั่นพิเศษก่อนใคร</p>
              <a
                href="https://line.me/ti/p/~@asakan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00c300] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#00a300]"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
                </svg>
                Add LINE @asakan
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
