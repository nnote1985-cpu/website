import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { generateId } from '@/lib/utils';

interface Promotion {
  id: string;
  [key: string]: unknown;
}

export async function GET() {
  try {
    const promotions = readData<Promotion[]>('promotions.json');
    return NextResponse.json(promotions);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const promotions = readData<Promotion[]>('promotions.json');
  const newPromo: Promotion = { ...body, id: generateId(), createdAt: new Date().toISOString() };
  promotions.push(newPromo);
  writeData('promotions.json', promotions);
  return NextResponse.json(newPromo, { status: 201 });
}
