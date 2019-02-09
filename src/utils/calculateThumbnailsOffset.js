import {
  THUMBNAIL_WIDTH,
  THUMBNAIL_OFFSET,
} from '../constants';

export default function calculateThumbnailsOffset(current, bounding) {
  const half = (bounding.width / 2) - (THUMBNAIL_WIDTH / 2);
  const offset = ((current * THUMBNAIL_WIDTH) + (current * THUMBNAIL_OFFSET)) - half;
  return offset <= 0 ? Math.abs(offset) : (offset * -1);
}
