'use client';
import { useRef, useState } from 'react';
import Photo from './Photo';
import { Arrow } from './Icon';

const moments = [
  { label: 'พักใจ', en: 'Room to breathe.', image: 'garden', title: 'ธรรมชาติ ใกล้กว่าที่คิด', text: 'เว้นจังหวะจากเมือง แล้วกลับมาหาตัวเอง ในพื้นที่สีเขียวที่เป็นส่วนหนึ่งของทุกวัน', alt: 'สวนและพื้นที่พักผ่อนในโครงการ ASAKAN Elysium Phahol 59' },
  { label: 'เชื่อมต่อ', en: 'Room to connect.', image: 'lounge', title: 'พื้นที่ของการพบเจอ', text: 'บทสนทนาดี ๆ ไอเดียใหม่ ๆ และช่วงเวลาที่ได้ใช้ร่วมกัน เริ่มต้นได้ในพื้นที่ส่วนกลางใกล้บ้าน', alt: 'พื้นที่ส่วนกลางและเลานจ์ ASAKAN Elysium Phahol 59' },
  { label: 'เป็นตัวเอง', en: 'Room to be you.', image: 'residence', title: 'ใช้ชีวิต ในแบบของคุณ', text: 'มุมโปรดเล็ก ๆ ที่เติมความหมายให้วันธรรมดา กับพื้นที่ที่คุณเลือกจัดวางชีวิตได้เอง', alt: 'ห้องตัวอย่าง ASAKAN Elysium Phahol 59' },
];

export default function Living() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return <section className="living" id="living" aria-labelledby="living-title">
    <div className="living-top"><span className="index-label">02 / THE ART OF LIVING</span><p>มากกว่าที่อยู่อาศัย คือพื้นที่ให้ชีวิตเติบโต</p></div>
    <div className="living-stage">
      {moments.map((m,i) => <div className={`living-frame ${active === i ? 'is-active' : ''}`} key={m.image} aria-hidden={active !== i}><Photo name={m.image} alt={active === i ? m.alt : ''} parallax={0.15}/></div>)}
      <div className="living-shade"/>
      <div className="living-copy" id="living-panel" role="tabpanel" aria-labelledby={`living-tab-${active}`} tabIndex={0}><span className="living-counter">0{active + 1} <span>/ 03</span></span><h2 id="living-title" key={active}>{moments[active].en.split(' ').slice(0,2).join(' ')}<br/><em>{moments[active].en.split(' ').slice(2).join(' ')}</em></h2><h3>{moments[active].title}</h3><p>{moments[active].text}</p><a href="/elysium59" className="text-link light">สัมผัสชีวิตที่ Elysium Phahol 59 <Arrow diagonal /></a></div>
      <span className="living-caption">ASAKAN ELYSIUM PHAHOL 59 · ภาพบรรยากาศจำลอง</span>
    </div>
    <div className="living-tabs" role="tablist" aria-label="ค้นพบพื้นที่แห่งชีวิต">{moments.map((m,i) => <button key={m.label} ref={el => { tabs.current[i] = el; }} role="tab" id={`living-tab-${i}`} aria-selected={i === active} aria-controls="living-panel" tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => { let next = active; if (e.key === 'ArrowRight') next = (active + 1) % 3; else if (e.key === 'ArrowLeft') next = (active + 2) % 3; else if (e.key === 'Home') next = 0; else if (e.key === 'End') next = 2; else return; e.preventDefault(); setActive(next); tabs.current[next]?.focus(); }}><small>0{i+1}</small><span>{m.label}</span><Arrow diagonal /></button>)}</div>
  </section>;
}
