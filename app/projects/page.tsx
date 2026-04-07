import type { Metadata } from 'next';
import { readData } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/home/ProjectCard';
import FloatingCTA from '@/components/FloatingCTA';
import { MapPin, Phone, ArrowRight, Camera, Layout as LayoutIcon, PlayCircle, Layers, CheckCircle2, ChevronLeft } from 'lucide-react';

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

export default function ProjectsPage() {
  const projects = readData<Project[]>('projects.json');
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
            {active.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-[#1a2d6b] mb-8">โครงการเปิดขาย</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                  {active.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </>
            )}

            {soldOut.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-gray-500 mb-8">โครงการที่ขายหมดแล้ว</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {soldOut.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
