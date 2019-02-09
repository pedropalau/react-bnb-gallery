import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import { Portal } from 'react-portal';

import omit from 'lodash/omit';
import classnames from 'classnames';

import Gallery from './components/Gallery';
import GalleryCloseButton from './components/GalleryCloseButton';

import opacityValidation from './common/opacityValidation';
import noop from './utils/noop';
import getPhotos from './utils/getPhotos';

import {
  ARROW_LEFT_KEYCODE,
  ARROW_RIGHT_KEYCODE,
  ESC_KEYCODE,
  DEFAULT_OPACITY,
  DEFAULT_COLOR,
} from './constants';

import {
  galleryPropTypes,
  galleryDefaultProps,
} from './common';

import {
  forbidExtraProps,
} from './common/prop-types';

import './styles.css';

const propTypes = forbidExtraProps({
  ...galleryPropTypes,
  leftKeyPressed: PropTypes.func,
  onClose: PropTypes.func,
  rightKeyPressed: PropTypes.func,
  show: PropTypes.bool,
  keyboard: PropTypes.bool,
  opacity: opacityValidation,
  backgroundColor: PropTypes.string,
});

const defaultProps = {
  ...galleryDefaultProps,
  leftKeyPressed: noop,
  onClose: noop,
  rightKeyPressed: noop,
  show: false,
  keyboard: true,
  opacity: DEFAULT_OPACITY,
  backgroundColor: DEFAULT_COLOR,
};

class ReactBnbGallery extends PureComponent {
  constructor(props) {
    super(props);
    const { photos } = this.props;
    this.photos = getPhotos(photos);
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

  getModalOverlayStyles() {
    const {
      opacity,
      backgroundColor,
    } = this.props;

    return {
      opacity,
      backgroundColor,
    };
  }

  close() {
    const { onClose } = this.props;
    onClose();
  }

  render() {
    const {
      show,
      phrases,
      keyboard,
      light,
    } = this.props;

    if (!show) {
      return null; // nothing to return
    }

    const galleryProps = omit(this.props, [
      'onClose',
      'leftKeyPressed',
      'rightKeyPressed',
      'show',
      'photos',
      'opacity',
      'backgroundColor',
      'keyboard',
    ]);

    const modalProps = {
      className: classnames([
        'gallery-modal',
        light && 'mode-light',
      ]),
      role: 'dialog',
      tabIndex: -1,
      onKeyDown: keyboard && this.onKeyDown,
    };

    // modal overlay customization styles
    const galleryModalOverlayStyles = this.getModalOverlayStyles();

    return (
      <Portal>
        <FocusTrap>
          <div {...modalProps}>
            <div
              style={galleryModalOverlayStyles}
              className="gallery-modal--overlay"
            />
            <div className="gallery-modal--container">
              <div className="gallery-modal--table">
                <div className="gallery-modal--cell">
                  <div className="gallery-modal--content">
                    <div className="gallery-modal--close">
                      <GalleryCloseButton
                        onPress={this.close}
                        light={light}
                      />
                    </div>
                    <div className="gallery-content">
                      <div className="gallery-top">
                        <div className="gallery-top--inner" />
                      </div>
                      <Gallery
                        phrases={phrases}
                        ref={this.gallery}
                        photos={this.photos}
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
