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
