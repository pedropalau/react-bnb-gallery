import React from 'react';
import PropTypes from 'prop-types';

import { forbidExtraProps } from 'airbnb-prop-types';
import classnames from 'classnames';

const propTypes = forbidExtraProps({
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  inherit: PropTypes.bool,
});

const defaultProps = {
  className: null,
  inherit: false,
};

const Text = ({
  className,
  children,
  inherit,
}) => (
  <p className={classnames('text', inherit && 'text__inherit', className)}>
    {children}
  </p>
);

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
