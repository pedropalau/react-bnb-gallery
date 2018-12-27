import { THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, THUMBNAIL_OFFSET } from '../constants';

export const noop = () => {};

export const calculateThumbnailsContainerDimension = (total) => (THUMBNAIL_WIDTH * total) + ((THUMBNAIL_OFFSET * total) - THUMBNAIL_OFFSET);

// @todo this needs work
export const calculateThumbnailOffset = (current, next, total, ref) => {
  return ((current * THUMBNAIL_WIDTH) + (current * THUMBNAIL_OFFSET)) * -1;
};
