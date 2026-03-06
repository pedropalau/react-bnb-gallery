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
	/** Accessible label for the button that closes the gallery modal. */
	closeGallery: 'Close gallery',
	/** Accessible label for the button that navigates to the previous photo. */
	previousPhoto: 'Previous photo',
	/** Accessible label for the button that navigates to the next photo. */
	nextPhoto: 'Next photo',
	/** Accessible label for the gallery dialog element. */
	photoGallery: 'Photo gallery',
	/** Accessible label for the thumbnail navigation region. */
	thumbnailNavigation: 'Thumbnail navigation',
};

export type DefaultPhrases = typeof defaultPhrases;
