import type { QueryParams } from 'next-sanity';
import { isSanityConfigured, sanityClient } from './sanity.client';

interface SanityFetchOptions {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number;
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: SanityFetchOptions): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: {
        revalidate,
        tags: ['sanity', ...tags],
      },
    });
  } catch (error) {
    console.error('[sanityFetch] failed', error);
    return null;
  }
}

