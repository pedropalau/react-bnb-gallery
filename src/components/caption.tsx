import clsx from 'clsx';
import type { MouseEvent } from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import { defaultPhrases } from '../default-phrases';
import type { GalleryPhoto, GalleryPhrases } from '../types/gallery';
import { calculateThumbnailsContainerDimension } from '../utils/calculateThumbnailsContainerDimension';
import { calculateThumbnailsLeftScroll } from '../utils/calculateThumbnailsLeftScroll';
import { Thumbnail } from './thumbnail';
import { TogglePhotoList } from './toggle-photo-list';

/**
 * Props for the gallery caption area and thumbnail strip.
 */
interface CaptionProps {
	current?: number;
	onPress?: (index: number) => void;
	photos?: GalleryPhoto[];
	phrases?: GalleryPhrases;
	showThumbnails?: boolean;
}

/**
 * Renders the current photo caption and optional thumbnail navigation.
 */
function Caption({
	current = 0,
	onPress,
	photos = [],
	phrases = defaultPhrases,
	showThumbnails: showThumbnailsProp = true,
}: CaptionProps) {
	const [showThumbnails, setShowThumbnails] = useState(showThumbnailsProp);
	const thumbnailsWrapperRef = useRef<HTMLDivElement | null>(null);
	const thumbnailsListRef = useRef<HTMLUListElement | null>(null);
	const previousCurrentRef = useRef(current);

	useEffect(() => {
		setShowThumbnails(showThumbnailsProp);
	}, [showThumbnailsProp]);

	useEffect(() => {
		if (current === previousCurrentRef.current) {
			return;
		}

		previousCurrentRef.current = current;
		if (!thumbnailsWrapperRef.current || !thumbnailsListRef.current) {
			return;
		}

		const bounding = thumbnailsWrapperRef.current.getBoundingClientRect();
		const scrollLeft = calculateThumbnailsLeftScroll(
			current,
			photos.length,
			bounding,
		);
		thumbnailsListRef.current.style.marginLeft = `${scrollLeft}px`;
	}, [current, photos.length]);

	const onThumbnailPress = (event: MouseEvent<HTMLElement>) => {
		const index = parseInt(event.currentTarget.dataset.photoIndex || '-1', 10);
		if (index >= 0 && index <= photos.length - 1) {
			onPress?.(index);
		}
	};

	const toggleThumbnails = () => {
		setShowThumbnails((prevState) => !prevState);
	};

	const className = clsx('gallery-figcaption', !showThumbnails && 'hide');
	const currentPhoto = photos[current];
	const captionThumbnailsWrapperWidth = calculateThumbnailsContainerDimension(
		photos.length,
	);
	const hasMoreThanOnePhoto = photos.length > 1;

	return (
		<figcaption className={className}>
			<div className="gallery-figcaption--content">
				<div className="gallery-figcaption--inner">
					<div className="gallery-figcaption--info">
						<div className="caption-left">
							{currentPhoto?.caption && (
								<h3 className="photo-caption">{currentPhoto.caption}</h3>
							)}
							{currentPhoto?.subcaption && (
								<p className="photo-subcaption">{currentPhoto.subcaption}</p>
							)}
						</div>
						{hasMoreThanOnePhoto && (
							<div className="caption-right">
								<TogglePhotoList
									phrases={phrases}
									isOpened={showThumbnails}
									onPress={toggleThumbnails}
								/>
							</div>
						)}
					</div>
					{hasMoreThanOnePhoto && (
						<div
							className="gallery-figcaption--thumbnails"
							aria-hidden={false}
							ref={thumbnailsWrapperRef}
						>
							<div
								className="caption-thumbnails"
								style={{
									width: captionThumbnailsWrapperWidth,
								}}
							>
								<ul className="thumbnails-list" ref={thumbnailsListRef}>
									{photos.map((photo: GalleryPhoto, index: number) => (
										<li key={photo.photo || `${index}`}>
											<Thumbnail
												active={index === current}
												photo={photo}
												onPress={onThumbnailPress}
												number={index}
											/>
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>
		</figcaption>
	);
}

const MemoizedCaption = memo(Caption);

export { MemoizedCaption as Caption };

/**
 * @deprecated Use named import instead: `import { Caption } from './caption'`.
 * Default export will be removed in the next major version.
 */
export default MemoizedCaption;
