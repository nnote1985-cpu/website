'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSlideshow({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* Slideshow overlay — invisible until JS mounts so server image shows first */}
      <div
        className={`absolute inset-0 z-[5] transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      >
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Asakan Residence View ${index + 1}`}
            fill
            sizes="100vw"
            loading={index === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[6000ms] ease-out ${
              index === currentIndex ? 'opacity-100 scale-110 z-10' : 'opacity-0 scale-100 z-0'
            }`}
          />
        ))}
      </div>

      {/* Pagination dots */}
      {images.length > 1 && (
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-20 z-30 flex items-center gap-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
                idx === currentIndex ? 'w-10 bg-[#e53935]' : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
