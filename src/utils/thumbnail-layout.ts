import {
	THUMBNAIL_BORDER_WIDTH,
	THUMBNAIL_OFFSET,
	THUMBNAIL_WIDTH,
} from '../constants';

interface Bounding {
	width: number;
}

const THUMBNAIL_FRAME_WIDTH = THUMBNAIL_WIDTH + THUMBNAIL_BORDER_WIDTH * 2;
const THUMBNAIL_STEP = THUMBNAIL_FRAME_WIDTH + THUMBNAIL_OFFSET;
const THUMBNAIL_VIEWPORT_INSET = THUMBNAIL_BORDER_WIDTH * 2;

/**
 * Calculates the total width of the thumbnails container based on the number of thumbnails.
 *
 * Formula: `THUMBNAIL_FRAME_WIDTH * total + THUMBNAIL_OFFSET * (total - 1)`.
 *
 * @param total - The number of thumbnails to display.
 * @returns The total width in pixels for the thumbnails container.
 */
export function calculateThumbnailsContainerDimension(total: number): number {
	return (
		THUMBNAIL_FRAME_WIDTH * total +
		(THUMBNAIL_OFFSET * total - THUMBNAIL_OFFSET)
	);
}

/**
 * Calculates the CSS translation offset needed to center the active thumbnail
 * within the thumbnails container.
 *
 * @param current - Zero-based index of the active thumbnail.
 * @param bounding - The bounding rect of the thumbnails container (only `width` is used).
 * @returns The translation offset in pixels (negative = shift left, positive = shift right).
 */
export function calculateThumbnailsOffset(
	current: number,
	bounding: Bounding,
): number {
	const half = bounding.width / 2 - THUMBNAIL_FRAME_WIDTH / 2;
	const offset = current * THUMBNAIL_STEP - half;
	return offset <= 0 ? Math.abs(offset) : offset * -1;
}

/**
 * Calculates the horizontal scroll offset (as a negative CSS `left` value) needed
 * to keep the active thumbnail centered within the thumbnail strip.
 *
 * @param current - Zero-based index of the currently active thumbnail.
 * @param total - Total number of thumbnails in the strip.
 * @param bounding - The bounding dimensions of the visible thumbnail container.
 * @returns A negative pixel offset to apply as the `left` CSS property, or `0`
 *   when no scrolling is needed.
 */
export function calculateThumbnailsLeftScroll(
	current: number,
	total: number,
	bounding: Bounding,
): number {
	const half = bounding.width / 2 - THUMBNAIL_FRAME_WIDTH / 2;
	const thumbnailsOffset = current * THUMBNAIL_STEP - half;
	let calculatedScrollLeft = 0;

	if (thumbnailsOffset < 0) {
		return calculatedScrollLeft;
	}

	const thumbnailsPerRow = bounding.width / THUMBNAIL_STEP;
	const thumbnailsHalf = Math.round(thumbnailsPerRow / 2);
	const thumbnailsLeft = total - (current + 1);

	if (thumbnailsLeft < thumbnailsHalf) {
		calculatedScrollLeft =
			calculateThumbnailsContainerDimension(total) -
			(bounding.width + THUMBNAIL_VIEWPORT_INSET);
	} else {
		calculatedScrollLeft = thumbnailsOffset;
	}

	return -Math.abs(calculatedScrollLeft);
}
