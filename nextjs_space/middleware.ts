import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';

  console.log(`[Middleware] Incoming request: host="${host}" url="${request.url}"`);

  if (host.startsWith('www.')) {
    const targetHost = host.replace(/^www\./, '');
    const targetUrl = new URL(request.url);
    targetUrl.host = targetHost;
    targetUrl.protocol = 'https';

    console.log(`[Middleware] 308 Redirect: www detected → redirecting to ${targetUrl.toString()}`);

    return NextResponse.redirect(targetUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
