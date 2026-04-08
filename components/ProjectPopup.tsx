'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  image: string;
  url?: string;
  projectSlug: string;
}

export default function ProjectPopup({ image, url, projectSlug }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, [projectSlug]);

  function close() {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={close}
    >
      <div
        className="relative w-[92vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] max-h-[90vh] animate-in zoom-in-90 fade-in duration-300"
        style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 3px rgba(255,255,255,0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute -top-3 -right-3 z-10 bg-white text-gray-700 p-1.5 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" onClick={close}>
            <img src={image} alt="promotion" className="w-full shadow-2xl cursor-pointer" />
          </a>
        ) : (
          <img src={image} alt="promotion" className="w-full shadow-2xl" />
        )}
      </div>
    </div>
  );
}
