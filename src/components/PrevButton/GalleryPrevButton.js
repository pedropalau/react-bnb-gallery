import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import GalleryControl from './GalleryControl';

import { forbidExtraProps } from '../common/prop-types';
import noop from '../utils/noop';

const PREV_ARROW = 'm13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z';

const propTypes = forbidExtraProps({
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  light: PropTypes.bool,
});

const defaultProps = {
  onPress: noop,
  disabled: false,
  light: false,
};

class GalleryPrevButton extends PureComponent {
  render() {
    const {
      onPress,
      disabled,
      light,
    } = this.props;

    return (
      <GalleryControl
        className="gallery-control--prev"
        onPress={onPress}
        arrow={PREV_ARROW}
        disabled={disabled}
        light={light}
      />
    );
  }
}

GalleryPrevButton.propTypes = propTypes;
GalleryPrevButton.defaultProps = defaultProps;

export default GalleryPrevButton;
