import { memo } from 'react';
import Control from './control';

const PREV_ARROW =
	'm13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z';

/**
 * Props for the previous-navigation control.
 */
interface PrevButtonProps {
	onPress?: () => void;
	disabled?: boolean;
	light?: boolean;
}

/**
 * Renders the button that navigates to the previous photo.
 */
function PrevButton({
	onPress,
	disabled = false,
	light = false,
}: PrevButtonProps) {
	return (
		<Control
			className="gallery-control--prev"
			onPress={onPress}
			arrow={PREV_ARROW}
			label="Previous photo"
			disabled={disabled}
			light={light}
		/>
	);
}

export default memo(PrevButton);
