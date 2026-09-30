import Header from '@/components/Header';
import HeroExperience from '@/components/HeroExperience';
import Journey from '@/components/Journey';
import Motion from '@/components/Motion';
import StoryThread from '@/components/StoryThread';
import PointerTrail from '@/components/PointerTrail';
import Photo from '@/components/Photo';
import Projects from '@/components/Projects';
import Living from '@/components/Living';
import Finance from '@/components/Finance';
import { Arrow } from '@/components/Icon';
import { contact } from '@/lib/content';

const faqs = [
  { q: 'โครงการของ ASAKAN อยู่ที่ไหนบ้าง?', a: 'โครงการที่แนะนำอยู่ในทำเลพหลโยธิน บางชัน และรามคำแหง คุณสามารถเลือกทำเลในส่วนโครงการของเรา เพื่อดูรายละเอียดของแต่ละโครงการได้' },
  { q: 'สามารถนัดหมายชมห้องตัวอย่างได้อย่างไร?', a: `ติดต่อทีมงานที่ ${contact.phone} หรือ LINE ${contact.line} เพื่อเลือกโครงการและนัดหมายวันเวลาที่สะดวก` },
  { q: 'มีบริการสำหรับผู้ซื้อเพื่อลงทุนหรือไม่?', a: 'ASAKAN AssetCare+ มีบริการดูแลการปล่อยเช่า สอบถามรายละเอียด ขอบเขตบริการ และเงื่อนไขสำหรับแต่ละโครงการได้ที่หน้าบริการ AssetCare+' },
  { q: 'ราคาบนเว็บไซต์รวมค่าใช้จ่ายทั้งหมดหรือยัง?', a: 'ราคาที่แสดงเป็นราคาเริ่มต้นของแต่ละโครงการ เงื่อนไขขึ้นอยู่กับห้องและโปรโมชั่น กรุณาสอบถามรายละเอียดราคา ค่าใช้จ่ายวันโอน และข้อเสนอปัจจุบันกับทีมงานก่อนตัดสินใจ' },
];

