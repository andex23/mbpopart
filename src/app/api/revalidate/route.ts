import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const TYPE_TO_PATHS: Record<string, string[]> = {
  siteSettings: ['/', '/bio', '/available', '/commissions', '/photos', '/gallery', '/prints', '/venues', '/news'],
  navigation: ['/', '/bio', '/available', '/commissions', '/photos', '/gallery', '/prints', '/venues', '/news'],
  landingPage: ['/'],
  bioPage: ['/bio'],
  painting: ['/gallery', '/available'],
  paintingsPage: ['/gallery'],
  availablePage: ['/available'],
  commissionsPage: ['/commissions'],
  happyClientsPage: ['/photos'],
  newsPage: ['/news'],
  printsPage: ['/prints'],
  venuesPage: ['/venues'],
};

function getSecretFromRequest(request: NextRequest): string | null {
  const fromQuery = request.nextUrl.searchParams.get('secret');
  if (fromQuery) {
    return fromQuery;
  }

  const fromHeader = request.headers.get('x-sanity-secret');
  if (fromHeader) {
    return fromHeader;
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader?.toLowerCase().startsWith('bearer ')) {
    return authHeader.slice(7).trim();
  }

  return null;
}

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;
  if (!expectedSecret) {
    return NextResponse.json(
      { ok: false, message: 'SANITY_REVALIDATE_SECRET is not configured.' },
      { status: 500 },
    );
  }

  const receivedSecret = getSecretFromRequest(request);
  if (!receivedSecret || receivedSecret !== expectedSecret) {
    return NextResponse.json({ ok: false, message: 'Invalid revalidation secret.' }, { status: 401 });
  }

  const payload = await request.json().catch(() => ({} as Record<string, unknown>));
  const docType =
    (typeof payload?._type === 'string' && payload._type) ||
    (typeof payload?.type === 'string' && payload.type) ||
    null;

  const tags = new Set<string>(['sanity']);
  if (docType) {
    tags.add(docType);
  }

  for (const tag of tags) {
    revalidateTag(tag);
  }

  const paths = docType ? (TYPE_TO_PATHS[docType] ?? []) : [];
  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    ok: true,
    revalidated: true,
    docType,
    tags: [...tags],
    paths,
  });
}
