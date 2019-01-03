import {
  THUMBNAIL_WIDTH,
  THUMBNAIL_HEIGHT,
  THUMBNAIL_OFFSET
} from '../constants';

export const noop = () => {};

export const calculateThumbnailsContainerDimension = (total) => (THUMBNAIL_WIDTH * total) + ((THUMBNAIL_OFFSET * total) - THUMBNAIL_OFFSET);

// @todo this needs work
export const calculateThumbnailOffset = (current, left, width, total) => {
  let offset = 0;
  const thumbnailsVisible = width / (THUMBNAIL_WIDTH + THUMBNAIL_OFFSET);
  const half = thumbnailsVisible / 2;
  const realIndex = current + 1;

  // do not move the container
  if (current <= half) {
    return offset;
  }

  offset = (width / 2) - ((realIndex * THUMBNAIL_WIDTH) + ((current - half) * THUMBNAIL_OFFSET) - (THUMBNAIL_OFFSET / 2));

  if ((total - current) <= Math.round(half)) {
    offset = offset + (((current * THUMBNAIL_WIDTH) - (current * (THUMBNAIL_OFFSET * 2))) + offset);
    if (Math.abs(offset) > width) {
      offset = -1 * (width - (THUMBNAIL_OFFSET * half) * 2);
    }
  }

  return offset;
};
