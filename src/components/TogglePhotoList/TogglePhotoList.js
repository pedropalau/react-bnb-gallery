import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import defaultPhrases from '../../defaultPhrases';
import getPhrasePropTypes from '../../utils/getPhrasePropTypes';

import { forbidExtraProps } from '../../common/prop-types';
import noop from '../../utils/noop';

const propTypes = forbidExtraProps({
  isOpened: PropTypes.bool,
  onPress: PropTypes.func,
  phrases: PropTypes.shape(getPhrasePropTypes(defaultPhrases)),
});

const defaultProps = {
  isOpened: true,
  onPress: noop,
  phrases: defaultPhrases,
};

class TogglePhotoList extends PureComponent {
  render() {
    const {
      isOpened,
      onPress,
      phrases: {
        showPhotoList: showLabel,
        hidePhotoList: hideLabel,
      },
    } = this.props;

    const label = isOpened ? hideLabel : showLabel;

    const className = classnames(
      'gallery-thumbnails--toggle',
      isOpened ? 'hide' : 'open',
    );

    return (
      <button
        type="button"
        className={className}
        onClick={onPress}
      >
        {label}
      </button>
    );
  }
}

TogglePhotoList.propTypes = propTypes;
TogglePhotoList.defaultProps = defaultProps;

export default TogglePhotoList;
