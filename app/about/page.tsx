import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import Header from '@/components/Header';
import FloatingCTA from '@/components/FloatingCTA';
import Footer from '@/components/Footer';
import { getContactSettings, lineUrl, telHref } from '@/lib/getContactSettings';
import projects from '@/data/projects.json';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | ASAKAN บริษัท อัสสกาญจน์',
  description: 'ASAKAN บริษัท อัสสกาญจน์ จำกัด ผู้พัฒนาอสังหาริมทรัพย์ชั้นนำในกรุงเทพฯ กว่า 25 ปี ด้วยปรัชญา Beyond Expectation',
};

const STATS = [
  { value: '25+', label: 'ปีในธุรกิจอสังหาฯ' },
  { value: '10+', label: 'โครงการที่พัฒนา' },
  { value: '2,500+', label: 'ยูนิตที่ส่งมอบ' },
];

const PRINCIPLES = [
  {
    en: 'Mission',
    title: 'พันธกิจ',
    body: 'พัฒนาโครงการในทำเลที่ดี ด้วยราคาที่เข้าถึงได้ เพื่อยกระดับคุณภาพชีวิตของชุมชน และสร้างความพึงพอใจสูงสุดให้กับลูกค้า',
  },
  {
    en: 'Vision',
    title: 'วิสัยทัศน์',
    body: 'มุ่งสู่การเป็นผู้พัฒนาคอนโดมิเนียมชั้นนำที่มีการเติบโตอย่างยั่งยืน โดยให้ความสำคัญกับความต้องการของลูกค้าเป็นหลัก',
  },
  {
    en: 'Philosophy',
    title: 'ปรัชญา',
    body: '"Freedom of Life" เชื่อในการคิดอย่างอิสระ แสดงออกในแบบของตัวเอง ASAKAN เชื่อว่าคุณคือลูกค้าที่สำคัญ',
  },
];

const COMPANY_INFO = [
  { label: 'ชื่อบริษัท', value: 'บริษัท อัสสกาญจน์ จำกัด (ASAKAN CO., LTD)' },
  { label: 'ที่ตั้ง', value: '191 อาคาร อัสสกาญจน์ ถนนรามคำแหง แขวงสะพานสูง เขตสะพานสูง กรุงเทพมหานคร 10240' },
  { label: 'โทรศัพท์', value: '082-526-5566 / 02-059-9655 / 099-198-2940' },
  { label: 'อีเมล', value: 'asakanmkt@gmail.com' },
];

// Sold-out projects from the project data, plus earlier projects that only exist as images.
const delivered: { slug: string; name: string; image: string; units?: number }[] = [
  ...projects.filter((p) => p.status === 'sold-out'),
  { slug: 'asakan-place-ladprao', name: 'Asakan Place ลาดพร้าว', image: '/images/Asakan-Place-ลาดพร้าว.webp' },
  { slug: 'asakan-tower-srinakarin', name: 'Asakan Tower ศรีนครินทร์', image: '/images/Asakan-Tower-Srinakarin.webp' },
];

