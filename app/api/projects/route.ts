import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { generateId } from '@/lib/utils';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json([]);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const newProject = {
      id: body.id || generateId(),
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
      features: body.features || [],
      image: body.image,
      hero_image: body.heroImage || body.hero_image,
      promo_banner: body.promoBanner || body.promo_banner,
      promo_banner_mobile: body.promoBannerMobile || body.promo_banner_mobile,
      fb_pixel_id: body.fbPixelId || body.fb_pixel_id || '',
      facebook_url: body.facebookUrl || body.facebook_url || '',
      phone: body.phone || '',
      popup_image: body.popupImage || body.popup_image || '',
      popup_url: body.popupUrl || body.popup_url || '',
      gallery: body.gallery || {},
      floor_plans: body.floorPlans || body.floor_plans || [],
      room_plans: body.roomPlans || body.room_plans || [],
      google_map_url: body.googleMapUrl || body.google_map_url,
      is_active: body.isActive ?? body.is_active ?? true,
      video_url: body.videoUrl || body.video_url || '',
      sheet_webhook_url: body.sheetWebhookUrl || body.sheet_webhook_url || '',
      meta_title: body.metaTitle || body.meta_title || '',
      meta_description: body.metaDescription || body.meta_description || '',
      meta_keywords: body.metaKeywords || body.meta_keywords || '',
      fb_capi_token: body.fbCapiToken || body.fb_capi_token || '',
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin.from('projects').insert(newProject).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
