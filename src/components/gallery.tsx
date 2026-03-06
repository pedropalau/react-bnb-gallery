import clsx from 'clsx';
import type { CSSProperties, MouseEvent, TouchEvent, WheelEvent } from 'react';
import {
	forwardRef,
	memo,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';

import { DIRECTION_NEXT, DIRECTION_PREV } from '../constants';
import { defaultPhrases } from '../default-phrases';
import type {
	GalleryClassNames,
	GalleryComponents,
	GalleryController,
	GalleryPhoto,
	GalleryPhrases,
	GalleryRenderCaptionActions,
	GalleryStyles,
} from '../types/gallery';
import { Caption } from './caption';
import { NextButton } from './next-button';
import { Photo } from './photo';
import { PrevButton } from './prev-button';

/**
 * Props for the internal gallery viewport, controls, and caption panel.
 */
interface GalleryProps {
	activePhotoIndex?: number;
	activePhotoPressed?: () => void;
	direction?: string;
	enableZoom?: boolean;
	light?: boolean;
	maxZoom?: number;
	nextButtonPressed?: () => void;
	onActivePhotoIndexChange?: (index: number) => void;
	phrases?: GalleryPhrases;
	photos?: GalleryPhoto[];
	preloadSize?: number;
	prevButtonPressed?: () => void;
	renderCaptionActions?: GalleryRenderCaptionActions;
	showThumbnails?: boolean;
	zoomStep?: number;
	wrap?: boolean;
	components?: GalleryComponents;
	classNames?: GalleryClassNames;
	styles?: GalleryStyles;
}

interface TouchInfo {
	screenX: number;
}

interface PinchInfo {
	startDistance: number;
	startScale: number;
	startOffsetX: number;
	startOffsetY: number;
	startMidpointX: number;
	startMidpointY: number;
}

interface GalleryState {
	activePhotoIndex: number;
	hidePrevButton: boolean;
	hideNextButton: boolean;
	controlsDisabled: boolean;
	zoomScale: number;
	zoomOffsetX: number;
	zoomOffsetY: number;
	isPanning: boolean;
	touchStartInfo: TouchInfo | null;
	touchEndInfo: TouchInfo | null;
	touchMoved: boolean;
}

const EMPTY_PHOTOS: GalleryPhoto[] = [];
const MIN_ZOOM = 1;

function clampZoomOffset(
	offsetX: number,
	offsetY: number,
	scale: number,
	element: HTMLElement | null,
	mediaElement: HTMLImageElement | null,
) {
	if (!element || !mediaElement || scale <= MIN_ZOOM) {
		return { x: 0, y: 0 };
	}

	const viewportWidth = element.clientWidth;
	const viewportHeight = element.clientHeight;
	const intrinsicWidth = mediaElement.naturalWidth || mediaElement.clientWidth;
	const intrinsicHeight =
		mediaElement.naturalHeight || mediaElement.clientHeight;

	if (
		viewportWidth <= 0 ||
		viewportHeight <= 0 ||
		intrinsicWidth <= 0 ||
		intrinsicHeight <= 0
	) {
		return { x: 0, y: 0 };
	}

	const containScale = Math.min(
		viewportWidth / intrinsicWidth,
		viewportHeight / intrinsicHeight,
		1,
	);
	const renderedWidth = intrinsicWidth * containScale;
	const renderedHeight = intrinsicHeight * containScale;
	const maxX = Math.max(0, (renderedWidth * scale - viewportWidth) / 2);
	const maxY = Math.max(0, (renderedHeight * scale - viewportHeight) / 2);

	return {
		x: Math.min(Math.max(offsetX, -maxX), maxX),
		y: Math.min(Math.max(offsetY, -maxY), maxY),
	};
}

/**
 * Clamps a requested active index to available photo bounds.
 */
function getNormalizedActivePhotoIndex(
	activePhotoIndex: number,
	totalPhotos: number,
): number {
	if (totalPhotos === 0) {
		return 0;
	}

	return Math.min(Math.max(activePhotoIndex, 0), totalPhotos - 1);
}

/**
 * Computes control visibility based on boundary and wrap mode.
 */
function getWrapControlState(
	activePhotoIndex: number,
	totalPhotos: number,
	wrap: boolean,
) {
	if (wrap || totalPhotos <= 1) {
		return {
			hidePrevButton: false,
			hideNextButton: false,
		};
	}

	return {
		hidePrevButton: activePhotoIndex === 0,
		hideNextButton: activePhotoIndex === totalPhotos - 1,
	};
}

/**
 * Core carousel component responsible for image navigation and touch gestures.
 */
const Gallery = forwardRef<GalleryController, GalleryProps>(function Gallery(
	{
		activePhotoIndex = 0,
		activePhotoPressed,
		enableZoom = true,
		light = false,
		maxZoom = 3,
		nextButtonPressed,
		onActivePhotoIndexChange,
		phrases = defaultPhrases,
		photos = EMPTY_PHOTOS,
		preloadSize = 5,
		prevButtonPressed,
		renderCaptionActions,
		showThumbnails = true,
		zoomStep = 0.25,
		wrap = false,
		components,
		classNames,
		styles,
	},
	ref,
) {
	const PrevButtonComponent = components?.PrevButton ?? PrevButton;
	const NextButtonComponent = components?.NextButton ?? NextButton;
	const PhotoComponent = components?.Photo ?? Photo;
	const CaptionComponent = components?.Caption ?? Caption;

	const photoButtonRef = useRef<HTMLButtonElement | null>(null);
	const photoImageRef = useRef<HTMLImageElement | null>(null);
	const previousActivePhotoIndexRef = useRef(activePhotoIndex);
	const zoomScaleRef = useRef(MIN_ZOOM);
	const panStartRef = useRef({ x: 0, y: 0 });
	const panOriginRef = useRef({ x: 0, y: 0 });
	const pinchStartRef = useRef<PinchInfo | null>(null);
	const [state, setState] = useState<GalleryState>(() => {
		const normalizedActivePhotoIndex = getNormalizedActivePhotoIndex(
			activePhotoIndex,
			photos.length,
		);
		const { hidePrevButton, hideNextButton } = getWrapControlState(
			normalizedActivePhotoIndex,
			photos.length,
			wrap,
		);
		return {
			activePhotoIndex: normalizedActivePhotoIndex,
			hidePrevButton,
			hideNextButton,
			controlsDisabled: true,
			zoomScale: MIN_ZOOM,
			zoomOffsetX: 0,
			zoomOffsetY: 0,
			isPanning: false,
			touchStartInfo: null,
			touchEndInfo: null,
			touchMoved: false,
		};
	});

	useEffect(() => {
		const normalizedActivePhotoIndex = getNormalizedActivePhotoIndex(
			activePhotoIndex,
			photos.length,
		);
		const { hidePrevButton, hideNextButton } = getWrapControlState(
			normalizedActivePhotoIndex,
			photos.length,
			wrap,
		);

		setState((prevState) => {
			if (
				prevState.activePhotoIndex === normalizedActivePhotoIndex &&
				prevState.hidePrevButton === hidePrevButton &&
				prevState.hideNextButton === hideNextButton
			) {
				return prevState;
			}

			return {
				...prevState,
				activePhotoIndex: normalizedActivePhotoIndex,
				hidePrevButton,
				hideNextButton,
			};
		});
	}, [activePhotoIndex, photos, wrap]);

	useEffect(() => {
		onActivePhotoIndexChange?.(state.activePhotoIndex);
	}, [onActivePhotoIndexChange, state.activePhotoIndex]);

	useEffect(() => {
		const activePhotoChanged =
			previousActivePhotoIndexRef.current !== state.activePhotoIndex;
		previousActivePhotoIndexRef.current = state.activePhotoIndex;
		const shouldResetZoom = activePhotoChanged || !enableZoom;
		if (!shouldResetZoom) {
			return;
		}

		setState((prevState) => {
			if (
				prevState.zoomScale === MIN_ZOOM &&
				prevState.zoomOffsetX === 0 &&
				prevState.zoomOffsetY === 0 &&
				!prevState.isPanning
			) {
				return prevState;
			}

			return {
				...prevState,
				zoomScale: MIN_ZOOM,
				zoomOffsetX: 0,
				zoomOffsetY: 0,
				isPanning: false,
			};
		});
	}, [enableZoom, state.activePhotoIndex]);

	useEffect(() => {
		zoomScaleRef.current = state.zoomScale;
	}, [state.zoomScale]);

	const getItemByDirection = useCallback(
		(direction: string, activeIndex: number) => {
			if (photos.length === 0) {
				return 0;
			}

			const isNextDirection = direction === DIRECTION_NEXT;
			const isPrevDirection = direction === DIRECTION_PREV;
			const lastItemIndex = photos.length - 1;
			const isGoingToWrap =
				(isPrevDirection && activeIndex === 0) ||
				(isNextDirection && activeIndex === lastItemIndex);

			if (isGoingToWrap && !wrap) {
				return activeIndex;
			}

			const delta = isPrevDirection ? -1 : 1;
			const itemIndex = (activeIndex + delta) % photos.length;
			return itemIndex === -1 ? photos.length - 1 : itemIndex;
		},
		[photos, wrap],
	);

	const move = useCallback(
		(direction: string, index: number | false = false) => {
			setState((prevState) => {
				const nextElementIndex =
					index !== false
						? index
						: getItemByDirection(direction, prevState.activePhotoIndex);

				const { hidePrevButton, hideNextButton } = getWrapControlState(
					nextElementIndex,
					photos.length,
					wrap,
				);

				return {
					...prevState,
					activePhotoIndex: nextElementIndex,
					hidePrevButton,
					hideNextButton,
				};
			});
		},
		[getItemByDirection, photos.length, wrap],
	);

	const prev = useCallback(() => {
		move(DIRECTION_PREV);
	}, [move]);

	const next = useCallback(() => {
		move(DIRECTION_NEXT);
	}, [move]);

	useImperativeHandle(
		ref,
		() => ({
			prev,
			next,
		}),
		[prev, next],
	);

	const onNextButtonPress = useCallback(() => {
		next();
		nextButtonPressed?.();
	}, [next, nextButtonPressed]);

	const onPrevButtonPress = useCallback(() => {
		prev();
		prevButtonPressed?.();
	}, [prev, prevButtonPressed]);

	const onPhotoLoad = useCallback(() => {
		setState((prevState) => ({ ...prevState, controlsDisabled: false }));
	}, []);

	const onPhotoError = useCallback(() => {
		setState((prevState) => ({ ...prevState, controlsDisabled: false }));
	}, []);

	const onPhotoPress = useCallback(() => {
		if (enableZoom && zoomScaleRef.current > MIN_ZOOM) {
			return;
		}
		move(DIRECTION_NEXT);
		activePhotoPressed?.();
	}, [activePhotoPressed, enableZoom, move]);

	const normalizedMaxZoom = Math.max(MIN_ZOOM, maxZoom);
	const normalizedZoomStep = Math.max(0.1, zoomStep);
	const isZoomMode = enableZoom && state.zoomScale > MIN_ZOOM;

	const getTouchDistance = useCallback(
		(
			touchA: { clientX: number; clientY: number },
			touchB: {
				clientX: number;
				clientY: number;
			},
		) => {
			const deltaX = touchA.clientX - touchB.clientX;
			const deltaY = touchA.clientY - touchB.clientY;
			return Math.hypot(deltaX, deltaY);
		},
		[],
	);

	const setZoomScale = useCallback(
		(nextScale: number, focalClientX?: number, focalClientY?: number) => {
			setState((prevState) => {
				const clampedScale = Math.min(
					Math.max(nextScale, MIN_ZOOM),
					normalizedMaxZoom,
				);
				if (
					clampedScale === prevState.zoomScale &&
					focalClientX === undefined &&
					focalClientY === undefined
				) {
					return prevState;
				}

				let nextOffsetX = prevState.zoomOffsetX;
				let nextOffsetY = prevState.zoomOffsetY;
				const element = photoButtonRef.current;

				if (
					element &&
					focalClientX !== undefined &&
					focalClientY !== undefined &&
					prevState.zoomScale > 0
				) {
					const rect = element.getBoundingClientRect();
					const focalX = focalClientX - rect.left - rect.width / 2;
					const focalY = focalClientY - rect.top - rect.height / 2;
					const scaleRatio = clampedScale / prevState.zoomScale;

					nextOffsetX = (prevState.zoomOffsetX - focalX) * scaleRatio + focalX;
					nextOffsetY = (prevState.zoomOffsetY - focalY) * scaleRatio + focalY;
				}

				const nextOffsets = clampZoomOffset(
					nextOffsetX,
					nextOffsetY,
					clampedScale,
					element,
					photoImageRef.current,
				);

				return {
					...prevState,
					zoomScale: clampedScale,
					zoomOffsetX: nextOffsets.x,
					zoomOffsetY: nextOffsets.y,
					isPanning: clampedScale > MIN_ZOOM ? prevState.isPanning : false,
				};
			});
		},
		[normalizedMaxZoom],
	);

	const startPan = useCallback(
		(clientX: number, clientY: number) => {
			if (!enableZoom || state.zoomScale <= MIN_ZOOM) {
				return;
			}

			panStartRef.current = { x: clientX, y: clientY };
			panOriginRef.current = { x: state.zoomOffsetX, y: state.zoomOffsetY };

			setState((prevState) => ({ ...prevState, isPanning: true }));
		},
		[enableZoom, state.zoomOffsetX, state.zoomOffsetY, state.zoomScale],
	);

	const updatePan = useCallback((clientX: number, clientY: number) => {
		setState((prevState) => {
			if (!prevState.isPanning) {
				return prevState;
			}

			const deltaX = clientX - panStartRef.current.x;
			const deltaY = clientY - panStartRef.current.y;
			const nextOffsets = clampZoomOffset(
				panOriginRef.current.x + deltaX,
				panOriginRef.current.y + deltaY,
				prevState.zoomScale,
				photoButtonRef.current,
				photoImageRef.current,
			);

			return {
				...prevState,
				zoomOffsetX: nextOffsets.x,
				zoomOffsetY: nextOffsets.y,
			};
		});
	}, []);

	const endPan = useCallback(() => {
		setState((prevState) => {
			if (!prevState.isPanning) {
				return prevState;
			}

			return {
				...prevState,
				isPanning: false,
			};
		});
	}, []);

	const onTouchStart = useCallback(
		(event: TouchEvent) => {
			if (!enableZoom) {
				const touch = event.targetTouches[0];
				if (!touch) {
					return;
				}
				setState((prevState) => ({
					...prevState,
					touchStartInfo: touch,
				}));
				return;
			}

			if (event.targetTouches.length === 2) {
				const firstTouch = event.targetTouches[0];
				const secondTouch = event.targetTouches[1];
				if (!firstTouch || !secondTouch) {
					return;
				}

				const startDistance = getTouchDistance(firstTouch, secondTouch);
				pinchStartRef.current = {
					startDistance,
					startScale: state.zoomScale,
					startOffsetX: state.zoomOffsetX,
					startOffsetY: state.zoomOffsetY,
					startMidpointX: (firstTouch.clientX + secondTouch.clientX) / 2,
					startMidpointY: (firstTouch.clientY + secondTouch.clientY) / 2,
				};
				setState((prevState) => ({
					...prevState,
					touchMoved: false,
					touchStartInfo: null,
					touchEndInfo: null,
					isPanning: false,
				}));
				return;
			}

			const touch = event.targetTouches[0];
			if (!touch) {
				return;
			}

			if (state.zoomScale > MIN_ZOOM) {
				startPan(touch.clientX, touch.clientY);
				return;
			}

			setState((prevState) => ({
				...prevState,
				touchStartInfo: touch,
			}));
		},
		[
			enableZoom,
			getTouchDistance,
			startPan,
			state.zoomOffsetX,
			state.zoomOffsetY,
			state.zoomScale,
		],
	);

	const onTouchMove = useCallback(
		(event: TouchEvent) => {
			if (!enableZoom) {
				const touch = event.targetTouches[0];
				if (!touch) {
					return;
				}

				setState((prevState) => ({
					...prevState,
					touchMoved: true,
					touchEndInfo: touch,
				}));
				return;
			}

			if (event.targetTouches.length === 2 && pinchStartRef.current) {
				const firstTouch = event.targetTouches[0];
				const secondTouch = event.targetTouches[1];
				if (!firstTouch || !secondTouch) {
					return;
				}

				event.preventDefault();
				const pinchStart = pinchStartRef.current;
				const currentDistance = getTouchDistance(firstTouch, secondTouch);
				const distanceRatio =
					pinchStart.startDistance > 0
						? currentDistance / pinchStart.startDistance
						: 1;
				const nextScale = pinchStart.startScale * distanceRatio;
				const midpointX = (firstTouch.clientX + secondTouch.clientX) / 2;
				const midpointY = (firstTouch.clientY + secondTouch.clientY) / 2;
				const midpointDeltaX = midpointX - pinchStart.startMidpointX;
				const midpointDeltaY = midpointY - pinchStart.startMidpointY;
				const baseOffsetX = pinchStart.startOffsetX + midpointDeltaX;
				const baseOffsetY = pinchStart.startOffsetY + midpointDeltaY;

				setState((prevState) => {
					const clampedScale = Math.min(
						Math.max(nextScale, MIN_ZOOM),
						normalizedMaxZoom,
					);
					let nextOffsetX = baseOffsetX;
					let nextOffsetY = baseOffsetY;
					const element = photoButtonRef.current;
					if (element && pinchStart.startScale > 0) {
						const rect = element.getBoundingClientRect();
						const focalX = midpointX - rect.left - rect.width / 2;
						const focalY = midpointY - rect.top - rect.height / 2;
						const scaleRatio = clampedScale / pinchStart.startScale;

						nextOffsetX = (baseOffsetX - focalX) * scaleRatio + focalX;
						nextOffsetY = (baseOffsetY - focalY) * scaleRatio + focalY;
					}

					const nextOffsets = clampZoomOffset(
						nextOffsetX,
						nextOffsetY,
						clampedScale,
						element,
						photoImageRef.current,
					);

					return {
						...prevState,
						zoomScale: clampedScale,
						zoomOffsetX: nextOffsets.x,
						zoomOffsetY: nextOffsets.y,
						isPanning: false,
						touchMoved: false,
						touchStartInfo: null,
						touchEndInfo: null,
					};
				});
				return;
			}

			const touch = event.targetTouches[0];
			if (!touch) {
				return;
			}

			if (state.zoomScale > MIN_ZOOM) {
				event.preventDefault();
				updatePan(touch.clientX, touch.clientY);
				return;
			}

			setState((prevState) => ({
				...prevState,
				touchMoved: true,
				touchEndInfo: touch,
			}));
		},
		[
			getTouchDistance,
			enableZoom,
			normalizedMaxZoom,
			state.zoomScale,
			updatePan,
		],
	);

	const zoomScale = state.zoomScale;
	const touchStartInfo = state.touchStartInfo;
	const touchEndInfo = state.touchEndInfo;
	const touchMoved = state.touchMoved;

	const onTouchEnd = useCallback(() => {
		if (pinchStartRef.current) {
			pinchStartRef.current = null;
			endPan();
			return;
		}

		if (enableZoom && zoomScale > MIN_ZOOM) {
			endPan();
			return;
		}

		const shouldGoPrev =
			touchMoved &&
			touchStartInfo != null &&
			touchEndInfo != null &&
			touchStartInfo.screenX < touchEndInfo.screenX;
		const shouldGoNext =
			touchMoved &&
			touchStartInfo != null &&
			touchEndInfo != null &&
			touchStartInfo.screenX > touchEndInfo.screenX;

		setState((prevState) => ({
			...prevState,
			touchMoved: false,
		}));

		if (shouldGoPrev) {
			onPrevButtonPress();
		} else if (shouldGoNext) {
			onNextButtonPress();
		}
	}, [
		enableZoom,
		endPan,
		onNextButtonPress,
		onPrevButtonPress,
		touchEndInfo,
		touchMoved,
		touchStartInfo,
		zoomScale,
	]);

	const onMouseDown = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			if (isZoomMode) {
				event.preventDefault();
			}
			startPan(event.clientX, event.clientY);
		},
		[isZoomMode, startPan],
	);

	const onMouseMove = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			updatePan(event.clientX, event.clientY);
		},
		[updatePan],
	);

	const onMouseUp = useCallback(() => {
		endPan();
	}, [endPan]);

	const onMouseLeave = useCallback(() => {
		endPan();
	}, [endPan]);

	const onWheel = useCallback(
		(event: WheelEvent<HTMLButtonElement>) => {
			if (!enableZoom) {
				return;
			}
			if (event.deltaY === 0) {
				return;
			}

			event.preventDefault();
			const zoomDirection = event.deltaY < 0 ? 1 : -1;
			const wheelStepMultiplier = Math.max(
				1,
				Math.min(Math.abs(event.deltaY) / 100, 3),
			);
			const delta = normalizedZoomStep * wheelStepMultiplier * zoomDirection;

			setZoomScale(state.zoomScale + delta, event.clientX, event.clientY);
		},
		[enableZoom, normalizedZoomStep, setZoomScale, state.zoomScale],
	);

	const to = useCallback(
		(index: number) => {
			if (
				index > photos.length - 1 ||
				index < 0 ||
				state.activePhotoIndex === index
			) {
				return;
			}

			const direction =
				index > state.activePhotoIndex ? DIRECTION_NEXT : DIRECTION_PREV;
			move(direction, index);
		},
		[move, photos.length, state.activePhotoIndex],
	);

	const onThumbnailPress = useCallback(
		(index: number) => {
			to(index);
		},
		[to],
	);

	const controls = useMemo(() => {
		const hasMultiplePhotos = photos.length > 1;
		if (!hasMultiplePhotos) {
			return null;
		}

		const ui = [];
		if (!state.hidePrevButton) {
			ui.push(
				<PrevButtonComponent
					key=".prevControl"
					disabled={state.controlsDisabled}
					onPress={onPrevButtonPress}
					light={light}
					className={classNames?.prevButton}
					style={styles?.prevButton}
				/>,
			);
		}
		if (!state.hideNextButton) {
			ui.push(
				<NextButtonComponent
					key=".nextControl"
					disabled={state.controlsDisabled}
					onPress={onNextButtonPress}
					light={light}
					className={classNames?.nextButton}
					style={styles?.nextButton}
				/>,
			);
		}
		return ui;
	}, [
		NextButtonComponent,
		PrevButtonComponent,
		light,
		onNextButtonPress,
		onPrevButtonPress,
		photos.length,
		classNames?.nextButton,
		classNames?.prevButton,
		state.controlsDisabled,
		state.hideNextButton,
		state.hidePrevButton,
		styles?.nextButton,
		styles?.prevButton,
	]);

	const zoomedPhotoStyle = useMemo(
		() =>
			({
				'--rbg-zoom-scale': String(state.zoomScale),
				'--rbg-pan-x': `${state.zoomOffsetX}px`,
				'--rbg-pan-y': `${state.zoomOffsetY}px`,
				'--rbg-zoom-transition': state.isPanning
					? 'none'
					: 'transform 180ms ease-out',
			}) as CSSProperties,
		[state.isPanning, state.zoomOffsetX, state.zoomOffsetY, state.zoomScale],
	);

	const galleryModalPreloadPhotos = useMemo(() => {
		let counter = 1;
		let index = state.activePhotoIndex;
		const preloadPhotos = [];

		while (index < photos.length && counter <= preloadSize) {
			const photo = photos[index];
			preloadPhotos.push(
				<img key={photo.photo || index} alt={photo.photo} src={photo.photo} />,
			);
			index += 1;
			counter += 1;
		}

		return preloadPhotos;
	}, [photos, preloadSize, state.activePhotoIndex]);

	const hasPhotos = photos.length > 0;
	const current = photos[state.activePhotoIndex];
	const { noPhotosProvided: emptyMessage } = phrases;

	return (
		<div
			className={clsx('gallery', classNames?.gallery)}
			style={styles?.gallery}
		>
			<div className="gallery-modal--preload">{galleryModalPreloadPhotos}</div>
			<div className="gallery-main">
				{controls}
				<div className="gallery-photos">
					{hasPhotos ? (
						<div className="gallery-photo">
							<div className="gallery-photo--current">
								<PhotoComponent
									photo={current}
									onLoad={onPhotoLoad}
									onError={onPhotoError}
									onPress={onPhotoPress}
									onTouchStart={onTouchStart}
									onTouchMove={onTouchMove}
									onTouchEnd={onTouchEnd}
									onMouseDown={onMouseDown}
									onMouseMove={onMouseMove}
									onMouseUp={onMouseUp}
									onMouseLeave={onMouseLeave}
									onWheel={onWheel}
									buttonRef={photoButtonRef}
									imageRef={photoImageRef}
									disablePress={isZoomMode}
									enableZoom={enableZoom}
									isZoomMode={isZoomMode}
									isPanning={state.isPanning}
									style={zoomedPhotoStyle}
									buttonClassName={classNames?.photoButton}
									buttonStyle={styles?.photoButton}
									imageClassName={classNames?.photoImage}
									imageStyle={styles?.photoImage}
								/>
							</div>
						</div>
					) : (
						<div className="gallery-empty">{emptyMessage}</div>
					)}
				</div>
			</div>
			{showThumbnails && current && (
				<CaptionComponent
					phrases={phrases}
					current={state.activePhotoIndex}
					photos={photos}
					onPress={onThumbnailPress}
					renderCaptionActions={renderCaptionActions}
					showThumbnails={showThumbnails}
					className={classNames?.caption}
					style={styles?.caption}
					thumbnailsListClassName={classNames?.thumbnailsList}
					thumbnailsListStyle={styles?.thumbnailsList}
					thumbnailItemClassName={classNames?.thumbnailItem}
					thumbnailItemStyle={styles?.thumbnailItem}
					thumbnailClassName={classNames?.thumbnailButton}
					thumbnailStyle={styles?.thumbnailButton}
					thumbnailImageClassName={classNames?.thumbnailImage}
					thumbnailImageStyle={styles?.thumbnailImage}
					togglePhotoListClassName={classNames?.togglePhotoList}
					togglePhotoListStyle={styles?.togglePhotoList}
					components={{
						Thumbnail: components?.Thumbnail,
						TogglePhotoList: components?.TogglePhotoList,
					}}
				/>
			)}
		</div>
	);
});

const MemoizedGallery = memo(Gallery);

export { MemoizedGallery as Gallery };
