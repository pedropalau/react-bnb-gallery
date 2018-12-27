import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import LoadingSpinner from './LoadingSpinner';
import { noop } from '../utils/functions';

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
  constructor() {
    super(...arguments);

    this.state = {
      loading: true,
      withError: false,
    };

    this.onLoad = this.onLoad.bind(this);
    this.onError = this.onError.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  onPress = () => {
    this.props.onPress();
  }

  onLoad = () => {
    this.props.onLoad();

    this.setState({
      loading: false
    });
  }

  onError = () => {
    this.props.onError();

    this.setState({
      loading: true,
      withError: true
    });
  }

  render = () => {
    const { loading, withError } = this.state;

    const { photo } = this.props;

    if (!photo) {
      return null; // nothing to show
    }

    const src = typeof photo === "string" ? photo : (typeof photo === "object") ? photo.photo : undefined;

    const className = classnames(
      "gallery-media-photo",
      "gallery-media-photo--block",
      "gallery-media-cover",
      loading && "loading"
    );

    return (
      <ul className="gallery-images--ul">
        <li className={className} onClick={this.onPress}>
          {loading && <LoadingSpinner />}
          <img
            className="photo"
            onLoad={this.onLoad}
            onError={this.onError}
            src={src} />
        </li>
      </ul>
    );
  }
}

GalleryPhoto.propTypes = propTypes;
GalleryPhoto.defaultProps = defaultProps;

export default GalleryPhoto;
