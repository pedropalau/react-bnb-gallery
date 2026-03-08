import clsx from 'clsx';
import type {
	ComponentPropsWithoutRef,
	CSSProperties,
	Ref,
	SyntheticEvent,
} from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Props for the image wrapper with loading/error handling.
 */
interface ImageProps {
	alt: string;
	src?: string;
	variant?: 'photo' | 'thumbnail';
	style?: CSSProperties | null;
	className?: string | string[] | null;
	imageRef?: Ref<HTMLImageElement>;
	onLoad?: () => void;
	onError?: () => void;
}

type ImageElementProps = Omit<
	ComponentPropsWithoutRef<'img'>,
	'ref' | 'className' | 'style' | 'src' | 'alt' | 'onLoad' | 'onError'
>;

type ImageMergedProps = ImageProps & ImageElementProps;

/**
 * Internal load state tracked per rendered source.
 */
interface ImageState {
	currentSrc?: string;
	loading: boolean;
	withError: boolean;
}

const PHOTO_SKELETON_DELAY_MS = 420;
const THUMBNAIL_SKELETON_DELAY_MS = 320;

/**
 * Renders an image with a skeleton placeholder while loading and hides on error.
 */
function Image({
	alt,
	src,
	variant = 'photo',
	style = null,
	className = null,
	imageRef,
	onLoad,
	onError,
	...props
}: ImageMergedProps) {
	const { draggable = false, ...imageProps } = props;
	const hasSource = Boolean(src);
	const skeletonDelayMs =
		variant === 'photo' ? PHOTO_SKELETON_DELAY_MS : THUMBNAIL_SKELETON_DELAY_MS;
	const decodeRequestRef = useRef(0);
	const skeletonTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [state, setState] = useState<ImageState>(() => ({
		currentSrc: src,
		loading: hasSource,
		withError: !hasSource,
	}));
	const [showSkeleton, setShowSkeleton] = useState(false);

	useEffect(() => {
		decodeRequestRef.current += 1;
		if (skeletonTimerRef.current) {
			clearTimeout(skeletonTimerRef.current);
			skeletonTimerRef.current = null;
		}
		setShowSkeleton(false);
		setState((prevState) => {
			if (src === prevState.currentSrc) {
				return prevState;
			}

			return {
				currentSrc: src,
				loading: Boolean(src),
				withError: !src,
			};
		});
	}, [src]);

	useEffect(() => {
		if (!state.loading || !state.currentSrc) {
			if (skeletonTimerRef.current) {
				clearTimeout(skeletonTimerRef.current);
				skeletonTimerRef.current = null;
			}
			setShowSkeleton(false);
			return;
		}

		skeletonTimerRef.current = setTimeout(() => {
			setShowSkeleton(true);
			skeletonTimerRef.current = null;
		}, skeletonDelayMs);

		return () => {
			if (skeletonTimerRef.current) {
				clearTimeout(skeletonTimerRef.current);
				skeletonTimerRef.current = null;
			}
		};
	}, [skeletonDelayMs, state.loading, state.currentSrc]);

	const markAsLoaded = useCallback((loadedSrc?: string) => {
		setState((prevState) => {
			if (prevState.currentSrc !== loadedSrc) {
				return prevState;
			}

			return {
				...prevState,
				loading: false,
				withError: false,
			};
		});
	}, []);

	const handleLoad = useCallback(
		(_event: SyntheticEvent<HTMLImageElement>) => {
			onLoad?.();
			const loadedSrc = src;
			const requestId = ++decodeRequestRef.current;
			const finalizeLoad = () => {
				if (requestId !== decodeRequestRef.current) {
					return;
				}

				markAsLoaded(loadedSrc);
			};

			// Reveal on the next animation frame so the browser can paint first,
			// without blocking on decode promises that can delay fast image loads.
			if (typeof window !== 'undefined' && window.requestAnimationFrame) {
				window.requestAnimationFrame(finalizeLoad);
				return;
			}

			finalizeLoad();
		},
		[markAsLoaded, onLoad, src],
	);

	const handleError = useCallback(() => {
		onError?.();
		decodeRequestRef.current += 1;
		if (skeletonTimerRef.current) {
			clearTimeout(skeletonTimerRef.current);
			skeletonTimerRef.current = null;
		}
		setShowSkeleton(false);
		setState((prevState) => ({
			...prevState,
			loading: false,
			withError: true,
		}));
	}, [onError]);

	const { loading, withError } = state;
	const wrapperClassNames = [
		'picture',
		'gallery-image-wrapper',
		`gallery-image-wrapper--${variant}`,
		// Legacy alias kept for 2.x compatibility; use `is-loading` going forward.
		loading && 'loading',
		loading && 'is-loading',
	];
	const classNames = [
		className,
		'media-image',
		'gallery-image',
		loading && 'gallery-image--loading',
		!loading && !withError && 'gallery-image--loaded',
	];

	return (
		<div className={clsx(wrapperClassNames)}>
			{loading && showSkeleton && (
				<div
					className={clsx(
						'gallery-image-skeleton',
						`gallery-image-skeleton--${variant}`,
					)}
					aria-hidden="true"
				/>
			)}
			{!withError && (
				<img
					ref={imageRef}
					alt={alt}
					className={clsx(classNames)}
					draggable={draggable}
					onLoad={handleLoad}
					onError={handleError}
					src={src}
					style={style || undefined}
					{...imageProps}
				/>
			)}
		</div>
	);
}

export { Image };
