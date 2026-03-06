import clsx from 'clsx';
import type { ComponentPropsWithRef } from 'react';
import { memo } from 'react';

const controlStyle = {
	height: '2.8em',
	width: '2.8em',
};

/**
 * Shared arrow-control button props used by previous/next controls.
 */
interface ControlProps {
	arrow?: string | null;
	onPress?: () => void;
	label?: string;
}

type ControlButtonProps = Omit<ComponentPropsWithRef<'button'>, 'onClick'>;
type ControlMergedProps = ControlProps & ControlButtonProps;

/**
 * Renders a reusable SVG arrow button for gallery navigation.
 */
function Control({
	arrow = null,
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
			aria-label={label}
			style={style}
			{...props}
		>
			<svg
				viewBox="0 0 18 18"
				role="presentation"
				focusable="false"
				aria-hidden="true"
				className="gallery-control-icon"
				style={controlStyle}
			>
				<path d={arrow || ''} fillRule="evenodd" />
			</svg>
		</button>
	);
}

const MemoizedControl = memo(Control);

export { MemoizedControl as Control };
