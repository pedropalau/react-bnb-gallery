import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { noop } from '../utils/functions';
import { SHOW_PHOTO_LIST_LABEL, HIDE_PHOTO_LIST_LABEL } from '../constants';

const propTypes = {
  isOpened: PropTypes.bool,
  hideLabel: PropTypes.string,
  showLabel: PropTypes.string,
  onPress: PropTypes.func,
};

const defaultProps = {
  isOpened: true,
  hideLabel: HIDE_PHOTO_LIST_LABEL,
  showLabel: SHOW_PHOTO_LIST_LABEL,
  onPress: noop,
};

const GalleryTogglePhotoList = ({
  isOpened,
  hideLabel,
  showLabel,
  onPress,
}) => {
  const label = isOpened ? hideLabel : showLabel;
  const className = classnames(
    "gallery-thumbnails--toggle",
    isOpened ? "hide" : "open"
  );
  return (
    <button className={className} onClick={onPress}>{label}</button>
  );
};

GalleryTogglePhotoList.propTypes = propTypes;
GalleryTogglePhotoList.defaultProps = defaultProps;

export default GalleryTogglePhotoList;
