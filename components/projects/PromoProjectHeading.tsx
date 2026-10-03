/** One visible heading shared by desktop and mobile promotional layouts. */
export default function PromoProjectHeading({ name }: { name: string }) {
  return <div className="border-b border-stone-200 bg-[#faf8f5] px-6 py-5 md:px-10 lg:px-14">
    <h1 className="text-xl font-semibold leading-snug tracking-tight text-[#1a2d6b] md:text-2xl">{name}</h1>
    <p className="mt-1 text-xs text-slate-600">โครงการคอนโดมิเนียมจาก ASAKAN</p>
  </div>;
}
