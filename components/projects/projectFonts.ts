import { Kanit } from 'next/font/google';
import localFont from 'next/font/local';

// Restrict Prompt to Latin so Thai continues to use Kanit.
export const projectFont = localFont({
  src: [
    { path: './fonts/Prompt-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/Prompt-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/Prompt-SemiBold.ttf', weight: '600', style: 'normal' },
  ],
  declarations: [{ prop: 'unicode-range', value: 'U+0000-024F,U+2000-206F,U+20A0-20CF' }],
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['var(--font-project-thai)', 'sans-serif'],
});

export const projectThaiFont = Kanit({
  subsets: ['thai'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-project-thai',
});
