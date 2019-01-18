import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import noop from '../utils/noop';

import GalleryTogglePhotoList from './GalleryTogglePhotoList';

import calculateThumbnailsContainerDimension from '../utils/calculateThumbnailsContainerDimension';
import calculateThumbnailsOffset from '../utils/calculateThumbnailsOffset';

import defaultPhrases from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import PhotosShape from '../shapes/PhotosShape';

import {
  THUMBNAIL_WIDTH,
  THUMBNAIL_HEIGHT,
} from '../constants';

const thumbnailStyle = {
  width: THUMBNAIL_WIDTH,
  height: THUMBNAIL_HEIGHT,
};

const propTypes = {
  showThumbnails: PropTypes.bool,
  current: PropTypes.number,
  photos: PhotosShape,
  onPress: PropTypes.func,
  phrases: PropTypes.shape(getPhrasePropTypes(defaultPhrases)),
};

const defaultProps = {
  showThumbnails: true,
  current: 0,
  photos: [],
  onPress: noop,
  phrases: defaultPhrases,
};

class GalleryCaption extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      current,
      showThumbnails,
    } = this.props;
    this.state = {
      current,
      showThumbnails,
      thumbnailsContainerBounding: null,
      thumbnailsOffset: 0,
    };
    this.onThumbnailPress = this.onThumbnailPress.bind(this);
    this.setGalleryFigcaptionRef = this.setGalleryFigcaptionRef.bind(this);
    this.toggleThumbnails = this.toggleThumbnails.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.current !== state.current) {
      const offset = calculateThumbnailsOffset(
        props.current,
        state.thumbnailsContainerBounding,
        props.photos.length,
      );
      return {
        thumbnailsOffset: offset,
      };
    }
    return null;
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

  getPhotoByIndex(index) {
    const { photos } = this.props;
    return photos[index];
  }

  setGalleryFigcaptionRef(element) {
    const {
      current,
      photos,
    } = this.props;
    if (element) {
      const bounding = element.getBoundingClientRect();
      const offset = calculateThumbnailsOffset(
        current,
        bounding,
        photos.length,
      );
      this.setState({
        thumbnailsContainerBounding: bounding,
        thumbnailsOffset: offset,
      });
    }
  }

  toggleThumbnails() {
    this.setState(prevState => ({
      showThumbnails: !prevState.showThumbnails,
    }));
  }

  renderThumbnail(photo, index, onClick) {
    const { current } = this.props;

    const className = classnames(
      'thumbnail-button',
      index === current && 'active',
    );

    return (
      <button
        type="button"
        aria-label={photo.caption}
        className={className}
        data-photo-index={index}
        onClick={onClick}
        disabled={false}
      >
        <img
          alt={photo.caption}
          src={photo.thumbnail || photo.photo}
          className="thumbnail"
          style={thumbnailStyle}
        />
      </button>
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
      thumbnailsOffset,
    } = this.state;

    const className = classnames(
      'gallery-figcaption',
      !showThumbnails && 'hide',
    );

    const currentPhoto = this.getPhotoByIndex(current);

    const hasMoreThanOnePhoto = photos.length > 1;

    return (
      <figcaption className={className}>
        <div className="gallery-figcaption--content">
          <div className="gallery-figcaption--inner">
            <div className="gallery-figcaption--info">
              <div className="caption-left">
                {currentPhoto.caption && <h3 className="photo-caption">{currentPhoto.caption}</h3>}
                {currentPhoto.subcaption && <p className="photo-subcaption">{currentPhoto.subcaption}</p>}
              </div>
              {hasMoreThanOnePhoto && (
                <div className="caption-right">
                  <GalleryTogglePhotoList
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
                    width: calculateThumbnailsContainerDimension(photos.length),
                  }}
                >
                  <ul
                    className="thumbnails-list"
                    style={{
                      marginLeft: thumbnailsOffset,
                    }}
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

GalleryCaption.propTypes = propTypes;
GalleryCaption.defaultProps = defaultProps;

export default GalleryCaption;
