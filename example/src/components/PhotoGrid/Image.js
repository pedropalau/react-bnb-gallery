import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import { getHeightWithProportion } from './utils';

const propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  onPress: PropTypes.func,
  columnSize: PropTypes.number,
};

const defaultProps = {
  src: null,
  width: 100,
  height: 100,
  onPress: () => {},
  columnSize: 100,
};

class Image extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.onLoad = this.onLoad.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {
      src,
      onPress,
    } = this.props;

    onPress(src);
  }

  onLoad() {
    this.setState({
      loading: false,
    });
  }

  getRelativeHeight() {
    const {
      width,
      height,
      columnSize,
    } = this.props;

    return getHeightWithProportion(height, width, columnSize) - 8;
  }

  render() {
    const {
      src,
      width,
      height,
    } = this.props;

    const {
      loading,
    } = this.state;

    const relativeHeight = this.getRelativeHeight();

    return (
      <figure
        className={classnames(
          'picture',
          loading && 'loading',
          !loading && 'loaded',
        )}
        onClick={this.onClick}
        style={{
          width,
          height,
          minHeight: relativeHeight,
          maxHeight: relativeHeight,
        }}
      >
        <div
          className="bg"
          style={{
            backgroundImage: `url(${src})`
          }}
        >
          <img
            alt=''
            src={src}
            width={width}
            height={height}
            onLoad={this.onLoad}
          />
        </div>
      </figure>
    );
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
