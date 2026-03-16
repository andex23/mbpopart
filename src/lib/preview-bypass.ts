export const PREVIEW_BYPASS_COOKIE_NAME = 'mbpopart-preview-bypass';
export const PREVIEW_BYPASS_COOKIE_VALUE = '1';

export function resolvePreviewBypassSecret(): string {
  return (
    process.env.SITE_PREVIEW_BYPASS_SECRET?.trim() ||
    process.env.SANITY_REVALIDATE_SECRET?.trim() ||
    ''
  );
}

export function getSafePreviewRedirect(input: string | null | undefined): string {
  if (!input || !input.startsWith('/') || input.startsWith('//')) {
    return '/';
  }

  return input;
}
