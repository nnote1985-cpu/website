import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const updateData: Record<string, unknown> = {
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
    is_active: body.isActive ?? body.is_active,
    image: body.image,
  };
  Object.keys(updateData).forEach((k) => updateData[k] === undefined && delete updateData[k]);

  const { data, error } = await supabaseAdmin.from('promotions').update(updateData).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { error } = await supabaseAdmin.from('promotions').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
