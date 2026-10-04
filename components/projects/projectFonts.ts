import { Kanit, Montserrat } from 'next/font/google';

// Montserrat supplies Latin and numerals; Thai falls through to Kanit.
export const projectFont = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
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
