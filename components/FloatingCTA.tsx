'use client';

import { useState, useEffect } from 'react';
import { Phone, X, MessageCircle } from 'lucide-react';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    const onScroll = () => {
      if (window.scrollY > 300) setVisible(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-2">
      {/* Expandable buttons */}
      {expanded && (
        <div className="flex flex-col gap-2 animate-fade-in-up">
          <a
            href="tel:0825265566"
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
          >
            <Phone size={15} className="text-[#f4511e]" />
            082-526-5566
          </a>
          <a
            href="https://line.me/ti/p/~@asakan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#00c300] text-white font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:bg-[#00a300] transition-all whitespace-nowrap"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
            </svg>
            LINE: @asakan
          </a>
          <a
            href="https://www.facebook.com/Asakandevelopment"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all whitespace-nowrap"
          >
            <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </a>
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all ${
          expanded
            ? 'bg-gray-800 hover:bg-gray-700 rotate-0'
            : 'bg-[#f4511e] hover:bg-[#d43e0e]'
        }`}
        aria-label="ติดต่อเรา"
      >
        {expanded ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
        {/* Pulse ring when collapsed */}
        {!expanded && (
          <span className="absolute w-14 h-14 rounded-full bg-[#f4511e] opacity-40 animate-ping" />
        )}
      </button>
    </div>
  );
}
