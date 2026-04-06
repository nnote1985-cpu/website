import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readData } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatPriceRange, getStatusLabel, getStatusColor } from '@/lib/utils';
import { MapPin, Building2, Users, CheckCircle2, Phone, ArrowRight } from 'lucide-react';
import FloatingCTA from '@/components/FloatingCTA';
import PixelViewContent from '@/components/PixelViewContent';

interface Project {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
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
  descriptionEn: string;
  features: string[];
  roomTypes: { type: string; size: string }[];
  image: string;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const projects = readData<Project[]>('projects.json');
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Not Found' };

  return {
    title: `${project.name} | ASAKAN คอนโดมิเนียม`,
    description: `${project.name} - ${project.description} ราคา ${formatPriceRange(project.priceMin, project.priceMax)}`,
    openGraph: {
      title: project.name,
      description: project.description,
      images: project.image ? [{ url: project.image }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = readData<Project[]>('projects.json');
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const statusLabel = getStatusLabel(project.status);
  const statusColor = getStatusColor(project.status);

  return (
    <>
      <Header />
      <FloatingCTA />
      <PixelViewContent name={project.name} value={project.priceMin} />
      <main className="pt-20">
        {/* Hero */}
        <div
          className="relative h-72 md:h-96 bg-gradient-to-br from-[#1a2d6b] to-[#f4511e] flex items-end"
        >
          {project.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 pb-8 w-full">
            <span className={`inline-block mb-3 text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}>
              {statusLabel}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{project.name}</h1>
            <p className="text-white/80 text-base italic">{project.concept}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-[#1a2d6b] mb-4">ภาพรวมโครงการ</h2>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Building2 size={20} />, label: 'ความสูง', value: `${project.floors} ชั้น` },
                { icon: <Users size={20} />, label: 'จำนวนยูนิต', value: `${project.units} ยูนิต` },
                { icon: <MapPin size={20} />, label: 'ทำเล', value: project.location },
                { icon: <Building2 size={20} />, label: 'ประเภท', value: project.type },
              ].map((stat) => (
                <div key={stat.label} className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-[#f4511e] flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                  <div className="font-semibold text-[#1a2d6b] text-sm">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-bold text-[#1a2d6b] mb-3">ทำเลที่ตั้ง</h2>
              <div className="flex items-start gap-2 text-gray-600">
                <MapPin size={18} className="text-[#f4511e] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{project.location}</p>
                  <p className="text-sm text-gray-500 mt-1">{project.bts}</p>
                </div>
              </div>
            </div>

            {/* Room Types */}
            {project.roomTypes?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#1a2d6b] mb-4">รูปแบบห้อง</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {project.roomTypes.map((room) => (
                    <div key={room.type} className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center">
                      <div className="font-semibold text-[#1a2d6b] text-sm mb-1">{room.type}</div>
                      <div className="text-[#f4511e] font-bold text-sm">{room.size}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {project.features?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#1a2d6b] mb-4">สิ่งอำนวยความสะดวก</h2>
                <div className="grid grid-cols-2 gap-2">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-gray-700 text-sm">
                      <CheckCircle2 size={16} className="text-[#f4511e] flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-28 shadow-md">
              <div className="text-xs text-gray-400 mb-1">ราคาเริ่มต้น</div>
              <div className="text-2xl font-bold text-[#f4511e] mb-1">
                {formatPriceRange(project.priceMin, project.priceMax)}
              </div>
              <div className="text-xs text-gray-400 mb-6">ราคาเฉลี่ยโดยประมาณ</div>

              <div className="space-y-3">
                <a
                  href="tel:0825265566"
                  className="w-full flex items-center justify-center gap-2 bg-[#f4511e] text-white font-bold py-3.5 rounded-xl hover:bg-[#d43e0e]"
                >
                  <Phone size={18} />
                  โทรสอบถาม
                </a>
                <a
                  href="https://line.me/ti/p/~@asakan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#00c300] text-white font-bold py-3.5 rounded-xl hover:bg-[#00a300]"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
                  </svg>
                  ทัก LINE
                </a>
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 border-2 border-[#1a2d6b] text-[#1a2d6b] font-bold py-3.5 rounded-xl hover:bg-[#1a2d6b] hover:text-white"
                >
                  ส่งข้อความ <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-400 space-y-2">
                <div className="flex justify-between">
                  <span>ประเภท</span><span className="font-medium text-gray-600">{project.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>จำนวนชั้น</span><span className="font-medium text-gray-600">{project.floors} ชั้น</span>
                </div>
                <div className="flex justify-between">
                  <span>จำนวนยูนิต</span><span className="font-medium text-gray-600">{project.units} ยูนิต</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
