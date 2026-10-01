'use client';
import { useEffect, useRef } from 'react';

export default function SectionLine() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      const ink = inkRef.current;
      const dot = dotRef.current;
      if (!wrap || !ink || !dot) return;

      const main = document.querySelector('main');
      if (!main) return;

      const heroEl = main.querySelector('.gallery-hero') as HTMLElement | null;
      const heroBottom = heroEl ? heroEl.offsetHeight : 0;

      const scrollBeyondHero = Math.max(0, window.scrollY - heroBottom);
      const scrollableRange = Math.max(1, main.scrollHeight - heroBottom - window.innerHeight);
      const progress = Math.min(1, scrollBeyondHero / scrollableRange);

      // Fade in as hero exits viewport
      const fadeStart = heroBottom - window.innerHeight * 1.1;
      const fadeRange = window.innerHeight * 0.35;
      const fadeIn = Math.max(0, Math.min(1, (window.scrollY - fadeStart) / fadeRange));

      wrap.style.opacity = String(fadeIn);
      ink.style.transform = `scaleY(${progress})`;
      dot.style.top = `${progress * 100}%`;
    };

    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      data-section-line
      className="fixed top-0 bottom-0 hidden md:block pointer-events-none z-10"
      style={{ left: 'clamp(14px, 2.6vw, 42px)', opacity: 0 }}
      aria-hidden
    >
      {/* Guide line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-slate-300 opacity-30" />
      {/* Ink fill */}
      <div
        ref={inkRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-[#1a2d6b]"
        style={{ height: '100%', transform: 'scaleY(0)', transformOrigin: 'top', opacity: 0.35 }}
      />
      {/* Traveling dot */}
      <div
        ref={dotRef}
        className="absolute left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#1a2d6b]"
        style={{ top: '0%', opacity: 0.55, marginLeft: '-2px' }}
      />
    </div>
  );
}
