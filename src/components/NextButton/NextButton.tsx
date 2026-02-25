import { memo } from 'react';
import Control from '../Control/Control';

const NEXT_ARROW =
	'm4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z';

interface NextButtonProps {
	onPress?: () => void;
	disabled?: boolean;
	light?: boolean;
}

function NextButton({
	onPress,
	disabled = false,
	light = false,
}: NextButtonProps) {
	return (
		<Control
			className="gallery-control--next"
			onPress={onPress}
			arrow={NEXT_ARROW}
			label="Next photo"
			disabled={disabled}
			light={light}
		/>
	);
}

export default memo(NextButton);
