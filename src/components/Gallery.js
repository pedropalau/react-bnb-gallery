import React from 'react';
import PropTypes from 'prop-types';
import GalleryCaption from './GalleryCaption';
import GalleryPrevButton from './GalleryPrevButton';
import GalleryNextButton from './GalleryNextButton';
import GalleryPhoto from './GalleryPhoto';
import { Direction, FORWARDS, Phrases } from '../constants';
import SlideDirectionShape from '../shapes/SlideDirectionShape';
import PhotosShape from '../shapes/PhotosShape';
import { noop } from '../utils/functions';

const propTypes = {
  activePhotoIndex: PropTypes.number,
  activePhotoPressed: PropTypes.func,
  direction: SlideDirectionShape,
  nextButtonPressed: PropTypes.func,
  prevButtonPressed: PropTypes.func,
  showThumbnails: PropTypes.bool,
  photos: PhotosShape,
  wrap: PropTypes.bool,
  emptyMessage: PropTypes.string,
};

const defaultProps = {
  activePhotoIndex: 0,
  activePhotoPressed: noop,
  direction: FORWARDS,
  nextButtonPressed: noop,
  prevButtonPressed: noop,
  showThumbnails: true,
  photos: [],
  wrap: false,
  emptyMessage: Phrases.EMPTY_MESSAGE,
};

class Gallery extends React.PureComponent {
  constructor() {
    super(...arguments);

    const {
      activePhotoIndex,
      photos,
      wrap
    } = this.props;

    this.state = {
      activePhotoIndex: activePhotoIndex,
      hidePrevButton: wrap && activePhotoIndex === 0,
      hideNextButton: wrap && activePhotoIndex === photos.length - 1,
      controlsDisabled: true
    };

    this.move = this.move.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.onPhotoLoad = this.onPhotoLoad.bind(this);
    this.onPhotoError = this.onPhotoError.bind(this);
    this.onPhotoPress = this.onPhotoPress.bind(this);
    this.onThumbnailPress = this.onThumbnailPress.bind(this);
  }

  getPhotoByIndex = (index) => this.props.photos[index];

  prev = () => this.move(Direction.PREV);

  next = () => this.move(Direction.NEXT);

  move = (direction, index = false) => {
    const { activePhotoIndex } = this.state;

    const nextElementIndex = index !== false ? index : this._getItemByDirection(direction, activePhotoIndex);

    this._checkIsWrapped(direction, nextElementIndex);

    this.setState({
      activePhotoIndex: nextElementIndex
    });
  }

  onPhotoLoad = () => this.setState({ controlsDisabled: false });

  onPhotoError = () => this.setState({ controlsDisabled: false });

  onPhotoPress = () => {
    this.move(Direction.NEXT);

    this.props.activePhotoPressed();
  }

  onThumbnailPress = (index) => this.to(index);

  to = (index) => {
    const { photos } = this.props;
    const { activePhotoIndex } = this.state;

    if (index > photos.length - 1 || index < 0) {
      return; // nothing to do
    }

    if (activePhotoIndex === index) {
      return; // nothing to do
    }

    const direction = index > activePhotoIndex ? Direction.NEXT : Direction.PREV;

    this.move(direction, index);
  }

  _checkIsWrapped = (direction, nextElementIndex) => {
    const { photos, wrap } = this.props;

    if (!wrap) {
      return false; // nothing to do
    }

    this.setState({
      hideNextButton: nextElementIndex === photos.length - 1
    });

    this.setState({
      hidePrevButton: nextElementIndex === 0
    });
  }

  _getItemByDirection = (direction, activeIndex) => {
    const { photos, wrap } = this.props;

    const isNextDirection = direction === Direction.NEXT;
    const isPrevDirection = direction === Direction.PREV;

    const lastItemIndex = photos.length - 1;
    const isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

    if (isGoingToWrap && wrap) {
      return activeIndex;
    }

    const delta = isPrevDirection ? -1 : 1;
    const itemIndex = (activeIndex + delta) % photos.length;
    return itemIndex === -1 ? photos.length - 1 : itemIndex;
  }

  render() {
    const {
      children,
      nextButtonPressed,
      photos,
      prevButtonPressed,
      showThumbnails,
      emptyMessage,
    } = this.props;

    const { hidePrevButton, hideNextButton, controlsDisabled } = this.state;

    const current = this.getPhotoByIndex(this.state.activePhotoIndex);

    const hasPhotos = photos.length > 0;
    const hasMoreThanOnePhoto = hasPhotos && photos.length > 1;

    return (
      <div className="gallery">
        <div className="gallery-main">
          {!hidePrevButton && hasMoreThanOnePhoto && (<GalleryPrevButton disabled={controlsDisabled} onPress={this.prev} />)}
          {!hideNextButton && hasMoreThanOnePhoto && (<GalleryNextButton disabled={controlsDisabled} onPress={this.next} />)}
          <div className="gallery-photos">
            {hasPhotos ? (
              <div className="gallery-photo">
                <div className="gallery-photo--current">
                  <GalleryPhoto
                    photo={current}
                    onLoad={this.onPhotoLoad}
                    onError={this.onPhotoError}
                    onPress={this.onPhotoPress} />
                </div>
              </div>
            ) : (
              <div className="gallery-empty">
                {emptyMessage}
              </div>
            )}
          </div>
        </div>
        {showThumbnails && current && (
          <GalleryCaption
            current={this.state.activePhotoIndex}
            photos={photos}
            onPress={this.onThumbnailPress} />
        )}
      </div>
    );
  }
}

Gallery.propTypes = propTypes;
Gallery.defaultProps = defaultProps;

export default Gallery;
