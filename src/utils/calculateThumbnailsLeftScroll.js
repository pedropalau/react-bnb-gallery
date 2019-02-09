import {
  THUMBNAIL_WIDTH,
  THUMBNAIL_OFFSET,
} from '../constants';

export default function calculateThumbnailsLeftScroll(current, total, bounding) {
  const half = (bounding.width / 2) - (THUMBNAIL_WIDTH / 2);
  const thumbnailsOffset = ((current * THUMBNAIL_WIDTH) + (current * THUMBNAIL_OFFSET)) - half;
  // const thumbnailsPerRow = bounding.width / (THUMBNAIL_WIDTH + THUMBNAIL_OFFSET);
  // const thumbnailsHalf = Math.round(thumbnailsPerRow / 2);
  // const thumbnailsLeft = total - (current + 1);

  if (thumbnailsOffset < 0) {
    return 0;
  }

  return -1 * thumbnailsOffset;
}
