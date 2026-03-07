import clsx from 'clsx';
import { FocusTrap } from 'focus-trap-react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseButton } from './components/close-button';
import { Gallery } from './components/gallery';
import {
	ARROW_LEFT_KEYCODE,
	ARROW_RIGHT_KEYCODE,
	DEFAULT_CLOSE_ANIMATION_DURATION_MS,
	DEFAULT_CLOSE_ANIMATION_EASING,
	DEFAULT_CLOSE_ANIMATION_PRESET,
	DEFAULT_OPACITY,
	DEFAULT_OPEN_ANIMATION_DURATION_MS,
	DEFAULT_OPEN_ANIMATION_EASING,
	DEFAULT_OPEN_ANIMATION_PRESET,
	DEFAULT_Z_INDEX,
	ESC_KEYCODE,
} from './constants';
import { defaultPhrases } from './default-phrases';
import type {
	GalleryAnimationOptions,
	GalleryClassNames,
	GalleryComponents,
	GalleryController,
	GalleryImageFit,
	GalleryPhoto,
	GalleryPhrases,
	GalleryRenderCaptionActions,
	GalleryStyles,
} from './types/gallery';
import { normalizePhotos } from './utils/normalize-photos';

function normalizeActivePhotoIndex(index: number, totalPhotos: number): number {
	if (totalPhotos === 0) {
		return 0;
	}

	return Math.min(Math.max(index, 0), totalPhotos - 1);
}

export interface ReactBnbGalleryProps {
	activePhotoIndex?: number;
	activePhotoPressed?: () => void;
	animations?: GalleryAnimationOptions;
	enableZoom?: boolean;
	imageFit?: GalleryImageFit;
	keyboard?: boolean;
	leftKeyPressed?: () => void;
	light?: boolean;
	nextButtonPressed?: () => void;
	onClose?: () => void;
	opacity?: number;
	photos?: Array<string | GalleryPhoto>;
	phrases?: Partial<GalleryPhrases>;
	preloadSize?: number;
	prevButtonPressed?: () => void;
	renderCaptionActions?: GalleryRenderCaptionActions;
	components?: GalleryComponents;
	classNames?: GalleryClassNames;
	styles?: GalleryStyles;
	rightKeyPressed?: () => void;
	maxZoom?: number;
	show?: boolean;
	showThumbnails?: boolean;
	zoomStep?: number;
	wrap?: boolean;
	zIndex?: number;
}

/**
 * A lightbox gallery component for React. Renders photos in a full-screen modal
 * with thumbnail navigation, keyboard controls, and customizable appearance.
 *
 * @param activePhotoIndex - Index of the currently displayed photo (default: `0`)
 * @param activePhotoPressed - Callback fired when the active photo is pressed
 * @param animations - Optional motion customization for image transitions, modal open animation, and feedback interactions
 * @param enableZoom - Enables wheel/pinch zoom and pan interactions in the active photo viewport (default: `true`)
 * @param imageFit - Active photo adaptation mode (`contain` or `cover`, default: `contain`)
 * @param keyboard - Whether keyboard navigation is enabled (default: `true`)
 * @param leftKeyPressed - Callback fired when the left arrow key is pressed
 * @param light - Enables light mode styling (default: `false`)
 * @param nextButtonPressed - Callback fired when the next button is pressed
 * @param onClose - Callback fired when the gallery is closed
 * @param opacity - Overlay opacity between `0` and `1` (default: `0.8`)
 * @param photos - Photos to display; accepts an array of URL strings and/or `GalleryPhoto` objects
 * @param phrases - Localization strings for UI labels
 * @param preloadSize - Number of photos to preload ahead of the active photo (default: `5`)
 * @param prevButtonPressed - Callback fired when the previous button is pressed
 * @param renderCaptionActions - Render prop for injecting custom controls in the caption action area
 * @param components - Optional slot overrides for built-in UI components such as overlay, counter, modal container, close button, controls, photo, caption, and thumbnails
 * @param classNames - Optional className overrides for default gallery UI slots
 * @param styles - Optional inline style overrides for default gallery UI slots
 * @param rightKeyPressed - Callback fired when the right arrow key is pressed
 * @param maxZoom - Maximum zoom scale applied by gestures (default: `3`)
 * @param show - Whether the gallery modal is visible (default: `false`)
 * @param showThumbnails - Whether the thumbnail strip is shown (default: `true`)
 * @param zoomStep - Zoom sensitivity step for wheel and pinch interactions (default: `0.25`)
 * @param wrap - Whether navigation wraps around from the last photo to the first (default: `false`)
 * @param zIndex - CSS `z-index` of the modal (default: `1000`)
 */
