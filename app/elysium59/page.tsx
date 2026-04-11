import { getProjectMetadata, renderProjectPage } from '@/lib/renderProjectPage';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return getProjectMetadata('elysium-phahol-59');
}

export default function Elysium59Page() {
  return renderProjectPage('elysium-phahol-59');
}
