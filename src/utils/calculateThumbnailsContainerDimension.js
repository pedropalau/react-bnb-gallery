import { THUMBNAIL_WIDTH, THUMBNAIL_OFFSET } from '../constants';

export default (total) => (THUMBNAIL_WIDTH * total) + ((THUMBNAIL_OFFSET * total) - THUMBNAIL_OFFSET);
