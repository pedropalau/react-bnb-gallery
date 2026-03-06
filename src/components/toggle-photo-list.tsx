import clsx from 'clsx';
import { memo } from 'react';
import { defaultPhrases } from '../default-phrases';
import type { GalleryTogglePhotoListComponentProps } from '../types/gallery';

/**
 * Renders the text button that shows or hides the thumbnail strip.
 */
function TogglePhotoList({
	isOpened = true,
	onPress,
	phrases = defaultPhrases,
	className,
	style,
}: GalleryTogglePhotoListComponentProps) {
	const { showPhotoList: showLabel, hidePhotoList: hideLabel } = phrases;
	const label = isOpened ? hideLabel : showLabel;
	const toggleClassName = clsx(
		'gallery-thumbnails--toggle',
		// Legacy aliases kept for 2.x compatibility; use `is-open` / `is-collapsed` going forward.
		isOpened ? 'hide' : 'open',
		isOpened ? 'is-open' : 'is-collapsed',
		className,
	);

	return (
		<button
			type="button"
			className={toggleClassName}
			onClick={onPress}
			style={style}
		>
			{label}
		</button>
	);
}

const MemoizedTogglePhotoList = memo(TogglePhotoList);

export { MemoizedTogglePhotoList as TogglePhotoList };
