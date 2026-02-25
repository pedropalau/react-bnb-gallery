import type { DefaultPhrases } from '../defaultPhrases';

/** Localization strings used throughout the gallery UI. */
export type GalleryPhrases = DefaultPhrases;

/** Represents a single photo entry in the gallery. */
export interface GalleryPhoto {
	/** URL of the full-size photo. */
	photo?: string;
	/** Display number shown in the lightbox. */
	number?: number;
	/** Primary caption displayed below the photo. */
	caption?: string;
	/** Secondary caption displayed below the primary caption. */
	subcaption?: string;
	/** URL of the thumbnail image used in the thumbnail strip. */
	thumbnail?: string;
	[key: string]: unknown;
}

/** Exposes navigation controls for programmatic gallery control. */
export interface GalleryController {
	/** Navigate to the previous photo. */
	prev: () => void;
	/** Navigate to the next photo. */
	next: () => void;
}
