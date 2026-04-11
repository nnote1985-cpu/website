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
    promo_banner_mobile: body.promoBannerMobile || body.promo_banner_mobile,
    fb_pixel_id: body.fbPixelId ?? body.fb_pixel_id,
    facebook_url: body.facebookUrl ?? body.facebook_url,
    phone: body.phone ?? undefined,
    popup_image: body.popupImage ?? body.popup_image,
    popup_url: body.popupUrl ?? body.popup_url,
    gallery: body.gallery,
    floor_plans: body.floorPlans || body.floor_plans,
    room_plans: body.roomPlans || body.room_plans,
    google_map_url: body.googleMapUrl || body.google_map_url,
    is_active: body.isActive ?? body.is_active,
    video_url: body.videoUrl ?? body.video_url,
    sheet_webhook_url: body.sheetWebhookUrl ?? body.sheet_webhook_url,
    meta_title: body.metaTitle ?? body.meta_title,
    meta_description: body.metaDescription ?? body.meta_description,
    meta_keywords: body.metaKeywords ?? body.meta_keywords,
    fb_capi_token: body.fbCapiToken ?? body.fb_capi_token,
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
