'use client';

import { useEffect, useRef } from 'react';

type Point = { x: number; y: number; vx: number; vy: number };

/** A quiet, temporary ink line; the native cursor remains the interaction target. */
export default function PointerTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const enabled = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let points: Point[] = [];
    let target: Point | null = null;
    let accumulator = 0;
    let frame = 0;
    let previous = 0;

    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      points = [];
      target = null;
      accumulator = 0;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
    };
    const resize = () => {
      clear();
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(innerWidth * ratio);
      canvas.height = Math.round(innerHeight * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = (now: number) => {
      frame = 0;
      accumulator += Math.min(50, now - previous || 16.67);
      previous = now;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (!target || !points.length) return;

      // Fixed simulation steps keep the same weight at 60, 120 and 144 Hz.
      // This is a connected filament, not a list of expiring mouse positions.
      while (accumulator >= 1000 / 60) {
        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          const leader = i === 0 ? target : points[i - 1];
          const dx = leader.x - point.x;
          const dy = leader.y - point.y;
          const follow = i === 0 ? 0.56 : 0.48;
          point.vx = point.vx * 0.78 + dx * 0.12;
          point.vy = point.vy * 0.78 + dy * 0.12;
          point.x += dx * follow + point.vx * 0.08;
          point.y += dy * follow + point.vy * 0.08;
        }
        accumulator -= 1000 / 60;
      }

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let i = 1; i < points.length - 1; i++) {
        const a = points[i - 1], b = points[i], c = points[i + 1];
        const along = i / (points.length - 1);
        const opacity = 0.98 * Math.pow(1 - along, 0.4);
        const width = 1.65 - along * 0.8;
        ctx.beginPath();
        ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2);
        ctx.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2);
        // A fine dark edge keeps the ivory filament legible over both photography
        // and cream sections, without relying on a cancelling blend mode.
        ctx.strokeStyle = `rgba(35, 51, 44, ${opacity * 0.65})`;
        ctx.lineWidth = width + 1.2;
        ctx.stroke();
        ctx.strokeStyle = `rgba(245, 239, 220, ${opacity})`;
        ctx.lineWidth = width;
        ctx.stroke();
      }
      const settled = points.every(point => Math.hypot(point.x - target!.x, point.y - target!.y) < 0.15 && Math.hypot(point.vx, point.vy) < 0.1);
      if (settled) {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        // Keep the chain anchored for the next movement; never start a new stroke.
        points.forEach(point => { point.x = target!.x; point.y = target!.y; point.vx = point.vy = 0; });
      } else frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== 'mouse' || document.hidden) return;
      target = { x: event.clientX, y: event.clientY, vx: 0, vy: 0 };
      if (!points.length) points = Array.from({ length: 64 }, () => ({ ...target! }));
      if (!frame) {
        previous = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };
    const leave = (event: PointerEvent) => {
      // A slide or element disappearing can emit pointerout with no relatedTarget.
      // Only reset when the pointer actually leaves the document viewport.
      if (event.clientX <= 0 || event.clientY <= 0 || event.clientX >= innerWidth || event.clientY >= innerHeight) clear();
    };
    resize();
    addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    addEventListener('resize', resize, { passive: true });
    addEventListener('blur', clear);
    document.addEventListener('visibilitychange', clear);
    enabled.addEventListener('change', clear);
    return () => {
      clear();
      removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      removeEventListener('resize', resize);
      removeEventListener('blur', clear);
      document.removeEventListener('visibilitychange', clear);
      enabled.removeEventListener('change', clear);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-trail" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 90 }}/>;
}
