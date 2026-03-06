import clsx from 'clsx';
import { memo } from 'react';
import { defaultPhrases } from '../default-phrases';
import type { GalleryTogglePhotoListComponentProps } from '../types/gallery';
import { useGalleryContext } from './gallery-context';

/**
 * Renders the text button that shows or hides the thumbnail strip.
 */
function TogglePhotoList({
	isOpened = true,
	onPress,
	phrases: phrasesProp,
	className,
	style,
	...props
}: GalleryTogglePhotoListComponentProps) {
	const context = useGalleryContext();
	const phrases = phrasesProp || context?.phrases || defaultPhrases;
	const { showPhotoList: showLabel, hidePhotoList: hideLabel } = phrases;

	const label = isOpened ? hideLabel : showLabel;

	return (
		<button
			type="button"
			className={clsx(
				'gallery-thumbnails--toggle',
				// Legacy aliases kept for 2.x compatibility; use `is-open` / `is-collapsed` going forward.
				isOpened ? 'hide' : 'open',
				isOpened ? 'is-open' : 'is-collapsed',
				context?.classNames?.togglePhotoList,
				className,
			)}
			style={style || context?.styles?.togglePhotoList}
			onClick={onPress}
			{...props}
		>
			{label}
		</button>
	);
}

const MemoizedTogglePhotoList = memo(TogglePhotoList);

export { MemoizedTogglePhotoList as TogglePhotoList };
