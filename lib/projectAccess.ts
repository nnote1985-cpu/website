import { supabaseAdmin } from '@/lib/supabase';

export async function getProjectDetailAccess(): Promise<Record<string, boolean>> {
  const { data, error } = await supabaseAdmin.from('settings').select('data').eq('id', 1).single();
  if (error) throw new Error('Unable to load project detail settings');
  return data?.data?.projectDetailAccess ?? {};
}
