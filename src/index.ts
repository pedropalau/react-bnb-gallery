import './css/style.css';

import { Gallery } from './components/gallery';
import { ReactBnbGallery } from './react-bnb-gallery';

export { ReactBnbGallery, Gallery };

export type { ReactBnbGalleryProps } from './react-bnb-gallery';

export type {
	GalleryAnimationOptions,
	GalleryAnimationPreset,
	GalleryCaptionActionsContext,
	GalleryCaptionComponentProps,
	GalleryClassNames,
	GalleryCloseButtonProps,
	GalleryComponents,
	GalleryControlButtonProps,
	GalleryController,
	GalleryImageFit,
	GalleryModalContainerProps,
	GalleryOverlayProps,
	GalleryPhoto,
	GalleryPhotoComponentProps,
	GalleryPhotoCounterProps,
	GalleryPhrases,
	GalleryRenderCaptionActions,
	GalleryStyles,
	GalleryThumbnailComponentProps,
	GalleryTogglePhotoListComponentProps,
} from './types/gallery';
