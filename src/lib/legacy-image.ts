const LEGACY_IMAGE_HOSTS = new Set(['mbpopart.com', 'www.mbpopart.com']);
const LEGACY_IMAGE_PROXY_PREFIX = '/api/legacy-image?url=';
const DEFAULT_IMAGE_PLACEHOLDER = '/placeholders/new-painting-coming-soon.svg';

export function getDefaultImagePlaceholder(): string {
  return DEFAULT_IMAGE_PLACEHOLDER;
}

export function isLegacyImageHost(hostname: string): boolean {
  return LEGACY_IMAGE_HOSTS.has(hostname.toLowerCase());
}

export function resolveLegacyImageUrl(value: string | null | undefined): string {
  const raw = (value ?? '').trim();
  if (!raw) {
    return DEFAULT_IMAGE_PLACEHOLDER;
  }

  if (raw.startsWith(LEGACY_IMAGE_PROXY_PREFIX)) {
    return raw;
  }

  if (raw.startsWith('/')) {
    return raw;
  }

  try {
    const parsed = new URL(raw);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return raw;
    }
    if (!isLegacyImageHost(parsed.hostname)) {
      return raw;
    }
    return `${LEGACY_IMAGE_PROXY_PREFIX}${encodeURIComponent(parsed.toString())}`;
  } catch {
    return raw;
  }
}
