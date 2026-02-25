/**
 * Props for the loading spinner placeholder.
 */
interface LoadingSpinnerProps {
	show?: boolean;
}

/**
 * Renders the gallery loading indicator.
 */
function LoadingSpinner({ show = true }: LoadingSpinnerProps) {
	if (!show) {
		return null;
	}

	return <div className="loading-spinner" />;
}

export default LoadingSpinner;
