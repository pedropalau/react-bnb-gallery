import clsx from 'clsx';
import { memo } from 'react';
import { defaultPhrases } from '../default-phrases';
import type { GalleryControlButtonProps } from '../types/gallery';
import { Control } from './control';
import { useGalleryContext } from './gallery-context';

const PREV_BUTTON_ARROW_PATH = 'M15.75 19.5 8.25 12l7.5-7.5';

/**
 * Renders the button that navigates to the previous photo.
 */
function PrevButton({
	onPress,
	phrases: phrasesProp,
	className,
	style,
	...props
}: GalleryControlButtonProps) {
	const context = useGalleryContext();
	const phrases = phrasesProp || context?.phrases || defaultPhrases;

	return (
		<Control
			className={clsx(
				'gallery-control--prev',
				context?.classNames?.prevButton,
				className,
			)}
			onPress={onPress}
			arrow={PREV_BUTTON_ARROW_PATH}
			label={phrases.previousPhoto}
			style={style || context?.styles?.prevButton}
			{...props}
		/>
	);
}

const MemoizedPrevButton = memo(PrevButton);

export { MemoizedPrevButton as PrevButton };
