import clsx from 'clsx';
import { memo } from 'react';
import { defaultPhrases } from '../default-phrases';
import type { GalleryControlButtonProps } from '../types/gallery';
import { Control } from './control';

const NEXT_ARROW =
	'm4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z';

/**
 * Renders the button that advances to the next photo.
 */
function NextButton({
	onPress,
	disabled = false,
	light = false,
	phrases = defaultPhrases,
	className,
	style,
	...props
}: GalleryControlButtonProps) {
	return (
		<Control
			{...props}
			className={clsx('gallery-control--next', className)}
			onPress={onPress}
			arrow={NEXT_ARROW}
			label={phrases.nextPhoto}
			disabled={disabled}
			light={light}
			style={style}
		/>
	);
}

const MemoizedNextButton = memo(NextButton);

export { MemoizedNextButton as NextButton };
