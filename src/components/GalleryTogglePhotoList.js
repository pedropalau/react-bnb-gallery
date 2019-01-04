import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import defaultPhrases from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import noop from '../utils/noop';

const propTypes = {
  isOpened: PropTypes.bool,
  onPress: PropTypes.func,
  phrases: PropTypes.shape(getPhrasePropTypes(defaultPhrases)),
};

const defaultProps = {
  isOpened: true,
  onPress: noop,
  phrases: defaultPhrases,
};

const GalleryTogglePhotoList = ({
  isOpened,
  onPress,
  phrases: {
    showPhotoList:showLabel,
    hidePhotoList:hideLabel,
  }
}) => {
  const label = isOpened ? hideLabel : showLabel;
  const className = classnames(
    "gallery-thumbnails--toggle",
    isOpened ? "hide" : "open"
  );
  return (
    <button className={className} onClick={onPress}>
      {label}
    </button>
  );
};

GalleryTogglePhotoList.propTypes = propTypes;
GalleryTogglePhotoList.defaultProps = defaultProps;

export default GalleryTogglePhotoList;
