/**
 * Default UI phrases used throughout the gallery.
 *
 * These strings serve as fallback values when no custom `phrases` prop is provided.
 * Override any of them by passing a `phrases` prop to the gallery component.
 */
export const defaultPhrases = {
	/** Displayed when the gallery receives no photos. */
	noPhotosProvided: 'No photos to show',
	/** Label for the button that opens the photo list panel. */
	showPhotoList: 'Show photo list',
	/** Label for the button that closes the photo list panel. */
	hidePhotoList: 'Hide photo list',
};

export type DefaultPhrases = typeof defaultPhrases;

/**
 * @deprecated Use named import instead: `import { defaultPhrases } from './default-phrases'`.
 * Default export will be removed in the next major version.
 */
export default defaultPhrases;
