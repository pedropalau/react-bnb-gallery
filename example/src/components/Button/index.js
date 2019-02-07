import React from 'react';
import PropTypes from 'prop-types';

import { forbidExtraProps } from 'airbnb-prop-types';
import classnames from 'classnames';

import './component.css';

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired,
  customStyle: PropTypes.object,
  large: PropTypes.bool,
  normal: PropTypes.bool,
  onPress: PropTypes.func,
  primary: PropTypes.bool,
  small: PropTypes.bool,
  secondary: PropTypes.bool,
  outline: PropTypes.bool,
  block: PropTypes.bool,
});

const defaultProps = {
  customStyle: null,
  large: false,
  normal: true,
  onPress: () => {},
  primary: true,
  small: false,
  secondary: false,
  outline: false,
  block: false,
};

const Button = ({
  children,
  customStyle,
  large,
  normal,
  onPress,
  primary,
  small,
  secondary,
  outline,
  block,
}) => (
  <button className={classnames(
    'button',
    // sizing
    normal && 'button_default',
    small && 'button_small',
    large && 'button__large',
    // color
    primary && 'button__primary',
    secondary && 'button__secondary',
    // styles
    outline && 'button__outline',
    block && 'button__block',
  )}
    onClick={onPress}
    style={customStyle}
    type="button">
    {children}
  </button>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
