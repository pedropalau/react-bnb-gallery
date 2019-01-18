import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  show: PropTypes.bool,
};

const defaultProps = {
  show: true,
};

const LoadingSpinner = ({ show }) => (show && (
  <div className="loading-spinner" />
));

LoadingSpinner.propTypes = propTypes;
LoadingSpinner.defaultProps = defaultProps;

export default LoadingSpinner;
