import classnames from 'classnames';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { imageDefaultProps } from '../../common';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const defaultState = {
	loading: true,
	withError: false,
};

interface ImageProps {
	alt: string;
	src: string;
	style?: CSSProperties | null;
	className?: string | string[] | null;
	onLoad?: () => void;
	onError?: () => void;
}

interface ImageState {
	currentSrc: string;
	loading: boolean;
	withError: boolean;
}

function Image({
	alt,
	src,
	style = null,
	className = null,
	onLoad = imageDefaultProps.onLoad,
	onError = imageDefaultProps.onError,
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
		onLoad();
		setState((prevState) => ({
			...prevState,
			loading: false,
			withError: false,
		}));
	};

	const handleError = () => {
		onError();
		setState((prevState) => ({
			...prevState,
			loading: false,
			withError: true,
		}));
	};

	const { loading, withError } = state;
	const wrapperClassNames = ['picture', loading && 'loading'];
	const classNames = [className, 'media-image'];

	return (
		<div className={classnames(wrapperClassNames)}>
			{loading && <LoadingSpinner />}
			{!withError && (
				<img
					alt={alt}
					className={classnames(classNames)}
					onLoad={handleLoad}
					onError={handleError}
					src={src}
					style={style || undefined}
				/>
			)}
		</div>
	);
}

export default Image;
