import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import { Portal } from 'react-portal';

import omit from 'lodash/omit';

import Gallery from './components/Gallery';
import GalleryCloseButton from './components/GalleryCloseButton';

import noop from './utils/noop';

import defaultPhrases from './defaultPhrases';
import getPhrasePropTypes from './utils/getPhrasePropTypes';
import getPhotos from './utils/getPhotos';

import SlideDirectionShape from './shapes/SlideDirectionShape';
import PhotosShape from './shapes/PhotosShape';

import {
  FORWARDS,
  ARROW_LEFT_KEYCODE,
  ARROW_RIGHT_KEYCODE,
  ESC_KEYCODE,
} from './constants';

import './styles.css';

const propTypes = {
  activePhotoIndex: PropTypes.number,
  activePhotoPressed: PropTypes.func,
  direction: SlideDirectionShape,
  leftKeyPressed: PropTypes.func,
  nextButtonPressed: PropTypes.func,
  onClose: PropTypes.func,
  preloadSize: PropTypes.number,
  prevButtonPressed: PropTypes.func,
  photos: PhotosShape,
  rightKeyPressed: PropTypes.func,
  show: PropTypes.bool,
  showThumbnails: PropTypes.bool,
  keyboard: PropTypes.bool,
  wrap: PropTypes.bool,
  phrases: PropTypes.shape(getPhrasePropTypes(defaultPhrases)),
};

const defaultProps = {
  activePhotoIndex: 0,
  activePhotoPressed: noop,
  direction: FORWARDS,
  leftKeyPressed: noop,
  nextButtonPressed: noop,
  onClose: noop,
  preloadSize: 5,
  prevButtonPressed: noop,
  photos: [],
  rightKeyPressed: noop,
  show: false,
  showThumbnails: true,
  keyboard: true,
  wrap: false,
  phrases: defaultPhrases,
};

class ReactBnbGallery extends PureComponent {
  constructor(props) {
    super(props);
    this.gallery = React.createRef();
    this.close = this.close.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }

    switch (event.which) {
      case ESC_KEYCODE:
        event.preventDefault();
        this.close();
        break;

      case ARROW_LEFT_KEYCODE:
        event.preventDefault();
        this.gallery.current.prev();
        break;

      case ARROW_RIGHT_KEYCODE:
        event.preventDefault();
        this.gallery.current.next();
        break;

      default:
    }
  }

  close() {
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const {
      show,
      photos,
      phrases,
      keyboard,
    } = this.props;

    if (!show) {
      return null; // nothing to return
    }

    const _photos = getPhotos(photos);

    const galleryProps = omit(this.props, [
      'onClose',
      'leftKeyPressed',
      'preloadSize',
      'rightKeyPressed',
      'show',
      'photos',
    ]);

    const modalProps = {
      className: 'gallery-modal',
      role: 'dialog',
      tabIndex: -1,
      onKeyDown: keyboard && this.onKeyDown,
    };

    return (
      <Portal>
        <FocusTrap>
          <div {...modalProps}>
            <div className="gallery-modal--preload">
              {_photos.map(photo => (
                <img
                  alt={photo.photo}
                  key={photo.photo}
                  src={photo.photo}
                />
              ))}
            </div>
            <div className="gallery-modal--container">
              <div className="gallery-modal--table">
                <div className="gallery-modal--cell">
                  <div className="gallery-modal--content">
                    <div className="gallery-modal--close">
                      <GalleryCloseButton onPress={this.close} />
                    </div>
                    <div className="gallery-content">
                      <div className="gallery-top">
                        <div className="gallery-top--inner" />
                      </div>
                      <Gallery
                        phrases={phrases}
                        ref={this.gallery}
                        photos={_photos}
                        {...galleryProps}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FocusTrap>
      </Portal>
    );
  }
}

ReactBnbGallery.propTypes = propTypes;
ReactBnbGallery.defaultProps = defaultProps;

export default ReactBnbGallery;
