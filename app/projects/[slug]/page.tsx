import type { Metadata } from 'next';
import { getProjectMetadata, renderProjectPage } from '@/lib/renderProjectPage';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return getProjectMetadata(slug);
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderProjectPage(slug);
}
