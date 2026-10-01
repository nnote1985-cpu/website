'use client';
import { useEffect, useRef } from 'react';

export default function SectionLine() {
  const inkRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const ink = inkRef.current;
      const dot = dotRef.current;
      const wrap = wrapRef.current;
      if (!ink || !dot || !wrap) return;

      const main = document.querySelector('main');
      if (!main) return;

      const heroEl = main.querySelector('.gallery-hero') as HTMLElement | null;
      const heroH = heroEl ? heroEl.offsetHeight : 0;

      // Fade the whole line in once hero starts leaving viewport
      const fadeProgress = heroH > 0
        ? Math.max(0, Math.min(1, (window.scrollY - heroH * 0.6) / (window.innerHeight * 0.4)))
        : 1;
      wrap.style.opacity = String(fadeProgress * 0.9);

      // Fill ink from top as user scrolls through the rest of the page
      const scrollable = Math.max(1, main.scrollHeight - window.innerHeight);
      const progress = Math.min(1, window.scrollY / scrollable);

      ink.style.transform = `scaleY(${progress})`;
      dot.style.transform = `translateY(${progress * (wrap.offsetHeight - 6)}px)`;
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
      aria-hidden="true"
      className="fixed top-0 bottom-0 hidden md:flex pointer-events-none"
      style={{ left: 'clamp(14px, 2.6vw, 40px)', width: '1px', zIndex: 10, opacity: 0 }}
    >
      {/* Ghost guide */}
      <div className="absolute inset-0 bg-slate-300" style={{ opacity: 0.35 }} />
      {/* Ink fill */}
      <div
        ref={inkRef}
        className="absolute top-0 left-0 right-0 bg-[#1a2d6b]"
        style={{ height: '100%', transform: 'scaleY(0)', transformOrigin: 'top', opacity: 0.55 }}
      />
      {/* Traveling dot */}
      <div
        ref={dotRef}
        className="absolute bg-[#1a2d6b] rounded-full"
        style={{ top: 0, left: '-2px', width: 5, height: 5, opacity: 0.7 }}
      />
    </div>
  );
}
