import crypto from 'crypto';

/* ------------------ utils ------------------ */

function hash(value: string): string {
  return crypto
    .createHash('sha256')
    .update(value.trim().toLowerCase())
    .digest('hex');
}

function normalizePhone(phone: string): string {
  let p = phone.replace(/\D/g, '');

  // 0812345678 → 66812345678
  if (p.startsWith('0')) {
    p = '66' + p.slice(1);
  }

  // กรณี user ใส่ +66 มาแล้ว
  if (p.startsWith('66')) {
    return p;
  }

  return p;
}

function hashPhone(phone: string): string {
  const normalized = normalizePhone(phone);
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/* ------------------ types ------------------ */

interface CAPIEventData {
  pixelId: string;
  accessToken: string;

  eventName: 'Lead' | 'PageView' | 'ViewContent';
  eventId?: string;
  eventTime?: number;

  email?: string;
  phone?: string;
  name?: string;
  externalId?: string;

  contentName?: string;
  value?: number;
  currency?: string;

  sourceUrl?: string;

  clientIp?: string;
  clientUserAgent?: string;

  fbp?: string;
  fbc?: string;

  testEventCode?: string;
}

/* ------------------ main function ------------------ */

export async function sendCAPIEvent(data: CAPIEventData) {
  const {
    pixelId,
    accessToken,
    eventName,
    email,
    phone,
    name,
    externalId,
    contentName,
    value,
    currency,
    sourceUrl,
    clientIp,
    clientUserAgent,
    fbp,
    fbc,
    testEventCode,
  } = data;

  const eventTime = data.eventTime || Math.floor(Date.now() / 1000);
  const eventId = data.eventId || crypto.randomUUID();

  /* ---------- user_data ---------- */
  const userData: Record<string, string> = {};

  if (email) userData.em = hash(email);
  if (phone) userData.ph = hashPhone(phone);

  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts[0]) userData.fn = hash(parts[0]);
    if (parts.length > 1) userData.ln = hash(parts.slice(1).join(' '));
  }

  if (externalId) userData.external_id = hash(externalId);

  // raw (ไม่ต้อง hash)
  if (clientIp) userData.client_ip_address = clientIp;
  if (clientUserAgent) userData.client_user_agent = clientUserAgent;

  // เพิ่ม match quality
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  /* ---------- payload ---------- */
  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: eventTime,
        event_id: eventId,
        action_source: 'website',
        event_source_url: sourceUrl,
        user_data: userData,
        custom_data: {
          ...(contentName ? { content_name: contentName } : {}),
          ...(value !== undefined
            ? { value, currency: currency || 'THB' }
            : {}),
        },
      },
    ],
  };

  if (testEventCode) {
    payload.test_event_code = testEventCode;
  }

  const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || result.error) {
      console.error('[CAPI ERROR]:', result);
    } else {
      console.log(
        '[CAPI SUCCESS]:',
        eventName,
        '| event_id:',
        eventId,
        '| events_received:',
        result.events_received
      );
    }

    return { ...result, eventId };
  } catch (err) {
    console.error('[CAPI FETCH ERROR]:', err);
    return { success: false, eventId };
  }
}
