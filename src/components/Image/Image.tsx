import classnames from 'classnames';
import PropTypes from 'prop-types';
import type React from 'react';
import { Component } from 'react';
import { imageDefaultProps, imagePropTypes } from '../../common';
import { forbidExtraProps } from '../../common/prop-types';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const propTypes = forbidExtraProps({
	...imagePropTypes,
	alt: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired,
	style: PropTypes.object,
	className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
});

const defaultProps = {
	...imageDefaultProps,
	style: null,
	className: null,
	alt: '',
};

const defaultState = {
	loading: true,
	withError: false,
};

interface ImageProps {
	alt: string;
	src: string;
	style?: React.CSSProperties | null;
	className?: string | string[] | null;
	onLoad?: () => void;
	onError?: () => void;
}

interface ImageState {
	currentSrc: string;
	loading: boolean;
	withError: boolean;
}

class Image extends Component<ImageProps, ImageState> {
	static propTypes = propTypes;

	static defaultProps = defaultProps;

	constructor(props: ImageProps) {
		super(props);
		const { src } = props;
		this.state = {
			currentSrc: src,
			...defaultState,
		};
		this.onLoad = this.onLoad.bind(this);
		this.onError = this.onError.bind(this);
	}

	static getDerivedStateFromProps(
		nextProps: ImageProps,
		prevState: ImageState,
	) {
		const { src } = nextProps;
		const { currentSrc } = prevState;

		if (src !== currentSrc) {
			return {
				currentSrc: src,
				...defaultState,
			};
		}

		return null;
	}

	onLoad() {
		const { onLoad = () => {} } = this.props;

		onLoad();

		this.setState({
			loading: false,
			withError: false,
		});
	}

	onError() {
		const { onError = () => {} } = this.props;

		onError();

		this.setState({
			loading: false,
			withError: true,
		});
	}

	renderImage() {
		const { alt, src, style, className } = this.props;

		const { loading, withError } = this.state;

		const classNames = [className, 'media-image'];

		const components = [];

		if (loading) {
			components.push(<LoadingSpinner key=".pictureLoadingSpinner" />);
		}

		if (!withError) {
			components.push(
				<img
					alt={alt}
					key=".pictureComponent"
					className={classnames(classNames)}
					onLoad={this.onLoad}
					onError={this.onError}
					src={src}
					style={style || undefined}
				/>,
			);
		}

		return components;
	}

	render() {
		const { loading } = this.state;

		const wrapperClassNames = ['picture', loading && 'loading'];

		const picture = this.renderImage();

		return <div className={classnames(wrapperClassNames)}>{picture}</div>;
	}
}

export default Image;
