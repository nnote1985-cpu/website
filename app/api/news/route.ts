import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { generateId, slugify } from '@/lib/utils';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });

  if (error) return NextResponse.json([]);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const now = new Date().toISOString();
  const newItem = {
    id: generateId(),
    slug: body.slug || slugify(body.title || ''),
    title: body.title,
    excerpt: body.excerpt,
    content: body.content,
    category: body.category,
    image: body.image || '',
    author: body.author || 'ASAKAN Team',
    published_at: now,
    is_published: body.isPublished ?? body.is_published ?? true,
    tags: body.tags || [],
    created_at: now,
  };

  const { data, error } = await supabaseAdmin.from('news').insert(newItem).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
