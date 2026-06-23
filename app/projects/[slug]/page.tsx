import type { Metadata } from 'next';
import { getProjectMetadata, renderProjectPage } from '@/lib/renderProjectPage';
import { supabaseAdmin } from '@/lib/supabase';
import projectsData from '@/data/projects.json';

export const revalidate = 3600;

export async function generateStaticParams() {
  const { data } = await supabaseAdmin.from('projects').select('slug');
  const dbSlugs = (data ?? []).map((p) => ({ slug: p.slug as string }));
  const localSlugs = (projectsData as { slug?: string }[])
    .filter((p) => p.slug && !dbSlugs.some((d) => d.slug === p.slug))
    .map((p) => ({ slug: p.slug as string }));
  return [...dbSlugs, ...localSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return getProjectMetadata(slug);
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderProjectPage(slug);
}
