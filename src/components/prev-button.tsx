import clsx from 'clsx';
import { memo } from 'react';
import { PREV_BUTTON_ARROW_PATH } from '../constants';
import { defaultPhrases } from '../default-phrases';
import type { GalleryControlButtonProps } from '../types/gallery';
import { Control } from './control';
import { useGalleryContext } from './gallery-context';

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
