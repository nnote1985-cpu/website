import { unstable_cache } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';

export interface ContactSettings {
  phone: string[];
  email: string;
  address: string;
  facebook: string;
  line: string;
}

const DEFAULTS: ContactSettings = {
  phone: ['082-526-5566', '02-059-9655', '099-198-2940'],
  email: 'info@asakan.co.th',
  address: '191 ถนนรามคำแหง แขวงสะพานสูง เขตสะพานสูง กรุงเทพฯ 10240',
  facebook: 'https://www.facebook.com/Asakandevelopment',
  line: '@asakan',
};

export const getContactSettings = unstable_cache(
  async (): Promise<ContactSettings> => {
    try {
      const { data } = await supabaseAdmin.from('settings').select('data').eq('id', 1).single();
      const s = (data?.data || {}) as Record<string, unknown>;
      return {
        phone: Array.isArray(s.phone) ? (s.phone as string[]) : (s.phone ? [s.phone as string] : DEFAULTS.phone),
        email: (s.email as string) || DEFAULTS.email,
        address: (s.address as string) || DEFAULTS.address,
        facebook: (s.facebook as string) || DEFAULTS.facebook,
        line: (s.line as string) || DEFAULTS.line,
      };
    } catch {
      return DEFAULTS;
    }
  },
  ['contact-settings'],
  { revalidate: 3600, tags: ['settings'] },
);

export function lineUrl(id: string): string {
  const clean = id.startsWith('@') ? id : `@${id}`;
  return `https://line.me/ti/p/~${clean}`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^0-9]/g, '')}`;
}
