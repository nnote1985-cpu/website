import { TrainFront, ShoppingBag, GraduationCap, HeartPulse, ArrowUpRight } from 'lucide-react';
import { nearbyCategories, normalizeProjectSections, progressEmbed } from '@/lib/projectSections';
import './project-sections.css';
const icons = [TrainFront, ShoppingBag, GraduationCap, HeartPulse];
export function ProjectSurroundings({ value }: { value: unknown }) {
  const data = normalizeProjectSections(value);
  const places = data.places.filter(p => p.name);
  if (!places.length) return null;
  return <section id="neighborhood" className="pd-surroundings"><div>
    <header className="pd-section-heading"><div><span>CONNECTED LIVING</span><h2>{data.nearbyTitle || 'ใกล้ทุกจังหวะของชีวิต'}</h2></div>{data.nearbyDescription && <p>{data.nearbyDescription}</p>}</header>
    <div className="pd-nearby-grid">{nearbyCategories.map((category,index) => {
      const items = places.filter(p => p.category === category.id);
      if (!items.length) return null;
      const Icon = icons[index];
      return <article key={category.id} className="pd-nearby-card"><header><Icon size={24}/><h3>{category.label}</h3><span>{String(index+1).padStart(2,'0')}</span></header><dl>{items.map((place,i) => <div key={i}><dt>{place.name}</dt><dd>{place.distance || '—'}</dd></div>)}</dl></article>;
    })}</div>
  </div></section>;
}
export function ProjectProgress({ value }: { value: unknown }) {
  const data = normalizeProjectSections(value);
  if (!data.progressEnabled || !data.progressDate) return null;
  const embed = progressEmbed(data.progressVideo);
  const date = new Intl.DateTimeFormat('th-TH',{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${data.progressDate}-01T00:00:00Z`));
  return <section id="progress" className="pd-progress"><div>
    <header className="pd-section-heading"><div><span>TAKING SHAPE</span><h2>ความคืบหน้าโครงการ</h2></div><p>อัปเดตล่าสุด <time dateTime={data.progressDate}>{date}</time></p></header>
    <div className={`pd-progress-grid ${embed ? '' : 'pd-progress-no-video'}`}><div className="pd-progress-summary"><div className="pd-progress-total"><strong>{data.progressOverall.toLocaleString('en-US',{maximumFractionDigits:2})}<small>%</small></strong><span>ภาพรวมโครงการ</span></div><progress aria-label="ความคืบหน้าโดยรวม" max={100} value={data.progressOverall}/><div className="pd-progress-details">{data.progressItems.filter(p => p.name).map((item,i) => <div key={i}><div><span>{item.name}</span><b>{item.percent}%</b></div><progress aria-label={item.name} value={item.percent} max={100}/></div>)}</div></div>
    {embed && <div className="pd-progress-film"><div><iframe src={embed} title="วิดีโอความคืบหน้าโครงการ" loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen /></div><p><span>ติดตามการก่อสร้างล่าสุด</span><ArrowUpRight size={20}/></p></div>}
    </div>
  </div></section>;
}
