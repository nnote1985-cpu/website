import crypto from 'crypto';

function hash(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

function hashPhone(phone: string): string {
  // normalize: ลบ - และช่องว่าง แล้ว hash
  const normalized = phone.replace(/[-\s]/g, '');
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

interface CAPIEventData {
  pixelId: string;
  accessToken: string;
  eventName: 'Lead' | 'PageView' | 'ViewContent';
  eventTime?: number;
  email?: string;
  phone?: string;
  name?: string;
  contentName?: string;
  value?: number;
  currency?: string;
  sourceUrl?: string;
  clientIp?: string;
  clientUserAgent?: string;
  testEventCode?: string;
}

export async function sendCAPIEvent(data: CAPIEventData) {
  const {
    pixelId, accessToken, eventName,
    email, phone, name,
    contentName, value, currency,
    sourceUrl, clientIp, clientUserAgent,
    testEventCode,
  } = data;

  const eventTime = data.eventTime || Math.floor(Date.now() / 1000);

  // build user_data — hash PII
  const userData: Record<string, string> = {};
  if (email) userData.em = hash(email);
  if (phone) userData.ph = hashPhone(phone);
  if (name) {
    const parts = name.trim().split(' ');
    userData.fn = hash(parts[0] || '');
    if (parts.length > 1) userData.ln = hash(parts.slice(1).join(' '));
  }
  if (clientIp) userData.client_ip_address = clientIp;
  if (clientUserAgent) userData.client_user_agent = clientUserAgent;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: eventTime,
        action_source: 'website',
        event_source_url: sourceUrl || 'https://asakan.co.th',
        user_data: userData,
        custom_data: {
          ...(contentName ? { content_name: contentName } : {}),
          ...(value ? { value, currency: currency || 'THB' } : {}),
        },
      },
    ],
  };

  if (testEventCode) {
    payload.test_event_code = testEventCode;
  }

  const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (!res.ok) {
    console.error('[CAPI] error:', JSON.stringify(result));
  } else {
    console.log('[CAPI] sent:', eventName, '| events_received:', result.events_received);
  }
  return result;
}
