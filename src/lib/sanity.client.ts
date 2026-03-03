import { createClient } from 'next-sanity';

const normalizeEnv = (value: string | undefined, fallback = ''): string => (value ?? fallback).trim();

export const sanityProjectId = normalizeEnv(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
export const sanityDataset = normalizeEnv(process.env.NEXT_PUBLIC_SANITY_DATASET);
export const sanityApiVersion = normalizeEnv(process.env.NEXT_PUBLIC_SANITY_API_VERSION, '2026-02-23');
export const sanityRevalidateSecret = normalizeEnv(process.env.SANITY_REVALIDATE_SECRET);

export const isSanityConfigured = Boolean(
  sanityProjectId &&
  sanityProjectId !== 'your-project-id' &&
  sanityDataset &&
  sanityDataset !== 'your-dataset',
);

const safeProjectId = sanityProjectId || 'dummy-project-id';
const safeDataset = sanityDataset || 'production';

export const sanityClient = createClient({
  projectId: safeProjectId,
  dataset: safeDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  perspective: 'published',
  stega: {
    enabled: false,
  },
});
