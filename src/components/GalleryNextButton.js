import React from 'react';
import PropTypes from 'prop-types';

import GalleryControl from './GalleryControl';

import noop from '../utils/noop';

const NEXT_ARROW = 'm4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z';

const propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

const defaultProps = {
  onPress: noop,
  disabled: false,
};

const GalleryNextButton = ({
  onPress,
  disabled,
}) => (
  <GalleryControl
    className="gallery-control--next"
    onPress={onPress}
    arrow={NEXT_ARROW}
    disabled={disabled}
  />
);

GalleryNextButton.propTypes = propTypes;
GalleryNextButton.defaultProps = defaultProps;

export default GalleryNextButton;
