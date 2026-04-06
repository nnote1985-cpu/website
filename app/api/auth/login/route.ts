import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { readData } from '@/lib/db';
import { signToken } from '@/lib/auth';

interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const users = readData<User[]>('users.json');
    const user = users.find((u) => u.username === username);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ id: user.id, username: user.username, role: user.role, name: user.name });

    const response = NextResponse.json({ success: true, name: user.name });
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
