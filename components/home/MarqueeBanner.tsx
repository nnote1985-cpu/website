const ITEMS = [
  '25 Years of Heritage',
  '2,500+ Units Delivered',
  'Prime Bangkok Locations',
  'Curated by ASAKAN',
  'Freedom of Life',
  'Your Happiness is Our Hope',
];

export default function MarqueeBanner() {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="bg-[#1a2d6b] overflow-hidden py-3.5 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
              {item}
            </span>
            <span className="text-[#c9a66b] text-[10px]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
