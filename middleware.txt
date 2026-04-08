import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'asakan-secret-key-2024-change-in-production'
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = req.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL('/admin/login', req.url));
      response.cookies.delete('admin-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
