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
}: GalleryTogglePhotoListComponentProps) {
	const { showPhotoList: showLabel, hidePhotoList: hideLabel } = phrases;
	const label = isOpened ? hideLabel : showLabel;
	const className = clsx(
		'gallery-thumbnails--toggle',
		// Legacy aliases kept for 2.x compatibility; use `is-open` / `is-collapsed` going forward.
		isOpened ? 'hide' : 'open',
		isOpened ? 'is-open' : 'is-collapsed',
	);

	return (
		<button type="button" className={className} onClick={onPress}>
			{label}
		</button>
	);
}

const MemoizedTogglePhotoList = memo(TogglePhotoList);

export { MemoizedTogglePhotoList as TogglePhotoList };
