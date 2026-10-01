import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import FloatingCTA from '@/components/FloatingCTA';
import Footer from '@/components/Footer';
import { Parallax, Reveal } from '@/components/about/AboutMotion';
import { Target, Eye, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | ASAKAN บริษัท อัสสกาญจน์',
  description: 'ASAKAN บริษัท อัสสกาญจน์ จำกัด ผู้พัฒนาอสังหาริมทรัพย์ชั้นนำในกรุงเทพฯ กว่า 25 ปี ด้วยปรัชญา Beyond Expectation',
};

const PRINCIPLES = [
  {
    icon: Target,
    title: 'พันธกิจ',
    subtitle: 'Mission',
    content: 'พัฒนาโครงการในทำเลที่ดี ด้วยราคาที่เข้าถึงได้ เพื่อยกระดับคุณภาพชีวิตของชุมชน และสร้างความพึงพอใจสูงสุดให้กับลูกค้า',
  },
  {
    icon: Eye,
    title: 'วิสัยทัศน์',
    subtitle: 'Vision',
    content: 'มุ่งสู่การเป็นผู้พัฒนาคอนโดมิเนียมชั้นนำที่มีการเติบโตอย่างยั่งยืน โดยให้ความสำคัญกับความต้องการของลูกค้าเป็นหลัก',
  },
  {
    icon: Heart,
    title: 'ปรัชญา',
    subtitle: 'Philosophy',
    content: '"Freedom of Life" — เชื่อในการคิดอย่างอิสระ แสดงออกในแบบของตัวเอง ASAKAN เชื่อว่าคุณคือลูกค้าที่สำคัญ',
  },
];

const STATS = [
  { value: '10+', label: 'โครงการ' },
  { value: '2,500+', label: 'ยูนิต' },
  { value: '25+', label: 'ปีประสบการณ์' },
  { value: '100%', label: 'ความพึงพอใจ' },
];

const COMPANY_INFO = [
  { label: 'ชื่อบริษัท', value: 'บริษัท อัสสกาญจน์ จำกัด (ASAKAN CO., LTD)' },
  { label: 'ที่ตั้ง', value: '191 อาคาร อัสสกาญจน์ ถนนรามคำแหง แขวงสะพานสูง เขตสะพานสูง กรุงเทพมหานคร 10240' },
  { label: 'โทรศัพท์', value: '082-526-5566 / 02-059-9655 / 099-198-2940' },
  { label: 'อีเมล', value: 'asakanmkt@gmail.com' },
];

const kicker = 'text-[11px] font-bold uppercase tracking-[0.22em]';

