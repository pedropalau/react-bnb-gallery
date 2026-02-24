import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import noop from '../../utils/noop';

import Thumbnail from '../Thumbnail';
import TogglePhotoList from '../TogglePhotoList';

import calculateThumbnailsContainerDimension from '../../utils/calculateThumbnailsContainerDimension';
import calculateThumbnailsLeftScroll from '../../utils/calculateThumbnailsLeftScroll';

import defaultPhrases from '../../defaultPhrases';
import getPhrasePropTypes from '../../utils/getPhrasePropTypes';

import {
  forbidExtraProps,
  nonNegativeInteger,
} from '../../common/prop-types';

import PhotosShape from '../../shapes/PhotosShape';

const propTypes = forbidExtraProps({
  showThumbnails: PropTypes.bool,
  current: nonNegativeInteger,
  photos: PhotosShape,
  onPress: PropTypes.func,
  phrases: PropTypes.shape(getPhrasePropTypes(defaultPhrases)),
});

const defaultProps = {
  showThumbnails: true,
  current: 0,
  photos: [],
  onPress: noop,
  phrases: defaultPhrases,
};

class Caption extends PureComponent {
  constructor(props) {
    super(props);
    const {
      showThumbnails,
    } = this.props;

    this.state = {
      showThumbnails,
    };

    this.thumbnailsWrapperRef = null;
    this.thumbnailsListRef = null;
    this.onThumbnailPress = this.onThumbnailPress.bind(this);
    this.setGalleryFigcaptionRef = this.setGalleryFigcaptionRef.bind(this);
    this.setGalleryThubmanilsRef = this.setGalleryThubmanilsRef.bind(this);
    this.toggleThumbnails = this.toggleThumbnails.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { current } = this.props;
    if (current !== prevProps.current) {
      this.setThumbnailsWrapperScrollLeft(current);
    }
  }

  onThumbnailPress(event) {
    const {
      onPress,
      photos,
    } = this.props;
    const index = parseInt(event.currentTarget.dataset.photoIndex, 10);
    if (index >= 0 && index <= photos.length - 1) {
      onPress(index);
    }
  }

  setThumbnailsWrapperScrollLeft(current) {
    const { photos } = this.props;
    const bounding = this.thumbnailsWrapperRef.getBoundingClientRect();
    const scrollLeft = calculateThumbnailsLeftScroll(current, photos.length, bounding);
    this.thumbnailsListRef.style.marginLeft = `${scrollLeft}px`;
  }

  getPhotoByIndex(index) {
    const { photos } = this.props;
    return photos[index];
  }

  setGalleryFigcaptionRef(element) {
    this.thumbnailsWrapperRef = element;
  }

  setGalleryThubmanilsRef(element) {
    this.thumbnailsListRef = element;
  }

  toggleThumbnails() {
    this.setState((prevState) => ({
      showThumbnails: !prevState.showThumbnails,
    }));
  }

  renderThumbnail(photo, index, onPress) {
    const { current } = this.props;

    return (
      <Thumbnail
        active={index === current}
        photo={photo}
        onPress={onPress}
        number={index}
      />
    );
  }

  render() {
    const {
      current,
      photos,
      phrases,
    } = this.props;

    const {
      showThumbnails,
    } = this.state;

    const className = classnames(
      'gallery-figcaption',
      !showThumbnails && 'hide',
    );

    const currentPhoto = this.getPhotoByIndex(current);
    const captionThumbnailsWrapperWidth = calculateThumbnailsContainerDimension(photos.length);
    const hasMoreThanOnePhoto = photos.length > 1;

    return (
      <figcaption className={className}>
        <div className="gallery-figcaption--content">
          <div className="gallery-figcaption--inner">
            <div className="gallery-figcaption--info">
              <div className="caption-left">
                {currentPhoto.caption && (
                  <h3 className="photo-caption">
                    {currentPhoto.caption}
                  </h3>
                )}
                {currentPhoto.subcaption && (
                  <p className="photo-subcaption">
                    {currentPhoto.subcaption}
                  </p>
                )}
              </div>
              {hasMoreThanOnePhoto && (
                <div className="caption-right">
                  <TogglePhotoList
                    phrases={phrases}
                    isOpened={showThumbnails}
                    onPress={this.toggleThumbnails}
                  />
                </div>
              )}
            </div>
            {hasMoreThanOnePhoto && (
              <div
                className="gallery-figcaption--thumbnails"
                aria-hidden={false}
                ref={this.setGalleryFigcaptionRef}
              >
                <div
                  className="caption-thumbnails"
                  style={{
                    width: captionThumbnailsWrapperWidth,
                  }}
                >
                  <ul
                    className="thumbnails-list"
                    ref={this.setGalleryThubmanilsRef}
                  >
                    {photos.map((photo, index) => (
                      <li key={photo.photo}>
                        {this.renderThumbnail(photo, index, this.onThumbnailPress)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </figcaption>
    );
  }
}

Caption.propTypes = propTypes;
Caption.defaultProps = defaultProps;

export default Caption;
