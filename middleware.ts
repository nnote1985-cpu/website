import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// ย้ายออกมาประกาศข้างนอกเพื่อประหยัด Memory และเช็คค่าว่างป้องกัน Build Error
const secret = process.env.JWT_SECRET || 'asakan-secret-key-2024-change-in-production';
const JWT_SECRET = new TextEncoder().encode(secret);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. ถ้าไม่ใช่หน้า admin หรือเป็นหน้า login ให้ผ่านไปได้เลยทันที (Early Return)
  // วิธีนี้จะช่วยให้ Middleware ทำงานเร็วขึ้นและลดภาระ CPU บน Vercel
  if (!pathname.startsWith('/admin') || pathname === '/admin/login') {
    return NextResponse.next();
  }

  // 2. ตรวจสอบ Token สำหรับหน้า /admin อื่นๆ
  const token = req.cookies.get('admin-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    // ถ้า Token ปลอมหรือหมดอายุ ให้เด้งไป Login และล้าง Cookie
    const response = NextResponse.redirect(new URL('/admin/login', req.url));
    response.cookies.delete('admin-token');
    return response;
  }
}

// 📍 จุดสำคัญ:Matcher ต้องระบุให้ชัดเจนตามมาตรฐานใหม่
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/admin/:path*',
  ],
};