// Cooking photos: every src/assets/cooking/img-NN.jpg, in filename order.
// To add one, drop the file in that folder — counts, thumbnails and compressed sizes are all generated at build.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<ImageMetadata>('../assets/cooking/img-*.jpg', { eager: true, import: 'default' });

export const photos: ImageMetadata[] = Object.keys(files).sort().map(k => files[k]!);

/** Photos (1-based numbers) the home page tile fades through. */
export const homePicks = [18, 37, 30, 41, 4, 28, 24];
