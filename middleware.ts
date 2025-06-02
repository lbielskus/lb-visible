import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get('__session')?.value || req.cookies.get('session')?.value;
  const url = req.nextUrl.clone();

  const isProtectedRoute = ['/cart', '/profile'].some((path) =>
    url.pathname.startsWith(path)
  );

  if (isProtectedRoute && !token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cart', '/profile'],
};
