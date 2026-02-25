import { THUMBNAIL_OFFSET, THUMBNAIL_WIDTH } from '../constants';
import calculateThumbnailsContainerDimension from './calculateThumbnailsContainerDimension';

interface Bounding {
	width: number;
}

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
