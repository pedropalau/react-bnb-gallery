import { THUMBNAIL_OFFSET, THUMBNAIL_WIDTH } from '../constants';

export default function calculateThumbnailsContainerDimension(
	total: number,
): number {
	return (
		THUMBNAIL_WIDTH * total + (THUMBNAIL_OFFSET * total - THUMBNAIL_OFFSET)
	);
}
