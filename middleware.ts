import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('__session')?.value;
  const url = req.nextUrl.clone();

  // Only protect /cart and /profile
  const isProtectedRoute = ['/cart', '/profile'].some((path) =>
    url.pathname.startsWith(path)
  );

  if (isProtectedRoute && !token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: ['/cart', '/profile'],
};
