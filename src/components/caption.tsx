import clsx from 'clsx';
import type { MouseEvent } from 'react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { defaultPhrases } from '../default-phrases';
import type { GalleryCaptionComponentProps } from '../types/gallery';
import {
	calculateThumbnailsContainerDimension,
	calculateThumbnailsLeftScroll,
} from '../utils/thumbnail-layout';
import { useGalleryContext } from './gallery-context';
import { Thumbnail } from './thumbnail';
import { TogglePhotoList } from './toggle-photo-list';

/**
 * Renders the current photo caption and optional thumbnail navigation.
 */
function Caption({
	current = 0,
	onPress,
	photos = [],
	phrases: phrasesProp,
	renderCaptionActions,
	showThumbnails: showThumbnailsProp = true,
	components,
	className,
	style,
	thumbnailsListClassName,
	thumbnailsListStyle,
	thumbnailItemClassName,
	thumbnailItemStyle,
	thumbnailClassName,
	thumbnailStyle,
	thumbnailImageClassName,
	thumbnailImageStyle,
	togglePhotoListClassName,
	togglePhotoListStyle,
	...props
}: GalleryCaptionComponentProps) {
	const context = useGalleryContext();
	const phrases = phrasesProp || context?.phrases || defaultPhrases;
	const ThumbnailComponent =
		components?.Thumbnail || context?.components?.Thumbnail || Thumbnail;
	const TogglePhotoListComponent =
		components?.TogglePhotoList ||
		context?.components?.TogglePhotoList ||
		TogglePhotoList;
	const resolvedClassName = className || context?.classNames?.caption;
	const resolvedStyle = style || context?.styles?.caption;
	const resolvedThumbnailsListClassName =
		thumbnailsListClassName || context?.classNames?.thumbnailsList;
	const resolvedThumbnailsListStyle =
		thumbnailsListStyle || context?.styles?.thumbnailsList;
	const resolvedThumbnailItemClassName =
		thumbnailItemClassName || context?.classNames?.thumbnailItem;
	const resolvedThumbnailItemStyle =
		thumbnailItemStyle || context?.styles?.thumbnailItem;
	const resolvedThumbnailClassName =
		thumbnailClassName || context?.classNames?.thumbnailButton;
	const resolvedThumbnailStyle =
		thumbnailStyle || context?.styles?.thumbnailButton;
	const resolvedThumbnailImageClassName =
		thumbnailImageClassName || context?.classNames?.thumbnailImage;
	const resolvedThumbnailImageStyle =
		thumbnailImageStyle || context?.styles?.thumbnailImage;
	const resolvedTogglePhotoListClassName =
		togglePhotoListClassName || context?.classNames?.togglePhotoList;
	const resolvedTogglePhotoListStyle =
		togglePhotoListStyle || context?.styles?.togglePhotoList;
	// `showThumbnails` prop is treated as the initial uncontrolled state.
	const [showThumbnails, setShowThumbnails] = useState(showThumbnailsProp);
	const thumbnailsWrapperRef = useRef<HTMLDivElement | null>(null);
	const thumbnailsListRef = useRef<HTMLUListElement | null>(null);

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

	const onThumbnailPress = useCallback(
		(event: MouseEvent<HTMLElement>) => {
			const index = parseInt(
				event.currentTarget.dataset.photoIndex || '-1',
				10,
			);
			if (index >= 0 && index < photos.length) {
				onPress?.(index);
			}
		},
		[photos.length, onPress],
	);

	const toggleThumbnails = useCallback(() => {
		setShowThumbnails((prevState) => !prevState);
	}, []);

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
		<figcaption
			className={clsx(
				'gallery-figcaption',
				// Legacy alias kept for 2.x compatibility; use `is-thumbnails-collapsed` going forward.
				!showThumbnails && 'hide',
				!showThumbnails && 'is-thumbnails-collapsed',
				resolvedClassName,
			)}
			style={resolvedStyle}
			{...props}
		>
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
											className={resolvedTogglePhotoListClassName}
											style={resolvedTogglePhotoListStyle}
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
							role="region"
							aria-label={phrases.thumbnailNavigation}
							ref={thumbnailsWrapperRef}
						>
							<div
								className="caption-thumbnails"
								style={{
									width: captionThumbnailsWrapperWidth,
								}}
							>
								<ul
									className={clsx(
										'thumbnails-list gallery-thumbnails-list',
										resolvedThumbnailsListClassName,
									)}
									style={resolvedThumbnailsListStyle}
									ref={thumbnailsListRef}
								>
									{photos.map((photo, index) => (
										<li
											// Fallback to index because `GalleryPhoto` has no required unique id.
											key={photo.photo || `${index}`}
											className={clsx(
												'gallery-thumbnail-item',
												resolvedThumbnailItemClassName,
											)}
											style={resolvedThumbnailItemStyle}
										>
											<ThumbnailComponent
												active={index === current}
												photo={photo}
												onPress={onThumbnailPress}
												number={index}
												className={resolvedThumbnailClassName}
												style={resolvedThumbnailStyle}
												imageClassName={resolvedThumbnailImageClassName}
												imageStyle={resolvedThumbnailImageStyle}
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
