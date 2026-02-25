import type React from 'react';
import { PureComponent } from 'react';

import { galleryDefaultProps, galleryPropTypes } from '../../common';
import { DIRECTION_NEXT, DIRECTION_PREV } from '../../constants';
import type { GalleryPhoto, GalleryPhrases } from '../../types/gallery';
import Caption from '../Caption';
import NextButton from '../NextButton';
import Photo from '../Photo';
import PrevButton from '../PrevButton';

interface GalleryProps {
	activePhotoIndex: number;
	activePhotoPressed: () => void;
	backgroundColor: string;
	direction: string;
	light: boolean;
	nextButtonPressed: () => void;
	phrases: GalleryPhrases;
	photos: GalleryPhoto[];
	preloadSize: number;
	prevButtonPressed: () => void;
	showThumbnails: boolean;
	wrap: boolean;
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

const propTypes = {
	...galleryPropTypes,
};

const defaultProps = {
	...galleryDefaultProps,
};

class Gallery extends PureComponent<GalleryProps, GalleryState> {
	static propTypes = propTypes;

	static defaultProps = defaultProps;

	lastPreloadIndex: number;

	preloadedPhotos: GalleryPhoto[];

	constructor(props: GalleryProps) {
		super(props);
		const { activePhotoIndex, photos, wrap } = this.props;
		const normalizedActivePhotoIndex = this.getNormalizedActivePhotoIndex(
			activePhotoIndex,
			photos.length,
		);
		const { hidePrevButton, hideNextButton } = this.getWrapControlState(
			normalizedActivePhotoIndex,
			photos.length,
			wrap,
		);
		this.state = {
			activePhotoIndex: normalizedActivePhotoIndex,
			hidePrevButton,
			hideNextButton,
			controlsDisabled: true,
			touchStartInfo: null,
			touchEndInfo: null,
			touchMoved: false,
		};
		this.lastPreloadIndex = 0;
		this.preloadedPhotos = [];
		this.move = this.move.bind(this);
		this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
		this.onPhotoLoad = this.onPhotoLoad.bind(this);
		this.onPhotoError = this.onPhotoError.bind(this);
		this.onPhotoPress = this.onPhotoPress.bind(this);
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchMove = this.onTouchMove.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		this.onThumbnailPress = this.onThumbnailPress.bind(this);
		this.onPrevButtonPress = this.onPrevButtonPress.bind(this);
		this.onNextButtonPress = this.onNextButtonPress.bind(this);
	}

	componentDidUpdate(prevProps: GalleryProps) {
		const { activePhotoIndex, photos, wrap } = this.props;
		if (
			activePhotoIndex !== prevProps.activePhotoIndex ||
			photos !== prevProps.photos ||
			wrap !== prevProps.wrap
		) {
			const normalizedActivePhotoIndex = this.getNormalizedActivePhotoIndex(
				activePhotoIndex,
				photos.length,
			);
			const { hidePrevButton, hideNextButton } = this.getWrapControlState(
				normalizedActivePhotoIndex,
				photos.length,
				wrap,
			);

			if (
				this.state.activePhotoIndex !== normalizedActivePhotoIndex ||
				this.state.hidePrevButton !== hidePrevButton ||
				this.state.hideNextButton !== hideNextButton
			) {
				this.setState({
					activePhotoIndex: normalizedActivePhotoIndex,
					hidePrevButton,
					hideNextButton,
				});
			}
		}
	}

	getNormalizedActivePhotoIndex(
		activePhotoIndex: number,
		totalPhotos: number,
	): number {
		if (totalPhotos === 0) {
			return 0;
		}

		return Math.min(Math.max(activePhotoIndex, 0), totalPhotos - 1);
	}

