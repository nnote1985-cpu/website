import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { projectUrl } from '@/lib/projectUrl';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await getSession()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (typeof body?.enabled !== 'boolean') return NextResponse.json({ error: 'enabled must be boolean' }, { status: 400 });
  const { id } = await params;
  const { data: project } = await supabaseAdmin.from('projects').select('id,slug').eq('id', id).single();
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  // Compare-and-swap preserves concurrent edits to other project switches/settings.
  for (let attempt = 0; attempt < 3; attempt++) {
    const { data: settings, error } = await supabaseAdmin.from('settings').select('data').eq('id', 1).single();
    if (error || !settings) return NextResponse.json({ error: 'โหลดการตั้งค่าไม่สำเร็จ' }, { status: 500 });
    const next = { ...settings.data, projectDetailAccess: { ...settings.data?.projectDetailAccess, [id]: body.enabled } };
    const { data: saved, error: saveError } = await supabaseAdmin.from('settings').update({ data: next }).eq('id', 1).eq('data', JSON.stringify(settings.data)).select('id');
    if (saveError) return NextResponse.json({ error: 'บันทึกการตั้งค่าไม่สำเร็จ' }, { status: 500 });
    if (saved?.length) {
      revalidatePath('/');
      revalidatePath('/projects');
      revalidatePath('/sitemap.xml');
      revalidatePath(`/projects/${project.slug}`);
      revalidatePath(projectUrl(project.slug));
      return NextResponse.json({ enabled: body.enabled });
    }
  }
  return NextResponse.json({ error: 'มีการแก้ไขพร้อมกัน กรุณาลองใหม่' }, { status: 409 });
}
