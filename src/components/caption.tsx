import clsx from 'clsx';
import type { MouseEvent } from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import { defaultPhrases } from '../default-phrases';
import { useThumbnailLayout } from '../hooks/use-thumbnail-layout';
import type { GalleryCaptionComponentProps } from '../types/gallery';
import { calculateThumbnailsContainerDimension } from '../utils/thumbnail-layout';
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

	const [showThumbnails, setShowThumbnails] = useState(showThumbnailsProp);

	const { thumbnailLayout, thumbnailsWrapperRef, thumbnailsListRef } =
		useThumbnailLayout({
			current,
			totalPhotos: photos.length,
		});

	useEffect(() => {
		setShowThumbnails(showThumbnailsProp);
	}, [showThumbnailsProp]);

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
		thumbnailLayout,
	);
	const hasMoreThanOnePhoto = photos.length > 1;
	const customActions = renderCaptionActions?.({
		currentPhotoIndex: current,
		currentPhoto,
		photos,
		showThumbnails,
	});
	const hasCaptionRightContent = hasMoreThanOnePhoto || customActions != null;

	return (
		<figcaption
			className={clsx(
				'gallery-figcaption',
				!showThumbnails && 'is-thumbnails-collapsed',
				context?.classNames?.caption,
				className,
			)}
			style={{
				...(context?.styles?.caption || {}),
				...(style || {}),
			}}
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
											className={togglePhotoListClassName}
											style={togglePhotoListStyle}
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
										'gallery-thumbnails-list',
										context?.classNames?.thumbnailsList,
										thumbnailsListClassName,
									)}
									style={{
										...(context?.styles?.thumbnailsList || {}),
										...(thumbnailsListStyle || {}),
									}}
									ref={thumbnailsListRef}
								>
									{photos.map((photo, index) => (
										<li
											// Fallback to index because `GalleryPhoto` has no required unique id.
											key={photo.photo || `${index}`}
											className={clsx(
												'gallery-thumbnail-item',
												context?.classNames?.thumbnailItem,
												thumbnailItemClassName,
											)}
											style={{
												...(context?.styles?.thumbnailItem || {}),
												...(thumbnailItemStyle || {}),
											}}
										>
											<ThumbnailComponent
												active={index === current}
												photo={photo}
												onPress={onThumbnailPress}
												number={index}
												className={thumbnailClassName}
												style={thumbnailStyle}
												imageClassName={thumbnailImageClassName}
												imageStyle={thumbnailImageStyle}
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
