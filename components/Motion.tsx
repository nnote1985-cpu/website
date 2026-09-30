'use client';
import { useEffect } from 'react';

/** Progressive enhancement: content is visible and usable without JavaScript. */
export default function Motion() {
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let dispose = () => {};
    const setup = () => {
      dispose();
      if (media.matches) return;
      const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
      targets.forEach(el => { el.classList.add('will-reveal'); observer.observe(el); });
      const parallax = () => Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
      const hero = document.querySelector<HTMLElement>('.hero');
      const progress = document.querySelector<HTMLElement>('.scroll-progress');
      const philosophy = document.querySelector<HTMLElement>('#philosophy');
      const philosophyLines = Array.from(document.querySelectorAll<HTMLElement>('.philosophy-line'));
      philosophy?.classList.add('philosophy-motion');
      let frame = 0;
      const update = () => {
        frame = 0;
        const height = innerHeight;
        const max = document.documentElement.scrollHeight - height;
        if (progress) progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
        document.documentElement.classList.toggle('has-scrolled', scrollY > 35);
        if (philosophy) {
          const rect = philosophy.getBoundingClientRect();
          const p = Math.max(0, Math.min(1, (height * 0.85 - rect.top) / (height * 0.85)));
          philosophy.style.setProperty('--philosophy-turn', `${-35 + p * 155}deg`);
          philosophy.style.setProperty('--philosophy-lift', `${85 - p * 150}px`);
          philosophy.style.setProperty('--philosophy-tilt', `${-12 + p * 16}deg`);
          philosophy.style.setProperty('--philosophy-photo', `${18 - p * 36}px`);
          philosophyLines.forEach((line, i) => {
            const fill = Math.max(0, Math.min(1, (p - i * 0.2) / 0.55));
            line.style.setProperty('--line-fill', `${fill * 100}%`);
            line.style.setProperty('--line-shift', `${(1 - fill) * (innerWidth < 768 ? 12 : 32)}px`);
          });
        }
        if (innerWidth < 768) return;
        parallax().forEach(el => {
          const rect = el.parentElement!.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > height) return;
          const shift = (rect.top + rect.height / 2 - height / 2) * Number(el.dataset.parallax || 0.07);
          el.style.setProperty('--parallax', `${Math.max(-65, Math.min(65, shift))}px`);
        });
      };
      const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
      const pointer = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || innerWidth < 900 || !hero) return;
        const x = event.clientX / innerWidth - 0.5;
        const y = event.clientY / innerHeight - 0.5;
        hero.style.setProperty('--pointer-x', `${x * 10}px`);
        hero.style.setProperty('--pointer-y', `${y * 7}px`);
        hero.style.setProperty('--rotate-y', `${x * 2}deg`);
      };
      const reset = () => { hero?.style.setProperty('--pointer-x', '0px'); hero?.style.setProperty('--pointer-y', '0px'); hero?.style.setProperty('--rotate-y', '0deg'); };
      addEventListener('scroll', schedule, { passive: true });
      addEventListener('resize', schedule, { passive: true });
      hero?.addEventListener('pointermove', pointer, { passive: true });
      hero?.addEventListener('pointerleave', reset);
      update();
      dispose = () => {
        observer.disconnect(); cancelAnimationFrame(frame);
        removeEventListener('scroll', schedule); removeEventListener('resize', schedule);
        hero?.removeEventListener('pointermove', pointer); hero?.removeEventListener('pointerleave', reset); reset();
        targets.forEach(el => el.classList.remove('will-reveal'));
        parallax().forEach(el => el.style.removeProperty('--parallax'));
        philosophy?.classList.remove('philosophy-motion');
      };
    };
    setup(); media.addEventListener('change', setup);
    return () => { dispose(); media.removeEventListener('change', setup); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}
