import './css/style.css';

import { Gallery } from './components/gallery';
import { ReactBnbGallery } from './react-bnb-gallery';

export { ReactBnbGallery, Gallery };

export type { ReactBnbGalleryProps } from './react-bnb-gallery';

export type {
	GalleryController,
	GalleryPhoto,
	GalleryPhrases,
} from './types/gallery';
