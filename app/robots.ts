import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Bot ทั่วไป — ให้เข้าได้ทุกหน้ายกเว้น admin และ api
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        // ป้องกัน AI training bots
        userAgent: ['GPTBot', 'CCBot', 'anthropic-ai', 'Claude-Web', 'Google-Extended'],
        disallow: '/',
      },
    ],
    sitemap: 'https://asakan.co.th/sitemap.xml',
    host: 'https://asakan.co.th',
  };
}
