/**
 * ลายกราฟิกประจำแบรนด์ ASAKAN: แผ่นเหลี่ยมเอียงตามขาของตัว A ในโลโก้
 * เส้นบางขนานแนวเดียวกัน และเส้นส้มเน้นหนึ่งเส้น เป็น SVG ล้วน ไม่มีรูปและไม่มีแอนิเมชัน
 * วางเป็นพื้นหลังของบล็อกสีกรมท่า (parent ต้องเป็น relative + overflow-hidden) ลายชิดขวาและคงสัดส่วนทุกขนาดจอ
 */
export default function BrandPattern({ className = '' }: { className?: string }) {
  // ขาของ A เอียง 130 หน่วยต่อความสูง 400 (ประมาณ 72° แบบโลโก้)
  const hairlines = Array.from({ length: 13 }, (_, i) => 140 + i * 48);

  return (
    <svg
      aria-hidden
      viewBox="0 0 800 400"
      preserveAspectRatio="xMaxYMax meet"
      className={`pointer-events-none absolute right-0 top-0 h-full w-auto max-w-none translate-x-[22%] opacity-75 sm:translate-x-[10%] md:translate-x-0 md:opacity-100 ${className}`}
    >
      <defs>
        <linearGradient id="bp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5ec4f0" stopOpacity="0.45" />
          <stop offset="1" stopColor="#5ec4f0" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="bp-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f63d8" stopOpacity="0.7" />
          <stop offset="1" stopColor="#3f63d8" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="bp-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.1" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="bp-mask">
          <rect width="800" height="400" fill="url(#bp-fade)" />
        </mask>
      </defs>

      {/* เส้นบางขนานกับขาซ้ายของ A */}
      <g mask="url(#bp-mask)" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1">
        {hairlines.map((x) => (
          <line key={x} x1={x + 130} y1="0" x2={x} y2="400" />
        ))}
      </g>

      {/* ตัว A ขนาดใหญ่: ขาซ้ายฟ้าอ่อน ขาขวากรมท่าสว่าง */}
      <polygon points="470,-10 548,-10 410,410 332,410" fill="url(#bp-sky)" />
      <polygon points="548,-10 610,-10 760,410 680,410" fill="url(#bp-blue)" />
      {/* คานกลางของ A */}
      <line x1="400" y1="290" x2="800" y2="290" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />

      {/* โครงเส้นของ A อีกชั้น เหลื่อมจากแผ่นเล็กน้อย */}
      <polyline
        points="300,410 455,-60 650,530"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.14"
        strokeWidth="1"
      />

      {/* เส้นเน้นสีแบรนด์ */}
      <line x1="372" y1="410" x2="398" y2="331" stroke="#f4511e" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
