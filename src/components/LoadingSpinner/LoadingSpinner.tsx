interface LoadingSpinnerProps {
	show?: boolean;
}

function LoadingSpinner({ show = true }: LoadingSpinnerProps) {
	if (!show) {
		return null;
	}

	return <div className="loading-spinner" />;
}

export default LoadingSpinner;
