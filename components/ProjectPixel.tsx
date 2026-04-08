'use client';

import { useEffect } from 'react';

/**
 * ยิง FB Pixel เพิ่มเติมสำหรับโครงการเดี่ยว
 * - init pixel ของโครงการ (แยกจาก global ASAKAN pixel)
 * - ยิง ViewContent พร้อม project name + price
 * ทำงานควบคู่กับ Global Pixel ใน layout.tsx ได้เลย
 */
export default function ProjectPixel({
  pixelId,
  projectName,
  priceMin,
}: {
  pixelId: string;
  projectName: string;
  priceMin: number;
}) {
  useEffect(() => {
    if (!pixelId || typeof window.fbq !== 'function') return;

    // Init pixel ของโครงการ (ถ้า pixel นี้ยังไม่ถูก init)
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');

    // ยิง ViewContent สำหรับหน้าโครงการ
    window.fbq('trackSingle', pixelId, 'ViewContent', {
      content_name: projectName,
      content_type: 'product',
      value: priceMin,
      currency: 'THB',
    });
  }, [pixelId, projectName, priceMin]);

  return null;
}
