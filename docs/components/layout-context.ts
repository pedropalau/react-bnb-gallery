'use client';

import { createContext, useContext } from 'react';

interface LayoutContextValue {
	navigationOpened: boolean;
	setNavigationOpened: (open: boolean) => void;
}

const LayoutContext = createContext<LayoutContextValue>({
	navigationOpened: false,
	setNavigationOpened: () => {},
});

export function useLayoutContext(): LayoutContextValue {
	return useContext(LayoutContext);
}

export default LayoutContext;
