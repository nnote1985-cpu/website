import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { sendCAPIEvent } from '@/lib/facebookCapi';

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
    const { name, email, phone, message, project, appointmentDate, recaptchaToken } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone required' }, { status: 400 });
    }

    // Verify reCAPTCHA (ถ้ามี secret key ตั้งค่าไว้)
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (secretKey && recaptchaToken) {
      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secretKey}&response=${recaptchaToken}`,
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success || verifyData.score < 0.5) {
        return NextResponse.json({ error: 'กรุณาลองใหม่อีกครั้ง' }, { status: 400 });
      }
    } else if (secretKey && !recaptchaToken) {
      return NextResponse.json({ error: 'กรุณาลองใหม่อีกครั้ง' }, { status: 400 });
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
      console.log('[webhook] looking up project:', project);

      // ดึงทุก project แล้ว filter ใน JS เพื่อหลีกเลี่ยงปัญหา PostgREST escaping
      const { data: allProjects, error: projErr } = await supabaseAdmin
        .from('projects')
        .select('name, slug, sheet_webhook_url');

      if (projErr) console.error('[webhook] supabase error:', projErr.message);

      const matched = (allProjects || []).find(
        (p) =>
          p.name === project ||
          p.slug === project ||
          p.name?.toLowerCase() === project?.toLowerCase()
      );

      console.log('[webhook] matched project:', matched?.name, '| url:', matched?.sheet_webhook_url);

      const webhookUrl = matched?.sheet_webhook_url;

      if (webhookUrl) {
        const payload = JSON.stringify({
          name: name || '',
          phone: phone || '',
          email: email || '',
          project: project || '',
          message: message || '',
          appointmentDate: appointmentDate || '',
        });

        console.log('[webhook] sending to:', webhookUrl);

        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: payload,
          redirect: 'follow',
        })
          .then((r) => console.log('[webhook] response status:', r.status))
          .catch((e) => console.error('[webhook] fetch error:', e));
      } else {
        console.log('[webhook] no webhook URL found for project:', project);
      }
    }

    // ยิง Facebook CAPI Lead event (server-side)
    const capiToken = process.env.FB_CAPI_ACCESS_TOKEN;
    const capiPixelId = process.env.FB_CAPI_PIXEL_ID;
    let capiEventId: string | undefined;

    if (capiToken && capiPixelId) {
      const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '';
      const clientUserAgent = req.headers.get('user-agent') || '';
      const referer = req.headers.get('referer') || 'https://asakan.co.th';

      // อ่าน fbp/fbc จาก cookie header
      const cookieHeader = req.headers.get('cookie') || '';
      const fbp = cookieHeader.match(/(?:^|;\s*)_fbp=([^;]+)/)?.[1] || undefined;
      const fbc = cookieHeader.match(/(?:^|;\s*)_fbc=([^;]+)/)?.[1] || undefined;

      try {
        const capiResult = await sendCAPIEvent({
          pixelId: capiPixelId,
          accessToken: capiToken,
          eventName: 'Lead',
          email: email || undefined,
          phone: phone || undefined,
          name: name || undefined,
          contentName: project || undefined,
          sourceUrl: referer,
          clientIp,
          clientUserAgent,
          fbp,
          fbc,
        });
        capiEventId = capiResult.eventId;
      } catch (e) {
        console.error('[CAPI] failed:', e);
      }
    }

    // ส่ง event_id กลับไปให้ browser pixel ใช้ dedup
    return NextResponse.json({ success: true, eventId: capiEventId }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
