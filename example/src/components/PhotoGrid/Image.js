import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

const propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  onPress: PropTypes.func,
};

const defaultProps = {
  src: null,
  width: 100,
  height: 100,
  onPress: () => {},
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

  render() {
    const {
      src,
      width,
      height,
    } = this.props;

    const {
      loading,
    } = this.state;

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
        }}
      >
        <img
          alt=''
          src={src}
          width={width}
          height={height}
          onLoad={this.onLoad}
        />
      </figure>
    );
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
