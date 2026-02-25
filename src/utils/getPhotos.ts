import type { GalleryPhoto } from '../types/gallery';

/**
 * Normalizes a single photo entry into a `GalleryPhoto` object with a 1-based position number.
 *
 * @param photo - A photo URL string or an existing `GalleryPhoto` object.
 * @param index - The zero-based index of the photo in its array, used to assign `number`.
 * @returns A `GalleryPhoto` with `number` set to `index + 1`.
 */
export function processPhoto(
	photo: string | GalleryPhoto,
	index: number,
): GalleryPhoto {
	return typeof photo === 'string'
		? { number: index + 1, photo }
		: { ...photo, number: index + 1 };
}

/**
 * Normalizes one or more photos into an array of `GalleryPhoto` objects,
 * each assigned a sequential 1-based `number`.
 *
 * @param photos - A single photo URL string, a single `GalleryPhoto` object,
 *   or an array of either. A non-array value is wrapped in an array before processing.
 * @returns An array of `GalleryPhoto` objects with sequential `number` fields.
 */
export function getPhotos(
	photos: string | GalleryPhoto | Array<string | GalleryPhoto>,
): GalleryPhoto[] {
	const photosToProcess = Array.isArray(photos) ? photos : [photos];
	return photosToProcess.map(processPhoto);
}

/**
 * @deprecated Use named import instead: `import { getPhotos } from './getPhotos'`.
 * Default export will be removed in the next major version.
 */
export default getPhotos;
