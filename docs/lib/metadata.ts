import type { Metadata } from 'next';

export function createPageMetadata(title: string): Metadata {
  return {
    title: `${title} - bnbgallery`,
  };
}
