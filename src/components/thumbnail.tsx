import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { memo } from 'react';
import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from '../constants';
import type { GalleryThumbnailComponentProps } from '../types/gallery';
import { getCaptionText } from '../utils/get-caption-text';
import { Image } from './image';

const thumbnailStyle = {
	width: THUMBNAIL_WIDTH,
	height: THUMBNAIL_HEIGHT,
};

/**
 * Renders a clickable thumbnail for selecting a photo by index.
 */
function Thumbnail({
	active = false,
	photo = null,
	onPress,
	number = 0,
	className,
	imageClassName,
	imageStyle,
	...props
}: GalleryThumbnailComponentProps) {
	if (!photo) {
		return null;
	}

	const captionText = getCaptionText(photo.caption);
	const thumbnailImageStyle = {
		...thumbnailStyle,
		...(imageStyle || {}),
	} satisfies CSSProperties;

	return (
		<button
			type="button"
			aria-label={captionText || undefined}
			className={clsx(
				'thumbnail-button',
				'gallery-thumbnail-button',
				// Legacy alias kept for 2.x compatibility; use `is-active` going forward.
				active && 'active',
				active && 'is-active',
				className,
			)}
			data-photo-index={number}
			onClick={onPress}
			{...props}
		>
			<Image
				alt={photo.thumbnailAlt || photo.alt || captionText}
				src={photo.thumbnail || photo.photo || ''}
				className={clsx('thumbnail gallery-thumbnail-image', imageClassName)}
				style={thumbnailImageStyle}
			/>
		</button>
	);
}

const MemoizedThumbnail = memo(Thumbnail);

export { MemoizedThumbnail as Thumbnail };
