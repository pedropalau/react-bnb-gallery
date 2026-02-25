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

export { LoadingSpinner };

/**
 * @deprecated Use named import instead: `import { LoadingSpinner } from './loading-spinner'`.
 * Default export will be removed in the next major version.
 */
export default LoadingSpinner;
