import classnames from 'classnames';
import type { CSSProperties, TouchEvent } from 'react';
import { memo, useCallback } from 'react';
import type { GalleryPhoto } from '../../types/gallery';
import Image from '../Image/Image';

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

	const className = classnames(
		'gallery-media-photo',
		'gallery-media-photo--block',
		'gallery-media-cover',
	);

	return (
		<ul className="gallery-images--ul">
			<li className={className}>
				<button
					type="button"
					onClick={onPressHandler}
					className="photo-button"
					onTouchStart={onTouchStart}
					onTouchMove={onTouchMove}
					onTouchEnd={onTouchEnd}
				>
					<Image
						alt={photo.caption || ''}
						className="photo"
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

export default memo(Photo);
