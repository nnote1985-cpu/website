'use client';

import { useEffect, useRef } from 'react';

const curve = (x = 0, y = 0) => `M 105 185 C ${50 + x * .25} ${225 + y * .25}, 60 295, 130 325 S ${240 + x * .3} ${380 + y * .3}, 205 435`;

export default function StoryThread() {
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const root = svg.current;
    const section = root?.closest<HTMLElement>('section');
    if (!root || !section) return;
    const paths = root.querySelectorAll('path');
    const ink = paths[1];
    const dot = root.querySelector('circle')!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, last = 0;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    let progress = 1, targetProgress = 1;
    const paint = (now: number) => {
      frame = 0;
      const blend = 1 - Math.exp(-Math.min(64, now - last || 16) / 240);
      last = now;
      x += (targetX - x) * blend;
      y += (targetY - y) * blend;
      progress += (targetProgress - progress) * blend;
      paths.forEach(path => path.setAttribute('d', curve(x, y)));
      ink.style.strokeDashoffset = `${1 - progress}`;
      const point = ink.getPointAtLength(ink.getTotalLength() * progress);
      dot.setAttribute('cx', `${point.x}`);
      dot.setAttribute('cy', `${point.y}`);
      if (!reduced.matches && (Math.abs(targetX - x) + Math.abs(targetY - y) > .03 || Math.abs(targetProgress - progress) > .0005)) frame = requestAnimationFrame(paint);
    };
    const schedule = () => { if (!frame) { last = performance.now(); frame = requestAnimationFrame(paint); } };
    const measure = () => {
      const rect = section.getBoundingClientRect();
      targetProgress = reduced.matches ? 1 : Math.max(0, Math.min(1, (innerHeight * .9 - rect.top) / (rect.height * .85)));
      schedule();
    };
    const move = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType !== 'mouse') return;
      const rect = section.getBoundingClientRect();
      targetX = (event.clientX / innerWidth - .5) * 20;
      targetY = ((event.clientY - rect.top) / rect.height - .5) * 16;
      schedule();
    };
    const reset = () => { targetX = targetY = 0; schedule(); };
    const preference = () => { targetX = targetY = x = y = 0; measure(); if (reduced.matches) progress = 1; };
    measure(); progress = targetProgress;
    addEventListener('scroll', measure, { passive: true });
    addEventListener('resize', measure, { passive: true });
    section.addEventListener('pointermove', move, { passive: true });
    section.addEventListener('pointerleave', reset);
    reduced.addEventListener('change', preference);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', measure);
      removeEventListener('resize', measure);
      section.removeEventListener('pointermove', move);
      section.removeEventListener('pointerleave', reset);
      reduced.removeEventListener('change', preference);
    };
  }, []);
  return <svg ref={svg} className="story-thread" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
    <path className="story-thread-guide" d={curve()} vectorEffect="non-scaling-stroke"/>
    <path className="story-thread-ink" d={curve()} pathLength="1" vectorEffect="non-scaling-stroke"/>
    <circle r="1.5" cx="205" cy="435"/>
  </svg>;
}
