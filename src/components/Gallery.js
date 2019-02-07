import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  galleryPropTypes,
  galleryDefaultProps,
} from '../common';

import GalleryCaption from './GalleryCaption';
import GalleryPrevButton from './GalleryPrevButton';
import GalleryNextButton from './GalleryNextButton';
import GalleryPhoto from './GalleryPhoto';

import {
  DIRECTION_NEXT,
  DIRECTION_PREV,
} from '../constants';

const propTypes = {
  ...galleryPropTypes,
};

const defaultProps = {
  ...galleryDefaultProps,
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
    this.lastPreloadIndex = 0;
    this.preloadedPhotos = [];
    this.hasPhotos = photos.length > 0;
    this.hasMoreThanOnePhoto = photos.length > 1;
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

  renderControls() {
    const {
      hidePrevButton,
      hideNextButton,
      controlsDisabled,
    } = this.state;

    let controls = [];

    if (this.hasMoreThanOnePhoto) {
      // previous control
      if (!hidePrevButton ) {
        controls.push((
          <GalleryPrevButton
            key=".prevControl"
            disabled={controlsDisabled}
            onPress={this.onPrevButtonPress}
          />
        ));
      }

      // next control
      if (!hideNextButton) {
        controls.push((
          <GalleryNextButton
            key=".nextControl"
            disabled={controlsDisabled}
            onPress={this.onNextButtonPress}
          />
        ));
      }
    }

    return controls;
  }

  renderPreloadPhotos() {
    const {
      photos,
      preloadSize,
    } = this.props;

    let preloadPhotosList = [];
    if (preloadSize < photos.length) {
      const preloadCopyArray = photos.slice(this.lastPreloadIndex, preloadSize);
      this.lastPreloadIndex += preloadSize;
      console.log(preloadCopyArray)
    }

    /*return (
      this.photos.map(photo => (
        <img
          alt={photo.photo}
          key={photo.photo}
          src={photo.photo}
        />
      ))
    );*/

    return preloadPhotosList;
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

    // preload photos
    const galleryModalPreloadPhotos = this.renderPreloadPhotos();

    const controls = this.renderControls();

    const current = this.getPhotoByIndex(activePhotoIndex);

    return (
      <div className="gallery">
        <div className="gallery-modal--preload">
          {galleryModalPreloadPhotos}
        </div>
        <div className="gallery-main">
          {controls}
          <div className="gallery-photos">
            {this.hasPhotos ? (
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
