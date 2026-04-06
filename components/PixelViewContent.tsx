'use client';

import { useEffect } from 'react';

export default function PixelViewContent({ name, value }: { name: string; value: number }) {
  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', {
        content_name: name,
        content_type: 'product',
        value: value,
        currency: 'THB',
      });
    }
  }, [name, value]);

  return null;
}
