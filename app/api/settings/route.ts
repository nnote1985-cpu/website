import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('settings')
    .select('data')
    .eq('id', 1)
    .single();

  if (error || !data) return NextResponse.json({});
  return NextResponse.json(data.data);
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();

  // ดึงค่าเดิมก่อน แล้ว merge
  const { data: current } = await supabaseAdmin.from('settings').select('data').eq('id', 1).single();
  const updated = { ...(current?.data || {}), ...body };

  const { data, error } = await supabaseAdmin
    .from('settings')
    .upsert({ id: 1, data: updated })
    .select('data')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data.data);
}
