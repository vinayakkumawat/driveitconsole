import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public paths that don't require authentication
const publicPaths = [
  '/login',
  '/favicon.ico',
  '/_next',
  '/images',
  '/assets',
  '/icons',
  '/api/auth',
  '/api',
];

function isPublicPath(path: string): boolean {
  return publicPaths.some(publicPath => path.startsWith(publicPath));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow access to public paths without authentication
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get('auth-token')?.value;

  // Redirect to login if no token is present and trying to access protected route
  if (!authToken && pathname !== '/login') {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if user is already logged in and trying to access login page
  if (authToken && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. Matches any request that starts with /_next (static files)
     * 2. Matches any request that contains a file extension (e.g. .js, .css)
     * 3. Matches any request that starts with /api (API routes)
     */
    '/((?!_next/static|_next/image|images/|assets/|favicon.ico).*)',
  ],
};