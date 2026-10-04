/** Shown while a project page is being fetched, in the shape of the page (navbar, hero + register panel, info). */
export default function ProjectPageSkeleton() {
  return (
    <div aria-busy="true" aria-label="กำลังโหลดโครงการ" className="min-h-screen bg-white">
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 md:h-20 md:px-6">
        <span className="img-shimmer h-4 w-40 rounded md:w-56" />
        <span className="img-shimmer hidden h-3 w-80 rounded xl:block" />
        <span className="img-shimmer h-9 w-24 rounded-full md:w-28" />
      </div>

      {/* Desktop: full-screen hero with the register panel on the right */}
      <div className="hidden h-[calc(100svh-80px)] xl:flex">
        <div className="img-shimmer-dark skeleton-mark relative flex-1" />
        <div className="flex w-[clamp(390px,24vw,430px)] flex-col gap-5 bg-[#14120f] px-8 py-10">
          <span className="img-shimmer-dark h-3 w-40 rounded" />
          <span className="img-shimmer-dark h-8 w-56 rounded" />
          <span className="img-shimmer-dark h-8 w-44 rounded" />
          {[0, 1, 2, 3].map((i) => <span key={i} className="img-shimmer-dark mt-4 h-10 w-full rounded" />)}
          <span className="img-shimmer-dark mt-6 h-14 w-full rounded-full" />
        </div>
      </div>

      {/* Mobile: promo artwork, then the form */}
      <div className="xl:hidden">
        <div className="img-shimmer skeleton-mark relative aspect-[1080/1600] w-full" />
        <div className="space-y-4 bg-[#14120f] px-6 py-8">
          <span className="img-shimmer-dark block h-7 w-48 rounded" />
          {[0, 1, 2].map((i) => <span key={i} className="img-shimmer-dark block h-10 w-full rounded" />)}
        </div>
      </div>

      <div className="mx-auto hidden max-w-6xl gap-4 px-4 py-16 xl:grid xl:grid-cols-3">
        {[0, 1, 2].map((i) => <span key={i} className="img-shimmer h-28 rounded-2xl" />)}
      </div>
    </div>
  );
}
