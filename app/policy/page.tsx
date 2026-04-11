import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัว | ASAKAN',
  description: 'นโยบายความเป็นส่วนตัว บริษัท อัสสกาญจน์ จำกัด – การเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลตาม PDPA',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-10 border-b border-slate-200 pb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#e53935] mb-2">Legal</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#1a2d6b] leading-tight mb-3">
            นโยบายความเป็นส่วนตัว
          </h1>
          <p className="text-slate-500 text-sm">
            บริษัท อัสสกาญจน์ จำกัด · ประกาศใช้เมื่อวันที่ 11 เมษายน 2569
          </p>
        </div>

        {/* Intro */}
        <p className="text-slate-700 leading-relaxed mb-10">
          บริษัท อัสสกาญจน์ จำกัด และบริษัทในเครือ ("บริษัท") ตระหนักถึงความสำคัญของการคุ้มครองข้อมูลส่วนบุคคลของคุณ
          เราจึงได้จัดทำนโยบายความเป็นส่วนตัวฉบับนี้ขึ้น เพื่อชี้แจงรายละเอียดเกี่ยวกับการเก็บรวบรวม ใช้
          และเปิดเผยข้อมูลส่วนบุคคล ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
        </p>

        <div className="space-y-10 text-slate-700 text-[15px] leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-lg font-black text-[#1a2d6b] mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#1a2d6b] text-white text-xs font-black flex items-center justify-center flex-shrink-0">1</span>
              ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม
            </h2>
            <p className="mb-3">เราเก็บรวบรวมข้อมูลที่คุณให้ไว้ผ่านการลงทะเบียนบนเว็บไซต์ หรือช่องทางออนไลน์อื่นๆ ดังนี้:</p>
            <ul className="space-y-2 pl-4">
              {[
                ['ข้อมูลส่วนตัว', 'ชื่อ-นามสกุล'],
                ['ข้อมูลการติดต่อ', 'เบอร์โทรศัพท์, อีเมล, ID Line'],
                ['ข้อมูลความสนใจ', 'โครงการที่คุณสนใจ, งบประมาณ, วันที่นัดหมายเข้าชมโครงการ'],
                ['ข้อมูลสิทธิพิเศษ', 'วันเกิด (เพื่อใช้ในการมอบของขวัญหรือส่วนลดพิเศษ)'],
                ['ข้อมูลทางเทคนิค', 'ข้อมูลที่เก็บผ่าน Cookies, IP Address และพฤติกรรมการใช้งานผ่าน Facebook Pixel / Conversion API'],
              ].map(([label, desc]) => (
                <li key={label} className="flex gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#e53935] flex-shrink-0" />
                  <span><strong className="text-slate-800">{label}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-lg font-black text-[#1a2d6b] mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#1a2d6b] text-white text-xs font-black flex items-center justify-center flex-shrink-0">2</span>
              วัตถุประสงค์ในการประมวลผลข้อมูล
            </h2>
            <p className="mb-3">บริษัทจะใช้ข้อมูลของคุณเพื่อวัตถุประสงค์ดังต่อไปนี้:</p>
            <ul className="space-y-2 pl-4">
              {[
                ['เพื่อการให้บริการและติดต่อกลับ', 'ให้เจ้าหน้าที่ฝ่ายขายติดต่อเพื่อนำเสนอข้อมูลโครงการ นัดหมายเข้าชม หรือตอบข้อซักถามที่คุณลงทะเบียนไว้'],
                ['เพื่อการตลาดและการแจ้งเตือน', 'ส่งข่าวสาร โปรโมชันพิเศษ และกิจกรรมทางการตลาดผ่าน SMS, อีเมล หรือโซเชียลมีเดีย'],
                ['เพื่อสิทธิประโยชน์สมาชิก', 'ดำเนินการส่งคำอวยพรหรือมอบสิทธิพิเศษในวันเกิดผ่านระบบอัตโนมัติ (Automated Birthday Greeting)'],
                ['เพื่อวิเคราะห์และปรับปรุง', 'นำข้อมูลพฤติกรรมไปวิเคราะห์เพื่อพัฒนาเว็บไซต์ และปรับปรุงโฆษณาให้ตรงกับความต้องการของลูกค้ามากขึ้น'],
              ].map(([label, desc]) => (
                <li key={label} className="flex gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#e53935] flex-shrink-0" />
                  <span><strong className="text-slate-800">{label}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-lg font-black text-[#1a2d6b] mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#1a2d6b] text-white text-xs font-black flex items-center justify-center flex-shrink-0">3</span>
              การส่งต่อข้อมูลแก่บุคคลที่สาม
            </h2>
            <p className="mb-3">
              เราจะรักษาข้อมูลของคุณเป็นความลับและไม่จำหน่ายข้อมูลให้บุคคลภายนอก เว้นแต่เป็นการส่งต่อให้ผู้ให้บริการที่จำเป็นต่อการดำเนินงาน ได้แก่:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                'ระบบฐานข้อมูลและโครงสร้างพื้นฐานไอที (เช่น Supabase, Cloudflare)',
                'แพลตฟอร์มการวิเคราะห์และการตลาด (เช่น Facebook, Google)',
                'ระบบแจ้งเตือนและบริหารจัดการงานขาย (เช่น Telegram, LINE)',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#e53935] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-lg font-black text-[#1a2d6b] mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#1a2d6b] text-white text-xs font-black flex items-center justify-center flex-shrink-0">4</span>
              ระยะเวลาการจัดเก็บข้อมูล
            </h2>
            <p>
              บริษัทจะเก็บรักษาข้อมูลส่วนบุคคลของคุณไว้เป็นเวลา <strong className="text-slate-800">5 ปี</strong> นับจากการติดต่อครั้งล่าสุด
              หรือจนกว่าคุณจะแจ้งขอยกเลิกความยินยอม หรือขอลบข้อมูลออกจากระบบ
              เพื่อวัตถุประสงค์ทางการตลาดและการให้บริการลูกค้าอย่างต่อเนื่อง
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-lg font-black text-[#1a2d6b] mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#1a2d6b] text-white text-xs font-black flex items-center justify-center flex-shrink-0">5</span>
              สิทธิของเจ้าของข้อมูลส่วนบุคคล
            </h2>
            <p className="mb-3">คุณมีสิทธิตามกฎหมายในการจัดการข้อมูลของคุณ ดังนี้:</p>
            <ul className="space-y-2 pl-4">
              {[
                'สิทธิขอเข้าถึงและรับสำเนาข้อมูลส่วนบุคคลที่เกี่ยวกับคุณ',
                'สิทธิขอแก้ไขข้อมูลที่ไม่ถูกต้อง หรือไม่ครบถ้วนให้เป็นปัจจุบัน',
                'สิทธิขอให้ลบ หรือทำลายข้อมูล (Right to be Forgotten)',
                'สิทธิในการถอนความยินยอมในการเก็บรวบรวมข้อมูลได้ตลอดเวลา',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#e53935] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-lg font-black text-[#1a2d6b] mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#1a2d6b] text-white text-xs font-black flex items-center justify-center flex-shrink-0">6</span>
              การรักษาความปลอดภัยของข้อมูล
            </h2>
            <p>
              เราได้นำมาตรการทางเทคนิคที่เหมาะสมมาใช้เพื่อป้องกันข้อมูลของคุณจากการเข้าถึงโดยไม่ได้รับอนุญาต
              การสูญหาย หรือการถูกนำไปใช้ในทางที่ผิด โดยมีการจำกัดสิทธิ์การเข้าถึงข้อมูลเฉพาะเจ้าหน้าที่ที่เกี่ยวข้องเท่านั้น
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-[#f0f4ff] rounded-2xl p-6">
            <h2 className="text-lg font-black text-[#1a2d6b] mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#1a2d6b] text-white text-xs font-black flex items-center justify-center flex-shrink-0">7</span>
              ข้อมูลการติดต่อ
            </h2>
            <p className="mb-4">หากคุณมีคำถามเกี่ยวกับนโยบายนี้ หรือต้องการใช้สิทธิตามกฎหมาย PDPA โปรดติดต่อเราที่:</p>
            <div className="space-y-1.5 text-sm">
              <p><strong className="text-slate-800">บริษัท อัสสกาญจน์ จำกัด</strong></p>
              <p>ที่อยู่: 191 ถนนรามคำแหง แขวงสะพานสูง เขตสะพานสูง กรุงเทพมหานคร</p>
              <p>โทรศัพท์: <a href="tel:020599655" className="text-[#1a2d6b] font-semibold hover:underline">02-059-9655</a></p>
              <p>เว็บไซต์: <a href="https://www.asakan.co.th" className="text-[#1a2d6b] font-semibold hover:underline">www.asakan.co.th</a></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
