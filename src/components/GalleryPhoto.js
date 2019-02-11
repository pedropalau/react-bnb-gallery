import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';
import classnames from 'classnames';

import Image from './Image';
import PhotoShape from '../shapes/PhotoShape';

import {
  imagePropTypes,
  imageDefaultProps,
} from '../common';
import { forbidExtraProps } from '../common/prop-types';
import noop from '../utils/noop';

const propTypes = forbidExtraProps({
  ...imagePropTypes,
  photo: PhotoShape,
  onPress: PropTypes.func,
});

const defaultProps = {
  ...imageDefaultProps,
  photo: null,
  onPress: noop,
};

class GalleryPhoto extends PureComponent {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { onPress } = this.props;
    onPress();
  }

  renderPhoto() {
    const {
      photo,
      ...rest
    } = this.props;

    if (!photo) {
      return null;
    }

    const imageProps = omit(rest, [
      'onPress',
    ]);

    return (
      <button
        type="button"
        onClick={this.onPress}
        className="photo-button"
      >
        <Image
          alt={photo.caption || ''}
          className="photo"
          src={photo.photo}
          {...imageProps}
        />
      </button>
    );
  }

  render() {
    const className = classnames(
      'gallery-media-photo',
      'gallery-media-photo--block',
      'gallery-media-cover',
    );

    const photoRendered = this.renderPhoto();

    return (
      <ul className="gallery-images--ul">
        <li className={className}>
          {photoRendered}
        </li>
      </ul>
    );
  }
}

GalleryPhoto.propTypes = propTypes;
GalleryPhoto.defaultProps = defaultProps;

export default GalleryPhoto;
