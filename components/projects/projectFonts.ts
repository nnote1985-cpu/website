import { Montserrat } from 'next/font/google';

// Montserrat supplies Latin and numerals; Thai falls through to Anuphan.
export const projectFont = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['var(--font-anuphan)', 'sans-serif'],
});
