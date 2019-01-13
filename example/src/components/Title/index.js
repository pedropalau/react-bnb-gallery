import React from 'react';
import PropTypes from 'prop-types';

import { forbidExtraProps, range } from 'airbnb-prop-types';
import classnames from 'classnames';

import './component.css';

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired,
  level: range(1, 6),
});

const defaultProps = {
  level: 1,
};

const Title = ({
  children,
  level,
}) => {
  const Level = `h${level}`;
  return (
    <Level className={classnames(
      'title',
      level && `title__${level}`
    )}>
      {children}
    </Level>
  );
};

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;
