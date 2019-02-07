import React from 'react';
import PropTypes from 'prop-types';

import { forbidExtraProps } from 'airbnb-prop-types';

import { units } from './utils';

const propTypes = forbidExtraProps({
  children: PropTypes.node,
  vertical: PropTypes.number,
  horizontal: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  top: PropTypes.number,
  bottom: PropTypes.number,
});

const defaultProps = {
  vertical: 0,
  horizontal: 0,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

const Spacing = ({
  children,
  vertical,
  horizontal,
  left,
  right,
  top,
  bottom,
}) => {
  let style = {};

  // left margin
  if (left || horizontal) {
    style.marginLeft = units(left || horizontal);
  }

  // right margin
  if (right || horizontal) {
    style.marginRight = units(right || horizontal);
  }

  // top margin
  if (top || vertical) {
    style.marginTop = units(top || vertical);
  }

  // bottom margin
  if (bottom || vertical) {
    style.marginBottom = units(bottom || vertical);
  }

  return (
    <div style={style}>
      {children}
    </div>
  );
};

Spacing.propTypes = propTypes;
Spacing.defaultProps = defaultProps;

export default Spacing;
