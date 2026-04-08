import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/home/ProjectCard';
import FloatingCTA from '@/components/FloatingCTA';

export const metadata: Metadata = {
  title: 'โครงการทั้งหมด | ASAKAN คอนโดมิเนียมกรุงเทพฯ',
  description: 'โครงการคอนโดมิเนียมของ ASAKAN ทั้งหมด Elysium Phahol-59, Elysium Ram Interchange, The Celine Bang Chan, Wela Ramkhamhaeng ราคาเริ่มต้น 1.21 ล้านบาท',
};

interface Project {
  id: string;
  slug: string;
  name: string;
  status: string;
  type: string;
  floors: number;
  units: number;
  priceMin: number;
  priceMax: number;
  location: string;
  bts: string;
  concept: string;
  description: string;
  image: string;
  isFeatured: boolean;
  isSoldOut: boolean;
}

const STATUS_LABELS: Record<string, string> = {
  active: 'เปิดขายแล้ว',
  'coming-soon': 'เร็วๆ นี้',
  'sold-out': 'ขายหมดแล้ว',
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; location?: string; price?: string }>;
}) {
  const { q, status, location, price } = await searchParams;

  const { data } = await supabaseAdmin.from('projects').select('*').order('created_at', { ascending: false });
  let projects: Project[] = (data || []).map((p) => ({
    ...p,
    priceMin: p.price_min,
    priceMax: p.price_max,
    isFeatured: true,
    isSoldOut: p.status === 'sold-out',
  }));

  // Filter
  if (q) {
    const lower = q.toLowerCase();
    projects = projects.filter(
      (p) => p.name.toLowerCase().includes(lower) || p.location.toLowerCase().includes(lower) || p.bts?.toLowerCase().includes(lower)
    );
  }
  if (status) projects = projects.filter((p) => p.status === status);
  if (location) projects = projects.filter((p) => p.location === location);
  if (price) {
    const [min, max] = price.split('-').map(Number);
    projects = projects.filter((p) => p.priceMin >= min && p.priceMin <= max);
  }

  const isFiltered = !!(q || status || location || price);
  const active = projects.filter((p) => p.status !== 'sold-out');
  const soldOut = projects.filter((p) => p.status === 'sold-out');

  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        <section
          className="py-20 text-white"
          style={{ background: 'linear-gradient(135deg, #0f1e4a 0%, #1a2d6b 60%, #2a3d8b 100%)' }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-orange-400 font-semibold text-sm uppercase tracking-widest mb-3">Portfolio</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">โครงการของเรา</h1>
            <p className="text-gray-300 text-lg">
              คอนโดมิเนียมคุณภาพในกรุงเทพฯ ราคาเริ่มต้น 1.21 ล้านบาท
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">

            {/* แสดง filter ที่ active */}
            {isFiltered && (
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-sm text-gray-500">ผลการค้นหา {projects.length} โครงการ</span>
                {q && <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">"{q}"</span>}
                {status && <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">{STATUS_LABELS[status] || status}</span>}
                {location && <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">{location}</span>}
                <a href="/projects" className="text-xs text-red-500 underline">ล้างตัวกรอง</a>
              </div>
            )}

            {projects.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <p className="text-lg">ไม่พบโครงการที่ตรงกับการค้นหา</p>
                <a href="/projects" className="text-[#e53935] font-semibold mt-4 inline-block">ดูโครงการทั้งหมด</a>
              </div>
            ) : (
              <>
                {(!isFiltered || active.length > 0) && active.length > 0 && (
                  <>
                    {!isFiltered && <h2 className="text-2xl font-bold text-[#1a2d6b] mb-8">โครงการเปิดขาย</h2>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                      {active.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </>
                )}

                {(!isFiltered || soldOut.length > 0) && soldOut.length > 0 && (
                  <>
                    {!isFiltered && <h2 className="text-2xl font-bold text-gray-500 mb-8">โครงการที่ขายหมดแล้ว</h2>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {soldOut.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
