import clsx from 'clsx';
import type { CSSProperties, TouchEvent } from 'react';
import { memo, useCallback } from 'react';
import type { GalleryPhoto } from '../types/gallery';
import { getCaptionText } from '../utils/get-caption-text';
import { Image } from './image';

/**
 * Props for the active gallery photo surface.
 */
interface PhotoProps {
	photo?: GalleryPhoto | null;
	onPress?: () => void;
	onTouchStart?: (event: TouchEvent<HTMLButtonElement>) => void;
	onTouchMove?: (event: TouchEvent<HTMLButtonElement>) => void;
	onTouchEnd?: (event: TouchEvent<HTMLButtonElement>) => void;
	onLoad?: () => void;
	onError?: () => void;
	style?: CSSProperties;
}

/**
 * Renders the main photo element and forwards interaction callbacks.
 */
function Photo({
	photo = null,
	onPress,
	onTouchStart,
	onTouchMove,
	onTouchEnd,
	onLoad,
	onError,
	style,
}: PhotoProps) {
	const onPressHandler = useCallback(() => {
		onPress?.();
	}, [onPress]);

	if (!photo) {
		return null;
	}

	const captionText = getCaptionText(photo.caption);
	const className = clsx(
		'gallery-media-photo',
		'gallery-media-photo--block',
		'gallery-media-cover',
	);

	return (
		<ul className="gallery-images--ul gallery-photo-list">
			<li className={clsx(className, 'gallery-photo-item')}>
				<button
					type="button"
					onClick={onPressHandler}
					className="photo-button gallery-photo-button"
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
				>
					<Image
						alt={photo.alt || captionText}
						className="photo gallery-photo-image"
						src={photo.photo || ''}
						onLoad={onLoad}
						onError={onError}
						style={style}
					/>
				</button>
			</li>
		</ul>
	);
}

const MemoizedPhoto = memo(Photo);

export { MemoizedPhoto as Photo };

/**
 * @deprecated Use named import instead: `import { Photo } from './photo'`.
 * Default export will be removed in the next major version.
 */
export default MemoizedPhoto;
