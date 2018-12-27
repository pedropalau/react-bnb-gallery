import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import GalleryTogglePhotoList from './GalleryTogglePhotoList';
import PhotosShape from '../shapes/PhotosShape';
import { THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT, THUMBNAIL_OFFSET } from '../constants';
import {
  noop,
  calculateThumbnailsContainerDimension,
  calculateThumbnailOffset
} from '../utils/functions';

const thumbnailStyle = {
  width: THUMBNAIL_WIDTH,
  height: THUMBNAIL_HEIGHT,
};

const propTypes = {
  showThumbnails: PropTypes.bool,
  current: PropTypes.number.isRequired,
  next: PropTypes.number.isRequired,
  photos: PhotosShape,
  onPress: PropTypes.func,
};

const defaultProps = {
  showThumbnails: true,
  current: 0,
  next: 0,
  photos: [],
  onPress: noop,
};

class GalleryCaption extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      showThumbnails: this.props.showThumbnails
    };
    this.toggleThumbnails = this.toggleThumbnails.bind(this);
    this.thumbnailsRef = React.createRef();
  }

  toggleThumbnails = () => this.setState(prevState => ({
    showThumbnails: !prevState.showThumbnails,
  }));

  onThumbnailPress = (index) => this.props.onPress(index);

  getPhotoByIndex = (index) => this.props.photos[index];

  _renderThumbnail = (photo, index) => {
    const className = classnames(
      "thumbnail-button",
      index === this.props.current && "active"
    );

    return (
      <button
        aria-label={photo.caption}
        className={className}
        data-photo-index={index}
        onClick={() => this.onThumbnailPress(index)}
        disabled={false}>
        <img
          alt={photo.caption}
          src={photo.thumbnail || photo.photo}
          className="thumbnail"
          style={thumbnailStyle} />
      </button>
    );
  };

  render = () => {
    const { showThumbnails, thumbnailsContainerWidth } = this.state;

    const { current, next, photos } = this.props;

    const className = classnames("gallery-figcaption", !showThumbnails && "hide");

    const currentPhoto = this.getPhotoByIndex(current);

    const offset = calculateThumbnailOffset(current, next, photos.length, this.thumbnailsRef.current);

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
                    isOpened={showThumbnails}
                    onPress={this.toggleThumbnails} />
                </div>
              )}
            </div>
            {hasMoreThanOnePhoto && (
              <div className="gallery-figcaption--thumbnails" aria-hidden={false} ref={this.thumbnailsRef}>
                <div className="caption-thumbnails" style={{width: calculateThumbnailsContainerDimension(photos.length)}}>
                  <ul className="thumbnails-list" style={{ marginLeft: offset }}>
                    {photos.map((photo, index) => (
                      <li key={photo.photo}>
                        {this._renderThumbnail(photo, index)}
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
