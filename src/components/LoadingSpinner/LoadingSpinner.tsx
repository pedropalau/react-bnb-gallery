import React from 'react';
import PropTypes from 'prop-types';

import { forbidExtraProps } from '../../common/prop-types';

const propTypes = forbidExtraProps({
  show: PropTypes.bool,
});

const defaultProps = {
  show: true,
};

interface LoadingSpinnerProps {
  show?: boolean;
}

const LoadingSpinner = ({ show = true }: LoadingSpinnerProps) => (show && (
  <div className="loading-spinner" />
));

LoadingSpinner.propTypes = propTypes;
LoadingSpinner.defaultProps = defaultProps;

export default LoadingSpinner;
