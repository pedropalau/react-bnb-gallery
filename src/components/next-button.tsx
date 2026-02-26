import { memo } from 'react';
import { Control } from './control';

const NEXT_ARROW =
	'm4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z';

/**
 * Props for the next-navigation control.
 */
interface NextButtonProps {
	onPress?: () => void;
	disabled?: boolean;
	light?: boolean;
}

/**
 * Renders the button that advances to the next photo.
 */
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

const MemoizedNextButton = memo(NextButton);

export { MemoizedNextButton as NextButton };

/**
 * @deprecated Use named import instead: `import { NextButton } from './next-button'`.
 * Default export will be removed in the next major version.
 */
export default MemoizedNextButton;
