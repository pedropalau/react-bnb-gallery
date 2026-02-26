import clsx from 'clsx';
import { memo } from 'react';
import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from '../constants';
import type { GalleryPhoto } from '../types/gallery';
import { Image } from './image';

const thumbnailStyle = {
	width: THUMBNAIL_WIDTH,
	height: THUMBNAIL_HEIGHT,
};

/**
 * Props for a single thumbnail button in the caption strip.
 */
interface ThumbnailProps {
	active?: boolean;
	photo?: GalleryPhoto | null;
	onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	number?: number;
}

/**
 * Renders a clickable thumbnail for selecting a photo by index.
 */
function Thumbnail({
	active = false,
	photo = null,
	onPress,
	number = 0,
}: ThumbnailProps) {
	if (!photo) {
		return null;
	}

	const className = clsx('thumbnail-button', active && 'active');

	return (
		<button
			type="button"
			aria-label={photo.caption}
			className={className}
			data-photo-index={number}
			onClick={onPress}
			disabled={false}
		>
			<Image
				alt={photo.thumbnailAlt || photo.alt || photo.caption || ''}
				src={photo.thumbnail || photo.photo || ''}
				className="thumbnail"
				style={thumbnailStyle}
			/>
		</button>
	);
}

const MemoizedThumbnail = memo(Thumbnail);

export { MemoizedThumbnail as Thumbnail };

/**
 * @deprecated Use named import instead: `import { Thumbnail } from './thumbnail'`.
 * Default export will be removed in the next major version.
 */
export default MemoizedThumbnail;
