'use client';
import { useEffect, useRef, useState } from 'react';

export default function Architecture() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const small = matchMedia('(max-width: 767px)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let stopped = false;
    let cleanup = () => {};
    let started = false;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || started || reduced.matches || small.matches || connection?.saveData) return;
      started = true;
      try {
        const THREE = await import('three');
        if (stopped) return;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        el.appendChild(renderer.domElement);
        renderer.domElement.setAttribute('aria-hidden', 'true');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
        camera.position.set(9, 6.5, 11); camera.lookAt(0, 1.5, 0);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x57625c, 3));
        const sun = new THREE.DirectionalLight(0xfff3dc, 5); sun.position.set(-5, 9, 5); scene.add(sun);
        const fill = new THREE.DirectionalLight(0xe0ebff, 2); fill.position.set(6, 2, -4); scene.add(fill);
        const group = new THREE.Group(); scene.add(group);
        const stone = new THREE.MeshStandardMaterial({ color: 0xdcd7c9, roughness: 0.75 });
        const dark = new THREE.MeshStandardMaterial({ color: 0x354d48, roughness: 0.4, metalness: 0.2 });
        const bronze = new THREE.MeshStandardMaterial({ color: 0xb6976e, roughness: 0.35, metalness: 0.55 });
        const geometries: InstanceType<typeof THREE.BoxGeometry>[] = [];
        const box = (w: number, h: number, d: number, x: number, y: number, z: number, mat = stone) => {
          const geom = new THREE.BoxGeometry(w,h,d); geometries.push(geom);
          const mesh = new THREE.Mesh(geom,mat); mesh.position.set(x,y,z); group.add(mesh); return mesh;
        };
        box(5.6,0.18,5.6,0,-0.2,0);
        box(5,0.16,5,0,0,0);
        const floors = [];
        for (let floor=0; floor<5; floor++) {
          const y = floor * 0.83 + 0.4;
          floors.push(box(3.8,0.12,3.8,0,y,0));
          for (const x of [-1.65,1.65]) for (const z of [-1.65,1.65]) box(0.16,0.75,0.16,x,y+0.38,z,bronze);
          box(2.7,0.6,0.05,0,y+0.36,-1.5,dark);
          box(0.05,0.6,2.7,-1.5,y+0.36,0,dark);
          for (let i=0;i<8;i++) box(0.045,0.6,0.05,-1.2+i*0.35,y+0.36,1.65,bronze);
        }
        box(4.15,0.16,4.15,0,4.6,0);
        box(1.2,0.1,1.2,0,4.75,0,dark);
        group.rotation.y = -0.35;
        let frame = 0, visible = true, target = -0.35;
        const clock = new THREE.Clock();
        const draw = () => {
          if (stopped || !visible || document.hidden || reduced.matches) { frame = 0; return; }
          const dt = Math.min(clock.getDelta(), 0.05);
          group.rotation.y += (target - group.rotation.y) * Math.min(1, dt * 2);
          const rect = el.getBoundingClientRect();
          const p = Math.max(0,Math.min(1,(innerHeight - rect.top) / (innerHeight + rect.height)));
          group.rotation.y += dt * 0.035;
          group.position.y = Math.sin(p * Math.PI) * 0.12;
          renderer.render(scene,camera);
          frame = requestAnimationFrame(draw);
        };
        const resize = new ResizeObserver(() => { if (!el.clientWidth || !el.clientHeight) return; renderer.setSize(el.clientWidth,el.clientHeight); camera.aspect=el.clientWidth/el.clientHeight; camera.updateProjectionMatrix(); renderer.render(scene,camera); }); resize.observe(el);
        const visibility = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !frame) draw(); }, { threshold: 0.01 }); visibility.observe(el);
        const move = (e: PointerEvent) => { const r=el.getBoundingClientRect(); target=-0.35 + ((e.clientX-r.left)/r.width-0.5)*0.9; };
        const leave = () => { target=-0.35; };
        const resume = () => { if (!document.hidden && !frame && visible) draw(); };
        const preference = () => { if (reduced.matches || small.matches) { cancelAnimationFrame(frame); frame=0; renderer.domElement.style.display='none'; setReady(false); } else { renderer.domElement.style.display='block'; setReady(true); resume(); } };
        const contextLost = (e: Event) => { e.preventDefault(); cancelAnimationFrame(frame); frame=0; setReady(false); };
        el.addEventListener('pointermove', move); el.addEventListener('pointerleave',leave);
        document.addEventListener('visibilitychange',resume); reduced.addEventListener('change',preference); small.addEventListener('change',preference);
        renderer.domElement.addEventListener('webglcontextlost',contextLost);
        setReady(true); draw();
        cleanup = () => { cancelAnimationFrame(frame); resize.disconnect(); visibility.disconnect(); el.removeEventListener('pointermove',move); el.removeEventListener('pointerleave',leave); document.removeEventListener('visibilitychange',resume); reduced.removeEventListener('change',preference); small.removeEventListener('change',preference); renderer.domElement.removeEventListener('webglcontextlost',contextLost); geometries.forEach(g=>g.dispose()); [stone,dark,bronze].forEach(m=>m.dispose()); renderer.dispose(); renderer.domElement.remove(); };
      } catch { /* The CSS architectural composition remains visible if WebGL is unavailable. */ }
    }, { rootMargin: '250px' });
    observer.observe(el);
    return () => { stopped=true; observer.disconnect(); cleanup(); };
  }, []);
  return <div className={`architecture ${ready ? 'is-ready' : ''}`} ref={host} role="img" aria-label="ประติมากรรมสถาปัตยกรรมเชิงนามธรรม แสดงแนวคิดการออกแบบพื้นที่ ไม่ใช่แบบจำลองโครงการ">
    <div className="architecture-grid"/>
    <div className="architecture-fallback" aria-hidden="true">{[0,1,2,3,4].map(i=><span key={i} style={{ '--floor': i } as React.CSSProperties}/>)}</div>
    <span className="architecture-coordinate">FORM / SPACE / LIFE</span><span className="architecture-note">แนวคิดพื้นที่และสถาปัตยกรรม</span>
  </div>;
}
