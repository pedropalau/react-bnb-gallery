import {
  THUMBNAIL_WIDTH,
  THUMBNAIL_HEIGHT,
  THUMBNAIL_OFFSET
} from '../constants';

export const noop = () => {};

export const calculateThumbnailsContainerDimension = (total) => (THUMBNAIL_WIDTH * total) + ((THUMBNAIL_OFFSET * total) - THUMBNAIL_OFFSET);

export const calculateThumbnailOffset = (current, bounding, total) => {
  const offset = ((current * THUMBNAIL_WIDTH) + (current * THUMBNAIL_OFFSET)) - ((bounding.width / 2) - (THUMBNAIL_WIDTH / 2));
  return offset < 0 ? Math.abs(offset) : (offset * -1);
}
