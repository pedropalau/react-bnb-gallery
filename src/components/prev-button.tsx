import clsx from 'clsx';
import { memo } from 'react';
import { defaultPhrases } from '../default-phrases';
import type { GalleryControlButtonProps } from '../types/gallery';
import { Control } from './control';

const PREV_ARROW =
	'm13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z';

/**
 * Renders the button that navigates to the previous photo.
 */
function PrevButton({
	onPress,
	disabled = false,
	phrases = defaultPhrases,
	className,
	style,
	...props
}: GalleryControlButtonProps) {
	return (
		<Control
			{...props}
			className={clsx('gallery-control--prev', className)}
			onPress={onPress}
			arrow={PREV_ARROW}
			label={phrases.previousPhoto}
			disabled={disabled}
			style={style}
		/>
	);
}

const MemoizedPrevButton = memo(PrevButton);

export { MemoizedPrevButton as PrevButton };
