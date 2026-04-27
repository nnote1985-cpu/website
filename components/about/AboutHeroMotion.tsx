'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export default function AboutHeroMotion() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 text-white">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 scale-105"
        initial={{ scale: 1.08, x: 0 }}
        animate={reduceMotion ? { scale: 1.04, x: 0 } : { scale: [1.08, 1.14, 1.08], x: ['0%', '-1.5%', '0%'] }}
        transition={{ duration: 14, repeat: reduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/images/about.webp"
          alt="พื้นที่ส่วนกลางโครงการ ASAKAN"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1e4a]/92 via-[#1a2d6b]/78 to-[#2a3d8b]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1e4a]/55 via-transparent to-[#0f1e4a]/25" />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.2),transparent_34%)]"
        animate={reduceMotion ? undefined : { opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.18, 0.34, 0.18] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.p
          className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#e53935]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          เกี่ยวกับเรา
        </motion.p>
        <motion.h1
          className="mb-6 text-4xl font-bold md:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.08 }}
        >
          บริษัท อัสสกาญจน์ จำกัด
        </motion.h1>
        <motion.p
          className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-200"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.16 }}
        >
          ผู้พัฒนาอสังหาริมทรัพย์ที่มีความมุ่งมั่นพัฒนาโครงการคุณภาพ ในราคาเข้าถึงได้ เพื่อยกระดับคุณภาพชีวิตของชุมชน
        </motion.p>
      </div>
    </section>
  );
}
