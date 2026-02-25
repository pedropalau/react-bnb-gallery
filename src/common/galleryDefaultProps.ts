import { DEFAULT_COLOR, FORWARDS } from '../constants';
import defaultPhrases from '../defaultPhrases';
import noop from '../utils/noop';

export default {
	activePhotoIndex: 0,
	activePhotoPressed: noop,
	direction: FORWARDS,
	nextButtonPressed: noop,
	prevButtonPressed: noop,
	showThumbnails: true,
	photos: [],
	preloadSize: 5,
	wrap: false,
	phrases: defaultPhrases,
	light: false,
	backgroundColor: DEFAULT_COLOR,
};
