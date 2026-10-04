import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getHiddenProjectSlugs } from '@/lib/projectAccess';
import { slugFromProjectPath } from '@/lib/projectUrl';

const JWT_SECRET_VALUE = process.env.JWT_SECRET;

// เก็บรายชื่อโครงการที่ซ่อนไว้สั้นๆ จะได้ไม่ยิง Supabase ทุก request
// แอดมินเปิด/ปิดโครงการแล้ว ผลจะเห็นภายในไม่เกิน HIDDEN_TTL_MS
const HIDDEN_TTL_MS = 30_000;
let hiddenCache: { slugs: Set<string>; expires: number } | null = null;

async function hiddenProjectSlugs(): Promise<Set<string>> {
  if (hiddenCache && hiddenCache.expires > Date.now()) return hiddenCache.slugs;
  const slugs = new Set(await getHiddenProjectSlugs().catch(() => []));
  hiddenCache = { slugs, expires: Date.now() + HIDDEN_TTL_MS };
  return slugs;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 0. หน้าโครงการที่แอดมินปิดไว้ → พาไปหน้า Coming Soon แบบชั่วคราว (307)
  // ไม่ใช้ 301 เพื่อให้ URL เดิมกลับมาใช้ได้ทันทีเมื่อเปิดโครงการ
  const projectSlug = slugFromProjectPath(pathname);
  if (projectSlug) {
    if ((await hiddenProjectSlugs()).has(projectSlug)) {
      const url = new URL('/coming-soon', req.url);
      url.searchParams.set('project', projectSlug);
      return NextResponse.redirect(url, 307);
    }
    return NextResponse.next();
  }

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

  if (!JWT_SECRET_VALUE) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  try {
    const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_VALUE);
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
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
    '/projects/:slug',
    '/theceline',
    '/elysium59',
  ],
};
