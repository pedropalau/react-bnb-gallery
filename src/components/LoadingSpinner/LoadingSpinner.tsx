import PropTypes from 'prop-types';
import React from 'react';

import { forbidExtraProps } from '../../common/prop-types';

const propTypes = forbidExtraProps({
	show: PropTypes.bool,
});

interface LoadingSpinnerProps {
	show?: boolean;
}

const LoadingSpinner = ({ show = true }: LoadingSpinnerProps) =>
	show && <div className="loading-spinner" />;

LoadingSpinner.propTypes = propTypes;

export default LoadingSpinner;
