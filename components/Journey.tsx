'use client';
import { useEffect, useRef, useState } from 'react';

const chapters=[{id:'projects',n:'01',label:'โครงการ'},{id:'living',n:'02',label:'ชีวิตที่นี่'},{id:'care',n:'03',label:'บริการดูแล'},{id:'finance',n:'04',label:'วางแผนและติดต่อ'}];
export default function Journey(){
  const svg=useRef<SVGSVGElement>(null);
  const path=useRef<SVGPathElement>(null);
  const progressPath=useRef<SVGPathElement>(null);
  const dot=useRef<SVGCircleElement>(null);
  const [active,setActive]=useState('projects');
  const [visible,setVisible]=useState(false);
  useEffect(()=>{
    const main=document.querySelector('main');if(!main)return;
    let frame=0,length=0,startY=0,endY=1;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    const geometry=()=>{
      const box=main.getBoundingClientRect();
      const width=main.clientWidth;
      const height=main.scrollHeight;
      svg.current?.setAttribute('viewBox',`0 0 ${width} ${height}`);
      const x=width<700?10:Math.min(42,width*.025);
      const targets=['philosophy','projects','living','care','finance','contact'].map(id=>document.getElementById(id)).filter(Boolean) as HTMLElement[];
      const ys=targets.map(el=>el.getBoundingClientRect().top-box.top);
      if(!ys.length)return;
      startY=ys[0]-70;endY=ys[ys.length-1]+90;
      let d=`M ${x} ${ys[0]-70}`;
      for(let i=0;i<ys.length;i++){
        const y=ys[i];const bend=i%2===0?x+Math.min(width*.013,24):x-6;
        d+=` L ${x} ${y-55} C ${x} ${y-20}, ${bend} ${y-20}, ${bend} ${y+12} C ${bend} ${y+40}, ${x} ${y+42}, ${x} ${y+72}`;
      }
      d+=` L ${x} ${ys[ys.length-1]+90}`;
      path.current?.setAttribute('d',d);progressPath.current?.setAttribute('d',d);
      length=progressPath.current?.getTotalLength()||0;
      progressPath.current?.setAttribute('stroke-dasharray',String(length));
      update();
    };
    const update=()=>{
      frame=0;const box=main.getBoundingClientRect();const first=document.getElementById('philosophy');
      setVisible(Boolean(first&&first.getBoundingClientRect().top<innerHeight*.5));
      const found=[...chapters].reverse().find(c=>(document.getElementById(c.id)?.getBoundingClientRect().top??Infinity)<innerHeight*.48);
      if(found)setActive(found.id);
      const percent=Math.max(0,Math.min(1,(-box.top+innerHeight*.5-startY)/(endY-startY)));
      if(progressPath.current&&length){
        const current=reduced.matches?length:length*percent;
        progressPath.current.style.strokeDashoffset=String(length-current);
        const pt=progressPath.current.getPointAtLength(current);
        dot.current?.setAttribute('cx',String(pt.x));dot.current?.setAttribute('cy',String(pt.y));
      }
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const ro=new ResizeObserver(geometry);ro.observe(main);geometry();
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',geometry);
    return()=>{ro.disconnect();cancelAnimationFrame(frame);removeEventListener('scroll',schedule);removeEventListener('resize',geometry);};
  },[]);
  return <>
    <svg ref={svg} className="journey-thread" aria-hidden="true" preserveAspectRatio="none"><path ref={path} fill="none" stroke="currentColor" strokeWidth="1" opacity=".17"/><path ref={progressPath} fill="none" stroke="currentColor" strokeWidth="1.5"/><circle ref={dot} r="3.5" fill="currentColor"/></svg>
    <nav className={`chapter-dock ${visible?'is-visible':''}`} aria-label="หมวดหมู่หน้าแรก">{chapters.map(c=><a key={c.id} href={`#${c.id}`} aria-current={active===c.id?'location':undefined}><span>{c.n}</span><strong>{c.label}</strong></a>)}</nav>
  </>;
}
