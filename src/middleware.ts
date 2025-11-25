import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

const PUBLIC_FILE_PATH = [
  '/_next',
  '/api',
  '/favicon.ico',
];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (
    PUBLIC_FILE_PATH.some((path) => pathname.startsWith(path)) ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next();
  }

  const match = pathname.match(/^\/(en|vi)(\/.*|$)/);
  const locale = match?.[1];

  if (!locale) {
    const defaultLocale = routing.defaultLocale;
    const url = new URL(req.url);
    url.pathname = `/${defaultLocale}${url.pathname}`;
    return NextResponse.redirect(url);
  }

  const isAdminRoute = pathname.startsWith(`/${locale}/admin`);
  const isUserProtectedRoute = pathname.startsWith(`/${locale}/bookings`) || pathname.startsWith(`/${locale}/profile`);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (isUserProtectedRoute && !token) {
    const url = new URL(`/${locale}/login`, req.url);
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  if (isAdminRoute) {
    if (!token || token.role !== 'admin') {
      const url = new URL(`/${locale}/login`, req.url);
      url.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  } else if (token && token.role === 'admin' && !pathname.startsWith(`/${locale}/admin`)) {
    const url = new URL(`/${locale}/admin/dashboard`, req.url);
    return NextResponse.redirect(url);
  } else if (token && token.role !== 'admin' && pathname.startsWith(`/${locale}/login`)) {
    const url = new URL(`/${locale}`, req.url);
    return NextResponse.redirect(url);
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
