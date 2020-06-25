import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Layout = ({
  children,
}) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <Main>
      {children}
    </Main>
    <Footer />
  </div>
);

Layout.propTypes = propTypes;

export default Layout;
