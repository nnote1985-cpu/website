'use client';

import { useEffect, useState } from 'react';

interface HeroVideoProps {
  src: string;
  poster: string;
}

/** Renders video only on desktop, preserving the mobile image slideshow and data. */
export default function HeroVideo({ src, poster }: HeroVideoProps) {
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePlayback = () => setCanPlayVideo(desktopQuery.matches && !reduceMotionQuery.matches);

    updatePlayback();
    desktopQuery.addEventListener('change', updatePlayback);
    reduceMotionQuery.addEventListener('change', updatePlayback);

    return () => {
      desktopQuery.removeEventListener('change', updatePlayback);
      reduceMotionQuery.removeEventListener('change', updatePlayback);
    };
  }, []);

  if (!canPlayVideo) return null;

  return (
    <video
      aria-hidden="true"
      tabIndex={-1}
      autoPlay
      muted
      playsInline
      preload="metadata"
      poster={poster}
      className="absolute inset-0 z-[5] h-full w-full object-cover object-center"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
