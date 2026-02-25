import type { TouchEvent } from 'react';
import {
	forwardRef,
	memo,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from 'react';

import { DEFAULT_COLOR, DIRECTION_NEXT, DIRECTION_PREV } from '../constants';
import defaultPhrases from '../defaultPhrases';
import type {
	GalleryController,
	GalleryPhoto,
	GalleryPhrases,
} from '../types/gallery';
import Caption from './caption';
import NextButton from './next-button';
import Photo from './photo';
import PrevButton from './prev-button';

/**
 * Props for the internal gallery viewport, controls, and caption panel.
 */
interface GalleryProps {
	activePhotoIndex?: number;
	activePhotoPressed?: () => void;
	backgroundColor?: string;
	direction?: string;
	light?: boolean;
	nextButtonPressed?: () => void;
	phrases?: GalleryPhrases;
	photos?: GalleryPhoto[];
	preloadSize?: number;
	prevButtonPressed?: () => void;
	showThumbnails?: boolean;
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
	touchStartInfo: TouchInfo | null;
	touchEndInfo: TouchInfo | null;
	touchMoved: boolean;
}

const EMPTY_PHOTOS: GalleryPhoto[] = [];

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
 * Computes control visibility when wrap mode is enabled.
 */
function getWrapControlState(
	activePhotoIndex: number,
	totalPhotos: number,
	wrap: boolean,
) {
	if (!wrap || totalPhotos <= 1) {
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
		backgroundColor = DEFAULT_COLOR,
		light = false,
		nextButtonPressed,
		phrases = defaultPhrases,
		photos = EMPTY_PHOTOS,
		preloadSize = 5,
		prevButtonPressed,
		showThumbnails = true,
		wrap = false,
	},
	ref,
) {
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

			if (isGoingToWrap && wrap) {
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
		move(DIRECTION_NEXT);
		activePhotoPressed?.();
	}, [activePhotoPressed, move]);

	const onTouchStart = useCallback((event: TouchEvent) => {
		setState((prevState) => ({
			...prevState,
			touchStartInfo: event.targetTouches[0],
		}));
	}, []);

	const onTouchMove = useCallback((event: TouchEvent) => {
		setState((prevState) => ({
			...prevState,
			touchMoved: true,
			touchEndInfo: event.targetTouches[0],
		}));
	}, []);

	const onTouchEnd = useCallback(() => {
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
	}, [onNextButtonPress, onPrevButtonPress]);

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
		const hasMoreThanOnePhoto = photos.length > 1;
		if (!hasMoreThanOnePhoto) {
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
	const galleryStyles = { backgroundColor };
	const { noPhotosProvided: emptyMessage } = phrases;

	return (
		<div className="gallery" style={galleryStyles}>
			<div className="gallery-modal--preload">{galleryModalPreloadPhotos}</div>
			<div className="gallery-main">
				{controls}
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

export default memo(Gallery);
