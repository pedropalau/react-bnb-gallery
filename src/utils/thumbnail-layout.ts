interface Bounding {
	width: number;
}

export interface ThumbnailLayoutDimensions {
	thumbnailFrameWidth?: number;
	thumbnailStep?: number;
	thumbnailViewportInset?: number;
}

const DEFAULT_THUMBNAIL_FRAME_WIDTH = 66;
const DEFAULT_THUMBNAIL_STEP = 74;
const DEFAULT_THUMBNAIL_VIEWPORT_INSET = 8;

function resolveLayoutDimensions(
	layoutDimensions?: ThumbnailLayoutDimensions,
): Required<ThumbnailLayoutDimensions> {
	return {
		thumbnailFrameWidth:
			layoutDimensions?.thumbnailFrameWidth ?? DEFAULT_THUMBNAIL_FRAME_WIDTH,
		thumbnailStep: layoutDimensions?.thumbnailStep ?? DEFAULT_THUMBNAIL_STEP,
		thumbnailViewportInset:
			layoutDimensions?.thumbnailViewportInset ??
			DEFAULT_THUMBNAIL_VIEWPORT_INSET,
	};
}

/**
 * Calculates the total width of the thumbnails container based on the number of thumbnails.
 *
 * Formula: `thumbnailFrameWidth + thumbnailStep * (total - 1)`.
 *
 * @param total - The number of thumbnails to display.
 * @param layoutDimensions - Optional measured thumbnail layout dimensions.
 * @returns The total width in pixels for the thumbnails container.
 */
export function calculateThumbnailsContainerDimension(
	total: number,
	layoutDimensions?: ThumbnailLayoutDimensions,
): number {
	if (total <= 0) {
		return 0;
	}

	const { thumbnailFrameWidth, thumbnailStep } =
		resolveLayoutDimensions(layoutDimensions);
	return thumbnailFrameWidth + thumbnailStep * (total - 1);
}

/**
 * Calculates the CSS translation offset needed to center the active thumbnail
 * within the thumbnails container.
 *
 * @param current - Zero-based index of the active thumbnail.
 * @param bounding - The bounding rect of the thumbnails container (only `width` is used).
 * @param layoutDimensions - Optional measured thumbnail layout dimensions.
 * @returns The translation offset in pixels (negative = shift left, positive = shift right).
 */
export function calculateThumbnailsOffset(
	current: number,
	bounding: Bounding,
	layoutDimensions?: ThumbnailLayoutDimensions,
): number {
	const { thumbnailFrameWidth, thumbnailStep } =
		resolveLayoutDimensions(layoutDimensions);
	const half = bounding.width / 2 - thumbnailFrameWidth / 2;
	const offset = current * thumbnailStep - half;
	return offset <= 0 ? Math.abs(offset) : offset * -1;
}

/**
 * Calculates the horizontal scroll offset (as a negative CSS `left` value) needed
 * to keep the active thumbnail centered within the thumbnail strip.
 *
 * @param current - Zero-based index of the currently active thumbnail.
 * @param total - Total number of thumbnails in the strip.
 * @param bounding - The bounding dimensions of the visible thumbnail container.
 * @param layoutDimensions - Optional measured thumbnail layout dimensions.
 * @returns A negative pixel offset to apply as the `left` CSS property, or `0`
 *   when no scrolling is needed.
 */
export function calculateThumbnailsLeftScroll(
	current: number,
	total: number,
	bounding: Bounding,
	layoutDimensions?: ThumbnailLayoutDimensions,
): number {
	const { thumbnailFrameWidth, thumbnailStep, thumbnailViewportInset } =
		resolveLayoutDimensions(layoutDimensions);
	const half = bounding.width / 2 - thumbnailFrameWidth / 2;
	const thumbnailsOffset = current * thumbnailStep - half;
	let calculatedScrollLeft = 0;

	if (thumbnailsOffset < 0) {
		return calculatedScrollLeft;
	}

	const thumbnailsPerRow = bounding.width / thumbnailStep;
	const thumbnailsHalf = Math.round(thumbnailsPerRow / 2);
	const thumbnailsLeft = total - (current + 1);

	if (thumbnailsLeft < thumbnailsHalf) {
		calculatedScrollLeft =
			calculateThumbnailsContainerDimension(total, layoutDimensions) -
			(bounding.width + thumbnailViewportInset);
	} else {
		calculatedScrollLeft = thumbnailsOffset;
	}

	return -Math.abs(calculatedScrollLeft);
}
