import { supabaseAdmin } from '@/lib/supabase';

// ถ้าอ่าน settings ไม่ได้ (Supabase สะดุด) ให้คืนค่าว่าง = เปิดหน้ารายละเอียดทุกโครงการ
// แทนการ throw ซึ่งทำให้หน้าแรกพังและ build บน Vercel ล้ม
export async function getProjectDetailAccess(): Promise<Record<string, boolean>> {
  const { data, error } = await supabaseAdmin.from('settings').select('data').eq('id', 1).single();
  if (error) {
    console.error('[projectAccess] Unable to load project detail settings:', error.message);
    return {};
  }
  return data?.data?.projectDetailAccess ?? {};
}

// slug ของโครงการที่แอดมินปิดหน้ารายละเอียดไว้ (ใช้ใน proxy เพื่อพาไปหน้า Coming Soon)
// อ่านไม่ได้ให้คืนค่าว่าง = ไม่ redirect ใคร
export async function getHiddenProjectSlugs(): Promise<string[]> {
  const access = await getProjectDetailAccess();
  const hiddenIds = Object.keys(access).filter((id) => access[id] === false);
  if (hiddenIds.length === 0) return [];
  const { data, error } = await supabaseAdmin.from('projects').select('slug').in('id', hiddenIds);
  if (error) {
    console.error('[projectAccess] Unable to load hidden project slugs:', error.message);
    return [];
  }
  return (data ?? []).map((p) => p.slug as string).filter(Boolean);
}
