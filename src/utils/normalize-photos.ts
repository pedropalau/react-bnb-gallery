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
 * Normalizes photos into an array of `GalleryPhoto` objects,
 * each assigned a sequential 1-based `number`.
 *
 * @param photos - An array of photo URL strings and/or `GalleryPhoto` objects.
 * @returns An array of `GalleryPhoto` objects with sequential `number` fields.
 */
export function normalizePhotos(
	photos: Array<string | GalleryPhoto>,
): GalleryPhoto[] {
	return photos.map(processPhoto);
}
