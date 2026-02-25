import './css/style.css';

import { Gallery } from './components/gallery';
import { ReactBnbGallery } from './react-bnb-gallery';

/**
 * @deprecated Use named import instead: `import { ReactBnbGallery } from 'react-bnb-gallery'`.
 * Default export will be removed in the next major version.
 */
export default ReactBnbGallery;

export { ReactBnbGallery, Gallery };

export type { ReactBnbGalleryProps } from './react-bnb-gallery';

export type {
	GalleryController,
	GalleryPhoto,
	GalleryPhrases,
} from './types/gallery';
