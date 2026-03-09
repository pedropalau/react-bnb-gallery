import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';
import { memo } from 'react';

/**
 * Shared arrow-control button props used by previous/next controls.
 */
interface ControlProps {
	arrow?: string;
	onPress?: () => void;
	label?: string;
}

type ControlButtonProps = Omit<ComponentPropsWithRef<'button'>, 'onClick'>;
type ControlMergedProps = ControlProps & ControlButtonProps;

/**
 * Renders a reusable SVG arrow button for gallery navigation.
 */
function Control({
	arrow = '',
	onPress,
	label = '',
	className,
	style,
	...props
}: ControlMergedProps) {
	return (
		<button
			type="button"
			className={clsx('gallery-control', className)}
			onClick={onPress}
			aria-label={label || undefined}
			style={style}
			{...props}
		>
			<span className="gallery-control-surface" aria-hidden="true">
				<svg
					viewBox="0 0 24 24"
					aria-hidden="true"
					className="gallery-control-icon"
					strokeWidth={2}
					stroke="currentColor"
					fill="none"
				>
					<path d={arrow} strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</span>
		</button>
	);
}

const MemoizedControl = memo(Control);

export { MemoizedControl as Control };
