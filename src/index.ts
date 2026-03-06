import './css/style.css';

import { Gallery } from './components/gallery';
import { ReactBnbGallery } from './react-bnb-gallery';

export { ReactBnbGallery, Gallery };

export type { ReactBnbGalleryProps } from './react-bnb-gallery';

export type {
	GalleryCaptionActionsContext,
	GalleryController,
	GalleryPhoto,
	GalleryPhrases,
	GalleryRenderCaptionActions,
} from './types/gallery';
