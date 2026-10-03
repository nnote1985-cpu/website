'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import initialSlides from '@/public/hero/slides.json';

type Slide = typeof initialSlides[number];
const effects = ['fade', 'left', 'right', 'up', 'split', 'down'];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h15m-6-6 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroExperience() {
  const root = useRef<HTMLElement>(null);
  const elapsed = useRef(0);
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [current, setCurrent] = useState({ index: 0, previous: -1 });
  const [ready, setReady] = useState<string[]>([]);
  const [pending, setPending] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [away, setAway] = useState(false);
  const [copyHidden, setCopyHidden] = useState(false);
  const [hidden, setHidden] = useState(false);

  const select = (index: number) => {
    setPending(index);
  };

  // Keep the current frame visible while a manually selected image downloads.
  useEffect(() => {
    if (pending === null || !slides[pending] || !ready.includes(slides[pending].src)) return;
    elapsed.current = 0;
    root.current?.style.setProperty('--slide-progress', '0');
    setCurrent(old => old.index === pending ? old : { index: pending, previous: old.index });
    setPending(null);
  }, [pending, ready, slides]);

  // Refresh slides from JSON at runtime (allows CMS updates without redeploy)
  useEffect(() => {
    const abort = new AbortController();
    fetch('/hero/slides.json', { cache: 'no-store', signal: abort.signal })
      .then(r => r.json())
      .then(data => {
        if (
          Array.isArray(data) && data.length > 0 &&
          data.every(s =>
            ['src', 'alt', 'title', 'label', 'href', 'focus', 'effect'].every(k => typeof s[k] === 'string') &&
            s.src.startsWith('/hero/') && s.href.startsWith('/') && !s.href.startsWith('//') &&
            effects.includes(s.effect)
          )
        ) setSlides(data);
      })
      .catch(() => {});
    return () => abort.abort();
  }, []);

  // Reduced motion + page visibility
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    const visibility = () => setHidden(document.hidden);
    change(); visibility();
    media.addEventListener('change', change);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      media.removeEventListener('change', change);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  // Scroll-driven parallax animation
  useEffect(() => {
    let raf = 0, lastTime = performance.now();
    let imageProgress: number | null = null;
    let sceneProgress: number | null = null;

    const update = (now = performance.now()) => {
      raf = 0;
      const el = root.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = rect.top;
      // On phones innerHeight changes whenever the address bar shows or hides,
      // which made the parallax jump mid-scroll. The sticky stage is 100svh there,
      // so its height stays put.
      const vh = innerWidth < 768
        ? el.querySelector<HTMLElement>('.gallery-sticky')?.offsetHeight || innerHeight
        : innerHeight;

      // Always toggle has-scrolled so header can react to scroll position
      document.documentElement.classList.toggle('has-scrolled', scrollY > 35);

      const travel = Math.max(1, el.offsetHeight - vh * 1.15);
      const target = reduced ? 0 : Math.max(0, Math.min(1, -top / travel));
      const dt = Math.min(64, Math.max(1, now - lastTime));
      lastTime = now;

      const snap = reduced || document.hidden || rect.bottom < 0 || top > vh;
      if (sceneProgress === null || snap) sceneProgress = target;
      else sceneProgress += (target - sceneProgress) * (1 - Math.exp(-dt / 520));
      if (imageProgress === null || snap) imageProgress = target;
      else imageProgress += (target - imageProgress) * (1 - Math.exp(-dt / 850));

      if (Math.abs(target - sceneProgress) < .001) sceneProgress = target;
      if (Math.abs(target - imageProgress) < .001) imageProgress = target;

      const p = sceneProgress;
      el.style.setProperty('--frame-p', String(p));
      el.style.setProperty('--frame-inset', `${p * (innerWidth < 768 ? 5 : 9)}%`);
      el.style.setProperty('--frame-top', `${p * 5}%`);
      el.style.setProperty('--frame-bottom', `${p * (innerWidth < 768 ? 42 : 30)}%`);
      el.style.setProperty('--image-parallax', `${imageProgress * vh * .15}px`);
      el.style.setProperty('--parallax-scale', String(1.09 - imageProgress * .09));
      el.style.setProperty('--hero-copy-opacity', `${1 - Math.min(1, p * 1.5)}`);
      el.style.setProperty('--caption-y', `${-p * 90}px`);
      el.style.setProperty('--wordmark-scale', String(1 - p * .22));
      el.style.setProperty('--wordmark-x', `${-p * (innerWidth < 768 ? 24 : Math.min(100, innerWidth * .052))}px`);
      el.style.setProperty('--wordmark-bottom', `${28 - p * 8}px`);
      const tone = Math.round(255 * (1 - p));
      el.style.setProperty('--wordmark-color', `rgb(${tone}, ${tone}, ${tone})`);
      el.style.setProperty('--shade-opacity', String(1 - p * .7));
      const detail = Math.max(0, Math.min(1, (p - .18) / .62));
      el.style.setProperty('--detail-opacity', String(detail));
      el.style.setProperty('--detail-y', `${(1 - detail) * 45}px`);
      el.style.setProperty('--detail-clip', `${(1 - detail) * 100}%`);

      setAway(top < -40);
      setCopyHidden(p >= 2 / 3);

      if (imageProgress !== target || sceneProgress !== target) raf = requestAnimationFrame(update);
    };

    const schedule = () => {
      if (!raf) { lastTime = performance.now(); raf = requestAnimationFrame(update); }
    };

    update();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
    };
  }, [reduced]);

  // Slideshow auto-advance
  const stopped = paused || reduced || away || hidden || pending !== null;
  useEffect(() => {
    if (stopped) return;
    let raf = 0, last = performance.now();
    const tick = (now: number) => {
      const img = root.current?.querySelector<HTMLImageElement>('.gallery-slide.is-current img');
      if (img?.complete && img.naturalWidth) elapsed.current += Math.min(now - last, 100);
      last = now;
      root.current?.style.setProperty('--slide-progress', String(Math.min(1, elapsed.current / 6000)));
      // Wait until the next image is decoded; switching to one that is still
      // loading made the transition run over an empty slide and then pop in.
      if (elapsed.current >= 6000 && !ready.includes(slides[(current.index + 1) % slides.length].src)) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (elapsed.current >= 6000) {
        elapsed.current = 0;
        root.current?.style.setProperty('--slide-progress', '0');
        setCurrent(old => ({ index: (old.index + 1) % slides.length, previous: old.index }));
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stopped, current.index, slides, ready]);

  const slide = slides[current.index] || slides[0];

  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <section
      ref={root}
      id="top"
      className="gallery-hero"
      aria-label="ภาพโครงการ ASAKAN"
      aria-roledescription="carousel"
      data-paused={stopped}
      data-user-paused={paused || reduced}
      onFocusCapture={e => {
        if (!(e.target as HTMLElement).closest('.gallery-play')) setPaused(true);
      }}
    >
      <div className="gallery-sticky">
        <div className="gallery-frame">
          <div className="gallery-parallax">
            {slides.map((s, i) => (
              <div
                key={s.src + i}
                className={`gallery-slide effect-${s.effect} ${i === current.index ? 'is-current' : i === current.previous ? 'is-previous' : ''}`}
                aria-hidden={i !== current.index}
                style={{ '--focus': s.focus, '--fx': (parseFloat(s.focus) || 50) / 100 } as CSSProperties}
              >
                {(i === current.index || i === current.previous || i === pending ||
                  (!stopped && ready.includes(slides[current.index].src) && i === (current.index + 1) % slides.length)) && (
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={3840}
                    height={2160}
                    sizes="(max-width: 767px) 292svh, max(100vw, 271vh)"
                    quality={90}
                    preload={i === 0}
                    loading={i === 0 ? undefined : 'eager'}
                    onLoad={async event => {
                      const img = event.currentTarget;
                      try { await img.decode(); } catch { /* onLoad already confirms a usable image. */ }
                      if (img.naturalWidth) setReady(old => old.includes(s.src) ? old : [...old, s.src]);
                    }}
                    onError={() => { setPaused(true); setPending(null); }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="gallery-shade" />
          <div className="gallery-topline">
            <h1 className="gallery-site-title">ASAKAN คอนโดมิเนียมในกรุงเทพฯ</h1>
            <span>ASAKAN · BANGKOK</span>
          </div>
          <div
            className="gallery-caption"
            inert={copyHidden ? true : undefined}
            aria-hidden={copyHidden}
            aria-live={paused ? 'polite' : 'off'}
          >
            <div className="gallery-center-track" aria-hidden="true"><i /></div>
            <div className="gallery-caption-window">
              <div className="gallery-caption-content" key={current.index}>
                <span className="gallery-count">0{current.index + 1} / 0{slides.length}</span>
                <div>
                  <span>{slide.label}</span>
                  <p>{slide.title}</p>
                </div>
              </div>
            </div>
            <a href={slide.href}>ดูโครงการ <Arrow diagonal /></a>
            <div className="gallery-inline-controls">
              <label className="sr-only" htmlFor="hero-slide-picker">เลือกภาพสไลด์</label>
              <select
                id="hero-slide-picker"
                value={current.index}
                onChange={e => select(Number(e.target.value))}
              >
                {slides.map((s, i) => (
                  <option value={i} key={s.src}>{i + 1} / {slides.length}</option>
                ))}
              </select>
              <button
                className="gallery-play"
                disabled={reduced}
                aria-label={
                  reduced
                    ? 'ปิดการเล่นอัตโนมัติตามการตั้งค่าลดการเคลื่อนไหว'
                    : paused ? 'เล่นสไลด์' : 'หยุดสไลด์'
                }
                onClick={() => setPaused(v => !v)}
              >
                {paused || reduced ? '▶' : 'Ⅱ'}
              </button>
            </div>
          </div>
          <span className="gallery-disclaimer">ภาพจำลองเพื่อการโฆษณา</span>
        </div>

        <div className="gallery-heading">
          <div className="gallery-wordmark">BEYOND</div>
          <p className="gallery-expectation">Expectation</p>
        </div>

        <div className="gallery-footnote">
          <h2>เพราะชีวิตที่ดี<br />เริ่มจากพื้นที่ที่เข้าใจคุณ</h2>
          <a
            href={slide.href}
            tabIndex={copyHidden ? 0 : -1}
            aria-hidden={!copyHidden}
          >
            <span>Elysium Phahol 59</span>
            <span className="gallery-detail-arrow"><Arrow diagonal /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
