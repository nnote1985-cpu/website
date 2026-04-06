import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { generateId } from '@/lib/utils';

interface Project {
  id: string;
  slug: string;
  name: string;
  [key: string]: unknown;
}

export async function GET() {
  try {
    const projects = readData<Project[]>('projects.json');
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const projects = readData<Project[]>('projects.json');
    const newProject: Project = {
      ...body,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    projects.push(newProject);
    writeData('projects.json', projects);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
