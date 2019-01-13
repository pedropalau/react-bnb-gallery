import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Container = ({
  children,
  ...rest
}) => (
  <div {...rest}>
    {children}
  </div>
);

Container.propTypes = propTypes;

export default Container;
