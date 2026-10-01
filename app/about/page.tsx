import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import FloatingCTA from '@/components/FloatingCTA';
import Footer from '@/components/Footer';
import { Parallax, Reveal } from '@/components/about/AboutMotion';
import { Target, Eye, Heart, Building2, MapPin, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | ASAKAN บริษัท อัสสกาญจน์',
  description: 'ASAKAN บริษัท อัสสกาญจน์ จำกัด ผู้พัฒนาอสังหาริมทรัพย์ชั้นนำในกรุงเทพฯ กว่า 25 ปี ด้วยปรัชญา Beyond Expectation',
};

const GALLERY = '/images/projects/elysium-phahol-59/gallery';

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
  { value: '10', suffix: '+', label: 'โครงการ' },
  { value: '2,500', suffix: '+', label: 'ยูนิต' },
  { value: '25', suffix: '+', label: 'ปีประสบการณ์' },
  { value: '100', suffix: '%', label: 'ความพึงพอใจ' },
];

const PHONES = ['082-526-5566', '02-059-9655', '099-198-2940'];
const EMAIL = 'asakanmkt@gmail.com';

const kicker = 'flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#e53935]';

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className={kicker}>
      <span className="h-px w-10 bg-[#e53935]" />
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="overflow-x-clip pt-20">
        {/* Hero: title on white, then a stepped photo row with the stats bar overlapping it */}
        <section className="bg-white pt-14 md:pt-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Reveal>
                  <Kicker>เกี่ยวกับเรา</Kicker>
                </Reveal>
                <Reveal delay={80}>
                  <h1 className="mt-6 text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#0f1e4a]">
                    {/* Thai has no spaces between syllables, so keep each word whole */}
                    {['บริษัท', 'อัสสกาญจน์', 'จำกัด'].map((word) => (
                      <span key={word} className="inline-block whitespace-nowrap pr-[0.25em]">{word}</span>
                    ))}
                  </h1>
                </Reveal>
              </div>
              <Reveal className="lg:col-span-4 lg:pb-4" delay={160}>
                <p className="max-w-md text-base leading-[1.85] text-slate-600 md:text-lg">
                  ผู้พัฒนาอสังหาริมทรัพย์ที่มีความมุ่งมั่นพัฒนาโครงการคุณภาพ ในราคาเข้าถึงได้ เพื่อยกระดับคุณภาพชีวิตของชุมชน
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-[1440px] px-5 md:mt-16 lg:px-10">
            <div className="grid h-[300px] grid-cols-[1fr_2.2fr_1fr] items-end gap-3 sm:h-[420px] md:gap-5 lg:h-[600px]">
              <Reveal className="h-[68%]" delay={120}>
                <Parallax className="h-full rounded-2xl bg-slate-100 md:rounded-3xl" strength={0.08}>
                  <Image src={`${GALLERY}/perspective/perspective5.webp`} alt="สวนส่วนกลางโครงการ ASAKAN" fill sizes="(max-width: 768px) 25vw, 330px" className="object-cover" />
                </Parallax>
              </Reveal>
              <Reveal className="h-full">
                <Parallax className="h-full rounded-2xl bg-slate-100 md:rounded-3xl" strength={0.1}>
                  <Image src="/images/about.webp" alt="อาคารและพื้นที่ส่วนกลางโครงการ ASAKAN" fill preload sizes="(max-width: 768px) 55vw, 720px" className="object-cover" />
                </Parallax>
              </Reveal>
              <Reveal className="h-[84%]" delay={200}>
                <Parallax className="h-full rounded-2xl bg-slate-100 md:rounded-3xl" strength={0.08}>
                  <Image src={`${GALLERY}/perspective/perspective12.webp`} alt="ทางเข้าอาคารโครงการ ASAKAN" fill sizes="(max-width: 768px) 25vw, 330px" className="object-cover" />
                </Parallax>
              </Reveal>
            </div>
          </div>

          <div className="relative z-10 mx-auto -mt-10 max-w-6xl px-5 md:-mt-16 lg:px-10">
            <Reveal>
              <dl className="grid grid-cols-2 rounded-3xl bg-[#0f1e4a] px-2 py-4 text-white shadow-[0_30px_60px_-20px_rgba(15,30,74,0.45)] md:grid-cols-4 md:px-4 md:py-8">
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`px-4 py-4 md:px-8 md:py-2 ${i % 2 ? 'border-l border-white/15' : ''} ${i > 1 ? 'border-t border-white/15 md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
                  >
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-none tracking-[-0.03em] tabular-nums">
                      {stat.value}<span className="text-[#e53935]">{stat.suffix}</span>
                    </dd>
                    <dd className="mt-2 text-sm text-white/65">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* Story: layered photos beside the original copy */}
        <section className="bg-white py-24 md:py-36">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-12 lg:gap-10 lg:px-10">
            <Reveal className="relative mx-auto w-full max-w-xl pb-16 pr-10 lg:col-span-5 lg:pb-20">
              <Parallax className="aspect-[4/5] rounded-3xl bg-slate-100" strength={0.08}>
                <Image src={`${GALLERY}/perspective/perspective4.webp`} alt="ทางเดินและสวนภายในโครงการ ASAKAN" fill sizes="(max-width: 1024px) 90vw, 460px" className="object-cover" />
              </Parallax>
              <div className="absolute bottom-0 right-0 w-[52%] overflow-hidden rounded-2xl border-[6px] border-white bg-slate-100 shadow-[0_24px_50px_-18px_rgba(15,30,74,0.35)] md:rounded-3xl md:border-8">
                <div className="relative aspect-square">
                  <Image src={`${GALLERY}/facility/facilities2.webp`} alt="สถาปัตยกรรมพื้นที่ส่วนกลาง ASAKAN" fill sizes="(max-width: 1024px) 45vw, 240px" className="object-cover" />
                </div>
              </div>
              <div className="absolute left-4 top-4 rounded-2xl bg-white px-5 py-4 shadow-[0_18px_40px_-16px_rgba(15,30,74,0.35)] md:left-6 md:top-6">
                <div className="text-4xl font-bold leading-none tracking-[-0.03em] text-[#0f1e4a] md:text-5xl">
                  25<span className="text-[#e53935]">+</span>
                </div>
                <div className="mt-1.5 text-xs font-medium text-slate-500">ปีประสบการณ์</div>
              </div>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <Kicker>ประวัติของเรา</Kicker>
                <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[#0f1e4a] [text-wrap:balance]">
                  25 ปีแห่งความไว้วางใจ
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-8 border-l-2 border-[#e53935] pl-5 text-lg font-medium leading-[1.8] text-[#0f1e4a] md:text-xl [text-wrap:pretty]">
                  บริษัท อัสสกาญจน์ จำกัด ก่อตั้งขึ้นด้วยความมุ่งมั่นในการพัฒนาที่อยู่อาศัยคุณภาพสูงในราคาที่เข้าถึงได้ สำหรับคนกรุงเทพฯ ทุกระดับ
                </p>
                <div className="mt-8 space-y-5 text-base leading-[1.9] text-slate-600 md:text-[17px] [text-wrap:pretty]">
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
        </section>

        {/* Mission, Vision, Philosophy */}
        <section className="bg-[#0f1e4a] py-16 text-white md:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
                <span className="h-px w-10 bg-[#e53935]" />
                Mission · Vision · Philosophy
              </p>
            </Reveal>
            <div className="mt-10 grid border-y border-white/15 md:mt-14 md:grid-cols-3">
              {PRINCIPLES.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal
                    key={item.subtitle}
                    delay={i * 100}
                    className={`py-7 md:px-8 md:py-10 lg:px-10 ${i ? 'border-t border-white/15 md:border-l md:border-t-0' : 'md:pl-0 lg:pl-0'} ${i === 2 ? 'md:pr-0 lg:pr-0' : ''}`}
                  >
                    <article className="flex gap-4 md:block">
                      <div className="flex shrink-0 items-center justify-between self-start pt-0.5 md:pt-0">
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e53935] text-white md:h-11 md:w-11">
                          <Icon size={18} aria-hidden="true" />
                        </span>
                        <span className="hidden text-xs font-bold tabular-nums tracking-[0.18em] text-white/40 md:block">0{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/55 md:mt-8">{item.subtitle}</p>
                        <h2 className="mt-1 text-2xl font-bold md:mt-1.5 md:text-[28px]">{item.title}</h2>
                        <p className="mt-2.5 text-[15px] leading-[1.8] text-white/75 md:mt-3 md:text-base md:leading-[1.85] [text-wrap:pretty]">{item.content}</p>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Company Profile */}
        <section className="bg-white py-24 md:py-36">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:gap-10 lg:px-10">
            <div className="lg:col-span-5">
              <Reveal>
                <Kicker>Company Profile</Kicker>
                <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-[#0f1e4a]">ข้อมูลบริษัท</h2>
                <div className="mt-8 inline-flex rounded-full bg-[#0f1e4a] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  ASAKAN CO., LTD
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#0f1e4a] md:text-2xl">ผู้พัฒนาอสังหาริมทรัพย์คุณภาพในกรุงเทพฯ</h3>
                <p className="mt-3 max-w-md text-base leading-[1.8] text-slate-600">
                  ข้อมูลติดต่อหลักของบริษัท สำหรับลูกค้าและพาร์ทเนอร์ที่ต้องการติดต่อ ASAKAN โดยตรง
                </p>
              </Reveal>
              <Reveal className="mt-10" delay={100}>
                <Parallax className="aspect-[16/11] rounded-3xl bg-slate-100" strength={0.08}>
                  <Image src={`${GALLERY}/perspective/perspective3.webp`} alt="ป้ายโครงการ ASAKAN" fill sizes="(max-width: 1024px) 90vw, 480px" className="object-cover" />
                </Parallax>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-6 lg:col-start-7 lg:self-center" delay={120}>
              <dl className="overflow-hidden rounded-3xl border border-slate-200">
                <InfoRow icon={Building2} label="ชื่อบริษัท">บริษัท อัสสกาญจน์ จำกัด (ASAKAN CO., LTD)</InfoRow>
                <InfoRow icon={MapPin} label="ที่ตั้ง">191 อาคาร อัสสกาญจน์ ถนนรามคำแหง แขวงสะพานสูง เขตสะพานสูง กรุงเทพมหานคร 10240</InfoRow>
                <InfoRow icon={Phone} label="โทรศัพท์">
                  <span className="flex flex-wrap gap-x-2 gap-y-1">
                    {PHONES.map((phone, i) => (
                      <span key={phone} className="whitespace-nowrap">
                        <a href={`tel:${phone.replace(/-/g, '')}`} className="transition-colors hover:text-[#e53935]">{phone}</a>
                        {i < PHONES.length - 1 && <span className="ml-2 text-slate-300">/</span>}
                      </span>
                    ))}
                  </span>
                </InfoRow>
                <InfoRow icon={Mail} label="อีเมล">
                  <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-[#e53935]">{EMAIL}</a>
                </InfoRow>
              </dl>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function InfoRow({ icon: Icon, label, children }: { icon: typeof Phone; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-5 border-b border-slate-200 p-6 last:border-0 md:p-8">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f1f5f9] text-[#1a2d6b]">
        <Icon size={18} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</dt>
        <dd className="mt-1.5 text-base leading-[1.7] text-[#0f1e4a] md:text-lg">{children}</dd>
      </div>
    </div>
  );
}
