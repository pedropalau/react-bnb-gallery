import clsx from 'clsx';
import type { MouseEvent } from 'react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { defaultPhrases } from '../default-phrases';
import type { GalleryCaptionComponentProps } from '../types/gallery';
import {
	calculateThumbnailsContainerDimension,
	calculateThumbnailsLeftScroll,
	type ThumbnailLayoutDimensions,
} from '../utils/thumbnail-layout';
import { useGalleryContext } from './gallery-context';
import { Thumbnail } from './thumbnail';
import { TogglePhotoList } from './toggle-photo-list';

function parsePixelValue(value?: string): number {
	if (!value) {
		return 0;
	}

	const parsed = Number.parseFloat(value);
	return Number.isFinite(parsed) ? parsed : 0;
}

function getMeasuredThumbnailLayout(
	thumbnailsList: HTMLUListElement,
): ThumbnailLayoutDimensions {
	const thumbnailItems = thumbnailsList.querySelectorAll<HTMLLIElement>('li');
	const firstThumbnail = thumbnailItems[0];
	const secondThumbnail = thumbnailItems[1];
	const measuredLayout: ThumbnailLayoutDimensions = {};

	if (firstThumbnail) {
		const firstRect = firstThumbnail.getBoundingClientRect();
		if (firstRect.width > 0) {
			measuredLayout.thumbnailFrameWidth = firstRect.width;
		}
	}

	if (firstThumbnail && secondThumbnail) {
		const firstRect = firstThumbnail.getBoundingClientRect();
		const secondRect = secondThumbnail.getBoundingClientRect();
		const measuredStep = secondRect.left - firstRect.left;
		if (measuredStep > 0) {
			measuredLayout.thumbnailStep = measuredStep;
		}
	}

	const thumbnailsContainer = thumbnailsList.parentElement;
	if (thumbnailsContainer) {
		const containerStyles = window.getComputedStyle(thumbnailsContainer);
		const viewportInset =
			Math.abs(parsePixelValue(containerStyles.marginLeft)) +
			Math.abs(parsePixelValue(containerStyles.marginRight));
		if (viewportInset > 0) {
			measuredLayout.thumbnailViewportInset = viewportInset;
		}
	}

	return measuredLayout;
}

function areThumbnailLayoutsEqual(
	prevLayout: ThumbnailLayoutDimensions,
	nextLayout: ThumbnailLayoutDimensions,
): boolean {
	return (
		prevLayout.thumbnailFrameWidth === nextLayout.thumbnailFrameWidth &&
		prevLayout.thumbnailStep === nextLayout.thumbnailStep &&
		prevLayout.thumbnailViewportInset === nextLayout.thumbnailViewportInset
	);
}

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
	const mergedClassName = clsx(context?.classNames?.caption, className);
	const mergedStyle = style || context?.styles?.caption;
	const mergedThumbnailsListClassName = clsx(
		context?.classNames?.thumbnailsList,
		thumbnailsListClassName,
	);
	const mergedThumbnailsListStyle =
		thumbnailsListStyle || context?.styles?.thumbnailsList;
	const mergedThumbnailItemClassName = clsx(
		context?.classNames?.thumbnailItem,
		thumbnailItemClassName,
	);
	const mergedThumbnailItemStyle =
		thumbnailItemStyle || context?.styles?.thumbnailItem;
	// `showThumbnails` prop is treated as the initial uncontrolled state.
	const [showThumbnails, setShowThumbnails] = useState(showThumbnailsProp);
	const [thumbnailLayout, setThumbnailLayout] =
		useState<ThumbnailLayoutDimensions>({});
	const thumbnailsWrapperRef = useRef<HTMLDivElement | null>(null);
	const thumbnailsListRef = useRef<HTMLUListElement | null>(null);

	const syncThumbnailsLayout = useCallback(() => {
		if (!thumbnailsWrapperRef.current || !thumbnailsListRef.current) {
			return;
		}

		const measuredLayout = getMeasuredThumbnailLayout(
			thumbnailsListRef.current,
		);
		setThumbnailLayout((previousLayout) =>
			areThumbnailLayoutsEqual(previousLayout, measuredLayout)
				? previousLayout
				: measuredLayout,
		);
		const bounding = thumbnailsWrapperRef.current.getBoundingClientRect();
		const scrollLeft = calculateThumbnailsLeftScroll(
			current,
			photos.length,
			bounding,
			measuredLayout,
		);
		thumbnailsListRef.current.style.marginLeft = `${scrollLeft}px`;
	}, [current, photos.length]);

	useEffect(() => {
		syncThumbnailsLayout();
	}, [syncThumbnailsLayout]);

	useEffect(() => {
		window.addEventListener('resize', syncThumbnailsLayout);
		return () => {
			window.removeEventListener('resize', syncThumbnailsLayout);
		};
	}, [syncThumbnailsLayout]);

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
				mergedClassName,
			)}
			style={mergedStyle}
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
										'thumbnails-list gallery-thumbnails-list',
										mergedThumbnailsListClassName,
									)}
									style={mergedThumbnailsListStyle}
									ref={thumbnailsListRef}
								>
									{photos.map((photo, index) => (
										<li
											// Fallback to index because `GalleryPhoto` has no required unique id.
											key={photo.photo || `${index}`}
											className={clsx(
												'gallery-thumbnail-item',
												mergedThumbnailItemClassName,
											)}
											style={mergedThumbnailItemStyle}
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
