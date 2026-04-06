import { NextResponse } from 'next/server';
import { readData } from '@/lib/db';
import { getSession } from '@/lib/auth';

interface NewsItem {
  id: string;
  [key: string]: unknown;
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const news = readData<NewsItem[]>('news.json');
  return NextResponse.json(news);
}