export default async function AboutPage() {
  const contact = await getContactSettings();
  const phone = contact.phone[0];

  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-[#050B14] text-white md:min-h-[640px]">
          <Image
            src="/images/about.webp"
            alt="พื้นที่ส่วนกลางโครงการ ASAKAN"
            fill
            preload
            sizes="100vw"
            className="about-hero-image -z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050B14]/95 via-[#050B14]/55 to-[#050B14]/15" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050B14]/70 to-transparent" />

          <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-32 md:pb-14">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
              About ASAKAN
            </p>
            <h1 className="max-w-3xl text-[clamp(2.25rem,6vw,4.25rem)] font-bold leading-[1.15] tracking-[-0.02em] [text-wrap:balance]">
              ที่อยู่อาศัยคุณภาพ ในราคาที่เข้าถึงได้
            </h1>
            <p className="mt-6 max-w-xl text-base leading-[1.8] text-white/80 md:text-lg">
              บริษัท อัสสกาญจน์ จำกัด พัฒนาคอนโดมิเนียมในทำเลใกล้รถไฟฟ้าทั่วกรุงเทพฯ มากว่า 25 ปี เพื่อยกระดับคุณภาพชีวิตของคนเมือง
            </p>

            <dl className="mt-12 grid grid-cols-3 border-t border-white/20 pt-6 md:mt-16 md:max-w-3xl">
              {STATS.map((stat, i) => (
                <div key={stat.label} className={i > 0 ? 'border-l border-white/20 pl-4 md:pl-8' : 'pr-4'}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-[clamp(1.75rem,5vw,3rem)] font-bold leading-none tracking-[-0.02em]">{stat.value}</dd>
                  <dd className="mt-2 text-xs text-white/70 md:text-sm">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Story */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.2] tracking-[-0.01em] text-[#1a2d6b] [text-wrap:balance]">
                25 ปีแห่งความไว้วางใจ
              </h2>
              <div className="mt-8 space-y-5 text-base leading-[1.8] text-[#1f2937] [text-wrap:pretty]">
                <p>
                  บริษัท อัสสกาญจน์ จำกัด ก่อตั้งขึ้นด้วยความมุ่งมั่นในการพัฒนาที่อยู่อาศัยคุณภาพสูงในราคาที่เข้าถึงได้ สำหรับคนกรุงเทพฯ ทุกระดับ
                </p>
                <p>
                  ตลอดระยะเวลากว่า 25 ปี เราได้พัฒนาโครงการคอนโดมิเนียมมากกว่า 10 โครงการ ส่งมอบห้องพักกว่า 2,500 ยูนิต ให้กับผู้ซื้อที่ไว้วางใจเรา
                </p>
                <p>
                  ASAKAN เชื่อว่าทุกคนมีสิทธิ์มีที่อยู่อาศัยที่ดี นั่นคือเหตุผลที่เราพัฒนาโครงการในทำเลศักยภาพ ใกล้รถไฟฟ้า ด้วยราคาที่ยุติธรรม
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src="/hero/perspective7.webp"
                  alt="ภาพจำลองทางเข้าโครงการ ASAKAN Elysium"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission, vision, philosophy */}
        <section className="bg-[#0f1e4a] py-20 text-white md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="max-w-2xl text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.2] tracking-[-0.01em] [text-wrap:balance]">
              สิ่งที่เรายึดถือในทุกโครงการ
            </h2>
            <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
              {PRINCIPLES.map((item, i) => (
                <div key={item.en} className="border-t border-white/20 pt-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold tabular-nums text-white/40">0{i + 1}</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/50">{item.en}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-base leading-[1.8] text-white/75 [text-wrap:pretty]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Delivered projects */}
        {delivered.length > 0 && (
          <section className="bg-[#f8fafc] py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-6">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.2] tracking-[-0.01em] text-[#1a2d6b]">
                    ผลงานที่ส่งมอบแล้ว
                  </h2>
                  <p className="mt-3 max-w-xl text-base leading-[1.8] text-slate-600">
                    ตัวอย่างโครงการที่ปิดการขายและส่งมอบให้ลูกบ้านเรียบร้อยแล้ว
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1a2d6b] hover:text-[#e53935] transition-colors"
                >
                  ดูโครงการทั้งหมด <ArrowRight size={16} />
                </Link>
              </div>

              <ul className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-5">
                {delivered.map((p) => (
                  <li key={p.slug} className="w-[78%] shrink-0 snap-start md:w-auto">
                    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
                      <div className="relative aspect-[4/3] bg-slate-100">
                        <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 78vw, (max-width: 1024px) 33vw, 20vw" className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-[15px] font-semibold leading-snug text-[#1a2d6b]">{p.name}</h3>
                        {p.units ? <p className="mt-1 text-sm text-slate-500 tabular-nums">{p.units.toLocaleString('th-TH')} ยูนิต</p> : null}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Company info + contact */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.2] tracking-[-0.01em] text-[#1a2d6b]">
                ข้อมูลบริษัท
              </h2>
              <p className="mt-4 max-w-md text-base leading-[1.8] text-slate-600">
                สำหรับลูกค้าและพาร์ทเนอร์ที่ต้องการติดต่อ ASAKAN โดยตรง ทีมงานพร้อมให้คำปรึกษาทุกวัน
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={telHref(phone)}
                  className="inline-flex items-center gap-2 rounded-sm bg-[#e53935] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#b71c1c]"
                >
                  <Phone size={16} /> โทร {phone}
                </a>
                <a
                  href={lineUrl(contact.line)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#00c300] px-6 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  LINE {contact.line}
                </a>
              </div>
            </div>

            <dl className="divide-y divide-slate-200 border-y border-slate-200 lg:col-span-7">
              {COMPANY_INFO.map((item) => (
                <div key={item.label} className="grid gap-1 py-5 sm:grid-cols-[140px_1fr] sm:gap-6">
                  <dt className="text-sm font-bold text-[#1a2d6b]">{item.label}</dt>
                  <dd className="text-base leading-[1.7] text-[#1f2937]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
