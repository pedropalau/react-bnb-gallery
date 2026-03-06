import './css/style.css';

import { Gallery } from './components/gallery';
import { ReactBnbGallery } from './react-bnb-gallery';

export { ReactBnbGallery, Gallery };

export type { ReactBnbGalleryProps } from './react-bnb-gallery';

export type {
	GalleryCaptionActionsContext,
	GalleryCaptionComponentProps,
	GalleryClassNames,
	GalleryCloseButtonProps,
	GalleryComponents,
	GalleryControlButtonProps,
	GalleryController,
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
