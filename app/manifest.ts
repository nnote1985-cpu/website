import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ASAKAN',
    short_name: 'ASAKAN',
    description: 'ASAKAN - ผู้พัฒนาอสังหาริมทรัพย์ชั้นนำ',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#1a2d6b',
    icons: [
      { src: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
  };
}
