import { NextRequest, NextResponse } from 'next/server';
import {
  getSafePreviewRedirect,
  PREVIEW_BYPASS_COOKIE_NAME,
  PREVIEW_BYPASS_COOKIE_VALUE,
  resolvePreviewBypassSecret,
} from '@/lib/preview-bypass';

function clearPreviewCookie(response: NextResponse) {
  response.cookies.set({
    name: PREVIEW_BYPASS_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function GET(request: NextRequest) {
  const secret = resolvePreviewBypassSecret();
  if (!secret) {
    return NextResponse.json({ ok: false, message: 'Preview bypass secret is not configured.' }, { status: 500 });
  }

  const nextPath = getSafePreviewRedirect(request.nextUrl.searchParams.get('next'));
  const disable = request.nextUrl.searchParams.get('disable');
  const redirectUrl = new URL(nextPath, request.url);

  if (disable === '1' || disable === 'true') {
    const response = NextResponse.redirect(redirectUrl);
    clearPreviewCookie(response);
    return response;
  }

  const receivedSecret = request.nextUrl.searchParams.get('secret')?.trim() || '';
  if (receivedSecret !== secret) {
    return NextResponse.json({ ok: false, message: 'Invalid preview secret.' }, { status: 401 });
  }

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
