import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import GalleryCaption from './GalleryCaption';
import GalleryPrevButton from './GalleryPrevButton';
import GalleryNextButton from './GalleryNextButton';
import GalleryPhoto from './GalleryPhoto';

import noop from '../utils/noop';

import defaultPhrases from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import PhotosShape from '../shapes/PhotosShape';

import {
  DIRECTION_NEXT,
  DIRECTION_PREV,
} from '../constants';

const propTypes = {
  activePhotoIndex: PropTypes.number,
  activePhotoPressed: PropTypes.func,
  nextButtonPressed: PropTypes.func,
  prevButtonPressed: PropTypes.func,
  showThumbnails: PropTypes.bool,
  photos: PhotosShape,
  wrap: PropTypes.bool,
  phrases: PropTypes.shape(getPhrasePropTypes(defaultPhrases)),
};

const defaultProps = {
  activePhotoIndex: 0,
  activePhotoPressed: noop,
  nextButtonPressed: noop,
  prevButtonPressed: noop,
  showThumbnails: true,
  photos: [],
  wrap: false,
  phrases: defaultPhrases,
};

class Gallery extends PureComponent {
  constructor(props) {
    super(props);

    const {
      activePhotoIndex,
      photos,
      wrap,
    } = this.props;

    this.state = {
      activePhotoIndex,
      hidePrevButton: wrap && activePhotoIndex === 0,
      hideNextButton: wrap && activePhotoIndex === photos.length - 1,
      controlsDisabled: true,
    };

    this.move = this.move.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.onPhotoLoad = this.onPhotoLoad.bind(this);
    this.onPhotoError = this.onPhotoError.bind(this);
    this.onPhotoPress = this.onPhotoPress.bind(this);
    this.onThumbnailPress = this.onThumbnailPress.bind(this);
    this.onPrevButtonPress = this.onPrevButtonPress.bind(this);
    this.onNextButtonPress = this.onNextButtonPress.bind(this);
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

  onThumbnailPress(index) {
    this.to(index);
  }

  getPhotoByIndex(index) {
    const { photos } = this.props;
    return photos[index];
  }

  getItemByDirection(direction, activeIndex) {
    const { photos, wrap } = this.props;

    const isNextDirection = direction === DIRECTION_NEXT;
    const isPrevDirection = direction === DIRECTION_PREV;

    const lastItemIndex = photos.length - 1;
    const isGoingToWrap = (isPrevDirection && activeIndex === 0)
      || (isNextDirection && activeIndex === lastItemIndex);

    if (isGoingToWrap && wrap) {
      return activeIndex;
    }

    const delta = isPrevDirection ? -1 : 1;
    const itemIndex = (activeIndex + delta) % photos.length;
    return itemIndex === -1 ? photos.length - 1 : itemIndex;
  }

  to(index) {
    const { photos } = this.props;
    const { activePhotoIndex } = this.state;

    if ((index > photos.length - 1 || index < 0) || activePhotoIndex === index) {
      return; // nothing to do
    }

    const direction = index > activePhotoIndex ? DIRECTION_NEXT : DIRECTION_PREV;

    this.move(direction, index);
  }

  move(direction, index = false) {
    const { activePhotoIndex } = this.state;

    const nextElementIndex = index !== false
      ? index
      : this.getItemByDirection(direction, activePhotoIndex);

    this.wrapCheck(direction, nextElementIndex);

    this.setState({
      activePhotoIndex: nextElementIndex,
    });
  }

  next() {
    return this.move(DIRECTION_NEXT);
  }

  prev() {
    return this.move(DIRECTION_PREV);
  }

  wrapCheck(direction, nextElementIndex) {
    const {
      photos,
      wrap,
    } = this.props;

    if (wrap) {
      this.setState({
        hideNextButton: nextElementIndex === photos.length - 1,
        hidePrevButton: nextElementIndex === 0,
      });
    }
  }

  render() {
    const {
      photos,
      showThumbnails,
      phrases,
    } = this.props;

    const {
      noPhotosProvided: emptyMessage,
    } = phrases;

    const {
      activePhotoIndex,
    } = this.state;

    const { hidePrevButton, hideNextButton, controlsDisabled } = this.state;

    const current = this.getPhotoByIndex(activePhotoIndex);

    const hasPhotos = photos.length > 0;
    const hasMoreThanOnePhoto = hasPhotos && photos.length > 1;

    return (
      <div className="gallery">
        <div className="gallery-main">
          {!hidePrevButton && hasMoreThanOnePhoto && (
            <GalleryPrevButton
              disabled={controlsDisabled}
              onPress={this.onPrevButtonPress}
            />
          )}
          {!hideNextButton && hasMoreThanOnePhoto && (
            <GalleryNextButton
              disabled={controlsDisabled}
              onPress={this.onNextButtonPress}
            />
          )}
          <div className="gallery-photos">
            {hasPhotos ? (
              <div className="gallery-photo">
                <div className="gallery-photo--current">
                  <GalleryPhoto
                    photo={current}
                    onLoad={this.onPhotoLoad}
                    onError={this.onPhotoError}
                    onPress={this.onPhotoPress}
                  />
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

Gallery.propTypes = propTypes;
Gallery.defaultProps = defaultProps;

export default Gallery;
