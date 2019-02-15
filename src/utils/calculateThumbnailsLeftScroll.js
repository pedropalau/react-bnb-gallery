import calculateThumbnailsContainerDimension from './calculateThumbnailsContainerDimension';

import {
  THUMBNAIL_WIDTH,
  THUMBNAIL_OFFSET,
} from '../constants';

export default function calculateThumbnailsLeftScroll(current, total, bounding) {
  const half = (bounding.width / 2) - (THUMBNAIL_WIDTH / 2);
  const thumbnailsOffset = ((current * THUMBNAIL_WIDTH) + (current * THUMBNAIL_OFFSET)) - half;
  let calculatedScrollLeft = 0;

  if (thumbnailsOffset < 0) {
    return calculatedScrollLeft;
  }

  const thumbnailsPerRow = bounding.width / (THUMBNAIL_WIDTH + THUMBNAIL_OFFSET);
  const thumbnailsHalf = Math.round(thumbnailsPerRow / 2);
  const thumbnailsLeft = total - (current + 1);

  if (thumbnailsLeft < thumbnailsHalf) {
    calculatedScrollLeft = calculateThumbnailsContainerDimension(total) - bounding.width;
  } else {
    calculatedScrollLeft = thumbnailsOffset;
  }

  return -Math.abs(calculatedScrollLeft);
}
