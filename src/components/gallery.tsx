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
import { defaultPhrases } from '../default-phrases';
import { usePrefersReducedMotion } from '../hooks/use-prefers-reduced-motion';
import type {
	GalleryAnimationOptions,
	GalleryClassNames,
	GalleryComponents,
	GalleryController,
	GalleryControlsPlacement,
	GalleryImageFit,
	GalleryPhoto,
	GalleryPhrases,
	GalleryRenderCaptionActions,
	GalleryStyles,
} from '../types/gallery';
import { Caption } from './caption';
import { GalleryContextProvider } from './gallery-context';
import { NextButton } from './next-button';
import { Photo } from './photo';
import { PrevButton } from './prev-button';

/**
 * Props for the internal gallery viewport, controls, and caption panel.
 */
interface GalleryProps {
	activePhotoIndex?: number;
	activePhotoPressed?: () => void;
	animations?: GalleryAnimationOptions;
	enableZoom?: boolean;
	imageFit?: GalleryImageFit;
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
	controlsPlacement?: GalleryControlsPlacement;
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

type GalleryDirection = 'prev' | 'next';

interface GalleryState {
	activePhotoIndex: number;
	transitionFromIndex: number | null;
	activePhotoReady: boolean;
	transitionDurationComplete: boolean;
	hidePrevButton: boolean;
	hideNextButton: boolean;
	lastDirection: GalleryDirection;
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
const DEFAULT_ANIMATION_PRESET = 'fade';
const DEFAULT_ANIMATION_DURATION_MS = 600;
const DEFAULT_ANIMATION_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
const DEFAULT_FEEDBACK_SCALE = 0.97;
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

function getPreloadIndexes(
	activePhotoIndex: number,
	totalPhotos: number,
	preloadSize: number,
	wrap: boolean,
) {
	if (totalPhotos <= 1 || preloadSize <= 0) {
		return [];
	}

	const maxPreloadCount = Math.min(preloadSize, totalPhotos - 1);
	const indexes: number[] = [];
	const seenIndexes = new Set<number>([activePhotoIndex]);
	let distance = 1;

	while (indexes.length < maxPreloadCount) {
		const forwardIndex = activePhotoIndex + distance;
		const backwardIndex = activePhotoIndex - distance;
		let addedIndexAtThisDistance = false;

		const candidates = [forwardIndex, backwardIndex];
		for (const candidateIndex of candidates) {
			let normalizedIndex = candidateIndex;
			if (wrap) {
				normalizedIndex =
					((candidateIndex % totalPhotos) + totalPhotos) % totalPhotos;
			} else if (candidateIndex < 0 || candidateIndex >= totalPhotos) {
				continue;
			}

			if (seenIndexes.has(normalizedIndex)) {
				continue;
			}

			seenIndexes.add(normalizedIndex);
			indexes.push(normalizedIndex);
			addedIndexAtThisDistance = true;

			if (indexes.length >= maxPreloadCount) {
				break;
			}
		}

		if (!wrap && !addedIndexAtThisDistance) {
			break;
		}

		distance += 1;
	}

	return indexes;
}

function getPhotoSource(photo: GalleryPhoto | undefined): string | null {
	return typeof photo?.photo === 'string' && photo.photo.length > 0
		? photo.photo
		: null;
}

/**
 * Core carousel component responsible for image navigation and touch gestures.
 */
const Gallery = forwardRef<GalleryController, GalleryProps>(function Gallery(
	{
		activePhotoIndex = 0,
		activePhotoPressed,
		animations,
		enableZoom = true,
		imageFit = 'contain',
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
		controlsPlacement = 'sides',
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
	// Default slot components consume shared config from context.
	// Custom slot components receive explicit props for backward compatibility.
	const isDefaultPrevButtonComponent = PrevButtonComponent === PrevButton;
	const isDefaultNextButtonComponent = NextButtonComponent === NextButton;
	const isDefaultCaptionComponent = CaptionComponent === Caption;
	const animationPreset = animations?.preset || DEFAULT_ANIMATION_PRESET;
	const animationDurationMs = Math.max(
		0,
		animations?.durationMs ?? DEFAULT_ANIMATION_DURATION_MS,
	);
	const animationEasing = animations?.easing || DEFAULT_ANIMATION_EASING;
	const prefersReducedMotion = usePrefersReducedMotion();
	const enableFeedback = animations?.enableFeedback ?? true;
	const feedbackScale = Math.min(
		1,
		Math.max(0.9, animations?.feedbackScale ?? DEFAULT_FEEDBACK_SCALE),
	);
	const isImageMotionEnabled =
		!prefersReducedMotion &&
		animationPreset !== 'none' &&
		animationDurationMs > 0;
	const shouldWaitForTransitionDuration =
		isImageMotionEnabled &&
		!(imageFit === 'contain' && (animationPreset === 'slide' || animationPreset === 'zoom'));

	const photoButtonRef = useRef<HTMLButtonElement | null>(null);
	const photoImageRef = useRef<HTMLImageElement | null>(null);
	const previousActivePhotoIndexRef = useRef(activePhotoIndex);
	const zoomScaleRef = useRef(MIN_ZOOM);
	const panStartRef = useRef({ x: 0, y: 0 });
	const panOriginRef = useRef({ x: 0, y: 0 });
	const pinchStartRef = useRef<PinchInfo | null>(null);
	const loadedPhotoSourcesRef = useRef<Set<string>>(new Set());
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
			transitionFromIndex: null,
			activePhotoReady: false,
			transitionDurationComplete: true,
			hidePrevButton,
			hideNextButton,
			lastDirection: 'next',
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

			const nextDirection =
				normalizedActivePhotoIndex > prevState.activePhotoIndex
					? 'next'
					: 'prev';
			const isPhotoChanged =
				prevState.activePhotoIndex !== normalizedActivePhotoIndex;
			const nextPhotoSrc = getPhotoSource(photos[normalizedActivePhotoIndex]);
			const isNextPhotoKnownAsLoaded =
				nextPhotoSrc != null && loadedPhotoSourcesRef.current.has(nextPhotoSrc);
			const nextTransitionFromIndex =
				isImageMotionEnabled && isPhotoChanged
					? prevState.activePhotoIndex
					: null;

			return {
				...prevState,
				activePhotoIndex: normalizedActivePhotoIndex,
				transitionFromIndex: nextTransitionFromIndex,
				activePhotoReady: isPhotoChanged
					? isNextPhotoKnownAsLoaded
					: prevState.activePhotoReady,
				transitionDurationComplete:
					nextTransitionFromIndex == null || !shouldWaitForTransitionDuration,
				hidePrevButton,
				hideNextButton,
				lastDirection: nextDirection,
			};
		});
	}, [
		activePhotoIndex,
		isImageMotionEnabled,
		photos,
		shouldWaitForTransitionDuration,
		wrap,
	]);

