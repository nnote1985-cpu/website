'use client';

import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Reveal } from '@/components/about/AboutMotion';

/* ------------------------------------------------------------------ */
/* Content. Figures marked PLACEHOLDER still need confirming.          */
/* ------------------------------------------------------------------ */

const P = '/images/projects';

// The Celine renders have a title strip along their top edge; scaling from the bottom crops it off.
const cropTop = (src: string) => (src.includes('the-celine') ? ' origin-bottom scale-[1.12]' : '');

const YEARS = 26; // founded 2001, now in its 26th year

const STATS = [
  { value: '25+', label: 'Years' },
  { value: '10+', label: 'Projects' },
  { value: '4,000+', label: 'Homes created' },
];

const MILESTONES = [
  { year: '2001', title: 'ก่อตั้งบริษัท อัสสกาญจน์ จำกัด' },
  { year: '2002', title: 'ส่งมอบคอนโดมิเนียมโครงการแรก' },
  { year: '2003', title: 'เริ่มพัฒนาโครงการติดถนนใหญ่และแนวรถไฟฟ้า' },
  { year: '2007', title: 'ส่งมอบห้องชุดครบ 1,000 ยูนิต' },
  { year: '2017', title: 'ส่งมอบห้องชุดครบ 2,500 ยูนิต' },
  { year: '2024', title: 'ส่งมอบห้องชุดครบ 4,000 ยูนิต' },
  { year: '2025', title: 'เปิดตัว Elysium Phahol 59' },
];

const CHAPTERS = [
  {
    key: 'Location',
    not: 'ไม่ใช่แค่มีที่อยู่อาศัย',
    but: 'แต่ต้องเชื่อมคุณเข้ากับเมือง',
    image: `${P}/elysium-phahol-59/gallery/perspective/perspective1.webp`,
    alt: 'รถไฟฟ้าและเมืองรอบโครงการ ASAKAN',
  },
  {
    key: 'Design',
    not: 'ไม่ใช่แค่พื้นที่ที่ดูดี',
    but: 'แต่เป็นพื้นที่ที่คิดจากชีวิตจริง',
    image: `${P}/elysium-phahol-59/gallery/facility/facilities2.webp`,
    alt: 'สถาปัตยกรรมพื้นที่ส่วนกลาง ASAKAN',
  },
  {
    key: 'Living',
    not: 'ไม่ใช่เพียงสถานที่ที่คุณกลับมา',
    but: 'แต่เป็นสถานที่ที่ทำให้ชีวิตดีขึ้น',
    image: `${P}/elysium-phahol-59/gallery/perspective/perspective15.webp`,
    alt: 'ผู้อยู่อาศัยใช้ชีวิตในพื้นที่ส่วนกลาง',
  },
];

const PROOFS = [
  {
    name: 'WELA',
    place: 'Ramkhamhaeng',
    price: 'เริ่มต้น 1.39 ล้านบาท',
    image: `${P}/wela-ramkhamhaeng/gallery/perspective/3.webp`,
    expectation: 'Close to the city.',
    beyond: '0 metres from MRT.',
  },
  {
    name: 'Elysium',
    place: 'Phahol 59',
    price: 'เริ่มต้น 2.09 ล้านบาท',
    image: `${P}/elysium-phahol-59/hero.webp`,
    expectation: 'Live near BTS.',
    beyond: '30 metres away from BTS Green Line.',
  },
  {
    name: 'The Celine',
    place: 'Bang Chan',
    price: 'เริ่มต้น 1.42 ล้านบาท',
    image: `${P}/the-celine-bang-chan/gallery/perspective/1.webp`,
    expectation: 'Steps from the MRT.',
    beyond: '150 metres to MRT Bang Chan.',
  },
];

/* ------------------------------------------------------------------ */
/* Scroll progress                                                     */
/* ------------------------------------------------------------------ */

/**
 * Writes --p (0..1) on a tall section while its sticky stage is pinned.
 * Children read it in calc(), and only transform/opacity depend on it,
 * so scrolling never triggers layout or repaints of the image layers.
 */
function useStageProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    const stage = el?.firstElementChild as HTMLElement | null;
    if (!el || !stage) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > innerHeight + 50) return;
      const range = r.height - stage.offsetHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
      el.style.setProperty('--p', p.toFixed(4));
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
    };
  }, []);
  return ref;
}

/** 0 before `a`, 1 after `b`, linear in between (as a CSS expression). */
const seg = (a: number, b: number) => `clamp(0, (var(--p, 0) - ${a}) / ${b - a}, 1)`;
const fadeIn = (a: number, b: number): CSSProperties => ({ opacity: seg(a, b) });
const rise = (a: number, b: number, dist = '40px'): CSSProperties => ({
  opacity: seg(a, b),
  transform: `translate3d(0, calc((1 - ${seg(a, b)}) * ${dist}), 0)`,
});

const stage = 'sticky top-0 h-svh overflow-hidden';

/* ------------------------------------------------------------------ */
/* 01 Opening                                                          */
/* ------------------------------------------------------------------ */

function Opening() {
  const ref = useStageProgress<HTMLElement>();
  return (
    <section ref={ref} className="relative h-[300svh] bg-[#050B14] text-white" aria-label="ASAKAN Beyond Expectations">
      <div className={stage}>
        <div className="absolute inset-0 will-change-transform" style={{ transform: `scale(calc(1.18 - ${seg(0, 1)} * 0.18))` }}>
          <Image src={`${P}/wela-ramkhamhaeng/gallery/perspective/1.webp`} alt="" fill preload sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#050B14]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-[#050B14]/60" />

        {/* BEYOND breaks out of the EXPECTATIONS frame */}
        <div className="absolute inset-0 flex items-center justify-center px-4" style={{ opacity: `calc(1 - ${seg(0.66, 0.76)})` }} aria-hidden="true">
          <div className="relative px-[4vw] pb-[3vw] pt-[2.5vw] text-center">
            <span className="absolute inset-x-0 top-0 h-px origin-left bg-white/70" style={{ transform: `scaleX(${seg(0.1, 0.28)})` }} />
            <span className="absolute inset-x-0 bottom-0 h-px origin-right bg-white/70" style={{ transform: `scaleX(${seg(0.1, 0.28)})` }} />
            <span className="absolute inset-y-0 left-0 w-px origin-bottom bg-white/70" style={{ transform: `scaleY(${seg(0.14, 0.3)})` }} />
            <span className="absolute inset-y-0 right-0 w-px origin-top bg-white/70" style={{ transform: `scaleY(${seg(0.14, 0.3)})` }} />
            <div
              className="relative text-[19vw] font-black leading-[0.9] tracking-[-0.04em] will-change-transform md:text-[13vw]"
              style={{ transform: `translate3d(0, calc(${seg(0.36, 0.6)} * -135%), 0)` }}
            >
              BEYOND
            </div>
            <div
              className="text-[11.2vw] font-black leading-none tracking-[-0.02em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.85)] md:text-[7.6vw]"
              style={rise(0.06, 0.26, '30%')}
            >
              EXPECTATIONS
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={rise(0.74, 0.9, '30px')}>
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/70">ASAKAN</p>
          <h1 className="mt-4 text-[clamp(2.6rem,8vw,6rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            Beyond <span className="whitespace-nowrap">Expectations</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-[1.8] text-white/75 md:text-lg">
            Because we believe a home should give you more than you expect.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60" style={{ opacity: `calc(1 - ${seg(0, 0.06)})` }}>
          Scroll
          <ArrowDown size={16} className="animate-bounce" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 02 What does Beyond mean                                            */
/* ------------------------------------------------------------------ */

function Chapters() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-white text-[#0f1e4a]">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-28 md:pt-40 lg:px-10">
        <Reveal>
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#e53935]">
            <span className="h-px w-10 bg-[#e53935]" />
            02 — Beyond
          </p>
          <h2 className="mt-6 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            What does it mean to go <span className="text-[#e53935]">beyond?</span>
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-7xl px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="sticky top-0 hidden h-svh items-center lg:flex">
          <div className="relative aspect-[4/5] max-h-[72svh] w-full overflow-hidden rounded-3xl bg-slate-100">
            {CHAPTERS.map((c, i) => (
              <Image
                key={c.key}
                src={c.image}
                alt={c.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className={`object-cover transition-opacity duration-[900ms] ease-out ${i === active ? 'opacity-100' : 'opacity-0'}${cropTop(c.image)}`}
              />
            ))}
            <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0f1e4a] backdrop-blur">
              0{active + 1} / 0{CHAPTERS.length}
            </div>
          </div>
        </div>

        <div>
          {CHAPTERS.map((c, i) => (
            <div
              key={c.key}
              ref={(el) => { refs.current[i] = el; }}
              data-i={i}
              className="flex min-h-[auto] flex-col justify-center py-14 lg:min-h-svh lg:py-0"
            >
              <Reveal>
                <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100 lg:hidden">
                  <Image src={c.image} alt={c.alt} fill sizes="100vw" className={`object-cover${cropTop(c.image)}`} />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">Chapter 0{i + 1}</p>
                <h3 className="mt-3 text-[clamp(2.75rem,6vw,5rem)] font-bold leading-none tracking-[-0.035em]">
                  <span className="text-[#e53935]">Beyond</span>
                  <br />
                  {c.key}
                </h3>
                <p className="mt-8 text-lg text-slate-500 line-through decoration-[#e53935] decoration-2 md:text-xl md:decoration-[3px]">{c.not}</p>
                <p className="mt-2 text-2xl font-bold leading-snug md:text-3xl">{c.but}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 03 26 Years of going beyond                                         */
/* ------------------------------------------------------------------ */

function Journey() {
  const ref = useStageProgress<HTMLElement>();
  return (
    <section ref={ref} className="relative h-[460svh] bg-[#0f1e4a] text-white" aria-label={`${YEARS} years of going beyond`}>
      <div className={stage}>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center will-change-transform"
          style={{
            opacity: `calc(1 - ${seg(0.3, 0.42)})`,
            transform: `translate3d(0, calc(${seg(0.22, 0.42)} * -12svh), 0) scale(calc(1 - ${seg(0.22, 0.42)} * 0.35))`,
          }}
        >
          <div className="text-[min(64vw,68svh)] font-black leading-[0.8] tracking-[-0.07em]">
            {YEARS}
          </div>
          <p className="mt-6 text-center text-sm font-bold uppercase tracking-[0.4em] text-white/70 md:text-base" style={rise(0.02, 0.12, '20px')}>
            Years <span className="text-[#e53935]">of going beyond</span>
          </p>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center" style={fadeIn(0.36, 0.46)}>
          <div className="mx-auto w-full max-w-7xl px-5 lg:px-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">03 — Our Journey</p>
          </div>
          <div className="mt-10 overflow-hidden md:mt-14">
            <ol
              className="flex w-max pl-5 will-change-transform lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
              style={{ transform: `translate3d(calc(${seg(0.44, 0.92)} * (100vw - 100% - 1.25rem)), 0, 0)` }}
            >
              {MILESTONES.map((m, i) => (
                <li key={m.year} className="relative w-[64vw] shrink-0 pr-8 sm:w-[40vw] lg:w-[24vw]">
                  <div className="absolute left-0 right-0 top-[7px] h-px bg-white/20" />
                  <span className={`relative block h-[15px] w-[15px] rounded-full border-2 ${i === MILESTONES.length - 1 ? 'border-[#e53935] bg-[#e53935]' : 'border-white bg-[#0f1e4a]'}`} />
                  <div className="mt-8 text-[clamp(3rem,7vw,5.5rem)] font-bold leading-none tracking-[-0.04em] tabular-nums">{m.year}</div>
                  <p className="mt-4 max-w-xs text-base leading-relaxed text-white/75 md:text-lg">{m.title}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="mx-auto mt-14 w-full max-w-7xl px-5 md:mt-20 lg:px-10">
            <dl className="grid grid-cols-3 border-t border-white/15 pt-6" style={rise(0.5, 0.62, '20px')}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-[clamp(1.75rem,5vw,3.5rem)] font-bold leading-none tracking-[-0.03em] tabular-nums">{s.value}</dd>
                  <dd className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55 md:text-xs">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 04 Expectations -> Reality                                          */
/* ------------------------------------------------------------------ */

function Proof() {
  return (
    <section className="bg-[#050B14] text-white">
      <div className="mx-auto max-w-7xl px-5 py-28 md:py-40 lg:px-10">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#e53935]">04 — Proof</p>
          <h2 className="mt-6 text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            Expectations <span className="text-white/35">→</span> Reality
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-[1.8] text-white/70">
            Beyond Expectations ไม่ใช่คำโฆษณา แต่เป็นวิธีคิดในการพัฒนาโครงการ และนี่คือสิ่งที่เกิดขึ้นจริง
          </p>
        </Reveal>
      </div>

      {/* Each project pins, holds while its copy reads, then the next one slides over it */}
      <div>
        {PROOFS.map((p, i) => (
          <Fragment key={p.name}>
            <article className="sticky top-0 h-svh overflow-hidden">
              <Image src={p.image} alt={`โครงการ ${p.name} ${p.place}`} fill sizes="100vw" className={`object-cover${cropTop(p.image) || ' scale-[1.03]'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/55 to-[#050B14]/25" />
              <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-[max(6rem,14svh)] lg:px-10">
                <div className="absolute right-5 top-28 text-sm font-bold tabular-nums text-white/60 lg:right-10">
                  0{i + 1} / 0{PROOFS.length}
                </div>
                <Reveal>
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">{p.place}</p>
                  <h3 className="mt-2 text-[clamp(3.5rem,11vw,9rem)] font-black leading-[0.9] tracking-[-0.045em]">{p.name}</h3>
                  <p className="mt-3 text-sm font-semibold text-white/75 md:text-base">{p.price}</p>
                </Reveal>
                <Reveal delay={150} className="mt-10 grid gap-6 border-t border-white/20 pt-8 md:grid-cols-[1fr_1.6fr] md:gap-10">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">Expectation</p>
                    <p className="mt-3 text-xl text-white/65 line-through decoration-[#e53935] decoration-2 md:text-2xl md:decoration-[3px]">{p.expectation}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#e53935]">Beyond Expectation</p>
                    <p className="mt-3 text-[clamp(2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em]">{p.beyond}</p>
                  </div>
                </Reveal>
              </div>
            </article>
            {/* Empty scroll distance: the pinned card stays put until the next one arrives */}
            <div aria-hidden="true" className="h-[90svh]" />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 05 Beyond buildings                                                 */
/* ------------------------------------------------------------------ */

function BeyondBuildings() {
  const ref = useStageProgress<HTMLElement>();
  return (
    <>
      <section ref={ref} className="relative h-[320svh] bg-[#050B14] text-white" aria-label="We build better living">
        <div className={stage}>
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `scale(calc(1 + ${seg(0, 0.5)} * 1.4))`, transformOrigin: '50% 38%', opacity: `calc(1 - ${seg(0.4, 0.55)})` }}
          >
            <Image src={`${P}/elysium-phahol-59/gallery/perspective/perspective11.webp`} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `scale(calc(1.25 - ${seg(0.4, 1)} * 0.25))`, opacity: seg(0.4, 0.55) }}
          >
            <Image src={`${P}/elysium-phahol-59/gallery/room/43 sqm/1.webp`} alt="" fill sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-[#050B14]/60" />

          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-5 lg:px-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">05 — Beyond Buildings</p>
            <div className="mt-6 text-[clamp(3rem,10.5vw,9.5rem)] font-black uppercase leading-[0.95] tracking-[-0.045em]">
              <div>We build</div>
              <div className="relative w-fit" style={{ opacity: `calc(1 - ${seg(0.42, 0.52)} * 0.65)` }}>
                Buildings.
                <span
                  className="absolute left-[-2%] right-[-2%] top-[52%] h-[0.09em] origin-left bg-[#e53935]"
                  style={{ transform: `scaleX(${seg(0.24, 0.38)})` }}
                />
              </div>
              <div className="text-white" style={rise(0.5, 0.66, '0.4em')}>
                Better living.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-28 text-[#0f1e4a] md:py-40">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          {['Beyond buildings.', 'Beyond square metres.', 'Beyond expectations.'].map((line, i) => (
            <Reveal key={line} delay={i * 140}>
              <p className={`text-[clamp(2.4rem,7.5vw,6.5rem)] font-bold leading-[1.08] tracking-[-0.035em] ${i < 2 ? 'text-slate-300' : ''}`}>
                {line}
              </p>
            </Reveal>
          ))}
          <Reveal delay={450}>
            <p className="mt-12 max-w-xl text-lg leading-[1.85] text-slate-600 md:text-xl">
              สุดท้าย ASAKAN ไม่ได้วัดความสำเร็จจากจำนวนอาคาร แต่วัดจากชีวิตที่เกิดขึ้นภายในพื้นที่เหล่านั้น
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 06 What's beyond next                                               */
/* ------------------------------------------------------------------ */

function Next() {
  const ref = useStageProgress<HTMLElement>();
  return (
    <section ref={ref} className="relative h-[320svh] bg-[#050B14] text-white" aria-label="What's beyond next">
      <div className={stage}>
        <div
          className="absolute inset-0 will-change-transform"
          style={{ opacity: `calc(${seg(0.3, 0.6)} * 0.6)`, transform: `scale(calc(1.2 - ${seg(0.3, 1)} * 0.2))` }}
        >
          <Image src={`${P}/elysium-phahol-59/gallery/perspective/perspective10.webp`} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-[#050B14]/70" />

        {/* "here." drifts off screen */}
        <div className="pointer-events-none absolute inset-0 flex items-center px-5 lg:px-10" style={{ opacity: `calc(1 - ${seg(0.28, 0.36)})` }}>
          <p className="mx-auto w-full max-w-7xl text-[clamp(2.4rem,7vw,6rem)] font-bold leading-tight tracking-[-0.035em]">
            {YEARS} years brought us{' '}
            <span
              className="inline-block text-[#e53935] will-change-transform"
              style={{ transform: `translate3d(calc(${seg(0.08, 0.34)} * 110vw), 0, 0)` }}
            >
              here.
            </span>
          </p>
        </div>

        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center text-[clamp(3.25rem,13vw,11rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]"
          style={{ opacity: `calc(${seg(0.36, 0.46)} - ${seg(0.66, 0.74)})` }}
        >
          <span style={rise(0.36, 0.46, '0.3em')}>What&apos;s</span>
          <span className="text-transparent [-webkit-text-stroke:1.5px_white]" style={rise(0.4, 0.5, '0.3em')}>Beyond</span>
          <span style={rise(0.44, 0.54, '0.3em')}>Next?</span>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={rise(0.74, 0.88, '30px')}>
          <p className="text-[clamp(3rem,10vw,7.5rem)] font-black leading-none tracking-[-0.04em]">ASAKAN</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.45em] text-white/75 md:text-sm">Beyond Expectations</p>
          <Link
            href="/projects"
            className="mt-12 inline-flex items-center gap-3 rounded-sm bg-[#e53935] px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-[#b71c1c]"
          >
            Explore Our Projects
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function BeyondStory() {
  return (
    <>
      <Opening />
      <Chapters />
      <Journey />
      <Proof />
      <BeyondBuildings />
      <Next />
    </>
  );
}
