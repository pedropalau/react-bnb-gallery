import React from 'react';
import PropTypes from 'prop-types';

import { forbidExtraProps } from 'airbnb-prop-types';
import classnames from 'classnames';

import './component.css';

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired
});

const defaultProps = {};

const Text = ({
  children
}) => (
  <p className={classnames('text')}>
    {children}
  </p>
);

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
