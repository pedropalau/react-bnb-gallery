import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from './loading-spinner';

const defaultState = {
	loading: true,
	withError: false,
};

/**
 * Props for the image wrapper with loading/error handling.
 */
interface ImageProps {
	alt: string;
	src: string;
	style?: CSSProperties | null;
	className?: string | string[] | null;
	onLoad?: () => void;
	onError?: () => void;
}

/**
 * Internal load state tracked per rendered source.
 */
interface ImageState {
	currentSrc: string;
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
	onLoad,
	onError,
}: ImageProps) {
	const [state, setState] = useState<ImageState>(() => ({
		currentSrc: src,
		...defaultState,
	}));

	useEffect(() => {
		setState((prevState) => {
			if (src === prevState.currentSrc) {
				return prevState;
			}

			return {
				currentSrc: src,
				...defaultState,
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
					alt={alt}
					className={clsx(classNames)}
					onLoad={handleLoad}
					onError={handleError}
					src={src}
					style={style || undefined}
				/>
			)}
		</div>
	);
}

export { Image };

/**
 * @deprecated Use named import instead: `import { Image } from './image'`.
 * Default export will be removed in the next major version.
 */
export default Image;
