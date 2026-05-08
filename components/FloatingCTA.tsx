import { getContactSettings } from '@/lib/getContactSettings';
import FloatingCTAClient from './FloatingCTAClient';

export default async function FloatingCTA() {
  const contact = await getContactSettings();
  return <FloatingCTAClient phone={contact.phone[0]} line={contact.line} />;
}
