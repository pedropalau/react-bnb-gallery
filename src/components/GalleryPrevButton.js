import React from 'react';
import PropTypes from 'prop-types';

import GalleryControl from './GalleryControl';

import noop from '../utils/noop';

const PREV_ARROW = 'm13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z';

const propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

const defaultProps = {
  onPress: noop,
  disabled: false,
};

const GalleryPrevButton = ({
  onPress,
  disabled,
}) => (
  <GalleryControl
    className="gallery-control--prev"
    onPress={onPress}
    arrow={PREV_ARROW}
    disabled={disabled}
  />
);

GalleryPrevButton.propTypes = propTypes;
GalleryPrevButton.defaultProps = defaultProps;

export default GalleryPrevButton;
