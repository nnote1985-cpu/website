import { getProjectMetadata, renderProjectPage } from '@/lib/renderProjectPage';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getProjectMetadata('the-celine-bang-chan');
}

export default function TheCelinePage() {
  return renderProjectPage('the-celine-bang-chan');
}
