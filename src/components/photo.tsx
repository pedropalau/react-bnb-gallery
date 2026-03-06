import clsx from 'clsx';
import { memo, useCallback } from 'react';
import type { GalleryPhotoComponentProps } from '../types/gallery';
import { getCaptionText } from '../utils/get-caption-text';
import { Image } from './image';

/**
 * Renders the main photo element and forwards interaction callbacks.
 */
function Photo({
	photo = null,
	onPress,
	onTouchStart,
	onTouchMove,
	onTouchEnd,
	onMouseDown,
	onMouseMove,
	onMouseUp,
	onMouseLeave,
	onWheel,
	onLoad,
	onError,
	style,
	buttonRef,
	imageRef,
	disablePress = false,
	enableZoom = true,
	isZoomMode = false,
	isPanning = false,
}: GalleryPhotoComponentProps) {
	const onPressHandler = useCallback(() => {
		if (disablePress) {
			return;
		}
		onPress?.();
	}, [disablePress, onPress]);

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
					ref={buttonRef}
					type="button"
					onClick={onPressHandler}
					className={clsx(
						'photo-button',
						'gallery-photo-button',
						enableZoom && 'gallery-photo-button--zoom-enabled',
						isZoomMode && 'gallery-photo-button--zoomed',
						isPanning && 'gallery-photo-button--panning',
					)}
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseUp={onMouseUp}
					onMouseLeave={onMouseLeave}
					onWheel={onWheel}
				>
					<Image
						alt={photo.alt || captionText}
						className="photo gallery-photo-image"
						src={photo.photo || ''}
						onLoad={onLoad}
						onError={onError}
						style={style}
						imageRef={imageRef}
					/>
				</button>
			</li>
		</ul>
	);
}

const MemoizedPhoto = memo(Photo);

export { MemoizedPhoto as Photo };
