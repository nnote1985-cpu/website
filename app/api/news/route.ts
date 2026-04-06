import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { generateId, slugify } from '@/lib/utils';

interface NewsItem {
  id: string;
  slug: string;
  [key: string]: unknown;
}

export async function GET() {
  try {
    const news = readData<NewsItem[]>('news.json');
    return NextResponse.json(news.filter((n) => n['isPublished']));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const news = readData<NewsItem[]>('news.json');
  const newItem: NewsItem = {
    ...body,
    id: generateId(),
    slug: body.slug || slugify(body.title || ''),
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
  news.unshift(newItem);
  writeData('news.json', news);
  return NextResponse.json(newItem, { status: 201 });
}
