'use client';
import { useState } from 'react';
import { projects } from '@/lib/content';
import Photo from './Photo';
import { Arrow, Pin } from './Icon';

export default function Projects() {
  const [area, setArea] = useState('all');
  const [budget, setBudget] = useState('all');
  const [activeOnly, setActiveOnly] = useState(false);
  const results = projects.filter(p => (area === 'all' || p.area === area) && (budget === 'all' || (budget === 'under2' ? p.price < 2000000 : p.price >= 2000000)) && (!activeOnly || p.status === 'active'));
  return <section className="projects section-pad" id="projects" aria-labelledby="projects-title">
    <div className="section-heading" data-reveal><div><span className="index-label">01 / OUR RESIDENCES</span><h2 id="projects-title">Find your<br/><em>place in the city.</em></h2></div><div className="heading-aside"><p>ทำเลที่ใช่ พื้นที่ที่เป็นคุณ<br/>ค้นพบจุดเริ่มต้นของชีวิตบทใหม่</p><a className="text-link" href="/projects">ทุกโครงการ <Arrow diagonal /></a></div></div>
    <div className="project-filters" aria-label="กรองโครงการ">
      <div className="area-filters" role="group" aria-label="เลือกทำเล">{['all', 'พหลโยธิน', 'บางชัน', 'รามคำแหง'].map(a => <button key={a} aria-pressed={area === a} className={area === a ? 'selected' : ''} onClick={() => setArea(a)}>{a === 'all' ? 'ทุกทำเล' : a}</button>)}</div>
      <div className="filter-controls"><label className="budget-filter"><span className="sr-only">งบประมาณ</span><select aria-label="งบประมาณ" value={budget} onChange={e => setBudget(e.target.value)}><option value="all">ทุกช่วงราคา</option><option value="under2">ต่ำกว่า 2 ล้านบาท</option><option value="over2">ตั้งแต่ 2 ล้านบาท</option></select></label><label className="available-filter"><input type="checkbox" checked={activeOnly} onChange={e => setActiveOnly(e.target.checked)} />เปิดขายแล้ว</label></div>
    </div>
    <p className="sr-only" role="status">พบ {results.length} โครงการ</p>
    <div className="project-grid">
      {results.map((p) => <article className="project-card" key={p.href}>
        <a className="project-image" href={p.href} aria-label={`ดูโครงการ ${p.name} ${p.title}`}><Photo name={p.image} alt={`${p.name} ${p.title} ภาพจำลองอาคารโครงการ`} sizes="(max-width: 700px) 100vw, 50vw" parallax={0.11}/><span className="project-status"><i className={p.status === 'active' ? 'active' : ''}/>{p.status === 'active' ? 'เปิดขายแล้ว' : 'เร็ว ๆ นี้'}</span><span className="project-view">EXPLORE RESIDENCE <Arrow diagonal /></span></a>
        <div className="project-meta"><span>{p.type}</span><span>เริ่ม {(p.price / 1000000).toFixed(2)} ล้านบาท*</span></div>
        <div className="project-title"><a href={p.href}><h3>{p.name}<em>{p.title}</em></h3></a><a className="circle-link" href={p.href} aria-label={`รายละเอียด ${p.name} ${p.title}`}><Arrow diagonal /></a></div>
        <p className="project-location"><Pin/>{p.location}</p>
      </article>)}
    </div>
    {results.length === 0 && <div className="empty-projects"><h3>ลองขยับทำเล หรือปรับงบอีกนิด</h3><p>ยังไม่มีโครงการที่ตรงกับตัวเลือกนี้</p><button className="text-link" onClick={() => { setArea('all'); setBudget('all'); setActiveOnly(false); }}>ดูทุกโครงการ <Arrow/></button></div>}
    <div className="projects-foot"><p>*ราคาและเงื่อนไขอาจเปลี่ยนแปลง กรุณาสอบถามโครงการ<br/>ภาพและบรรยากาศจำลองเพื่อการโฆษณา</p><a href="/promotion" className="text-link">ข้อเสนอพิเศษสำหรับคุณ <Arrow diagonal /></a></div>
  </section>;
}