export default function AboutPage() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative isolate flex min-h-[max(560px,calc(100svh-80px))] flex-col justify-end overflow-hidden bg-[#050B14] text-white">
          <Parallax className="!absolute inset-0 -z-20" strength={0.14}>
            <Image src="/images/about.webp" alt="พื้นที่ส่วนกลางโครงการ ASAKAN" fill preload sizes="100vw" className="object-cover" />
          </Parallax>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#050B14] via-[#050B14]/60 to-[#050B14]/20" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#050B14]/75 via-transparent to-transparent" />

          {/* Wordmark sits behind the copy and bleeds off the bottom edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 translate-y-[22%] select-none text-center text-[23vw] font-black leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.22)]"
          >
            ASAKAN
          </div>

          <div className="mx-auto w-full max-w-7xl px-6 pb-[18vw] pt-28 md:pb-[13vw] lg:px-10">
            <Reveal>
              <p className={`${kicker} mb-6 flex items-center gap-3 text-white/80`}>
                <span className="h-px w-10 bg-[#e53935]" />
                เกี่ยวกับเรา
              </p>
            </Reveal>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <Reveal className="lg:col-span-8" delay={80}>
                <h1 className="text-[clamp(2.75rem,7.5vw,6.5rem)] font-bold leading-[1.02] tracking-[-0.03em] [text-wrap:balance]">
                  {/* Thai has no spaces between syllables, so keep each word whole */}
                  {['บริษัท', 'อัสสกาญจน์', 'จำกัด'].map((word) => (
                    <span key={word} className="inline-block whitespace-nowrap pr-[0.25em]">{word}</span>
                  ))}
                </h1>
              </Reveal>
              <Reveal className="lg:col-span-4 lg:pb-3" delay={160}>
                <p className="max-w-md border-l border-white/25 pl-5 text-base leading-[1.8] text-white/80 md:text-lg">
                  ผู้พัฒนาอสังหาริมทรัพย์ที่มีความมุ่งมั่นพัฒนาโครงการคุณภาพ ในราคาเข้าถึงได้ เพื่อยกระดับคุณภาพชีวิตของชุมชน
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="overflow-hidden bg-white py-24 md:py-36">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
            <Reveal className="lg:col-span-6">
              <div className="text-[clamp(9rem,30vw,22rem)] font-black leading-[0.8] tracking-[-0.07em] text-[#1a2d6b]">
                25<span className="text-[#e53935]">+</span>
              </div>
              <div className={`${kicker} mt-6 text-[#1a2d6b]/60`}>ปีประสบการณ์</div>
            </Reveal>

            <div className="lg:col-span-6 lg:pt-6">
              <Reveal>
                <p className={`${kicker} text-[#e53935]`}>ประวัติของเรา</p>
                <h2 className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.02em] text-[#0f1e4a] [text-wrap:balance]">
                  25 ปีแห่งความไว้วางใจ
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <div className="mt-10 space-y-6 text-base leading-[1.9] text-[#1f2937] md:text-[17px] [text-wrap:pretty]">
                  <p className="text-lg font-medium leading-[1.8] text-[#0f1e4a] md:text-xl">
                    บริษัท อัสสกาญจน์ จำกัด ก่อตั้งขึ้นด้วยความมุ่งมั่นในการพัฒนาที่อยู่อาศัยคุณภาพสูงในราคาที่เข้าถึงได้ สำหรับคนกรุงเทพฯ ทุกระดับ
                  </p>
                  <p>
                    ตลอดระยะเวลากว่า 25 ปี เราได้พัฒนาโครงการคอนโดมิเนียมมากกว่า 10 โครงการ ส่งมอบห้องพักกว่า 2,500 ยูนิต ให้กับผู้ซื้อที่ไว้วางใจเรา
                  </p>
                  <p>
                    ASAKAN เชื่อว่าทุกคนมีสิทธิ์มีที่อยู่อาศัยที่ดี นั่นคือเหตุผลที่เราพัฒนาโครงการในทำเลศักยภาพ ใกล้รถไฟฟ้า ด้วยราคาที่ยุติธรรม
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <dl className="mx-auto mt-20 grid max-w-7xl grid-cols-2 px-6 md:mt-28 lg:grid-cols-4 lg:px-10">
            {STATS.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 90}
                className={`border-t border-slate-200 py-8 pr-4 ${i % 2 ? 'border-l pl-6 lg:pl-8' : ''} ${i === 2 ? 'lg:border-l lg:pl-8' : ''}`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-none tracking-[-0.04em] text-[#0f1e4a] tabular-nums">{stat.value}</dd>
                <dd className="mt-3 text-sm text-slate-600">{stat.label}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* Mission, Vision, Philosophy */}
        <section className="relative overflow-hidden bg-[#0f1e4a] py-24 text-white md:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {PRINCIPLES.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.subtitle}>
                  <article className="grid gap-6 border-t border-white/15 py-12 md:py-16 lg:grid-cols-12 lg:items-start lg:gap-10">
                    <div className="lg:col-span-6">
                      <div className="flex items-center gap-4 text-white/50">
                        <span className="text-sm font-bold tabular-nums">0{i + 1}</span>
                        <span className="h-px w-8 bg-white/25" />
                        <Icon size={18} className="text-[#e53935]" aria-hidden="true" />
                      </div>
                      <div className="mt-4 text-[clamp(3.5rem,10vw,8.5rem)] font-black leading-[0.9] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.45)]">
                        {item.subtitle}
                      </div>
                    </div>
                    <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
                      <h2 className="text-3xl font-bold md:text-4xl">{item.title}</h2>
                      <p className="mt-5 text-base leading-[1.9] text-white/75 md:text-lg [text-wrap:pretty]">{item.content}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Company Info */}
        <section className="bg-white py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <p className={`${kicker} text-[#e53935]`}>Company Profile</p>
              <h2 className="mt-4 text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.02em] text-[#0f1e4a]">ข้อมูลบริษัท</h2>
            </Reveal>

            <Reveal className="mt-12" delay={80}>
              <Parallax className="aspect-[4/3] rounded-3xl bg-slate-100 md:aspect-[21/9]" strength={0.1}>
                <Image
                  src="/images/aboutinfo.webp"
                  alt="อาคารและโครงการของ ASAKAN"
                  fill
                  sizes="(max-width: 1280px) 100vw, 1216px"
                  className="object-cover"
                />
              </Parallax>
            </Reveal>

            <div className="relative lg:-mt-32 lg:ml-auto lg:max-w-3xl">
              <Reveal>
                <div className="mt-8 rounded-3xl bg-white lg:mt-0 lg:p-12 lg:shadow-[0_30px_80px_rgba(15,30,74,0.12)]">
                  <div className="inline-flex rounded-full bg-[#0f1e4a] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                    ASAKAN CO., LTD
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-[#0f1e4a] md:text-3xl">ผู้พัฒนาอสังหาริมทรัพย์คุณภาพในกรุงเทพฯ</h3>
                  <p className="mt-3 text-base leading-[1.8] text-slate-600">
                    ข้อมูลติดต่อหลักของบริษัท สำหรับลูกค้าและพาร์ทเนอร์ที่ต้องการติดต่อ ASAKAN โดยตรง
                  </p>
                  <dl className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                    {COMPANY_INFO.map((item) => (
                      <div key={item.label} className="grid gap-1 py-5 sm:grid-cols-[130px_1fr] sm:gap-6">
                        <dt className="text-sm font-bold text-[#1a2d6b]">{item.label}</dt>
                        <dd className="text-base leading-[1.7] text-[#1f2937]">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