export default function HomePage() {
  return <>
    <Motion/><PointerTrail/><Header/>
    <main id="main">
      <Journey/>
      <HeroExperience/>

      <section className="intro section-pad" id="philosophy" aria-labelledby="intro-title">
        <StoryThread/>
        <div className="intro-label" data-reveal><span className="index-label">THE ASAKAN PHILOSOPHY</span><span className="asterisk" aria-hidden="true">✳</span></div>
        <div className="intro-main" data-reveal><h2 id="intro-title"><span className="philosophy-line">A home is more</span><span className="philosophy-line">than a place.</span><em className="philosophy-line">It’s a possibility.</em></h2><div className="intro-bottom"><p>บ้านที่ดี เปิดพื้นที่ให้ชีวิตได้เป็นไปได้มากกว่า<br/>ที่อัสสกาญจน์ เราใส่ใจตั้งแต่ทำเล การออกแบบ<br className="desktop-break"/> ไปจนถึงช่วงเวลาเล็ก ๆ ในทุกวันของคุณ</p><a href="/about" className="round-cta" aria-label="เรื่องราวของอัสสกาญจน์"><Arrow diagonal/><span>OUR STORY</span></a></div></div>
        <div className="intro-detail"><Photo name="courtyard" alt="สวนร่มรื่นในโครงการ ASAKAN Elysium Phahol 59" sizes="(max-width: 767px) 50vw, 22vw"/><span>A LITTLE CLOSER TO NATURE.</span></div>
      </section>

      <Projects/>
      <Living/>

      <section className="craft section-pad" aria-labelledby="craft-title">
        <div className="craft-copy" data-reveal><span className="index-label">THOUGHTFULLY BUILT</span><h2 id="craft-title">Every detail.<br/><em>A better everyday.</em></h2><p className="craft-lead">ทุกเส้นสาย มีชีวิตคุณอยู่ในนั้น</p><p>พื้นที่ที่ใช้ได้จริง ทำเลที่เชื่อมต่อชีวิต และความใส่ใจที่อยู่กับคุณนานกว่าวันรับกุญแจ คือสิ่งที่เราให้ความสำคัญในทุกโครงการ</p><a href="/about" className="text-link">รู้จักแนวคิดของเรา <Arrow diagonal/></a></div>
        <div className="craft-photography"><div className="craft-portrait"><Photo name="courtyard" alt="พื้นที่สีเขียวและมุมพักผ่อนของ ASAKAN Elysium Phahol 59" sizes="(max-width:767px) 85vw, 40vw" parallax={0.15}/></div><div className="craft-inset"><Photo name="residence" alt="รายละเอียดห้องตัวอย่าง ASAKAN" sizes="(max-width:767px) 40vw, 20vw" parallax={-0.08}/></div><span>SPACE. NATURE. YOU.</span></div>
        <div className="craft-values"><div><span>01</span><h3>ทำเลที่เชื่อมชีวิต</h3><p>ใกล้เมือง ใกล้การเดินทาง<br/>ใกล้สิ่งที่สำคัญสำหรับคุณ</p></div><div><span>02</span><h3>พื้นที่ที่คิดมาแล้ว</h3><p>ออกแบบให้ทุกตารางเมตร<br/>เป็นส่วนหนึ่งของชีวิตประจำวัน</p></div><div><span>03</span><h3>ดูแลกันในระยะยาว</h3><p>บริการและสิทธิพิเศษ<br/>สำหรับครอบครัวอัสสกาญจน์</p></div></div>
      </section>

      <section className="care section-pad" id="care" aria-labelledby="care-title"><div className="section-heading" data-reveal><div><span className="index-label">03 / BEYOND THE KEYS</span><h2 id="care-title">Good living.<br/><em>Great company.</em></h2></div><p className="heading-aside">ความสัมพันธ์ที่เริ่มต้นเมื่อคุณกลับถึงบ้าน<br/>ดูแลการอยู่อาศัยและการลงทุนไปด้วยกัน</p></div><div className="care-grid">
        <a className="care-card" href="/assetcare"><Photo name="residence" alt="ห้องพักโทนอบอุ่นของ ASAKAN" sizes="(max-width: 767px) 100vw, 50vw"/><div className="care-overlay"/><div className="care-card-content"><span>FOR YOUR INVESTMENT</span><h3>ASAKAN<br/><em>AssetCare+</em></h3><p>ให้การลงทุนของคุณ มีคนดูแล</p><span className="care-link">บริการบริหารการปล่อยเช่า <Arrow diagonal/></span></div></a>
        <a className="care-card member-card" href="/member"><div className="member-art" aria-hidden="true"><div className="membership"><span>ASAKAN</span><em>Belong to<br/>something more.</em><small>THE RESIDENT COLLECTION</small><b>MEMBER</b></div><div className="membership-shadow"/></div><div className="care-card-content"><span>FOR OUR COMMUNITY</span><h3>More than home.<br/><em>A sense of belonging.</em></h3><p>สิทธิพิเศษสำหรับครอบครัวอัสสกาญจน์</p><span className="care-link">ค้นพบ ASAKAN Member <Arrow diagonal/></span></div></a>
      </div></section>


      <section className="journal section-pad" aria-labelledby="journal-title"><div className="journal-heading"><div><span className="index-label">THE LIVING JOURNAL</span><h2 id="journal-title">Stories for <em>better living.</em></h2></div><a className="text-link" href="/news">อ่านทุกเรื่องราว <Arrow diagonal/></a></div><div className="journal-grid"><a className="journal-story" href="/news/ซื้อคอนโด-vs-เช่าคอนโด-แบบไหนคุ้มกว่ากัน"><div className="journal-image"><Photo name="celine-living" alt="ภาพห้องตัวอย่างประกอบบทความเรื่องซื้อหรือเช่าคอนโด" sizes="(max-width: 700px) 100vw, 50vw"/></div><div><span className="index-label">PROPERTY NOTES</span><h3>ซื้อคอนโด หรือเช่าคอนโด<br/>แบบไหนใช่สำหรับชีวิตคุณ?</h3><span className="text-link">อ่านบทความ <Arrow diagonal/></span></div></a><a className="journal-story" href="/news/กระแสแรง-คนหาดใหญ่แห่จอง-คอนโดกรุงเทพฯ-ติด-bts"><div className="journal-image"><Photo name="phahol" alt="ภาพโครงการ Elysium Phahol 59 ประกอบข่าวกิจกรรมโครงการ" sizes="(max-width: 700px) 100vw, 50vw"/></div><div><span className="index-label">ASAKAN NEWS</span><h3>จากหาดใหญ่ สู่ทำเลติด BTS<br/>เรื่องราวของ Elysium Phahol 59</h3><span className="text-link">อ่านข่าวสาร <Arrow diagonal/></span></div></a></div></section>

      <Finance/>
      <section className="faq section-pad" aria-labelledby="faq-title"><div><span className="index-label">A FEW THINGS TO KNOW</span><h2 id="faq-title">เริ่มต้นด้วย<br/><em>ความเข้าใจ</em></h2><a href="/faq" className="text-link">คำถามทั้งหมด <Arrow diagonal/></a></div><div className="faq-list">{faqs.map(({q,a})=><details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>

      <section className="contact section-pad" id="contact" aria-labelledby="contact-title"><div className="contact-top"><span className="index-label">YOUR NEXT CHAPTER STARTS HERE</span><span>LET’S FIND YOUR PLACE.</span></div><div className="contact-main"><h2 id="contact-title">Make room<br/>for <em>your life.</em></h2><a href={contact.lineUrl} target="_blank" rel="noopener noreferrer" className="contact-circle" aria-label="นัดหมายเยี่ยมชมผ่าน LINE"><Arrow diagonal/><span>นัดหมาย<br/>เยี่ยมชม</span></a></div><div className="contact-bottom"><p>บอกเราเกี่ยวกับบ้านที่คุณมองหา<br/>เราพร้อมช่วยคุณค้นพบพื้นที่ที่ใช่</p><div><a href={`tel:${contact.tel}`} className="contact-phone">{contact.phone}</a><a href={contact.lineUrl} target="_blank" rel="noopener noreferrer">LINE {contact.line} <Arrow diagonal/></a></div></div></section>
    </main>
    <footer className="footer section-pad"><div className="footer-top"><a className="brand" href="#top" aria-label="ASAKAN กลับด้านบน"><img src="/media/logo.png" width="36" height="36" alt=""/><span>ASAKAN<small>SPACE FOR YOUR LIFE</small></span></a><p>{contact.address}<br/><a href={`mailto:${contact.email}`}>{contact.email}</a></p><nav aria-label="ลิงก์ท้ายเว็บไซต์"><a href="/about">เกี่ยวกับเรา</a><a href="/projects">โครงการ</a><a href="/promotion">โปรโมชั่น</a><a href="/contact">ติดต่อเรา</a></nav><a className="footer-social" href="https://www.facebook.com/Asakandevelopment" target="_blank" rel="noopener noreferrer">FACEBOOK <Arrow diagonal/></a></div><div className="footer-wordmark" aria-hidden="true">ASAKAN<span>®</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ASAKAN CO., LTD.</span><a href="/policy">นโยบายความเป็นส่วนตัว</a><a href="#top">BACK TO TOP ↑</a></div></footer>
    <a className="mobile-contact" href={contact.lineUrl} target="_blank" rel="noopener noreferrer">คุยกับเรา <Arrow diagonal/></a>
  </>;
}
