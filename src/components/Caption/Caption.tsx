import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import noop from '../../utils/noop';

import Thumbnail from '../Thumbnail/Thumbnail';
import TogglePhotoList from '../TogglePhotoList/TogglePhotoList';

import calculateThumbnailsContainerDimension from '../../utils/calculateThumbnailsContainerDimension';
import calculateThumbnailsLeftScroll from '../../utils/calculateThumbnailsLeftScroll';

import defaultPhrases from '../../defaultPhrases';
import getPhrasePropTypes from '../../utils/getPhrasePropTypes';

import {
  forbidExtraProps,
  nonNegativeInteger,
} from '../../common/prop-types';

import PhotosShape from '../../shapes/PhotosShape';

interface CaptionProps {
  [key: string]: any;
}

interface CaptionState {
  showThumbnails: boolean;
}

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

class Caption extends PureComponent<CaptionProps, CaptionState> {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  thumbnailsWrapperRef: HTMLDivElement | null;

  thumbnailsListRef: HTMLUListElement | null;

  constructor(props: CaptionProps) {
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

  componentDidUpdate(prevProps: CaptionProps) {
    const { current } = this.props;
    if (current !== prevProps.current) {
      this.setThumbnailsWrapperScrollLeft(current);
    }
  }

  onThumbnailPress(event: React.MouseEvent<HTMLElement>) {
    const {
      onPress,
      photos,
    } = this.props;
    const index = parseInt(event.currentTarget.dataset.photoIndex || '-1', 10);
    if (index >= 0 && index <= photos.length - 1) {
      onPress(index);
    }
  }

  setThumbnailsWrapperScrollLeft(current: number) {
    const { photos } = this.props;

    if (!this.thumbnailsWrapperRef || !this.thumbnailsListRef) {
      return;
    }

    const bounding = this.thumbnailsWrapperRef.getBoundingClientRect();
    const scrollLeft = calculateThumbnailsLeftScroll(current, photos.length, bounding);
    this.thumbnailsListRef.style.marginLeft = `${scrollLeft}px`;
  }

  getPhotoByIndex(index: number) {
    const { photos } = this.props;
    return photos[index];
  }

  setGalleryFigcaptionRef(element: HTMLDivElement | null) {
    this.thumbnailsWrapperRef = element;
  }

  setGalleryThubmanilsRef(element: HTMLUListElement | null) {
    this.thumbnailsListRef = element;
  }

  toggleThumbnails() {
    this.setState((prevState) => ({
      showThumbnails: !prevState.showThumbnails,
    }));
  }

  renderThumbnail(photo: any, index: number, onPress: (event: React.MouseEvent<HTMLElement>) => void) {
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
                    {photos.map((photo: any, index: number) => (
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

export default Caption;
