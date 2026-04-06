import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { readData, writeData } from '@/lib/db';
import { getSession } from '@/lib/auth';

interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  name: string;
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  if (newPassword.length < 6) {
    return NextResponse.json({ error: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }, { status: 400 });
  }

  const users = readData<User[]>('users.json');
  const userId = String(session.id);
  const user = users.find((u) => u.id === userId);

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) return NextResponse.json({ error: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' }, { status: 400 });

  const hashed = await bcrypt.hash(newPassword, 12);
  const updated = users.map((u) => (u.id === userId ? { ...u, password: hashed } : u));
  writeData('users.json', updated);

  return NextResponse.json({ success: true });
}