	getWrapControlState(
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

	onNextButtonPress() {
		const { nextButtonPressed } = this.props;
		this.next();
		nextButtonPressed();
	}

	onPrevButtonPress() {
		const { prevButtonPressed } = this.props;
		this.prev();
		prevButtonPressed();
	}

	onPhotoLoad() {
		return this.setState({ controlsDisabled: false });
	}

	onPhotoError() {
		return this.setState({ controlsDisabled: false });
	}

	onPhotoPress() {
		const { activePhotoPressed } = this.props;
		this.move(DIRECTION_NEXT);
		activePhotoPressed();
	}

	onTouchStart(event: React.TouchEvent) {
		this.setState({
			touchStartInfo: event.targetTouches[0],
		});
	}

	onTouchMove(event: React.TouchEvent) {
		this.setState({
			touchMoved: true,
			touchEndInfo: event.targetTouches[0],
		});
	}

	onTouchEnd() {
		const { touchStartInfo, touchEndInfo, touchMoved } = this.state;

		if (touchMoved && touchStartInfo && touchEndInfo) {
			if (touchStartInfo.screenX < touchEndInfo.screenX) {
				this.onPrevButtonPress();
			} else if (touchStartInfo.screenX > touchEndInfo.screenX) {
				this.onNextButtonPress();
			}
		}

		this.setState({ touchMoved: false });
	}

	onThumbnailPress(index: number) {
		this.to(index);
	}

	getPhotoByIndex(index: number) {
		const { photos } = this.props;
		return photos[index];
	}

	getItemByDirection(direction: string, activeIndex: number) {
		const { photos, wrap } = this.props;

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
	}

	getStyles() {
		const { backgroundColor } = this.props;

		return {
			backgroundColor,
		};
	}

	prev() {
		return this.move(DIRECTION_PREV);
	}

	next() {
		return this.move(DIRECTION_NEXT);
	}

	move(direction: string, index: number | false = false) {
		const { activePhotoIndex } = this.state;
		const { photos, wrap } = this.props;

		const nextElementIndex =
			index !== false
				? index
				: this.getItemByDirection(direction, activePhotoIndex);

		const { hidePrevButton, hideNextButton } = this.getWrapControlState(
			nextElementIndex,
			photos.length,
			wrap,
		);

		this.setState({
			activePhotoIndex: nextElementIndex,
			hidePrevButton,
			hideNextButton,
		});
	}

	to(index: number) {
		const { photos } = this.props;
		const { activePhotoIndex } = this.state;

		if (index > photos.length - 1 || index < 0 || activePhotoIndex === index) {
			return; // nothing to do
		}

		const direction =
			index > activePhotoIndex ? DIRECTION_NEXT : DIRECTION_PREV;

		this.move(direction, index);
	}

	renderControls() {
		const { light, photos } = this.props;
		const hasMoreThanOnePhoto = photos.length > 1;

		const { hidePrevButton, hideNextButton, controlsDisabled } = this.state;

		const controls = [];

		if (hasMoreThanOnePhoto) {
			// previous control
			if (!hidePrevButton) {
				controls.push(
					<PrevButton
						key=".prevControl"
						disabled={controlsDisabled}
						onPress={this.onPrevButtonPress}
						light={light}
					/>,
				);
			}

			// next control
			if (!hideNextButton) {
				controls.push(
					<NextButton
						key=".nextControl"
						disabled={controlsDisabled}
						onPress={this.onNextButtonPress}
						light={light}
					/>,
				);
			}
		}

		return controls;
	}

	renderPreloadPhotos(current: number) {
		const { photos, preloadSize } = this.props;
		let counter = 1;
		let index = current;
		let photo: GalleryPhoto | null = null;
		const preloadPhotos = [];

		while (index < photos.length && counter <= preloadSize) {
			photo = photos[index];
			preloadPhotos.push(
				<img key={photo.photo} alt={photo.photo} src={photo.photo} />,
			);
			index += 1;
			counter += 1;
		}

		return preloadPhotos;
	}

	render() {
		const { photos, showThumbnails, phrases } = this.props;

		const { noPhotosProvided: emptyMessage } = phrases;

		const { activePhotoIndex } = this.state;

		// preload photos
		const galleryModalPreloadPhotos =
			this.renderPreloadPhotos(activePhotoIndex);

		const controls = this.renderControls();
		const hasPhotos = photos.length > 0;

		const current = this.getPhotoByIndex(activePhotoIndex);

		const galleryStyles = this.getStyles();

		return (
			<div className="gallery" style={galleryStyles}>
				<div className="gallery-modal--preload">
					{galleryModalPreloadPhotos}
				</div>
				<div className="gallery-main">
					{controls}
					<div className="gallery-photos">
						{hasPhotos ? (
							<div className="gallery-photo">
								<div className="gallery-photo--current">
									<Photo
										photo={current}
										onLoad={this.onPhotoLoad}
										onError={this.onPhotoError}
										onPress={this.onPhotoPress}
										onTouchStart={this.onTouchStart}
										onTouchMove={this.onTouchMove}
										onTouchEnd={this.onTouchEnd}
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
						current={activePhotoIndex}
						photos={photos}
						onPress={this.onThumbnailPress}
					/>
				)}
			</div>
		);
	}
}

export default Gallery;
