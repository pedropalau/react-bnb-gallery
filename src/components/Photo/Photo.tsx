import classnames from 'classnames';
import PropTypes from 'prop-types';
import type React from 'react';
import { PureComponent } from 'react';
import { imageDefaultProps, imagePropTypes } from '../../common';
import { forbidExtraProps } from '../../common/prop-types';
import PhotoShape from '../../shapes/PhotoShape';
import type { GalleryPhoto } from '../../types/gallery';
import noop from '../../utils/noop';
import Image from '../Image/Image';

const propTypes = forbidExtraProps({
	...imagePropTypes,
	photo: PhotoShape,
	onPress: PropTypes.func,
	onTouchStart: PropTypes.func,
	onTouchMove: PropTypes.func,
	onTouchEnd: PropTypes.func,
});

const defaultProps = {
	...imageDefaultProps,
	photo: null,
	onPress: noop,
	onTouchStart: noop,
	onTouchMove: noop,
	onTouchEnd: noop,
};

interface PhotoProps {
	photo?: GalleryPhoto | null;
	onPress?: () => void;
	onTouchStart?: (event: React.TouchEvent<HTMLButtonElement>) => void;
	onTouchMove?: (event: React.TouchEvent<HTMLButtonElement>) => void;
	onTouchEnd?: (event: React.TouchEvent<HTMLButtonElement>) => void;
	onLoad?: () => void;
	onError?: () => void;
	style?: React.CSSProperties;
}

class Photo extends PureComponent<PhotoProps> {
	static propTypes = propTypes;

	static defaultProps = defaultProps;

	constructor(props: PhotoProps) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}

	onPress() {
		const { onPress = noop } = this.props;
		onPress();
	}

	renderPhoto() {
		const {
			photo,
			onTouchStart,
			onTouchMove,
			onTouchEnd,
			onLoad,
			onError,
			style,
		} = this.props;

		if (!photo) {
			return null;
		}

		return (
			<button
				type="button"
				onClick={this.onPress}
				className="photo-button"
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				<Image
					alt={photo.caption || ''}
					className="photo"
					src={photo.photo || ''}
					onLoad={onLoad}
					onError={onError}
					style={style}
				/>
			</button>
		);
	}

	render() {
		const className = classnames(
			'gallery-media-photo',
			'gallery-media-photo--block',
			'gallery-media-cover',
		);

		const photoRendered = this.renderPhoto();

		return (
			<ul className="gallery-images--ul">
				<li className={className}>{photoRendered}</li>
			</ul>
		);
	}
}

export default Photo;
