import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { generateId } from '@/lib/utils';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('promotions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json([]);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const newPromo = {
    id: generateId(),
    title: body.title,
    title_en: body.titleEn || body.title_en,
    subtitle: body.subtitle,
    description: body.description,
    description_en: body.descriptionEn || body.description_en,
    project: body.project,
    discount: body.discount,
    valid_until: body.validUntil || body.valid_until,
    cta_text: body.ctaText || body.cta_text,
    cta_url: body.ctaUrl || body.cta_url,
    is_active: body.isActive ?? body.is_active ?? true,
    image: body.image,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin.from('promotions').insert(newPromo).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
