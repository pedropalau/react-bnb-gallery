import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import classnames from 'classnames';

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired,
  url: PropTypes.string,
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
  url: null,
  customStyle: null,
  large: false,
  normal: true,
  onPress: () => {},
  primary: false,
  small: false,
  secondary: false,
  outline: false,
  block: false,
};

const Button = ({
  children,
  url,
  customStyle,
  large,
  normal,
  onPress,
  primary,
  small,
  secondary,
  outline,
  block,
}) => {
  let ComponentName, props = {};
  if (url) {
    ComponentName = 'a';
    props = { href: url };
  } else {
    ComponentName = 'button';
  }

  return (
    <ComponentName {...props} className={classnames(
      'button',
      // sizing
      (normal && (!primary || !secondary)) && 'button__default',
      small && 'button__small',
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
    </ComponentName>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
