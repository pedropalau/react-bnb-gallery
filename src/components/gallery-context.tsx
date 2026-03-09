import { createContext, useContext } from 'react';
import type {
	GalleryClassNames,
	GalleryComponents,
	GalleryPhrases,
	GalleryStyles,
} from '../types/gallery';

// Only Thumbnail and TogglePhotoList are slot components rendered inside
// Caption, which is itself a slot. Other GalleryComponents slots are rendered
// directly by Gallery and do not need to flow through context.
type GalleryContextComponents = Pick<
	GalleryComponents,
	'Thumbnail' | 'TogglePhotoList'
>;

interface GalleryContextValue {
	phrases: GalleryPhrases;
	components?: GalleryContextComponents;
	classNames?: GalleryClassNames;
	styles?: GalleryStyles;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

/** Returns null when used outside a GalleryContext.Provider (e.g. standalone component usage). */
function useGalleryContext(): GalleryContextValue | null {
	return useContext(GalleryContext);
}

/** Throws when used outside a GalleryContext.Provider. Use for strictly internal components. */
function useRequiredGalleryContext(): GalleryContextValue {
	const ctx = useContext(GalleryContext);
	if (!ctx) throw new Error('useRequiredGalleryContext must be used inside GalleryContext.Provider');
	return ctx;
}

export { GalleryContext, useGalleryContext, useRequiredGalleryContext };
export type { GalleryContextValue };
