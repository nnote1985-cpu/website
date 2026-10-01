import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './FreedomSection.module.css';

export default function FreedomSection() {
  return (
    <section id="freedom" className={styles.section} aria-labelledby="freedom-title">
      <div className={styles.copy}>
        <h2 id="freedom-title">FREEDOM<br />OF LIFE</h2>
        <p className={styles.statement}>พื้นที่ของคุณ<br />ชีวิตในแบบที่คุณเลือก</p>
        <p className={styles.description}>
          อัสสกาญจน์เชื่อว่า บ้านที่ดีไม่ได้เป็นเพียงที่อยู่อาศัย
          แต่เป็นพื้นที่ให้ทุกคนได้ใช้ชีวิตในแบบของตัวเอง
        </p>
        <Link href="/projects" className={styles.link}>
          ค้นพบบ้านที่ใช่สำหรับคุณ <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
      </div>
      <div className={styles.visual}>
        <Image
          src="/images/emotional.webp"
          alt="ภาพจำลองอาคารและพื้นที่ส่วนกลางโครงการอัสสกาญจน์"
          fill
          sizes="(max-width: 767px) 100vw, 58vw"
          loading="lazy"
          className={styles.image}
        />
        <span className={styles.caption}>ภาพจำลองเพื่อการโฆษณา</span>
      </div>
    </section>
  );
}
