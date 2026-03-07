import clsx from 'clsx';
import { memo } from 'react';
import type { GalleryThumbnailComponentProps } from '../types/gallery';
import { getCaptionText } from '../utils/get-caption-text';
import { useGalleryContext } from './gallery-context';
import { Image } from './image';

/**
 * Renders a clickable thumbnail for selecting a photo by index.
 */
function Thumbnail({
	active = false,
	photo = null,
	onPress,
	number = 0,
	className,
	style,
	imageClassName,
	imageStyle,
	...props
}: GalleryThumbnailComponentProps) {
	const context = useGalleryContext();

	if (!photo) {
		return null;
	}

	const captionText = getCaptionText(photo.caption);
	const resolvedImageStyle = imageStyle || context?.styles?.thumbnailImage;

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
				context?.classNames?.thumbnailButton,
				className,
			)}
			style={style || context?.styles?.thumbnailButton}
			data-photo-index={number}
			onClick={onPress}
			{...props}
		>
			<Image
				alt={photo.thumbnailAlt || photo.alt || captionText}
				src={photo.thumbnail || photo.photo || ''}
				className={clsx(
					'thumbnail gallery-thumbnail-image',
					context?.classNames?.thumbnailImage,
					imageClassName,
				)}
				style={resolvedImageStyle}
			/>
		</button>
	);
}

const MemoizedThumbnail = memo(Thumbnail);

export { MemoizedThumbnail as Thumbnail };
