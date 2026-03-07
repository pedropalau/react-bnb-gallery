import clsx from 'clsx';
import type { ComponentPropsWithoutRef, CSSProperties, Ref } from 'react';
import { useEffect, useRef, useState } from 'react';

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

const MIN_SKELETON_MS = {
	photo: 0,
	thumbnail: 180,
} as const;

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
	const loadingStartedAtRef = useRef(Date.now());
	const settleLoadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [state, setState] = useState<ImageState>(() => ({
		currentSrc: src,
		loading: hasSource,
		withError: !hasSource,
	}));

	useEffect(() => {
		if (settleLoadTimerRef.current) {
			clearTimeout(settleLoadTimerRef.current);
			settleLoadTimerRef.current = null;
		}
		loadingStartedAtRef.current = Date.now();

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

	useEffect(
		() => () => {
			if (settleLoadTimerRef.current) {
				clearTimeout(settleLoadTimerRef.current);
			}
		},
		[],
	);

	const handleLoad = () => {
		onLoad?.();
		const loadedSrc = src;
		const completeLoad = () => {
			settleLoadTimerRef.current = null;
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
		};

		const minSkeletonMs = MIN_SKELETON_MS[variant];
		const elapsedMs = Date.now() - loadingStartedAtRef.current;
		const remainingMs = Math.max(0, minSkeletonMs - elapsedMs);

		if (remainingMs <= 0) {
			completeLoad();
			return;
		}

		settleLoadTimerRef.current = setTimeout(completeLoad, remainingMs);
	};

	const handleError = () => {
		onError?.();
		setState((prevState) => ({
			...prevState,
			loading: false,
			withError: true,
		}));
	};

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
			{loading && (
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
