import classnames from 'classnames';
import { memo } from 'react';
import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from '../../constants';
import type { GalleryPhoto } from '../../types/gallery';
import noop from '../../utils/noop';
import Image from '../Image/Image';

const thumbnailStyle = {
	width: THUMBNAIL_WIDTH,
	height: THUMBNAIL_HEIGHT,
};

interface ThumbnailProps {
	active?: boolean;
	photo?: GalleryPhoto | null;
	onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	number?: number;
}

function Thumbnail({
	active = false,
	photo = null,
	onPress = noop,
	number = 0,
}: ThumbnailProps) {
	if (!photo) {
		return null;
	}

	const className = classnames('thumbnail-button', active && 'active');

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
				alt={photo.caption || ''}
				src={photo.thumbnail || photo.photo || ''}
				className="thumbnail"
				style={thumbnailStyle}
			/>
		</button>
	);
}

export default memo(Thumbnail);
