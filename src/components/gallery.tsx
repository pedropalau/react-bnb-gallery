import type { CSSProperties, MouseEvent, TouchEvent } from 'react';
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
	GalleryController,
	GalleryPhoto,
	GalleryPhrases,
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
	showThumbnails?: boolean;
	zoomStep?: number;
	wrap?: boolean;
}

interface TouchInfo {
	screenX: number;
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
) {
	if (!element || scale <= MIN_ZOOM) {
		return { x: 0, y: 0 };
	}

	const maxX = ((scale - 1) * element.clientWidth) / 2;
	const maxY = ((scale - 1) * element.clientHeight) / 2;

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
		showThumbnails = true,
		zoomStep = 0.25,
		wrap = false,
	},
	ref,
) {
	const photoButtonRef = useRef<HTMLButtonElement | null>(null);
	const previousActivePhotoIndexRef = useRef(activePhotoIndex);
	const panStartRef = useRef({ x: 0, y: 0 });
	const panOriginRef = useRef({ x: 0, y: 0 });
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
		if (!activePhotoChanged) {
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
	}, [state.activePhotoIndex]);

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
		if (enableZoom && state.zoomScale > MIN_ZOOM) {
			return;
		}
		move(DIRECTION_NEXT);
		activePhotoPressed?.();
	}, [activePhotoPressed, enableZoom, move, state.zoomScale]);

	const normalizedMaxZoom = Math.max(MIN_ZOOM, maxZoom);
	const normalizedZoomStep = Math.max(0.1, zoomStep);

	const resetZoom = useCallback(() => {
		setState((prevState) => ({
			...prevState,
			zoomScale: MIN_ZOOM,
			zoomOffsetX: 0,
			zoomOffsetY: 0,
			isPanning: false,
		}));
	}, []);

	const setZoomScale = useCallback(
		(nextScale: number) => {
			setState((prevState) => {
				const clampedScale = Math.min(
					Math.max(nextScale, MIN_ZOOM),
					normalizedMaxZoom,
				);
				const nextOffsets = clampZoomOffset(
					prevState.zoomOffsetX,
					prevState.zoomOffsetY,
					clampedScale,
					photoButtonRef.current,
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

	const zoomIn = useCallback(() => {
		setZoomScale(state.zoomScale + normalizedZoomStep);
	}, [normalizedZoomStep, setZoomScale, state.zoomScale]);

	const zoomOut = useCallback(() => {
		setZoomScale(state.zoomScale - normalizedZoomStep);
	}, [normalizedZoomStep, setZoomScale, state.zoomScale]);

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
			const touch = event.targetTouches[0];
			if (!touch) {
				return;
			}

			if (enableZoom && state.zoomScale > MIN_ZOOM) {
				startPan(touch.clientX, touch.clientY);
				return;
			}

			setState((prevState) => ({
				...prevState,
				touchStartInfo: touch,
			}));
		},
		[enableZoom, startPan, state.zoomScale],
	);

	const onTouchMove = useCallback(
		(event: TouchEvent) => {
			const touch = event.targetTouches[0];
			if (!touch) {
				return;
			}

			if (enableZoom && state.zoomScale > MIN_ZOOM) {
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
		[enableZoom, state.zoomScale, updatePan],
	);

	const onTouchEnd = useCallback(() => {
		if (enableZoom && state.zoomScale > MIN_ZOOM) {
			endPan();
			return;
		}

		setState((prevState) => {
			const { touchStartInfo, touchEndInfo, touchMoved } = prevState;
			if (touchMoved && touchStartInfo && touchEndInfo) {
				if (touchStartInfo.screenX < touchEndInfo.screenX) {
					onPrevButtonPress();
				} else if (touchStartInfo.screenX > touchEndInfo.screenX) {
					onNextButtonPress();
				}
			}

			return {
				...prevState,
				touchMoved: false,
			};
		});
	}, [
		enableZoom,
		endPan,
		onNextButtonPress,
		onPrevButtonPress,
		state.zoomScale,
	]);

	const onMouseDown = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			startPan(event.clientX, event.clientY);
		},
		[startPan],
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
				<PrevButton
					key=".prevControl"
					disabled={state.controlsDisabled}
					onPress={onPrevButtonPress}
					light={light}
				/>,
			);
		}
		if (!state.hideNextButton) {
			ui.push(
				<NextButton
					key=".nextControl"
					disabled={state.controlsDisabled}
					onPress={onNextButtonPress}
					light={light}
				/>,
			);
		}
		return ui;
	}, [
		light,
		onNextButtonPress,
		onPrevButtonPress,
		photos.length,
		state.controlsDisabled,
		state.hideNextButton,
		state.hidePrevButton,
	]);

	const zoomControls = useMemo(() => {
		if (!enableZoom || photos.length === 0) {
			return null;
		}

		const canZoomIn = state.zoomScale < normalizedMaxZoom;
		const canZoomOut = state.zoomScale > MIN_ZOOM;
		const isResetDisabled =
			state.zoomScale === MIN_ZOOM &&
			state.zoomOffsetX === 0 &&
			state.zoomOffsetY === 0;

		return (
			<div className="gallery-zoom-controls">
				<button
					type="button"
					className="gallery-zoom-button gallery-zoom-button--in"
					onClick={zoomIn}
					disabled={!canZoomIn}
					aria-label={phrases.zoomIn}
				>
					+
				</button>
				<button
					type="button"
					className="gallery-zoom-button gallery-zoom-button--out"
					onClick={zoomOut}
					disabled={!canZoomOut}
					aria-label={phrases.zoomOut}
				>
					-
				</button>
				<button
					type="button"
					className="gallery-zoom-button gallery-zoom-button--reset"
					onClick={resetZoom}
					disabled={isResetDisabled}
					aria-label={phrases.resetZoom}
				>
					1x
				</button>
			</div>
		);
	}, [
		enableZoom,
		normalizedMaxZoom,
		phrases.resetZoom,
		phrases.zoomIn,
		phrases.zoomOut,
		photos.length,
		resetZoom,
		state.zoomOffsetX,
		state.zoomOffsetY,
		state.zoomScale,
		zoomIn,
		zoomOut,
	]);

	const zoomedPhotoStyle = useMemo(
		() =>
			({
				'--rbg-zoom-scale': String(state.zoomScale),
				'--rbg-pan-x': `${state.zoomOffsetX}px`,
				'--rbg-pan-y': `${state.zoomOffsetY}px`,
			}) as CSSProperties,
		[state.zoomOffsetX, state.zoomOffsetY, state.zoomScale],
	);

	const galleryModalPreloadPhotos = useMemo(() => {
		let counter = 1;
		let index = state.activePhotoIndex;
		const preloadPhotos = [];

		while (index < photos.length && counter <= preloadSize) {
			const photo = photos[index];
			preloadPhotos.push(
				<img key={photo.photo} alt={photo.photo} src={photo.photo} />,
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
		<div className="gallery">
			<div className="gallery-modal--preload">{galleryModalPreloadPhotos}</div>
			<div className="gallery-main">
				{controls}
				{zoomControls}
				<div className="gallery-photos">
					{hasPhotos ? (
						<div className="gallery-photo">
							<div className="gallery-photo--current">
								<Photo
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
									buttonRef={photoButtonRef}
									disablePress={enableZoom && state.zoomScale > MIN_ZOOM}
									style={zoomedPhotoStyle}
								/>
							</div>
						</div>
					) : (
						<div className="gallery-empty">{emptyMessage}</div>
					)}
				</div>
			</div>
			{showThumbnails && current && (
				<Caption
					phrases={phrases}
					current={state.activePhotoIndex}
					photos={photos}
					onPress={onThumbnailPress}
				/>
			)}
		</div>
	);
});

const MemoizedGallery = memo(Gallery);

export { MemoizedGallery as Gallery };
