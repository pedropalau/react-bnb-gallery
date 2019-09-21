import React from 'react';
import PropTypes from 'prop-types';

import { forbidExtraProps } from 'airbnb-prop-types';
import classnames from 'classnames';

import './component.scss';

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired,
  inherit: PropTypes.bool,
});

const defaultProps = {
  inherit: false,
};

const Text = ({
  children,
  inherit,
}) => (
  <p className={classnames('text', inherit && 'text__inherit')}>
    {children}
  </p>
);

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
