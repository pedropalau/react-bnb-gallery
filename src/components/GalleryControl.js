import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { forbidExtraProps } from '../common/prop-types';
import noop from '../utils/noop';

import {
  NORMAL_COLOR,
  INVERSE_COLOR,
} from '../constants';

const svgAttributes = {
  viewBox: '0 0 18 18',
  role: 'presentation',
  focusable: false,
  'aria-hidden': true,
};

const controlStyle = {
  height: '2.8em',
  width: '2.8em',
  fill: NORMAL_COLOR,
};

const controlStyleLight = {
  fill: INVERSE_COLOR,
};

const propTypes = forbidExtraProps({
  arrow: PropTypes.string,
  onPress: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  light: PropTypes.bool,
});

const defaultProps = {
  arrow: null,
  onPress: noop,
  label: '',
  className: null,
  disabled: false,
  light: false,
};

class GalleryControl extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress() {
    const { onPress } = this.props;
    onPress();
    return false;
  }

  render() {
    const {
      arrow,
      label,
      className,
      disabled,
      light,
    } = this.props;

    return (
      <button
        type="button"
        className={classnames('gallery-control', className)}
        onClick={this.onButtonPress}
        disabled={disabled}
        aria-label={label}
      >
        <svg
          {...svgAttributes}
          style={{
            ...controlStyle,
            ...(light && controlStyleLight),
          }}
        >
          <path
            d={arrow}
            fillRule="evenodd"
          />
        </svg>
      </button>
    );
  }
}

GalleryControl.propTypes = propTypes;
GalleryControl.defaultProps = defaultProps;

export default GalleryControl;
