import clsx from 'clsx';
import { memo } from 'react';
import { defaultPhrases } from '../default-phrases';
import type { GalleryControlButtonProps } from '../types/gallery';
import { Control } from './control';
import { useGalleryContext } from './gallery-context';

const NEXT_BUTTON_ARROW_PATH =
	'm4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z';

/**
 * Renders the button that advances to the next photo.
 */
function NextButton({
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
				'gallery-control--next',
				context?.classNames?.nextButton,
				className,
			)}
			onPress={onPress}
			arrow={NEXT_BUTTON_ARROW_PATH}
			label={phrases.nextPhoto}
			style={style || context?.styles?.nextButton}
			{...props}
		/>
	);
}

const MemoizedNextButton = memo(NextButton);

export { MemoizedNextButton as NextButton };
