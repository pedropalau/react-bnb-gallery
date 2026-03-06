import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import type {
	GalleryClassNames,
	GalleryComponents,
	GalleryPhrases,
	GalleryStyles,
} from '../types/gallery';

interface GalleryContextValue {
	phrases: GalleryPhrases;
	components?: GalleryComponents;
	classNames?: GalleryClassNames;
	styles?: GalleryStyles;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

interface GalleryContextProviderProps {
	value: GalleryContextValue;
	children: ReactNode;
}

function GalleryContextProvider({
	value,
	children,
}: GalleryContextProviderProps) {
	return (
		<GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
	);
}

function useGalleryContext(): GalleryContextValue | null {
	return useContext(GalleryContext);
}

export { GalleryContextProvider, useGalleryContext };
