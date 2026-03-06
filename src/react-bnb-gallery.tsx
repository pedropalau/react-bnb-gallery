import clsx from 'clsx';
import { FocusTrap } from 'focus-trap-react';
import type { KeyboardEvent } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseButton } from './components/close-button';
import { Gallery } from './components/gallery';
import {
	ARROW_LEFT_KEYCODE,
	ARROW_RIGHT_KEYCODE,
	DEFAULT_OPACITY,
	DEFAULT_Z_INDEX,
	ESC_KEYCODE,
} from './constants';
import { defaultPhrases } from './default-phrases';
import type {
	GalleryClassNames,
	GalleryComponents,
	GalleryController,
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
	enableZoom?: boolean;
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
 * @param enableZoom - Enables wheel/pinch zoom and pan interactions in the active photo viewport (default: `true`)
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
	enableZoom = true,
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
	const hasMoreThanOnePhoto = photos.length > 1;
	const photoCounterLabel = `${displayedPhotoIndex + 1} / ${photos.length}`;
	const CloseButtonComponent = components?.CloseButton ?? CloseButton;
	const OverlayComponent = components?.Overlay;
	const PhotoCounterComponent = components?.PhotoCounter;
	const ModalContainerComponent = components?.ModalContainer;

	if (!show) {
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
							enableZoom={enableZoom}
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
					light && 'mode-light',
					classNames?.modal,
				)}
				onKeyDown={keyboard ? onKeyDown : undefined}
				tabIndex={-1}
				role="dialog"
				aria-label={phrases.photoGallery}
				aria-modal="true"
				style={{ zIndex, ...(styles?.modal || {}) }}
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
