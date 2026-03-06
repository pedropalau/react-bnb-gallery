import './css/style.css';

import { Gallery } from './components/gallery';
import { ReactBnbGallery } from './react-bnb-gallery';

export { ReactBnbGallery, Gallery };

export type { ReactBnbGalleryProps } from './react-bnb-gallery';

export type {
	GalleryCaptionActionsContext,
	GalleryCaptionComponentProps,
	GalleryCloseButtonProps,
	GalleryComponents,
	GalleryControlButtonProps,
	GalleryController,
	GalleryPhoto,
	GalleryPhotoComponentProps,
	GalleryPhrases,
	GalleryRenderCaptionActions,
	GalleryThumbnailComponentProps,
	GalleryTogglePhotoListComponentProps,
} from './types/gallery';
