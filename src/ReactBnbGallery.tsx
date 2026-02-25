/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import classnames from 'classnames';
import FocusTrap from 'focus-trap-react';
import type { KeyboardEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Portal } from 'react-portal';
import { galleryDefaultProps } from './common';
import CloseButton from './components/CloseButton';
import Gallery from './components/Gallery';
import {
	ARROW_LEFT_KEYCODE,
	ARROW_RIGHT_KEYCODE,
	DEFAULT_OPACITY,
	DEFAULT_Z_INDEX,
	ESC_KEYCODE,
	FORWARDS,
} from './constants';
import type {
	GalleryController,
	GalleryPhoto,
	GalleryPhrases,
} from './types/gallery';
import getPhotos from './utils/getPhotos';
import noop from './utils/noop';

import './css/style.css';

interface ReactBnbGalleryProps {
	activePhotoIndex?: number;
	activePhotoPressed?: () => void;
	backgroundColor?: string;
	direction?: string;
	keyboard?: boolean;
	leftKeyPressed?: () => void;
	light?: boolean;
	nextButtonPressed?: () => void;
	onClose?: () => void;
	opacity?: number;
	photos?: string | GalleryPhoto | Array<string | GalleryPhoto>;
	phrases?: GalleryPhrases;
	preloadSize?: number;
	prevButtonPressed?: () => void;
	rightKeyPressed?: () => void;
	show?: boolean;
	showThumbnails?: boolean;
	wrap?: boolean;
	zIndex?: number;
}

function ReactBnbGallery({
	activePhotoIndex = galleryDefaultProps.activePhotoIndex,
	activePhotoPressed = galleryDefaultProps.activePhotoPressed,
	backgroundColor = galleryDefaultProps.backgroundColor,
	direction = galleryDefaultProps.direction,
	keyboard = true,
	leftKeyPressed = noop,
	light = galleryDefaultProps.light,
	nextButtonPressed = galleryDefaultProps.nextButtonPressed,
	onClose = noop,
	opacity = DEFAULT_OPACITY,
	photos: photosInput = galleryDefaultProps.photos,
	phrases = galleryDefaultProps.phrases,
	preloadSize = galleryDefaultProps.preloadSize,
	prevButtonPressed = galleryDefaultProps.prevButtonPressed,
	rightKeyPressed = noop,
	show = false,
	showThumbnails = galleryDefaultProps.showThumbnails,
	wrap = galleryDefaultProps.wrap,
	zIndex = DEFAULT_Z_INDEX,
}: ReactBnbGalleryProps) {
	const gallery = useRef<GalleryController | null>(null);
	const previousPropsRef = useRef<{
		photos?: string | GalleryPhoto | Array<string | GalleryPhoto>;
		direction?: string;
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

		previousPropsRef.current = {
			photos: photosInput,
			direction,
		};
	}, [photosInput, direction]);

	const photos = useMemo(() => getPhotos(photosInput || []), [photosInput]);

	const close = useCallback(() => {
		onClose();
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
					leftKeyPressed();
					break;
				case 'ArrowRight':
				case ARROW_RIGHT_KEYCODE:
					event.preventDefault();
					gallery.current?.next();
					rightKeyPressed();
					break;
				default:
			}
		},
		[close, leftKeyPressed, rightKeyPressed],
	);

	const galleryModalOverlayStyles = useMemo(
		() => ({ opacity, backgroundColor }),
		[backgroundColor, opacity],
	);

	if (!show) {
		return null;
	}

	return (
		<Portal>
			<FocusTrap>
				<div
					className={classnames(['gallery-modal', light && 'mode-light'])}
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
										<CloseButton onPress={close} light={light} />
									</div>
									<div className="gallery-content">
										<div className="gallery-top">
											<div className="gallery-top--inner" />
										</div>
										<Gallery
											phrases={phrases}
											ref={gallery}
											photos={photos}
											wrap={wrap}
											activePhotoIndex={activePhotoIndex}
											activePhotoPressed={activePhotoPressed}
											direction={direction}
											nextButtonPressed={nextButtonPressed}
											prevButtonPressed={prevButtonPressed}
											showThumbnails={showThumbnails}
											preloadSize={preloadSize}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</FocusTrap>
		</Portal>
	);
}

export default ReactBnbGallery;
