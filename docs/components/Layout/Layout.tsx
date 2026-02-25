'use client';

import classnames from 'classnames';
import { useMemo, useState, type ReactNode } from 'react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import LayoutContext from './context';

interface LayoutProps {
  showHeader?: boolean;
  showHeaderFixed?: boolean;
  showMenuControls?: boolean;
  children: ReactNode;
}

export default function Layout({
  showHeader = true,
  showHeaderFixed = false,
  showMenuControls = true,
  children,
}: LayoutProps) {
  const [navigationOpened, setNavigationOpened] = useState(false);

  const contextValue = useMemo(
    () => ({ navigationOpened, setNavigationOpened }),
    [navigationOpened],
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      <div className={classnames('flex min-h-screen flex-col', navigationOpened && 'overflow-y-hidden')}>
        {showHeader ? (
          <Header
            menuOpened={navigationOpened}
            onMenuOpen={() => setNavigationOpened(true)}
            onMenuClose={() => setNavigationOpened(false)}
            showMenuControls={showMenuControls}
            fixed={showHeaderFixed}
          />
        ) : null}
        <Main>{children}</Main>
        <Footer />
      </div>
    </LayoutContext.Provider>
  );
}
