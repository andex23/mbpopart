import { NextRequest } from 'next/server';
import http from 'node:http';
import { Readable } from 'node:stream';
import { getDefaultImagePlaceholder, isLegacyImageHost } from '@/lib/legacy-image';

export const runtime = 'nodejs';
const LEGACY_ASSET_SERVER_IP = '192.250.237.56';

function toPlaceholderUrl(request: NextRequest): URL {
  return new URL(getDefaultImagePlaceholder(), request.url);
}

async function fetchLegacyHostImage(sourceUrl: URL, timeoutMs: number): Promise<Response | null> {
  return new Promise((resolve) => {
    const request = http.request(
      {
        host: LEGACY_ASSET_SERVER_IP,
        path: `${sourceUrl.pathname}${sourceUrl.search}`,
        headers: {
          Host: sourceUrl.hostname,
          Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        },
      },
      (response) => {
        const contentType = response.headers['content-type']?.toLowerCase() ?? '';
        if ((response.statusCode ?? 500) >= 400 || !contentType.startsWith('image/')) {
          response.resume();
          resolve(null);
          return;
        }

        const headers = new Headers();
        headers.set('content-type', response.headers['content-type'] ?? 'image/jpeg');
        headers.set('cache-control', 'public, s-maxage=86400, stale-while-revalidate=604800');

        const contentLength = response.headers['content-length'];
        if (typeof contentLength === 'string') {
          headers.set('content-length', contentLength);
        }

        resolve(new Response(Readable.toWeb(response) as ReadableStream, {
          status: 200,
          headers,
        }));
      },
    );

    request.setTimeout(timeoutMs, () => {
      request.destroy();
      resolve(null);
    });

    request.on('error', () => resolve(null));
    request.end();
  });
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

  const direct = await fetchLegacyHostImage(sourceUrl, 8000);
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
