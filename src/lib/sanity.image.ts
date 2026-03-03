import imageUrlBuilder from '@sanity/image-url';
import { isSanityConfigured, sanityClient } from './sanity.client';

const builder = isSanityConfigured ? imageUrlBuilder(sanityClient) : null;

interface SanityImageOptions {
  width?: number;
  height?: number;
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'min' | 'scale';
}

export function urlForImage(source: unknown) {
  if (!builder || !source) {
    return null;
  }

  try {
    return builder.image(source as never);
  } catch {
    return null;
  }
}

export function getSanityImageUrl(source: unknown, options: SanityImageOptions = {}): string | undefined {
  const imageBuilder = urlForImage(source);
  if (!imageBuilder) {
    return undefined;
  }

  let chain = imageBuilder.auto('format');

  if (typeof options.width === 'number') {
    chain = chain.width(options.width);
  }
  if (typeof options.height === 'number') {
    chain = chain.height(options.height);
  }
  if (options.fit) {
    chain = chain.fit(options.fit);
  }

  return chain.url();
}

