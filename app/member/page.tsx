import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './member.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import PageHero from '@/components/PageHero';
import { Gift, Shield, Percent, Users, Star, Headphones, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: 'สมาชิก ASAKAN Privilege | สิทธิพิเศษสำหรับเจ้าของห้อง' },
  alternates: { canonical: '/member' },
  description: 'ASAKAN Privilege Member Card สิทธิพิเศษสำหรับเจ้าของห้อง ประกันอุบัติเหตุ 500,000 บาท ส่วนลดซื้อห้องถัดไป 50,000 บาท รางวัลแนะนำเพื่อน',
};

const benefits = [
  { icon: Gift, title: 'ของขวัญวันเกิด', label: 'Birthday Gifts', highlight: 'ของขวัญพิเศษทุกปี', desc: 'รับของขวัญจาก ASAKAN ในช่วงวันเกิดของคุณ สำหรับสมาชิก Privilege', href: '/member/birthday', action: 'ดูวิธีรับของขวัญ' },
  { icon: Shield, title: 'ประกันอุบัติเหตุ', label: 'Accident Protection', highlight: '500,000', unit: 'บาท / ปี', qualifier: 'คุ้มครองสูงสุด', desc: 'ความคุ้มครองอุบัติเหตุสำหรับสมาชิกและครอบครัว', href: '/member/insurance', action: 'ดูความคุ้มครอง' },
  { icon: Percent, title: 'ส่วนลดซื้อห้องถัดไป', label: 'Next Home Discount', highlight: '50,000', unit: 'บาท', qualifier: 'ส่วนลดพิเศษ', desc: 'เมื่อซื้อห้องในโครงการ ASAKAN ครั้งต่อไป', href: '/member/discount', action: 'ดูเงื่อนไขส่วนลด' },
  { icon: Users, title: 'รางวัลแนะนำเพื่อน', label: 'Friends Get Friends', highlight: '100,000', unit: 'บาท', qualifier: 'รับรางวัลมากกว่า', desc: 'เมื่อแนะนำเพื่อนให้ซื้อห้องในโครงการ ASAKAN', href: '/member/fgf', action: 'ดูวิธีแนะนำเพื่อน' },
  { icon: Star, title: 'สิทธิพิเศษ VIP', label: 'Exclusive Experiences', highlight: 'กิจกรรมเฉพาะสมาชิก', desc: 'ทริปท่องเที่ยวและอีเวนต์เอ็กซ์คลูซีฟ ให้คุณได้ร่วมช่วงเวลาพิเศษกับ ASAKAN' },
  { icon: Headphones, title: 'บริการพิเศษ', label: 'Member Services', highlight: 'ดูแลหลังการขาย', desc: 'ช่องทางติดต่อ VIP พร้อมบริการดูแลสมาชิกและตอบสนองอย่างรวดเร็ว' },
];

export default function MemberPage() {
  return (
    <>
      <Header />
      <FloatingCTA />
      <main className="pt-20">
        <PageHero
          eyebrow="ASAKAN Privilege Member"
          title={
            <>
              More than Living,
              <br />
              <span className="text-[#f4511e]">A Lifestyle of Privilege</span>
            </>
          }
          subtitle="บัตรสมาชิก ASAKAN Privilege เพื่อสิทธิพิเศษเฉพาะคุณ ที่มากกว่าแค่การอยู่อาศัย"
        />

        <section className={styles.membership} aria-labelledby="membership-title">
          <Image src="/member-card.png" alt="บัตรสมาชิก ASAKAN Privilege" width={488} height={307} sizes="(max-width: 600px) 210px, 260px" />
          <div><p className={styles.eyebrow}>ASAKAN PRIVILEGE</p><h2 id="membership-title">บัตรเดียว…ให้ทุกวันพิเศษขึ้น</h2><p>สิทธิพิเศษสำหรับสมาชิก ตั้งแต่วันสำคัญของคุณ<br />ไปจนถึงการดูแลบ้านและครอบครัว</p></div>
        </section>

        <section className={styles.privileges} aria-labelledby="privileges-title">
          <div className={styles.layout}>
            <div className={styles.intro}>
              <div><p className={styles.eyebrow}>ASAKAN MEMBER PRIVILEGES</p>
              <h2 id="privileges-title">6 สิทธิพิเศษ<span>สำหรับสมาชิก</span></h2></div>
              <p className={styles.description}>ดูสิทธิ์ที่คุณได้รับ พร้อมรายละเอียดและวิธีใช้สิทธิ์<br />เฉพาะสมาชิก ASAKAN Privilege</p>
            </div>
            <div className={styles.benefits}>
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const content = <>
                  <Image src={`/images/member/benefit-${index + 1}.png`} alt="" width={300} height={300} sizes="160px" className={styles.art} />
                  <div className={styles.copy}>
                  <div className={styles.cardHeader}>
                    <span className={styles.icon}><Icon size={25} strokeWidth={1.6} aria-hidden="true" /></span>
                    {!benefit.href && <span className={styles.soon}>เร็ว ๆ นี้</span>}
                  </div>
                  <h3>{benefit.title}</h3>
                  <span className={styles.english}>{benefit.label}</span>
                  <div className={styles.highlight}>
                    {benefit.qualifier && <span className={styles.qualifier}>{benefit.qualifier}</span>}
                    <strong className={benefit.unit ? styles.amount : styles.perk}>{benefit.highlight}</strong>
                    {benefit.unit && <span className={styles.unit}>{benefit.unit}</span>}
                  </div>
                  <p className={styles.cardDescription}>{benefit.desc}</p>
                  <div className={styles.cardFooter}>
                    {benefit.href ? <span className={styles.detail}>{benefit.action}<ArrowRight size={18} aria-hidden="true" /></span> : <span className={styles.pending}>เตรียมเปิดให้บริการ</span>}
                  </div>
                  </div>
                </>;
                return benefit.href ? <Link href={benefit.href} key={benefit.title} className={`${styles.benefit} ${styles[`tone${index}`]}`}>{content}</Link> : <article key={benefit.title} className={`${styles.benefit} ${styles.upcoming} ${styles[`tone${index}`]}`}>{content}</article>;
              })}
            </div>
            <p className={styles.terms}>สิทธิประโยชน์เป็นไปตามเงื่อนไขของแต่ละรายการ โปรดดูรายละเอียดก่อนใช้สิทธิ์</p>
          </div>
        </section>

        <section className={styles.join} aria-labelledby="join-title">
          <div>
            <p className={styles.eyebrow}>BECOME A MEMBER</p>
            <h2 id="join-title">เริ่มต้นสิทธิพิเศษ ด้วยบ้านที่ใช่</h2>
            <p>ซื้อห้องกับเรา และรับสิทธิ์สมาชิก ASAKAN Privilege</p>
          </div>
          <div className={styles.actions}>
            <Link href="/projects" className={styles.primary}>ดูโครงการ <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link href="/contact" className={styles.secondary}>ติดต่อสอบถาม</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
