import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';

const defaultProps = {
  showHeader: true,
};

const propTypes = {
  showHeader: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const Layout = ({
  showHeader,
  children,
}) => (
  <div className="flex flex-col min-h-screen border-t-4 border-black">
    {showHeader && (<Header />)}
    <Main>
      {children}
    </Main>
    <Footer />
  </div>
);

Layout.defaultProps = defaultProps;
Layout.propTypes = propTypes;

export default Layout;
