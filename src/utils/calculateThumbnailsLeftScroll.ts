import { THUMBNAIL_OFFSET, THUMBNAIL_WIDTH } from '../constants';
import calculateThumbnailsContainerDimension from './calculateThumbnailsContainerDimension';

interface Bounding {
	width: number;
}

/**
 * Calculates the horizontal scroll offset (as a negative CSS `left` value) needed
 * to keep the active thumbnail centered within the thumbnail strip.
 *
 * The scroll is clamped so that:
 * - It never scrolls before the beginning of the strip (returns `0` when the
 *   active thumbnail is near the start).
 * - It never scrolls past the end of the strip (snaps to the maximum scroll
 *   position when fewer than half a row of thumbnails remain after the active one).
 * - Otherwise it centers the active thumbnail within the visible area.
 *
 * @param current - Zero-based index of the currently active thumbnail.
 * @param total - Total number of thumbnails in the strip.
 * @param bounding - The bounding dimensions of the visible thumbnail container.
 * @param bounding.width - Width of the visible container in pixels.
 * @returns A negative pixel offset to apply as the `left` CSS property, or `0`
 *   when no scrolling is needed.
 */
export default function calculateThumbnailsLeftScroll(
	current: number,
	total: number,
	bounding: Bounding,
): number {
	const half = bounding.width / 2 - THUMBNAIL_WIDTH / 2;
	const thumbnailsOffset =
		current * THUMBNAIL_WIDTH + current * THUMBNAIL_OFFSET - half;
	let calculatedScrollLeft = 0;

	if (thumbnailsOffset < 0) {
		return calculatedScrollLeft;
	}

	const thumbnailsPerRow =
		bounding.width / (THUMBNAIL_WIDTH + THUMBNAIL_OFFSET);
	const thumbnailsHalf = Math.round(thumbnailsPerRow / 2);
	const thumbnailsLeft = total - (current + 1);

	if (thumbnailsLeft < thumbnailsHalf) {
		calculatedScrollLeft =
			calculateThumbnailsContainerDimension(total) - bounding.width;
	} else {
		calculatedScrollLeft = thumbnailsOffset;
	}

	return -Math.abs(calculatedScrollLeft);
}
