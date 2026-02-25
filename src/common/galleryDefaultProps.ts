import { DEFAULT_COLOR, FORWARDS } from '../constants';
import defaultPhrases from '../defaultPhrases';

export default {
	activePhotoIndex: 0,
	direction: FORWARDS,
	showThumbnails: true,
	photos: [],
	preloadSize: 5,
	wrap: false,
	phrases: defaultPhrases,
	light: false,
	backgroundColor: DEFAULT_COLOR,
};
