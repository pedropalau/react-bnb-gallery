import PropTypes from 'prop-types';

import {
  forbidExtraProps,
  nonNegativeInteger,
} from './prop-types';

import SlideDirectionShape from '../shapes/SlideDirectionShape';
import PhotosShape from '../shapes/PhotosShape';

import defaultPhrases from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

export default forbidExtraProps({
  activePhotoIndex: nonNegativeInteger,
  activePhotoPressed: PropTypes.func,
  direction: SlideDirectionShape,
  nextButtonPressed: PropTypes.func,
  prevButtonPressed: PropTypes.func,
  showThumbnails: PropTypes.bool,
  photos: PhotosShape,
  preloadSize: nonNegativeInteger,
  wrap: PropTypes.bool,
  phrases: PropTypes.shape(getPhrasePropTypes(defaultPhrases)),
  light: PropTypes.bool,
  backgroundColor: PropTypes.string,
});
