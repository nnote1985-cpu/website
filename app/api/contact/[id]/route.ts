import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/db';
import { getSession } from '@/lib/auth';

interface Contact {
  id: string;
  isRead: boolean;
  [key: string]: unknown;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const contacts = readData<Contact[]>('contacts.json');
  const idx = contacts.findIndex((c) => c.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  contacts[idx] = { ...contacts[idx], ...body };
  writeData('contacts.json', contacts);
  return NextResponse.json(contacts[idx]);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const contacts = readData<Contact[]>('contacts.json');
  writeData('contacts.json', contacts.filter((c) => c.id !== id));
  return NextResponse.json({ success: true });
}
