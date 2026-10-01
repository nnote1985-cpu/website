'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Fades/slides children in once they enter the viewport.
 * Content stays visible without JS: the hidden state only applies after mount.
 */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('about-reveal');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

/**
 * Moves its child vertically as the frame scrolls through the viewport.
 * Only transform changes, so the image layer is never repainted while scrolling.
 */
export function Parallax({ children, className = '', strength = 0.12 }: { children: ReactNode; className?: string; strength?: number }) {
  const frame = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = frame.current;
    const inner = layer.current;
    if (!el || !inner) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      // -1 when the frame enters from below, +1 when it leaves at the top
      const progress = (vh - r.top) / (vh + r.height) * 2 - 1;
      inner.style.transform = `translate3d(0, ${(progress * strength * r.height).toFixed(1)}px, 0)`;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [strength]);

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <div
        ref={layer}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${strength * 100}%`, bottom: `-${strength * 100}%` }}
      >
        {children}
      </div>
    </div>
  );
}
