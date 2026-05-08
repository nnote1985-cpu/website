import { getContactSettings } from '@/lib/getContactSettings';
import HeaderClient from './HeaderClient';

export default async function Header() {
  const contact = await getContactSettings();
  return <HeaderClient phones={contact.phone} line={contact.line} />;
}
