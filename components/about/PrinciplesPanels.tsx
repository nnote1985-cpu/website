'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Target, Eye, Heart } from 'lucide-react';

const GALLERY = '/images/projects/elysium-phahol-59/gallery';

const PRINCIPLES = [
  {
    icon: Target,
    title: 'พันธกิจ',
    subtitle: 'Mission',
    image: `${GALLERY}/perspective/perspective14.webp`,
    content: 'พัฒนาโครงการในทำเลที่ดี ด้วยราคาที่เข้าถึงได้ เพื่อยกระดับคุณภาพชีวิตของชุมชน และสร้างความพึงพอใจสูงสุดให้กับลูกค้า',
  },
  {
    icon: Eye,
    title: 'วิสัยทัศน์',
    subtitle: 'Vision',
    image: `${GALLERY}/perspective/perspective11.webp`,
    content: 'มุ่งสู่การเป็นผู้พัฒนาคอนโดมิเนียมชั้นนำที่มีการเติบโตอย่างยั่งยืน โดยให้ความสำคัญกับความต้องการของลูกค้าเป็นหลัก',
  },
  {
    icon: Heart,
    title: 'ปรัชญา',
    subtitle: 'Philosophy',
    image: `${GALLERY}/facility/facilities28.webp`,
    content: '"Freedom of Life" — เชื่อในการคิดอย่างอิสระ แสดงออกในแบบของตัวเอง ASAKAN เชื่อว่าคุณคือลูกค้าที่สำคัญ',
  },
];

/**
 * Desktop: three photo panels where the active one widens to show its copy.
 * Mobile: every panel is open and stacked, so nothing is hidden behind a tap.
 */
export default function PrinciplesPanels() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4 md:h-[600px] md:flex-row md:gap-3 lg:h-[640px]">
      {PRINCIPLES.map((item, i) => {
        const Icon = item.icon;
        const open = i === active;
        return (
          <article
            key={item.subtitle}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            tabIndex={0}
            className={`group relative isolate flex min-h-[460px] cursor-pointer flex-col justify-end overflow-hidden rounded-3xl bg-[#0f1e4a] text-white outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] focus-visible:ring-2 focus-visible:ring-white/70 md:min-h-0 md:basis-0 ${
              open ? 'md:grow-[3.2]' : 'md:grow'
            }`}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 820px"
              className={`-z-20 object-cover transition-transform duration-[1.4s] ease-out ${open ? 'md:scale-100' : 'md:scale-110'}`}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0a1638] via-[#0f1e4a]/70 to-[#0f1e4a]/5" />
            <div className={`absolute inset-0 -z-10 hidden bg-[#0a1638]/55 transition-opacity duration-700 md:block ${open ? 'opacity-0' : 'opacity-100'}`} />

            {/* Top row: index and icon, always visible */}
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 lg:p-8">
              <span className="text-sm font-bold tabular-nums text-white/80">
                0{i + 1}
                <span className="text-white/40"> / 0{PRINCIPLES.length}</span>
              </span>
              <span className={`grid h-12 w-12 place-items-center rounded-full transition-colors duration-500 ${open ? 'bg-[#e53935] text-white' : 'bg-white/10 text-white backdrop-blur-sm md:bg-white/10'} max-md:bg-[#e53935]`}>
                <Icon size={20} aria-hidden="true" />
              </span>
            </div>

            {/* Collapsed label, desktop only */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 transition-opacity duration-300 md:block ${open ? 'opacity-0' : 'opacity-100 delay-300'}`}
            >
              <span className="block whitespace-nowrap text-3xl font-bold tracking-[0.02em] [writing-mode:vertical-rl] rotate-180">
                {item.subtitle}
              </span>
            </div>

            {/* Copy: always shown on mobile, fades in on the open desktop panel */}
            <div
              className={`p-6 pt-24 transition-[opacity,translate] lg:p-10 md:w-[min(560px,52vw)] ${
                open ? 'md:translate-y-0 md:opacity-100 md:delay-300 md:duration-700' : 'md:pointer-events-none md:translate-y-4 md:opacity-0 md:duration-200'
              }`}
            >
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white/70">
                <span className="h-px w-8 bg-[#e53935]" />
                {item.subtitle}
              </p>
              <h3 className="mt-3 text-4xl font-bold leading-tight lg:text-5xl">{item.title}</h3>
              <p className="mt-4 max-w-md text-base leading-[1.85] text-white/85 lg:text-lg [text-wrap:pretty]">{item.content}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
