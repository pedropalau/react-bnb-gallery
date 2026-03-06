import clsx from 'clsx';
import type { MouseEvent } from 'react';
import { memo, useEffect, useRef, useState } from 'react';
import { defaultPhrases } from '../default-phrases';
import type { GalleryCaptionComponentProps } from '../types/gallery';
import {
	calculateThumbnailsContainerDimension,
	calculateThumbnailsLeftScroll,
} from '../utils/thumbnail-layout';
import { Thumbnail } from './thumbnail';
import { TogglePhotoList } from './toggle-photo-list';

/**
 * Renders the current photo caption and optional thumbnail navigation.
 */
function Caption({
	current = 0,
	onPress,
	photos = [],
	phrases = defaultPhrases,
	renderCaptionActions,
	showThumbnails: showThumbnailsProp = true,
	components,
}: GalleryCaptionComponentProps) {
	const ThumbnailComponent = components?.Thumbnail ?? Thumbnail;
	const TogglePhotoListComponent =
		components?.TogglePhotoList ?? TogglePhotoList;
	const [showThumbnails, setShowThumbnails] = useState(showThumbnailsProp);
	const thumbnailsWrapperRef = useRef<HTMLDivElement | null>(null);
	const thumbnailsListRef = useRef<HTMLUListElement | null>(null);

	useEffect(() => {
		setShowThumbnails(showThumbnailsProp);
	}, [showThumbnailsProp]);

	useEffect(() => {
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

	const className = clsx(
		'gallery-figcaption',
		// Legacy alias kept for 2.x compatibility; use `is-thumbnails-collapsed` going forward.
		!showThumbnails && 'hide',
		!showThumbnails && 'is-thumbnails-collapsed',
	);
	const currentPhoto = photos[current];
	const captionThumbnailsWrapperWidth = calculateThumbnailsContainerDimension(
		photos.length,
	);
	const hasMoreThanOnePhoto = photos.length > 1;
	const customActions = renderCaptionActions?.({
		current,
		currentPhoto,
		photos,
		showThumbnails,
	});
	const hasCaptionRightContent = hasMoreThanOnePhoto || customActions != null;

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
						{hasCaptionRightContent && (
							<div className="caption-right">
								<div className="gallery-caption-actions">
									{hasMoreThanOnePhoto && (
										<TogglePhotoListComponent
											phrases={phrases}
											isOpened={showThumbnails}
											onPress={toggleThumbnails}
										/>
									)}
									{customActions != null && (
										<div className="gallery-caption-custom-actions">
											{customActions}
										</div>
									)}
								</div>
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
								<ul
									className="thumbnails-list gallery-thumbnails-list"
									ref={thumbnailsListRef}
								>
									{photos.map((photo, index: number) => (
										<li
											key={photo.photo || `${index}`}
											className="gallery-thumbnail-item"
										>
											<ThumbnailComponent
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
