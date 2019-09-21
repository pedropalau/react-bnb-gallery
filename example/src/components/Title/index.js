import React from 'react';
import PropTypes from 'prop-types';

import { forbidExtraProps, range } from 'airbnb-prop-types';
import classnames from 'classnames';

const propTypes = forbidExtraProps({
  children: PropTypes.node.isRequired,
  level: range(1, 7),
});

const defaultProps = {
  level: 2,
};

const Title = ({
  children,
  level,
}) => {
  const Level = `h${level}`;
  return (
    <Level className={classnames(
      'title',
      level && `title__h${level}`
    )}>
      {children}
    </Level>
  );
};

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default Title;
