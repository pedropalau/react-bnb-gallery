'use client';

import classnames from 'classnames';
import { type ReactNode, useMemo, useState } from 'react';

import SiteFooter from './site-footer';
import SiteHeader from './site-header';
import LayoutContext from './layout-context';
import Main from './main';

export function Layout({
	showHeader = true,
	showHeaderFixed = false,
	showMenuControls = true,
	children,
}: {
	showHeader?: boolean;
	showHeaderFixed?: boolean;
	showMenuControls?: boolean;
	children: ReactNode;
}) {
	const [navigationOpened, setNavigationOpened] = useState(false);

	const contextValue = useMemo(
		() => ({ navigationOpened, setNavigationOpened }),
		[navigationOpened],
	);

	return (
		<LayoutContext.Provider value={contextValue}>
			<div
				className={classnames(
					'flex min-h-screen flex-col',
					navigationOpened && 'overflow-y-hidden',
				)}
			>
				{showHeader ? (
					<SiteHeader
						menuOpened={navigationOpened}
						onMenuOpen={() => setNavigationOpened(true)}
						onMenuClose={() => setNavigationOpened(false)}
						showMenuControls={showMenuControls}
						fixed={showHeaderFixed}
					/>
				) : null}
				<Main>{children}</Main>
				<SiteFooter />
			</div>
		</LayoutContext.Provider>
	);
}

export default Layout;
