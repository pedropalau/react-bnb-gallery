import classnames from 'classnames';
import { memo, useCallback } from 'react';

import { INVERSE_COLOR, NORMAL_COLOR } from '../constants';

const controlStyle = {
	height: '2.8em',
	width: '2.8em',
	fill: NORMAL_COLOR,
};

const controlStyleLight = {
	fill: INVERSE_COLOR,
};

/**
 * Shared arrow-control button props used by previous/next controls.
 */
interface ControlProps {
	arrow?: string | null;
	onPress?: () => void;
	label?: string;
	className?: string | null;
	disabled?: boolean;
	light?: boolean;
}

/**
 * Renders a reusable SVG arrow button for gallery navigation.
 */
function Control({
	arrow = null,
	onPress,
	label = '',
	className = null,
	disabled = false,
	light = false,
}: ControlProps) {
	const onButtonPress = useCallback(() => {
		onPress?.();
	}, [onPress]);

	return (
		<button
			type="button"
			className={classnames('gallery-control', className)}
			onClick={onButtonPress}
			disabled={disabled}
			aria-label={label}
		>
			<svg
				viewBox="0 0 18 18"
				role="presentation"
				focusable="false"
				aria-hidden="true"
				style={{
					...controlStyle,
					...(light && controlStyleLight),
				}}
			>
				<path d={arrow || ''} fillRule="evenodd" />
			</svg>
		</button>
	);
}

export default memo(Control);
