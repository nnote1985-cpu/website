import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .or(`id.eq.${id},slug.eq.${id}`)
    .single();

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const updateData: Record<string, unknown> = {
    slug: body.slug,
    name: body.name,
    name_en: body.nameEn || body.name_en,
    status: body.status,
    type: body.type,
    floors: body.floors,
    units: body.units,
    price_min: body.priceMin || body.price_min,
    price_max: body.priceMax || body.price_max,
    location: body.location,
    bts: body.bts,
    concept: body.concept,
    concept_article: body.conceptArticle || body.concept_article,
    project_area: body.projectArea || body.project_area,
    parking: body.parking,
    description: body.description,
    description_en: body.descriptionEn || body.description_en,
    features: body.features,
    image: body.image,
    hero_image: body.heroImage || body.hero_image,
    promo_banner: body.promoBanner || body.promo_banner,
    gallery: body.gallery,
    floor_plans: body.floorPlans || body.floor_plans,
    room_plans: body.roomPlans || body.room_plans,
    google_map_url: body.googleMapUrl || body.google_map_url,
    is_active: body.isActive ?? body.is_active,
  };
  Object.keys(updateData).forEach((k) => updateData[k] === undefined && delete updateData[k]);

  const { data, error } = await supabaseAdmin.from('projects').update(updateData).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
