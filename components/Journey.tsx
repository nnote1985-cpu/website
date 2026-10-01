'use client';
import { useEffect, useRef, useState } from 'react';

const chapters = [
  { id: 'projects',  n: '01', label: 'โครงการ' },
  { id: 'services',  n: '02', label: 'บริการ' },
  { id: 'finance',   n: '03', label: 'สินเชื่อ' },
  { id: 'contact',   n: '04', label: 'ติดต่อ' },
];

// Section IDs Journey will connect (must match ids added to page.tsx)
const TARGETS = ['projects', 'why', 'services', 'finance', 'news', 'contact'];

export default function Journey() {
  const svg        = useRef<SVGSVGElement>(null);
  const guidePath  = useRef<SVGPathElement>(null);
  const inkPath    = useRef<SVGPathElement>(null);
  const dot        = useRef<SVGCircleElement>(null);
  const [active, setActive]   = useState('projects');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    let frame = 0, length = 0, startY = 0, endY = 1;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');

    const geometry = () => {
      const box   = main.getBoundingClientRect();
      const width = main.clientWidth;
      svg.current?.setAttribute('viewBox', `0 0 ${width} ${main.scrollHeight}`);
      const x = width < 700 ? 10 : Math.min(42, width * 0.025);

      // Start path from the bottom of the hero section ("after BEYOND")
      const heroEl = main.querySelector('.gallery-hero') as HTMLElement | null;
      const heroH  = heroEl ? heroEl.offsetHeight : 0;

      const targets = TARGETS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      const ys = targets.map(el => el.getBoundingClientRect().top - box.top);
      if (!ys.length) return;

      // Ink starts animating from hero bottom; ends at last section
      startY = heroH;
      endY   = ys[ys.length - 1] + 90;

      // Path: straight down from hero bottom, then S-curve at each section marker
      let d = `M ${x} ${heroH}`;
      for (let i = 0; i < ys.length; i++) {
        const y    = ys[i];
        const bend = i % 2 === 0 ? x + Math.min(width * 0.013, 24) : x - 6;
        d += ` L ${x} ${y - 55} C ${x} ${y - 20}, ${bend} ${y - 20}, ${bend} ${y + 12} C ${bend} ${y + 40}, ${x} ${y + 42}, ${x} ${y + 72}`;
      }
      d += ` L ${x} ${ys[ys.length - 1] + 90}`;
      guidePath.current?.setAttribute('d', d);
      inkPath.current?.setAttribute('d', d);
      length = inkPath.current?.getTotalLength() || 0;
      inkPath.current?.setAttribute('stroke-dasharray', String(length));
      update();
    };

    const update = () => {
      frame = 0;
      const box   = main.getBoundingClientRect();
      const first = document.getElementById('projects');
      setVisible(Boolean(first && first.getBoundingClientRect().top < innerHeight * 0.5));
      const found = [...chapters].reverse().find(
        c => (document.getElementById(c.id)?.getBoundingClientRect().top ?? Infinity) < innerHeight * 0.48,
      );
      if (found) setActive(found.id);
      const percent = Math.max(0, Math.min(1, (-box.top + innerHeight * 0.5 - startY) / (endY - startY)));
      if (inkPath.current && length) {
        const drawn = reduced.matches ? length : length * percent;
        inkPath.current.style.strokeDashoffset = String(length - drawn);
        const pt = inkPath.current.getPointAtLength(drawn);
        dot.current?.setAttribute('cx', String(pt.x));
        dot.current?.setAttribute('cy', String(pt.y));
      }
    };

    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const ro = new ResizeObserver(geometry);
    ro.observe(main);
    geometry();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', geometry);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener('scroll', schedule);
      removeEventListener('resize', geometry);
    };
  }, []);

  return (
    <>
      <svg ref={svg} className="journey-thread" aria-hidden="true" preserveAspectRatio="none">
        <path ref={guidePath} fill="none" stroke="currentColor" strokeWidth="1" opacity=".17" />
        <path ref={inkPath}   fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle ref={dot} r="3.5" fill="currentColor" />
      </svg>
      <nav className={`chapter-dock${visible ? ' is-visible' : ''}`} aria-label="หมวดหมู่หน้าแรก">
        {chapters.map(c => (
          <a
            key={c.id}
            href={`#${c.id}`}
            aria-current={active === c.id ? 'location' : undefined}
          >
            <span>{c.n}</span>
            <strong>{c.label}</strong>
          </a>
        ))}
      </nav>
    </>
  );
}
