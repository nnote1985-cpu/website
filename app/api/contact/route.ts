import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { generateId } from '@/lib/utils';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const contacts = readData<Contact[]>('contacts.json');
  return NextResponse.json(contacts);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone required' }, { status: 400 });
    }

    const contacts = readData<Contact[]>('contacts.json');
    const newContact: Contact = {
      id: generateId(),
      name,
      email: email || '',
      phone,
      message: message || '',
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    contacts.unshift(newContact);
    writeData('contacts.json', contacts);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
