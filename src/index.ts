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
	GalleryCloseAnimationPreset,
	GalleryCloseButtonProps,
	GalleryComponents,
	GalleryControlButtonProps,
	GalleryController,
	GalleryImageFit,
	GalleryModalContainerProps,
	GalleryOpenAnimationPreset,
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
