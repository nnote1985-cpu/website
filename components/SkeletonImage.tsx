'use client';
import { useCallback, useState, type ComponentProps, type SyntheticEvent } from 'react';
import Image from 'next/image';

type Tone = 'light' | 'dark';

const shimmerClass = (tone: Tone) => (tone === 'dark' ? 'img-shimmer-dark' : 'img-shimmer');

/**
 * next/image with `fill` that shows a shimmer in its box until the image has loaded.
 * The image is never hidden, so it paints over the shimmer as soon as it arrives (safe for priority/LCP images).
 */
export default function SkeletonImage({
  tone = 'light',
  onLoad,
  onError,
  ...props
}: ComponentProps<typeof Image> & { tone?: Tone }) {
  const [loaded, setLoaded] = useState(false);
  const done = (e: SyntheticEvent<HTMLImageElement>, cb?: (e: SyntheticEvent<HTMLImageElement>) => void) => {
    setLoaded(true);
    cb?.(e);
  };
  return (
    <>
      {!loaded && <span aria-hidden className={`pointer-events-none absolute inset-0 ${shimmerClass(tone)}`} />}
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from props */}
      <Image
        {...props}
        onLoad={(e) => done(e, onLoad)}
        onError={(e) => done(e, onError)}
      />
    </>
  );
}

/** Plain <img> (natural height, e.g. mobile promo artwork) with the same shimmer until it loads. */
export function SkeletonImg({
  tone = 'light',
  className = '',
  onError,
  ...props
}: ComponentProps<'img'> & { tone?: Tone }) {
  const [loaded, setLoaded] = useState(false);
  // Catches images that finished loading (e.g. from cache) before hydration attached onLoad.
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);
  return (
    <span className="relative block">
      {!loaded && <span aria-hidden className={`pointer-events-none absolute inset-0 ${shimmerClass(tone)}`} />}
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img
        {...props}
        ref={ref}
        onLoad={() => setLoaded(true)}
        onError={(e) => { setLoaded(true); onError?.(e); }}
        className={`relative ${className}`}
      />
    </span>
  );
}
