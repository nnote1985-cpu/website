'use client';
import { useEffect, useRef, useState } from 'react';

const chapters = [
  { id: 'projects',  n: '01', label: 'โครงการ' },
  { id: 'services',  n: '02', label: 'บริการ' },
  { id: 'finance',   n: '03', label: 'สินเชื่อ' },
  { id: 'contact',   n: '04', label: 'ติดต่อ' },
];

// Section IDs Journey will connect (must match ids added to page.tsx)
const SECTION_CURVES = [
  { id: 'projects', offset: 24, lead: 55, tail: 72 },
  { id: 'why', offset: -9, lead: 85, tail: 105 },
  { id: 'services', offset: 18, lead: 45, tail: 80 },
  { id: 'finance', offset: -6, lead: 70, tail: 110 },
  { id: 'news', offset: 28, lead: 90, tail: 125 },
  { id: 'faq', offset: 0, lead: 190, tail: 220 },
  { id: 'contact', offset: -8, lead: 45, tail: 95 },
  { id: 'freedom', offset: 26, lead: 95, tail: 140 },
];

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

      const heroEl = main.querySelector('.gallery-hero') as HTMLElement | null;
      const heroH  = heroEl ? heroEl.offsetHeight : 0;

      const targets = SECTION_CURVES.flatMap(curve => {
        const el = document.getElementById(curve.id);
        return el ? [{ ...curve, el, y: el.getBoundingClientRect().top - box.top }] : [];
      });
      if (!targets.length) return;

      startY = heroH - 70;
      // Finish inside the final image, just before the footer.
      endY = main.scrollHeight - 32;

      const pathStart = heroH - 70;
      let d = `M ${x} ${pathStart}`;
      let cursorY = pathStart;
      let hasFaqSweep = false;
      for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        if (target.id === 'contact' && hasFaqSweep) continue;
        if (target.id === 'faq') {
          const label = target.el.querySelector('button > span');
          if (label) {
            const rect = label.getBoundingClientRect();
            const top = rect.top - box.top;
            const bottom = rect.bottom - box.top;
            const detourX = Math.min(width - 32, rect.right - box.left + 28);
            const from = Math.max(cursorY, top - 190);
            const middle = (top + bottom) / 2;
            let returnY = Math.min(endY, bottom + (width < 768 ? 76 : 220));
            // Expanded FAQ cards can occupy the left gutter on narrow screens.
            const firstAnswer = target.el.querySelector('article');
            if (firstAnswer) {
              const answer = firstAnswer.getBoundingClientRect();
              if (answer.height > 0 && answer.left - box.left < detourX + 16) {
                returnY = Math.min(returnY, answer.top - box.top - 12);
              }
            }
            // One broad sweep with a continuous vertical tangent at its crest.
            // No straight shoulder or separate contact wave beneath the label.
            d += ` L ${x} ${from} C ${x} ${from + (middle - from) * .5}, ${detourX} ${middle - (middle - from) * .5}, ${detourX} ${middle}`;
            d += ` C ${detourX} ${middle + (returnY - middle) * .5}, ${x} ${returnY - (returnY - middle) * .5}, ${x} ${returnY}`;
            cursorY = returnY;
            hasFaqSweep = true;
            continue;
          }
        }
        // Reserve room before the following section so short mobile sections
        // never produce a path that doubles back on itself.
        const next = targets[i + 1];
        const from = Math.max(cursorY, target.y - target.lead);
        const to = Math.min(target.y + target.tail, next ? next.y - next.lead : endY);
        if (to - from < 32) continue;
        const span = to - from;
        const bend = width < 768
          ? Math.max(5, Math.min(14, x + target.offset * .18))
          : Math.max(6, x + target.offset);
        d += ` L ${x} ${from} C ${x} ${from + span * .22}, ${bend} ${from + span * .23}, ${bend} ${from + span * .46} C ${bend} ${from + span * .72}, ${x} ${from + span * .76}, ${x} ${to}`;
        cursorY = to;
      }
      d += ` L ${x} ${endY}`;
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
      // A short footer may prevent the endpoint reaching the viewport midpoint.
      // Limit the drawing range to the reading position reachable at page bottom.
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - innerHeight);
      const mainTop = box.top + scrollY;
      const reachableEnd = Math.min(endY, maxScroll - mainTop + innerHeight * 0.5);
      const percent = Math.max(0, Math.min(1, (-box.top + innerHeight * 0.5 - startY) / Math.max(1, reachableEnd - startY)));
      if (inkPath.current && length) {
        // Follow the actual curve height, including the wider FAQ detour.
        const readingY = startY + (endY - startY) * percent;
        let low = 0, high = length;
        for (let i = 0; i < 14; i++) {
          const middle = (low + high) / 2;
          if (inkPath.current.getPointAtLength(middle).y < readingY) low = middle;
          else high = middle;
        }
        const drawn = reduced.matches || percent === 1 ? length : percent === 0 ? 0 : (low + high) / 2;
        inkPath.current.style.strokeDashoffset = String(length - drawn);
        const pt = inkPath.current.getPointAtLength(drawn);
        dot.current?.setAttribute('cx', String(pt.x));
        dot.current?.setAttribute('cy', String(pt.y));
      }
    };

    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const ro = new ResizeObserver(geometry);
    ro.observe(main);
    SECTION_CURVES.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) ro.observe(section);
    });
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
