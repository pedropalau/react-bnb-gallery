import clsx from 'clsx';
import { FocusTrap } from 'focus-trap-react';
import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseButton } from './components/close-button';
import { Gallery } from './components/gallery';
import {
	ARROW_LEFT_KEYCODE,
	ARROW_RIGHT_KEYCODE,
	DEFAULT_OPACITY,
	DEFAULT_Z_INDEX,
	ESC_KEYCODE,
	FORWARDS,
} from './constants';
import { defaultPhrases } from './default-phrases';
import type {
	GalleryComponents,
	GalleryController,
	GalleryPhoto,
	GalleryPhrases,
	GalleryRenderCaptionActions,
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
	/**
	 * @deprecated This prop will be removed in the next major release.
	 * In 2.x it still works as a compatibility alias for the overlay color.
	 * Prefer CSS token `--rbg-overlay`.
	 */
	backgroundColor?: string;
	direction?: string;
	enableZoom?: boolean;
	keyboard?: boolean;
	leftKeyPressed?: () => void;
	light?: boolean;
	nextButtonPressed?: () => void;
	onClose?: () => void;
	opacity?: number;
	photos?: string | GalleryPhoto | Array<string | GalleryPhoto>;
	phrases?: Partial<GalleryPhrases>;
	preloadSize?: number;
	prevButtonPressed?: () => void;
	renderCaptionActions?: GalleryRenderCaptionActions;
	components?: GalleryComponents;
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
 * @param backgroundColor - Deprecated in 2.x; still supported as compatibility alias for overlay color. Prefer CSS token `--rbg-overlay`
 * @param direction - Navigation direction; deprecated in 2.x — use `activePhotoIndex` with callbacks instead
 * @param enableZoom - Enables wheel/pinch zoom and pan interactions in the active photo viewport (default: `true`)
 * @param keyboard - Whether keyboard navigation is enabled (default: `true`)
 * @param leftKeyPressed - Callback fired when the left arrow key is pressed
 * @param light - Enables light mode styling (default: `false`)
 * @param nextButtonPressed - Callback fired when the next button is pressed
 * @param onClose - Callback fired when the gallery is closed
 * @param opacity - Overlay opacity between `0` and `1` (default: `0.8`)
 * @param photos - One or more photos to display; accepts a URL string, a `GalleryPhoto` object, or an array of either
 * @param phrases - Localization strings for UI labels
 * @param preloadSize - Number of photos to preload ahead of the active photo (default: `5`)
 * @param prevButtonPressed - Callback fired when the previous button is pressed
 * @param renderCaptionActions - Render prop for injecting custom controls in the caption action area
 * @param components - Optional slot overrides for built-in UI components such as close button, controls, photo, caption, and thumbnails
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
	backgroundColor: backgroundColorProp,
	direction = FORWARDS,
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
	const previousPropsRef = useRef<{
		photos?: string | GalleryPhoto | Array<string | GalleryPhoto>;
		direction?: string;
		backgroundColor?: string;
	} | null>(null);

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			return;
		}

		const previousProps = previousPropsRef.current;
		const usingNonArrayPhotosInput =
			photosInput != null && !Array.isArray(photosInput);
		const wasUsingNonArrayPhotosInput =
			previousProps?.photos != null && !Array.isArray(previousProps.photos);

		if (usingNonArrayPhotosInput && !wasUsingNonArrayPhotosInput) {
			console.warn(
				'[react-bnb-gallery] Deprecation: passing `photos` as a single string/object is deprecated in 2.x and will be removed in the next major release. Pass an array instead.',
			);
		}

		const usingDeprecatedDirectionProp =
			typeof direction === 'string' && direction !== FORWARDS;
		const wasUsingDeprecatedDirectionProp =
			typeof previousProps?.direction === 'string' &&
			previousProps.direction !== FORWARDS;

		if (usingDeprecatedDirectionProp && !wasUsingDeprecatedDirectionProp) {
			console.warn(
				'[react-bnb-gallery] Deprecation: `direction` is deprecated in 2.x and will be removed in the next major release. Use navigation callbacks and `activePhotoIndex` control instead.',
			);
		}

		const usingDeprecatedBackgroundColorProp =
			typeof backgroundColorProp === 'string' && backgroundColorProp.length > 0;
		const wasUsingDeprecatedBackgroundColorProp =
			typeof previousProps?.backgroundColor === 'string' &&
			previousProps.backgroundColor.length > 0;

		if (
			usingDeprecatedBackgroundColorProp &&
			!wasUsingDeprecatedBackgroundColorProp
		) {
			console.warn(
				'[react-bnb-gallery] Deprecation: `backgroundColor` is deprecated in 2.x and will be removed in the next major release. Use CSS token `--rbg-overlay` instead.',
			);
		}

		previousPropsRef.current = {
			photos: photosInput,
			direction,
			backgroundColor: backgroundColorProp,
		};
	}, [backgroundColorProp, photosInput, direction]);

	const photos = useMemo(
		() => normalizePhotos(photosInput || []),
		[photosInput],
	);
	const phrases = useMemo(
		() => ({ ...defaultPhrases, ...(phrasesProp || {}) }),
		[phrasesProp],
	);
	const [displayedPhotoIndex, setDisplayedPhotoIndex] = useState(() =>
		normalizeActivePhotoIndex(activePhotoIndex, photos.length),
	);

	useEffect(() => {
		setDisplayedPhotoIndex(
			normalizeActivePhotoIndex(activePhotoIndex, photos.length),
		);
	}, [activePhotoIndex, photos.length]);

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

	const galleryModalOverlayStyles = useMemo(() => {
		const hasDeprecatedBackgroundColorOverride =
			typeof backgroundColorProp === 'string' &&
			backgroundColorProp.trim().length > 0;

		return {
			opacity,
			...(hasDeprecatedBackgroundColorOverride
				? { backgroundColor: backgroundColorProp }
				: {}),
		};
	}, [backgroundColorProp, opacity]);
	const hasMoreThanOnePhoto = photos.length > 1;
	const photoCounterLabel = `${displayedPhotoIndex + 1} / ${photos.length}`;
	const CloseButtonComponent = components?.CloseButton ?? CloseButton;

	if (!show) {
		return null;
	}

	if (typeof document === 'undefined') {
		return null;
	}

	return createPortal(
		<FocusTrap
			focusTrapOptions={{
				fallbackFocus: () => modalRef.current || document.body,
			}}
		>
			<div
				ref={modalRef}
				className={clsx('gallery-modal', light && 'mode-light')}
				onKeyDown={keyboard ? onKeyDown : undefined}
				tabIndex={-1}
				role="dialog"
				aria-modal="true"
				style={{ zIndex }}
			>
				<div
					style={galleryModalOverlayStyles}
					className="gallery-modal--overlay"
				/>
				<div className="gallery-modal--container">
					<div className="gallery-modal--table">
						<div className="gallery-modal--cell">
							<div className="gallery-modal--content">
								<div className="gallery-modal--close">
									<CloseButtonComponent onPress={close} light={light} />
								</div>
								<div className="gallery-content">
									<div className="gallery-top">
										<div className="gallery-top--inner">
											{hasMoreThanOnePhoto && (
												<p className="gallery-photo-counter" aria-live="polite">
													{photoCounterLabel}
												</p>
											)}
										</div>
									</div>
									<Gallery
										phrases={phrases}
										ref={gallery}
										photos={photos}
										light={light}
										wrap={wrap}
										activePhotoIndex={activePhotoIndex}
										activePhotoPressed={activePhotoPressed}
										direction={direction}
										enableZoom={enableZoom}
										nextButtonPressed={nextButtonPressed}
										prevButtonPressed={prevButtonPressed}
										renderCaptionActions={renderCaptionActions}
										components={components}
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
				</div>
			</div>
		</FocusTrap>,
		document.body,
	);
}
