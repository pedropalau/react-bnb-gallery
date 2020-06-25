import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Main = ({
  children,
}) => (
  <div className="flex-1" role="main">
    {children}
  </div>
);

Main.propTypes = propTypes;

export default Main;
