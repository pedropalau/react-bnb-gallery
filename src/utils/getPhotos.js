import { defaultPhotoProps } from '../constants';

export function processPhoto(photo, index) {
  const props = typeof photo === 'string'
    ? { number: (index + 1), photo }
    : { ...photo, number: (index + 1) };

  return {
    ...defaultPhotoProps,
    ...props,
  };
}

export default function getPhotos(photos) {
  return photos.map(processPhoto);
}
