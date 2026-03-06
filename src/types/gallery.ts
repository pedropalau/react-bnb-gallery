import type { ReactNode } from 'react';
import type { DefaultPhrases } from '../default-phrases';

/** Localization strings used throughout the gallery UI. */
export type GalleryPhrases = DefaultPhrases;

/** Represents a single photo entry in the gallery. */
export interface GalleryPhoto {
	/** URL of the full-size photo. */
	photo?: string;
	/** Display number shown in the lightbox. */
	number?: number;
	/** Accessible alt text for the full-size photo image. */
	alt?: string;
	/** Accessible alt text for the thumbnail image. */
	thumbnailAlt?: string;
	/** Primary caption displayed below the photo. */
	caption?: ReactNode;
	/** Secondary caption displayed below the primary caption. */
	subcaption?: ReactNode;
	/** URL of the thumbnail image used in the thumbnail strip. */
	thumbnail?: string;
	[key: string]: unknown;
}

/** Context provided to custom caption action renderers. */
export interface GalleryCaptionActionsContext {
	/** Current active photo index. */
	current: number;
	/** Currently active photo object, when available. */
	currentPhoto?: GalleryPhoto;
	/** Full normalized photo list. */
	photos: GalleryPhoto[];
	/** Whether the thumbnail strip is currently visible. */
	showThumbnails: boolean;
}

/** Render prop for injecting custom controls in the caption action area. */
export type GalleryRenderCaptionActions = (
	context: GalleryCaptionActionsContext,
) => ReactNode;

/** Exposes navigation controls for programmatic gallery control. */
export interface GalleryController {
	/** Navigate to the previous photo. */
	prev: () => void;
	/** Navigate to the next photo. */
	next: () => void;
}
