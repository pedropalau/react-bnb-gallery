import React from 'react';
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import { Portal } from 'react-portal';
import Gallery from './components/Gallery';
import GalleryCloseButton from './components/GalleryCloseButton';
import { noop } from './utils/functions';
import SlideDirectionShape from './shapes/SlideDirectionShape';
import { Direction, FORWARDS } from './constants';
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
  photos: PropTypes.array.isRequired,
  rightKeyPressed: PropTypes.func,
  show: PropTypes.bool,
  showThumbnails: PropTypes.bool,
  wrap: PropTypes.bool,
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
  wrap: false,
};

class ReactBnbGallery extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.close = this.close.bind(this);
  }

  close = () => {
    this.props.onClose();
  }

  _processPhotos = (photos, total) => photos.map((photo, index) => this._processPhoto(photo, index + 1, total));

  _processPhoto = (photo, number, total) => {
    if (typeof photo === "string") {
      return {
        number: number,
        photo: photo,
        caption: `${number}/${total}`,
        subcaption: null,
        thumbnail: null,
      };
    }

    // merge in default values
    photo = Object.assign({
      number: number,
      caption: "",
      subcaption: null,
      thumbnail: null,
    }, photo);

    // @todo do this in a better way
    photo.caption = `${number}/${total}: ${photo.caption}`;

    return photo;
  }

  render = () => {
    const { show, photos } = this.props;

    if (!show) {
      return null; // nothing to return
    }

    // process all pictures
    const finalPhotos = this._processPhotos(photos, photos.length);

    const galleryProps = omit(this.props, [
      'onClose',
      'leftKeyPressed',
      'preloadSize',
      'rightKeyPressed',
      'show',
      'photos',
    ]);

    return (
      <Portal>
        <FocusTrap>
          <div className="gallery-modal" role="dialog" tabIndex="-1">
            <div className="gallery-modal--preload">
              {finalPhotos.map(photo => <img key={photo.photo} src={photo.photo} />)}
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
                        <div className="gallery-top--inner"></div>
                      </div>
                      <Gallery photos={finalPhotos} {...galleryProps} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FocusTrap>
      </Portal>
    );
  };
}

ReactBnbGallery.propTypes = propTypes;
ReactBnbGallery.defaultProps = defaultProps;

export default ReactBnbGallery;
