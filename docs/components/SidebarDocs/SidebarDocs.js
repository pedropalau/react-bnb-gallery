import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Sidebar from '../Sidebar';

import docsPages from '../../data/getDocsPages';

const defaultProps = {
  isOpen: false,
};

const propTypes = {
  isOpen: PropTypes.bool,
};

const SidebarDocs = ({
  isOpen,
}) => (
  <div
    className={classnames(
      !isOpen && 'hidden',
      'fixed inset-0 mt-16 h-full bg-white z-90 w-full -mb-16 lg:-mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:mt-0 lg:w-1/3 lg:block',
    )}
  >
    <Sidebar menu={docsPages} />
  </div>
);

SidebarDocs.defaultProps = defaultProps;
SidebarDocs.propTypes = propTypes;

export default SidebarDocs;
