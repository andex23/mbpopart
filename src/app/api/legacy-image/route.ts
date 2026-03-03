import { NextRequest } from 'next/server';
import { getDefaultImagePlaceholder, isLegacyImageHost } from '@/lib/legacy-image';

export const runtime = 'nodejs';

function toPlaceholderUrl(request: NextRequest): URL {
  return new URL(getDefaultImagePlaceholder(), request.url);
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        // Some legacy image hosts are strict about accepted content types.
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      },
    });
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function isImageResponse(response: Response | null): response is Response {
  if (!response || !response.ok) {
    return false;
  }
  const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
  return contentType.startsWith('image/');
}

export async function GET(request: NextRequest): Promise<Response> {
  const rawUrl = request.nextUrl.searchParams.get('url')?.trim();
  if (!rawUrl) {
    return Response.redirect(toPlaceholderUrl(request), 302);
  }

  let sourceUrl: URL;
  try {
    sourceUrl = new URL(rawUrl);
  } catch {
    return Response.redirect(toPlaceholderUrl(request), 302);
  }

  if (!['http:', 'https:'].includes(sourceUrl.protocol) || !isLegacyImageHost(sourceUrl.hostname)) {
    return Response.redirect(toPlaceholderUrl(request), 302);
  }

  const direct = await fetchWithTimeout(sourceUrl.toString(), 8000);
  const archived = isImageResponse(direct)
    ? direct
    : await fetchWithTimeout(`https://web.archive.org/web/0im_/${sourceUrl.toString()}`, 15000);

  if (!isImageResponse(archived)) {
    return Response.redirect(toPlaceholderUrl(request), 302);
  }

  const headers = new Headers();
  headers.set('content-type', archived.headers.get('content-type') ?? 'image/jpeg');
  headers.set('cache-control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  const contentLength = archived.headers.get('content-length');
  if (contentLength) {
    headers.set('content-length', contentLength);
  }

  return new Response(archived.body, {
    status: 200,
    headers,
  });
}
