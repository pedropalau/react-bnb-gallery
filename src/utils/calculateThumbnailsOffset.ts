import { THUMBNAIL_OFFSET, THUMBNAIL_WIDTH } from '../constants';

interface Bounding {
	width: number;
}

/**
 * Calculates the CSS translation offset needed to center the active thumbnail
 * within the thumbnails container.
 *
 * The offset is computed by finding the pixel position of the current thumbnail
 * and subtracting half the container width so the thumbnail lands in the middle.
 * The result is negated because the offset is applied as a leftward translation.
 *
 * @param current - Zero-based index of the active thumbnail.
 * @param bounding - The bounding rect of the thumbnails container (only `width` is used).
 * @returns The translation offset in pixels (negative = shift left, positive = shift right).
 */
export default function calculateThumbnailsOffset(
	current: number,
	bounding: Bounding,
): number {
	const half = bounding.width / 2 - THUMBNAIL_WIDTH / 2;
	const offset = current * THUMBNAIL_WIDTH + current * THUMBNAIL_OFFSET - half;
	return offset <= 0 ? Math.abs(offset) : offset * -1;
}
