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
	disabled = false,
	className,
	style,
	imageClassName,
	imageStyle,
	...props
}: GalleryThumbnailComponentProps) {
	if (!photo) {
		return null;
	}

	const captionText = getCaptionText(photo.caption);
	const buttonClassName = clsx(
		'thumbnail-button',
		'gallery-thumbnail-button',
		// Legacy alias kept for 2.x compatibility; use `is-active` going forward.
		active && 'active',
		active && 'is-active',
		className,
	);
	const thumbnailImageStyle = {
		...thumbnailStyle,
		...(imageStyle || {}),
	} satisfies CSSProperties;

	return (
		<button
			{...props}
			type="button"
			aria-label={captionText || undefined}
			className={buttonClassName}
			data-photo-index={number}
			onClick={onPress}
			disabled={disabled}
			style={style}
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
