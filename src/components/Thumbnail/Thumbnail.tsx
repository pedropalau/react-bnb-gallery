import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import Image from '../Image/Image';
import PhotoShape from '../../shapes/PhotoShape';

import {
  forbidExtraProps,
  nonNegativeInteger,
} from '../../common/prop-types';
import noop from '../../utils/noop';
import { GalleryPhoto } from '../../types/gallery';

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

interface ThumbnailProps {
  active?: boolean;
  photo?: GalleryPhoto | null;
  onPress?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  number?: number;
}

class Thumbnail extends PureComponent<ThumbnailProps> {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  render() {
    const {
      active = false,
      photo,
      onPress = noop,
      number = 0,
    } = this.props;

    if (!photo) {
      return null;
    }

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
          alt={photo.caption || ''}
          src={photo.thumbnail || photo.photo || ''}
          className="thumbnail"
          style={thumbnailStyle}
        />
      </button>
    );
  }
}

export default Thumbnail;
