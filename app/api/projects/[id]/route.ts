import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';
import { getSession } from '@/lib/auth';

interface Project {
  id: string;
  [key: string]: unknown;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projects = readData<Project[]>('projects.json');
  const project = projects.find((p) => p.id === id || p['slug'] === id);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const projects = readData<Project[]>('projects.json');
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  projects[idx] = { ...projects[idx], ...body, id };
  writeData('projects.json', projects);
  return NextResponse.json(projects[idx]);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const projects = readData<Project[]>('projects.json');
  const filtered = projects.filter((p) => p.id !== id);
  writeData('projects.json', filtered);
  return NextResponse.json({ success: true });
}
