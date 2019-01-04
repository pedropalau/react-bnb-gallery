import { THUMBNAIL_WIDTH, THUMBNAIL_OFFSET } from '../constants';

export default (current, bounding, total) => {
  const offset = ((current * THUMBNAIL_WIDTH) + (current * THUMBNAIL_OFFSET)) - ((bounding.width / 2) - (THUMBNAIL_WIDTH / 2));
  return offset < 0 ? Math.abs(offset) : (offset * -1);
};
