import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const defaultProps = {
  width: 100,
  height: 100,
  alt: 'bnbgallery',
  onPress: () => {},
};

const propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
  onPress: PropTypes.func,
};

const Image = ({
  src,
  onPress,
  width,
  height,
  alt,
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
            alt={alt}
            className={classnames(
              'block w-full h-auto object-cover',
              status.loading && 'opacity-0',
              !status.loading && 'transition-opacity ease-in-out duration-1000 opacity-1',
            )}
            width={width}
            height={height}
            src={src}
            onLoad={() => setStatus({ loading: false, error: false })}
            onError={() => setStatus({ loading: false, error: true })}
          />
        </div>
      </figure>
    </button>
  );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
