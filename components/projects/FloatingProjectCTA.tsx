'use client';

import { useState } from 'react';
import { Phone, X, Plus, MessageCircle } from 'lucide-react';

interface Props {
  phone?: string;
  lineUrl?: string;
  facebookUrl?: string;
}

export default function FloatingProjectCTA({ phone, lineUrl, facebookUrl }: Props) {
  const [expanded, setExpanded] = useState(false);

  const telHref = phone ? `tel:${phone.replace(/\D/g, '')}` : null;
  const lineHref = lineUrl
    ? lineUrl.startsWith('http')
      ? lineUrl
      : `https://line.me/ti/p/~${lineUrl.startsWith('@') ? lineUrl : '@' + lineUrl}`
    : null;

  return (
    <>
      {/* Backdrop */}
      {expanded && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Floating container — bottom-right corner */}
      <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-2">

        {/* Expanded menu */}
        {expanded && (
          <div className="flex flex-col gap-2 items-end animate-in slide-in-from-bottom-4 fade-in duration-200">
            {telHref && (
              <a
                href={telHref}
                className="flex items-center gap-2 bg-white border border-slate-200 text-[#1a2d6b] font-bold text-sm px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
              >
                <Phone size={15} className="text-[#e53935]" />
                TEL
              </a>
            )}
            {lineHref && (
              <a
                href={lineHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#00c300] text-white font-bold text-sm px-4 py-2.5 rounded-full shadow-lg hover:bg-[#00a300] transition-all whitespace-nowrap"
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.582 0 0 3.13 0 6.993c0 3.492 3.1 6.407 7.286 6.926l-.288 1.073c-.049.183.118.35.3.3l3.3-1.07C13.2 13.2 16 10.3 16 6.993 16 3.13 12.418 0 8 0z" />
                </svg>
                LINE
              </a>
            )}
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#1877f2] text-white font-bold text-sm px-4 py-2.5 rounded-full shadow-lg hover:bg-[#1565d8] transition-all whitespace-nowrap"
              >
                <MessageCircle size={15} />
                Facebook
              </a>
            )}
          </div>
        )}

        {/* Main toggle button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all relative ${
            expanded ? 'bg-slate-800' : 'bg-[#e53935]'
          }`}
          aria-label={expanded ? 'ปิด' : 'ติดต่อเรา'}
        >
          {expanded ? (
            <X size={22} className="text-white" />
          ) : (
            <Plus size={22} className="text-white" />
          )}
          {!expanded && (
            <span className="absolute w-14 h-14 rounded-full bg-[#e53935] opacity-40 animate-ping" />
          )}
        </button>
      </div>
    </>
  );
}
