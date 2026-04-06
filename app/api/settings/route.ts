import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  const settings = readData('settings.json');
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const current = readData('settings.json') as Record<string, unknown>;
  const updated = { ...current, ...body };
  writeData('settings.json', updated);
  return NextResponse.json(updated);
}
