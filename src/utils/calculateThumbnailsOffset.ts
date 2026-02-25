import { THUMBNAIL_OFFSET, THUMBNAIL_WIDTH } from '../constants';

interface Bounding {
	width: number;
}

export default function calculateThumbnailsOffset(
	current: number,
	bounding: Bounding,
): number {
	const half = bounding.width / 2 - THUMBNAIL_WIDTH / 2;
	const offset = current * THUMBNAIL_WIDTH + current * THUMBNAIL_OFFSET - half;
	return offset <= 0 ? Math.abs(offset) : offset * -1;
}
