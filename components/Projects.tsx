'use client';
import { useState } from 'react';
import { projects } from '@/lib/content';
import Photo from './Photo';
import { Arrow, Pin } from './Icon';

export default function Projects() {
  const [area, setArea] = useState('all');
  const [budget, setBudget] = useState('all');
  const [status, setStatus] = useState('all');
  const results = projects.filter(p => (area === 'all' || p.area === area) && (budget === 'all' || (budget === 'under2' ? p.price < 2000000 : p.price >= 2000000)) && (status === 'all' || p.status === status));
  const showResults = () => {
    const heading = document.getElementById('residence-results');
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  };
  return <section className="projects section-pad" id="projects" aria-labelledby="projects-title">
    <div className="residence-heading" data-reveal><span className="index-label">01 / FIND YOUR SPACE</span><div className="residence-heading-row"><h2 id="projects-title">พื้นที่แบบไหน<br/><span>ที่เป็นคุณ</span></h2><p>ทุกชีวิตมีจังหวะของตัวเอง<br/>เริ่มจากทำเลที่ใช่ แล้วค้นพบพื้นที่ของคุณ</p></div></div>
    <div className="residence-finder" aria-label="กรองโครงการ" data-reveal>
      <div className="finder-instruction"><h3>ค้นหาโครงการของคุณ</h3><p>เลือกทำเลและงบประมาณ หรือดูทุกโครงการได้เลย</p></div>
      <label className="finder-field"><span>01 — ทำเลที่คุณมองหา</span><select aria-label="เลือกทำเล" value={area} onChange={e => setArea(e.target.value)}>{['all', 'พหลโยธิน', 'บางชัน', 'รามคำแหง'].map(a => <option key={a} value={a}>{a === 'all' ? 'ทุกทำเล' : a}</option>)}</select></label>
      <label className="finder-field"><span>02 — งบประมาณของคุณ</span><select aria-label="งบประมาณ" value={budget} onChange={e => setBudget(e.target.value)}><option value="all">ทุกช่วงราคา</option><option value="under2">ต่ำกว่า 2 ล้านบาท</option><option value="over2">ตั้งแต่ 2 ล้านบาท</option></select></label>
      <button className="finder-submit" type="button" onClick={showResults}>ดูโครงการที่ตรงใจ <Arrow/></button>
      <div className="finder-feedback"><span role="status">พบ {results.length} โครงการตามตัวเลือกของคุณ</span>{(area !== 'all' || budget !== 'all' || status !== 'all') && <button type="button" onClick={() => {setArea('all');setBudget('all');setStatus('all');}}>ล้างตัวกรอง</button>}</div>
    </div>
    <aside className="residence-offer" aria-label="ข้อเสนอพิเศษ" data-reveal><span className="offer-label"><i/> SPECIAL PRIVILEGES</span><div><h3>ให้การเริ่มต้น เป็นเรื่องที่ใกล้กว่า</h3><p>ค้นพบราคาและข้อเสนอสำหรับโครงการที่คุณสนใจ</p></div><a href="/promotion">ดูข้อเสนอพิเศษ <Arrow diagonal/></a></aside>
    <div className="residence-results" id="residence-results" tabIndex={-1} role="region" aria-label="ผลการค้นหาโครงการ"><div className="residence-status" role="group" aria-label="สถานะโครงการ">{[{value:'all',label:'ทั้งหมด'},{value:'active',label:'เปิดขายแล้ว'},{value:'coming-soon',label:'เร็ว ๆ นี้'}].map(s => <button key={s.value} aria-pressed={status === s.value} onClick={() => setStatus(s.value)}>{s.label}</button>)}</div><p>{String(results.length).padStart(2,'0')} <span>โครงการ</span></p></div>
    <div className="project-grid">
      {results.map((p) => <article className="project-card" key={p.href}>
        <a className="project-image" href={p.href} aria-label={`ดูโครงการ ${p.name} ${p.title}`}><Photo name={p.image} alt={`${p.name} ${p.title} ภาพจำลองอาคารโครงการ`} sizes="(max-width: 700px) 100vw, 50vw" parallax={0.11}/><span className="project-status"><i className={p.status === 'active' ? 'active' : ''}/>{p.status === 'active' ? 'เปิดขายแล้ว' : 'เร็ว ๆ นี้'}</span><span className="project-view">EXPLORE RESIDENCE <Arrow diagonal /></span></a>
        <div className="project-meta"><span>{p.type}</span><span>เริ่ม {(p.price / 1000000).toFixed(2)} ล้านบาท*</span></div>
        <div className="project-title"><a href={p.href}><h3>{p.name}<em>{p.title}</em></h3></a><a className="circle-link" href={p.href} aria-label={`รายละเอียด ${p.name} ${p.title}`}><Arrow diagonal /></a></div>
        <p className="project-location"><Pin/>{p.location}</p>
      </article>)}
    </div>
    {results.length === 0 && <div className="empty-projects"><h3>ลองขยับทำเล หรือปรับงบอีกนิด</h3><p>ยังไม่มีโครงการที่ตรงกับตัวเลือกนี้</p><button className="text-link" onClick={() => { setArea('all'); setBudget('all'); setStatus('all'); }}>ดูทุกโครงการ <Arrow/></button></div>}
    <div className="projects-foot"><p>*ราคาและเงื่อนไขอาจเปลี่ยนแปลง กรุณาสอบถามโครงการ<br/>ภาพและบรรยากาศจำลองเพื่อการโฆษณา</p><a href="/promotion" className="text-link">ข้อเสนอพิเศษสำหรับคุณ <Arrow diagonal /></a></div>
  </section>;
}
