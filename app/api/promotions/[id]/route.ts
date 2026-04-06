import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';
import { getSession } from '@/lib/auth';

interface Promotion {
  id: string;
  [key: string]: unknown;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const items = readData<Promotion[]>('promotions.json');
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  items[idx] = { ...items[idx], ...body, id };
  writeData('promotions.json', items);
  return NextResponse.json(items[idx]);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const items = readData<Promotion[]>('promotions.json');
  writeData('promotions.json', items.filter((p) => p.id !== id));
  return NextResponse.json({ success: true });
}