	useEffect(() => {
		onActivePhotoIndexChange?.(state.activePhotoIndex);
	}, [onActivePhotoIndexChange, state.activePhotoIndex]);

	useEffect(() => {
		if (isImageMotionEnabled) {
			return;
		}

		setState((prevState) => {
			if (prevState.transitionFromIndex === null) {
				return prevState;
			}

			return {
				...prevState,
				transitionFromIndex: null,
				transitionDurationComplete: true,
			};
		});
	}, [isImageMotionEnabled]);

	useEffect(() => {
		if (
			!isImageMotionEnabled ||
			!shouldWaitForTransitionDuration ||
			state.transitionFromIndex === null
		) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setState((prevState) => {
				if (
					prevState.transitionFromIndex === null ||
					prevState.transitionDurationComplete
				) {
					return prevState;
				}

				return {
					...prevState,
					transitionDurationComplete: true,
				};
			});
		}, animationDurationMs);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [
		animationDurationMs,
		isImageMotionEnabled,
		shouldWaitForTransitionDuration,
		state.transitionFromIndex,
	]);

	useEffect(() => {
		if (state.transitionFromIndex == null) {
			return;
		}

		if (!state.transitionDurationComplete || !state.activePhotoReady) {
			return;
		}

		setState((prevState) => {
			if (prevState.transitionFromIndex == null) {
				return prevState;
			}

			return {
				...prevState,
				transitionFromIndex: null,
			};
		});
	}, [
		state.activePhotoReady,
		state.transitionDurationComplete,
		state.transitionFromIndex,
	]);

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
		(direction: GalleryDirection, activeIndex: number) => {
			if (photos.length === 0) {
				return 0;
			}

			const isNextDirection = direction === 'next';
			const isPrevDirection = direction === 'prev';
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
		(direction: GalleryDirection, index: number | false = false) => {
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

				if (
					prevState.activePhotoIndex === nextElementIndex &&
					prevState.hidePrevButton === hidePrevButton &&
					prevState.hideNextButton === hideNextButton &&
					prevState.lastDirection === direction
				) {
					return prevState;
				}

				const isPhotoChanged = prevState.activePhotoIndex !== nextElementIndex;
				const nextPhotoSrc = getPhotoSource(photos[nextElementIndex]);
				const isNextPhotoKnownAsLoaded =
					nextPhotoSrc != null &&
					loadedPhotoSourcesRef.current.has(nextPhotoSrc);
				const nextTransitionFromIndex =
					isImageMotionEnabled && isPhotoChanged
						? prevState.activePhotoIndex
						: null;

				return {
					...prevState,
					activePhotoIndex: nextElementIndex,
					transitionFromIndex: nextTransitionFromIndex,
					activePhotoReady: isPhotoChanged
						? isNextPhotoKnownAsLoaded
						: prevState.activePhotoReady,
					transitionDurationComplete:
						nextTransitionFromIndex == null || !shouldWaitForTransitionDuration,
					hidePrevButton,
					hideNextButton,
					lastDirection: direction,
				};
			});
		},
		[
			getItemByDirection,
			isImageMotionEnabled,
			photos,
			shouldWaitForTransitionDuration,
			wrap,
		],
	);

	const prev = useCallback(() => {
		move('prev');
	}, [move]);

	const next = useCallback(() => {
		move('next');
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
		const activePhotoSrc = getPhotoSource(photos[state.activePhotoIndex]);
		if (activePhotoSrc != null) {
			loadedPhotoSourcesRef.current.add(activePhotoSrc);
		}
		setState((prevState) => ({
			...prevState,
			controlsDisabled: false,
			activePhotoReady: true,
		}));
	}, [photos, state.activePhotoIndex]);

	const onPhotoError = useCallback(() => {
		setState((prevState) => ({
			...prevState,
			controlsDisabled: false,
			activePhotoReady: true,
		}));
	}, []);

	const onPhotoPress = useCallback(() => {
		if (enableZoom && zoomScaleRef.current > MIN_ZOOM) {
			return;
		}
		move('next');
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

			const direction = index > state.activePhotoIndex ? 'next' : 'prev';
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
					{...(isDefaultPrevButtonComponent
						? {}
						: {
								phrases,
								className: classNames?.prevButton,
								style: styles?.prevButton,
							})}
				/>,
			);
		}
		if (!state.hideNextButton) {
			ui.push(
				<NextButtonComponent
					key=".nextControl"
					disabled={state.controlsDisabled}
					onPress={onNextButtonPress}
					{...(isDefaultNextButtonComponent
						? {}
						: {
								phrases,
								className: classNames?.nextButton,
								style: styles?.nextButton,
							})}
				/>,
			);
		}
		return ui;
	}, [
		NextButtonComponent,
		PrevButtonComponent,
		onNextButtonPress,
		onPrevButtonPress,
		photos.length,
		classNames?.nextButton,
		phrases,
		classNames?.prevButton,
		isDefaultNextButtonComponent,
		isDefaultPrevButtonComponent,
		state.controlsDisabled,
		state.hideNextButton,
		state.hidePrevButton,
		styles?.nextButton,
		styles?.prevButton,
	]);

	const galleryContextValue = useMemo(
		() => ({
			phrases,
			components: {
				Thumbnail: components?.Thumbnail,
				TogglePhotoList: components?.TogglePhotoList,
			},
			classNames,
			styles,
		}),
		[phrases, components, classNames, styles],
	);

	const zoomedPhotoStyle = useMemo(
		() =>
			({
				'--rbg-zoom-scale': String(state.zoomScale),
				'--rbg-pan-x': `${state.zoomOffsetX}px`,
				'--rbg-pan-y': `${state.zoomOffsetY}px`,
				'--rbg-zoom-transition': state.isPanning
					? 'none'
					: `transform ${Math.max(animationDurationMs, 120)}ms ${animationEasing}`,
			}) as CSSProperties,
		[
			animationDurationMs,
			animationEasing,
			state.isPanning,
			state.zoomOffsetX,
			state.zoomOffsetY,
			state.zoomScale,
		],
	);

	const galleryMotionStyle = useMemo(
		() =>
			({
				...(styles?.gallery || {}),
				'--rbg-motion-duration': `${animationDurationMs}ms`,
				'--rbg-outgoing-fade-duration': `${Math.max(
					140,
					Math.round(animationDurationMs * 0.58),
				)}ms`,
				'--rbg-motion-easing': animationEasing,
				'--rbg-feedback-duration': `${Math.max(
					100,
					Math.round(animationDurationMs * 0.6),
				)}ms`,
				'--rbg-feedback-scale': String(feedbackScale),
			}) as CSSProperties,
		[animationDurationMs, animationEasing, feedbackScale, styles?.gallery],
	);

	const galleryModalPreloadPhotos = useMemo(() => {
		const preloadIndexes = getPreloadIndexes(
			state.activePhotoIndex,
			photos.length,
			preloadSize,
			wrap,
		);

		return preloadIndexes.map((photoIndex) => {
			const photo = photos[photoIndex];
			return (
				<img
					key={photo.photo || photoIndex}
					alt={photo.photo}
					src={photo.photo}
				/>
			);
		});
	}, [photos, preloadSize, state.activePhotoIndex, wrap]);

	const hasPhotos = photos.length > 0;
	const current = photos[state.activePhotoIndex];
	const hasOutgoingPhoto =
		hasPhotos &&
		state.transitionFromIndex != null &&
		state.transitionFromIndex !== state.activePhotoIndex &&
		state.transitionFromIndex >= 0 &&
		state.transitionFromIndex < photos.length;
	const outgoing = hasOutgoingPhoto
		? photos[state.transitionFromIndex as number]
		: null;
	const photoDirectionClass =
		state.lastDirection === 'prev'
			? 'gallery-photo--direction-prev'
			: 'gallery-photo--direction-next';
	const sharedPhotoSlotProps = {
		imageFit,
		buttonClassName: classNames?.photoButton,
		buttonStyle: styles?.photoButton,
		imageClassName: classNames?.photoImage,
		imageStyle: styles?.photoImage,
	};
	const { noPhotosProvided: emptyMessage } = phrases;

	return (
		<GalleryContextProvider value={galleryContextValue}>
			<div
				className={clsx(
					'gallery',
					`gallery--animation-${animationPreset}`,
					!enableFeedback && 'gallery--feedback-disabled',
					imageFit === 'cover' && 'gallery--image-fit-cover',
					classNames?.gallery,
				)}
				style={galleryMotionStyle}
			>
				<div className="gallery-modal--preload">
					{galleryModalPreloadPhotos}
				</div>
				<div
					className={clsx(
						'gallery-main',
						`gallery-main--controls-${controlsPlacement}`,
					)}
				>
					{controlsPlacement === 'top' && controls && (
						<div className="gallery-controls-row gallery-controls-row--top">
							{controls}
						</div>
					)}
					{controlsPlacement === 'sides' && controls}
					<div className="gallery-photos">
						{hasPhotos ? (
							<div className="gallery-photo">
								<div
									key={`current-${state.activePhotoIndex}-${state.lastDirection}`}
									className={clsx(
										'gallery-photo--current',
										imageFit === 'contain' && 'gallery-photo--mask-outgoing',
										photoDirectionClass,
									)}
								>
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
										{...sharedPhotoSlotProps}
									/>
								</div>
								{outgoing && (
									<div
										key={`outgoing-${state.transitionFromIndex}-${state.activePhotoIndex}-${state.lastDirection}`}
										className={clsx(
											'gallery-photo--outgoing',
											photoDirectionClass,
										)}
										aria-hidden="true"
									>
										<PhotoComponent
											photo={outgoing}
											disablePress
											enableZoom={false}
											isZoomMode={false}
											isPanning={false}
											{...sharedPhotoSlotProps}
										/>
									</div>
								)}
							</div>
						) : (
							<div className="gallery-empty">{emptyMessage}</div>
						)}
					</div>
					{controlsPlacement === 'bottom' && controls && (
						<div className="gallery-controls-row gallery-controls-row--bottom">
							{controls}
						</div>
					)}
				</div>
				{showThumbnails && current && (
					<CaptionComponent
						current={state.activePhotoIndex}
						photos={photos}
						onPress={onThumbnailPress}
						renderCaptionActions={renderCaptionActions}
						showThumbnails={showThumbnails}
						{...(isDefaultCaptionComponent
							? {}
							: {
									phrases,
									className: classNames?.caption,
									style: styles?.caption,
									thumbnailsListClassName: classNames?.thumbnailsList,
									thumbnailsListStyle: styles?.thumbnailsList,
									thumbnailItemClassName: classNames?.thumbnailItem,
									thumbnailItemStyle: styles?.thumbnailItem,
									thumbnailClassName: classNames?.thumbnailButton,
									thumbnailStyle: styles?.thumbnailButton,
									thumbnailImageClassName: classNames?.thumbnailImage,
									thumbnailImageStyle: styles?.thumbnailImage,
									togglePhotoListClassName: classNames?.togglePhotoList,
									togglePhotoListStyle: styles?.togglePhotoList,
									components: {
										Thumbnail: components?.Thumbnail,
										TogglePhotoList: components?.TogglePhotoList,
									},
								})}
					/>
				)}
			</div>
		</GalleryContextProvider>
	);
});

const MemoizedGallery = memo(Gallery);

export { MemoizedGallery as Gallery };
