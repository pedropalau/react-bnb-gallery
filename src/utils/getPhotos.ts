import { defaultPhotoProps, type PhotoProps } from '../constants';

export function processPhoto(photo: string | PhotoProps, index: number): PhotoProps {
  const props = typeof photo === 'string'
    ? { number: (index + 1), photo }
    : { ...photo, number: (index + 1) };

  return {
    ...defaultPhotoProps,
    ...props,
  };
}

export default function getPhotos(photos: string | PhotoProps | Array<string | PhotoProps>): PhotoProps[] {
  const photosToProcess = Array.isArray(photos) ? photos : [photos];
  return photosToProcess.map(processPhoto);
}
