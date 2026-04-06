import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';
import { getSession } from '@/lib/auth';

interface NewsItem {
  id: string;
  slug: string;
  [key: string]: unknown;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = readData<NewsItem[]>('news.json');
  const item = news.find((n) => n.id === id || n.slug === id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const news = readData<NewsItem[]>('news.json');
  const idx = news.findIndex((n) => n.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  news[idx] = { ...news[idx], ...body, id };
  writeData('news.json', news);
  return NextResponse.json(news[idx]);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const news = readData<NewsItem[]>('news.json');
  writeData('news.json', news.filter((n) => n.id !== id));
  return NextResponse.json({ success: true });
}
