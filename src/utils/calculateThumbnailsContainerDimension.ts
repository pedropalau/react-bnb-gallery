import { THUMBNAIL_OFFSET, THUMBNAIL_WIDTH } from '../constants';

/**
 * Calculates the total width of the thumbnails container based on the number of thumbnails.
 *
 * The container width accounts for each thumbnail's width plus the gaps between them.
 * Gaps are applied between thumbnails only (not after the last one), so there are
 * `total - 1` offsets.
 *
 * Formula: `THUMBNAIL_WIDTH * total + THUMBNAIL_OFFSET * (total - 1)`
 *
 * @param total - The number of thumbnails to display.
 * @returns The total width in pixels for the thumbnails container.
 */
export default function calculateThumbnailsContainerDimension(
	total: number,
): number {
	return (
		THUMBNAIL_WIDTH * total + (THUMBNAIL_OFFSET * total - THUMBNAIL_OFFSET)
	);
}
