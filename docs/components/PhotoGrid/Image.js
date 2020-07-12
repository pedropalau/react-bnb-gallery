import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getHeightWithProportion } from './utils';

const defaultProps = {
  width: 100,
  height: 100,
  onPress: () => {},
  columnSize: 100,
};

const propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  onPress: PropTypes.func,
  columnSize: PropTypes.number,
};

const Image = ({
  src,
  onPress,
  width,
  height,
}) => {
  const [status, setStatus] = useState({
    loading: true,
    error: false,
  });

  const onClickCallback = useCallback(() => {
    onPress(src);
  }, [
    src,
    onPress,
  ]);

  return (
    <button
      className="block w-full focus:outline-none"
      onClick={onClickCallback}
      type="button"
    >
      <figure
        className="min-w-full max-w-full max-h-full cursor-pointer overflow-hidden relative"
      >
        <div className="w-full bg-green-500">
          <img
            alt="bnbgallery"
            className="block w-full h-auto object-cover"
            width={width}
            height={height}
            src={src}
          />
        </div>
      </figure>
    </button>
  );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
