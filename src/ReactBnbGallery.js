/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import { Portal } from 'react-portal';

import { omit } from 'lodash-es';
import classnames from 'classnames';

import Gallery from './components/Gallery';
import CloseButton from './components/CloseButton';

import opacityValidation from './common/opacityValidation';
import noop from './utils/noop';
import getPhotos from './utils/getPhotos';

import {
  ARROW_LEFT_KEYCODE,
  ARROW_RIGHT_KEYCODE,
  ESC_KEYCODE,
  DEFAULT_OPACITY,
  DEFAULT_Z_INDEX,
} from './constants';

import {
  galleryPropTypes,
  galleryDefaultProps,
} from './common';

import {
  forbidExtraProps,
  nonNegativeInteger,
} from './common/prop-types';

import './scss/style.scss';

const propTypes = forbidExtraProps({
  ...galleryPropTypes,
  leftKeyPressed: PropTypes.func,
  onClose: PropTypes.func,
  rightKeyPressed: PropTypes.func,
  show: PropTypes.bool,
  keyboard: PropTypes.bool,
  opacity: opacityValidation,
  zIndex: nonNegativeInteger,
});

const defaultProps = {
  ...galleryDefaultProps,
  leftKeyPressed: noop,
  onClose: noop,
  rightKeyPressed: noop,
  show: false,
  keyboard: true,
  opacity: DEFAULT_OPACITY,
  zIndex: DEFAULT_Z_INDEX,
};

class ReactBnbGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null,
    };
    this.gallery = React.createRef();
    this.close = this.close.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.photos !== state.photos) {
      return {
        photos: getPhotos(props.photos),
      };
    }
    return null;
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
      zIndex,
    } = this.props;

    const { photos } = this.state;

    if (!show) {
      return null; // nothing to return
    }

    const {
      wrap,
      activePhotoIndex,
      activePhotoPressed,
      direction,
      nextButtonPressed,
      prevButtonPressed,
      showThumbnails,
      preloadSize,
    } = omit(this.props, [
      'onClose',
      'leftKeyPressed',
      'rightKeyPressed',
      'show',
      'photos',
      'opacity',
      'backgroundColor',
      'zIndex',
      'keyboard',
    ]);

    // modal overlay customization styles
    const galleryModalOverlayStyles = this.getModalOverlayStyles();

    const modalStyle = {
      zIndex,
    };

    return (
      <Portal>
        <FocusTrap>
          <div
            className={classnames([
              'gallery-modal',
              light && 'mode-light',
            ])}
            onKeyDown={keyboard && this.onKeyDown}
            tabIndex="-1"
            role="dialog"
            style={modalStyle}
          >
            <div
              style={galleryModalOverlayStyles}
              className="gallery-modal--overlay"
            />
            <div className="gallery-modal--container">
              <div className="gallery-modal--table">
                <div className="gallery-modal--cell">
                  <div className="gallery-modal--content">
                    <div className="gallery-modal--close">
                      <CloseButton
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
                        photos={photos}
                        wrap={wrap}
                        activePhotoIndex={activePhotoIndex}
                        activePhotoPressed={activePhotoPressed}
                        direction={direction}
                        nextButtonPressed={nextButtonPressed}
                        prevButtonPressed={prevButtonPressed}
                        showThumbnails={showThumbnails}
                        preloadSize={preloadSize}
                        backgroundColor={null}
                        light={light}
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
