import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import noop from '../utils/noop';

const svgAttributes = {
  viewBox: '0 0 18 18',
  role: 'presentation',
  focusable: false,
  'aria-hidden': true,
};

const propTypes = {
  arrow: PropTypes.string,
  onPress: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

const defaultProps = {
  arrow: null,
  onPress: noop,
  label: "",
  className: null,
  disabled: false,
};

const GalleryControl = ({
  arrow,
  onPress,
  label,
  className,
  disabled,
}) => (
  <button
    className={classnames("gallery-control", className)}
    onClick={onPress}
    disabled={disabled}
    aria-label={label}>
    <svg {...svgAttributes} style={{
      height: '2.8em',
      width: '2.8em',
      fill: 'rgb(255, 255, 255)'
    }}>
      <path d={arrow} fillRule="evenodd" />
    </svg>
  </button>
);

GalleryControl.propTypes = propTypes;
GalleryControl.defaultProps = defaultProps;

export default GalleryControl;
