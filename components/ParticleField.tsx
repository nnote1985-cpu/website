'use client';

import { useEffect, useRef } from 'react';

/**
 * พื้นหลังอนุภาคตัวอักษรสำหรับ PageHero: ตัวอักษรลอยลงช้าๆ ลำแสงสีฟ้าวิ่งขึ้น
 * และเส้นเชื่อมระหว่างตัวอักษรที่อยู่ใกล้กัน ตัวที่อยู่ใกล้นิ้ว/เมาส์จะเปลี่ยนเป็นสีส้ม
 * วาดด้วย canvas ล้วน ไม่มี dependency หยุดวาดเมื่อเลื่อนพ้นจอหรือแท็บถูกซ่อน
 * และแสดงเป็นภาพนิ่งเมื่อผู้ใช้ตั้งค่าลดการเคลื่อนไหว
 */

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&+'.split('');
const LINK = 110;
const REACH = 150;

type Node = { x: number; y: number; vy: number; char: string };
type Beam = { x: number; y: number; length: number; speed: number; alpha: number };

const pick = () => CHARS[Math.floor(Math.random() * CHARS.length)];

export default function ParticleField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let beams: Beam[] = [];
    let frame = 0;
    let onScreen = true;
    const pointer = { x: -9999, y: -9999 };

    const seed = () => {
      const area = width * height;
      const nodeCount = Math.round(Math.min(Math.max(area / (coarse ? 9000 : 7000), 24), coarse ? 45 : 90));
      const beamCount = Math.round(Math.min(Math.max(width / 60, 6), coarse ? 10 : 22));
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: Math.random() * 0.35 + 0.1,
        char: pick(),
      }));
      beams = Array.from({ length: beamCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 90 + 40,
        speed: Math.random() * 3 + 1.5,
        alpha: Math.random() * 0.4 + 0.2,
      }));
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === width && Math.abs(h - height) < 2) return;
      const widthChanged = w !== width;
      width = w;
      height = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (widthChanged || nodes.length === 0) seed();
      if (reduced) draw(false);
    };

    function draw(move: boolean) {
      ctx!.clearRect(0, 0, width, height);

      ctx!.lineWidth = 1.25;
      for (const b of beams) {
        if (move) {
          b.y -= b.speed;
          if (b.y + b.length < 0) {
            b.y = height + Math.random() * 80;
            b.x = Math.random() * width;
          }
        }
        const g = ctx!.createLinearGradient(b.x, b.y, b.x, b.y + b.length);
        g.addColorStop(0, `rgba(94, 196, 240, ${b.alpha})`);
        g.addColorStop(1, 'rgba(94, 196, 240, 0)');
        ctx!.strokeStyle = g;
        ctx!.beginPath();
        ctx!.moveTo(b.x, b.y);
        ctx!.lineTo(b.x, b.y + b.length);
        ctx!.stroke();
      }

      ctx!.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const c = nodes[j];
          const d = Math.hypot(a.x - c.x, a.y - c.y);
          if (d < LINK) {
            ctx!.strokeStyle = `rgba(170, 190, 230, ${0.16 * (1 - d / LINK)})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(c.x, c.y);
            ctx!.stroke();
          }
        }
      }

      ctx!.font = '12px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      for (const n of nodes) {
        if (move) {
          n.y += n.vy;
          if (n.y > height + 20) {
            n.y = -20;
            n.x = Math.random() * width;
          }
        }
        const dist = Math.hypot(pointer.x - n.x, pointer.y - n.y);
        const near = dist < REACH;
        if (move && (near ? Math.random() > 0.7 : Math.random() > 0.985)) n.char = pick();
        if (near) {
          ctx!.strokeStyle = `rgba(244, 81, 30, ${0.45 * (1 - dist / REACH)})`;
          ctx!.beginPath();
          ctx!.moveTo(n.x, n.y);
          ctx!.lineTo(pointer.x, pointer.y);
          ctx!.stroke();
        }
        ctx!.fillStyle = near ? '#ff8a5c' : 'rgba(170, 190, 230, 0.42)';
        ctx!.fillText(n.char, n.x, n.y);
      }
    }

    const loop = () => {
      draw(true);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduced || frame || !onScreen || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const setPointer = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      if (reduced) draw(false);
    };
    const clearPointer = () => {
      pointer.x = pointer.y = -9999;
      if (reduced) draw(false);
    };
    const onPointer = (e: PointerEvent) => setPointer(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setPointer(t.clientX, t.clientY);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    host.addEventListener('pointermove', onPointer, { passive: true });
    host.addEventListener('pointerdown', onPointer, { passive: true });
    host.addEventListener('pointerleave', clearPointer);
    host.addEventListener('touchmove', onTouch, { passive: true });
    host.addEventListener('touchend', clearPointer);

    resize();
    if (reduced) draw(false);
    else start();
    canvas.style.opacity = '1';

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      host.removeEventListener('pointermove', onPointer);
      host.removeEventListener('pointerdown', onPointer);
      host.removeEventListener('pointerleave', clearPointer);
      host.removeEventListener('touchmove', onTouch);
      host.removeEventListener('touchend', clearPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 ${className}`}
    />
  );
}
