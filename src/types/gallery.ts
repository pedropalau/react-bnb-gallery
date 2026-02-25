import type defaultPhrases from '../defaultPhrases';

export type GalleryPhrases = typeof defaultPhrases;

export interface GalleryPhoto {
	photo?: string;
	number?: number;
	caption?: string;
	subcaption?: string;
	thumbnail?: string;
	[key: string]: unknown;
}

export interface GalleryController {
	prev: () => void;
	next: () => void;
}
