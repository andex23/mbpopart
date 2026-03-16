import { NextRequest, NextResponse } from 'next/server';
import {
  getSafePreviewRedirect,
  PREVIEW_BYPASS_COOKIE_NAME,
  PREVIEW_BYPASS_COOKIE_VALUE,
} from '@/lib/preview-bypass';

function isStudioRefererAllowed(request: NextRequest): boolean {
  const referer = request.headers.get('referer');
  if (!referer) {
    return false;
  }

  try {
    const refererUrl = new URL(referer);
    const requestUrl = new URL(request.url);
    return refererUrl.origin === requestUrl.origin && refererUrl.pathname.startsWith('/studio');
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  if (!isStudioRefererAllowed(request)) {
    return NextResponse.json({ ok: false, message: 'Studio preview access is only available from the CMS.' }, { status: 401 });
  }

  const nextPath = getSafePreviewRedirect(request.nextUrl.searchParams.get('next'));
  const redirectUrl = new URL(nextPath, request.url);
  const response = NextResponse.redirect(redirectUrl);

  response.cookies.set({
    name: PREVIEW_BYPASS_COOKIE_NAME,
    value: PREVIEW_BYPASS_COOKIE_VALUE,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return response;
}
