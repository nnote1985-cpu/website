import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './ServicesSection.module.css';

const services = [
  { title: 'ซื้อคอนโดมิเนียม', description: 'โครงการคุณภาพในทำเลศักยภาพ ราคาเริ่มต้น 1.39 ล้านบาท พร้อมส่วนกลางครบครัน', href: '/projects', action: 'ดูโครงการ' },
  { title: 'ASAKAN AssetCare+', description: 'บริการบริหารการปล่อยเช่าแบบครบวงจร ให้คุณมีรายได้ Passive Income โดยไม่ต้องกังวล', href: '/assetcare', action: 'เรียนรู้เพิ่มเติม' },
  { title: 'สมาชิก ASAKAN', description: 'สิทธิพิเศษสำหรับเจ้าของห้อง ประกันอุบัติเหตุ ส่วนลดซื้อห้องถัดไป และรางวัลแนะนำเพื่อน', href: '/member', action: 'สมัครสมาชิก' },
];

export default function ServicesSection() {
  return (
    <section className={styles.section} aria-labelledby="services-title">
      <div className={styles.container}>
      <header className={styles.heading}>
        <div>
          <p className={styles.label}>Service &amp; Care</p>
          <h2 id="services-title">ครบจบในที่เดียว</h2>
        </div>
        <p className={styles.intro}>จากวันเลือกบ้าน ถึงทุกวันของการอยู่อาศัย</p>
      </header>
      <div className={styles.layout}>
        <figure className={styles.visual}>
          <div className={styles.imageFrame}>
            <Image
              src="/hero/facilities16.webp"
              alt="ภาพจำลองพื้นที่พักผ่อนส่วนกลาง Elysium Phahol 59"
              fill
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1280px) 40vw, 490px"
              className={styles.image}
            />
          </div>
          <figcaption className={styles.caption}>
            <span>Elysium Phahol 59</span>
            <span>ภาพจำลองเพื่อการโฆษณา</span>
          </figcaption>
        </figure>
        <div className={styles.content}>
          <div className={styles.services}>
            {services.map(service => (
              <Link key={service.href} href={service.href} className={styles.service}>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className={styles.action}>{service.action}</span>
                </div>
                <ArrowUpRight className={styles.arrow} size={22} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
