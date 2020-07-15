import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';

import { LayoutContextProvider } from './context';

const defaultProps = {
  showHeader: true,
  showHeaderFixed: false,
  showMenuControls: true,
};

const propTypes = {
  showHeader: PropTypes.bool,
  showHeaderFixed: PropTypes.bool,
  showMenuControls: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const Layout = ({
  showHeader,
  showHeaderFixed,
  showMenuControls,
  children,
}) => {
  const [value, setValue] = useState({
    navigationOpened: false,
  });

  return (
    <LayoutContextProvider value={value}>
      <div
        className={classnames(
          'flex flex-col min-h-screen',
          value.navigationOpened && 'overflow-y-hidden',
        )}
      >
        {showHeader && (
          <Header
            menuOpened={value.navigationOpened}
            onMenuOpen={() => setValue({
              ...value,
              navigationOpened: true,
            })}
            onMenuClose={() => setValue({
              ...value,
              navigationOpened: false,
            })}
            showMenuControls={showMenuControls}
            fixed={showHeaderFixed}
          />
        )}
        <Main>
          {children}
        </Main>
        <Footer />
      </div>
    </LayoutContextProvider>
  );
};

Layout.defaultProps = defaultProps;
Layout.propTypes = propTypes;

export default Layout;
