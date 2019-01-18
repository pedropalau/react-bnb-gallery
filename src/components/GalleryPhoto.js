import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import LoadingSpinner from './LoadingSpinner';

import noop from '../utils/noop';

const propTypes = {
  photo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onPress: PropTypes.func,
};

const defaultProps = {
  photo: null,
  onLoad: noop,
  onError: noop,
  onPress: noop,
};

class GalleryPhoto extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      withError: false,
    };

    this.onLoad = this.onLoad.bind(this);
    this.onError = this.onError.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { onPress } = this.props;
    onPress();
  }

  onLoad() {
    const { onLoad } = this.props;
    onLoad();

    this.setState({
      loading: false,
    });
  }

  onError() {
    const { onError } = this.props;
    onError();

    this.setState({
      loading: true,
      withError: true,
    });
  }

  render() {
    const { loading, withError } = this.state;

    const { photo } = this.props;

    if (!photo) {
      return null; // nothing to show
    }

    const className = classnames(
      'gallery-media-photo',
      'gallery-media-photo--block',
      'gallery-media-cover',
      loading && 'loading',
    );

    return (
      <ul className="gallery-images--ul">
        <li className={className}>
          {loading && <LoadingSpinner />}
          {!withError && (
            <button
              type="button"
              onClick={this.onPress}
            >
              <img
                alt={photo.caption}
                className="photo"
                onLoad={this.onLoad}
                onError={this.onError}
                src={photo.photo}
              />
            </button>
          )}
        </li>
      </ul>
    );
  }
}

GalleryPhoto.propTypes = propTypes;
GalleryPhoto.defaultProps = defaultProps;

export default GalleryPhoto;
