import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import LoadingSpinner from './LoadingSpinner';

import {
  imagePropTypes,
  imageDefaultProps,
} from '../common';
import { forbidExtraProps } from '../common/prop-types';

const propTypes = forbidExtraProps({
  ...imagePropTypes,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
});

const defaultProps = {
  ...imageDefaultProps,
  style: null,
  className: null,
};

class Image extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      withError: false,
    };
    this.onLoad = this.onLoad.bind(this);
    this.onError = this.onError.bind(this);
  }

  onLoad() {
    const { onLoad } = this.props;
    onLoad();
    this.setState({
      loading: false,
      withError: false,
    });
  }

  onError() {
    const { onError } = this.props;
    onError();
    this.setState({
      loading: false,
      withError: true,
    });
  }

  render() {
    const {
      alt,
      src,
      style,
      className,
    } = this.props;

    const {
      loading,
      withError,
    } = this.state;

    const wrapperClassNames = [
      'picture',
      loading && 'loading',
    ];

    const classNames = [
      className,
      'media-image',
    ];

    return (
      <div className={classnames(wrapperClassNames)}>
        {loading && (
          <LoadingSpinner />
        )}
        {!withError && (
          <img
            alt={alt}
            className={classnames(classNames)}
            onLoad={this.onLoad}
            onError={this.onError}
            src={src}
            style={style}
          />
        )}
      </div>
    );
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
