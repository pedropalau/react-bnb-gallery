import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';

/**
 * Props for the loading spinner placeholder.
 */
interface LoadingSpinnerProps extends ComponentPropsWithRef<'div'> {
	show?: boolean;
}

/**
 * Renders the gallery loading indicator.
 */
function LoadingSpinner({
	show = true,
	className,
	...props
}: LoadingSpinnerProps) {
	if (!show) {
		return null;
	}

	return <div {...props} className={clsx('loading-spinner', className)} />;
}

export { LoadingSpinner };
