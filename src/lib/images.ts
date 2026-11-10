// Build-time photo compression. One place decides the sizes and quality for every cooking photo.
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export interface Photo {
  /** largest version (fallback src) */
  src: string;
  /** responsive candidates for srcset */
  srcset: string;
  /** small version: thumbnail grid and the blurred stage backdrop */
  thumb: string;
}

export async function photo(src: ImageMetadata): Promise<Photo> {
  const [sm, lg, thumb] = await Promise.all([
    getImage({ src, width: 720, format: 'webp', quality: 72 }),
    getImage({ src, width: 1200, format: 'webp', quality: 70 }),
    getImage({ src, width: 160, format: 'webp', quality: 60 }),
  ]);
  return { src: lg.src, srcset: `${sm.src} 720w, ${lg.src} 1200w`, thumb: thumb.src };
}
