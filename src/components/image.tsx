import clsx from 'clsx';
import type { ComponentPropsWithoutRef, CSSProperties, Ref } from 'react';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from './loading-spinner';

/**
 * Props for the image wrapper with loading/error handling.
 */
interface ImageProps {
	alt: string;
	src?: string;
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

/**
 * Renders an image with a spinner while loading and hides on error.
 */
function Image({
	alt,
	src,
	style = null,
	className = null,
	imageRef,
	onLoad,
	onError,
	...props
}: ImageMergedProps) {
	const hasSource = Boolean(src);
	const [state, setState] = useState<ImageState>(() => ({
		currentSrc: src,
		loading: hasSource,
		withError: !hasSource,
	}));

	useEffect(() => {
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

	const handleLoad = () => {
		onLoad?.();
		setState((prevState) => ({
			...prevState,
			loading: false,
			withError: false,
		}));
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
		// Legacy alias kept for 2.x compatibility; use `is-loading` going forward.
		loading && 'loading',
		loading && 'is-loading',
	];
	const classNames = [className, 'media-image', 'gallery-image'];

	return (
		<div className={clsx(wrapperClassNames)}>
			{loading && <LoadingSpinner />}
			{!withError && (
				<img
					ref={imageRef}
					alt={alt}
					className={clsx(classNames)}
					onLoad={handleLoad}
					onError={handleError}
					src={src}
					style={style || undefined}
					{...props}
				/>
			)}
		</div>
	);
}

export { Image };
