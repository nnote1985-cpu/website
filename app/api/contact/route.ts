import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json([]);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, project, appointmentDate } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone required' }, { status: 400 });
    }

    const newContact: Record<string, unknown> = {
      id: crypto.randomUUID(),
      name,
      email: email || '',
      phone,
      message: message || '',
      project: project || '',
      is_read: false,
      created_at: new Date().toISOString(),
    };

    if (appointmentDate) newContact.appointment_date = appointmentDate;

    const { error } = await supabaseAdmin.from('contacts').insert(newContact);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // ส่งไป Google Sheet webhook ของโครงการนั้น (ถ้ามี)
    if (project) {
      const { data: projectData } = await supabaseAdmin
        .from('projects')
        .select('sheet_webhook_url')
        .or(`name.eq.${project},slug.eq.${project}`)
        .single();

      if (projectData?.sheet_webhook_url) {
        fetch(projectData.sheet_webhook_url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, message, project, appointmentDate }),
        }).catch(() => {}); // ไม่ block response ถ้า sheet error
      }
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
