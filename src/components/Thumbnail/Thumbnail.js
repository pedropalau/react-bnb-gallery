import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import Image from '../Image';
import PhotoShape from '../../shapes/PhotoShape';

import {
  forbidExtraProps,
  nonNegativeInteger,
} from '../../common/prop-types';
import noop from '../../utils/noop';

import {
  THUMBNAIL_WIDTH,
  THUMBNAIL_HEIGHT,
} from '../../constants';

const thumbnailStyle = {
  width: THUMBNAIL_WIDTH,
  height: THUMBNAIL_HEIGHT,
};

const propTypes = forbidExtraProps({
  active: PropTypes.bool,
  photo: PhotoShape,
  onPress: PropTypes.func,
  number: nonNegativeInteger,
});

const defaultProps = {
  active: false,
  photo: null,
  onPress: noop,
  number: 0,
};

class Thumbnail extends PureComponent {
  render() {
    const {
      active,
      photo,
      onPress,
      number,
    } = this.props;

    const className = classnames(
      'thumbnail-button',
      active && 'active',
    );

    return (
      <button
        type="button"
        aria-label={photo.caption}
        className={className}
        data-photo-index={number}
        onClick={onPress}
        disabled={false}
      >
        <Image
          alt={photo.caption}
          src={photo.thumbnail || photo.photo}
          className="thumbnail"
          style={thumbnailStyle}
        />
      </button>
    );
  }
}

Thumbnail.propTypes = propTypes;
Thumbnail.defaultProps = defaultProps;

export default Thumbnail;
