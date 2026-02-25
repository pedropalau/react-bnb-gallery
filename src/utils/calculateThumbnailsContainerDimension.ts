import {
  THUMBNAIL_WIDTH,
  THUMBNAIL_OFFSET,
} from '../constants';

export default function calculateThumbnailsContainerDimension(total: number): number {
  return (THUMBNAIL_WIDTH * total) + ((THUMBNAIL_OFFSET * total) - THUMBNAIL_OFFSET);
}
