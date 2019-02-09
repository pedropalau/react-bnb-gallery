import noop from '../utils/noop';
import defaultPhrases from '../defaultPhrases';

import { FORWARDS } from '../constants';

export default {
  activePhotoIndex: 0,
  activePhotoPressed: noop,
  direction: FORWARDS,
  nextButtonPressed: noop,
  prevButtonPressed: noop,
  showThumbnails: true,
  photos: [],
  preloadSize: 5,
  wrap: false,
  phrases: defaultPhrases,
  light: false,
};
