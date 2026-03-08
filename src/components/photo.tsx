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
	onLoad,
	onError,
	style,
	buttonClassName,
	buttonStyle,
	imageClassName,
	imageStyle,
	buttonRef,
	imageRef,
	disablePress = false,
	enableZoom = true,
	isZoomMode = false,
	isPanning = false,
	imageFit = 'contain',
	...buttonProps
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
	const mergedImageStyle = { ...(style || {}), ...(imageStyle || {}) };
	return (
		<ul className="gallery-photo-list">
			<li className="gallery-photo-item">
				<button
					{...buttonProps}
					ref={buttonRef}
					type="button"
					onClick={onPressHandler}
					className={clsx(
							'gallery-photo-button',
						enableZoom && 'gallery-photo-button--zoom-enabled',
						isZoomMode && 'gallery-photo-button--zoomed',
						isPanning && 'gallery-photo-button--panning',
						buttonClassName,
					)}
					style={buttonStyle}
				>
					<Image
						alt={photo.alt || captionText}
						className={clsx(
							'gallery-photo-image',
							imageFit === 'cover' && 'gallery-photo-image--cover',
							imageClassName,
						)}
						src={photo.photo}
						variant="photo"
						onLoad={onLoad}
						onError={onError}
						style={mergedImageStyle}
						imageRef={imageRef}
					/>
				</button>
			</li>
		</ul>
	);
}

const MemoizedPhoto = memo(Photo);

export { MemoizedPhoto as Photo };