export function ReactBnbGallery({
	activePhotoIndex = 0,
	activePhotoPressed,
	animations,
	enableZoom = true,
	imageFit = 'contain',
	keyboard = true,
	leftKeyPressed,
	light = false,
	nextButtonPressed,
	onClose,
	opacity = DEFAULT_OPACITY,
	photos: photosInput = [],
	phrases: phrasesProp,
	preloadSize = 5,
	prevButtonPressed,
	renderCaptionActions,
	components,
	classNames,
	styles,
	rightKeyPressed,
	maxZoom = 3,
	show = false,
	showThumbnails = true,
	zoomStep = 0.25,
	wrap = false,
	zIndex = DEFAULT_Z_INDEX,
}: ReactBnbGalleryProps) {
	const gallery = useRef<GalleryController | null>(null);
	const modalRef = useRef<HTMLDivElement | null>(null);

	const photos = useMemo(() => normalizePhotos(photosInput), [photosInput]);
	const phrases = useMemo(
		() => ({ ...defaultPhrases, ...(phrasesProp || {}) }),
		[phrasesProp],
	);
	const [displayedPhotoIndex, setDisplayedPhotoIndex] = useState(() =>
		normalizeActivePhotoIndex(activePhotoIndex, photos.length),
	);
	const [isRendered, setIsRendered] = useState(show);
	const [isClosing, setIsClosing] = useState(false);
	const openAnimationPreset =
		animations?.openPreset || DEFAULT_OPEN_ANIMATION_PRESET;
	const openAnimationDurationMs = Math.max(
		0,
		animations?.openDurationMs ??
			animations?.durationMs ??
			DEFAULT_OPEN_ANIMATION_DURATION_MS,
	);
	const openAnimationEasing =
		animations?.openEasing ||
		animations?.easing ||
		DEFAULT_OPEN_ANIMATION_EASING;
	const closeAnimationPreset =
		animations?.closePreset || DEFAULT_CLOSE_ANIMATION_PRESET;
	const closeAnimationDurationMs = Math.max(
		0,
		animations?.closeDurationMs ??
			animations?.durationMs ??
			DEFAULT_CLOSE_ANIMATION_DURATION_MS,
	);
	const closeAnimationEasing =
		animations?.closeEasing ||
		animations?.easing ||
		DEFAULT_CLOSE_ANIMATION_EASING;

	useEffect(() => {
		if (show) {
			setIsRendered(true);
			setIsClosing(false);
			return;
		}

		if (!isRendered) {
			return;
		}

		if (closeAnimationPreset === 'none' || closeAnimationDurationMs === 0) {
			setIsClosing(false);
			setIsRendered(false);
			return;
		}

		setIsClosing(true);
		const timeoutId = window.setTimeout(() => {
			setIsClosing(false);
			setIsRendered(false);
		}, closeAnimationDurationMs);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [closeAnimationDurationMs, closeAnimationPreset, isRendered, show]);

	const close = useCallback(() => {
		onClose?.();
	}, [onClose]);

	const onKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const target = event.target as HTMLElement;
			if (/input|textarea/i.test(target.tagName)) {
				return;
			}

			switch (event.key || event.which) {
				case 'Escape':
				case ESC_KEYCODE:
					event.preventDefault();
					close();
					break;
				case 'ArrowLeft':
				case ARROW_LEFT_KEYCODE:
					event.preventDefault();
					gallery.current?.prev();
					leftKeyPressed?.();
					break;
				case 'ArrowRight':
				case ARROW_RIGHT_KEYCODE:
					event.preventDefault();
					gallery.current?.next();
					rightKeyPressed?.();
					break;
				default:
			}
		},
		[close, leftKeyPressed, rightKeyPressed],
	);

	const galleryModalOverlayStyles = useMemo(
		() => ({
			opacity,
			...(styles?.overlay || {}),
		}),
		[opacity, styles?.overlay],
	);
	const galleryModalStyles = useMemo(
		() =>
			({
				zIndex,
				...(styles?.modal || {}),
				'--rbg-open-duration': `${openAnimationDurationMs}ms`,
				'--rbg-open-easing': openAnimationEasing,
				'--rbg-close-duration': `${closeAnimationDurationMs}ms`,
				'--rbg-close-easing': closeAnimationEasing,
			}) as CSSProperties,
		[
			closeAnimationDurationMs,
			closeAnimationEasing,
			openAnimationDurationMs,
			openAnimationEasing,
			styles?.modal,
			zIndex,
		],
	);
	const hasMoreThanOnePhoto = photos.length > 1;
	const photoCounterLabel = `${displayedPhotoIndex + 1} / ${photos.length}`;
	const CloseButtonComponent = components?.CloseButton ?? CloseButton;
	const OverlayComponent = components?.Overlay;
	const PhotoCounterComponent = components?.PhotoCounter;
	const ModalContainerComponent = components?.ModalContainer;

	if (!isRendered) {
		return null;
	}

	if (typeof document === 'undefined') {
		return null;
	}

	const modalContent = (
		<div className="gallery-modal--table">
			<div className="gallery-modal--cell">
				<div className="gallery-modal--content">
					<div
						className={clsx(
							'gallery-modal--close',
							classNames?.closeButtonWrapper,
						)}
						style={styles?.closeButtonWrapper}
					>
						<CloseButtonComponent
							onPress={close}
							light={light}
							phrases={phrases}
							className={classNames?.closeButton}
							style={styles?.closeButton}
						/>
					</div>
					<div className="gallery-content">
						<div className="gallery-top">
							<div className="gallery-top--inner">
								{hasMoreThanOnePhoto &&
									(PhotoCounterComponent ? (
										<PhotoCounterComponent
											className={clsx(
												'gallery-photo-counter',
												classNames?.photoCounter,
											)}
											style={styles?.photoCounter}
											current={displayedPhotoIndex + 1}
											total={photos.length}
											label={photoCounterLabel}
										/>
									) : (
										<p
											className={clsx(
												'gallery-photo-counter',
												classNames?.photoCounter,
											)}
											aria-live="polite"
											style={styles?.photoCounter}
										>
											{photoCounterLabel}
										</p>
									))}
							</div>
						</div>
						<Gallery
							phrases={phrases}
							ref={gallery}
							photos={photos}
							wrap={wrap}
							activePhotoIndex={activePhotoIndex}
							activePhotoPressed={activePhotoPressed}
							animations={animations}
							enableZoom={enableZoom}
							imageFit={imageFit}
							nextButtonPressed={nextButtonPressed}
							prevButtonPressed={prevButtonPressed}
							renderCaptionActions={renderCaptionActions}
							components={components}
							classNames={classNames}
							styles={styles}
							showThumbnails={showThumbnails}
							preloadSize={preloadSize}
							maxZoom={maxZoom}
							zoomStep={zoomStep}
							onActivePhotoIndexChange={setDisplayedPhotoIndex}
						/>
					</div>
				</div>
			</div>
		</div>
	);

	return createPortal(
		<FocusTrap
			focusTrapOptions={{
				fallbackFocus: () => modalRef.current || document.body,
			}}
		>
			<div
				ref={modalRef}
				className={clsx(
					'gallery-modal',
					isClosing
						? `gallery-modal--close-${closeAnimationPreset}`
						: `gallery-modal--open-${openAnimationPreset}`,
					light && 'mode-light',
					classNames?.modal,
				)}
				onKeyDown={keyboard ? onKeyDown : undefined}
				tabIndex={-1}
				role="dialog"
				aria-label={phrases.photoGallery}
				aria-modal="true"
				style={galleryModalStyles}
			>
				{OverlayComponent ? (
					<OverlayComponent
						className={clsx('gallery-modal--overlay', classNames?.overlay)}
						style={galleryModalOverlayStyles}
						light={light}
						opacity={opacity}
					/>
				) : (
					<div
						style={galleryModalOverlayStyles}
						className={clsx('gallery-modal--overlay', classNames?.overlay)}
					/>
				)}
				{ModalContainerComponent ? (
					<ModalContainerComponent
						className={clsx(
							'gallery-modal--container',
							classNames?.modalContainer,
						)}
						style={styles?.modalContainer}
					>
						{modalContent}
					</ModalContainerComponent>
				) : (
					<div
						className={clsx(
							'gallery-modal--container',
							classNames?.modalContainer,
						)}
						style={styles?.modalContainer}
					>
						{modalContent}
					</div>
				)}
			</div>
		</FocusTrap>,
		document.body,
	);
}
