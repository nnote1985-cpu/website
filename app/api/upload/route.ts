import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get('file') as File;
  const bucket = (formData.get('bucket') as string) || 'hero-images';

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(fileName, file, { contentType: file.type, upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(fileName);
  return NextResponse.json({ url: data.publicUrl });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { url, bucket = 'hero-images' } = await req.json();
  if (!url) return NextResponse.json({ error: 'No url provided' }, { status: 400 });

  // แยก filename จาก public URL
  // format: https://xxx.supabase.co/storage/v1/object/public/bucket-name/filename
  const parts = url.split(`/${bucket}/`);
  if (parts.length < 2) return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
  const fileName = parts[1];

  const { error } = await supabaseAdmin.storage.from(bucket).remove([fileName]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
